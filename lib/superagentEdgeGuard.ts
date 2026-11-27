export interface SuperagentEdgeGuardResult {
  classification: 'pass' | 'block';
  violation_types: string[];
  cwe_codes: string[];
  reasoning: string;
}

export const SUPERAGENT_GUARD_RULES: Array<{
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

export const SUPERAGENT_PII_PATTERNS: Array<{
  label: string;
  regex: RegExp;
  replacement: string;
}> = [
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

export function inspectSuperagentRules(input: string): SuperagentEdgeGuardResult {
  const text = String(input || '').trim();
  if (!text) {
    return {
      classification: 'pass',
      violation_types: [],
      cwe_codes: [],
      reasoning: 'Brak wykrytych naruszeń.',
    };
  }

  const violations: string[] = [];
  const cwes: string[] = [];
  for (const rule of SUPERAGENT_GUARD_RULES) {
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
      reasoning: `Superagent zablokował potencjalne naruszenie: ${Array.from(new Set(violations)).join(', ')}.`,
    };
  }

  return {
    classification: 'pass',
    violation_types: [],
    cwe_codes: [],
    reasoning: 'Brak wykrytych wstrzyknięć promptów, wycieków sekretów ani niebezpiecznych instrukcji.',
  };
}

export function redactSuperagentPiiLocal(input: string): {
  redacted: string;
  findings: string[];
  count: number;
} {
  let text = String(input || '');
  const findings: string[] = [];
  for (const p of SUPERAGENT_PII_PATTERNS) {
    const matches = text.match(p.regex);
    if (matches && matches.length > 0) {
      findings.push(...matches.map((m) => `${p.label}: ${m.slice(0, 4)}***`));
      text = text.replace(p.regex, p.replacement);
    }
  }
  return { redacted: text, findings, count: findings.length };
}
