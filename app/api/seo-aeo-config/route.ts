import { NextRequest, NextResponse } from 'next/server';
import { getSeoAeoConfigPayload, updateSeoAeoConfig } from '@/lib/holdingSecurity';
import { assertSuperagentSafePayload } from '@/lib/superagentEngine';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getSeoAeoConfigPayload());
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const safety = assertSuperagentSafePayload(body);
  if (!safety.allowed) {
    return NextResponse.json(
      { error: safety.verdict.reasoning, cwe_codes: safety.verdict.cwe_codes },
      { status: 403 }
    );
  }
  const config = updateSeoAeoConfig(body);
  return NextResponse.json({ ok: true, config });
}
