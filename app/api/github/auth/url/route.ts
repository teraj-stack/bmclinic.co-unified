import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const configured = Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);
  const origin = req.nextUrl.searchParams.get('origin') || req.nextUrl.origin;
  if (!configured) {
    return NextResponse.json(
      {
        code: 'MISSING_GITHUB_OAUTH_ENV',
        error: 'Brak skonfigurowanych kluczy GITHUB_CLIENT_ID i GITHUB_CLIENT_SECRET w środowisku.',
        redirectUri: `${origin}/auth/callback`,
      },
      { status: 400 }
    );
  }
  return NextResponse.json({ ok: true, redirectUri: `${origin}/auth/callback` });
}
