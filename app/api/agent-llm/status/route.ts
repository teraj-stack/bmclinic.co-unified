import { NextResponse } from 'next/server';
import { getAgentLlmStatus } from '@/lib/agentLlmEngine';

export async function GET() {
  try {
    const status = await getAgentLlmStatus();
    return NextResponse.json(status);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd statusu Agent LLM' },
      { status: 500 }
    );
  }
}
