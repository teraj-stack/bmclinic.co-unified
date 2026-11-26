import fs from 'fs';
import path from 'path';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
export const AGENT_LLM_MODEL = 'agy-operator:latest';
export const AGENT_LLM_KEEP_ALIVE = '30m';

export interface AgentChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AgentLlmStatus {
  ollamaOnline: boolean;
  modelReady: boolean;
  modelName: string;
  warmInMemory: boolean;
  vramBytes: number;
  expiresAt: string | null;
  modelfileReady: boolean;
  tuning: {
    numCtx: number;
    numPredict: number;
    numThread: number;
    temperature: number;
    keepAlive: string;
  };
}

export interface FastGuardCheck {
  classification: 'pass' | 'block';
  violations: string[];
  latencyMs: number;
}

export interface CommunicationComplianceReport {
  hasEndingProtocol: boolean;
  endingTag: 'bez odbioru' | 'odbiór' | 'brak';
  noFillerOpener: boolean;
  conciseLength: boolean;
  charCount: number;
  guardPassed: boolean;
  scorePercent: number;
}

const FAST_INJECTION_RULES: Array<{ label: string; pattern: RegExp }> = [
  {
    label: 'prompt_injection',
    pattern: /ignore\s+(all\s+)?(previous|prior|above)\s+instructions|override\s+system|jailbreak/i,
  },
  {
    label: 'system_prompt_extraction',
    pattern: /(reveal|print|show|expose|dump|wyświetl|pokaż).{0,40}(system\s*prompt|hidden\s*instructions|developer\s*message)/i,
  },
  {
    label: 'secret_exfiltration',
    pattern: /(process\.env|api[_-]?key|secret|credentials|password|token).{0,40}(exfiltrate|steal|send|wyślij|wydrukuj|ukradnij)/i,
  },
  {
    label: 'destructive_shell',
    pattern: /rm\s+-rf\s+\/|<script\b|document\.cookie/i,
  },
];

/**
 * Zero-latency deterministic guard check (<1ms) to avoid GPU model swap overhead on streaming turns.
 */
export function runFastGuardCheck(input: string): FastGuardCheck {
  const start = performance.now();
  const text = String(input || '').trim();
  const violations: string[] = [];

  for (const rule of FAST_INJECTION_RULES) {
    if (rule.pattern.test(text)) {
      violations.push(rule.label);
    }
  }

  return {
    classification: violations.length > 0 ? 'block' : 'pass',
    violations,
    latencyMs: Math.max(0.1, Number((performance.now() - start).toFixed(2))),
  };
}

/**
 * Checks response adherence to strict communication rules.
 */
export function evaluateCommunicationCompliance(
  replyText: string,
  guardPassed: boolean
): CommunicationComplianceReport {
  const trimmed = replyText.trim();
  const normalized = trimmed.toLowerCase();

  let endingTag: 'bez odbioru' | 'odbiór' | 'brak' = 'brak';
  if (/bez odbioru[.!?]*$/i.test(trimmed)) {
    endingTag = 'bez odbioru';
  } else if (/odbiór[.!?]*$/i.test(trimmed)) {
    endingTag = 'odbiór';
  }

  const hasEndingProtocol = endingTag !== 'brak';
  const noFillerOpener = !/^(oczywiście|jasne|z przyjemnością|chętnie pomogę|pewnie)[!.,:\s]/i.test(
    normalized
  );
  const conciseLength = trimmed.length > 0 && trimmed.length <= 1400;

  const passedCount = [hasEndingProtocol, noFillerOpener, conciseLength, guardPassed].filter(
    Boolean
  ).length;

  return {
    hasEndingProtocol,
    endingTag,
    noFillerOpener,
    conciseLength,
    charCount: trimmed.length,
    guardPassed,
    scorePercent: Math.round((passedCount / 4) * 100),
  };
}

/**
 * Returns live status and VRAM residency of agy-operator:latest in Ollama.
 */
export async function getAgentLlmStatus(): Promise<AgentLlmStatus> {
  let ollamaOnline = false;
  let modelReady = false;
  let modelName = AGENT_LLM_MODEL;
  let warmInMemory = false;
  let vramBytes = 0;
  let expiresAt: string | null = null;

  try {
    const [tagsRes, psRes] = await Promise.all([
      fetch(`${OLLAMA_BASE_URL}/api/tags`, { signal: AbortSignal.timeout(1500), cache: 'no-store' }),
      fetch(`${OLLAMA_BASE_URL}/api/ps`, { signal: AbortSignal.timeout(1500), cache: 'no-store' }),
    ]);

    if (tagsRes.ok) {
      ollamaOnline = true;
      const tagsData = (await tagsRes.json()) as { models?: Array<{ name?: string }> };
      const found = (tagsData.models || []).find((m) =>
        String(m.name || '').startsWith('agy-operator')
      );
      if (found?.name) {
        modelReady = true;
        modelName = found.name;
      }
    }

    if (psRes.ok) {
      const psData = (await psRes.json()) as {
        models?: Array<{ name?: string; size_vram?: number; expires_at?: string }>;
      };
      const loaded = (psData.models || []).find((m) =>
        String(m.name || '').startsWith('agy-operator')
      );
      if (loaded) {
        warmInMemory = true;
        vramBytes = Number(loaded.size_vram || 0);
        expiresAt = loaded.expires_at ? String(loaded.expires_at) : null;
      }
    }
  } catch {
    ollamaOnline = false;
  }

  const modelfilePath = path.join(process.cwd(), 'models', 'agy-operator.Modelfile');

  return {
    ollamaOnline,
    modelReady,
    modelName,
    warmInMemory,
    vramBytes,
    expiresAt,
    modelfileReady: fs.existsSync(modelfilePath),
    tuning: {
      numCtx: 4096,
      numPredict: 384,
      numThread: 8,
      temperature: 0.1,
      keepAlive: AGENT_LLM_KEEP_ALIVE,
    },
  };
}

/**
 * Preloads agy-operator:latest into Metal RAM so subsequent requests achieve sub-second TTFT.
 */
export async function warmupAgentLlm(): Promise<{
  ok: boolean;
  loadDurationMs: number;
  status: AgentLlmStatus;
}> {
  const start = performance.now();
  const res = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: AGENT_LLM_MODEL,
      prompt: '',
      keep_alive: AGENT_LLM_KEEP_ALIVE,
      stream: false,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) {
    throw new Error(`Ollama warmup failed: HTTP ${res.status}`);
  }

  const payload = (await res.json()) as { load_duration?: number };
  const loadDurationMs = payload.load_duration
    ? Math.round(payload.load_duration / 1e6)
    : Math.round(performance.now() - start);
  const status = await getAgentLlmStatus();
  return { ok: true, loadDurationMs, status };
}

export async function openOllamaChatStream(messages: AgentChatMessage[]): Promise<Response> {
  const sanitized = messages
    .slice(-8)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.trim() }));

  return fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: AGENT_LLM_MODEL,
      messages: sanitized,
      stream: true,
      keep_alive: AGENT_LLM_KEEP_ALIVE,
    }),
    signal: AbortSignal.timeout(45000),
  });
}
