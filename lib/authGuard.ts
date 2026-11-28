import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from './authOptions';

type Role = 'ADMIN' | 'DOCTOR' | 'PATIENT';

export async function requireRole(roles: Role | Role[]) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!session?.user?.id || !role || !allowed.includes(role as Role)) {
    throw new Error('Brak uprawnień');
  }
  return session;
}

export async function checkApiRole(roles: Role | Role[]) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  const session = process.env.NEXTAUTH_SECRET ? await getServerSession(authOptions) : null;
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Zaloguj się, aby kontynuować.' }, { status: 401 });
  }
  if (!allowed.includes(session.user.role as Role)) {
    return NextResponse.json({ error: 'Brak uprawnień.' }, { status: 403 });
  }
  return null;
}
