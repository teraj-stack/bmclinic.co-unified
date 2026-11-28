import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { checkApiRole } from '@/lib/authGuard';
import {
  getCmsState,
  saveCmsState,
  getDefaultCmsState,
  updateCmsSiteConfig,
  updateCmsInlineOverrides,
  resetCmsInlineOverrides,
  upsertCmsService,
  removeCmsService,
  type CmsSiteConfig,
  type CmsState,
} from '@/lib/cmsStore';
import type { CatalogService } from '@/lib/servicesCatalog';
import { assertSuperagentSafePayload } from '@/lib/superagentEngine';

export const dynamic = 'force-dynamic';

async function checkCmsAccess(req: NextRequest) {
  const token = process.env.BMCLINICS_CMS_TOKEN;
  if (token) {
    const expected = Buffer.from(`Bearer ${token}`);
    const provided = Buffer.from(req.headers.get('authorization') ?? '');
    if (expected.length === provided.length && timingSafeEqual(expected, provided)) return null;
  }
  return checkApiRole('ADMIN');
}

export async function GET(req: NextRequest) {
  const denied = await checkCmsAccess(req);
  const state = getCmsState();
  const { siteConfig, inlineOverrides, services, updatedAt } = state;
  return NextResponse.json(denied ? { siteConfig, inlineOverrides, services, updatedAt } : state, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(req: NextRequest) {
  const denied = await checkCmsAccess(req);
  if (denied) return denied;
  if (process.env.VERCEL) {
    return NextResponse.json({ error: 'Zapis CMS wymaga trwałego magazynu.' }, { status: 503 });
  }

  try {
    const body = await req.json();
    const safety = assertSuperagentSafePayload(body);
    if (!safety.allowed) {
      return NextResponse.json(
        { error: safety.verdict.reasoning, cwe_codes: safety.verdict.cwe_codes },
        { status: 403 }
      );
    }
    const action = body?.action as string | undefined;

    let nextState: CmsState;

    switch (action) {
      case 'updateSiteConfig': {
        const patch = (body.siteConfig ?? {}) as Partial<CmsSiteConfig>;
        nextState = updateCmsSiteConfig(patch);
        break;
      }
      case 'updateInlineOverrides': {
        const overrides = (body.inlineOverrides ?? {}) as Record<string, string>;
        nextState = updateCmsInlineOverrides(overrides);
        break;
      }
      case 'resetInlineOverrides': {
        nextState = resetCmsInlineOverrides();
        break;
      }
      case 'upsertService': {
        const svc = body.service as CatalogService;
        if (!svc || !svc.name || !svc.slug) {
          return NextResponse.json(
            { error: 'Wymagane pola usługi: name, slug' },
            { status: 400 }
          );
        }
        nextState = upsertCmsService({
          id: svc.id || `srv-${svc.slug}`,
          slug: svc.slug,
          categorySlug: svc.categorySlug || 'proktologia',
          name: svc.name,
          priceGrosze: Number(svc.priceGrosze) || 25000,
          durationMin: Number(svc.durationMin) || 30,
          seoSummary: svc.seoSummary || svc.name,
          fullDescription: svc.fullDescription || svc.seoSummary || svc.name,
        });
        break;
      }
      case 'deleteService': {
        const id = String(body.id || '');
        nextState = removeCmsService(id);
        break;
      }
      case 'resetAll': {
        nextState = saveCmsState(getDefaultCmsState());
        break;
      }
      case 'importState': {
        const current = getCmsState();
        nextState = saveCmsState({
          ...current,
          ...(body.state ?? {}),
        });
        break;
      }
      default: {
        // Allow direct partial state update
        const current = getCmsState();
        nextState = saveCmsState({
          ...current,
          ...(body.siteConfig ? { siteConfig: { ...current.siteConfig, ...body.siteConfig } } : {}),
          ...(body.inlineOverrides
            ? { inlineOverrides: { ...current.inlineOverrides, ...body.inlineOverrides } }
            : {}),
          ...(Array.isArray(body.services) ? { services: body.services } : {}),
        });
      }
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/cennik');
      revalidatePath('/sklep');
      revalidatePath('/admin');
      revalidatePath('/admin/uslugi');
    } catch {
      // ignore revalidate errors in edge contexts
    }

    return NextResponse.json({ ok: true, state: nextState });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd zapisu CMS' },
      { status: 500 }
    );
  }
}
