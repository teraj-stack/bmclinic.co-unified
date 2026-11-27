import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import {
  inspectSuperagentRules,
  redactSuperagentPiiLocal,
} from '@/lib/superagentEdgeGuard';

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
  systemCoverage: string[];
}

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
    systemCoverage: [
      'chronos-vault-module/server.ts (Express Body Guard)',
      'chronos-vault-module/src/server/securityHardening.ts (HTTP Gateway)',
      'middleware.ts (Next.js Edge Global Matcher)',
      'app/api/agent-llm/chat/route.ts',
      'app/api/voice-builder/command/route.ts',
      'app/api/booking/route.ts',
      'app/api/kontakt/route.ts',
      'app/api/cms/route.ts',
      'app/api/seo-aeo-config/route.ts',
      'app/api/shop/inventory/route.ts',
      'app/api/payments/checkout/route.ts',
      'app/api/design-studio/projects/route.ts',
      'app/api/design-studio/drivers/route.ts',
    ],
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

  const localGuard = inspectSuperagentRules(text);

  if (localGuard.classification === 'block') {
    return {
      classification: 'block',
      violation_types: localGuard.violation_types,
      cwe_codes: localGuard.cwe_codes,
      reasoning: localGuard.reasoning,
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

/**
 * Synchronous deterministic Superagent payload check for backend system/API routes.
 */
export function assertSuperagentSafePayload(payload: unknown): {
  allowed: boolean;
  verdict: ReturnType<typeof inspectSuperagentRules>;
} {
  let serialized = '';
  try {
    serialized = typeof payload === 'string' ? payload : JSON.stringify(payload ?? '');
  } catch {
    serialized = String(payload ?? '');
  }
  const verdict = inspectSuperagentRules(serialized.slice(0, 64_000));
  return {
    allowed: verdict.classification === 'pass',
    verdict,
  };
}

export async function runSuperagentRedact(input: string): Promise<SuperagentRedactResult> {
  const text = String(input || '');
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

  const localRedacted = redactSuperagentPiiLocal(text);

  return {
    redacted: localRedacted.redacted,
    findings: localRedacted.findings,
    count: localRedacted.count,
    engine: 'safety-agent-local-rodo-redactor',
    sdkVersion: status.version,
  };
}
