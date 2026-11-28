import { requireRole } from '@/lib/authGuard';
import { prisma } from '@/lib/prisma';
import { getClinicDate, getClinicHour } from '@/lib/clinicTime';
import { updateVisitStatus } from './actions';

export const dynamic = 'force-dynamic';

function todayRange() {
  const today = getClinicDate(new Date());
  return { start: getClinicHour(today, 0), end: getClinicHour(today, 24) };
}

export default async function LekarzDzisPage() {
  const session = await requireRole(['DOCTOR', 'ADMIN']);
  const { start, end } = todayRange();
  const visits = await prisma.visit.findMany({
    where: { doctor: { userId: session.user.id }, startTime: { gte: start, lt: end } },
    include: { patient: { include: { user: true } }, service: true },
    orderBy: { startTime: 'asc' },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Wizyty dzisiaj</h1>

      {visits.length === 0 && <p className="opacity-70">Brak zaplanowanych wizyt na dziś.</p>}

      <ul className="space-y-3">
        {visits.map((v) => (
          <li
            key={v.id}
            className="glass-card flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">
                {v.startTime.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })} —{' '}
                {v.patient.user.name ?? v.patient.user.email}
              </p>
              <p className="text-sm opacity-70">{v.service.name}</p>
            </div>

            <form action={updateVisitStatus.bind(null, v.id)} className="flex gap-2">
              <select
                name="status"
                defaultValue={v.status}
                className="rounded border p-1 text-sm"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <option value="CONFIRMED">Potwierdzona</option>
                <option value="COMPLETED">Odbyta</option>
                <option value="CANCELLED">Anulowana</option>
              </select>
              <button
                type="submit"
                className="rounded bg-[var(--text-primary)] px-3 py-1 text-sm text-[var(--bg-primary)]"
              >
                Zapisz
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
