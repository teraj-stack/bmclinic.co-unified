import fs from 'node:fs';
import path from 'node:path';

export type AetherAnimationMode =
  | 'border-beam'
  | 'prism-sweep'
  | 'etch-breathe'
  | 'shimmer-glass'
  | 'rotary-3d';

export interface GalleryProjectPalette {
  bg: string;
  surface: string;
  accent: string;
  text: string;
  muted: string;
}

export interface GeneratedCodeBundle {
  indexHtml: string;
  appTsx: string;
  indexCss: string;
  heroSectionTsx: string;
  packageJson: string;
  readmeMd: string;
}

export interface DesignGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'model' | 'uploaded';
  imageUrl: string;
  aspectRatio: string;
  animationMode: AetherAnimationMode;
  kitTarget: 'web-kit' | 'mobile-kit' | 'hybrid';
  buttonStyle: 'cnc-3d-tactile' | 'pill-primary' | 'ghost-glass' | 'split-badge';
  palette: GalleryProjectPalette;
  wcagContrast: string;
  createdAt: string;
  automationLog: string[];
  codeBundle: GeneratedCodeBundle;
}

export interface DriverPackageEntry {
  id: string;
  name: string;
  category: 'haptic-3017' | 'webgl-3d' | 'vision-ai' | 'local-llm' | 'framework' | 'audio-tts';
  version: string;
  latestVersion: string;
  status: 'installed' | 'synced-3017' | 'ready';
  source: string;
  capabilities: string[];
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data', 'design-studio');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const DRIVERS_FILE = path.join(DATA_DIR, 'drivers.json');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function buildCompleteFrontendBundle(input: {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  animationMode: AetherAnimationMode;
  kitTarget: 'web-kit' | 'mobile-kit' | 'hybrid';
  buttonStyle: 'cnc-3d-tactile' | 'pill-primary' | 'ghost-glass' | 'split-badge';
  palette: GalleryProjectPalette;
}): GeneratedCodeBundle {
  const safeSlug =
    input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'aether-frontend';

  const animClass =
    input.animationMode === 'border-beam'
      ? 'animate-border-beam'
      : input.animationMode === 'prism-sweep'
        ? 'animate-prism-sweep'
        : input.animationMode === 'etch-breathe'
          ? 'animate-etch-breathe'
          : input.animationMode === 'rotary-3d'
            ? 'animate-active-halo'
            : 'animate-shimmer';

  const buttonRadius =
    input.buttonStyle === 'pill-primary'
      ? '9999px'
      : input.buttonStyle === 'cnc-3d-tactile'
        ? '14px'
        : input.buttonStyle === 'ghost-glass'
          ? '12px'
          : '16px';

  const buttonShadow =
    input.buttonStyle === 'cnc-3d-tactile'
      ? `0 6px 0 ${input.palette.bg}, 0 14px 30px -6px ${input.palette.accent}66, inset 0 1px 0 rgba(255,255,255,0.45)`
      : `0 12px 28px -8px ${input.palette.accent}55`;

  const indexCss = `@import "tailwindcss";

:root {
  --studio-bg: ${input.palette.bg};
  --studio-surface: ${input.palette.surface};
  --studio-accent: ${input.palette.accent};
  --studio-text: ${input.palette.text};
  --studio-muted: ${input.palette.muted};
}

@keyframes shimmerSlide {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes aetherBorderSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes aetherPrismSweep {
  0%, 100% { opacity: 0.4; transform: translateX(-12%) skewX(-16deg); }
  50% { opacity: 0.9; transform: translateX(12%) skewX(-16deg); }
}
@keyframes aetherEtchBreathe {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 0.9; }
}
@keyframes aetherActiveHalo {
  0%, 100% { box-shadow: 0 0 16px ${input.palette.accent}33, inset 0 1px 0 rgba(255,255,255,0.16); }
  50% { box-shadow: 0 0 32px ${input.palette.accent}66, inset 0 1px 0 rgba(255,255,255,0.28); }
}

.aether-fresnel-top {
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 0 rgba(0, 0, 0, 0.45);
}
.aether-cta-primary {
  background: linear-gradient(135deg, ${input.palette.accent}, #f4e6cf);
  color: ${input.palette.bg};
  border-radius: ${buttonRadius};
  box-shadow: ${buttonShadow};
}
`;

  const heroSectionTsx = `import React from 'react';

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-white/15 p-8 md:p-12 aether-fresnel-top ${animClass}"
      style={{ background: '${input.palette.surface}', color: '${input.palette.text}' }}
    >
      <div className="grid gap-8 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
            style={{ background: '${input.palette.accent}22', color: '${input.palette.accent}' }}
          >
            Aether :3017 · ${input.kitTarget.toUpperCase()}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-normal tracking-tight">
            ${input.title}
          </h1>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '${input.palette.muted}' }}>
            ${input.subtitle}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              className="aether-cta-primary px-6 py-3.5 text-sm font-bold tracking-wide transition hover:scale-[1.02] active:scale-[0.98]"
            >
              Uruchom konfigurator ↗
            </button>
            <button
              type="button"
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold backdrop-blur-md hover:bg-white/10"
            >
              Podgląd specyfikacji
            </button>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
            <img
              src="${input.imageUrl}"
              alt="${input.title.replace(/"/g, '')}"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
`;

  const appTsx = `import React from 'react';
import { HeroSection } from './components/HeroSection';

export default function App() {
  return (
    <div
      className="min-h-screen px-4 py-10 md:px-10"
      style={{ background: '${input.palette.bg}', color: '${input.palette.text}' }}
    >
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-xl">
          <strong className="font-serif text-lg tracking-wide">${input.title}</strong>
          <nav className="hidden md:flex gap-6 text-xs uppercase tracking-widest opacity-80">
            <a href="#system">System</a>
            <a href="#komponenty">Komponenty</a>
            <a href="#wdrozenie">Wdrożenie</a>
          </nav>
        </header>
        <HeroSection />
        <section id="komponenty" className="grid gap-4 md:grid-cols-3">
          {['${input.kitTarget}', '${input.animationMode}', '${input.buttonStyle}'].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 p-5 aether-fresnel-top"
              style={{ background: '${input.palette.surface}' }}
            >
              <div className="text-[11px] uppercase tracking-widest" style={{ color: '${input.palette.accent}' }}>
                Moduł Studio
              </div>
              <div className="mt-1 text-base font-semibold">{item}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
`;

  const indexHtml = `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${input.title} — Aether :3017 Generated Frontend</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: ${input.palette.bg};
      color: ${input.palette.text};
      padding: 28px 18px 48px;
    }
    .wrap { max-width: 1080px; margin: 0 auto; display: grid; gap: 22px; }
    .topbar {
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
      padding: 14px 22px; border-radius: 18px;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12);
      backdrop-filter: blur(18px);
    }
    .topbar strong { font-family: Georgia, serif; font-weight: 400; font-size: 18px; letter-spacing: 0.03em; }
    .badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 5px 12px; border-radius: 999px; font-size: 10px; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase;
      background: ${input.palette.accent}24; color: ${input.palette.accent};
      border: 1px solid ${input.palette.accent}55;
    }
    .hero {
      position: relative; overflow: hidden; border-radius: 26px;
      background: ${input.palette.surface};
      border: 1px solid rgba(255,255,255,0.14);
      padding: clamp(22px, 4vw, 44px);
      display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: 28px; align-items: center;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), 0 28px 70px rgba(0,0,0,0.45);
    }
    @media (max-width: 780px) { .hero { grid-template-columns: 1fr; } }
    .hero h1 { font-family: Georgia, serif; font-weight: 400; font-size: clamp(28px, 4vw, 46px); margin: 14px 0 12px; line-height: 1.12; }
    .hero p { color: ${input.palette.muted}; line-height: 1.7; font-size: 14px; margin: 0 0 22px; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; }
    .btn-primary {
      border: 0; cursor: pointer; font-weight: 700; font-size: 13px; padding: 14px 24px;
      border-radius: ${buttonRadius};
      background: linear-gradient(135deg, ${input.palette.accent}, #f4e6cf);
      color: ${input.palette.bg};
      box-shadow: ${buttonShadow};
      transition: transform .18s ease, filter .18s ease;
    }
    .btn-primary:hover { transform: translateY(-1px); filter: brightness(1.06); }
    .btn-secondary {
      border: 1px solid rgba(255,255,255,0.22); cursor: pointer; font-weight: 600; font-size: 13px;
      padding: 14px 22px; border-radius: 14px; background: rgba(255,255,255,0.06); color: ${input.palette.text};
      backdrop-filter: blur(10px);
    }
    .media {
      border-radius: 18px; overflow: hidden; border: 1px solid rgba(255,255,255,0.16);
      aspect-ratio: 4 / 3; background: rgba(0,0,0,0.3);
    }
    .media img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .grid3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; }
    .card {
      padding: 18px; border-radius: 18px; background: ${input.palette.surface};
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.16);
    }
    .card small { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: ${input.palette.accent}; }
    .card strong { display: block; margin-top: 6px; font-size: 15px; }
  </style>
</head>
<body>
  <div class="wrap">
    <header class="topbar">
      <strong>${input.title}</strong>
      <span class="badge">${input.animationMode} · ${input.kitTarget}</span>
    </header>
    <section class="hero">
      <div>
        <span class="badge">Wygenerowano automatycznie z obrazu</span>
        <h1>${input.title}</h1>
        <p>${input.subtitle}</p>
        <div class="actions">
          <button class="btn-primary" type="button">Główna akcja (${input.buttonStyle}) ↗</button>
          <button class="btn-secondary" type="button">Specyfikacja UI</button>
        </div>
      </div>
      <div class="media">
        <img src="${input.imageUrl}" alt="${input.title.replace(/"/g, '')}" />
      </div>
    </section>
    <section class="grid3">
      <div class="card"><small>Pakiet docelowy</small><strong>${input.kitTarget}</strong></div>
      <div class="card"><small>Silnik animacji :3017</small><strong>${input.animationMode}</strong></div>
      <div class="card"><small>Wariant przycisku</small><strong>${input.buttonStyle}</strong></div>
    </section>
  </div>
</body>
</html>`;

  const packageJson = JSON.stringify(
    {
      name: safeSlug,
      version: '1.0.0',
      private: true,
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
      },
      dependencies: {
        react: '^19.1.0',
        'react-dom': '^19.1.0',
        'lucide-react': '^1.28.0',
      },
      devDependencies: {
        '@tailwindcss/vite': '^4.3.3',
        '@types/react': '^19.0.0',
        '@types/react-dom': '^19.0.0',
        tailwindcss: '^4.3.3',
        typescript: '^5.7.0',
        vite: '^6.2.0',
      },
    },
    null,
    2
  );

  const readmeMd = `# ${input.title}

Projekt frontendowy wygenerowany automatycznie w **BM Clinic × Aether Design Studio (:3016 + :3017)**.

- Animacja Aether: \`${input.animationMode}\`
- Zestaw UI: \`${input.kitTarget}\`
- Styl przycisków: \`${input.buttonStyle}\`
- Paleta: bg \`${input.palette.bg}\`, surface \`${input.palette.surface}\`, accent \`${input.palette.accent}\`
`;

  return { indexHtml, appTsx, indexCss, heroSectionTsx, packageJson, readmeMd };
}

function createInitialProjects(): DesignGalleryItem[] {
  const seeds: Array<{
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    aspectRatio: string;
    animationMode: AetherAnimationMode;
    kitTarget: 'web-kit' | 'mobile-kit' | 'hybrid';
    buttonStyle: 'cnc-3d-tactile' | 'pill-primary' | 'ghost-glass' | 'split-badge';
    palette: GalleryProjectPalette;
    wcagContrast: string;
  }> = [
    {
      id: 'model-aether-cockpit',
      title: 'Aether Cockpit — Dark Emerald & Gold',
      subtitle:
        'Referencyjny interfejs konsolowy z :3017: głębokie szkło obsydianowe, Fresnel top highlight i kinetyczny obrys border-beam.',
      imageUrl: '/assets/aistudio/stwo_rz_front_aplikacji_w_tonacji_e7b9c384_2a0b46d0.jpg',
      aspectRatio: '16:9',
      animationMode: 'border-beam',
      kitTarget: 'hybrid',
      buttonStyle: 'cnc-3d-tactile',
      palette: {
        bg: '#040a0a',
        surface: '#0a1917',
        accent: '#d4b46a',
        text: '#f5f2eb',
        muted: '#a4b7b2',
      },
      wcagContrast: '13.4:1 (WCAG AAA)',
    },
    {
      id: 'model-rotary-cnc',
      title: 'Rotary 120T CNC Tactile Button System',
      subtitle:
        'Sprzętowa kalibracja pokrętła i przycisku metalowego z :3017: zapadki 74 Hz, fazowany pierścień i halo reakcji.',
      imageUrl: '/assets/aistudio/real-metal-volume-button-free-vector_f64353d6.jpg',
      aspectRatio: '4:3',
      animationMode: 'rotary-3d',
      kitTarget: 'web-kit',
      buttonStyle: 'cnc-3d-tactile',
      palette: {
        bg: '#0b0e13',
        surface: '#161b23',
        accent: '#e2b66d',
        text: '#f8fafc',
        muted: '#9aa6b5',
      },
      wcagContrast: '12.1:1 (WCAG AAA)',
    },
    {
      id: 'model-haptic-press',
      title: 'Pulse Press — Stan Po Naciśnięciu',
      subtitle:
        'Mikro-animacja wciśnięcia przycisku z falą świetlną prism-sweep i potwierdzeniem haptycznym WebAudio.',
      imageUrl: '/assets/aistudio/utwo_rz_obraz_po_nacis_nie_ciu_przycisku_e69c394_75a907d5.jpg',
      aspectRatio: '16:10',
      animationMode: 'prism-sweep',
      kitTarget: 'mobile-kit',
      buttonStyle: 'pill-primary',
      palette: {
        bg: '#060c14',
        surface: '#0f1b29',
        accent: '#34d399',
        text: '#f8fafc',
        muted: '#94a3b8',
      },
      wcagContrast: '11.2:1 (WCAG AAA)',
    },
    {
      id: 'model-architectural-glass',
      title: 'BM Clinic Quiet Luxury — Emerald Glass',
      subtitle:
        'Layout gabinetowy spójny ze Sky Lobby :3016 oraz shaderami :3017: oddychający grawerunek etch-breathe i czyste CTA.',
      imageUrl: '/assets/aistudio/1_5aae773b.png',
      aspectRatio: '16:9',
      animationMode: 'etch-breathe',
      kitTarget: 'web-kit',
      buttonStyle: 'ghost-glass',
      palette: {
        bg: '#081214',
        surface: '#112126',
        accent: '#dfc6a7',
        text: '#f7f4ee',
        muted: '#b2bebf',
      },
      wcagContrast: '12.8:1 (WCAG AAA)',
    },
    {
      id: 'model-clinical-surface',
      title: 'Mobile Patient Concierge Kit',
      subtitle:
        'Kompaktowy projekt mobilny pod jedną rękę (44px+ touch targets) z kartami zabiegowymi i szybkim CTA.',
      imageUrl: '/assets/aistudio/obraz_41b4bdd8_cde3673e.jpg',
      aspectRatio: '9:16',
      animationMode: 'shimmer-glass',
      kitTarget: 'mobile-kit',
      buttonStyle: 'split-badge',
      palette: {
        bg: '#0a0f12',
        surface: '#131d22',
        accent: '#c4a874',
        text: '#f4f1ea',
        muted: '#99a8ac',
      },
      wcagContrast: '10.9:1 (WCAG AAA)',
    },
  ];

  const now = new Date().toISOString();
  return seeds.map((s) => ({
    ...s,
    category: 'model',
    createdAt: now,
    automationLog: [
      `[01] Zaimportowano wzorzec modelu ${s.id} do galerii :3016`,
      `[02] Wyekstrahowano tokeny WCAG (${s.wcagContrast}) i dopasowano ${s.animationMode}`,
      `[03] Zbudowano kompletny projekt React + HTML + CSS (${s.kitTarget})`,
    ],
    codeBundle: buildCompleteFrontendBundle(s),
  }));
}

function createInitialDrivers(): DriverPackageEntry[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'drv-aether-rotary-3017',
      name: 'Aether Rotary 120T & Haptic Synth Driver (:3017)',
      category: 'haptic-3017',
      version: '3.0.17',
      latestVersion: '3.0.17',
      status: 'synced-3017',
      source: 'http://127.0.0.1:3017/api/driver-calibration',
      capabilities: ['270° CNC Detents', '74 Hz WebAudio Click', 'Axial Push Impulse'],
      updatedAt: now,
    },
    {
      id: 'drv-three-webgl-187',
      name: 'Three.js WebGL2 / Shader Driver Pack',
      category: 'webgl-3d',
      version: '0.187.0',
      latestVersion: '0.187.0',
      status: 'installed',
      source: 'aether-tactile-studio/package.json',
      capabilities: ['Depth Parallax', 'PBR Metallic Roughness', 'Post-Processing Bloom'],
      updatedAt: now,
    },
    {
      id: 'drv-mediapipe-vision',
      name: 'MediaPipe Tasks Vision (Face & Hand Landmarker)',
      category: 'vision-ai',
      version: '0.10.22',
      latestVersion: '0.10.22',
      status: 'installed',
      source: 'chomik-mediapipe-unified (:3018)',
      capabilities: ['468 Face Mesh', 'Depth Estimation', 'Gesture Controls'],
      updatedAt: now,
    },
    {
      id: 'drv-ollama-metal',
      name: 'Ollama Apple M1 Pro Metal Runtime (:11434)',
      category: 'local-llm',
      version: '0.18.x-metal',
      latestVersion: '0.18.x-metal',
      status: 'installed',
      source: 'http://127.0.0.1:11434/api/tags',
      capabilities: ['agy-operator:latest', 'bm-voice-builder:latest', 'qwen2.5vl:7b', 'superagent-guard-local:latest'],
      updatedAt: now,
    },
    {
      id: 'drv-next-react-tw4',
      name: 'Next.js + React 19 + Tailwind CSS v4 Runtime',
      category: 'framework',
      version: '15.5.22 / 19.1.0 / 4.x',
      latestVersion: '15.5.22 / 19.1.0 / 4.x',
      status: 'installed',
      source: 'bmclinic-chronos-master/package.json',
      capabilities: ['App Router RSC', 'Motion 12.43', 'OKLCH / Fresnel CSS4'],
      updatedAt: now,
    },
    {
      id: 'drv-macos-voice-tts',
      name: 'macOS Native Polish Speech & Audio Driver',
      category: 'audio-tts',
      version: 'say + afconvert (PL)',
      latestVersion: 'say + afconvert (PL)',
      status: 'installed',
      source: 'server-master.ts /api/tts-speech',
      capabilities: ['Głos Zosia/Krzysztof', 'Zero-Latency PCM/WAV', 'WebAudio Fallback'],
      updatedAt: now,
    },
  ];
}

export function readProjects(): DesignGalleryItem[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));
    if (Array.isArray(parsed)) return parsed as DesignGalleryItem[];
  } catch {
    // The default catalog also works on read-only deployments.
  }
  return createInitialProjects();
}

export function writeProjects(items: DesignGalleryItem[]): void {
  ensureDataDir();
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(items, null, 2), 'utf8');
}

export function readDrivers(): DriverPackageEntry[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(DRIVERS_FILE, 'utf8'));
    if (Array.isArray(parsed)) return parsed as DriverPackageEntry[];
  } catch {
    // The default catalog also works on read-only deployments.
  }
  return createInitialDrivers();
}

export function writeDrivers(items: DriverPackageEntry[]): void {
  ensureDataDir();
  fs.writeFileSync(DRIVERS_FILE, JSON.stringify(items, null, 2), 'utf8');
}
