export interface KitButtonPreset {
  id: string;
  name: string;
  platform: 'Web-Kit' | 'Mobile-Kit' | 'Web & Mobile (:3017)';
  usage: string;
  touchTarget: string;
  tailwindCode: string;
  htmlCssCode: string;
}

export interface KitLayoutPreset {
  id: string;
  name: string;
  platform: 'Web-Kit' | 'Mobile-Kit';
  description: string;
  gridSpec: string;
  tsxSnippet: string;
}

export interface TrendPortalLink {
  id: string;
  name: string;
  category: 'UI/UX Awards' | 'Shots & Systems' | 'Mobile Patterns' | 'Interactive & Code' | 'Dev Launches';
  url: string;
  description: string;
}

export interface VercelTemplateLink {
  id: string;
  name: string;
  stack: string;
  url: string;
  description: string;
}

export const KIT_BUTTON_PRESETS: KitButtonPreset[] = [
  {
    id: 'btn-cnc-3d-tactile',
    name: '1. CNC 3D Tactile Pushbutton (:3017)',
    platform: 'Web & Mobile (:3017)',
    usage: 'Główna akcja sprzętowo-cyfrowa, aktywacja audio/3D, checkout premium',
    touchTarget: '48px height · Fresnel bevel',
    tailwindCode: `<button className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#e6cf9f] via-[#c4a874] to-[#8b7355] px-6 py-3.5 text-sm font-bold text-[#041010] shadow-[0_6px_0_#1e1912,0_14px_28px_-6px_rgba(212,180,106,0.5),inset_0_1px_0_rgba(255,255,255,0.65)] transition active:translate-y-1 active:shadow-[0_2px_0_#1e1912]">
  Aktywuj Moduł 3D ↗
</button>`,
    htmlCssCode: `<button style="padding:14px 24px;border-radius:14px;border:0;background:linear-gradient(180deg,#e6cf9f,#c4a874 60%,#8b7355);color:#041010;font-weight:700;box-shadow:0 6px 0 #1e1912,0 14px 28px rgba(212,180,106,.45),inset 0 1px 0 rgba(255,255,255,.65);cursor:pointer;">Aktywuj Moduł 3D ↗</button>`,
  },
  {
    id: 'btn-pill-emerald',
    name: '2. Pill Primary Emerald CTA',
    platform: 'Web & Mobile (:3017)',
    usage: 'Rezerwacja wizyty, zapis formularza, kluczowe CTA w nagłówku',
    touchTarget: '44px+ WCAG AAA',
    tailwindCode: `<button className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_10px_30px_-8px_rgba(52,211,153,0.6)] hover:bg-emerald-300 active:scale-[0.98] transition">
  Umów konsultację <span>→</span>
</button>`,
    htmlCssCode: `<button style="padding:12px 24px;border-radius:9999px;border:0;background:#34d399;color:#020617;font-weight:700;box-shadow:0 10px 30px -8px rgba(52,211,153,.6);cursor:pointer;">Umów konsultację →</button>`,
  },
  {
    id: 'btn-ghost-fresnel',
    name: '3. Ghost Glass + Fresnel Top Edge',
    platform: 'Web-Kit',
    usage: 'Akcje drugorzędne na ciemnym tle lub zdjęciu hero',
    touchTarget: '44px min-height',
    tailwindCode: `<button className="aether-fresnel-top rounded-xl border border-white/20 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl hover:bg-white/[0.14] transition">
  Zobacz dokumentację
</button>`,
    htmlCssCode: `<button style="padding:12px 20px;border-radius:12px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);backdrop-filter:blur(18px);color:#fff;font-weight:600;box-shadow:inset 0 1px 0 rgba(255,255,255,.22);cursor:pointer;">Zobacz dokumentację</button>`,
  },
  {
    id: 'btn-split-badge',
    name: '4. Split CTA + Status Badge',
    platform: 'Web-Kit',
    usage: 'Płatności, uruchomienie automatyzacji z podglądem kosztu / statusu',
    touchTarget: '48px height · dual-zone',
    tailwindCode: `<button className="inline-flex items-center overflow-hidden rounded-xl border border-amber-400/40 bg-slate-900/90 text-xs font-bold text-white hover:border-amber-300 transition">
  <span className="px-4 py-3">Wygeneruj Projekt</span>
  <span className="border-l border-amber-400/30 bg-amber-400/15 px-3 py-3 text-amber-300">6 plików</span>
</button>`,
    htmlCssCode: `<button style="display:inline-flex;align-items:center;border-radius:12px;border:1px solid rgba(251,191,36,.4);background:#0f172a;color:#fff;font-weight:700;overflow:hidden;cursor:pointer;"><span style="padding:12px 16px;">Wygeneruj Projekt</span><span style="padding:12px 14px;border-left:1px solid rgba(251,191,36,.3);background:rgba(251,191,36,.15);color:#fcd34d;">6 plików</span></button>`,
  },
  {
    id: 'btn-segmented-control',
    name: '5. Segmented Control / Toggle Pill',
    platform: 'Web & Mobile (:3017)',
    usage: 'Przełączanie trybu widoku (Mobile/Desktop), skórek lub filtrów',
    touchTarget: '40px–44px per segment',
    tailwindCode: `<div className="inline-flex rounded-xl border border-white/15 bg-black/50 p-1">
  <button className="rounded-lg bg-emerald-500/25 px-3.5 py-2 text-xs font-semibold text-emerald-200 border border-emerald-400/40">Mobile-Kit</button>
  <button className="rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white">Web-Kit</button>
</div>`,
    htmlCssCode: `<div style="display:inline-flex;padding:4px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(0,0,0,.5);"><button style="padding:8px 14px;border-radius:8px;border:1px solid rgba(52,211,153,.4);background:rgba(16,185,129,.22);color:#a7f3d0;font-weight:600;">Mobile-Kit</button><button style="padding:8px 14px;border:0;background:transparent;color:#94a3b8;font-weight:600;">Web-Kit</button></div>`,
  },
  {
    id: 'btn-mobile-fab',
    name: '6. Mobile Floating Action Button (FAB)',
    platform: 'Mobile-Kit',
    usage: 'Szybkie dodanie obrazu / skan / czat w strefie kciuka',
    touchTarget: '56×56px (Material + iOS HIG)',
    tailwindCode: `<button aria-label="Dodaj obraz" className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 shadow-[0_14px_30px_rgba(16,185,129,0.5)] flex items-center justify-center text-xl font-bold active:scale-95 transition">
  +
</button>`,
    htmlCssCode: `<button style="width:56px;height:56px;border-radius:9999px;border:0;background:linear-gradient(135deg,#34d399,#0d9488);color:#020617;font-size:22px;font-weight:700;box-shadow:0 14px 30px rgba(16,185,129,.5);cursor:pointer;">+</button>`,
  },
  {
    id: 'btn-sticky-bottom-bar',
    name: '7. Mobile Sticky Thumb-Zone Action Bar',
    platform: 'Mobile-Kit',
    usage: 'Dolny pasek akcji w telefonie: główny CTA (75%) + telefon/chat (25%)',
    touchTarget: '52px safe-area-inset-bottom',
    tailwindCode: `<div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/95 p-2.5 backdrop-blur-xl">
  <button className="flex-1 rounded-xl bg-amber-300 py-3 text-xs font-bold text-slate-950">Zarezerwuj termin</button>
  <button className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-semibold text-white">Zadzwoń</button>
</div>`,
    htmlCssCode: `<div style="display:flex;gap:8px;padding:10px;border-radius:16px;border:1px solid rgba(255,255,255,.15);background:rgba(2,6,23,.95);"><button style="flex:1;padding:12px;border-radius:12px;border:0;background:#fcd34d;color:#020617;font-weight:700;">Zarezerwuj termin</button><button style="padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.1);color:#fff;font-weight:600;">Zadzwoń</button></div>`,
  },
];

export const KIT_LAYOUT_PRESETS: KitLayoutPreset[] = [
  {
    id: 'web-topbar-glass',
    name: 'Web-Kit: Glass Topbar + Brand + Primary CTA',
    platform: 'Web-Kit',
    description: 'Pływający pasek nawigacji z backdrop-blur, grawerowaną linią Fresnel i maksymalnie 5 punktami menu.',
    gridSpec: 'flex justify-between items-center · h-16 · backdrop-blur-xl',
    tsxSnippet: `<header className="sticky top-3 z-40 mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/15 bg-slate-950/75 px-5 py-3 backdrop-blur-xl aether-fresnel-top">
  <span className="font-serif text-lg text-amber-200">BM CLINIC · STUDIO</span>
  <nav className="hidden md:flex gap-6 text-xs uppercase tracking-widest text-slate-300">
    <a href="#galeria">Galeria</a><a href="#kity">Kity UI</a><a href="#sterowniki">Sterowniki</a>
  </nav>
  <button className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-bold text-slate-950">Start ↗</button>
</header>`,
  },
  {
    id: 'web-bento-telemetry',
    name: 'Web-Kit: Bento Grid 12-Col (Telemetry + Preview)',
    platform: 'Web-Kit',
    description: 'Asymetryczna siatka 7/5 do kokpitów produkcyjnych (Aether :3017 × BM Clinic :3016).',
    gridSpec: 'grid grid-cols-1 lg:grid-cols-12 gap-5',
    tsxSnippet: `<section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
  <div className="lg:col-span-7 rounded-3xl border border-emerald-400/25 bg-[#061513] p-6 aether-fresnel-top">Główna scena / Live Canvas</div>
  <div className="lg:col-span-5 grid gap-4">
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">Metryka WCAG & FPS</div>
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">Aktywny sterownik :3017</div>
  </div>
</section>`,
  },
  {
    id: 'web-command-palette',
    name: 'Web-Kit: Command Bar (⌘K Spotlight Search)',
    platform: 'Web-Kit',
    description: 'Błyskawiczny pasek poleceń do nawigacji po komponentach, kodzie i automatyzacjach.',
    gridSpec: 'max-w-xl · border-emerald-400/30 · kbd shortcuts',
    tsxSnippet: `<div className="max-w-xl rounded-2xl border border-emerald-400/35 bg-[#050d0c]/95 p-3 shadow-2xl">
  <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
    <span className="text-emerald-400 text-xs font-mono">⌘K</span>
    <input className="w-full bg-transparent text-sm text-white outline-none" placeholder="Szukaj układu, przycisku lub szablonu..." />
  </div>
</div>`,
  },
  {
    id: 'mob-bottom-tabbar',
    name: 'Mobile-Kit: Bottom Tab Navigation (4 sloty)',
    platform: 'Mobile-Kit',
    description: 'Ergonomiczna dolna belka nawigacyjna pod kciuk (44px+ hit areas, bezpieczny margines iOS).',
    gridSpec: 'grid-cols-4 · min-h-[56px] · pb-safe',
    tsxSnippet: `<nav className="grid grid-cols-4 rounded-2xl border border-white/15 bg-slate-950/95 p-1.5 text-[11px] font-semibold">
  <button className="rounded-xl bg-emerald-500/20 py-2.5 text-emerald-300">Start</button>
  <button className="py-2.5 text-slate-400">Galeria</button>
  <button className="py-2.5 text-slate-400">Kody</button>
  <button className="py-2.5 text-slate-400">Profil</button>
</nav>`,
  },
  {
    id: 'mob-bottom-sheet',
    name: 'Mobile-Kit: Konfigurowalny Bottom Sheet',
    platform: 'Mobile-Kit',
    description: 'Wysuwana szuflada z uchwytem (drag handle) do szybkiej rezerwacji i parametrów przycisku.',
    gridSpec: 'rounded-t-3xl · max-h-[80dvh] · handle pill',
    tsxSnippet: `<div className="rounded-t-3xl border-t border-white/20 bg-[#081312] px-5 pt-3 pb-6 space-y-4">
  <div className="mx-auto h-1.5 w-12 rounded-full bg-white/25" />
  <div className="text-sm font-bold text-white">Szybka konfiguracja UI</div>
  <button className="w-full rounded-xl bg-amber-300 py-3 text-xs font-bold text-slate-950">Zastosuj styl</button>
</div>`,
  },
];

export const TREND_PORTALS: TrendPortalLink[] = [
  {
    id: 'awwwards',
    name: 'Awwwards — Sites of the Day',
    category: 'UI/UX Awards',
    url: 'https://www.awwwards.com/websites/',
    description: 'Najwyżej oceniane animacje WebGL, scroll-telling i typografia na świecie.',
  },
  {
    id: 'godly',
    name: 'Godly.website — Curated Web Inspiration',
    category: 'UI/UX Awards',
    url: 'https://godly.website/',
    description: 'Świeże, astronomicznie dopracowane strony SaaS, AI i studiów produktowych.',
  },
  {
    id: 'dribbble',
    name: 'Dribbble — Popular Shots',
    category: 'Shots & Systems',
    url: 'https://dribbble.com/shots/popular',
    description: 'Aktualne mikrointerakcje, dark UI, glassmorphism i design systemy.',
  },
  {
    id: 'layers',
    name: 'Layers.to — Trending Design',
    category: 'Shots & Systems',
    url: 'https://layers.to/explore',
    description: 'Nowoczesna platforma showcase dla projektantów interfejsów i aplikacji AI.',
  },
  {
    id: 'mobbin',
    name: 'Mobbin — Real Mobile & Web UI Flows',
    category: 'Mobile Patterns',
    url: 'https://mobbin.com/browse/ios/apps',
    description: 'Tysiące produkcyjnych ekranów iOS/Android i najlepszych wzorców mobile-kit.',
  },
  {
    id: 'landbook',
    name: 'Land-book — Landing Pages Gallery',
    category: 'Shots & Systems',
    url: 'https://land-book.com/',
    description: 'Przejrzyste landing pages medyczne, technologiczne i komercyjne.',
  },
  {
    id: 'codepen',
    name: 'CodePen — Trending Frontend Shaders & CSS',
    category: 'Interactive & Code',
    url: 'https://codepen.io/trending',
    description: 'Żywe snippety CSS/WGSL/Three.js, przyciski 3D i kinetyczne efekty obrysu.',
  },
  {
    id: 'ui8',
    name: 'UI8 — UI Kits & 3D Asset Systems',
    category: 'Shots & Systems',
    url: 'https://ui8.net/',
    description: 'Profesjonalne zestawy UI Kit (Web + Mobile) w Figma, React i Tailwind.',
  },
  {
    id: 'figma-community',
    name: 'Figma Community — UI Kits & Design Tokens',
    category: 'Mobile Patterns',
    url: 'https://www.figma.com/community',
    description: 'Darmowe i komercyjne biblioteki komponentów, tokeny i ikony.',
  },
  {
    id: 'producthunt',
    name: 'Product Hunt — Today Leaderboard',
    category: 'Dev Launches',
    url: 'https://www.producthunt.com/',
    description: 'Codzienne premiery narzędzi AI/design-dev i nowoczesne interfejsy start-upów.',
  },
];

export const VERCEL_TEMPLATE_LINKS: VercelTemplateLink[] = [
  {
    id: 'vercel-all',
    name: 'Vercel Templates — Pełny Katalog (Wszystkie)',
    stack: 'Full Directory',
    url: 'https://vercel.com/templates',
    description: 'Kompletna oficjalna biblioteka produkcyjnych szablonów Vercel (Next.js, AI, SaaS, Store).',
  },
  {
    id: 'vercel-nextjs',
    name: 'Next.js Boilerplates & App Router',
    stack: 'Next.js 15 + React 19',
    url: 'https://vercel.com/templates/next.js',
    description: 'Oficjalne startery App Router, RSC, PPR i Tailwind CSS.',
  },
  {
    id: 'vercel-ai',
    name: 'AI Apps, Agents & Chatbot Templates',
    stack: 'Vercel AI SDK + Streaming',
    url: 'https://vercel.com/templates/ai',
    description: 'Szablony czatów multimodalnych, RAG, narzędzi vision i agentów.',
  },
  {
    id: 'vercel-saas',
    name: 'SaaS & Subscription Platforms',
    stack: 'Auth + Stripe + Prisma',
    url: 'https://vercel.com/templates/saas',
    description: 'Kompletne aplikacje SaaS z logowaniem, panelami i billingiem.',
  },
  {
    id: 'vercel-ecommerce',
    name: 'Ecommerce & Headless Storefront',
    stack: 'Next.js Commerce',
    url: 'https://vercel.com/templates/ecommerce',
    description: 'Szybkie sklepy internetowe z koszykiem, magazynem i checkoutem.',
  },
  {
    id: 'vercel-admin',
    name: 'Admin & Analytics Dashboards',
    stack: 'Telemetry + Charts',
    url: 'https://vercel.com/templates/admin-dashboard',
    description: 'Gotowe panele zarządzania, tabele danych i wykresy w czasie rzeczywistym.',
  },
  {
    id: 'vercel-portfolio',
    name: 'Portfolio & Agency Showcase',
    stack: 'Motion + Editorial UI',
    url: 'https://vercel.com/templates/portfolio',
    description: 'Nowoczesne portfolio wizualne, galerie 3D i animowane prezentacje marek.',
  },
  {
    id: 'vercel-docs',
    name: 'Documentation & Knowledge Bases',
    stack: 'MDX + Search',
    url: 'https://vercel.com/templates/documentation',
    description: 'Bazy wiedzy, dokumentacje API i portale dla deweloperów.',
  },
];
