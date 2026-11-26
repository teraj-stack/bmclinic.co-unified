import { NextResponse } from 'next/server';
import {
  getLastFileScan,
  runProjectAntivirusScan,
  sampleSystemTelemetry,
} from '@/lib/holdingSecurity';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [telemetry, scan] = await Promise.all([
    sampleSystemTelemetry(120),
    getLastFileScan() ? Promise.resolve(getLastFileScan()) : runProjectAntivirusScan(),
  ]);

  return NextResponse.json({
    ok: true,
    telemetry,
    scan,
  });
}

export async function POST() {
  const scan = await runProjectAntivirusScan();
  const telemetry = await sampleSystemTelemetry(100);

  return NextResponse.json({
    ok: true,
    telemetry,
    scan,
  });
}
