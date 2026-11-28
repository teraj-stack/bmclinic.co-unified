import { checkApiRole } from '@/lib/authGuard';
import { NextResponse } from 'next/server';
import { runProjectAntivirusScan, sampleSystemTelemetry } from '@/lib/holdingSecurity';

export const dynamic = 'force-dynamic';

export async function POST() {
  const denied = await checkApiRole('ADMIN');
  if (denied) return denied;

  const [scan, telemetry] = await Promise.all([
    runProjectAntivirusScan(),
    sampleSystemTelemetry(100),
  ]);
  return NextResponse.json({
    ok: true,
    bridgeStatus: 'connected',
    scan,
    telemetry,
  });
}
