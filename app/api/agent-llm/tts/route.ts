import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import crypto from 'crypto';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { NextRequest, NextResponse } from 'next/server';

const execFileAsync = promisify(execFile);

const ALLOWED_VOICES = new Set([
  'Zosia (Enhanced)',
  'Ewa (Premium)',
  'Ewa (Enhanced)',
  'Krzysztof (Enhanced)',
  'Zosia',
  'Ewa',
  'Krzysztof',
]);

function stripMarkdownForSpeech(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, ' kod źródłowy ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[*_#>|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1200);
}

export async function POST(req: NextRequest) {
  const uid = crypto.randomUUID();
  const aiffPath = path.join(os.tmpdir(), `bm-tts-${uid}.aiff`);
  const wavPath = path.join(os.tmpdir(), `bm-tts-${uid}.wav`);

  try {
    const body = (await req.json().catch(() => ({}))) as {
      text?: string;
      voice?: string;
    };

    const cleanText = stripMarkdownForSpeech(String(body?.text || ''));
    if (!cleanText) {
      return NextResponse.json({ error: 'Brak tekstu do syntezy mowy.' }, { status: 400 });
    }

    const requestedVoice = String(body?.voice || 'Zosia (Enhanced)');
    const primaryVoice = ALLOWED_VOICES.has(requestedVoice)
      ? requestedVoice
      : 'Zosia (Enhanced)';

    try {
      await execFileAsync('/usr/bin/say', ['-v', primaryVoice, '-r', '185', '-o', aiffPath, cleanText], {
        timeout: 15000,
      });
    } catch {
      await execFileAsync('/usr/bin/say', ['-v', 'Zosia', '-r', '185', '-o', aiffPath, cleanText], {
        timeout: 15000,
      });
    }

    await execFileAsync(
      '/usr/bin/afconvert',
      ['-f', 'WAVE', '-d', 'LEI16@22050', aiffPath, wavPath],
      { timeout: 10000 }
    );

    const wavBuffer = await fs.readFile(wavPath);
    return new NextResponse(new Uint8Array(wavBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': String(wavBuffer.byteLength),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd syntezy TTS macOS' },
      { status: 500 }
    );
  } finally {
    await Promise.allSettled([fs.unlink(aiffPath), fs.unlink(wavPath)]);
  }
}
