import { NextResponse } from 'next/server';
import { warmupAgentLlm } from '@/lib/agentLlmEngine';

export async function POST() {
  try {
    const result = await warmupAgentLlm();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd ładowania modelu w VRAM' },
      { status: 500 }
    );
  }
}
