'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/authGuard';
import { prisma } from '@/lib/prisma';

export async function updateVisitStatus(visitId: string, formData: FormData) {
  const session = await requireRole(['DOCTOR', 'ADMIN']);
  const status = formData.get('status');
  if (status !== 'CONFIRMED' && status !== 'COMPLETED' && status !== 'CANCELLED') {
    throw new Error('Nieprawidłowy status wizyty.');
  }

  const result = await prisma.visit.updateMany({
    where: { id: visitId, doctor: { userId: session.user.id } },
    data: { status },
  });
  if (!result.count) throw new Error('Nie znaleziono wizyty.');
  revalidatePath('/lekarz');
}

export async function updateWorkHours(formData: FormData) {
  const session = await requireRole(['DOCTOR', 'ADMIN']);
  const workStartHour = Number(formData.get('workStartHour') ?? NaN);
  const workEndHour = Number(formData.get('workEndHour') ?? NaN);
  if (!Number.isInteger(workStartHour) || !Number.isInteger(workEndHour) ||
      workStartHour < 0 || workEndHour > 24 || workStartHour >= workEndHour) {
    throw new Error('Nieprawidłowe godziny przyjęć.');
  }

  await prisma.doctor.update({
    where: { userId: session.user.id },
    data: { workStartHour, workEndHour },
  });
  revalidatePath('/lekarz/kalendarz');
}
