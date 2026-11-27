import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { inspectSuperagentRules } from '@/lib/superagentEdgeGuard';

const AUTH_SECRET =
  process.env.NEXTAUTH_SECRET || 'bmclinics-live-cms-secret-2026-mlasers0110';

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

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/lekarz') ||
    pathname.startsWith('/pacjent')
  ) {
    const token = await getToken({ req, secret: AUTH_SECRET });

    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/logowanie', req.url));
    }
    if (
      pathname.startsWith('/lekarz') &&
      !['DOCTOR', 'ADMIN'].includes(token?.role as string)
    ) {
      return NextResponse.redirect(new URL('/logowanie', req.url));
    }
    if (pathname.startsWith('/pacjent') && !token) {
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
