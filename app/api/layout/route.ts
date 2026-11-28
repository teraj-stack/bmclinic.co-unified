import { NextRequest, NextResponse } from 'next/server';
import { getTaskkillSnapshot, snapshotHeaders, taskkillSnapshotAvailable } from '@/lib/taskkillSnapshot';

export function GET(req: NextRequest) {
  const snapshot = taskkillSnapshotAvailable() && getTaskkillSnapshot(req.nextUrl.searchParams.get('map'));
  if (!snapshot) return new NextResponse(null, { status: 404 });
  return NextResponse.json(snapshot.layout, { headers: snapshotHeaders });
}
