import { NextRequest } from 'next/server';
import { serveTaskkillSection } from '@/lib/taskkillSharedStore';

export function GET(req: NextRequest) {
  return serveTaskkillSection(req, 'layout');
}

export const POST = GET;
