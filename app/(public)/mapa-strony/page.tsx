import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface SitemapNode {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
  thumb: string;
  badge: string;
  mobileSpec: string;
  connections: string[];
}

const SITEMAP_GROUPS: {
  groupTitle: string;
  groupDesc: string;
  accent: string;
  nodes: SitemapNode[];
}[] = [
  {
    groupTitle: '1. Frontend Milenki — BM Clinic (Strona główna i strefy)',
    groupDesc: 'Główna podróż pacjenta na 28. piętrze w Warszawie · 91 grafik tła · układ mobile-friendly',
    accent: '#d4af37',
    nodes: [
      {
        id: 'sky-lobby',
        title: 'Sky Lobby — Ekran startowy',
        subtitle: 'Hero + selektor 91 grafik + szybkie przejście do specjalizacji i wizyty',
        href: '/',
        thumb: '/assets/hd_001.webp',
        badge: 'Główna /',
        mobileSpec: '2 grafiki 9:16',
        connections: ['Specjalizacje', 'Rezerwacja', 'Baza MCML'],
      },
      {
        id: 'proktologia',
        title: 'Strefa: Proktologia',
        subtitle: 'LHP, FiLaC, SiLaC, szczelina, diagnostyka i spokojne wprowadzenie',
        href: '/mcml/leczenie/proktologia',
        thumb: '/assets/hd_004.webp',
        badge: 'Specjalizacja',
        mobileSpec: '1 grafika 9:16',
        connections: ['Szablon zabiegu', 'Przygotowanie LHP'],
      },
      {
        id: 'flebologia',
        title: 'Strefa: Flebologia i Żylaki',
        subtitle: 'EVLT, CLaCS, skleroterapia, mikroflebektomia, pajączki',
        href: '/mcml/leczenie/flebologia',
        thumb: '/assets/hd_008.webp',
        badge: 'Specjalizacja',
        mobileSpec: '1 grafika 9:16',
        connections: ['EVLT', 'CLaCS', 'Profilaktyka żylaków'],
      },
      {
        id: 'chirurgia',
        title: 'Strefa: Chirurgia i Estetyka',
        subtitle: 'Chirurgia ogólna, ginekomastia, medycyna estetyczna i zabiegi ambulatoryjne',
        href: '/uslugi/chirurgia',
        thumb: '/assets/hd_012.webp',
        badge: 'Specjalizacja',
        mobileSpec: '2 grafiki 9:16',
        connections: ['Cennik', 'Rezerwacja'],
      },
    ],
  },
  {
    groupTitle: '2. Baza Wiedzy i Portal Pacjenta MCML / LHP (67 podstron)',
    groupDesc: 'Pełna edukacja medyczna, 12 poradników przygotowania, dziennik pacjenta i e-booki',
    accent: '#38bdf8',
    nodes: [
      {
        id: 'mcml-hub',
        title: 'Portal Dla Pacjenta (MCML)',
        subtitle: 'Edukacja przed wizytą, FAQ proktologiczne, pielęgnacja nóg, quiz',
        href: '/mcml/dla-pacjenta',
        thumb: '/assets/hd_015.webp',
        badge: '/mcml/dla-pacjenta',
        mobileSpec: '1 wspólny szablon',
        connections: ['12 poradników', 'Dziennik pacjenta'],
      },
      {
        id: 'mcml-lhp',
        title: 'Zabiegi Laserowe (LHP / EVLT / FiLaC)',
        subtitle: 'Szczegółowe karty zabiegów z infografikami i źródłami EBM',
        href: '/mcml/leczenie/lhp',
        thumb: '/assets/hd_019.webp',
        badge: '/mcml/leczenie/*',
        mobileSpec: '2 grafiki 9:16',
        connections: ['Rezerwacja', 'Zgody DOCX'],
      },
      {
        id: 'mcml-prep',
        title: 'Przygotowanie i Dziennik Gojenia',
        subtitle: '12 checklist przygotowania do zabiegu + dziennik objawów i rekonwalescencji',
        href: '/mcml/dla-pacjenta/przygotowanie-lhp',
        thumb: '/assets/hd_023.webp',
        badge: '12 poradników',
        mobileSpec: '2 grafiki 9:16',
        connections: ['Panel Pacjenta', 'Zgody DOCX'],
      },
    ],
  },
  {
    groupTitle: '3. Backend Transakcyjny, Panele i Chronos Lite (bez 3D)',
    groupDesc: 'Działający system Next.js: rezerwacje, cennik 21 usług, sklep oraz panele ról',
    accent: '#22c55e',
    nodes: [
      {
        id: 'rezerwacja',
        title: 'Rezerwacja Wizyt i Cennik',
        subtitle: 'Wybór zabiegu, lekarza i terminu + przejrzysty cennik 21 usług',
        href: '/rezerwacja',
        thumb: '/assets/hd_027.webp',
        badge: '/rezerwacja · /cennik',
        mobileSpec: '1 grafika 9:16',
        connections: ['Panel Pacjenta', 'Kalendarz Lekarza'],
      },
      {
        id: 'sklep',
        title: 'Sklep Zabiegowy i Koszyk',
        subtitle: 'Pakiety zabiegowe, produkty pozabiegowe, koszyk i podsumowanie',
        href: '/sklep',
        thumb: '/assets/hd_031.webp',
        badge: '/sklep',
        mobileSpec: '2–4 grafiki 4:5',
        connections: ['Koszyk', 'Płatności'],
      },
      {
        id: 'panele',
        title: 'Panel Pacjenta, Lekarza i Admina',
        subtitle: 'Logowanie, wizyty pacjenta, grafik lekarza oraz CMS usług i zamówień',
        href: '/logowanie',
        thumb: '/assets/hd_035.webp',
        badge: '/pacjent · /lekarz · /admin',
        mobileSpec: 'Widok kartowy',
        connections: ['Chronos Lite'],
      },
      {
        id: 'chronos-lite',
        title: 'Chronos Lite (Kalendarz / PDF / AI)',
        subtitle: 'Zintegrowane narzędzia bez ciężkiego 3D: synchronizacja, raporty PDF, notatki',
        href: '/admin/chronos',
        thumb: '/assets/hd_039.webp',
        badge: '/admin/chronos',
        mobileSpec: 'Lekki tryb',
        connections: ['Panel Admina', 'Panel Lekarza'],
      },
    ],
  },
  {
    groupTitle: '4. Moduły Zintegrowane z Lovable (Estetyka, Gojenie, Protokoły)',
    groupDesc: 'Przeniesione z glow-medspa-hub, graft-guardian-protocol i precise-beauty-lab',
    accent: '#f59e0b',
    nodes: [
      {
        id: 'medycyna-estetyczna',
        title: 'Medycyna Estetyczna (11 Technologii)',
        subtitle: 'RF mikroigłowa, laser tulowy 1927 nm, zimna plazma, HIFU, IPL, LED PBM (glow-medspa-hub)',
        href: '/medycyna-estetyczna',
        thumb: '/assets/hd_013.webp',
        badge: '/medycyna-estetyczna',
        mobileSpec: 'Katalog 11 technologii',
        connections: ['Rezerwacja', 'Cennik'],
      },
      {
        id: 'akceleracja-gojenia',
        title: 'Akceleracja Gojenia i Checklista (15 dni)',
        subtitle: 'Protokół PBM LED + HBOT + HOCl dzień po dniu z zapisem postępu (graft-guardian-protocol)',
        href: '/akceleracja-gojenia',
        thumb: '/assets/hd_021.webp',
        badge: '/akceleracja-gojenia',
        mobileSpec: '49 kroków · localStorage',
        connections: ['Panel Pacjenta', 'Rezerwacja'],
      },
      {
        id: 'protokoly-laserowe',
        title: 'Protokoły Laserowe Lekarza (KB)',
        subtitle: 'Reguły kliniczne Tulowy/Erbowy, CL300, EL950, PS30, fenotypy skóry i Gut Prehab (precise-beauty-lab)',
        href: '/lekarz/protokoly',
        thumb: '/assets/hd_037.webp',
        badge: '/lekarz/protokoly',
        mobileSpec: '7 baz JSON · Panel Lekarza',
        connections: ['Panel Lekarza', 'Chronos Lite'],
      },
    ],
  },
  {
    groupTitle: '5. Narzędzia Produkcyjne (osobne lokalne porty)',
    groupDesc: 'Aplikacje robocze do projektowania przycisków, dźwięków i zarządzania zadaniami',
    accent: '#a78bfa',
    nodes: [
      {
        id: 'aether-buttons',
        title: 'Aether Tactile Studio (:3007)',
        subtitle: 'Interaktywne przyciski, podświetlanie klawiszy i 14 profili dźwiękowych',
        href: 'http://localhost:3007',
        external: true,
        thumb: '/assets/hd_043.webp',
        badge: 'localhost:3007',
        mobileSpec: 'Warsztat UI/Audio',
        connections: ['Eksport do bmclinic.co'],
      },
      {
        id: 'managing-work',
        title: 'Zarządzanie Pracą (:3500)',
        subtitle: 'Lekki Kanban + mapa myśli zapisywana lokalnie w tasks.json (zero 3D)',
        href: 'http://localhost:3500',
        external: true,
        thumb: '/assets/hd_047.webp',
        badge: 'localhost:3500',
        mobileSpec: 'Kanban / Roadmapa',
        connections: ['Harmonogram wdrożenia'],
      },
    ],
  },
];

export default function MapaStronyPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-[#f4f1ea] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              BM Clinic · bmclinic.co · Architektura wizualna
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Całościowa Mapa Strony z Miniaturami Grafik
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-[#b8b2a6]">
              Wszystkie moduły w jednym miejscu: kliknij dowolny kafelek, aby przejść bezpośrednio do
              danej sekcji. Łącznie: 8 widoków frontendu Milenki, 28 podstron Next.js, 67 podstron
              medycznych MCML oraz narzędzia robocze.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-lg bg-[#d4af37] px-4 py-2 text-xs font-semibold text-[#090b10] hover:bg-[#e5c453]"
            >
              ← Wróć do Sky Lobby (BM Clinic)
            </Link>
            <Link
              href="/mcml/dla-pacjenta"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:border-[#d4af37]/60"
            >
              Baza MCML ↗
            </Link>
          </div>
        </header>

        {SITEMAP_GROUPS.map((group) => (
          <section key={group.groupTitle} className="space-y-4">
            <div className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: group.accent }}>
              <h2 className="text-xl font-semibold text-white">{group.groupTitle}</h2>
              <p className="text-xs text-[#9ea6b8]">{group.groupDesc}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {group.nodes.map((node) => {
                const CardInner = (
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121621] transition hover:-translate-y-0.5 hover:border-[#d4af37]/60 hover:shadow-xl">
                    <div className="relative h-40 w-full overflow-hidden bg-black/40">
                      <img
                        src={node.thumb}
                        alt={node.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-2.5 left-2.5 rounded-full bg-black/75 px-2.5 py-0.5 text-[10px] font-semibold text-[#e8ca64] backdrop-blur">
                        {node.badge}
                      </span>
                      <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/75 px-2 py-0.5 text-[10px] text-white/90">
                        {node.mobileSpec}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-[#e8ca64]">
                          {node.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-[#a8b0c0]">{node.subtitle}</p>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/8 pt-3">
                        {node.connections.map((conn) => (
                          <span
                            key={conn}
                            className="rounded bg-white/6 px-2 py-0.5 text-[10px] text-[#d5cfc2]"
                          >
                            → {conn}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );

                return node.external ? (
                  <a
                    key={node.id}
                    href={node.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block h-full"
                  >
                    {CardInner}
                  </a>
                ) : (
                  <Link key={node.id} href={node.href} className="block h-full">
                    {CardInner}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
