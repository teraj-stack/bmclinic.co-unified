import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const configured = Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);
  return NextResponse.json({
    oauthConfigured: configured,
    callbackPath: '/auth/callback',
    sessionId: 'unified-local',
    accounts: [],
  });
}
