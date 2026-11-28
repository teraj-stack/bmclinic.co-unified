import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSign, verifyTransaction, type WebhookPayload } from '@/lib/payments';
import { markOrderAsPaid } from '@/lib/orders';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  if (!process.env.DATABASE_URL || !process.env.P24_CRC ||
      !process.env.P24_MERCHANT_ID || !process.env.P24_POS_ID || !process.env.P24_API_KEY ||
      (process.env.VERCEL_ENV === 'preview' && process.env.P24_SANDBOX !== 'true')) {
    return NextResponse.json({ error: 'Płatności są niedostępne.' }, { status: 503 });
  }
  const payload = (await req.json().catch(() => null)) as WebhookPayload | null;
  if (!payload || typeof payload.sessionId !== 'string' || typeof payload.sign !== 'string' ||
      !Number.isSafeInteger(payload.amount) || payload.amount <= 0 ||
      !Number.isSafeInteger(payload.orderId) || payload.orderId <= 0 ||
      payload.currency !== 'PLN' || payload.merchantId !== Number(process.env.P24_MERCHANT_ID) ||
      payload.posId !== Number(process.env.P24_POS_ID) || !verifyWebhookSign(payload)) {
    return NextResponse.json({ error: 'Nieprawidłowy podpis' }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({ where: { sessionId: payload.sessionId } });
    if (!order || order.amountGrosze !== payload.amount) {
      return NextResponse.json({ error: 'Niezgodne dane zamówienia.' }, { status: 400 });
    }
    if (order.status === 'PAID') {
      return order.p24OrderId === null || order.p24OrderId === payload.orderId
        ? new NextResponse(null, { status: 200 })
        : NextResponse.json({ error: 'Niezgodne dane zamówienia.' }, { status: 400 });
    }
    if (order.status !== 'PENDING') {
      return NextResponse.json({ error: 'Zamówienie nie oczekuje na płatność.' }, { status: 409 });
    }
    await verifyTransaction(payload.sessionId, payload.amount, payload.orderId);
    await markOrderAsPaid(payload.sessionId, payload.amount, payload.orderId);
    return new NextResponse(null, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Weryfikacja nieudana' }, { status: 502 });
  }
}
