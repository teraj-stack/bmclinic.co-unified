import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/authGuard';
import { getAuthUrl } from '@/lib/googleCalendar';

export async function GET(req: NextRequest) {
  const session = await requireRole('DOCTOR').catch(() => null);
  if (!session) {
    return NextResponse.json({ error: 'Brak uprawnień.' }, { status: 403 });
  }
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.NEXT_PUBLIC_BASE_URL || !process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Integracja kalendarza jest niedostępna.' }, { status: 503 });
  }

  const state = randomBytes(32).toString('hex');
  const response = NextResponse.redirect(getAuthUrl(state));
  response.cookies.set('bmclinic-google-calendar-state', `${state}:${session.user.id}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: req.nextUrl.protocol === 'https:',
    path: '/api/auth/google/callback',
    maxAge: 600,
  });
  return response;
}
