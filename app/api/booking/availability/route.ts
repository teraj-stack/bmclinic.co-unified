import { NextRequest, NextResponse } from 'next/server';
import { getClinicHour } from '@/lib/clinicTime';
import { checkAvailability } from '@/lib/googleCalendar';
import { getDoctorCalendarCreds } from '@/lib/doctors';
import { getDoctorsCatalog, getServiceById } from '@/lib/servicesCatalog';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const doctorId = req.nextUrl.searchParams.get('doctorId');
  const serviceId = req.nextUrl.searchParams.get('serviceId');
  const date = req.nextUrl.searchParams.get('date');
  const candidate = new Date(`${date}T00:00:00Z`);
  if (!doctorId || !serviceId || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(candidate.getTime()) || candidate.toISOString().slice(0, 10) !== date) {
    return NextResponse.json({ error: 'Nieprawidłowe parametry terminu.' }, { status: 400 });
  }

  try {
    const [service, doctors] = await Promise.all([getServiceById(serviceId), getDoctorsCatalog()]);
    const doctor = doctors.find((item) => item.id === doctorId);
    if (!doctor || !service || !Number.isSafeInteger(service.durationMin) || service.durationMin <= 0) {
      return NextResponse.json({ error: 'Nie znaleziono lekarza lub usługi.' }, { status: 404 });
    }

    const workStart = getClinicHour(date, doctor.workStartHour);
    const workEnd = getClinicHour(date, doctor.workEndHour);
    const busy: Array<{ start: number; end: number }> = [];
    if (process.env.DATABASE_URL) {
      const visits = await prisma.visit.findMany({
        where: {
          doctorId, status: { not: 'CANCELLED' }, startTime: { lt: workEnd }, endTime: { gt: workStart },
        },
        select: { startTime: true, endTime: true },
      });
      busy.push(...visits.map((visit) => ({ start: visit.startTime.getTime(), end: visit.endTime.getTime() })));
      if (process.env.GOOGLE_CLIENT_ID) {
        const calendar = await getDoctorCalendarCreds(doctorId).catch(() => null);
        if (calendar) {
          const events = await checkAvailability(
            calendar.refreshToken, calendar.calendarId, workStart.toISOString(), workEnd.toISOString()
          );
          for (const event of events) {
            if (event.start && event.end) {
              busy.push({ start: Date.parse(event.start), end: Date.parse(event.end) });
            }
          }
        }
      }
    }

    const now = Date.now();
    const slotMs = service.durationMin * 60_000;
    const slots: Array<{ start: string; end: string }> = [];
    for (let start = workStart.getTime(); start + slotMs <= workEnd.getTime(); start += slotMs) {
      const end = start + slotMs;
      if (start > now && !busy.some((interval) => start < interval.end && end > interval.start)) {
        slots.push({ start: new Date(start).toISOString(), end: new Date(end).toISOString() });
      }
    }
    return NextResponse.json({ slots });
  } catch {
    return NextResponse.json({ error: 'Nie udało się sprawdzić dostępności.' }, { status: 503 });
  }
}
