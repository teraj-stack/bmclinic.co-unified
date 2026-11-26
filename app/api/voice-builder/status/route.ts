import { NextResponse } from 'next/server';
import { getVoiceBuilderStatus } from '@/lib/voiceBuilderEngine';

export async function GET() {
  try {
    const status = await getVoiceBuilderStatus();
    return NextResponse.json(status);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd statusu Voice Builder' },
      { status: 500 }
    );
  }
}
