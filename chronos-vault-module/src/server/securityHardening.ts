import type { Request, Response, NextFunction } from 'express';
import { inspectSuperagentRules } from '../../../lib/superagentEdgeGuard';

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 180;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

/**
 * Production HTTP security hardening middleware for Chronos Vault (Express).
 * Protects against MIME sniffing, clickjacking, referrer leaks, stack fingerprinting,
 * malformed/oversized URLs, path traversal attempts, and enforces Superagent HTTP Guard.
 */
export function securityHardeningMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader(
    'Permissions-Policy',
    'camera=(self), microphone=(self), geolocation=(), payment=()'
  );
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('X-Superagent-Guard', 'active; express-gateway');

  const rawUrl = req.originalUrl || '';
  if (rawUrl.length > 4096) {
    res.status(414).json({ error: 'Request URI too long.' });
    return;
  }

  let decodedUrl = '';
  try {
    decodedUrl = decodeURIComponent(rawUrl);
  } catch {
    res.status(400).json({ error: 'Malformed URL encoding.' });
    return;
  }

  // Block path traversal (including encoded variants) and null-byte injection
  if (
    decodedUrl.includes('..') ||
    decodedUrl.includes('\0') ||
    rawUrl.toLowerCase().includes('%2e%2e')
  ) {
    res.status(400).json({ error: 'Invalid request path.' });
    return;
  }

  if (!req.path.startsWith('/api/superagent/')) {
    const verdict = inspectSuperagentRules(decodedUrl);
    if (verdict.classification === 'block') {
      res.setHeader('X-Superagent-Guard', 'blocked');
      res.status(403).json({
        error: 'Blocked by Superagent Gateway Guard',
        violation_types: verdict.violation_types,
        cwe_codes: verdict.cwe_codes,
      });
      return;
    }
  }

  if (process.env.NODE_ENV === 'production' && req.secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
}

/**
 * Superagent JSON payload guard executed after express.json() for Chronos Vault routes.
 */
export function superagentBodyGuardMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (req.path.startsWith('/api/superagent/') || !req.body || typeof req.body !== 'object') {
    next();
    return;
  }
  try {
    const serialized = JSON.stringify(req.body);
    if (serialized.length > 200_000) {
      next();
      return;
    }
    const verdict = inspectSuperagentRules(serialized);
    if (verdict.classification === 'block') {
      res.setHeader('X-Superagent-Guard', 'blocked');
      res.status(403).json({
        error: 'Payload zablokowany przez Superagent Body Guard.',
        violation_types: verdict.violation_types,
        cwe_codes: verdict.cwe_codes,
      });
      return;
    }
  } catch {
    // Ignore non-serializable payloads
  }
  next();
}

/**
 * Lightweight in-memory sliding-window rate limiter for /api/* routes.
 */
export function apiRateLimitMiddleware(req: Request, res: Response, next: NextFunction): void {
  const now = Date.now();
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const entry = rateBuckets.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    res.setHeader('X-RateLimit-Limit', String(RATE_MAX_REQUESTS));
    res.setHeader('X-RateLimit-Remaining', String(RATE_MAX_REQUESTS - 1));
  } else {
    entry.count += 1;
    const remaining = Math.max(0, RATE_MAX_REQUESTS - entry.count);
    res.setHeader('X-RateLimit-Limit', String(RATE_MAX_REQUESTS));
    res.setHeader('X-RateLimit-Remaining', String(remaining));
    if (entry.count > RATE_MAX_REQUESTS) {
      const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
      res.setHeader('Retry-After', String(retryAfter));
      res.status(429).json({ error: 'Too many API requests. Please retry shortly.' });
      return;
    }
  }

  // Opportunistic cleanup to keep memory bounded
  if (rateBuckets.size > 1000) {
    for (const [key, bucket] of rateBuckets) {
      if (now >= bucket.resetAt) rateBuckets.delete(key);
    }
  }

  next();
}
