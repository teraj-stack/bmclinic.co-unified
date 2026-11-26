import Link from 'next/link';
import technologiesData from '@/lib/lovable/aestheticTechnologies.json';
import AestheticTechnologiesClient, {
  type AestheticTech,
} from '@/components/lovable/AestheticTechnologiesClient';

export const metadata = {
  title: 'Medycyna Estetyczna i Laserowa | BM Clinic Warszawa',
  description:
    'Katalog 11 technologii medycyny estetycznej i laserowej (RF mikroigłowa, laser tulowy 1927 nm, zimna plazma, HIFU, IPL, LED PBM) zgodny z prawem reklamy wyrobów medycznych.',
};

export default function MedycynaEstetycznaPage() {
  const technologies = technologiesData as AestheticTech[];

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              Strefa #4 · Zintegrowane z glow-medspa-hub
            </span>
            <div className="flex gap-3 text-xs">
              <Link href="/akceleracja-gojenia" className="text-sky-300 hover:underline">
                Akceleracja gojenia →
              </Link>
              <Link href="/mapa-strony" className="text-slate-300 hover:underline">
                Mapa strony →
              </Link>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Medycyna Estetyczna i Technologie Laserowe
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Opisy techniczne wszystkich 11 technologii dostępnych w klinice (zgodne z wymogami
            prawa reklamy wyrobów medycznych). Wybierz kategorię, poznaj mechanizm działania i
            umów konsultację kwalifikacyjną.
          </p>
        </header>

        <AestheticTechnologiesClient technologies={technologies} />

        <section className="space-y-4 border-t border-white/10 pt-8">
          <h2 className="text-xl font-bold text-white">
            Dedykowane Aplikacje Interaktywne (Offline HTML)
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href="/estetyka/aplikacja-bioelektryczna.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-sky-500/30 bg-slate-900/80 p-5 transition hover:border-sky-400"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Interaktywny Moduł · HTML
              </div>
              <div className="mt-1 text-lg font-bold text-white">
                Aplikacja Bioelektryczna
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Pełna samodzielna aplikacja bioelektryczna wpięta bezpośrednio w bmclinic.co →
              </p>
            </a>
            <a
              href="/estetyka/zimna-plazma-he-tech.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-amber-500/30 bg-slate-900/80 p-5 transition hover:border-amber-400"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Interaktywny Moduł · He-Tech
              </div>
              <div className="mt-1 text-lg font-bold text-white">
                Zimna Plazma (He-Tech) — FINAL
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Dedykowana prezentacja i protokół Zimnej Plazmy He-Tech wpięty w bmclinic.co →
              </p>
            </a>
            <a
              href="/estetyka/bm-clinic-medycyna-estetyczna-offline.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-5 transition hover:border-emerald-400"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Moduł Offline (:3021) · HTML
              </div>
              <div className="mt-1 text-lg font-bold text-white">
                Medycyna Estetyczna (Offline Bundle)
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Pełny pakiet offline BM Clinic Medycyna Estetyczna scalony z localhost:3021 →
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
