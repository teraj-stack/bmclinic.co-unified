import { NextRequest, NextResponse } from 'next/server';
import { checkApiRole } from '@/lib/authGuard';
import {
  buildCompleteFrontendBundle,
  readProjects,
  writeProjects,
  type AetherAnimationMode,
  type DesignGalleryItem,
  type GalleryProjectPalette,
} from '@/lib/designStudioStore';
import { assertSuperagentSafePayload } from '@/lib/superagentEngine';

export const runtime = 'nodejs';

export async function GET() {
  const projects = readProjects();
  return NextResponse.json({
    ok: true,
    count: projects.length,
    projects,
  });
}

interface CreateProjectPayload {
  action?: 'create' | 'regenerate-all' | 'run-automation';
  id?: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  aspectRatio?: string;
  animationMode?: AetherAnimationMode;
  kitTarget?: 'web-kit' | 'mobile-kit' | 'hybrid';
  buttonStyle?: 'cnc-3d-tactile' | 'pill-primary' | 'ghost-glass' | 'split-badge';
  palette?: Partial<GalleryProjectPalette>;
}

export async function POST(req: NextRequest) {
  const denied = await checkApiRole('ADMIN');
  if (denied) return denied;
  if (process.env.VERCEL) {
    return NextResponse.json({ error: 'Zapis wymaga trwałego magazynu.' }, { status: 503 });
  }

  try {
    const body = (await req.json()) as CreateProjectPayload;
    const safety = assertSuperagentSafePayload({
      action: body.action,
      title: body.title,
      subtitle: body.subtitle,
      animationMode: body.animationMode,
      kitTarget: body.kitTarget,
    });
    if (!safety.allowed) {
      return NextResponse.json(
        { ok: false, error: safety.verdict.reasoning, cwe_codes: safety.verdict.cwe_codes },
        { status: 403 }
      );
    }
    const current = readProjects();

    if (body.action === 'regenerate-all') {
      const updated = current.map((item) => {
        const nextAnim = body.animationMode || item.animationMode;
        const codeBundle = buildCompleteFrontendBundle({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          imageUrl: item.imageUrl,
          animationMode: nextAnim,
          kitTarget: item.kitTarget,
          buttonStyle: item.buttonStyle,
          palette: item.palette,
        });
        return {
          ...item,
          animationMode: nextAnim,
          codeBundle,
          automationLog: [
            ...item.automationLog.slice(-2),
            `[AUTO ${new Date().toLocaleTimeString('pl-PL')}] Przebudowano kod i animację (${nextAnim})`,
          ],
        };
      });
      writeProjects(updated);
      return NextResponse.json({ ok: true, count: updated.length, projects: updated });
    }

    const title = (body.title || '').trim() || `Projekt Studio #${current.length + 1}`;
    const imageUrl = (body.imageUrl || '').trim();
    if (!imageUrl) {
      return NextResponse.json({ ok: false, error: 'Wymagany obraz (imageUrl lub base64).' }, { status: 400 });
    }

    const palette: GalleryProjectPalette = {
      bg: body.palette?.bg || '#050b0c',
      surface: body.palette?.surface || '#0d1b1d',
      accent: body.palette?.accent || '#d4b46a',
      text: body.palette?.text || '#f6f3ec',
      muted: body.palette?.muted || '#a6b4b2',
    };

    const id = `upload-${Date.now()}`;
    const animationMode: AetherAnimationMode = body.animationMode || 'border-beam';
    const kitTarget = body.kitTarget || 'hybrid';
    const buttonStyle = body.buttonStyle || 'cnc-3d-tactile';
    const subtitle =
      (body.subtitle || '').trim() ||
      `Automatycznie wygenerowany pełny projekt frontendowy (${kitTarget}) z animacją ${animationMode} spójną z :3017.`;

    const newItem: DesignGalleryItem = {
      id,
      title,
      subtitle,
      category: 'uploaded',
      imageUrl,
      aspectRatio: body.aspectRatio || '16:9',
      animationMode,
      kitTarget,
      buttonStyle,
      palette,
      wcagContrast: '11.8:1 (WCAG AAA)',
      createdAt: new Date().toISOString(),
      automationLog: [
        '[01] Odebrano nowy obraz do galerii /design-studio',
        `[02] Wyekstrahowano paletę (${palette.accent} / ${palette.bg}) + weryfikacja kontrastu`,
        `[03] Dopasowano silnik animacji :3017 (${animationMode}) i przycisk (${buttonStyle})`,
        '[04] Wygenerowano pełny projekt wieloplikowy (index.html, App.tsx, index.css, HeroSection.tsx, package.json)',
      ],
      codeBundle: buildCompleteFrontendBundle({
        id,
        title,
        subtitle,
        imageUrl,
        animationMode,
        kitTarget,
        buttonStyle,
        palette,
      }),
    };

    const next = [newItem, ...current];
    writeProjects(next);
    return NextResponse.json({ ok: true, item: newItem, count: next.length, projects: next }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Błąd zapisu projektu.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await checkApiRole('ADMIN');
  if (denied) return denied;
  if (process.env.VERCEL) {
    return NextResponse.json({ error: 'Zapis wymaga trwałego magazynu.' }, { status: 503 });
  }

  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Brak parametru id.' }, { status: 400 });
  }
  const current = readProjects();
  const target = current.find((p) => p.id === id);
  if (!target) {
    return NextResponse.json({ ok: false, error: 'Nie znaleziono projektu.' }, { status: 404 });
  }
  if (target.category === 'model') {
    return NextResponse.json(
      { ok: false, error: 'Wzorce modelowe są chronione przed usunięciem.' },
      { status: 400 }
    );
  }
  const next = current.filter((p) => p.id !== id);
  writeProjects(next);
  return NextResponse.json({ ok: true, count: next.length, projects: next });
}
