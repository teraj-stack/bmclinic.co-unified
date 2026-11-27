'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  Bot,
  Check,
  Code2,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  Eye,
  FileCode2,
  FolderGit2,
  Globe,
  ImagePlus,
  Layers,
  LayoutGrid,
  MonitorSmartphone,
  MousePointerClick,
  Play,
  RefreshCw,
  ShieldCheck,
  Sliders,
  Sparkles,
  Trash2,
  Upload,
  Wand2,
  Zap,
} from 'lucide-react';
import MobileDesignStudioClient from '@/components/design/MobileDesignStudioClient';
import type {
  AetherAnimationMode,
  DesignGalleryItem,
  DriverPackageEntry,
  GeneratedCodeBundle,
} from '@/lib/designStudioStore';
import {
  KIT_BUTTON_PRESETS,
  KIT_LAYOUT_PRESETS,
  TREND_PORTALS,
  VERCEL_TEMPLATE_LINKS,
} from '@/lib/designStudioPresets';

type StudioTab = 'gallery' | 'automation' | 'kits' | 'drivers' | 'trends';
type CodeFileKey = keyof GeneratedCodeBundle;

interface TelemetryPayload {
  aetherLive: boolean;
  aetherCalibration: Record<string, unknown> | null;
  ollamaModels: string[];
}

interface BatchOutputEntry {
  sourceName: string;
  kind: 'cutout' | 'variant';
  variantId: string;
  publicUrl: string;
  diskPath: string;
  createdAt: string;
}

interface BatchJobStatus {
  running: boolean;
  mode: 'idle' | 'folder' | 'drop';
  sourceDir: string;
  outputDir: string;
  total: number;
  processed: number;
  currentFile: string;
  cutoutEnabled: boolean;
  framousEnabled: boolean;
  variants: string[];
  startedAt: string | null;
  finishedAt: string | null;
  recentOutputs: BatchOutputEntry[];
  errors: string[];
}

const ZERO_KEY_VARIANT_OPTIONS: Array<{ id: string; label: string; badge: string }> = [
  { id: 'proktologia-emerald', label: 'Proktologia · Ciemna Zieleń & Grafit', badge: '#072522' },
  { id: 'chirurgia-steel', label: 'Chirurgia · Pastelowa Biel & Stal', badge: '#d9e2ec' },
  { id: 'flebologia-lavender', label: 'Flebologia (Kobiety) · Lawenda & Błękit', badge: '#d8d2f8' },
  { id: 'flebologia-male-teal', label: 'Flebologia (Mężczyźni) · Turkus & Zieleń', badge: '#0c3a44' },
  { id: 'obsidian-champagne', label: 'BM Holding · Obsydian & Szampan', badge: '#c5a276' },
];

const ANIMATION_MODES: Array<{
  id: AetherAnimationMode;
  label: string;
  desc: string;
  cssClass: string;
}> = [
  {
    id: 'border-beam',
    label: 'Border Beam (:3017)',
    desc: 'Kinetyczny obrotowy promień obrysu z Aether Studio.',
    cssClass: 'animate-border-beam',
  },
  {
    id: 'prism-sweep',
    label: 'Prism Sweep',
    desc: 'Pryzmatyczna fala świetlna przechodząca przez taflę szkła.',
    cssClass: 'animate-prism-sweep',
  },
  {
    id: 'etch-breathe',
    label: 'Etch Breathe',
    desc: 'Subtelne oddychanie grawerowanych krawędzi emerald/gold.',
    cssClass: 'animate-etch-breathe',
  },
  {
    id: 'shimmer-glass',
    label: 'Shimmer Glass',
    desc: 'Jedwabisty połysk fresnelowski na powierzchniach kart.',
    cssClass: 'animate-shimmer',
  },
  {
    id: 'rotary-3d',
    label: 'Rotary 3D Halo',
    desc: 'Pulsacyjna aura głowicy CNC 120T i przycisku osiowego.',
    cssClass: 'animate-active-halo',
  },
];

const CODE_FILE_TABS: Array<{ key: CodeFileKey; filename: string }> = [
  { key: 'indexHtml', filename: 'index.html' },
  { key: 'appTsx', filename: 'src/App.tsx' },
  { key: 'heroSectionTsx', filename: 'src/components/HeroSection.tsx' },
  { key: 'indexCss', filename: 'src/index.css' },
  { key: 'packageJson', filename: 'package.json' },
  { key: 'readmeMd', filename: 'README.md' },
];

function extractPaletteFromCanvas(img: HTMLImageElement): {
  dataUrl: string;
  aspectRatio: string;
  bg: string;
  surface: string;
  accent: string;
  text: string;
  muted: string;
} {
  const maxDim = 1080;
  const scale = Math.min(1, maxDim / Math.max(img.width || 1, img.height || 1));
  const w = Math.max(120, Math.round((img.width || 640) * scale));
  const h = Math.max(90, Math.round((img.height || 480) * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      dataUrl: '',
      aspectRatio: '16:9',
      bg: '#050b0c',
      surface: '#0d1b1d',
      accent: '#d4b46a',
      text: '#f5f2eb',
      muted: '#a6b4b2',
    };
  }

  ctx.drawImage(img, 0, 0, w, h);
  const sample = ctx.getImageData(0, 0, w, h).data;
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;
  let count = 0;
  let bestSat = -1;
  let accentR = 212;
  let accentG = 180;
  let accentB = 106;

  const stride = Math.max(4, Math.floor(sample.length / 4 / 800)) * 4;
  for (let i = 0; i < sample.length; i += stride) {
    const r = sample[i];
    const g = sample[i + 1];
    const b = sample[i + 2];
    rSum += r;
    gSum += g;
    bSum += b;
    count += 1;

    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const lum = (maxC + minC) / 2;
    const sat = maxC - minC;
    if (sat > bestSat && lum > 55 && lum < 220) {
      bestSat = sat;
      accentR = r;
      accentG = g;
      accentB = b;
    }
  }

  const avgR = Math.round(rSum / Math.max(1, count));
  const avgG = Math.round(gSum / Math.max(1, count));
  const avgB = Math.round(bSum / Math.max(1, count));

  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
  const bg = `#${toHex(Math.round(avgR * 0.14))}${toHex(Math.round(avgG * 0.18))}${toHex(Math.round(avgB * 0.18))}`;
  const surface = `#${toHex(Math.round(avgR * 0.25 + 6))}${toHex(Math.round(avgG * 0.3 + 12))}${toHex(Math.round(avgB * 0.28 + 12))}`;
  const accent =
    bestSat > 24
      ? `#${toHex(Math.min(245, accentR + 25))}${toHex(Math.min(235, accentG + 20))}${toHex(Math.min(220, accentB + 12))}`
      : '#d4b46a';

  const ratio = w >= h ? `${Math.round((w / h) * 10) / 10}:1` : `1:${Math.round((h / w) * 10) / 10}`;
  return {
    dataUrl: canvas.toDataURL('image/jpeg', 0.84),
    aspectRatio: ratio,
    bg,
    surface,
    accent,
    text: '#f5f2eb',
    muted: '#a4b7b2',
  };
}

export default function DesignStudioAetherClient() {
  const [activeTab, setActiveTab] = useState<StudioTab>('gallery');
  const [activeAnimation, setActiveAnimation] = useState<AetherAnimationMode>('border-beam');
  const [showLive3017, setShowLive3017] = useState(false);

  // Gallery + Codegen state
  const [projects, setProjects] = useState<DesignGalleryItem[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [activeCodeFile, setActiveCodeFile] = useState<CodeFileKey>('indexHtml');
  const [previewMode, setPreviewMode] = useState<'live' | 'code'>('live');
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Upload form fields
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSubtitle, setUploadSubtitle] = useState('');
  const [uploadKit, setUploadKit] = useState<'hybrid' | 'web-kit' | 'mobile-kit'>('hybrid');
  const [uploadBtnStyle, setUploadBtnStyle] = useState<
    'cnc-3d-tactile' | 'pill-primary' | 'ghost-glass' | 'split-badge'
  >('cnc-3d-tactile');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const driverFileInputRef = useRef<HTMLInputElement | null>(null);

  // Automation pipeline state
  const [automationRunning, setAutomationRunning] = useState(false);
  const [automationStepIdx, setAutomationStepIdx] = useState<number>(-1);

  // Zero-Key Cutout + Folder Batch + Framous CLI state
  const [batchSourceDir, setBatchSourceDir] = useState(
    '/Users/krzysztofjarzyna/Pictures/bmclinic.co/frontendy web'
  );
  const [batchOutputDir, setBatchOutputDir] = useState(
    '/Users/krzysztofjarzyna/Pictures/bmclinic.co/_PRZETWORZONE_AI'
  );
  const [batchCutout, setBatchCutout] = useState(true);
  const [batchFramous, setBatchFramous] = useState(true);
  const [batchVariants, setBatchVariants] = useState<string[]>(
    ZERO_KEY_VARIANT_OPTIONS.map((v) => v.id)
  );
  const [batchStatus, setBatchStatus] = useState<BatchJobStatus | null>(null);
  const [batchDropActive, setBatchDropActive] = useState(false);
  const [batchSubmitting, setBatchSubmitting] = useState(false);
  const batchDropInputRef = useRef<HTMLInputElement | null>(null);

  // Drivers state
  const [drivers, setDrivers] = useState<DriverPackageEntry[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryPayload>({
    aetherLive: false,
    aetherCalibration: null,
    ollamaModels: [],
  });
  const [syncingDrivers, setSyncingDrivers] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadStudioData = useCallback(async () => {
    setLoadingProjects(true);
    try {
      const [projRes, drvRes] = await Promise.all([
        fetch('/api/design-studio/projects', { cache: 'no-store' }),
        fetch('/api/design-studio/drivers', { cache: 'no-store' }),
      ]);
      if (projRes.ok) {
        const pData = (await projRes.json()) as { projects?: DesignGalleryItem[] };
        const list = pData.projects || [];
        setProjects(list);
        if (list.length > 0) {
          setSelectedProjectId((prev) => prev || list[0].id);
        }
      }
      if (drvRes.ok) {
        const dData = (await drvRes.json()) as {
          drivers?: DriverPackageEntry[];
          telemetry?: TelemetryPayload;
        };
        setDrivers(dData.drivers || []);
        if (dData.telemetry) {
          setTelemetry(dData.telemetry);
        }
      }
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  useEffect(() => {
    void loadStudioData();
  }, [loadStudioData]);

  const fetchBatchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/design-studio/batch-process/status', { cache: 'no-store' });
      if (res.ok) {
        const data = (await res.json()) as { status?: BatchJobStatus };
        if (data.status) setBatchStatus(data.status);
      }
    } catch {
      // ignore polling error
    }
  }, []);

  useEffect(() => {
    void fetchBatchStatus();
    if (!batchStatus?.running) return undefined;
    const id = window.setInterval(() => {
      void fetchBatchStatus();
    }, 2000);
    return () => window.clearInterval(id);
  }, [fetchBatchStatus, batchStatus?.running]);

  const toggleBatchVariant = (variantId: string) => {
    setBatchVariants((prev) =>
      prev.includes(variantId) ? prev.filter((x) => x !== variantId) : [...prev, variantId]
    );
  };

  const handleBatchDropFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBatchSubmitting(true);
    setStatusMessage(`Przetwarzam ${files.length} upuszczonych grafik (wycinanie Vision + warianty, bez klucza API)...`);
    try {
      const encoded: Array<{ name: string; dataUrl: string }> = [];
      for (let i = 0; i < Math.min(files.length, 15); i += 1) {
        const file = files[i];
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ''));
          reader.onerror = () => reject(new Error('Błąd odczytu pliku'));
          reader.readAsDataURL(file);
        });
        encoded.push({ name: file.name, dataUrl });
      }

      const res = await fetch('/api/design-studio/batch-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'drop',
          files: encoded,
          outputDir: batchOutputDir,
          cutout: batchCutout,
          framous: batchFramous,
          variants: batchVariants,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; status?: BatchJobStatus; error?: string };
      if (!res.ok || !data.ok) {
        setStatusMessage(data.error || 'Błąd przetwarzania upuszczonych plików.');
        return;
      }
      if (data.status) setBatchStatus(data.status);
      setActiveTab('automation');
      setStatusMessage(
        `Gotowe! Wygenerowano ${data.status?.recentOutputs.length || 0} wycięć/wariantów i zapisano w ${data.status?.outputDir || batchOutputDir}.`
      );
    } catch {
      setStatusMessage('Nie udało się przetworzyć upuszczonych grafik.');
    } finally {
      setBatchSubmitting(false);
      setBatchDropActive(false);
    }
  };

  const handleStartFolderBatch = async () => {
    setBatchSubmitting(true);
    setStatusMessage(`Uruchamiam automatyczne wycinanie i warianty dla katalogu ${batchSourceDir}...`);
    try {
      const res = await fetch('/api/design-studio/batch-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'folder',
          folderPath: batchSourceDir,
          outputDir: batchOutputDir,
          cutout: batchCutout,
          framous: batchFramous,
          variants: batchVariants,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; status?: BatchJobStatus; error?: string };
      if (!res.ok || !data.ok) {
        setStatusMessage(data.error || 'Nie udało się uruchomić automatu katalogu.');
        return;
      }
      if (data.status) setBatchStatus(data.status);
      setStatusMessage(
        `Automat uruchomiony w tle (${data.status?.total || 0} obrazów) → wyniki trafią do ${data.status?.outputDir}.`
      );
    } finally {
      setBatchSubmitting(false);
    }
  };

  const handleSendVariantToGallery = async (entry: BatchOutputEntry) => {
    setUploading(true);
    try {
      const res = await fetch('/api/design-studio/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          title: `${entry.sourceName.replace(/\.[^.]+$/, '')} · ${entry.variantId}`,
          subtitle: `Wygenerowano automatycznie (Zero-Key Cutout + Warianty) z ${entry.sourceName}`,
          imageUrl: entry.publicUrl,
          animationMode: activeAnimation,
          kitTarget: uploadKit,
          buttonStyle: uploadBtnStyle,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; item?: DesignGalleryItem; projects?: DesignGalleryItem[] };
      if (res.ok && data.ok && data.projects) {
        setProjects(data.projects);
        if (data.item) setSelectedProjectId(data.item.id);
        setActiveTab('gallery');
        setStatusMessage(`Dodano wariant ${entry.variantId} do Galerii Projektów i wygenerowano kod.`);
      }
    } finally {
      setUploading(false);
    }
  };

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) || projects[0] || null,
    [projects, selectedProjectId]
  );

  const copyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleImageUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setStatusMessage('Analizuję obraz (ekstrakcja palety i proporcji) oraz generuję pełny projekt frontendowy...');
    try {
      const file = files[0];
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Nie udało się odczytać pliku obrazu.'));
        img.src = objectUrl;
      });

      const extracted = extractPaletteFromCanvas(img);
      URL.revokeObjectURL(objectUrl);

      const cleanTitle =
        uploadTitle.trim() ||
        file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').slice(0, 48) ||
        'Nowy Projekt z Obrazu';

      const res = await fetch('/api/design-studio/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          title: cleanTitle,
          subtitle: uploadSubtitle.trim(),
          imageUrl: extracted.dataUrl,
          aspectRatio: extracted.aspectRatio,
          animationMode: activeAnimation,
          kitTarget: uploadKit,
          buttonStyle: uploadBtnStyle,
          palette: {
            bg: extracted.bg,
            surface: extracted.surface,
            accent: extracted.accent,
            text: extracted.text,
            muted: extracted.muted,
          },
        }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        item?: DesignGalleryItem;
        projects?: DesignGalleryItem[];
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Błąd podczas tworzenia projektu.');
      }

      if (data.projects) setProjects(data.projects);
      if (data.item) setSelectedProjectId(data.item.id);
      setUploadTitle('');
      setUploadSubtitle('');
      setPreviewMode('live');
      setStatusMessage(
        `Gotowe! Wgrano obraz „${cleanTitle}” i automatycznie utworzono kompletny 6-plikowy projekt (${uploadKit}).`
      );
    } catch (err) {
      setStatusMessage(err instanceof Error ? err.message : 'Błąd wgrywania obrazu.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    const res = await fetch(`/api/design-studio/projects?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const data = (await res.json()) as { projects?: DesignGalleryItem[] };
      const next = data.projects || [];
      setProjects(next);
      if (selectedProjectId === id && next[0]) {
        setSelectedProjectId(next[0].id);
      }
    }
  };

  const handleDownloadHtml = (proj: DesignGalleryItem) => {
    const blob = new Blob([proj.codeBundle.indexHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${proj.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadBundleJson = (proj: DesignGalleryItem) => {
    const payload = {
      projectId: proj.id,
      title: proj.title,
      animationMode: proj.animationMode,
      kitTarget: proj.kitTarget,
      palette: proj.palette,
      files: {
        'index.html': proj.codeBundle.indexHtml,
        'src/App.tsx': proj.codeBundle.appTsx,
        'src/components/HeroSection.tsx': proj.codeBundle.heroSectionTsx,
        'src/index.css': proj.codeBundle.indexCss,
        'package.json': proj.codeBundle.packageJson,
        'README.md': proj.codeBundle.readmeMd,
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${proj.id}-frontend-project.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRunAutomationPipeline = async () => {
    setAutomationRunning(true);
    setStatusMessage('Uruchomiono kompletny pipeline automatyzacji :3017 → :3016...');
    for (let i = 0; i < 5; i += 1) {
      setAutomationStepIdx(i);
      await new Promise((r) => setTimeout(r, 260));
    }
    try {
      const res = await fetch('/api/design-studio/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'regenerate-all',
          animationMode: activeAnimation,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { projects?: DesignGalleryItem[] };
        if (data.projects) setProjects(data.projects);
        setStatusMessage(
          `Automatyzacja zakończona: zsynchronizowano wszystkie projekty galerii z animacją ${activeAnimation}.`
        );
      }
    } finally {
      setAutomationRunning(false);
    }
  };

  const handleSyncAllDrivers = async () => {
    setSyncingDrivers(true);
    setStatusMessage('Wgrywam i synchronizuję najnowsze sterowniki (:3017 CNC, Three.js 0.187, Ollama, MediaPipe)...');
    try {
      const res = await fetch('/api/design-studio/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync-all' }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          drivers?: DriverPackageEntry[];
          telemetry?: TelemetryPayload;
        };
        if (data.drivers) setDrivers(data.drivers);
        if (data.telemetry) setTelemetry(data.telemetry);
        setStatusMessage('Wszystkie sterowniki zostały wgrane i zweryfikowane na porcie :3016 + :3017.');
      }
    } finally {
      setSyncingDrivers(false);
    }
  };

  const handleUploadDriverJson = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      const text = await files[0].text();
      const parsed = JSON.parse(text) as Partial<DriverPackageEntry>;
      const res = await fetch('/api/design-studio/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upload-driver',
          driver: {
            name: parsed.name || files[0].name.replace(/\.json$/i, ''),
            version: parsed.version || '1.0.0',
            latestVersion: parsed.latestVersion || parsed.version || '1.0.0',
            category: parsed.category || 'haptic-3017',
            capabilities: parsed.capabilities || ['Profil wgrany z pliku JSON'],
          },
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { drivers?: DriverPackageEntry[] };
        if (data.drivers) setDrivers(data.drivers);
        setStatusMessage(`Wgrano profil sterownika: ${parsed.name || files[0].name}`);
      }
    } catch {
      setStatusMessage('Nieprawidłowy plik JSON profilu sterownika.');
    }
  };

  const activeAnimConfig =
    ANIMATION_MODES.find((m) => m.id === activeAnimation) || ANIMATION_MODES[0];

  return (
    <div className="min-h-screen bg-[#040a09] text-slate-100 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Hero: Aether :3017 + BM Clinic :3016 Unified Visual Coherence */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-[#071513] via-[#040b0a] to-[#0b131c] p-6 sm:p-9 aether-fresnel-top">
          {/* Kinetic :3017 background prism */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-500/20 via-amber-400/15 to-transparent blur-3xl ${activeAnimConfig.cssClass}`}
          />
          <div className="relative z-10 grid gap-6 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-bold uppercase tracking-widest">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Aether Tactile :3017 × BM Clinic :3016
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 ${
                    telemetry.aetherLive
                      ? 'border-amber-300/40 bg-amber-400/10 text-amber-200'
                      : 'border-white/15 bg-white/5 text-slate-300'
                  }`}
                >
                  <Activity className="h-3.5 w-3.5" />
                  {telemetry.aetherLive ? 'Most :3017 Live Sync' : 'Tryb Wbudowany (/aether/)'}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-300 font-mono">
                  /design-studio &amp; /desingstudio
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white">
                Zunifikowane Design Studio
                <span className="block text-amber-200/95 text-2xl sm:text-3xl mt-1">
                  Galeria Modelowa, Auto-Kod Frontendów, Kity UI &amp; Sterowniki
                </span>
              </h1>

              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                Frontend, palety szmaragdowo-złote, krawędzie Fresnel oraz kinetyczne shadery pobrane bezpośrednio z{' '}
                <code className="text-emerald-300">localhost:3017</code>. Wgraj dowolny obraz do galerii, a studio
                automatycznie wygeneruje gotowy kod i kompletny wieloplikowy projekt frontendowy, przetestuje przyciski
                Web-Kit / Mobile-Kit i zsynchronizuje najnowsze sterowniki.
              </p>

              {/* Animation Switcher synced with :3017 */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300/90 mr-1">
                  Animacja :3017:
                </span>
                {ANIMATION_MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveAnimation(m.id)}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      activeAnimation === m.id
                        ? 'border-amber-300/70 bg-amber-400/20 text-amber-200 animate-active-halo'
                        : 'border-white/15 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live :3017 Quick Action Card */}
            <div className="lg:col-span-4 rounded-2xl border border-emerald-400/30 bg-black/55 p-4 space-y-3 backdrop-blur-xl aether-fresnel-top">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-emerald-300">
                  Silnik :3017 w :3016
                </span>
                <span className="text-[11px] text-slate-400">{projects.length} projektów</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Osadzony widok aplikacji Aether (:3017) przez wbudowany most proxy <code className="text-amber-200">/aether/</code>.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShowLive3017((v) => !v)}
                  className="rounded-xl bg-emerald-400 px-3 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-300 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Eye className="h-3.5 w-3.5" />
                  {showLive3017 ? 'Ukryj kokpit :3017' : 'Pokaż kokpit :3017'}
                </button>
                <a
                  href="http://localhost:3017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition flex items-center justify-center gap-1.5"
                >
                  Otwórz :3017
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <button
                type="button"
                onClick={handleSyncAllDrivers}
                disabled={syncingDrivers}
                className="w-full rounded-xl border border-amber-400/40 bg-amber-400/15 px-3 py-2 text-xs font-bold text-amber-200 hover:bg-amber-400/25 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${syncingDrivers ? 'animate-spin' : ''}`} />
                {syncingDrivers ? 'Synchronizuję sterowniki...' : 'Wgraj najnowsze sterowniki (:3017 + M1)'}
              </button>
            </div>
          </div>

          {/* Toggleable Live Embedded :3017 Frame */}
          {showLive3017 && (
            <div className="mt-6 rounded-2xl border border-emerald-400/35 bg-black overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#061513] text-xs">
                <span className="font-semibold text-emerald-300">
                  Live Aether Tactile Studio — /aether/ (proxy z localhost:3017)
                </span>
                <button
                  type="button"
                  onClick={() => setShowLive3017(false)}
                  className="text-slate-300 hover:text-white cursor-pointer"
                >
                  Zamknij podgląd ×
                </button>
              </div>
              <iframe
                src="/aether/"
                title="Aether Tactile Studio 3017"
                className="w-full h-[640px] border-0 bg-[#040a09]"
              />
            </div>
          )}
        </section>

        {/* Status banner */}
        {statusMessage && (
          <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200 flex items-center justify-between gap-3">
            <span>{statusMessage}</span>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-emerald-300 hover:text-white cursor-pointer font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Primary Section Tabs */}
        <nav
          aria-label="Sekcje Design Studio"
          className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-[#071210]/90 p-2 backdrop-blur-xl"
        >
          {(
            [
              { id: 'gallery', label: 'Galeria Modelowa & Auto-Projekty', icon: ImagePlus },
              { id: 'automation', label: 'Automatyzacje Studio', icon: Wand2 },
              { id: 'kits', label: 'Web-Kit, Mobile-Kit & Przyciski', icon: LayoutGrid },
              { id: 'drivers', label: 'Najnowsze Sterowniki', icon: Cpu },
              { id: 'trends', label: 'Trendy Portale & Szablony Vercel', icon: Globe },
            ] as const
          ).map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 min-w-[170px] rounded-xl px-4 py-3 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-emerald-400/25 to-amber-400/20 text-amber-200 border border-amber-300/50 aether-fresnel-top'
                    : 'text-slate-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* TAB 1: MODEL GALLERY + UPLOAD IMAGE + FULL PROJECT CODEGEN */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Upload Panel */}
            <div className="rounded-3xl border border-emerald-400/30 bg-[#071412]/90 p-6 aether-fresnel-top">
              <div className="grid gap-5 lg:grid-cols-12 items-end">
                <div className="lg:col-span-4 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Upload className="h-4 w-4" />
                    Wgraj nowy obraz → utwórz kod i projekt
                  </div>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Nazwa projektu (opcjonalnie)"
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-400"
                  />
                  <input
                    type="text"
                    value={uploadSubtitle}
                    onChange={(e) => setUploadSubtitle(e.target.value)}
                    placeholder="Opis celu interfejsu / sekcji"
                    className="w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="lg:col-span-5 grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-300 block">
                      Docelowy pakiet UI
                    </label>
                    <select
                      value={uploadKit}
                      onChange={(e) => setUploadKit(e.target.value as 'hybrid' | 'web-kit' | 'mobile-kit')}
                      className="w-full rounded-xl border border-white/15 bg-black/70 px-3 py-2.5 text-xs text-white"
                    >
                      <option value="hybrid">Hybrid (Web-Kit + Mobile-Kit)</option>
                      <option value="web-kit">Web-Kit (Desktop + Bento)</option>
                      <option value="mobile-kit">Mobile-Kit (Touch 44px+)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-300 block">
                      Typ przycisków
                    </label>
                    <select
                      value={uploadBtnStyle}
                      onChange={(e) =>
                        setUploadBtnStyle(
                          e.target.value as 'cnc-3d-tactile' | 'pill-primary' | 'ghost-glass' | 'split-badge'
                        )
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/70 px-3 py-2.5 text-xs text-white"
                    >
                      <option value="cnc-3d-tactile">CNC 3D Tactile (:3017)</option>
                      <option value="pill-primary">Pill Primary Emerald</option>
                      <option value="ghost-glass">Ghost Glass Fresnel</option>
                      <option value="split-badge">Split CTA + Badge</option>
                    </select>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => void handleImageUploadFiles(e.target.files)}
                  />
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300 px-4 py-3 text-xs font-extrabold text-slate-950 shadow-xl hover:brightness-105 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ImagePlus className="h-4 w-4" />
                    {uploading ? 'Generuję projekt...' : 'Wybierz obraz i wygeneruj kod'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('automation')}
                    className="w-full rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-3 py-2 text-[11px] font-bold text-emerald-200 hover:bg-emerald-500/25 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    Upuść pliki → Wytnij tło &amp; Warianty (Bez klucza) ↗
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery cards + Code/Live Preview workbench */}
            <div className="grid gap-6 lg:grid-cols-12 items-start">
              {/* Left: Gallery items */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <span>Przykłady modelowe i wgrane ({projects.length})</span>
                  {loadingProjects && <span className="text-slate-400">Ładowanie...</span>}
                </div>

                <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
                  {projects.map((proj) => {
                    const isActive = selectedProject?.id === proj.id;
                    return (
                      <div
                        key={proj.id}
                        onClick={() => setSelectedProjectId(proj.id)}
                        className={`group rounded-2xl border p-3 transition cursor-pointer flex gap-3.5 items-center ${
                          isActive
                            ? 'border-amber-300/70 bg-gradient-to-r from-emerald-950/80 to-[#0e1b18] shadow-[0_0_25px_rgba(16,185,129,0.18)]'
                            : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.07]'
                        }`}
                      >
                        <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                proj.category === 'uploaded'
                                  ? 'bg-emerald-400/20 text-emerald-300'
                                  : 'bg-amber-400/15 text-amber-300'
                              }`}
                            >
                              {proj.category === 'uploaded' ? 'Wgrany obraz' : 'Wzór modelowy'}
                            </span>
                            {proj.category === 'uploaded' && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  void handleDeleteProject(proj.id);
                                }}
                                className="text-slate-400 hover:text-rose-400 cursor-pointer"
                                title="Usuń projekt"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                          <div className="text-sm font-bold text-white truncate">{proj.title}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{proj.subtitle}</div>
                          <div className="flex items-center gap-2 pt-0.5 text-[10px] font-mono text-slate-300">
                            <span
                              className="h-3 w-3 rounded-full border border-white/30"
                              style={{ background: proj.palette.accent }}
                            />
                            <span>{proj.kitTarget}</span>
                            <span>·</span>
                            <span>{proj.animationMode}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Complete Generated Frontend Workbench */}
              <div className="lg:col-span-7">
                {selectedProject ? (
                  <div className="rounded-3xl border border-white/15 bg-[#060f0e] overflow-hidden aether-fresnel-top">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#091815] px-5 py-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                          Wygenerowany Projekt Frontendowy ({selectedProject.wcagContrast})
                        </div>
                        <h2 className="text-lg font-bold text-white mt-0.5">{selectedProject.title}</h2>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewMode('live')}
                          className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer flex items-center gap-1.5 ${
                            previewMode === 'live'
                              ? 'bg-emerald-400 text-slate-950'
                              : 'bg-white/5 text-slate-300 border border-white/15'
                          }`}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Podgląd na żywo
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewMode('code')}
                          className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer flex items-center gap-1.5 ${
                            previewMode === 'code'
                              ? 'bg-amber-300 text-slate-950'
                              : 'bg-white/5 text-slate-300 border border-white/15'
                          }`}
                        >
                          <Code2 className="h-3.5 w-3.5" />
                          Pełny kod (6 plików)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadHtml(selectedProject)}
                          className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 cursor-pointer flex items-center gap-1.5"
                        >
                          <Download className="h-3.5 w-3.5" />
                          .HTML
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadBundleJson(selectedProject)}
                          className="rounded-xl border border-amber-400/40 bg-amber-400/15 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-400/25 cursor-pointer flex items-center gap-1.5"
                        >
                          <FolderGit2 className="h-3.5 w-3.5" />
                          Cały projekt (.JSON)
                        </button>
                      </div>
                    </div>

                    {previewMode === 'live' ? (
                      <div className="p-4 bg-black/50 space-y-3">
                        <iframe
                          title={`Preview ${selectedProject.title}`}
                          srcDoc={selectedProject.codeBundle.indexHtml}
                          className="w-full h-[520px] rounded-2xl border border-white/15 bg-black"
                        />
                        <div className="rounded-xl border border-white/10 bg-black/40 p-3 text-[11px] font-mono text-emerald-300 space-y-1">
                          {selectedProject.automationLog.map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1.5">
                            {CODE_FILE_TABS.map((f) => (
                              <button
                                key={f.key}
                                type="button"
                                onClick={() => setActiveCodeFile(f.key)}
                                className={`rounded-lg px-2.5 py-1.5 text-[11px] font-mono cursor-pointer ${
                                  activeCodeFile === f.key
                                    ? 'bg-amber-300 text-slate-950 font-bold'
                                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                }`}
                              >
                                {f.filename}
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              void copyText(
                                `code-${selectedProject.id}-${activeCodeFile}`,
                                selectedProject.codeBundle[activeCodeFile]
                              )
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-bold text-slate-950 cursor-pointer"
                          >
                            {copiedId === `code-${selectedProject.id}-${activeCodeFile}` ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                            {copiedId === `code-${selectedProject.id}-${activeCodeFile}`
                              ? 'Skopiowano plik'
                              : 'Kopiuj plik'}
                          </button>
                        </div>
                        <pre className="rounded-2xl border border-white/10 bg-black/80 p-4 text-[11.5px] font-mono text-slate-200 max-h-[500px] overflow-auto leading-relaxed">
                          {selectedProject.codeBundle[activeCodeFile]}
                        </pre>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPLETE STUDIO AUTOMATIONS */}
        {activeTab === 'automation' && (
          <section className="rounded-3xl border border-emerald-400/25 bg-[#071412]/90 p-6 sm:p-8 space-y-6 aether-fresnel-top">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  Kompletne Automatyzacje Obraz → Kod → Wdrożenie
                </div>
                <h2 className="text-2xl font-serif text-white mt-1">
                  Pipeline generowania pełnych projektów i synchronizacji :3017
                </h2>
              </div>
              <button
                type="button"
                disabled={automationRunning}
                onClick={handleRunAutomationPipeline}
                className="rounded-2xl bg-gradient-to-r from-emerald-400 to-amber-300 px-5 py-3 text-xs font-extrabold text-slate-950 shadow-lg hover:brightness-105 transition cursor-pointer flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                {automationRunning
                  ? 'Przetwarzam pipeline...'
                  : `Uruchom Auto-Pipeline (${activeAnimation})`}
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-5">
              {[
                { step: '01', title: 'Skan Obrazu & Paleta', desc: 'Ekstrakcja barw z Canvas RGB i wyliczenie tła obsidian/emerald.' },
                { step: '02', title: 'Walidacja WCAG AAA', desc: 'Dobór kontrastu tekstu (>= 10:1) oraz bezpiecznych krawędzi kart.' },
                { step: '03', title: 'Shadery :3017', desc: 'Podpięcie border-beam, prism-sweep, Fresnel top edge i haptyki.' },
                { step: '04', title: 'Web-Kit + Mobile-Kit', desc: 'Złożenie przycisków 44px+, siatek Bento i paska dolnego.' },
                { step: '05', title: 'Eksport 6 Plików', desc: 'Kompletny pakiet: index.html, App.tsx, HeroSection.tsx, CSS, JSON.' },
              ].map((s, idx) => {
                const active = automationStepIdx === idx || (!automationRunning && automationStepIdx >= idx);
                return (
                  <div
                    key={s.step}
                    className={`rounded-2xl border p-4 space-y-2 transition ${
                      active
                        ? 'border-emerald-400/60 bg-emerald-500/15 animate-active-halo'
                        : 'border-white/10 bg-white/[0.03]'
                    }`}
                  >
                    <div className="text-[11px] font-mono text-amber-300">KROK {s.step}</div>
                    <div className="text-sm font-bold text-white">{s.title}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-4 md:grid-cols-3 pt-2">
              <div className="rounded-2xl border border-white/10 bg-black/45 p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase">
                  <Zap className="h-4 w-4" />
                  Batch Re-Style Galerii
                </div>
                <p className="text-xs text-slate-300">
                  Kliknięcie „Uruchom Auto-Pipeline” przebudowuje wszystkie {projects.length} projektów w galerii na
                  aktywną animację <code className="text-amber-200">{activeAnimation}</code> bez utraty obrazów.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/45 p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase">
                  <Bot className="h-4 w-4" />
                  Lokalny Agent Ollama (:11434)
                </div>
                <p className="text-xs text-slate-300">
                  Dostępne modele lokalne:{' '}
                  <span className="text-amber-200 font-mono">
                    {telemetry.ollamaModels.length > 0 ? telemetry.ollamaModels.join(', ') : 'agy-operator:latest'}
                  </span>
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/45 p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase">
                  <ShieldCheck className="h-4 w-4" />
                  Bezpieczny Zapis :3016
                </div>
                <p className="text-xs text-slate-300">
                  Projekty i profile sterowników zapisywane są trwale w{' '}
                  <code className="text-emerald-200">data/design-studio/</code> na hoście 3016.
                </p>
              </div>
            </div>

            {/* ZERO-KEY CUTOUT DROPZONE + FOLDER AUTOMATION + FRAMOUS CLI */}
            <div className="rounded-3xl border border-amber-300/35 bg-black/55 p-6 space-y-5 aether-fresnel-top">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                    Automatyzacja Bez Klucza API · Apple Vision Cutout + Warianty + Framous CLI
                  </div>
                  <h3 className="text-xl font-serif text-white mt-0.5">
                    Upuść pliki lub wskaż katalog — wycinanie elementu i warianty trafiają w wskazane miejsce
                  </h3>
                </div>
                {batchStatus?.running ? (
                  <span className="rounded-full bg-emerald-400/20 border border-emerald-400/50 px-3 py-1 text-xs font-bold text-emerald-300">
                    Przetwarzam: {batchStatus.processed}/{batchStatus.total} ({batchStatus.currentFile})
                  </span>
                ) : batchStatus?.finishedAt ? (
                  <span className="rounded-full bg-amber-400/15 border border-amber-300/40 px-3 py-1 text-xs font-bold text-amber-200">
                    Zakończono: {batchStatus.processed}/{batchStatus.total}
                  </span>
                ) : null}
              </div>

              {/* Options row */}
              <div className="grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-6 space-y-2">
                  <label className="text-[11px] font-semibold text-slate-300 block">
                    Katalog źródłowy (przetwarzanie w tle podczas przerwy)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={batchSourceDir}
                      onChange={(e) => setBatchSourceDir(e.target.value)}
                      className="flex-1 rounded-xl border border-white/15 bg-black/70 px-3 py-2 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: 'frontendy web', path: '/Users/krzysztofjarzyna/Pictures/bmclinic.co/frontendy web' },
                      { label: 'wnętrza', path: '/Users/krzysztofjarzyna/Pictures/bmclinic.co/wnętrza' },
                      { label: 'budynki', path: '/Users/krzysztofjarzyna/Pictures/bmclinic.co/budynki' },
                      { label: 'za oknem', path: '/Users/krzysztofjarzyna/Pictures/bmclinic.co/za oknem' },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setBatchSourceDir(preset.path)}
                        className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-white/15 cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-2">
                  <label className="text-[11px] font-semibold text-slate-300 block">
                    Katalog docelowy (&quot;pojawią się gdzie indziej&quot;) + galeria WWW
                  </label>
                  <input
                    type="text"
                    value={batchOutputDir}
                    onChange={(e) => setBatchOutputDir(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/70 px-3 py-2 text-xs font-mono text-emerald-200"
                  />
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-200">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={batchCutout}
                        onChange={(e) => setBatchCutout(e.target.checked)}
                        className="accent-emerald-400"
                      />
                      Wytnij główny element (Alpha PNG, 0 kluczy)
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={batchFramous}
                        onChange={(e) => setBatchFramous(e.target.checked)}
                        className="accent-amber-300"
                      />
                      Opraw dodatkowo przez Framous CLI
                    </label>
                  </div>
                </div>
              </div>

              {/* Variants selector */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-300">
                  Wybierz warianty kolorystyczne specjalizacji (generowane równocześnie):
                </div>
                <div className="flex flex-wrap gap-2">
                  {ZERO_KEY_VARIANT_OPTIONS.map((v) => {
                    const checked = batchVariants.includes(v.id);
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => toggleBatchVariant(v.id)}
                        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold cursor-pointer transition ${
                          checked
                            ? 'border-emerald-400/70 bg-emerald-500/20 text-white'
                            : 'border-white/15 bg-white/5 text-slate-400'
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-white/30"
                          style={{ background: v.badge }}
                        />
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dropzone + Background Folder Runner */}
              <div className="grid gap-4 lg:grid-cols-12 items-stretch">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setBatchDropActive(true);
                  }}
                  onDragLeave={() => setBatchDropActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    void handleBatchDropFiles(e.dataTransfer.files);
                  }}
                  onClick={() => batchDropInputRef.current?.click()}
                  className={`lg:col-span-7 rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                    batchDropActive
                      ? 'border-amber-300 bg-amber-400/15'
                      : 'border-emerald-400/40 bg-emerald-950/20 hover:border-emerald-300'
                  }`}
                >
                  <input
                    ref={batchDropInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => void handleBatchDropFiles(e.target.files)}
                  />
                  <Upload className="h-6 w-6 text-amber-300" />
                  <div className="text-sm font-bold text-white">
                    {batchSubmitting
                      ? 'Wycinam i generuję warianty...'
                      : 'Przeciągnij i upuść obrazy tutaj (PNG / JPG / WEBP)'}
                  </div>
                  <div className="text-xs text-slate-400">
                    Zostaną wycięte bez klucza API i automatycznie zapisane w katalogu docelowym + poniżej
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-black/50 p-5 flex flex-col justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Automat na przerwę (Folder Batch)
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Przetworzy kolejno wszystkie zdjęcia ze wskazanego katalogu w tle — po powrocie będą czekać gotowe w{' '}
                      <code className="text-emerald-300 break-all">{batchOutputDir}</code>.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={batchSubmitting || Boolean(batchStatus?.running)}
                    onClick={() => void handleStartFolderBatch()}
                    className="w-full rounded-xl bg-gradient-to-r from-amber-300 to-emerald-300 py-3 px-4 text-xs font-extrabold text-slate-950 hover:brightness-105 transition cursor-pointer disabled:opacity-50"
                  >
                    {batchStatus?.running
                      ? `Przetwarzam (${batchStatus.processed}/${batchStatus.total})...`
                      : 'Uruchom wsadowo na całym katalogu ↗'}
                  </button>
                </div>
              </div>

              {/* Recent outputs grid ("pojawiają się gdzie indziej" -> live view + send to gallery) */}
              {batchStatus && batchStatus.recentOutputs.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Wygenerowane wycięcia i warianty ({batchStatus.recentOutputs.length})
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {batchStatus.recentOutputs.slice(0, 12).map((out, idx) => (
                      <div
                        key={`${out.publicUrl}-${idx}`}
                        className="rounded-2xl border border-white/10 bg-black/60 p-3 space-y-2"
                      >
                        <div className="h-32 w-full overflow-hidden rounded-xl border border-white/10 bg-[#081210]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={out.publicUrl}
                            alt={`${out.sourceName} ${out.variantId}`}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="text-[11px] font-bold text-white truncate">{out.variantId}</div>
                        <div className="text-[10px] text-slate-400 truncate">{out.sourceName}</div>
                        <div className="flex gap-1.5">
                          <a
                            href={out.publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 rounded-lg border border-white/15 bg-white/5 py-1.5 text-center text-[10px] font-semibold text-slate-200 hover:bg-white/15"
                          >
                            Podgląd ↗
                          </a>
                          <button
                            type="button"
                            onClick={() => void handleSendVariantToGallery(out)}
                            className="flex-1 rounded-lg bg-emerald-400/20 border border-emerald-400/40 py-1.5 text-[10px] font-bold text-emerald-200 hover:bg-emerald-400/35 cursor-pointer"
                          >
                            Do Galerii + Kod
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 3: WEB-KIT + MOBILE-KIT BUTTONS, LAYOUTS & 10 UI LIBRARIES */}
        {activeTab === 'kits' && (
          <div className="space-y-8">
            {/* 7 Most-Used Button Layouts */}
            <section className="rounded-3xl border border-emerald-400/25 bg-[#071412]/90 p-6 sm:p-8 space-y-5 aether-fresnel-top">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                    <MousePointerClick className="h-4 w-4" />
                    Web-Kit &amp; Mobile-Kit — 7 Najczęściej Stosowanych Przycisków
                  </div>
                  <h2 className="text-2xl font-serif text-white mt-1">
                    Ergonomiczne przyciski 44px+ z gotowym kodem React/Tailwind i HTML/CSS
                  </h2>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {KIT_BUTTON_PRESETS.map((btn) => (
                  <div
                    key={btn.id}
                    className="rounded-2xl border border-white/10 bg-black/50 p-4 flex flex-col justify-between gap-4 aether-fresnel-top"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-emerald-300">{btn.platform}</span>
                        <span className="text-slate-400 font-mono">{btn.touchTarget}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{btn.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{btn.usage}</p>
                    </div>

                    <div
                      className="rounded-xl border border-white/10 bg-[#050d0c] p-4 flex items-center justify-center min-h-[78px]"
                      dangerouslySetInnerHTML={{ __html: btn.htmlCssCode }}
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => void copyText(`${btn.id}-tw`, btn.tailwindCode)}
                        className="flex-1 rounded-xl border border-emerald-400/35 bg-emerald-500/15 py-2 text-[11px] font-bold text-emerald-200 hover:bg-emerald-500/25 cursor-pointer flex items-center justify-center gap-1"
                      >
                        {copiedId === `${btn.id}-tw` ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copiedId === `${btn.id}-tw` ? 'Skopiowano TSX' : 'Kopiuj React/TW'}
                      </button>
                      <button
                        type="button"
                        onClick={() => void copyText(`${btn.id}-html`, btn.htmlCssCode)}
                        className="flex-1 rounded-xl border border-white/15 bg-white/5 py-2 text-[11px] font-semibold text-slate-200 hover:bg-white/10 cursor-pointer flex items-center justify-center gap-1"
                      >
                        {copiedId === `${btn.id}-html` ? <Check className="h-3.5 w-3.5" /> : <FileCode2 className="h-3.5 w-3.5" />}
                        {copiedId === `${btn.id}-html` ? 'Skopiowano HTML' : 'Kopiuj HTML'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Web-Kit & Mobile-Kit Layouts */}
            <section className="rounded-3xl border border-white/10 bg-[#060e0e]/90 p-6 sm:p-8 space-y-5">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-300 flex items-center gap-2">
                <MonitorSmartphone className="h-4 w-4" />
                Najczęściej Stosowane Rozkłady Web-Kit &amp; Mobile-Kit
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {KIT_LAYOUT_PRESETS.map((lay) => (
                  <div
                    key={lay.id}
                    className="rounded-2xl border border-white/10 bg-black/45 p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-amber-300">
                        {lay.platform}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{lay.gridSpec}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{lay.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{lay.description}</p>
                    <pre className="rounded-xl border border-white/10 bg-black/70 p-3 text-[11px] font-mono text-emerald-200 overflow-x-auto">
                      {lay.tsxSnippet}
                    </pre>
                    <button
                      type="button"
                      onClick={() => void copyText(lay.id, lay.tsxSnippet)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15 cursor-pointer"
                    >
                      {copiedId === lay.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedId === lay.id ? 'Skopiowano układ TSX' : 'Kopiuj kod układu TSX'}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Embedded existing 10 UI Theme Libraries & 4 Phone Frames */}
            <div className="rounded-3xl border border-white/10 bg-black/30 p-2">
              <MobileDesignStudioClient />
            </div>
          </div>
        )}

        {/* TAB 4: LATEST DRIVERS REGISTRY */}
        {activeTab === 'drivers' && (
          <section className="rounded-3xl border border-emerald-400/25 bg-[#071412]/90 p-6 sm:p-8 space-y-6 aether-fresnel-top">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                  <Sliders className="h-4 w-4" />
                  Rejestr Najnowszych Sterowników &amp; Runtime (:3017 / WebGL / M1 / TTS)
                </div>
                <h2 className="text-2xl font-serif text-white mt-1">
                  Sterowniki sprzętowe, graficzne i AI zainstalowane w środowisku :3016
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <input
                  ref={driverFileInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={(e) => void handleUploadDriverJson(e.target.files)}
                />
                <button
                  type="button"
                  onClick={() => driverFileInputRef.current?.click()}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 cursor-pointer flex items-center gap-2"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Wgraj własny sterownik (.json)
                </button>
                <button
                  type="button"
                  onClick={handleSyncAllDrivers}
                  disabled={syncingDrivers}
                  className="rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-300 cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${syncingDrivers ? 'animate-spin' : ''}`} />
                  {syncingDrivers ? 'Wgrywam...' : 'Wgraj wszystkie najnowsze sterowniki'}
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {drivers.map((drv) => (
                <div
                  key={drv.id}
                  className="rounded-2xl border border-white/10 bg-black/50 p-5 space-y-3 aether-fresnel-top"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
                      {drv.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-300">v{drv.latestVersion}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{drv.name}</h3>
                  <div className="text-[11px] font-mono text-slate-400 truncate">{drv.source}</div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {drv.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-slate-200"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 5: LIVE UI/UX TRENDS & COMPLETE VERCEL TEMPLATES */}
        {activeTab === 'trends' && (
          <div className="space-y-8">
            <section className="rounded-3xl border border-emerald-400/25 bg-[#071412]/90 p-6 sm:p-8 space-y-5 aether-fresnel-top">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Komplet Szablonów ze Strony Vercel
                </div>
                <h2 className="text-2xl font-serif text-white mt-1">
                  Oficjalne katalogi i gotowe architektury Next.js / AI / SaaS / Ecommerce
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {VERCEL_TEMPLATE_LINKS.map((tpl) => (
                  <a
                    key={tpl.id}
                    href={tpl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-white/15 bg-black/55 p-4 space-y-2 hover:border-amber-300/70 hover:bg-emerald-950/35 transition aether-fresnel-top"
                  >
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-emerald-300">
                      <span>{tpl.stack}</span>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-300" />
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-amber-200">{tpl.name}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{tpl.description}</p>
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/15 bg-[#060f0e] p-6 sm:p-8 space-y-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-300 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Podgląd Aktualnych Trendów UI/UX na Najpopularniejszych Portalach i Platformach
                </div>
                <h2 className="text-2xl font-serif text-white mt-1">
                  Najważniejsze portale inspiracji i bibliotek wzorców projektowych
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {TREND_PORTALS.map((portal) => (
                  <a
                    key={portal.id}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2 hover:border-emerald-400/60 hover:bg-white/[0.07] transition"
                  >
                    <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider">
                      <span className="text-amber-300">{portal.category}</span>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-300" />
                    </div>
                    <div className="text-base font-bold text-white group-hover:text-emerald-200">{portal.name}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{portal.description}</p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
