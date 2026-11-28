import { NextResponse } from 'next/server';
import { listTaskkillSnapshots, snapshotHeaders, taskkillSnapshotAvailable } from '@/lib/taskkillSnapshot';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!taskkillSnapshotAvailable()) return new NextResponse(null, { status: 404 });
  return NextResponse.json({ maps: await listTaskkillSnapshots() }, { headers: snapshotHeaders });
}
