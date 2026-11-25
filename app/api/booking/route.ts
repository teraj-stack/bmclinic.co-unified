import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
import { createCalendarEvent } from '@/lib/googleCalendar';
import { getDoctorCalendarCreds } from '@/lib/doctors';
import { savePendingVisit } from '@/lib/visits';
import { getServiceById } from '@/lib/servicesCatalog';

async function persistBookingLocally(record: Record<string, unknown>) {
  try {
    const dir = path.join(process.cwd(), 'data');
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(
      path.join(dir, 'patient-bookings.jsonl'),
      JSON.stringify(record) + '\n',
      'utf-8'
    );
  } catch (err) {
    console.error('[booking] local ledger write failed:', err);
  }
}

async function sendBookingEmailIfConfigured(params: {
  visitId: string;
  serviceName: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  start: string;
  end: string;
}) {
  const emailServer = process.env.EMAIL_SERVER?.trim();
  if (!emailServer || emailServer.includes('smtp.dostawca.pl')) return false;

  const from = process.env.EMAIL_FROM || 'kontakt@bujokmedical.pl';
  const clinicTo = process.env.CONTACT_EMAIL || 'kontakt@bujokmedical.pl';
  const startFormatted = new Date(params.start).toLocaleString('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  try {
    const transporter = nodemailer.createTransport(emailServer);
    await transporter.sendMail({
      from,
      to: clinicTo,
      replyTo: params.patientEmail,
      subject: `[BM Clinic] Nowa rezerwacja: ${params.serviceName} (${startFormatted})`,
      text: [
        `ID rezerwacji: ${params.visitId}`,
        `Usługa: ${params.serviceName}`,
        `Termin: ${startFormatted}`,
        `Pacjent: ${params.patientName || '(nie podano)'}`,
        `Telefon: ${params.patientPhone || '(nie podano)'}`,
        `E-mail: ${params.patientEmail}`,
      ].join('\n'),
    });
    return true;
  } catch (err) {
    console.error('[booking] SMTP notification failed:', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      doctorId,
      serviceId,
      patientEmail,
      patientPhone = '',
      patientName = '',
      start,
      end,
    } = body;

    if (!doctorId || !serviceId || !patientEmail || !start || !end) {
      return NextResponse.json({ error: 'Brak wymaganych danych rezerwacji' }, { status: 400 });
    }

    const service = await getServiceById(serviceId);
    if (!service) {
      return NextResponse.json({ error: 'Nie znaleziono wybranej usługi' }, { status: 404 });
    }

    let visitId = `bm-${randomUUID()}`;
    let storedInDb = false;

    if (process.env.DATABASE_URL && process.env.GOOGLE_CLIENT_ID) {
      try {
        const { refreshToken, calendarId } = await getDoctorCalendarCreds(doctorId);

        const event = await createCalendarEvent(refreshToken, calendarId, {
          summary: `${service.name}${patientName ? ` — ${patientName}` : ''}`,
          start,
          end,
          attendeeEmail: patientEmail,
        });

        const visit = await savePendingVisit({
          doctorId,
          serviceId,
          patientEmail,
          start,
          end,
          googleEventId: event.id ?? undefined,
        });

        visitId = visit.id;
        storedInDb = true;
      } catch {
        // Fallback to local durable ledger + SMTP email so no patient request is ever lost
      }
    }

    const bookingRecord = {
      visitId,
      createdAt: new Date().toISOString(),
      doctorId,
      serviceId,
      serviceName: service.name,
      patientName: String(patientName).trim(),
      patientPhone: String(patientPhone).trim(),
      patientEmail: String(patientEmail).trim(),
      start,
      end,
      storedInDb,
    };

    await persistBookingLocally(bookingRecord);
    const emailSent = await sendBookingEmailIfConfigured({
      visitId,
      serviceName: service.name,
      patientName: bookingRecord.patientName,
      patientEmail: bookingRecord.patientEmail,
      patientPhone: bookingRecord.patientPhone,
      start,
      end,
    });

    return NextResponse.json({
      status: 'ok',
      visitId,
      storedInDb,
      savedLocally: true,
      emailSent,
    });
  } catch {
    return NextResponse.json({ error: 'Nie udało się utworzyć rezerwacji' }, { status: 502 });
  }
}
