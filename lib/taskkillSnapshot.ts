import { readFile } from 'node:fs/promises';
import path from 'node:path';
import clinicTasks from '../taskkill-assets/tasks.json';
import clinicLayout from '../taskkill-assets/layout.json';
import deploymentTasks from '../taskkill-assets/mindmaps/scalenie-3016.tasks.json';
import deploymentLayout from '../taskkill-assets/mindmaps/scalenie-3016.layout.json';
import registry from '../taskkill-assets/mindmaps/registry.json';

const deploymentMap = registry.find(({ id }) => id === 'scalenie-3016');
const snapshots = {
  bmclinic: {
    name: 'BM Clinic — bmclinic.co',
    description: 'Główna mapa myśli projektu strony i platformy kliniki',
    createdAt: '2026-11-23T00:00:00.000Z',
    isDefault: true,
    tasks: clinicTasks,
    layout: clinicLayout,
  },
  'scalenie-3016': {
    name: deploymentMap?.name ?? 'Raport Wdrożeniowy & Scalenie (:3016)',
    description: deploymentMap?.description ?? '',
    createdAt: deploymentMap?.createdAt ?? '',
    isDefault: false,
    tasks: deploymentTasks,
    layout: deploymentLayout,
  },
};

export const snapshotHeaders = { 'Cache-Control': 'private, no-store' };

export function taskkillSnapshotAvailable() {
  return process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview';
}

export function getTaskkillSnapshot(id: string | null) {
  if (!id || id === 'bmclinic') return snapshots.bmclinic;
  if (id === 'scalenie-3016') return snapshots['scalenie-3016'];
  return null;
}

export async function listTaskkillSnapshots() {
  const deploymentNotes = await readFile(
    path.join(process.cwd(), 'taskkill-assets', 'mindmaps', 'scalenie-3016.notes.md'),
    'utf8',
  );
  return Object.entries(snapshots).map(([id, entry]) => ({
    id,
    name: entry.name,
    description: entry.description,
    isDefault: entry.isDefault,
    createdAt: entry.createdAt,
    taskCount: entry.tasks.length,
    updatedAt: typeof entry.layout.updatedAt === 'number'
      ? new Date(entry.layout.updatedAt).toISOString()
      : entry.createdAt,
    notes: id === 'scalenie-3016' ? deploymentNotes : '',
  }));
}
