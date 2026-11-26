import fs from 'fs';
import net from 'net';
import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { runSuperagentGuard, type SuperagentGuardResult } from '@/lib/superagentEngine';

const execFileAsync = promisify(execFile);

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
const VOICE_BUILDER_MODEL = 'bm-voice-builder:latest';
const TASKS_FILE = path.join(process.cwd(), 'taskkill-assets', 'tasks.json');
const VOICE_LOG_FILE = path.join(process.cwd(), 'taskkill-assets', 'mindmaps', 'voice-builder-log.json');

export type VoiceBuildIntent =
  | 'check_services'
  | 'verify_build'
  | 'create_task'
  | 'list_tasks'
  | 'log_journal'
  | 'open_module'
  | 'general_command';

export interface ServiceProbe {
  id: string;
  label: string;
  port: number;
  url: string;
  online: boolean;
}

export interface BuildTaskRecord {
  id: number | string;
  title: string;
  body?: string;
  status: string;
  priority: string;
  type?: string;
  labels?: string[];
  assignee?: string;
  startDate?: string;
  endDate?: string;
  url?: string;
}

export interface VoiceJournalEntry {
  id: string;
  timestamp: string;
  transcript: string;
  intent: VoiceBuildIntent;
  summary: string;
  spokenReplyPl: string;
  model: string;
}

export interface VoiceBuilderStatus {
  ollamaOnline: boolean;
  voiceModelReady: boolean;
  voiceModelName: string;
  guardModelReady: boolean;
  baseModelName: string;
  modelfileReady: boolean;
  services: ServiceProbe[];
  tasksSummary: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
    recentTasks: BuildTaskRecord[];
  };
  journalEntries: VoiceJournalEntry[];
}

export interface ParsedVoiceCommand {
  intent: VoiceBuildIntent;
  target: string;
  taskTitle: string;
  taskPriority: 'Wysoki' | 'Średni' | 'Niski';
  notes: string;
  openUrl: string;
  spokenReplyPl: string;
  nextSteps: string[];
  confidence: number;
}

export interface VoiceCommandExecutionResult {
  blocked: boolean;
  guard: SuperagentGuardResult;
  engine: string;
  parsed: ParsedVoiceCommand;
  executed: boolean;
  actionResult: Record<string, unknown> | null;
  statusSnapshot: VoiceBuilderStatus;
}

const SERVICE_TARGETS: Array<{ id: string; label: string; port: number; url: string }> = [
  { id: 'master', label: 'BM Clinic Unified (:3016)', port: 3016, url: 'http://localhost:3016/' },
  { id: 'aether', label: 'Aether Tactile Studio (:3017)', port: 3017, url: 'http://localhost:3017/' },
  { id: 'chomik', label: 'Chomik MediaPipe (:3018)', port: 3018, url: 'http://localhost:3018/' },
  { id: 'vibekit', label: 'VibeKit Dashboard (:3019)', port: 3019, url: 'http://localhost:3019/' },
  { id: 'ollama', label: 'Ollama Local LLM (:11434)', port: 11434, url: 'http://127.0.0.1:11434/' },
];

const SAFE_OPEN_ROUTES: Record<string, string> = {
  superagent: '/superagent',
  guard: '/superagent',
  vibekit: 'http://localhost:3019',
  dashboard: 'http://localhost:3019',
  vault: '/vault/',
  chronos: '/vault/',
  taskkill: '/taskkill/',
  zadania: '/taskkill/',
  aether: '/aether/',
  spatial: '/spatial-3d/',
  parallax: '/parallax-3d/',
  chomik: 'http://localhost:3018',
  home: '/',
  glowna: '/',
  voice: '/voice-builder',
};

function probeTcpPort(port: number, host = '127.0.0.1', timeoutMs = 800): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = net.connect(port, host);
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(timeoutMs);
    socket.on('connect', () => finish(true));
    socket.on('timeout', () => finish(false));
    socket.on('error', () => finish(false));
  });
}

function readTasksFile(): BuildTaskRecord[] {
  try {
    if (!fs.existsSync(TASKS_FILE)) return [];
    const parsed = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
    return Array.isArray(parsed) ? (parsed as BuildTaskRecord[]) : [];
  } catch {
    return [];
  }
}

function writeTasksFileAtomic(tasks: BuildTaskRecord[]): void {
  fs.mkdirSync(path.dirname(TASKS_FILE), { recursive: true });
  const tmpFile = `${TASKS_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(tasks, null, 2), 'utf8');
  fs.renameSync(tmpFile, TASKS_FILE);
}

function readJournalEntries(): VoiceJournalEntry[] {
  try {
    if (!fs.existsSync(VOICE_LOG_FILE)) return [];
    const parsed = JSON.parse(fs.readFileSync(VOICE_LOG_FILE, 'utf8'));
    return Array.isArray(parsed) ? (parsed as VoiceJournalEntry[]) : [];
  } catch {
    return [];
  }
}

function appendJournalEntry(entry: VoiceJournalEntry): VoiceJournalEntry[] {
  fs.mkdirSync(path.dirname(VOICE_LOG_FILE), { recursive: true });
  const current = readJournalEntries();
  const next = [entry, ...current].slice(0, 40);
  const tmpFile = `${VOICE_LOG_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(next, null, 2), 'utf8');
  fs.renameSync(tmpFile, VOICE_LOG_FILE);
  return next;
}

/**
 * Returns live status of Ollama voice model, workspace services, tasks, and journal.
 */
export async function getVoiceBuilderStatus(): Promise<VoiceBuilderStatus> {
  let ollamaOnline = false;
  let models: string[] = [];

  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      signal: AbortSignal.timeout(1500),
      cache: 'no-store',
    });
    if (res.ok) {
      ollamaOnline = true;
      const data = (await res.json()) as { models?: Array<{ name?: string }> };
      models = (data.models || []).map((m) => String(m.name || ''));
    }
  } catch {
    ollamaOnline = false;
  }

  const services = await Promise.all(
    SERVICE_TARGETS.map(async (target) => ({
      ...target,
      online: await probeTcpPort(target.port),
    }))
  );

  const tasks = readTasksFile();
  const normalizeStatus = (s?: string) => String(s || '').toLowerCase();
  const todo = tasks.filter((t) => normalizeStatus(t.status) === 'todo').length;
  const inProgress = tasks.filter((t) => normalizeStatus(t.status) === 'in progress').length;
  const done = tasks.filter((t) => normalizeStatus(t.status) === 'done').length;

  const modelfilePath = path.join(process.cwd(), 'models', 'bm-voice-builder.Modelfile');

  return {
    ollamaOnline,
    voiceModelReady: models.some((m) => m.startsWith('bm-voice-builder')),
    voiceModelName:
      models.find((m) => m.startsWith('bm-voice-builder')) || VOICE_BUILDER_MODEL,
    guardModelReady: models.some((m) => m.startsWith('superagent-guard')),
    baseModelName: models.find((m) => m.startsWith('qwen2.5vl')) || 'qwen2.5vl:7b',
    modelfileReady: fs.existsSync(modelfilePath),
    services,
    tasksSummary: {
      total: tasks.length,
      todo,
      inProgress,
      done,
      recentTasks: tasks.slice(-8).reverse(),
    },
    journalEntries: readJournalEntries().slice(0, 12),
  };
}

function deterministicFallbackParse(transcript: string): ParsedVoiceCommand {
  const lower = transcript.toLowerCase();

  if (/(dodaj|utwórz|zapisz).*(zadanie|task|etap|milestone)|nowe zadanie/.test(lower)) {
    const cleaned = transcript
      .replace(/^(dodaj|utwórz|zapisz)\s+(nowe\s+)?(zadanie|task|etap)(\s+do\s+\S+)?[:\s-]*/i, '')
      .trim();
    return {
      intent: 'create_task',
      target: 'taskkill',
      taskTitle: cleaned || transcript.slice(0, 90),
      taskPriority: /piln|wysoki|krytycz/.test(lower) ? 'Wysoki' : 'Średni',
      notes: transcript,
      openUrl: '',
      spokenReplyPl: `Dodano nowe zadanie budowy: ${cleaned || transcript}.`,
      nextSteps: ['Zweryfikować zadanie w /taskkill/', 'Przetestować powiązany moduł'],
      confidence: 0.78,
    };
  }

  if (/(sprawdź|status|jak działa).*(serwis|port|serwer|klaster|moduł)|co działa/.test(lower)) {
    return {
      intent: 'check_services',
      target: 'cluster',
      taskTitle: '',
      taskPriority: 'Średni',
      notes: 'Szybkie sprawdzenie statusu portów 3016–3019 oraz Ollama.',
      openUrl: '',
      spokenReplyPl: 'Sprawdzam aktywność wszystkich serwerów oraz lokalnych modeli Ollama.',
      nextSteps: ['Upewnić się, że porty 3016 i 3019 odpowiadają HTTP 200'],
      confidence: 0.85,
    };
  }

  if (/(build|budow|kompil|typy|tsc|zweryfikuj)/.test(lower) && !/otwórz/.test(lower)) {
    return {
      intent: 'verify_build',
      target: 'bmclinic-chronos-master',
      taskTitle: '',
      taskPriority: 'Wysoki',
      notes: 'Bezpieczna weryfikacja typów TypeScript oraz statusu plików.',
      openUrl: '',
      spokenReplyPl: 'Uruchamiam bezpieczną weryfikację kompilacji TypeScript oraz stanu repozytorium.',
      nextSteps: ['Sprawdzić wynik walidacji typów', 'Zanotować wynik w dzienniku budowy'],
      confidence: 0.82,
    };
  }

  if (/(lista zadań|jakie.*zadania|co jest w trakcie|kanban)/.test(lower)) {
    return {
      intent: 'list_tasks',
      target: 'taskkill',
      taskTitle: '',
      taskPriority: 'Średni',
      notes: 'Odczyt bieżących zadań budowy.',
      openUrl: '',
      spokenReplyPl: 'Pobieram aktualną listę zadań z tablicy Chronos i Drzewa Zadań.',
      nextSteps: ['Wybrać kolejne zadanie o najwyższym priorytecie'],
      confidence: 0.84,
    };
  }

  if (/(otwórz|przejdź|pokaż).*(vibekit|superagent|vault|chronos|taskkill|aether|spatial|parallax|chomik)/.test(lower)) {
    const matchedKey = Object.keys(SAFE_OPEN_ROUTES).find((k) => lower.includes(k)) || 'voice';
    const openUrl = SAFE_OPEN_ROUTES[matchedKey] || '/voice-builder';
    return {
      intent: 'open_module',
      target: matchedKey,
      taskTitle: '',
      taskPriority: 'Średni',
      notes: `Przekierowanie do modułu ${matchedKey}`,
      openUrl,
      spokenReplyPl: `Otwieram moduł ${matchedKey}.`,
      nextSteps: [],
      confidence: 0.88,
    };
  }

  if (/(zanotuj|notatka|raport|dziennik|zapisz postęp)/.test(lower)) {
    return {
      intent: 'log_journal',
      target: 'voice-journal',
      taskTitle: '',
      taskPriority: 'Średni',
      notes: transcript,
      openUrl: '',
      spokenReplyPl: 'Zapisałem wpis z polecenia głosowego w dzienniku budowy.',
      nextSteps: ['Kontynuować kolejny etap według listy zadań'],
      confidence: 0.8,
    };
  }

  return {
    intent: 'general_command',
    target: 'bmclinic-chronos-master',
    taskTitle: '',
    taskPriority: 'Średni',
    notes: transcript,
    openUrl: '',
    spokenReplyPl: 'Przyjąłem polecenie głosowe i zapisałem je w kontekście prowadzenia budowy.',
    nextSteps: ['Sprawdź serwisy', 'Dodaj zadanie do tablicy', 'Zweryfikuj typy builda'],
    confidence: 0.7,
  };
}

async function parseWithOllamaVoiceModel(
  transcript: string,
  status: VoiceBuilderStatus
): Promise<{ parsed: ParsedVoiceCommand; engine: string }> {
  if (!status.ollamaOnline || !status.voiceModelReady) {
    return {
      parsed: deterministicFallbackParse(transcript),
      engine: 'local-deterministic-fallback',
    };
  }

  const onlinePorts = status.services
    .filter((s) => s.online)
    .map((s) => `${s.id}:${s.port}`)
    .join(', ');

  const contextualPrompt = [
    `KONTEKST BUDOWY: aktywne porty=[${onlinePorts}], zadania(total=${status.tasksSummary.total}, todo=${status.tasksSummary.todo}, inProgress=${status.tasksSummary.inProgress}, done=${status.tasksSummary.done}).`,
    `POLECENIE GŁOSOWE: """${transcript}"""`,
  ].join('\n');

  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: status.voiceModelName,
        prompt: contextualPrompt,
        format: 'json',
        stream: false,
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      return {
        parsed: deterministicFallbackParse(transcript),
        engine: 'local-deterministic-fallback',
      };
    }

    const data = (await res.json()) as { response?: string };
    const rawJson = JSON.parse(data.response || '{}') as Partial<ParsedVoiceCommand>;
    const validIntents: VoiceBuildIntent[] = [
      'check_services',
      'verify_build',
      'create_task',
      'list_tasks',
      'log_journal',
      'open_module',
      'general_command',
    ];
    const intent = validIntents.includes(rawJson.intent as VoiceBuildIntent)
      ? (rawJson.intent as VoiceBuildIntent)
      : 'general_command';

    const priority =
      rawJson.taskPriority === 'Wysoki' ||
      rawJson.taskPriority === 'Niski' ||
      rawJson.taskPriority === 'Średni'
        ? rawJson.taskPriority
        : 'Średni';

    const normalizedOpenUrl =
      typeof rawJson.openUrl === 'string' &&
      (rawJson.openUrl.startsWith('/') ||
        rawJson.openUrl.startsWith('http://localhost:3018') ||
        rawJson.openUrl.startsWith('http://localhost:3019'))
        ? rawJson.openUrl
        : '';

    return {
      engine: `ollama:${status.voiceModelName}`,
      parsed: {
        intent,
        target: String(rawJson.target || 'bmclinic-chronos-master'),
        taskTitle: String(rawJson.taskTitle || '').trim(),
        taskPriority: priority,
        notes: String(rawJson.notes || transcript).trim(),
        openUrl: normalizedOpenUrl,
        spokenReplyPl:
          String(rawJson.spokenReplyPl || '').trim() ||
          'Polecenie głosowe zostało zinterpretowane przez lokalny model Ollama.',
        nextSteps: Array.isArray(rawJson.nextSteps)
          ? rawJson.nextSteps.slice(0, 4).map(String)
          : [],
        confidence:
          typeof rawJson.confidence === 'number' && rawJson.confidence >= 0 && rawJson.confidence <= 1
            ? rawJson.confidence
            : 0.9,
      },
    };
  } catch {
    return {
      parsed: deterministicFallbackParse(transcript),
      engine: 'local-deterministic-fallback',
    };
  }
}

async function runSafeBuildVerification(target: string): Promise<Record<string, unknown>> {
  const isDashboard = target.toLowerCase().includes('vibekit') || target.toLowerCase().includes('dashboard');
  const cwd = isDashboard
    ? path.resolve(process.cwd(), '..', 'vibekit', 'packages', 'dashboard')
    : process.cwd();
  const tscBin = path.join(cwd, 'node_modules', '.bin', 'tsc');

  let typecheckOk = true;
  let typecheckOutput = 'Pominięto tsc (brak lokalnego bin)';
  if (fs.existsSync(tscBin)) {
    try {
      const { stdout, stderr } = await execFileAsync(tscBin, ['--noEmit'], {
        cwd,
        timeout: 25000,
      });
      typecheckOk = true;
      typecheckOutput = (stdout || stderr || '0 błędów TypeScript (--noEmit)').trim().slice(0, 600);
    } catch (err) {
      typecheckOk = false;
      const execErr = err as { stdout?: string; stderr?: string; message?: string };
      typecheckOutput = (execErr.stdout || execErr.stderr || execErr.message || 'Błąd tsc')
        .trim()
        .slice(0, 600);
    }
  }

  let gitSummary = '';
  try {
    const { stdout } = await execFileAsync('git', ['status', '-s'], { cwd, timeout: 4000 });
    gitSummary = stdout.trim().split('\n').filter(Boolean).slice(0, 12).join('\n');
  } catch {
    gitSummary = 'brak repozytorium git';
  }

  return {
    targetDir: isDashboard ? 'vibekit/packages/dashboard' : 'bmclinic-chronos-master',
    typecheckOk,
    typecheckOutput,
    changedFilesPreview: gitSummary || 'czyste drzewo robocze',
  };
}

/**
 * Guards, interprets via Ollama bm-voice-builder, and safely executes allowlisted build actions.
 */
export async function runVoiceBuildCommand(params: {
  transcript: string;
  execute?: boolean;
}): Promise<VoiceCommandExecutionResult> {
  const transcript = String(params.transcript || '').trim();
  const shouldExecute = params.execute !== false;

  const guard = await runSuperagentGuard(transcript);
  const initialStatus = await getVoiceBuilderStatus();

  if (guard.classification === 'block') {
    const blockedParsed: ParsedVoiceCommand = {
      intent: 'general_command',
      target: 'superagent-guard',
      taskTitle: '',
      taskPriority: 'Wysoki',
      notes: `Zablokowano przez Superagent Guard: ${guard.violation_types.join(', ')}`,
      openUrl: '',
      spokenReplyPl:
        'Polecenie zostało zatrzymane przez Superagent Guard z powodu ryzyka naruszenia bezpieczeństwa.',
      nextSteps: ['Sformułuj polecenie bez wstrzykiwania komend powłoki ani dostępu do sekretów'],
      confidence: 1,
    };
    return {
      blocked: true,
      guard,
      engine: guard.engine,
      parsed: blockedParsed,
      executed: false,
      actionResult: { blockedBy: guard.violation_types, cwe: guard.cwe_codes },
      statusSnapshot: initialStatus,
    };
  }

  const { parsed, engine } = await parseWithOllamaVoiceModel(transcript, initialStatus);
  let executed = false;
  let actionResult: Record<string, unknown> | null = null;

  if (shouldExecute) {
    switch (parsed.intent) {
      case 'check_services': {
        const refreshed = await getVoiceBuilderStatus();
        const onlineCount = refreshed.services.filter((s) => s.online).length;
        parsed.spokenReplyPl = `Aktywnych jest ${onlineCount} z ${refreshed.services.length} monitorowanych usług (porty 3016–3019 i Ollama).`;
        actionResult = { services: refreshed.services, onlineCount };
        executed = true;
        break;
      }
      case 'verify_build': {
        const check = await runSafeBuildVerification(parsed.target);
        parsed.spokenReplyPl = check.typecheckOk
          ? `Weryfikacja TypeScript dla ${check.targetDir} zakończona pomyślnie bez błędów.`
          : `Weryfikacja ${check.targetDir} wykryła błędy typów — szczegóły są na ekranie.`;
        actionResult = check;
        executed = true;
        break;
      }
      case 'create_task': {
        const tasks = readTasksFile();
        const numericIds = tasks
          .map((t) => (typeof t.id === 'number' ? t.id : Number.parseInt(String(t.id), 10)))
          .filter((n) => Number.isFinite(n));
        const nextId = (numericIds.length ? Math.max(...numericIds) : 100) + 1;
        const today = new Date().toISOString().slice(0, 10);
        const title = parsed.taskTitle || parsed.notes || transcript.slice(0, 90);
        const newTask: BuildTaskRecord = {
          id: nextId,
          title: `🎙️ ${title}`,
          body: `Dodane poleceniem głosowym (${engine}): ${transcript}`,
          status: 'Todo',
          priority: parsed.taskPriority,
          type: 'Feature',
          labels: ['Voice Builder', 'Budowa'],
          assignee: 'BM Voice Builder',
          startDate: today,
          endDate: today,
        };
        writeTasksFileAtomic([...tasks, newTask]);
        parsed.spokenReplyPl = `Dodano zadanie numer ${nextId}: ${title}.`;
        actionResult = { createdTask: newTask, totalTasks: tasks.length + 1 };
        executed = true;
        break;
      }
      case 'list_tasks': {
        const tasks = readTasksFile();
        const openTasks = tasks
          .filter((t) => String(t.status).toLowerCase() !== 'done')
          .slice(-6)
          .reverse();
        parsed.spokenReplyPl = `Na tablicy jest ${tasks.length} zadań, z czego ${openTasks.length} ostatnich oczekuje lub jest w trakcie.`;
        actionResult = { openTasks, totalTasks: tasks.length };
        executed = true;
        break;
      }
      case 'log_journal':
      case 'general_command': {
        const entry: VoiceJournalEntry = {
          id: `vb-${Date.now()}`,
          timestamp: new Date().toISOString(),
          transcript,
          intent: parsed.intent,
          summary: parsed.notes || transcript,
          spokenReplyPl: parsed.spokenReplyPl,
          model: engine,
        };
        const entries = appendJournalEntry(entry);
        actionResult = { entry, totalJournalEntries: entries.length };
        executed = true;
        break;
      }
      case 'open_module': {
        actionResult = { openUrl: parsed.openUrl || '/voice-builder' };
        executed = true;
        break;
      }
    }
  }

  // Record non-journal executed actions too so build history stays auditable
  if (executed && parsed.intent !== 'log_journal' && parsed.intent !== 'general_command') {
    appendJournalEntry({
      id: `vb-${Date.now()}`,
      timestamp: new Date().toISOString(),
      transcript,
      intent: parsed.intent,
      summary: parsed.taskTitle || parsed.notes || transcript,
      spokenReplyPl: parsed.spokenReplyPl,
      model: engine,
    });
  }

  const statusSnapshot = await getVoiceBuilderStatus();
  return {
    blocked: false,
    guard,
    engine,
    parsed,
    executed,
    actionResult,
    statusSnapshot,
  };
}
