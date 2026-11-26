import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export interface SuperagentGuardResult {
  classification: 'pass' | 'block';
  violation_types: string[];
  cwe_codes: string[];
  reasoning: string;
  engine: string;
  sdkVersion: string;
}

export interface SuperagentRedactResult {
  redacted: string;
  findings: string[];
  count: number;
  engine: string;
  sdkVersion: string;
}

export interface SuperagentStatusInfo {
  installed: boolean;
  package: string;
  version: string;
  mcpReady: boolean;
  cliReady: boolean;
  docsUrl: string;
  hasRemoteProviderKey: boolean;
  ollamaReady: boolean;
  ollamaModel: string | null;
  modelfileReady: boolean;
}

const GUARD_RULES: Array<{
  pattern: RegExp;
  label: string;
  cwe: string;
}> = [
  {
    pattern: /(ignore (?:all )?previous instructions|system prompt|you are now|bypass safety|jailbreak|dan mode)/i,
    label: 'prompt_injection',
    cwe: 'CWE-74',
  },
  {
    pattern: /(\brm\s+-rf\b|\bchmod\s+777\b|curl\s+.*\|\s*(?:sh|bash)|eval\s*\(|exec\s*\(|child_process)/i,
    label: 'malicious_code_execution',
    cwe: 'CWE-78',
  },
  {
    pattern: /(NtSuspendProcess|HWND_TOPMOST|SetWindowsHookEx|VirtualAllocEx|pkill\s+-f|fsutil\s+file\s+setZeroData)/i,
    label: 'system_tampering_or_overlay',
    cwe: 'CWE-250',
  },
  {
    pattern: /(process\.env|GEMINI_API_KEY|NEXTAUTH_SECRET|-----BEGIN (?:RSA|EC|PRIVATE) KEY-----)/i,
    label: 'secret_exfiltration',
    cwe: 'CWE-200',
  },
  {
    pattern: /(<script\b|javascript:|onerror\s*=|UNION\s+SELECT|DROP\s+TABLE)/i,
    label: 'injection_xss_sqli',
    cwe: 'CWE-89',
  },
];

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';

async function detectLocalOllamaGuardModel(): Promise<string | null> {
  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(900),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { models?: Array<{ name?: string }> };
    const names = (data.models || []).map((m) => String(m.name || ''));
    const preferred = [
      'superagent-guard-1.7b',
      'superagent-guard-1.7b:latest',
      'superagent-guard-local',
      'superagent-guard-local:latest',
    ];
    for (const candidate of preferred) {
      if (names.includes(candidate)) return candidate;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getSuperagentStatus(): Promise<SuperagentStatusInfo> {
  const sdkPkgPath = path.join(process.cwd(), 'superagent-sdk', 'package.json');
  let sdkVersion = '0.1.8-rc1';
  let sdkInstalled = false;
  if (fs.existsSync(sdkPkgPath)) {
    sdkInstalled = true;
    try {
      const parsed = JSON.parse(fs.readFileSync(sdkPkgPath, 'utf-8'));
      if (parsed?.version) sdkVersion = String(parsed.version);
    } catch {
      // Keep default version
    }
  }

  const mcpDistExists = fs.existsSync(
    path.join(process.cwd(), 'superagent-mcp', 'dist', 'index.js')
  );
  const cliDistExists = fs.existsSync(
    '/Users/krzysztofjarzyna/Documents/<<<<<<<<>>>>>>>/scratch/superagent/cli/dist/index.js'
  );
  const modelfileReady =
    fs.existsSync(path.join(process.cwd(), 'models', 'superagent-guard-1.7b.Modelfile')) ||
    fs.existsSync(path.join(process.cwd(), 'models', 'superagent-guard-local.Modelfile'));
  const ollamaModel = await detectLocalOllamaGuardModel();

  return {
    installed: sdkInstalled,
    package: 'safety-agent',
    version: sdkVersion,
    mcpReady: mcpDistExists,
    cliReady: cliDistExists,
    docsUrl: 'http://localhost:3012',
    hasRemoteProviderKey: Boolean(
      process.env.OPENAI_API_KEY ||
        process.env.ANTHROPIC_API_KEY ||
        process.env.SUPERAGENT_API_KEY ||
        process.env.GOOGLE_GENERATIVE_AI_API_KEY
    ),
    ollamaReady: Boolean(ollamaModel),
    ollamaModel,
    modelfileReady,
  };
}

interface RemoteGuardResponse {
  classification?: string;
  violation_types?: string[];
  cwe_codes?: string[];
  reasoning?: string;
}

interface RemoteRedactResponse {
  redacted?: string;
  findings?: string[];
}

interface SuperagentSdkClient {
  guard: (opts: { input: string }) => Promise<RemoteGuardResponse>;
  redact: (opts: { input: string }) => Promise<RemoteRedactResponse>;
}

interface SuperagentSdkModule {
  createClient?: () => SuperagentSdkClient;
}

async function loadSuperagentSdk(): Promise<SuperagentSdkModule | null> {
  const sdkEntry = path.join(process.cwd(), 'superagent-sdk', 'dist', 'index.js');
  if (!fs.existsSync(sdkEntry)) return null;
  const dynamicImport = new Function('u', 'return import(u)') as (
    u: string
  ) => Promise<SuperagentSdkModule>;
  return dynamicImport(pathToFileURL(sdkEntry).href);
}

async function runOllamaGuardClassifier(
  modelName: string,
  text: string,
  sdkVersion: string
): Promise<SuperagentGuardResult | null> {
  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: modelName,
        prompt: text,
        format: 'json',
        stream: false,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { response?: string };
    const parsed = JSON.parse(data.response || '{}') as {
      classification?: string;
      violation_types?: string[];
      cwe_codes?: string[];
      cwe_code?: string[];
    };
    const cls = String(parsed.classification || '').toLowerCase() === 'block' ? 'block' : 'pass';
    const violations = Array.isArray(parsed.violation_types)
      ? parsed.violation_types.map(String)
      : [];
    const cwes = Array.isArray(parsed.cwe_codes)
      ? parsed.cwe_codes.map(String)
      : Array.isArray(parsed.cwe_code)
        ? parsed.cwe_code.map(String)
        : [];
    return {
      classification: cls,
      violation_types: violations,
      cwe_codes: cwes,
      reasoning:
        cls === 'block'
          ? `Lokalny model Ollama (${modelName}) sklasyfikował treść jako blokowaną (${violations.join(', ') || 'policy_violation'}).`
          : `Lokalny model Ollama (${modelName}) sklasyfikował treść jako bezpieczną (pass).`,
      engine: `ollama:${modelName}`,
      sdkVersion,
    };
  } catch {
    return null;
  }
}

export async function runSuperagentGuard(input: string): Promise<SuperagentGuardResult> {
  const text = String(input || '').trim();
  const status = await getSuperagentStatus();

  if (status.hasRemoteProviderKey) {
    try {
      const sdkModule = await loadSuperagentSdk();
      if (typeof sdkModule?.createClient === 'function') {
        const client = sdkModule.createClient();
        const remote = await client.guard({ input: text });
        return {
          classification: remote.classification === 'block' ? 'block' : 'pass',
          violation_types: Array.isArray(remote.violation_types) ? remote.violation_types : [],
          cwe_codes: Array.isArray(remote.cwe_codes) ? remote.cwe_codes : [],
          reasoning: remote.reasoning || 'Zweryfikowano przez Superagent SDK.',
          engine: 'safety-agent-sdk-remote',
          sdkVersion: status.version,
        };
      }
    } catch {
      // Fall back to deterministic rule engine + Ollama
    }
  }

  const violations: string[] = [];
  const cwes: string[] = [];
  for (const rule of GUARD_RULES) {
    if (rule.pattern.test(text)) {
      violations.push(rule.label);
      cwes.push(rule.cwe);
    }
  }

  if (violations.length > 0) {
    return {
      classification: 'block',
      violation_types: Array.from(new Set(violations)),
      cwe_codes: Array.from(new Set(cwes)),
      reasoning: `Wykryto potencjalne naruszenia bezpieczeństwa: ${violations.join(', ')}.`,
      engine: 'safety-agent-local-rules',
      sdkVersion: status.version,
    };
  }

  if (status.ollamaReady && status.ollamaModel) {
    const llmResult = await runOllamaGuardClassifier(status.ollamaModel, text, status.version);
    if (llmResult) return llmResult;
  }

  return {
    classification: 'pass',
    violation_types: [],
    cwe_codes: [],
    reasoning: 'Brak wykrytych wstrzyknięć promptów, wycieków sekretów ani niebezpiecznych instrukcji.',
    engine: 'safety-agent-local-rules',
    sdkVersion: status.version,
  };
}

export async function runSuperagentRedact(input: string): Promise<SuperagentRedactResult> {
  let text = String(input || '');
  const status = await getSuperagentStatus();

  if (status.hasRemoteProviderKey) {
    try {
      const sdkModule = await loadSuperagentSdk();
      if (typeof sdkModule?.createClient === 'function') {
        const client = sdkModule.createClient();
        const remote = await client.redact({ input: text });
        return {
          redacted: String(remote.redacted || text),
          findings: Array.isArray(remote.findings) ? remote.findings : [],
          count: Array.isArray(remote.findings) ? remote.findings.length : 0,
          engine: 'safety-agent-sdk-remote',
          sdkVersion: status.version,
        };
      }
    } catch {
      // Fall back cleanly to local deterministic PII/PHI redaction
    }
  }

  const findings: string[] = [];
  const patterns: Array<{ label: string; regex: RegExp; replacement: string }> = [
    {
      label: 'EMAIL',
      regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
      replacement: '[REDACTED_EMAIL]',
    },
    {
      label: 'PESEL',
      regex: /\b\d{11}\b/g,
      replacement: '[REDACTED_PESEL]',
    },
    {
      label: 'PHONE',
      regex: /(?:\+48[\s-]?)?\b\d{3}[\s-]?\d{3}[\s-]?\d{3}\b/g,
      replacement: '[REDACTED_PHONE]',
    },
    {
      label: 'API_KEY',
      regex: /\b(?:sk-[A-Za-z0-9_-]{16,}|gho_[A-Za-z0-9]{16,}|ghp_[A-Za-z0-9]{16,}|AIza[0-9A-Za-z_-]{20,})\b/g,
      replacement: '[REDACTED_SECRET]',
    },
  ];

  for (const p of patterns) {
    const matches = text.match(p.regex);
    if (matches && matches.length > 0) {
      findings.push(...matches.map((m) => `${p.label}: ${m.slice(0, 4)}***`));
      text = text.replace(p.regex, p.replacement);
    }
  }

  return {
    redacted: text,
    findings,
    count: findings.length,
    engine: 'safety-agent-local-rodo-redactor',
    sdkVersion: status.version,
  };
}
