import { NextResponse } from 'next/server';
import { getSuperagentStatus } from '@/lib/superagentEngine';

export async function GET() {
  return NextResponse.json(await getSuperagentStatus());
}
