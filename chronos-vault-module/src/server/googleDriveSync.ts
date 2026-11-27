import fs from 'fs';
import path from 'path';

export interface GoogleDriveConflictItem {
  file: string;
  driveMtime: string;
  localMtime: string;
  backupPath: string;
  resolution: 'pulled-drive-with-local-backup' | 'pushed-local-with-drive-backup';
}

export interface GoogleDriveSyncStatus {
  enabled: boolean;
  mode: 'bidirectional';
  account: string;
  intervalSeconds: number;
  mountPath: string;
  liveSyncDir: string;
  mountAvailable: boolean;
  lastSyncAt: string | null;
  lastDirection: 'push' | 'pull' | 'push+pull' | 'idle';
  pulledFiles: string[];
  pushedFiles: string[];
  conflicts: GoogleDriveConflictItem[];
  lastError: string | null;
  syncCount: number;
}

const DEFAULT_MOUNT_PATH =
  process.env.CHRONOS_GDRIVE_MOUNT ||
  '/Users/krzysztofjarzyna/Library/CloudStorage/GoogleDrive-kontakt@bmclinic.co/Mój dysk/Chronos-Vault';

const ACCOUNT_EMAIL = process.env.CHRONOS_GDRIVE_ACCOUNT || 'kontakt@bmclinic.co';
const SYNC_INTERVAL_MS = 15_000; // 15s responsive two-way sync

let timer: NodeJS.Timeout | null = null;
let lastSyncAt: string | null = null;
let lastError: string | null = null;
let lastDirection: GoogleDriveSyncStatus['lastDirection'] = 'idle';
let lastPulledFiles: string[] = [];
let lastPushedFiles: string[] = [];
let lastConflicts: GoogleDriveConflictItem[] = [];
let syncCount = 0;

function getLiveSyncDir(): string {
  return path.join(DEFAULT_MOUNT_PATH, 'live-sync');
}

function getLocalSnapshotPath(projectRoot: string): string {
  return path.join(projectRoot, 'taskkill-assets', 'chronos-client-snapshot.json');
}

function syncMindmapsBidirectional(
  projectRoot: string,
  liveDir: string,
  pushed: string[],
  pulled: string[],
  conflicts: GoogleDriveConflictItem[]
): void {
  const localMapsDir = path.join(projectRoot, 'taskkill-assets', 'mindmaps');
  const driveMapsDir = path.join(liveDir, 'mindmaps');
  const backupDir = path.join(projectRoot, 'taskkill-assets', 'mindmaps-backups');

  fs.mkdirSync(localMapsDir, { recursive: true });
  fs.mkdirSync(driveMapsDir, { recursive: true });

  const isSyncable = (name: string) =>
    (name.endsWith('.json') || name.endsWith('.md')) && !name.includes('.bak');

  const localNames = fs.readdirSync(localMapsDir).filter(isSyncable);
  const driveNames = fs.readdirSync(driveMapsDir).filter(isSyncable);
  const allNames = Array.from(new Set([...localNames, ...driveNames]));

  for (const name of allNames) {
    const localFile = path.join(localMapsDir, name);
    const driveFile = path.join(driveMapsDir, name);
    const hasLocal = fs.existsSync(localFile);
    const hasDrive = fs.existsSync(driveFile);

    if (hasLocal && !hasDrive) {
      fs.copyFileSync(localFile, driveFile);
      pushed.push(`mindmaps/${name}`);
      continue;
    }

    if (!hasLocal && hasDrive) {
      fs.copyFileSync(driveFile, localFile);
      pulled.push(`mindmaps/${name}`);
      continue;
    }

    if (hasLocal && hasDrive) {
      const localBuf = fs.readFileSync(localFile);
      const driveBuf = fs.readFileSync(driveFile);
      if (Buffer.compare(localBuf, driveBuf) === 0) {
        continue;
      }

      const localStat = fs.statSync(localFile);
      const driveStat = fs.statSync(driveFile);
      const stamp = new Date().toISOString().replace(/[:.]/g, '-');
      fs.mkdirSync(backupDir, { recursive: true });

      if (driveStat.mtimeMs > localStat.mtimeMs + 1500) {
        const bakPath = path.join(backupDir, `${name}.${stamp}.local.bak`);
        fs.copyFileSync(localFile, bakPath);
        fs.copyFileSync(driveFile, localFile);
        pulled.push(`mindmaps/${name}`);
        conflicts.push({
          file: `mindmaps/${name}`,
          driveMtime: driveStat.mtime.toISOString(),
          localMtime: localStat.mtime.toISOString(),
          backupPath: bakPath,
          resolution: 'pulled-drive-with-local-backup',
        });
      } else {
        if (Math.abs(driveStat.mtimeMs - localStat.mtimeMs) < 120_000) {
          const bakPath = path.join(backupDir, `${name}.${stamp}.drive.bak`);
          fs.copyFileSync(driveFile, bakPath);
          conflicts.push({
            file: `mindmaps/${name}`,
            driveMtime: driveStat.mtime.toISOString(),
            localMtime: localStat.mtime.toISOString(),
            backupPath: bakPath,
            resolution: 'pushed-local-with-drive-backup',
          });
        }
        fs.copyFileSync(localFile, driveFile);
        pushed.push(`mindmaps/${name}`);
      }
    }
  }
}

export function getGoogleDriveSyncStatus(): GoogleDriveSyncStatus {
  const mountAvailable = fs.existsSync(path.dirname(DEFAULT_MOUNT_PATH));
  return {
    enabled: Boolean(timer),
    mode: 'bidirectional',
    account: ACCOUNT_EMAIL,
    intervalSeconds: Math.round(SYNC_INTERVAL_MS / 1000),
    mountPath: DEFAULT_MOUNT_PATH,
    liveSyncDir: getLiveSyncDir(),
    mountAvailable,
    lastSyncAt,
    lastDirection,
    pulledFiles: lastPulledFiles,
    pushedFiles: lastPushedFiles,
    conflicts: lastConflicts,
    lastError,
    syncCount,
  };
}

export function syncNowToGoogleDrive(
  projectRoot: string,
  clientPayload?: Record<string, unknown>
): GoogleDriveSyncStatus {
  const parentDriveRoot = path.dirname(DEFAULT_MOUNT_PATH);
  if (!fs.existsSync(parentDriveRoot)) {
    lastError = `Google Drive mount not found at ${parentDriveRoot}`;
    return getGoogleDriveSyncStatus();
  }

  try {
    const liveDir = getLiveSyncDir();
    const terajaLiveDir = path.join(path.dirname(DEFAULT_MOUNT_PATH), 'Teraja', 'live-sync');
    const nowIso = new Date().toISOString();
    const pushed: string[] = [];
    const pulled: string[] = [];
    const conflicts: GoogleDriveConflictItem[] = [];

    fs.mkdirSync(liveDir, { recursive: true });
    syncMindmapsBidirectional(projectRoot, liveDir, pushed, pulled, conflicts);

    const localSnapPath = getLocalSnapshotPath(projectRoot);
    const driveSnapPath = path.join(liveDir, 'client-state-snapshot.json');

    if (clientPayload && typeof clientPayload === 'object') {
      const hasListsOrTasks =
        Array.isArray(clientPayload.rawTasks) || Array.isArray(clientPayload.lists);
      if (hasListsOrTasks) {
        const snapPayload = JSON.stringify({ savedAt: nowIso, ...clientPayload }, null, 2);
        fs.mkdirSync(path.dirname(localSnapPath), { recursive: true });
        fs.writeFileSync(localSnapPath, snapPayload, 'utf8');
        fs.writeFileSync(driveSnapPath, snapPayload, 'utf8');
        pushed.push('client-state-snapshot.json');
      }
    } else if (fs.existsSync(driveSnapPath) && fs.existsSync(localSnapPath)) {
      const dStat = fs.statSync(driveSnapPath);
      const lStat = fs.statSync(localSnapPath);
      if (dStat.mtimeMs > lStat.mtimeMs + 1500) {
        fs.copyFileSync(driveSnapPath, localSnapPath);
        pulled.push('client-state-snapshot.json');
      } else if (lStat.mtimeMs > dStat.mtimeMs + 1500) {
        fs.copyFileSync(localSnapPath, driveSnapPath);
        pushed.push('client-state-snapshot.json');
      }
    } else if (fs.existsSync(driveSnapPath) && !fs.existsSync(localSnapPath)) {
      fs.mkdirSync(path.dirname(localSnapPath), { recursive: true });
      fs.copyFileSync(driveSnapPath, localSnapPath);
      pulled.push('client-state-snapshot.json');
    } else if (fs.existsSync(localSnapPath) && !fs.existsSync(driveSnapPath)) {
      fs.copyFileSync(localSnapPath, driveSnapPath);
      pushed.push('client-state-snapshot.json');
    }

    const manifest = {
      app: 'Chronos Vault Unified',
      mode: 'bidirectional',
      account: ACCOUNT_EMAIL,
      syncedAt: nowIso,
      syncCount: syncCount + 1,
      intervalSeconds: Math.round(SYNC_INTERVAL_MS / 1000),
      sourceRoot: projectRoot,
      pushedFiles: pushed,
      pulledFiles: pulled,
      conflictsCount: conflicts.length,
    };

    for (const targetDir of [liveDir, terajaLiveDir]) {
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(
        path.join(targetDir, 'last-sync.json'),
        JSON.stringify(manifest, null, 2),
        'utf8'
      );
      const telemetrySrc = path.join(projectRoot, 'public', 'sentinel-telemetry-reference.json');
      if (fs.existsSync(telemetrySrc)) {
        fs.copyFileSync(telemetrySrc, path.join(targetDir, 'sentinel-telemetry-reference.json'));
      }
    }

    lastSyncAt = nowIso;
    lastError = null;
    lastPulledFiles = pulled;
    lastPushedFiles = pushed;
    lastConflicts = conflicts.slice(-10);
    lastDirection =
      pushed.length > 0 && pulled.length > 0
        ? 'push+pull'
        : pulled.length > 0
          ? 'pull'
          : pushed.length > 0
            ? 'push'
            : 'idle';
    syncCount += 1;
  } catch (err) {
    lastError = err instanceof Error ? err.message : String(err);
  }

  return getGoogleDriveSyncStatus();
}

export function getGoogleDrivePullSnapshot(projectRoot: string): {
  status: GoogleDriveSyncStatus;
  snapshot: Record<string, unknown> | null;
} {
  const status = syncNowToGoogleDrive(projectRoot);
  const localSnapPath = getLocalSnapshotPath(projectRoot);
  let snapshot: Record<string, unknown> | null = null;
  if (fs.existsSync(localSnapPath)) {
    try {
      snapshot = JSON.parse(fs.readFileSync(localSnapPath, 'utf8')) as Record<string, unknown>;
    } catch {
      snapshot = null;
    }
  }
  return { status, snapshot };
}

export function startGoogleDriveAutoSync(projectRoot: string): void {
  if (timer) return;
  syncNowToGoogleDrive(projectRoot);
  timer = setInterval(() => {
    syncNowToGoogleDrive(projectRoot);
  }, SYNC_INTERVAL_MS);
  if (typeof timer.unref === 'function') {
    timer.unref();
  }
  console.log(
    `[GoogleDriveSync] Two-way auto-sync active every ${Math.round(SYNC_INTERVAL_MS / 1000)}s <-> ${getLiveSyncDir()} (${ACCOUNT_EMAIL})`
  );
}
