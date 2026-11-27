import { execFile } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export interface BatchOutputEntry {
  sourceName: string;
  kind: 'cutout' | 'variant';
  variantId: string;
  publicUrl: string;
  diskPath: string;
  createdAt: string;
}

export interface BatchJobStatus {
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

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.heic']);
const FRAMOUS_BIN = '/Applications/Framous.app/Contents/Resources/framous-cli/bin/framous';

const state: BatchJobStatus = {
  running: false,
  mode: 'idle',
  sourceDir: '/Users/krzysztofjarzyna/Pictures/bmclinic.co/frontendy web',
  outputDir: '/Users/krzysztofjarzyna/Pictures/bmclinic.co/_PRZETWORZONE_AI',
  total: 0,
  processed: 0,
  currentFile: '',
  cutoutEnabled: true,
  framousEnabled: false,
  variants: [
    'proktologia-emerald',
    'chirurgia-steel',
    'flebologia-lavender',
    'flebologia-male-teal',
    'obsidian-champagne',
  ],
  startedAt: null,
  finishedAt: null,
  recentOutputs: [],
  errors: [],
};

function ensureSafeLocalPath(rawPath: string): string | null {
  const trimmed = String(rawPath || '').trim();
  if (!trimmed || trimmed.includes('..')) return null;
  const resolved = path.resolve(trimmed);
  const homeDir = os.homedir();
  if (!resolved.startsWith(homeDir)) return null;
  return resolved;
}

async function ensureVisionBinary(masterRoot: string): Promise<string> {
  const binPath = path.join(masterRoot, '.cache', 'bm-vision-cutout');
  const swiftSrc = path.join(masterRoot, 'scripts', 'bm-vision-cutout.swift');
  if (fs.existsSync(binPath)) return binPath;
  if (!fs.existsSync(swiftSrc)) {
    throw new Error(`Brak pliku silnika: ${swiftSrc}`);
  }
  fs.mkdirSync(path.dirname(binPath), { recursive: true });
  await execFileAsync('swiftc', ['-O', swiftSrc, '-o', binPath], { timeout: 60000 });
  return binPath;
}

async function runVisionOnFile(
  binPath: string,
  inputPath: string,
  webPreviewDir: string,
  extraOutputDir: string | null,
  cutout: boolean,
  framous: boolean,
  variants: string[]
): Promise<BatchOutputEntry[]> {
  fs.mkdirSync(webPreviewDir, { recursive: true });
  const args = [inputPath, webPreviewDir];
  if (!cutout) args.push('--no-cutout');
  if (variants.length > 0) args.push(`--variants=${variants.join(',')}`);

  const { stdout } = await execFileAsync(binPath, args, { timeout: 60000 });
  const parsed = JSON.parse(stdout || '{}') as { ok?: boolean; outputs?: string[]; error?: string };
  if (!parsed.ok || !Array.isArray(parsed.outputs)) {
    throw new Error(parsed.error || 'Błąd przetwarzania obrazu');
  }

  const allOutputs = [...parsed.outputs];
  if (framous && fs.existsSync(FRAMOUS_BIN)) {
    try {
      const baseClean = path.basename(inputPath, path.extname(inputPath)).replace(/\s+/g, '_');
      const framedPath = path.join(webPreviewDir, `${baseClean}__framous-generic.png`);
      await execFileAsync(
        FRAMOUS_BIN,
        [
          inputPath,
          '--device',
          'generic',
          '--shadow',
          '--padding',
          '72',
          '--background',
          'gradient',
          '--gradient-colors',
          '#050b0c,#102629',
          '--gradient-angle',
          '135',
          '--overwrite',
          '-o',
          framedPath,
        ],
        { timeout: 60000 }
      );
      if (fs.existsSync(framedPath)) {
        allOutputs.push(framedPath);
      }
    } catch {
      // Framous framing is optional; preserve cutout and variant outputs
    }
  }

  if (extraOutputDir && path.resolve(extraOutputDir) !== path.resolve(webPreviewDir)) {
    fs.mkdirSync(extraOutputDir, { recursive: true });
  }

  const nowIso = new Date().toISOString();
  const baseSource = path.basename(inputPath);
  const entries: BatchOutputEntry[] = [];

  for (const outPath of allOutputs) {
    const fileName = path.basename(outPath);
    let finalDiskPath = outPath;
    if (extraOutputDir && path.resolve(extraOutputDir) !== path.resolve(webPreviewDir)) {
      const mirrored = path.join(extraOutputDir, fileName);
      fs.copyFileSync(outPath, mirrored);
      finalDiskPath = mirrored;
    }
    const isCutout = fileName.includes('__cutout.');
    const variantMatch = fileName.match(/__([^.]+)\.[^.]+$/);
    entries.push({
      sourceName: baseSource,
      kind: isCutout ? 'cutout' : 'variant',
      variantId: variantMatch ? variantMatch[1] : 'variant',
      publicUrl: `/assets/batch-variants/${encodeURIComponent(fileName)}`,
      diskPath: finalDiskPath,
      createdAt: nowIso,
    });
  }

  return entries;
}

export function getBatchJobStatus(): BatchJobStatus {
  return {
    ...state,
    recentOutputs: state.recentOutputs.slice(0, 60),
    errors: state.errors.slice(0, 20),
  };
}

export async function processDroppedImages(
  masterRoot: string,
  params: {
    files: Array<{ name: string; dataUrl: string }>;
    outputDir?: string;
    cutout?: boolean;
    framous?: boolean;
    variants?: string[];
  }
): Promise<BatchJobStatus> {
  const cutout = params.cutout !== false;
  const framous = Boolean(params.framous);
  const variants = Array.isArray(params.variants) && params.variants.length > 0 ? params.variants : state.variants;
  const safeOut = params.outputDir ? ensureSafeLocalPath(params.outputDir) : null;
  const webPreviewDir = path.join(masterRoot, 'public', 'assets', 'batch-variants');
  const tmpDir = path.join(masterRoot, '.cache', 'drop-inputs');
  fs.mkdirSync(tmpDir, { recursive: true });

  const binPath = await ensureVisionBinary(masterRoot);
  state.running = true;
  state.mode = 'drop';
  state.sourceDir = 'Przeciągnij i upuść (Przeglądarka)';
  state.outputDir = safeOut || webPreviewDir;
  state.total = params.files.length;
  state.processed = 0;
  state.cutoutEnabled = cutout;
  state.framousEnabled = framous;
  state.variants = variants;
  state.startedAt = new Date().toISOString();
  state.finishedAt = null;
  state.errors = [];

  try {
    for (const file of params.files) {
      const cleanName = path.basename(file.name || `drop-${Date.now()}.png`).replace(/[^a-zA-Z0-9._-]/g, '_');
      state.currentFile = cleanName;
      const m = String(file.dataUrl || '').match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (!m) {
        state.errors.push(`Pominięto nieprawidłowy plik: ${cleanName}`);
        state.processed += 1;
        continue;
      }
      const tmpInput = path.join(tmpDir, `${Date.now()}-${cleanName}`);
      fs.writeFileSync(tmpInput, Buffer.from(m[2], 'base64'));
      try {
        const produced = await runVisionOnFile(binPath, tmpInput, webPreviewDir, safeOut, cutout, framous, variants);
        state.recentOutputs = [...produced, ...state.recentOutputs].slice(0, 120);
      } catch (err) {
        state.errors.push(`${cleanName}: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        try {
          fs.unlinkSync(tmpInput);
        } catch {}
      }
      state.processed += 1;
    }
  } finally {
    state.running = false;
    state.currentFile = '';
    state.finishedAt = new Date().toISOString();
  }

  return getBatchJobStatus();
}

export async function startFolderBatchJob(
  masterRoot: string,
  params: {
    folderPath: string;
    outputDir?: string;
    cutout?: boolean;
    framous?: boolean;
    variants?: string[];
  }
): Promise<BatchJobStatus> {
  if (state.running) {
    throw new Error('Poprzednia automatyzacja folderu jest jeszcze w trakcie.');
  }
  const safeSource = ensureSafeLocalPath(params.folderPath);
  if (!safeSource || !fs.existsSync(safeSource) || !fs.statSync(safeSource).isDirectory()) {
    throw new Error('Nieprawidłowy lub niedostępny katalog źródłowy (wymagana ścieżka wewnątrz katalogu domowego).');
  }
  const requestedOut = params.outputDir ? ensureSafeLocalPath(params.outputDir) : null;
  const finalOut = requestedOut || path.join(safeSource, '_PRZETWORZONE_AI');
  const webPreviewDir = path.join(masterRoot, 'public', 'assets', 'batch-variants');
  const cutout = params.cutout !== false;
  const framous = Boolean(params.framous);
  const variants = Array.isArray(params.variants) && params.variants.length > 0 ? params.variants : state.variants;

  const files = fs
    .readdirSync(safeSource, { withFileTypes: true })
    .filter((d) => d.isFile() && !d.name.startsWith('.') && IMAGE_EXTS.has(path.extname(d.name).toLowerCase()))
    .map((d) => path.join(safeSource, d.name));

  state.running = true;
  state.mode = 'folder';
  state.sourceDir = safeSource;
  state.outputDir = finalOut;
  state.total = files.length;
  state.processed = 0;
  state.currentFile = files[0] ? path.basename(files[0]) : '';
  state.cutoutEnabled = cutout;
  state.framousEnabled = framous;
  state.variants = variants;
  state.startedAt = new Date().toISOString();
  state.finishedAt = null;
  state.errors = [];

  void (async () => {
    try {
      const binPath = await ensureVisionBinary(masterRoot);
      for (const filePath of files) {
        state.currentFile = path.basename(filePath);
        try {
          const produced = await runVisionOnFile(binPath, filePath, webPreviewDir, finalOut, cutout, framous, variants);
          state.recentOutputs = [...produced, ...state.recentOutputs].slice(0, 120);
        } catch (err) {
          state.errors.push(`${path.basename(filePath)}: ${err instanceof Error ? err.message : String(err)}`);
        }
        state.processed += 1;
      }
    } catch (err) {
      state.errors.push(err instanceof Error ? err.message : String(err));
    } finally {
      state.running = false;
      state.currentFile = '';
      state.finishedAt = new Date().toISOString();
    }
  })();

  return getBatchJobStatus();
}
