import { NextResponse } from 'next/server';
import { getCodeAnalyzePayload } from '@/lib/holdingSecurity';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getCodeAnalyzePayload());
}
