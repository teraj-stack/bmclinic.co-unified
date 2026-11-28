import { checkApiRole } from '@/lib/authGuard';
import { NextResponse } from 'next/server';
import { getRecentScansPayload } from '@/lib/holdingSecurity';

export const dynamic = 'force-dynamic';

export async function GET() {
  const denied = await checkApiRole('ADMIN');
  if (denied) return denied;

  return NextResponse.json(getRecentScansPayload());
}
