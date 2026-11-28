import { PrismaClient, type Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getTaskkillSnapshot, snapshotHeaders, taskkillSnapshotAvailable } from './taskkillSnapshot';

type MapSection = 'tasks' | 'layout';
type StoredSection = { payload: Prisma.JsonValue; revision: number };

let client: PrismaClient | undefined;
let initialization: Promise<void> | undefined;

function databaseUrl() {
  return process.env.TASKKILL_POSTGRES_PRISMA_URL ?? process.env.TASKKILL_DATABASE_URL;
}

export function taskkillSharedConfigured() {
  return Boolean(databaseUrl());
}

async function database() {
  const datasourceUrl = databaseUrl();
  if (!datasourceUrl) throw new Error('TaskKill database is unavailable.');
  client ??= new PrismaClient({ datasourceUrl });
  const connection = client;
  initialization ??= connection.$transaction(async (transaction) => {
    await transaction.$queryRaw`SELECT pg_advisory_xact_lock(71203921)::text`;
    await transaction.$executeRaw`
      CREATE TABLE IF NOT EXISTS taskkill_workspace_state (
        map_id text NOT NULL,
        section text NOT NULL,
        payload jsonb NOT NULL,
        revision integer NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT NOW(),
        PRIMARY KEY (map_id, section)
      )
    `;
  }).catch((error: unknown) => {
    initialization = undefined;
    throw error;
  });
  await initialization;
  return connection;
}

function replyError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: snapshotHeaders });
}

function revisionHeaders(revision: number) {
  return { ...snapshotHeaders, ETag: `"${revision}"` };
}

export async function readSharedTaskkillSection(mapId: string, section: MapSection) {
  const db = await database();
  const [record] = await db.$queryRaw<StoredSection[]>`
    SELECT payload, revision FROM taskkill_workspace_state
    WHERE map_id = ${mapId} AND section = ${section}
  `;
  return record;
}

export async function serveTaskkillSection(req: NextRequest, section: MapSection) {
  if (!taskkillSnapshotAvailable()) return new NextResponse(null, { status: 404 });
  const id = req.nextUrl.searchParams.get('map') || 'bmclinic';
  const seed = getTaskkillSnapshot(id);
  if (!seed) return new NextResponse(null, { status: 404 });

  if (req.method !== 'POST') {
    if (!taskkillSharedConfigured()) {
      return NextResponse.json(seed[section], { headers: snapshotHeaders });
    }
    try {
      const record = await readSharedTaskkillSection(id, section);
      return NextResponse.json(record?.payload ?? seed[section], {
        headers: revisionHeaders(record?.revision ?? 0),
      });
    } catch {
      return replyError('Wspólny zapis jest chwilowo niedostępny.', 503);
    }
  }

  if (!taskkillSharedConfigured()) return replyError('Wspólny zapis nie jest podłączony.', 503);
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (!origin || !host || !/^https?:\/\//.test(origin) ||
      origin.replace(/^https?:\/\//, '') !== host) {
    return replyError('Zapis wymaga otwarcia tablicy na tym samym adresie.', 403);
  }

  const match = /^"(\d+)"$/.exec(req.headers.get('if-match') ?? '');
  const revision = match ? Number(match[1]) : NaN;
  if (!Number.isSafeInteger(revision) || revision >= 2_147_483_647) {
    return replyError('Odśwież dane przed zapisem.', 428);
  }

  const body = await req.text();
  if (Buffer.byteLength(body) > (section === 'tasks' ? 750_000 : 2_750_000)) {
    return replyError('Rozmiar danych przekracza limit tablicy.', 413);
  }
  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return replyError('Nieprawidłowe dane tablicy.', 400);
  }
  if (section === 'tasks') {
    if (!Array.isArray(input) || input.length > 2500 ||
        !input.every((task) => task && (typeof task.id === 'number' || typeof task.id === 'string') &&
          typeof task.title === 'string') ||
        new Set(input.map((task) => String(task.id))).size !== input.length) {
      return replyError('Nieprawidłowa lista zadań.', 400);
    }
  } else if (!input || typeof input !== 'object' || Array.isArray(input) || !('positions' in input)) {
    return replyError('Nieprawidłowy układ mapy.', 400);
  }

  try {
    const db = await database();
    const count = revision === 0
      ? await db.$executeRaw`
        INSERT INTO taskkill_workspace_state (map_id, section, payload, revision)
        VALUES (${id}, ${section}, ${body}::jsonb, 1)
        ON CONFLICT (map_id, section) DO NOTHING
      `
      : await db.$executeRaw`
        UPDATE taskkill_workspace_state
        SET payload = ${body}::jsonb, revision = revision + 1, updated_at = NOW()
        WHERE map_id = ${id} AND section = ${section} AND revision = ${revision}
      `;
    if (!count) return replyError('Inna osoba zapisała nowszą wersję mapy.', 412);
    return NextResponse.json({ ok: true }, { headers: revisionHeaders(revision + 1) });
  } catch {
    return replyError('Wspólny zapis jest chwilowo niedostępny.', 503);
  }
}
