'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  FolderKanban,
  Grid2x2,
  List,
  RotateCcw,
  Search,
  Sparkles,
} from 'lucide-react';

export interface SitemapSegmentDef {
  id: string;
  number: string;
  title: string;
  desc: string;
  accent: string;
}

export interface SitemapItemDef {
  id: string;
  defaultSegmentId: string;
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
  thumb: string;
  badge: string;
  spec: string;
  connections: string[];
}

export const INITIAL_SEGMENTS: SitemapSegmentDef[] = [
  {
    id: 'seg-klinika',
    number: '01',
    title: 'Klinika, Strony Główne & Specjalizacje',
    desc: 'Sky Lobby z wyborem 91 grafik, portal zabiegowy BM Clinics (:3021), Proktologia, Flebologia, Chirurgia i Kontakt.',
    accent: '#d4af37',
  },
  {
    id: 'seg-chronos',
    number: '02',
    title: 'Chronos Vault, Kalendarz, Sklep, Magazyn & Panele Ról',
    desc: 'Połączony system Chronos Vault (/vault/), Rezerwacje, Cennik 21 usług, Sklep CML, Magazyn SKU i panele Pacjenta / Lekarza / Admina.',
    accent: '#22c55e',
  },
  {
    id: 'seg-estetyka',
    number: '03',
    title: 'Medycyna Estetyczna, Diagnostyka Skóry & BMClinics.ai (55 widoków)',
    desc: 'Diagnostyka skóry, 12 technologii (Virtue RF, PicoKing, HIFU, AlexPulse, Fusion Plasma), wskazania, lekarze, akceleracja gojenia i moduły offline.',
    accent: '#f59e0b',
  },
  {
    id: 'seg-wiedza',
    number: '04',
    title: 'Baza Wiedzy MCML / LHP, Protokoły & Edukacja Pacjenta',
    desc: '67 podstron medycznych MCML, 12 poradników przygotowania, dziennik gojenia, protokoły laserowe lekarza, blog oraz FAQ.',
    accent: '#38bdf8',
  },
  {
    id: 'seg-design-3d',
    number: '05',
    title: 'Design Studio (:3017), Haptyka & Przestrzenne 3D',
    desc: 'Zunifikowane Design Studio (/design-studio & /desingstudio), Aether Tactile :3017, Spatial 3D, Parallax 3D, CML Wilanów 3D i RUTA.',
    accent: '#10b981',
  },
  {
    id: 'seg-ai-holding',
    number: '06',
    title: 'Holding SEO/AEO, Bezpieczeństwo, Skanery & Agenci AI',
    desc: 'Holding & skaner wirusów, MySkinCode AI, drzewo zadań TaskKill, Superagent Guard PII, Voice Builder LLM oraz lokalny Agent LLM (M1 Pro).',
    accent: '#a78bfa',
  },
];

export const INITIAL_ITEMS: SitemapItemDef[] = [
  // SEGMENT 01: KLINIKA
  {
    id: 'sky-lobby',
    defaultSegmentId: 'seg-klinika',
    title: 'Sky Lobby — Ekran startowy BM Clinic',
    subtitle: 'Wirtualna przestrzeń kliniki, wybór 91 grafik tła, studio ruchu i wejście do specjalizacji.',
    href: '/',
    thumb: '/assets/hd_001.webp',
    badge: '/',
    spec: 'Strona Główna',
    connections: ['Specjalizacje', 'Rezerwacja', 'BMClinics.ai'],
  },
  {
    id: 'bmclinics-portal',
    defaultSegmentId: 'seg-klinika',
    title: 'BM Clinics — Portal Zabiegowy (:3021)',
    subtitle: 'Klasyczny układ kliniki chirurgicznej Next.js z sekcją Zakres Opieki, Standardem oraz danymi NAP.',
    href: '/bmclinics',
    thumb: '/assets/hd_002.webp',
    badge: '/bmclinics',
    spec: 'Scalone z :3021',
    connections: ['Cennik', 'Rezerwacja', 'Klinika (/klinika)'],
  },
  {
    id: 'uslugi-proktologia',
    defaultSegmentId: 'seg-klinika',
    title: 'Proktologia — Diagnostyka & LHP',
    subtitle: 'Konsultacje, anoskopia, rektoskopia, leczenie hemoroidów, szczelin i przetok.',
    href: '/uslugi/proktologia',
    thumb: '/assets/hd_004.webp',
    badge: '/uslugi/proktologia',
    spec: 'Ścieżka Pacjenta',
    connections: ['Rezerwacja', 'Baza MCML', 'CML Wilanów 3D'],
  },
  {
    id: 'uslugi-flebologia',
    defaultSegmentId: 'seg-klinika',
    title: 'Flebologia — Żylaki i Naczynka',
    subtitle: 'USG Doppler kończyn dolnych, laser EVLT, skleroterapia i mikroflebektomia.',
    href: '/uslugi/zylaki-naczynka',
    thumb: '/assets/hd_008.webp',
    badge: '/uslugi/zylaki-naczynka',
    spec: 'Ścieżka Pacjenta',
    connections: ['EVLT', 'Rezerwacja'],
  },
  {
    id: 'uslugi-chirurgia',
    defaultSegmentId: 'seg-klinika',
    title: 'Chirurgia Ogólna i 1-Dnia',
    subtitle: 'Zmiany skórne, przepukliny, wrastające paznokcie, chirurgia ambulatoryjna.',
    href: '/uslugi/chirurgia-ogolna',
    thumb: '/assets/hd_012.webp',
    badge: '/uslugi/chirurgia-ogolna',
    spec: 'Zabiegi 1-Dnia',
    connections: ['Cennik', 'Rezerwacja'],
  },
  {
    id: 'o-nas-kontakt',
    defaultSegmentId: 'seg-klinika',
    title: 'O nas & Kontakt (ul. Branickiego 10)',
    subtitle: 'Zespół lekarski, dojazd do kliniki w Wilanowie i formularz z trwałym zapisem zapytań.',
    href: '/kontakt',
    thumb: '/assets/hd_006.webp',
    badge: '/kontakt · /o-nas',
    spec: 'Wilanów',
    connections: ['Rezerwacja', 'Lekarze'],
  },

  // SEGMENT 02: CHRONOS VAULT, SKLEP, MAGAZYN, PANELE
  {
    id: 'chronos-vault-full',
    defaultSegmentId: 'seg-chronos',
    title: 'Pełny Chronos Vault (Kanban + 3D + Głos + Google Sync)',
    subtitle: 'Centralny vault połączony na :3016: zadania, mapa 3D/Gantt, kalendarz, nagrania i sync z Dyskiem Google.',
    href: '/vault/',
    thumb: '/assets/hd_039.webp',
    badge: '/vault/',
    spec: 'Chronos Core',
    connections: ['Drzewo Zadań', 'Panel Admina', 'Kalendarz'],
  },
  {
    id: 'chronos-admin',
    defaultSegmentId: 'seg-chronos',
    title: 'Chronos Lite — Admin (Kalendarz / PDF / AI)',
    subtitle: 'Zintegrowany kokpit Chronos dla zarządu: synchronizacja kalendarza, notatki głosowe i raporty PDF.',
    href: '/admin/chronos',
    thumb: '/assets/hd_040.webp',
    badge: '/admin/chronos',
    spec: 'Synchronizacja + PDF',
    connections: ['Chronos Vault', 'Chronos Lekarza'],
  },
  {
    id: 'chronos-lekarz',
    defaultSegmentId: 'seg-chronos',
    title: 'Chronos Lite — Lekarz + Kalendarz',
    subtitle: 'Grafik lekarski, notatki głosowe z dyktowaniem pl-PL i szybkie przejście do zadań klinicznych.',
    href: '/lekarz/chronos',
    thumb: '/assets/hd_036.webp',
    badge: '/lekarz/chronos',
    spec: 'Panel Lekarza',
    connections: ['Protokoły Laserowe', 'Chronos Vault'],
  },
  {
    id: 'rezerwacja-cennik',
    defaultSegmentId: 'seg-chronos',
    title: 'Rezerwacja Wizyt & Cennik 21 Usług',
    subtitle: 'Wybór specjalisty, zabiegu i wolnego terminu wraz z powiadomieniem SMTP i rejestrem wizyt.',
    href: '/rezerwacja',
    thumb: '/assets/hd_027.webp',
    badge: '/rezerwacja · /cennik',
    spec: 'Booking Flow',
    connections: ['Panel Pacjenta', 'Google Calendar'],
  },
  {
    id: 'sklep-cml',
    defaultSegmentId: 'seg-chronos',
    title: 'Sklep Zabiegowy & Preparaty Pooperacyjne CML',
    subtitle: 'Pakiety konsultacji/zabiegów oraz katalog preparatów pooperacyjnych (LHP, HOCl) z koszykiem.',
    href: '/sklep',
    thumb: '/assets/hd_031.webp',
    badge: '/sklep',
    spec: 'Sklep + Koszyk',
    connections: ['Magazyn SKU', 'Koszyk'],
  },
  {
    id: 'magazyn-sku',
    defaultSegmentId: 'seg-chronos',
    title: 'Magazyn SKU & Zarządzanie Produktami',
    subtitle: 'Stany magazynowe, progi alarmowe, edycja cen i synchronizacja oferty ze sklepem online.',
    href: '/magazyn',
    thumb: '/assets/hd_032.webp',
    badge: '/magazyn · /admin/magazyn',
    spec: 'Inventory API',
    connections: ['Sklep', 'Panel Admina'],
  },
  {
    id: 'panele-logowanie',
    defaultSegmentId: 'seg-chronos',
    title: 'Logowanie: Strefa Pacjenta, Lekarza i Admina',
    subtitle: 'Autoryzowane panele ról, zarządzanie wizytami, usługami, lekarzami, zamówieniami i raportami 2FA.',
    href: '/logowanie',
    thumb: '/assets/hd_035.webp',
    badge: '/pacjent · /lekarz · /admin',
    spec: 'NextAuth RBAC',
    connections: ['Chronos Vault', 'Magazyn'],
  },

  // SEGMENT 03: MEDYCYNA ESTETYCZNA & BMCLINICS.AI
  {
    id: 'bmclinics-ai-hub',
    defaultSegmentId: 'seg-estetyka',
    title: 'BMClinics.ai — Pełny Portal Estetyczny (55 widoków)',
    subtitle: 'Scalony portal z diagnostyką skóry, 12 technologiami, wskazaniami, lekarzami, blogiem i trybem offline.',
    href: '/bmclinics-ai',
    thumb: '/assets/hd_013.webp',
    badge: '/bmclinics-ai',
    spec: '55 tras w :3016',
    connections: ['Diagnostyka Skóry', 'Technologie', 'Wskazania'],
  },
  {
    id: 'diagnostyka-skory',
    defaultSegmentId: 'seg-estetyka',
    title: 'Diagnostyka Skóry Warszawa',
    subtitle: 'Analiza potrzeb skóry twarzy krok po kroku i przygotowanie indywidualnej listy pytań do konsultacji.',
    href: '/diagnostyka-skory-warszawa',
    thumb: '/assets/hd_014.webp',
    badge: '/diagnostyka-skory-warszawa',
    spec: 'Analiza + Pytania',
    connections: ['Wskazania', 'Konsultacja'],
  },
  {
    id: 'technologie-12',
    defaultSegmentId: 'seg-estetyka',
    title: '12 Technologii Laserowych, RF i Plazmy',
    subtitle: 'AlexPulse CL300, Virtue RF, PicoKing, HIFU 6w1, Fusion Plasma, IPL BM14, Laser Tulowy 1927 nm.',
    href: '/technologie',
    thumb: '/assets/hd_018.webp',
    badge: '/technologie',
    spec: '12 kart urządzeń',
    connections: ['Medycyna Estetyczna', 'Bezpieczeństwo Laserów'],
  },
  {
    id: 'wskazania-kliniczne',
    defaultSegmentId: 'seg-estetyka',
    title: 'Wskazania (7 problemów klinicznych)',
    subtitle: 'Blizny potrądzikowe, naczynka i rumień, przebarwienia, rozstępy, trądzik, wiotkość owalu, włosy.',
    href: '/wskazania',
    thumb: '/assets/hd_016.webp',
    badge: '/wskazania',
    spec: '7 ścieżek leczenia',
    connections: ['Technologie', 'RenaSculpt'],
  },
  {
    id: 'medycyna-estetyczna-katalog',
    defaultSegmentId: 'seg-estetyka',
    title: 'Medycyna Estetyczna + Pakiety Offline HTML',
    subtitle: 'Katalog 11 technologii zgodny z ustawą o wyrobach medycznych + Aplikacja Bioelektryczna i Zimna Plazma.',
    href: '/medycyna-estetyczna',
    thumb: '/assets/hd_020.webp',
    badge: '/medycyna-estetyczna',
    spec: 'Next.js + 3 HTML',
    connections: ['BMClinics.ai', 'Akceleracja Gojenia'],
  },
  {
    id: 'akceleracja-gojenia',
    defaultSegmentId: 'seg-estetyka',
    title: 'Akceleracja Gojenia (Protokół 15 dni)',
    subtitle: 'Checklista pacjenta (PBM LED, HBOT, HOCl) z lokalnym zapisem postępu regeneracji.',
    href: '/akceleracja-gojenia',
    thumb: '/assets/hd_021.webp',
    badge: '/akceleracja-gojenia',
    spec: '49 kroków',
    connections: ['Sklep CML', 'Panel Pacjenta'],
  },
  {
    id: 'lekarze-renasculpt',
    defaultSegmentId: 'seg-estetyka',
    title: 'Zespół: dr Halina Gabara & dr Jan Bujok · RenaSculpt',
    subtitle: 'Profile lekarzy, bezinwazyjne modelowanie sylwetki RenaSculpt, bezpieczeństwo laserowe i funkcje offline.',
    href: '/lekarze',
    thumb: '/assets/hd_022.webp',
    badge: '/lekarze · /renasculpt',
    spec: 'Zespół & Zabiegi',
    connections: ['Konsultacja', 'Bezpieczeństwo Laserów'],
  },

  // SEGMENT 04: BAZA WIEDZY MCML & PROTOKOŁY
  {
    id: 'mcml-hub',
    defaultSegmentId: 'seg-wiedza',
    title: 'Portal Pacjenta & Baza Wiedzy MCML / LHP',
    subtitle: '67 stron edukacji medycznej, FAQ proktologiczne, pielęgnacja żył oraz quiz kwalifikacyjny.',
    href: '/mcml/dla-pacjenta',
    thumb: '/assets/hd_015.webp',
    badge: '/mcml/dla-pacjenta',
    spec: '67 podstron',
    connections: ['Przygotowanie LHP', 'Zgody'],
  },
  {
    id: 'mcml-lhp',
    defaultSegmentId: 'seg-wiedza',
    title: 'Zabiegi Laserowe EBM (LHP / EVLT / FiLaC)',
    subtitle: 'Karty procedur z infografikami i opisami metod małoinwazyjnych oszczędzających tkanki.',
    href: '/mcml/leczenie/lhp',
    thumb: '/assets/hd_019.webp',
    badge: '/mcml/leczenie/lhp',
    spec: 'EBM & Infografiki',
    connections: ['12 poradników', 'Rezerwacja'],
  },
  {
    id: 'mcml-prep',
    defaultSegmentId: 'seg-wiedza',
    title: 'Przygotowanie i Dziennik Gojenia MCML',
    subtitle: '12 poradników przedzabiegowych i instrukcji rekonwalescencji krok po kroku.',
    href: '/mcml/dla-pacjenta/przygotowanie-lhp',
    thumb: '/assets/hd_023.webp',
    badge: '/mcml/.../przygotowanie-lhp',
    spec: '12 poradników',
    connections: ['Panel Pacjenta', 'Blog'],
  },
  {
    id: 'protokoly-kb',
    defaultSegmentId: 'seg-wiedza',
    title: 'Protokoły Laserowe Lekarza (Baza KB JSON)',
    subtitle: 'Reguły kliniczne Tulowy/Erbowy, CL300, EL950, PS30, fenotypy skóry i Gut Prehab.',
    href: '/lekarz/protokoly',
    thumb: '/assets/hd_037.webp',
    badge: '/lekarz/protokoly',
    spec: '7 baz klinicznych',
    connections: ['Chronos Lekarza', 'Technologie'],
  },
  {
    id: 'twoj-problem-html',
    defaultSegmentId: 'seg-wiedza',
    title: 'Twój Problem (22 strefy · naprawione ikony SVG)',
    subtitle: 'Interaktywna ścieżka wywiadu objawowego z naprawionymi 22 ikonami SVG i linkami na :3016.',
    href: '/twoj-problem',
    thumb: '/assets/hd_017.webp',
    badge: '/twoj-problem',
    spec: 'Stabilized Landing',
    connections: ['Rezerwacja', 'Wskazania', 'Rozwiązania'],
  },
  {
    id: 'promedion-landing',
    defaultSegmentId: 'seg-estetyka',
    title: 'Landing Page: Promedion × BM Clinic',
    subtitle: 'Technologiczny landing page (HiFu 22D, Laser Pikosekundowy, X-Rite, RF) z wyodrębnionymi zasobami.',
    href: '/promedion',
    thumb: '/assets/hd_011.webp',
    badge: '/promedion',
    spec: 'Stabilized Landing',
    connections: ['Technologie', 'Kontakt'],
  },
  {
    id: 'bmsolutions-landing',
    defaultSegmentId: 'seg-ai-holding',
    title: 'Landing Page: BMSolutions.ai (pełna infrastruktura)',
    subtitle: 'Ustabilizowany landing page B2B AI/MedTech z naprawionymi wszystkimi 10 odnośnikami do modułów :3016.',
    href: '/bmsolutions',
    thumb: '/assets/hd_025.webp',
    badge: '/bmsolutions',
    spec: 'Stabilized Landing',
    connections: ['MySkinCode AI', 'Design Studio', 'Panel Admina'],
  },
  {
    id: 'laurka-milenki',
    defaultSegmentId: 'seg-klinika',
    title: 'Laurka dla Milenki ♥ (Rozpakowana)',
    subtitle: 'Interaktywna opowieść z wyodrębnionym wideo, kometami SVG i lokalnymi fontami bez blokad.',
    href: '/laurka',
    thumb: '/assets/hd_005.webp',
    badge: '/laurka',
    spec: 'Media + SVG',
    connections: ['Sky Lobby', 'Blog'],
  },
  {
    id: 'blog-faq',
    defaultSegmentId: 'seg-wiedza',
    title: 'Blog Medyczny, FAQ & Regulamin',
    subtitle: 'Artykuły przygotowania przedzabiegowego, najczęstsze pytania pacjentów oraz dokumenty RODO.',
    href: '/blog',
    thumb: '/assets/hd_024.webp',
    badge: '/blog · /faq',
    spec: 'Edukacja & Prawo',
    connections: ['BMClinics.ai Blog (14)'],
  },

  // SEGMENT 05: DESIGN STUDIO (:3017), HAPTYKA & 3D
  {
    id: 'design-studio-aether',
    defaultSegmentId: 'seg-design-3d',
    title: 'Design Studio × Aether (:3017 + :3016)',
    subtitle: 'Galeria modelowa + upload obrazów z automatycznym kodem 6-plikowych projektów, automatyzacje, Web-Kit/Mobile-Kit, sterowniki i Vercel.',
    href: '/design-studio',
    thumb: '/assets/aistudio/stwo_rz_front_aplikacji_w_tonacji_e7b9c384_2a0b46d0.jpg',
    badge: '/design-studio · /desingstudio',
    spec: 'Auto-Codegen + Kits',
    connections: ['Aether :3017', 'Sterowniki', 'Szablony Vercel'],
  },
  {
    id: 'aether-haptyka',
    defaultSegmentId: 'seg-design-3d',
    title: 'Aether Tactile Studio — Haptyka & CNC',
    subtitle: 'Symulator 120T CNC pokrętła, 14 profili dźwiękowych, kalibracja sterowników i shaderów na :3016.',
    href: '/aether/',
    thumb: '/assets/aistudio/real-metal-volume-button-free-vector_f64353d6.jpg',
    badge: '/aether/',
    spec: 'Bridge :3017',
    connections: ['Design Studio', 'Sterowniki'],
  },
  {
    id: 'spatial-3d',
    defaultSegmentId: 'seg-design-3d',
    title: 'Spatial 3D & Studio Skalowania UI',
    subtitle: 'Warstwy CSS 3D, WebBuilder, Companion i podgląd skalowania interfejsu przestrzennego.',
    href: '/spatial-3d/',
    thumb: '/assets/aistudio/1_5aae773b.png',
    badge: '/spatial-3d/',
    spec: 'Przestrzenny UI',
    connections: ['Parallax 3D', 'Design Studio'],
  },
  {
    id: 'parallax-3d',
    defaultSegmentId: 'seg-design-3d',
    title: 'Parallax 3D — Mapy Głębi Three.js',
    subtitle: 'Konwersja zdjęć kliniki do przestrzennych scen 3D napędzanych mapą głębi w czasie rzeczywistym.',
    href: '/parallax-3d/',
    thumb: '/assets/hd_029.webp',
    badge: '/parallax-3d/',
    spec: 'Three.js Depth',
    connections: ['Spatial 3D', 'Sky Lobby'],
  },
  {
    id: 'cml-wilanow-3d',
    defaultSegmentId: 'seg-design-3d',
    title: 'CML Proktologia Wilanów 3D',
    subtitle: 'Dedykowana trójwymiarowa prezentacja ścieżki leczenia proktologicznego w Wilanowie.',
    href: '/cml-wilanow/',
    thumb: '/assets/hd_033.webp',
    badge: '/cml-wilanow/',
    spec: 'Proktologia 3D',
    connections: ['Proktologia', 'Rezerwacja'],
  },
  {
    id: 'ruta-offline',
    defaultSegmentId: 'seg-design-3d',
    title: 'BM Clinic — RUTA Interactive',
    subtitle: 'Interaktywny podgląd koncepcyjny RUTA osadzony pod ścieżką /ruta/.',
    href: '/ruta/',
    thumb: '/assets/hd_034.webp',
    badge: '/ruta/',
    spec: 'Prezentacja Interactive',
    connections: ['Sky Lobby', 'Design Studio'],
  },

  // SEGMENT 06: HOLDING, BEZPIECZEŃSTWO & AGENCI AI
  {
    id: 'holding-seo',
    defaultSegmentId: 'seg-ai-holding',
    title: 'BM Holding — SEO/AEO, GitHub, Google Drive & Skaner',
    subtitle: 'Telemetria CPU, skaner plików i integralności, konfiguracja SEO/AEO oraz integracja z dyskiem.',
    href: '/holding',
    thumb: '/assets/hd_041.webp',
    badge: '/holding',
    spec: 'Security & SEO',
    connections: ['Chronos Vault', 'Superagent'],
  },
  {
    id: 'myskincode-ai',
    defaultSegmentId: 'seg-ai-holding',
    title: 'MySkinCode AI — MSC-MATRIX V2',
    subtitle: 'System analizy kodu skóry, macierz wskazań kosmetologiczno-medycznych i eksport raportów.',
    href: '/myskincode-ai/',
    thumb: '/assets/hd_026.webp',
    badge: '/myskincode-ai/',
    spec: 'Vision & Skin AI',
    connections: ['Diagnostyka Skóry', 'Medycyna Estetyczna'],
  },
  {
    id: 'taskkill-map',
    defaultSegmentId: 'seg-ai-holding',
    title: 'Drzewo Zadań & Raport Wdrożeniowy',
    subtitle: 'Wizualna mapa zadań scalenia :3016 oraz statusy wykonania zsynchronizowane z Chronos Vault.',
    href: '/taskkill/?map=scalenie-3016',
    thumb: '/assets/hd_042.webp',
    badge: '/taskkill/',
    spec: 'MindMap + Tasks',
    connections: ['Chronos Vault', 'Admin Chronos'],
  },
  {
    id: 'ai-studio-app',
    defaultSegmentId: 'seg-ai-holding',
    title: 'AI Studio App — Zadania, 2FA i Raporty',
    subtitle: 'Moduł automatyzacji zadań, weryfikacji bezpieczeństwa 2FA oraz kalendarza projektowego.',
    href: '/ai-studio-app/',
    thumb: '/assets/hd_043.webp',
    badge: '/ai-studio-app/',
    spec: 'Automatyzacja & 2FA',
    connections: ['Holding', 'Chronos Vault'],
  },
  {
    id: 'superagent-guard',
    defaultSegmentId: 'seg-ai-holding',
    title: 'Superagent AI Safety — Guard & Redact PII',
    subtitle: 'Lokalna bramka bezpieczeństwa danych wrażliwych pacjentów (RODO/PII) przed wysłaniem do LLM.',
    href: '/superagent',
    thumb: '/assets/hd_044.webp',
    badge: '/superagent',
    spec: 'Guard + Redact',
    connections: ['Agent LLM', 'Holding'],
  },
  {
    id: 'voice-agent-llm',
    defaultSegmentId: 'seg-ai-holding',
    title: 'Voice Builder LLM & Agent LLM (agy-operator)',
    subtitle: 'Sterowanie budową głosem po polsku (macOS TTS + Whisper/Ollama M1 Pro) oraz strumieniowy czat operatora.',
    href: '/voice-builder',
    thumb: '/assets/hd_038.webp',
    badge: '/voice-builder · /agent-llm',
    spec: 'Ollama M1 Pro',
    connections: ['Chronos Voice', 'Superagent'],
  },
];

const SEGMENT_OVERRIDE_KEY = 'bmclinic_sitemap_segment_overrides_v1';

export default function InteractiveSitemapClient() {
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [segmentOverrides, setSegmentOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SEGMENT_OVERRIDE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        if (parsed && typeof parsed === 'object') {
          setSegmentOverrides(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const updateItemSegment = (itemId: string, nextSegmentId: string) => {
    setSegmentOverrides((prev) => {
      const next = { ...prev, [itemId]: nextSegmentId };
      try {
        localStorage.setItem(SEGMENT_OVERRIDE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const resetSegments = () => {
    setSegmentOverrides({});
    try {
      localStorage.removeItem(SEGMENT_OVERRIDE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const groupedSegments = useMemo(() => {
    return INITIAL_SEGMENTS.map((seg) => {
      const items = INITIAL_ITEMS.filter((item) => {
        const effSegment = segmentOverrides[item.id] || item.defaultSegmentId;
        if (effSegment !== seg.id) return false;
        if (!normalizedQuery) return true;
        return (
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.subtitle.toLowerCase().includes(normalizedQuery) ||
          item.href.toLowerCase().includes(normalizedQuery) ||
          item.connections.some((c) => c.toLowerCase().includes(normalizedQuery))
        );
      });
      return { segment: seg, items };
    }).filter((g) => (selectedSegmentId === 'all' ? true : g.segment.id === selectedSegmentId));
  }, [normalizedQuery, segmentOverrides, selectedSegmentId]);

  const totalVisible = useMemo(
    () => groupedSegments.reduce((acc, g) => acc + g.items.length, 0),
    [groupedSegments]
  );

  const hasCustomOverrides = Object.keys(segmentOverrides).length > 0;

  return (
    <div className="min-h-screen bg-[#060a09] text-[#f4f1ea] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Architectural Header */}
        <header className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-[#091512] via-[#070d0c] to-[#0a1019] p-6 sm:p-8 aether-fresnel-top space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                BM Clinic × Chronos Vault × BMClinics.ai · Architektura Segmentowa :3016
              </div>
              <h1 className="text-3xl font-serif font-normal tracking-tight text-white sm:text-4xl">
                Mapa Całej Strony Pogrupowana w 6 Segmentów
              </h1>
              <p className="max-w-3xl text-sm text-[#b8c0be] leading-relaxed">
                Wszystkie połączone moduły na jednym hoście <code className="text-emerald-300">localhost:3016</code>:
                klinika, wpięty <strong>Chronos Vault</strong> (/vault/ + Kalendarz + Sklep + Magazyn), 55 widoków{' '}
                <strong>BMClinics.ai</strong>, Baza MCML, <strong>Design Studio (:3017)</strong>, 3D oraz Holding z Agentami AI.
                Każdy kafelek możesz filtrować lub przenieść między segmentami.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <Link
                href="/"
                className="rounded-xl bg-[#d4af37] px-4 py-2.5 text-xs font-bold text-[#090b10] hover:bg-[#e5c453] transition"
              >
                ← Wróć do Sky Lobby
              </Link>
              <Link
                href="/vault/"
                className="rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-4 py-2.5 text-xs font-bold text-emerald-200 hover:bg-emerald-500/25 transition"
              >
                Otwórz Chronos Vault ↗
              </Link>
              <Link
                href="/design-studio"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:border-amber-300/60 transition"
              >
                Design Studio ↗
              </Link>
            </div>
          </div>

          {/* Search + Controls + Segment Filter Bar */}
          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[230px]">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj modułu, adresu (np. chronos, vault, sklep, laser, aether)..."
                  className="w-full rounded-xl border border-white/15 bg-black/50 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/40 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    viewMode === 'grid' ? 'bg-amber-300 text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Grid2x2 className="h-3.5 w-3.5" />
                  Karty
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    viewMode === 'compact' ? 'bg-amber-300 text-slate-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <List className="h-3.5 w-3.5" />
                  Lista
                </button>
              </div>

              {hasCustomOverrides && (
                <button
                  type="button"
                  onClick={resetSegments}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-400/35 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/20 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Przywróć domyślne segmenty
                </button>
              )}

              <span className="text-xs font-mono text-slate-400">
                Widocznych modułów: <strong className="text-emerald-300">{totalVisible}</strong>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedSegmentId('all')}
                className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  selectedSegmentId === 'all'
                    ? 'border-amber-300/70 bg-amber-300 text-slate-950'
                    : 'border-white/15 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                Wszystkie segmenty ({INITIAL_ITEMS.length})
              </button>
              {INITIAL_SEGMENTS.map((seg) => {
                const count = INITIAL_ITEMS.filter(
                  (it) => (segmentOverrides[it.id] || it.defaultSegmentId) === seg.id
                ).length;
                const active = selectedSegmentId === seg.id;
                return (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => setSelectedSegmentId(seg.id)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      active
                        ? 'border-white/50 bg-white/15 text-white'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: seg.accent }}
                    />
                    <span>
                      {seg.number}. {seg.title.split(',')[0]} ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Segmented Architectural Grid */}
        <div className="space-y-10">
          {groupedSegments.map(({ segment, items }) => (
            <section key={segment.id} className="space-y-4">
              <div
                className="flex flex-wrap items-center justify-between gap-2 border-l-4 pl-4"
                style={{ borderColor: segment.accent }}
              >
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest" style={{ color: segment.accent }}>
                    Segment {segment.number} · {items.length} modułów
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif text-white">{segment.title}</h2>
                  <p className="text-xs text-[#9ea8a6] mt-0.5">{segment.desc}</p>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center text-xs text-slate-400">
                  Brak pasujących modułów w tym segmencie dla aktualnego filtra.
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => {
                    const effectiveSeg = segmentOverrides[item.id] || item.defaultSegmentId;
                    return (
                      <div
                        key={item.id}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1413] transition hover:-translate-y-0.5 hover:border-amber-300/60 hover:shadow-2xl aether-fresnel-top"
                      >
                        {item.external ? (
                          <a href={item.href} target="_blank" rel="noreferrer" className="block relative h-36 w-full overflow-hidden bg-black/50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.thumb}
                              alt={item.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                            <span className="absolute top-2.5 left-2.5 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-[#e8ca64] backdrop-blur">
                              {item.badge}
                            </span>
                            <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/80 px-2 py-0.5 text-[10px] text-white/90">
                              {item.spec}
                            </span>
                          </a>
                        ) : (
                          <Link href={item.href} className="block relative h-36 w-full overflow-hidden bg-black/50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.thumb}
                              alt={item.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                            <span className="absolute top-2.5 left-2.5 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-[#e8ca64] backdrop-blur">
                              {item.badge}
                            </span>
                            <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/80 px-2 py-0.5 text-[10px] text-white/90">
                              {item.spec}
                            </span>
                          </Link>
                        )}

                        <div className="flex flex-1 flex-col justify-between p-4 gap-3">
                          <div>
                            {item.external ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-[#e8ca64]"
                              >
                                <span>{item.title}</span>
                                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
                              </a>
                            ) : (
                              <Link
                                href={item.href}
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-[#e8ca64]"
                              >
                                <span>{item.title}</span>
                                <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-70" />
                              </Link>
                            )}
                            <p className="mt-1.5 text-xs leading-relaxed text-[#a8b3b0]">
                              {item.subtitle}
                            </p>
                          </div>

                          <div className="space-y-2.5 border-t border-white/10 pt-3">
                            <div className="flex flex-wrap gap-1">
                              {item.connections.map((conn) => (
                                <span
                                  key={conn}
                                  className="rounded bg-white/6 px-2 py-0.5 text-[10px] text-[#d5cfc2]"
                                >
                                  → {conn}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between gap-2 text-[10px]">
                              <span className="inline-flex items-center gap-1 text-slate-400">
                                <FolderKanban className="h-3 w-3" />
                                Segment:
                              </span>
                              <select
                                aria-label={`Zmień segment dla ${item.title}`}
                                value={effectiveSeg}
                                onChange={(e) => updateItemSegment(item.id, e.target.value)}
                                className="max-w-[165px] rounded-lg border border-white/15 bg-black/60 px-2 py-1 text-[10px] text-slate-200 outline-none focus:border-emerald-400"
                              >
                                {INITIAL_SEGMENTS.map((opt) => (
                                  <option key={opt.id} value={opt.id}>
                                    {opt.number}. {opt.title.split(',')[0]}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#0d1413]">
                  {items.map((item) => {
                    const effectiveSeg = segmentOverrides[item.id] || item.defaultSegmentId;
                    return (
                      <div
                        key={item.id}
                        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hover:bg-white/[0.03]"
                      >
                        <div className="min-w-[220px] flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {item.external ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-bold text-white hover:text-amber-300"
                              >
                                {item.title} ↗
                              </a>
                            ) : (
                              <Link
                                href={item.href}
                                className="text-sm font-bold text-white hover:text-amber-300"
                              >
                                {item.title} →
                              </Link>
                            )}
                            <code className="rounded bg-black/60 px-2 py-0.5 text-[11px] text-amber-300">
                              {item.badge}
                            </code>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
                        </div>
                        <select
                          aria-label={`Zmień segment dla ${item.title}`}
                          value={effectiveSeg}
                          onChange={(e) => updateItemSegment(item.id, e.target.value)}
                          className="rounded-lg border border-white/15 bg-black/60 px-2.5 py-1.5 text-xs text-slate-200"
                        >
                          {INITIAL_SEGMENTS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.number}. {opt.title.split(',')[0]}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
