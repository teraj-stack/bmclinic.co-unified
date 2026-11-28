import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { registerTransaction } from '@/lib/payments';
import { createPendingOrder } from '@/lib/orders';
import { assertSuperagentSafePayload } from '@/lib/superagentEngine';

export async function POST(req: NextRequest) {
  const { items, email } = (await req.json().catch(() => null)) ?? {};

  const safety = assertSuperagentSafePayload({ items, email });
  if (!safety.allowed) {
    return NextResponse.json(
      { error: safety.verdict.reasoning, cwe_codes: safety.verdict.cwe_codes },
      { status: 403 }
    );
  }

  if (!Array.isArray(items) || items.length === 0 || items.length > 50 ||
      !items.every((item) => item && typeof item.serviceId === 'string' && item.serviceId.trim() &&
        Number.isSafeInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99) ||
      typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'Nieprawidłowe dane zamówienia' }, { status: 400 });
  }

  const sessionId = randomUUID();

  const isPreview = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview';
  if (process.env.DATABASE_URL && process.env.P24_MERCHANT_ID && process.env.P24_POS_ID &&
      process.env.P24_API_KEY && process.env.P24_CRC && process.env.NEXT_PUBLIC_BASE_URL &&
      (!isPreview || process.env.P24_SANDBOX === 'true')) {
    try {
      const order = await createPendingOrder({ sessionId, items, email: email.trim().toLowerCase() });

      const { paymentUrl } = await registerTransaction({
        sessionId,
        amountGrosze: order.amountGrosze,
        description: `Zamówienie ${order.items.length} usług — BM Clinics`,
        email: order.customerEmail,
      });

      return NextResponse.json({ paymentUrl });
    } catch {
      return NextResponse.json({ error: 'Nie udało się utworzyć płatności' }, { status: 502 });
    }
  }

  if (!isPreview) {
    return NextResponse.json({ error: 'Płatności są niedostępne.' }, { status: 503 });
  }

  return NextResponse.json({
    paymentUrl: `/sklep/podsumowanie?sessionId=${sessionId}&demo=1`,
    demo: true,
  });
}
