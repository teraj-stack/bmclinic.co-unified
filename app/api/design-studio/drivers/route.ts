import { NextRequest, NextResponse } from 'next/server';
import { checkApiRole } from '@/lib/authGuard';
import { readDrivers, writeDrivers, type DriverPackageEntry } from '@/lib/designStudioStore';
import { assertSuperagentSafePayload } from '@/lib/superagentEngine';

export const runtime = 'nodejs';

async function probeAetherAndOllama() {
  let aetherLive = false;
  let aetherCalibration: Record<string, unknown> | null = null;
  let ollamaModels: string[] = [];

  try {
    const res = await fetch('http://127.0.0.1:3017/api/driver-calibration', {
      signal: AbortSignal.timeout(2200),
    });
    if (res.ok) {
      aetherLive = true;
      aetherCalibration = (await res.json()) as Record<string, unknown>;
    }
  } catch {
    aetherLive = false;
  }

  try {
    const res = await fetch('http://127.0.0.1:11434/api/tags', {
      signal: AbortSignal.timeout(2200),
    });
    if (res.ok) {
      const data = (await res.json()) as { models?: Array<{ name?: string }> };
      ollamaModels = (data.models || []).map((m) => m.name || '').filter(Boolean);
    }
  } catch {
    ollamaModels = [];
  }

  return { aetherLive, aetherCalibration, ollamaModels };
}

export async function GET() {
  const drivers = readDrivers();
  const telemetry = await probeAetherAndOllama();
  return NextResponse.json({
    ok: true,
    count: drivers.length,
    drivers,
    telemetry,
  });
}

interface DriversPostPayload {
  action?: 'sync-all' | 'upload-driver';
  driver?: Partial<DriverPackageEntry>;
}

export async function POST(req: NextRequest) {
  const denied = await checkApiRole('ADMIN');
  if (denied) return denied;
  if (process.env.VERCEL) {
    return NextResponse.json({ error: 'Zapis wymaga trwałego magazynu.' }, { status: 503 });
  }

  try {
    const body = (await req.json()) as DriversPostPayload;
    const safety = assertSuperagentSafePayload(body);
    if (!safety.allowed) {
      return NextResponse.json(
        { ok: false, error: safety.verdict.reasoning, cwe_codes: safety.verdict.cwe_codes },
        { status: 403 }
      );
    }
    const current = readDrivers();
    const now = new Date().toISOString();
    const telemetry = await probeAetherAndOllama();

    if (body.action === 'upload-driver' && body.driver?.name) {
      const entry: DriverPackageEntry = {
        id: body.driver.id || `drv-custom-${Date.now()}`,
        name: body.driver.name,
        category: body.driver.category || 'haptic-3017',
        version: body.driver.version || '1.0.0',
        latestVersion: body.driver.latestVersion || body.driver.version || '1.0.0',
        status: 'installed',
        source: body.driver.source || 'Wgrany profil JSON użytkownika',
        capabilities: Array.isArray(body.driver.capabilities)
          ? body.driver.capabilities
          : ['Custom Studio Driver Profile'],
        updatedAt: now,
      };
      const next = [entry, ...current.filter((d) => d.id !== entry.id)];
      writeDrivers(next);
      return NextResponse.json({ ok: true, count: next.length, drivers: next, telemetry });
    }

    const updated: DriverPackageEntry[] = current.map((d) => {
      if (d.id === 'drv-ollama-metal' && telemetry.ollamaModels.length > 0) {
        return {
          ...d,
          status: 'synced-3017',
          capabilities: telemetry.ollamaModels,
          updatedAt: now,
        };
      }
      return {
        ...d,
        status: telemetry.aetherLive && d.category === 'haptic-3017' ? 'synced-3017' : 'installed',
        version: d.latestVersion,
        updatedAt: now,
      };
    });

    writeDrivers(updated);
    return NextResponse.json({
      ok: true,
      syncedAt: now,
      count: updated.length,
      drivers: updated,
      telemetry,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Błąd synchronizacji sterowników.' },
      { status: 500 }
    );
  }
}
