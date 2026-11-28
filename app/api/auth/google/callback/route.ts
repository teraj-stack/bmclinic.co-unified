import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/authGuard';
import { exchangeCodeForTokens } from '@/lib/googleCalendar';
import { getDoctorByUserId, saveDoctorRefreshTokenEncrypted } from '@/lib/doctors';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  const cookie = req.cookies.get('bmclinic-google-calendar-state')?.value;
  const session = await requireRole('DOCTOR').catch(() => null);
  const destination = new URL('/lekarz/kalendarz', process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin);

  try {
    if (!code || !state || !session || cookie !== `${state}:${session.user.id}`) {
      throw new Error('Nieprawidłowa sesja łączenia kalendarza.');
    }
    const doctor = await getDoctorByUserId(session.user.id);
    const tokens = await exchangeCodeForTokens(code);
    if (!tokens.refresh_token) throw new Error('Brak zgody na dostęp do kalendarza.');
    await saveDoctorRefreshTokenEncrypted(doctor.id, tokens.refresh_token);
    destination.searchParams.set('connected', '1');
  } catch {
    destination.searchParams.set('error', '1');
  }

  const response = NextResponse.redirect(destination);
  response.cookies.set('bmclinic-google-calendar-state', '', {
    path: '/api/auth/google/callback',
    maxAge: 0,
  });
  return response;
}
