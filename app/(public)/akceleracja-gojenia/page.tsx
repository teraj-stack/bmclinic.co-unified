import Link from 'next/link';
import scheduleData from '@/lib/lovable/healingSchedule.json';
import HealingChecklistClient, {
  type ScheduleDay,
} from '@/components/lovable/HealingChecklistClient';

export const metadata = {
  title: 'Akceleracja Gojenia i Opieka Pozabiegowa | BM Clinic',
  description:
    'Zintegrowany protokół akceleracji gojenia (PBM LED 630–680 + 830 nm, HBOT 1,5–3,0 ATA, HOCl, LADD) i interaktywna checklista pacjenta na 15 dni.',
};

export default function AkceleracjaGojeniaPage() {
  const schedule = scheduleData as ScheduleDay[];

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
              Opieka Pozabiegowa · Zintegrowane z graft-guardian-protocol
            </span>
            <div className="flex gap-3 text-xs">
              <Link href="/medycyna-estetyczna" className="text-amber-300 hover:underline">
                Medycyna estetyczna →
              </Link>
              <Link href="/mapa-strony" className="text-slate-300 hover:underline">
                Mapa strony →
              </Link>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Protokół Akceleracji Gojenia i Checklista Pacjenta
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Harmonogram dzień po dniu (Doba „Zero” – Doba 14+) obejmujący fotobiomodulację LED
            (630–680 + 830 nm), tlenoterapię hiperbaryczną (HBOT), spłukiwanie HOCl oraz punkty
            kontrolne. Postęp zapisuje się automatycznie w Twojej przeglądarce.
          </p>
        </header>

        <HealingChecklistClient schedule={schedule} />

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm">
          <div>
            <p className="font-semibold text-white">Masz objawy alarmowe lub pytania o gojenie?</p>
            <p className="text-slate-400">
              Skontaktuj się z koordynatorem kliniki lub przejdź do Panelu Pacjenta.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/pacjent"
              className="rounded-lg border border-white/15 px-4 py-2 font-medium text-white hover:bg-white/10"
            >
              Panel Pacjenta
            </Link>
            <Link
              href="/rezerwacja"
              className="rounded-lg bg-sky-500 px-4 py-2 font-semibold text-slate-950 hover:bg-sky-400"
            >
              Umów kontrolę
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
