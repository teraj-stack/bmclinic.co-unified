import { NextRequest, NextResponse } from 'next/server';
import { runVoiceBuildCommand } from '@/lib/voiceBuilderEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const transcript = typeof body?.transcript === 'string' ? body.transcript : '';
    const execute = body?.execute !== false;

    if (!transcript.trim()) {
      return NextResponse.json(
        { error: 'Podaj treść polecenia głosowego (transcript).' },
        { status: 400 }
      );
    }

    const result = await runVoiceBuildCommand({ transcript, execute });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd wykonania polecenia głosowego' },
      { status: 500 }
    );
  }
}
