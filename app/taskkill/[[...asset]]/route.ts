import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';
import { snapshotHeaders, taskkillSnapshotAvailable } from '@/lib/taskkillSnapshot';

const assetTypes = new Map([
  ['index.html', 'text/html; charset=utf-8'],
  ['styles.css', 'text/css; charset=utf-8'],
  ['data.js', 'text/javascript; charset=utf-8'],
  ['app.js', 'text/javascript; charset=utf-8'],
  ['00.png', 'image/png'],
  ['mindmap-bg.jpg', 'image/jpeg'],
]);

export async function GET(req: NextRequest, context: { params: Promise<{ asset?: string[] }> }) {
  if (!taskkillSnapshotAvailable()) return new NextResponse(null, { status: 404 });
  const { asset } = await context.params;
  if (!asset?.length) {
    const url = req.nextUrl.clone();
    url.pathname = '/taskkill/index.html';
    return NextResponse.redirect(url);
  }

  const filename = asset[0];
  const type = assetTypes.get(filename);
  if (asset.length !== 1 || !type) return new NextResponse(null, { status: 404 });

  try {
    const bytes = await readFile(path.join(process.cwd(), 'taskkill-assets', filename));
    const body = filename === 'index.html'
      ? bytes.toString('utf8')
        .replace('<html ', '<html data-taskkill-snapshot="true" ')
        .replace('teraj-stack · Live Sync + GitHub Mirror', 'Podgląd danych z repozytorium · zmiany tylko w tej przeglądarce')
      : Uint8Array.from(bytes);
    return new NextResponse(body, {
      headers: { ...snapshotHeaders, 'Content-Type': type },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
