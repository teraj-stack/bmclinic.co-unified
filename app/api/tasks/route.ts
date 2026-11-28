import { NextRequest } from 'next/server';
import { serveTaskkillSection } from '@/lib/taskkillSharedStore';

export function GET(req: NextRequest) {
  return serveTaskkillSection(req, 'tasks');
}

export const POST = GET;
