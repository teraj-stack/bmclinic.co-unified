import { NextRequest, NextResponse } from 'next/server';
import { runSuperagentRedact } from '@/lib/superagentEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = typeof body?.input === 'string' ? body.input : '';
    if (!input.trim()) {
      return NextResponse.json({ error: 'Podaj treść do anonimizacji PII/RODO.' }, { status: 400 });
    }
    const result = await runSuperagentRedact(input);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd Superagent Redact' },
      { status: 500 }
    );
  }
}
