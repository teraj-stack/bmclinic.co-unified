import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import nodemailer from 'nodemailer';
import { checkAvailability, createCalendarEvent } from '@/lib/googleCalendar';
import { getDoctorCalendarCreds } from '@/lib/doctors';
import { savePendingVisit } from '@/lib/visits';
import { getServiceById } from '@/lib/servicesCatalog';
import { assertSuperagentSafePayload } from '@/lib/superagentEngine';
import { prisma } from '@/lib/prisma';
import { getClinicDate, getClinicHour } from '@/lib/clinicTime';

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
    timeZone: 'Europe/Warsaw',
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
  } catch {
    console.error('[booking] SMTP notification failed.');
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const { doctorId, serviceId, patientEmail, start, end } = body ?? {};
    const patientPhone = typeof body?.patientPhone === 'string' ? body.patientPhone.trim() : '';
    const patientName = typeof body?.patientName === 'string' ? body.patientName.trim() : '';
    if (typeof doctorId !== 'string' || !doctorId || typeof serviceId !== 'string' || !serviceId ||
        typeof patientEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail.trim()) ||
        patientEmail.length > 254 || patientPhone.length > 40 || patientName.length > 120 ||
        typeof start !== 'string' || typeof end !== 'string') {
      return NextResponse.json({ error: 'Nieprawidłowe dane rezerwacji.' }, { status: 400 });
    }

    const email = patientEmail.trim().toLowerCase();
    const startTime = new Date(start);
    const endTime = new Date(end);
    const service = await getServiceById(serviceId);
    if (!service) {
      return NextResponse.json({ error: 'Nie znaleziono usługi.' }, { status: 404 });
    }
    if (!(startTime.getTime() > Date.now()) ||
        endTime.getTime() - startTime.getTime() !== service.durationMin * 60_000) {
      return NextResponse.json({ error: 'Nieprawidłowy termin wizyty.' }, { status: 400 });
    }

    const safety = assertSuperagentSafePayload({ doctorId, serviceId, patientEmail, patientPhone, patientName });
    if (!safety.allowed) {
      return NextResponse.json({ error: 'Nieprawidłowe dane rezerwacji.' }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview') {
        return NextResponse.json({ status: 'demo' });
      }
      return NextResponse.json({ error: 'Rezerwacja online jest niedostępna.' }, { status: 503 });
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      select: { workStartHour: true, workEndHour: true },
    });
    if (!doctor) {
      return NextResponse.json({ error: 'Nie znaleziono lekarza.' }, { status: 404 });
    }
    const date = getClinicDate(startTime);
    const workStart = getClinicHour(date, doctor.workStartHour);
    const workEnd = getClinicHour(date, doctor.workEndHour);
    if (startTime < workStart || endTime > workEnd ||
        (startTime.getTime() - workStart.getTime()) % (service.durationMin * 60_000) !== 0) {
      return NextResponse.json({ error: 'Termin jest poza grafikiem lekarza.' }, { status: 400 });
    }
    const calendar = process.env.GOOGLE_CLIENT_ID
      ? await getDoctorCalendarCreds(doctorId).catch(() => null)
      : null;
    if (calendar) {
      const busy = await checkAvailability(
        calendar.refreshToken, calendar.calendarId, startTime.toISOString(), endTime.toISOString()
      );
      if (busy.length > 0) {
        return NextResponse.json({ error: 'Termin jest już zajęty.' }, { status: 409 });
      }
    }

    const visit = await savePendingVisit({
      doctorId, serviceId: service.id, patientEmail: email, patientName, patientPhone, start: startTime, end: endTime,
    });
    if (!visit) {
      return NextResponse.json({ error: 'Termin jest już zajęty.' }, { status: 409 });
    }

    let status: 'pending' | 'confirmed' = 'pending';
    if (calendar) {
      try {
        const event = await createCalendarEvent(calendar.refreshToken, calendar.calendarId, {
          summary: service.name,
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          attendeeEmail: email,
        });
        if (event.id) {
          await prisma.visit.update({
            where: { id: visit.id },
            data: { googleEventId: event.id, status: 'CONFIRMED' },
          });
          status = 'confirmed';
        }
      } catch {
        console.error('[booking] Google Calendar confirmation failed.');
      }
    }

    await sendBookingEmailIfConfigured({
      visitId: visit.id, serviceName: service.name, patientName, patientEmail: email,
      patientPhone, start: startTime.toISOString(), end: endTime.toISOString(),
    });
    return NextResponse.json({ status, visitId: visit.id });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034') {
      return NextResponse.json({ error: 'Termin wymaga ponownego sprawdzenia.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Nie udało się utworzyć rezerwacji.' }, { status: 502 });
  }
}
