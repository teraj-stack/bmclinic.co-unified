import { NextRequest, NextResponse } from 'next/server';
import { recordUrlScan } from '@/lib/holdingSecurity';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const payload = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  recordUrlScan({
    scanId: String(payload.scanId || `wh_${Date.now()}`),
    url: String(payload.url || 'webhook'),
    scannedAt: new Date().toISOString(),
    status: String(payload.status || 'clean'),
    source: 'webhook',
  });
  return NextResponse.json({ ok: true, receivedAt: new Date().toISOString() });
}
