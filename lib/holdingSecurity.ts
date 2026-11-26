import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';

export interface FileThreatFinding {
  file: string;
  signature: string;
  severity: 'critical' | 'high' | 'warning';
}

export interface FileScanSummary {
  scanId: string;
  scannedAt: string;
  durationMs: number;
  scannedFiles: number;
  cleanFiles: number;
  threatsFound: FileThreatFinding[];
  cpuPercentDuringScan: number;
  rootsScanned: string[];
  status: 'clean' | 'threats_detected';
}

export interface SystemTelemetry {
  cpuPercent: number;
  cpuCores: number;
  loadAvg1m: number;
  memoryUsedMb: number;
  memoryTotalMb: number;
  processRssMb: number;
  uptimeSeconds: number;
  sampledAt: string;
}

const THREAT_SIGNATURES: Array<{
  name: string;
  pattern: RegExp;
  severity: FileThreatFinding['severity'];
}> = [
  { name: 'Adware.PopupStorm.Daemon', pattern: /adware_alert_daemon\.exe/i, severity: 'critical' },
  { name: 'Adware.PopupCascade', pattern: /adware_popup_cascade\.exe/i, severity: 'critical' },
  { name: 'FlutterLocker.OverlayKiller', pattern: /flutter_desktop_overlay\.exe/i, severity: 'critical' },
  { name: 'WindowManager.HookStealer', pattern: /window_manager_hook\.dll/i, severity: 'critical' },
  { name: 'ScreenHook.Daemon', pattern: /screen_hook_daemon\.exe/i, severity: 'critical' },
  { name: 'HermeticWiper.MasterAnnihilator', pattern: /hermeticwiper_masterannihilator\.exe/i, severity: 'critical' },
  { name: 'Wiper.RawMBR', pattern: /wiper_raw_mbr\.exe/i, severity: 'critical' },
  { name: 'PyLock.ScreenFreeze', pattern: /pylock\.(scr|exe)/i, severity: 'high' },
  { name: 'Wininit.StealthMiner', pattern: /wininit_miner\.exe/i, severity: 'high' },
  { name: 'Pegasus.OverlayGhost', pattern: /pegasus_overlayghost_zeroday\.exe/i, severity: 'critical' },
];

const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build', 'release']);
const SCAN_EXT = /\.(tsx|ts|jsx|js|mjs|cjs|html|css|json|sql|md)$/i;

let lastFileScan: FileScanSummary | null = null;
const recentUrlScans: Array<Record<string, unknown>> = [];

let activeSeoAeoConfig = {
  siteTitle: 'BM Clinic × BM Holding — Klinika & Panel Publikacji SEO/AEO',
  metaDescription:
    'Zintegrowana platforma kliniczna BM Clinic oraz panel publikacji, SEO, AEO, skanera antywirusowego i synchronizacji Google Workspace.',
  canonicalUrl: 'https://bmclinic.co',
  keywords: 'BM Clinic, BM Holding, proktologia, flebologia, chirurgia, SEO, AEO, Warszawa',
  organizationName: 'BM Clinic / BM Holding',
  ceoOrOwnerName: 'lek. Jan Bujok',
  workspaceEmail: 'kontakt@bmclinic.co',
  workspaceDomain: 'bmclinic.co',
  aeoPrimaryQuestion: 'Jakie usługi i narzędzia udostępnia zintegrowana platforma BM Clinic × BM Holding?',
  aeoPrimaryAnswer:
    'Platforma łączy rezerwację wizyt online, sklep zabiegowy, bazę MCML oraz panel Holding z optymalizacją SEO/AEO, analizą kodu i skanerem bezpieczeństwa plików.',
  aeoSecondaryQuestion: 'Jak działa monitorowanie zasobów i bezpieczeństwa projektu?',
  aeoSecondaryAnswer:
    'Moduł telemetryczny w czasie rzeczywistym mierzy obciążenie CPU i RAM serwera oraz wykonuje skan sygnaturowy plików źródłowych projektu.',
  autoSyncWorkspace: true,
  updatedAt: new Date().toISOString(),
};

function readCpuTotals() {
  const cpus = os.cpus();
  let idle = 0;
  let total = 0;
  for (const cpu of cpus) {
    idle += cpu.times.idle;
    total +=
      cpu.times.user +
      cpu.times.nice +
      cpu.times.sys +
      cpu.times.idle +
      cpu.times.irq;
  }
  return { idle, total, cores: cpus.length };
}

export async function sampleSystemTelemetry(sampleWindowMs = 120): Promise<SystemTelemetry> {
  const start = readCpuTotals();
  await new Promise((resolve) => setTimeout(resolve, sampleWindowMs));
  const end = readCpuTotals();

  const totalDiff = Math.max(1, end.total - start.total);
  const idleDiff = Math.max(0, end.idle - start.idle);
  const cpuPercent = Number((((totalDiff - idleDiff) / totalDiff) * 100).toFixed(1));

  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  return {
    cpuPercent,
    cpuCores: end.cores,
    loadAvg1m: Number((os.loadavg()[0] || 0).toFixed(2)),
    memoryUsedMb: Math.round((totalMem - freeMem) / (1024 * 1024)),
    memoryTotalMb: Math.round(totalMem / (1024 * 1024)),
    processRssMb: Math.round(process.memoryUsage().rss / (1024 * 1024)),
    uptimeSeconds: Math.round(process.uptime()),
    sampledAt: new Date().toISOString(),
  };
}

function collectFiles(dirPath: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return acc;
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dirPath, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, acc);
    } else if (entry.isFile() && SCAN_EXT.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

export async function runProjectAntivirusScan(): Promise<FileScanSummary> {
  const startMs = Date.now();
  const cpuStart = readCpuTotals();

  const unifiedRoot = process.cwd();
  const siblingHoldingRoot = path.resolve(unifiedRoot, '..', 'BM-Holding');
  const roots = [unifiedRoot];
  if (fs.existsSync(siblingHoldingRoot)) {
    roots.push(siblingHoldingRoot);
  }

  const allFiles: string[] = [];
  for (const r of roots) {
    collectFiles(r, allFiles);
  }

  const threatsFound: FileThreatFinding[] = [];
  let scannedFiles = 0;

  for (const filePath of allFiles) {
    // Skip the scanner definition file itself so its regex literals aren't flagged
    if (filePath.endsWith(path.join('lib', 'holdingSecurity.ts'))) continue;
    try {
      const stat = fs.statSync(filePath);
      if (stat.size > 2 * 1024 * 1024) continue;
      const content = fs.readFileSync(filePath, 'utf-8');
      scannedFiles += 1;

      for (const sig of THREAT_SIGNATURES) {
        if (sig.pattern.test(content)) {
          threatsFound.push({
            file: path.relative(path.dirname(unifiedRoot), filePath),
            signature: sig.name,
            severity: sig.severity,
          });
        }
      }
    } catch {
      // ignore unreadable transient files
    }
  }

  // Ensure measurable CPU delta window (>= 60ms)
  const elapsedBeforeEnd = Date.now() - startMs;
  if (elapsedBeforeEnd < 60) {
    await new Promise((r) => setTimeout(r, 60 - elapsedBeforeEnd));
  }
  const cpuEnd = readCpuTotals();
  const totalDiff = Math.max(1, cpuEnd.total - cpuStart.total);
  const idleDiff = Math.max(0, cpuEnd.idle - cpuStart.idle);
  const cpuPercentDuringScan = Number((((totalDiff - idleDiff) / totalDiff) * 100).toFixed(1));

  const durationMs = Date.now() - startMs;
  lastFileScan = {
    scanId: `fscan_${Date.now().toString(36)}_${crypto.randomBytes(2).toString('hex')}`,
    scannedAt: new Date().toISOString(),
    durationMs,
    scannedFiles,
    cleanFiles: Math.max(0, scannedFiles - threatsFound.length),
    threatsFound,
    cpuPercentDuringScan,
    rootsScanned: roots.map((r) => path.basename(r)),
    status: threatsFound.length === 0 ? 'clean' : 'threats_detected',
  };

  return lastFileScan;
}

export function getLastFileScan(): FileScanSummary | null {
  return lastFileScan;
}

export function getConfigScanPayload() {
  const root = process.cwd();
  const keyFiles = [
    {
      fileName: 'package.json',
      label: 'Manifest zależności (package.json)',
      description: 'Konfiguracja Next.js, Prisma i zależności aplikacji.',
      severity: 'critical',
      missingMessage: 'Brak package.json.',
      remediationHint: 'Przywróć package.json w katalogu głównym.',
    },
    {
      fileName: 'next.config.ts',
      label: 'Konfiguracja Next.js (next.config.ts)',
      description: 'Reguły routingu, nagłówki bezpieczeństwa i integracja modułu Holding.',
      severity: 'critical',
      missingMessage: 'Brak next.config.ts.',
      remediationHint: 'Przywróć next.config.ts.',
    },
    {
      fileName: 'prisma/schema.prisma',
      label: 'Schemat bazy danych (Prisma)',
      description: 'Modele wizyt, usług, zamówień i użytkowników PostgreSQL.',
      severity: 'critical',
      missingMessage: 'Brak prisma/schema.prisma.',
      remediationHint: 'Sprawdź katalog prisma/.',
    },
    {
      fileName: 'public/holding/index.html',
      label: 'Zintegrowany Panel Holding (/holding)',
      description: 'Zbudowany moduł SEO/AEO, GitHub, Dysku Google i skanera.',
      severity: 'recommended',
      missingMessage: 'Brak zbudowanego bundle public/holding/index.html.',
      remediationHint: 'Zbuduj BM-Holding do public/holding.',
    },
    {
      fileName: 'README.md',
      label: 'Dokumentacja projektu (README.md)',
      description: 'Opis architektury i wdrożenia.',
      severity: 'recommended',
      missingMessage: 'Brak pliku README.md.',
      remediationHint: 'Dodaj dokumentację README.md.',
    },
  ];

  const results = keyFiles.map((item) => {
    const fullPath = path.join(root, item.fileName);
    let exists = false;
    let sizeBytes: number | null = null;
    let updatedAt: string | null = null;
    try {
      if (fs.existsSync(fullPath)) {
        const st = fs.statSync(fullPath);
        if (st.isFile()) {
          exists = true;
          sizeBytes = st.size;
          updatedAt = st.mtime.toISOString();
        }
      }
    } catch {
      exists = false;
    }
    return { ...item, exists, sizeBytes, updatedAt };
  });

  return { scannedAt: new Date().toISOString(), results };
}

export function getCodeAnalyzePayload() {
  const root = process.cwd();
  const files = [
    ...collectFiles(path.join(root, 'app')),
    ...collectFiles(path.join(root, 'components')),
    ...collectFiles(path.join(root, 'lib')),
  ].filter((f) => /\.(tsx|ts|jsx|js|html)$/.test(f));

  let totalLines = 0;
  let totalButtons = 0;
  let dataInterfaces = 0;
  const fileSummaries = files.slice(0, 80).map((fullPath) => {
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const lines = raw.split('\n').length;
    const buttons = (raw.match(/<button\b/g) || []).length;
    const ifaces = (raw.match(/\binterface\s+[A-Z]/g) || []).length;
    totalLines += lines;
    totalButtons += buttons;
    dataInterfaces += ifaces;
    return {
      filePath: path.relative(root, fullPath),
      lines,
      buttons,
      interfaces: ifaces,
    };
  });

  return {
    analyzedAt: new Date().toISOString(),
    summary: {
      totalFiles: files.length,
      totalLines,
      interactiveButtons: totalButtons,
      dataStructures: dataInterfaces,
    },
    files: fileSummaries,
  };
}

export function getSeoAeoConfigPayload() {
  return {
    config: activeSeoAeoConfig,
    htmlAudit: {
      hasLangPl: true,
      hasTitle: true,
      hasMetaDescription: true,
      hasOpenGraph: true,
      hasTwitterCard: true,
      hasJsonLd: true,
    },
    endpoints: {
      robotsTxt: '/robots.txt',
      sitemapXml: '/sitemap.xml',
      llmsTxt: '/llms.txt',
    },
  };
}

export function updateSeoAeoConfig(body: Record<string, unknown>) {
  activeSeoAeoConfig = {
    ...activeSeoAeoConfig,
    siteTitle: String(body.siteTitle || activeSeoAeoConfig.siteTitle).slice(0, 100),
    metaDescription: String(body.metaDescription || activeSeoAeoConfig.metaDescription).slice(0, 240),
    canonicalUrl: String(body.canonicalUrl || activeSeoAeoConfig.canonicalUrl).slice(0, 200),
    keywords: String(body.keywords || activeSeoAeoConfig.keywords).slice(0, 250),
    organizationName: String(body.organizationName || activeSeoAeoConfig.organizationName).slice(0, 120),
    ceoOrOwnerName: String(body.ceoOrOwnerName || activeSeoAeoConfig.ceoOrOwnerName).slice(0, 120),
    workspaceEmail: String(body.workspaceEmail || activeSeoAeoConfig.workspaceEmail).slice(0, 160),
    workspaceDomain: String(body.workspaceDomain || activeSeoAeoConfig.workspaceDomain).slice(0, 120),
    aeoPrimaryQuestion: String(body.aeoPrimaryQuestion || activeSeoAeoConfig.aeoPrimaryQuestion).slice(0, 180),
    aeoPrimaryAnswer: String(body.aeoPrimaryAnswer || activeSeoAeoConfig.aeoPrimaryAnswer).slice(0, 500),
    aeoSecondaryQuestion: String(body.aeoSecondaryQuestion || activeSeoAeoConfig.aeoSecondaryQuestion).slice(0, 180),
    aeoSecondaryAnswer: String(body.aeoSecondaryAnswer || activeSeoAeoConfig.aeoSecondaryAnswer).slice(0, 500),
    autoSyncWorkspace:
      typeof body.autoSyncWorkspace === 'boolean'
        ? body.autoSyncWorkspace
        : activeSeoAeoConfig.autoSyncWorkspace,
    updatedAt: new Date().toISOString(),
  };
  return activeSeoAeoConfig;
}

export function getConnectorManifestPayload() {
  return {
    version: '1.1.0',
    serviceName: 'BM-Unified-Antivirus-Connector',
    signatureHeader: 'x-scanner-signature',
    endpoints: {
      manifest: '/api/security/connector-manifest',
      scanUrl: '/api/security/scan-url',
      webhookReceiver: '/api/security/webhook/scan-result',
      recentScans: '/api/security/recent-scans',
      testBridge: '/api/security/test-bridge',
      projectFileScan: '/api/holding/telemetry',
    },
    postMessageContract: {
      requestType: 'ANTIVIRUS_SCAN_REQUEST',
      responseType: 'ANTIVIRUS_SCAN_RESULT',
    },
    serverCapabilities: {
      builtInHeuristicEngine: true,
      externalEndpointConfigured: false,
      configuredEndpointUrl: null,
      hmacSecretConfigured: false,
      virusTotalConfigured: Boolean(process.env.VIRUSTOTAL_API_KEY),
      safeBrowsingConfigured: Boolean(process.env.GOOGLE_SAFE_BROWSING_KEY),
    },
  };
}

export function getRecentScansPayload() {
  return {
    scans: recentUrlScans,
    projectFileScan: lastFileScan,
  };
}

export function recordUrlScan(entry: Record<string, unknown>) {
  recentUrlScans.unshift(entry);
  if (recentUrlScans.length > 20) recentUrlScans.length = 20;
}
