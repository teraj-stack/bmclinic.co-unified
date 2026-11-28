'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/authGuard';
import { prisma } from '@/lib/prisma';

export async function cancelVisit(visitId: string) {
  const session = await requireRole('PATIENT');
  const result = await prisma.visit.updateMany({
    where: {
      id: visitId,
      patient: { userId: session.user.id },
      status: { in: ['PROPOSED', 'CONFIRMED', 'CANCELLED'] },
      startTime: { gt: new Date() },
    },
    data: { status: 'CANCELLED' },
  });
  if (!result.count) throw new Error('Nie znaleziono wizyty do odwołania.');
  revalidatePath('/pacjent');
}

export async function updateProfile(formData: FormData) {
  const session = await requireRole('PATIENT');
  const phone = String(formData.get('phone') ?? '').trim();
  const name = String(formData.get('name') ?? '').trim();
  if (name.length > 120 || phone.length > 40) throw new Error('Nieprawidłowe dane profilu.');

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      patient: { upsert: { update: { phone }, create: { phone } } },
    },
  });
  revalidatePath('/pacjent/profil');
}
