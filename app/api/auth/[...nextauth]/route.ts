import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';

const handler = NextAuth(authOptions);

export async function GET(req: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
  if (!authOptions.secret && !authOptions.providers.length) {
    const { nextauth } = await context.params;
    if (nextauth[0] === 'providers' || nextauth[0] === 'session') {
      return NextResponse.json({}, { headers: { 'Cache-Control': 'no-store' } });
    }
    return NextResponse.json({ error: 'Logowanie jest niedostępne.' }, { status: 503 });
  }
  return handler(req, context);
}

export async function POST(req: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
  if (!authOptions.secret || !authOptions.providers.length) {
    return NextResponse.json({ error: 'Logowanie jest niedostępne.' }, { status: 503 });
  }
  return handler(req, context);
}
