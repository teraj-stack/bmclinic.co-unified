import { NextRequest, NextResponse } from 'next/server';
import {
  addInventoryProduct,
  deleteInventoryProduct,
  getShopInventory,
  resetInventoryProducts,
  summarizeInventory,
  updateInventoryProduct,
  type ShopCategory,
  type ShopInventoryProduct,
} from '@/lib/shopInventoryStore';

export async function GET() {
  const products = getShopInventory();
  return NextResponse.json({
    products,
    summary: summarizeInventory(products),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      action?: string;
      name?: string;
      sku?: string;
      category?: ShopCategory;
      price?: number;
      originalPrice?: number;
      stock?: number;
      description?: string;
      medicalNote?: string;
      badge?: string;
      requiresConsultation?: boolean;
    };

    if (body?.action === 'reset') {
      const products = resetInventoryProducts();
      return NextResponse.json({ products, summary: summarizeInventory(products) });
    }

    if (!body?.name?.trim()) {
      return NextResponse.json({ error: 'Podaj nazwę produktu lub usługi.' }, { status: 400 });
    }

    const products = addInventoryProduct({
      name: body.name.trim(),
      sku: String(body.sku || ''),
      category: body.category || 'post_op',
      price: Number(body.price || 0),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      stock: Number(body.stock ?? 10),
      description: String(body.description || ''),
      medicalNote: String(body.medicalNote || ''),
      badge: body.badge ? String(body.badge) : undefined,
      requiresConsultation: Boolean(body.requiresConsultation),
    });
    return NextResponse.json({ products, summary: summarizeInventory(products) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd zapisu magazynu' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ShopInventoryProduct>;
    if (!body?.id) {
      return NextResponse.json({ error: 'Brak identyfikatora produktu (id).' }, { status: 400 });
    }
    const products = updateInventoryProduct({ ...body, id: body.id });
    return NextResponse.json({ products, summary: summarizeInventory(products) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd aktualizacji magazynu' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id') || '';
    if (!id.trim()) {
      return NextResponse.json({ error: 'Brak parametru id.' }, { status: 400 });
    }
    const products = deleteInventoryProduct(id);
    return NextResponse.json({ products, summary: summarizeInventory(products) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Błąd usuwania produktu' },
      { status: 500 }
    );
  }
}
