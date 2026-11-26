import { NextRequest, NextResponse } from 'next/server';
import { getSeoAeoConfigPayload, updateSeoAeoConfig } from '@/lib/holdingSecurity';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getSeoAeoConfigPayload());
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const config = updateSeoAeoConfig(body);
  return NextResponse.json({ ok: true, config });
}
