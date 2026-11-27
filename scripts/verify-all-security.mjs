#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const PROJECT_ROOT = path.resolve(path.dirname(SCRIPT_PATH), '..');
const MANIFEST_PATH = path.join(PROJECT_ROOT, 'config', 'file-integrity.sha256.json');
const VERIFY_ONLY = process.argv.includes('--verify');

const SCAN_DIRS = [
  'app',
  'components',
  'lib',
  'chronos-vault-module',
  'taskkill-assets/mindmaps',
  'scripts',
  'config',
];

const IGNORE_NAMES = new Set([
  'node_modules',
  '.next',
  '.git',
  'mindmaps-backups',
  'file-integrity.sha256.json',
]);

const CODE_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.css', '.swift']);

const SECRET_PATTERNS = [
  { name: 'Google API Key', regex: /\bAIza[0-9A-Za-z_-]{25,}\b/g },
  { name: 'GitHub Token', regex: /\b(?:ghp|gho|ghu|ghs)_[A-Za-z0-9]{20,}\b/g },
  { name: 'OpenAI Key', regex: /\bsk-[A-Za-z0-9_-]{24,}\b/g },
  { name: 'Private Key Block', regex: /-----BEGIN (?:RSA|EC|PRIVATE|OPENSSH) KEY-----/g },
];

const UNSAFE_CODE_PATTERNS = [
  { name: 'Dynamic eval()', regex: /\beval\s*\(/g },
  { name: 'new Function()', regex: /\bnew\s+Function\s*\(/g },
];

function walkFiles(dirPath, collected = []) {
  if (!fs.existsSync(dirPath)) return collected;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_NAMES.has(entry.name)) continue;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, collected);
    } else if (entry.isFile() && CODE_EXTS.has(path.extname(entry.name))) {
      collected.push(fullPath);
    }
  }
  return collected;
}

const files = [];
for (const dir of SCAN_DIRS) {
  walkFiles(path.join(PROJECT_ROOT, dir), files);
}
for (const rootFile of [
  'server-master.ts',
  'package.json',
  'next.config.ts',
  'taskkill-assets/app.js',
  'taskkill-assets/index.html',
  'taskkill-assets/tasks.json',
  'public/bm-unified-shell.js',
]) {
  const abs = path.join(PROJECT_ROOT, rootFile);
  if (fs.existsSync(abs)) files.push(abs);
}

const uniqueFiles = Array.from(new Set(files)).sort();
const issues = [];
const hashes = {};

if (uniqueFiles.length < 50) {
  issues.push(`Too few files scanned (${uniqueFiles.length}); check PROJECT_ROOT path resolution.`);
}

for (const absPath of uniqueFiles) {
  const relPath = path.relative(PROJECT_ROOT, absPath);
  const isLiveMutableData =
    relPath.endsWith('.layout.json') ||
    relPath.endsWith('.tasks.json') ||
    relPath === 'taskkill-assets/tasks.json';

  const buf = fs.readFileSync(absPath);
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  const stat = fs.statSync(absPath);
  if (!isLiveMutableData) {
    hashes[relPath] = { sha256, bytes: stat.size, mode: (stat.mode & 0o777).toString(8) };
  }

  const text = buf.toString('utf8');

  if (relPath.endsWith('.json')) {
    try {
      const parsed = JSON.parse(text);
      if (relPath === 'taskkill-assets/tasks.json' && (!Array.isArray(parsed) || parsed.length < 50)) {
        issues.push(`${relPath}: unexpected low task count (${Array.isArray(parsed) ? parsed.length : 'not array'})`);
      }
      if (relPath === 'taskkill-assets/mindmaps/scalenie-3016.tasks.json' && (!Array.isArray(parsed) || parsed.length < 30)) {
        issues.push(`${relPath}: unexpected low node count (${Array.isArray(parsed) ? parsed.length : 'not array'})`);
      }
    } catch (err) {
      issues.push(`${relPath}: invalid JSON (${err.message})`);
    }
  }

  // Allow verify-all-security.mjs, superagentEdgeGuard.ts, and documented security-scanner demo/defender files
  const isDetectorFile =
    relPath.includes('verify-all-security.mjs') ||
    relPath.includes('superagentEdgeGuard.ts') ||
    relPath.includes('superagent-audit') ||
    relPath.endsWith('AIWorkOptimizerAndMalwareView.tsx') ||
    relPath.endsWith('offlineStandaloneEnvironment.ts') ||
    relPath.endsWith('ultraFreezeLinksEngine.ts');

  const isFirebasePublicWebConfig = relPath.endsWith('firebase-applet-config.json');

  if (!isDetectorFile) {
    for (const pat of SECRET_PATTERNS) {
      if (isFirebasePublicWebConfig && pat.name === 'Google API Key') continue;
      if (pat.regex.test(text)) {
        issues.push(`${relPath}: potential ${pat.name} secret detected`);
      }
    }
    for (const pat of UNSAFE_CODE_PATTERNS) {
      if (relPath === 'lib/superagentEngine.ts' && pat.name === 'new Function()') continue;
      if (pat.regex.test(text)) {
        issues.push(`${relPath}: unsafe pattern (${pat.name})`);
      }
    }
  }

  // Flag world-writable permissions
  if ((stat.mode & 0o002) !== 0) {
    issues.push(`${relPath}: insecure world-writable permissions (${(stat.mode & 0o777).toString(8)})`);
  }
}

if (VERIFY_ONLY) {
  if (!fs.existsSync(MANIFEST_PATH)) {
    issues.push(`Missing manifest: ${path.relative(PROJECT_ROOT, MANIFEST_PATH)}`);
  } else {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    for (const [relPath, entry] of Object.entries(manifest.files || {})) {
      if (
        relPath.endsWith('.layout.json') ||
        relPath.endsWith('.tasks.json') ||
        relPath === 'taskkill-assets/tasks.json'
      ) {
        continue;
      }
      if (!hashes[relPath]) {
        issues.push(`${relPath}: tracked file missing`);
      } else if (hashes[relPath].sha256 !== entry.sha256) {
        issues.push(`${relPath}: SHA-256 checksum mismatch`);
      }
    }
  }
} else {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  const payload = {
    generatedAt: new Date().toISOString(),
    totalFiles: uniqueFiles.length,
    algorithm: 'sha256',
    files: hashes,
  };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(payload, null, 2) + '\n', { mode: 0o644 });
}

if (issues.length > 0) {
  console.error('❌ Security & Integrity Audit FAILED:');
  for (const issue of issues) console.error(' -', issue);
  process.exit(1);
}

console.log(`✅ Security & Integrity Audit PASSED (${uniqueFiles.length} files verified, SHA-256 manifest ${VERIFY_ONLY ? 'matched' : 'updated'})`);
