import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { recordUrlScan } from '@/lib/holdingSecurity';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const token = process.env.BMCLINICS_SCAN_WEBHOOK_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Integracja skanera jest niedostępna.' }, { status: 503 });
  }
  const expected = Buffer.from(`Bearer ${token}`);
  const provided = Buffer.from(req.headers.get('authorization') ?? '');
  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
    return NextResponse.json({ error: 'Brak uprawnień.' }, { status: 401 });
  }

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
