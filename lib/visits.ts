import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

interface SavePendingVisitInput {
  doctorId: string;
  serviceId: string;
  patientEmail: string;
  patientName: string;
  patientPhone: string;
  start: Date;
  end: Date;
}

export async function savePendingVisit(input: SavePendingVisitInput) {
  return prisma.$transaction(async (tx) => {
    const overlap = await tx.visit.findFirst({
      where: {
        doctorId: input.doctorId,
        status: { not: 'CANCELLED' },
        startTime: { lt: input.end },
        endTime: { gt: input.start },
      },
      select: { id: true },
    });
    if (overlap) return null;

    const user = await tx.user.upsert({
      where: { email: input.patientEmail },
      update: {},
      create: { email: input.patientEmail, name: input.patientName || undefined },
    });
    const patient = await tx.patient.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id, phone: input.patientPhone || undefined },
    });

    return tx.visit.create({
      data: {
        patientId: patient.id,
        doctorId: input.doctorId,
        serviceId: input.serviceId,
        startTime: input.start,
        endTime: input.end,
      },
    });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}
