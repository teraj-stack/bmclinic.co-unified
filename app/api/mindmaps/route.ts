import { NextResponse } from 'next/server';
import { listTaskkillSnapshots, snapshotHeaders, taskkillSnapshotAvailable } from '@/lib/taskkillSnapshot';
import { readSharedTaskkillSection, taskkillSharedConfigured } from '@/lib/taskkillSharedStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!taskkillSnapshotAvailable()) return new NextResponse(null, { status: 404 });
  try {
    const maps = await listTaskkillSnapshots();
    if (taskkillSharedConfigured()) {
      await Promise.all(maps.map(async (map) => {
        const stored = await readSharedTaskkillSection(map.id, 'tasks');
        if (Array.isArray(stored?.payload)) map.taskCount = stored.payload.length;
      }));
    }
    return NextResponse.json({ maps }, { headers: snapshotHeaders });
  } catch {
    return NextResponse.json({ error: 'Lista map jest chwilowo niedostępna.' }, {
      status: 503, headers: snapshotHeaders,
    });
  }
}
