import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { inspectSuperagentRules } from '@/lib/superagentEdgeGuard';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Global Superagent Edge inspection on URL/query (skip Superagent's own test endpoint)
  if (!pathname.startsWith('/api/superagent/')) {
    let inspectTarget = pathname + req.nextUrl.search;
    try {
      inspectTarget = decodeURIComponent(inspectTarget);
    } catch {
      // Keep raw string if malformed
    }
    const edgeGuard = inspectSuperagentRules(inspectTarget);
    if (edgeGuard.classification === 'block') {
      return NextResponse.json(
        {
          error: 'Żądanie zablokowane przez Superagent System Guard.',
          classification: edgeGuard.classification,
          violation_types: edgeGuard.violation_types,
          cwe_codes: edgeGuard.cwe_codes,
        },
        {
          status: 403,
          headers: { 'X-Superagent-Guard': 'blocked' },
        }
      );
    }
  }

  const panelRoles: Record<string, string[]> = {
    admin: ['ADMIN'],
    lekarz: ['DOCTOR', 'ADMIN'],
    pacjent: ['PATIENT'],
  };
  const allowedRoles = panelRoles[pathname.split('/')[1]];
  if (Array.isArray(allowedRoles)) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = secret ? await getToken({ req, secret }) : null;
    if (!token?.userId || !token.role || !allowedRoles.includes(token.role)) {
      return NextResponse.redirect(new URL('/logowanie', req.url));
    }
  }

  const res = NextResponse.next();
  res.headers.set('X-Superagent-Guard', 'active; edge+node');
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
