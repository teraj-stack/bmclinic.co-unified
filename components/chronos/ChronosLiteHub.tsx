'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, FileText, GitBranch, Mic, PenTool, RefreshCw, ShieldCheck } from 'lucide-react';
import type { ExportableTask, GeneratedPDFReport } from '@/lib/chronos/export';
import { CalendarSyncView } from './CalendarSyncView';
import { PDFReportSearchPanel } from './PDFReportSearchPanel';
import {
  AIWorkOptimizerAndMalwareView,
  type TaskOptimizationPatch,
} from './AIWorkOptimizerAndMalwareView';
import {
  VoiceAndHandwritingModal,
  type ExtractedTaskDraft,
} from './VoiceAndHandwritingModal';

type HubTab = 'calendar' | 'pdf' | 'ai_security';

const STORAGE_KEY = 'bmclinics_chronos_lite_tasks_v1';

interface SharedMindMapMeta {
  id: string;
  name: string;
  taskCount?: number;
}

interface RawTaskKillItem {
  id: number;
  title?: string;
  body?: string;
  status?: string;
  priority?: string;
  type?: string;
  labels?: string[];
  assignee?: string;
  startDate?: string;
  endDate?: string;
  url?: string;
  parentId?: number;
  estimatedMinutes?: number;
  [key: string]: unknown;
}

function mapRawStatusToExport(raw?: string): ExportableTask['status'] {
  if (raw === 'Done') return 'done';
  if (raw === 'In Progress') return 'in_progress';
  return 'todo';
}

function mapExportStatusToRaw(status: ExportableTask['status'], prevRaw?: string): string {
  if (status === 'done') return 'Done';
  if (status === 'in_progress') return 'In Progress';
  if (prevRaw === 'Paused') return 'Paused';
  return 'Todo';
}

function mapRawPriorityToExport(raw?: string): ExportableTask['priority'] {
  if (raw === 'Krytyczny') return 'urgent';
  if (raw === 'Wysoki') return 'high';
  if (raw === 'Niski') return 'low';
  return 'medium';
}

function mapExportPriorityToRaw(priority: ExportableTask['priority']): string {
  if (priority === 'urgent') return 'Krytyczny';
  if (priority === 'high') return 'Wysoki';
  if (priority === 'low') return 'Niski';
  return 'Średni';
}

function makeTask(partial: Partial<ExportableTask> & { id: string; title: string }): ExportableTask {
  return {
    listId: 'bm-clinics',
    listName: 'BM Clinics',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date().toISOString().slice(0, 10),
    reminderAt: '',
    estimatedMinutes: 30,
    tags: ['BM Clinics'],
    sourceType: 'manual',
    isEncrypted: false,
    assigneeEmail: 'kontakt@bujokmedical.pl',
    externalCalendarPlatform: '',
    ...partial,
  };
}

const DEFAULT_TASKS: ExportableTask[] = [
  makeTask({
    id: 'bm-1',
    title: 'Konsultacja kwalifikacyjna — Flebologia / Żylaki',
    description: 'Przegląd USG Doppler i plan zabiegowy pacjenta',
    status: 'todo',
    priority: 'high',
    dueDate: new Date().toISOString().slice(0, 10),
    estimatedMinutes: 30,
    tags: ['BM Clinics', 'Flebologia'],
  }),
  makeTask({
    id: 'bm-2',
    title: 'Kontrola pozabiegowa — Proktologia laserowa',
    description: 'Ocena rekonwalescencji i zaleceń po zabiegu ambulatoryjnym',
    status: 'in_progress',
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    estimatedMinutes: 20,
    tags: ['BM Clinics', 'Proktologia'],
  }),
  makeTask({
    id: 'bm-3',
    title: 'Aktualizacja cennika i raport miesięczny PDF',
    description: 'Weryfikacja 21 usług w panelu CMS oraz eksport raportu PDF',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    estimatedMinutes: 45,
    tags: ['Administracja', 'CMS'],
  }),
];

export function ChronosLiteHub({
  initialTab = 'calendar',
  roleLabel = 'Panel Kliniki BM Clinics',
}: {
  initialTab?: HubTab;
  roleLabel?: string;
}) {
  const [activeTab, setActiveTab] = useState<HubTab>(initialTab);
  const [tasks, setTasks] = useState<ExportableTask[]>(DEFAULT_TASKS);
  const [autoTwoWaySync, setAutoTwoWaySync] = useState(false);
  const [generatedReports, setGeneratedReports] = useState<GeneratedPDFReport[]>([]);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [includeIndexAppendix, setIncludeIndexAppendix] = useState(true);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [voiceInitialTab, setVoiceInitialTab] = useState<'voice' | 'handwriting'>('voice');
  const [syncMapId, setSyncMapId] = useState<string>('bmclinic');
  const [availableMaps, setAvailableMaps] = useState<SharedMindMapMeta[]>([
    { id: 'bmclinic', name: 'BM Clinic — bmclinic.co' },
    { id: 'scalenie-3016', name: 'Raport Wdrożeniowy & Scalenie (:3016)' },
  ]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncBadge, setSyncBadge] = useState<string>('Łączenie...');
  const rawMetaRef = useRef<Map<string, RawTaskKillItem>>(new Map());
  const lastPushedJsonRef = useRef<string>('');

  const pullSharedTasks = useCallback(async (targetMapId: string) => {
    setIsSyncing(true);
    try {
      const mapsRes = await fetch('/api/mindmaps', { cache: 'no-store' });
      if (mapsRes.ok) {
        const mapsData = await mapsRes.json();
        if (Array.isArray(mapsData?.maps) && mapsData.maps.length > 0) {
          setAvailableMaps(mapsData.maps);
        }
      }

      const res = await fetch(`/api/tasks?map=${encodeURIComponent(targetMapId)}`, {
        cache: 'no-store',
      });
      if (!res.ok || res.status === 204) {
        setSyncBadge(`Brak zdalnych zadań (${targetMapId}) — tryb lokalny`);
        return;
      }
      const items: RawTaskKillItem[] = await res.json();
      if (!Array.isArray(items) || items.length === 0) return;

      const metaMap = new Map<string, RawTaskKillItem>();
      const mapped: ExportableTask[] = items.map((item) => {
        const cid = `tk_${item.id}`;
        metaMap.set(cid, item);
        return makeTask({
          id: cid,
          listId: targetMapId,
          listName: targetMapId === 'scalenie-3016' ? 'Raport Wdrożeniowy (:3016)' : 'BM Clinic & Chronos Vault',
          title: item.title || `Zadanie #${item.id}`,
          description: item.body || '',
          status: mapRawStatusToExport(item.status),
          priority: mapRawPriorityToExport(item.priority),
          dueDate: (item.endDate || new Date().toISOString().slice(0, 10)).slice(0, 10),
          estimatedMinutes: Number(item.estimatedMinutes) || 30,
          tags: Array.isArray(item.labels) ? item.labels : ['BM Clinics'],
          assigneeEmail: item.assignee || 'BM Clinic',
        });
      });

      rawMetaRef.current = metaMap;
      lastPushedJsonRef.current = JSON.stringify(items);
      setTasks(mapped);
      try {
        localStorage.setItem(`${STORAGE_KEY}_${targetMapId}`, JSON.stringify(mapped));
      } catch {
        // Ignore storage write failure
      }
      setSyncBadge(`Zsynchronizowano (${mapped.length}) ↔ /vault/ & /taskkill/`);
    } catch {
      try {
        const raw = localStorage.getItem(`${STORAGE_KEY}_${targetMapId}`) || localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) setTasks(parsed);
        }
      } catch {
        // Ignore fallback failure
      }
      setSyncBadge('Tryb offline (cache przeglądarki)');
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    pullSharedTasks(syncMapId);
  }, [pullSharedTasks, syncMapId]);

  useEffect(() => {
    const onFocus = () => {
      pullSharedTasks(syncMapId);
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [pullSharedTasks, syncMapId]);

  const pushSharedTasks = useCallback(
    async (nextTasks: ExportableTask[], targetMapId: string) => {
      let maxNumId = 0;
      nextTasks.forEach((t) => {
        const m = /^tk_(\d+)$/.exec(t.id);
        if (m) maxNumId = Math.max(maxNumId, Number(m[1]));
      });

      const serialized: RawTaskKillItem[] = nextTasks.map((t) => {
        const existing = rawMetaRef.current.get(t.id);
        const m = /^tk_(\d+)$/.exec(t.id);
        const numId = existing?.id ?? (m ? Number(m[1]) : ++maxNumId);
        const dueDay = (t.dueDate || new Date().toISOString().slice(0, 10)).slice(0, 10);
        return {
          ...(existing || {}),
          id: numId,
          title: t.title,
          body: t.description,
          status: mapExportStatusToRaw(t.status, existing?.status),
          priority: mapExportPriorityToRaw(t.priority),
          type: existing?.type || 'Task',
          labels: Array.isArray(t.tags) && t.tags.length > 0 ? t.tags : ['Chronos Klinika'],
          assignee: t.assigneeEmail || existing?.assignee || 'BM Clinic',
          startDate: existing?.startDate || dueDay,
          endDate: dueDay,
          estimatedMinutes: t.estimatedMinutes || 30,
        };
      });

      const payloadJson = JSON.stringify(serialized);
      if (payloadJson === lastPushedJsonRef.current) return;
      lastPushedJsonRef.current = payloadJson;

      try {
        const res = await fetch(`/api/tasks?map=${encodeURIComponent(targetMapId)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payloadJson,
        });
        if (res.ok) {
          const nextMeta = new Map<string, RawTaskKillItem>();
          serialized.forEach((item) => nextMeta.set(`tk_${item.id}`, item));
          rawMetaRef.current = nextMeta;
          setSyncBadge(`Zsynchronizowano (${serialized.length}) ↔ /vault/ & /taskkill/`);
        }
      } catch {
        setSyncBadge('Błąd zapisu do API — zapisano lokalnie');
      }
    },
    []
  );

  const persistTasks = (updater: (prev: ExportableTask[]) => ExportableTask[]) => {
    setTasks((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(`${STORAGE_KEY}_${syncMapId}`, JSON.stringify(next));
      } catch {
        // Ignore quota errors
      }
      void pushSharedTasks(next, syncMapId);
      return next;
    });
  };

  const handleImportCalendarTasks = async (
    imported: Array<{
      title: string;
      description: string;
      dueDate: string;
      estimatedMinutes: number;
      externalCalendarPlatform?: string;
    }>,
    platform: string
  ) => {
    persistTasks((prev) => [
      ...prev,
      ...imported.map((item, idx) =>
        makeTask({
          id: `cal-${Date.now()}-${idx}`,
          title: item.title,
          description: item.description,
          dueDate: item.dueDate,
          estimatedMinutes: item.estimatedMinutes || 30,
          sourceType: 'calendar',
          externalCalendarPlatform: item.externalCalendarPlatform || platform,
          tags: ['Kalendarz', item.externalCalendarPlatform || platform],
        })
      ),
    ]);
  };

  const handleApplyExternalCalendarUpdates = async (
    updates: Array<{
      taskId: string;
      title: string;
      dueDate: string;
      externalCalendarPlatform: string;
    }>
  ) => {
    const map = new Map(updates.map((u) => [u.taskId, u]));
    persistTasks((prev) =>
      prev.map((t) => {
        const u = map.get(t.id);
        return u
          ? {
              ...t,
              title: u.title,
              dueDate: u.dueDate,
              externalCalendarPlatform: u.externalCalendarPlatform,
            }
          : t;
      })
    );
  };

  const handleMarkTaskSyncedWithPlatform = async (taskId: string, platformTag: string) => {
    persistTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              externalCalendarPlatform: platformTag,
              tags: Array.from(new Set([...(t.tags || []), platformTag])),
            }
          : t
      )
    );
  };

  const handleQuickAddDateTask = (dateIso: string) => {
    const title = window.prompt(`Nowe zadanie / termin na dzień ${dateIso}:`);
    if (!title || !title.trim()) return;
    persistTasks((prev) => [
      ...prev,
      makeTask({
        id: `quick-${Date.now()}`,
        title: title.trim(),
        description: 'Dodano z kalendarza BM Clinics',
        dueDate: dateIso,
      }),
    ]);
  };

  const handleApplyTaskOptimization = async (patch: TaskOptimizationPatch) => {
    persistTasks((prev) =>
      prev.map((t) =>
        t.id === patch.taskId
          ? {
              ...t,
              priority: patch.suggestedPriority ?? t.priority,
              estimatedMinutes: patch.suggestedMinutes ?? t.estimatedMinutes,
              description: patch.enhancedDescription || t.description,
              isEncrypted: patch.recommendEncryption ? true : t.isEncrypted,
            }
          : t
      )
    );
  };

  const handleCreateDraftTasks = async (drafts: ExtractedTaskDraft[], source: string) => {
    const sourceType: ExportableTask['sourceType'] =
      source === 'voice' || source === 'handwriting' ? source : 'manual';
    persistTasks((prev) => [
      ...prev,
      ...drafts.map((d, idx) => {
        const due = new Date(Date.now() + (d.dueDateOffsetDays || 0) * 86400000)
          .toISOString()
          .slice(0, 10);
        return makeTask({
          id: `draft-${Date.now()}-${idx}`,
          title: d.title,
          description: d.description || '',
          priority: d.priority || 'medium',
          dueDate: due,
          estimatedMinutes: d.estimatedMinutes || 30,
          sourceType,
          tags: d.tags?.length ? d.tags : [source],
        });
      }),
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Chronos Vault — Moduły Kliniki (Zsynchronizowane)
          </h1>
          <p className="text-sm opacity-75">
            {roleLabel} · Dwukierunkowy sync z /vault/ i /taskkill/ · <span className="font-medium text-emerald-500">{syncBadge}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={syncMapId}
            onChange={(e) => setSyncMapId(e.target.value)}
            aria-label="Wybierz zsynchronizowaną mapę zadań"
            className="rounded-lg border bg-transparent px-3 py-2 text-xs font-medium"
            style={{ borderColor: 'var(--border-color)' }}
          >
            {availableMaps.map((m) => (
              <option key={m.id} value={m.id} className="text-slate-900">
                Mapa: {m.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => pullSharedTasks(syncMapId)}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:opacity-90"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            Synchronizuj
          </button>
          <a
            href="/vault/"
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:opacity-90"
            style={{ borderColor: 'var(--border-color)' }}
          >
            Pełny Vault ↗
          </a>
          <a
            href={`/taskkill/?map=${encodeURIComponent(syncMapId)}`}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:opacity-90"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <GitBranch className="h-3.5 w-3.5" />
            Drzewo ↗
          </a>
          <button
            type="button"
            onClick={() => {
              setVoiceInitialTab('voice');
              setVoiceModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:opacity-90"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <Mic className="h-4 w-4" />
            Notatka głosowa
          </button>
          <button
            type="button"
            onClick={() => {
              setVoiceInitialTab('handwriting');
              setVoiceModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:opacity-90"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <PenTool className="h-4 w-4" />
            Pismo odręczne
          </button>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-2 border-b pb-3"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('calendar')}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === 'calendar' ? 'bg-amber-500 text-black' : 'border opacity-80 hover:opacity-100'
          }`}
          style={activeTab === 'calendar' ? undefined : { borderColor: 'var(--border-color)' }}
        >
          <Calendar className="h-4 w-4" />
          Kalendarz i Synchronizacja
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pdf')}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === 'pdf' ? 'bg-amber-500 text-black' : 'border opacity-80 hover:opacity-100'
          }`}
          style={activeTab === 'pdf' ? undefined : { borderColor: 'var(--border-color)' }}
        >
          <FileText className="h-4 w-4" />
          Raporty PDF i Wyszukiwarka
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ai_security')}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            activeTab === 'ai_security' ? 'bg-amber-500 text-black' : 'border opacity-80 hover:opacity-100'
          }`}
          style={activeTab === 'ai_security' ? undefined : { borderColor: 'var(--border-color)' }}
        >
          <ShieldCheck className="h-4 w-4" />
          Optymalizator AI i Bezpieczeństwo
        </button>
      </div>

      <div className="min-h-[420px]">
        {activeTab === 'calendar' && (
          <CalendarSyncView
            tasks={tasks}
            activeListName="BM Clinics — Harmonogram"
            googleAccessToken={null}
            autoTwoWaySync={autoTwoWaySync}
            onToggleAutoTwoWaySync={setAutoTwoWaySync}
            onConnectGoogleCalendar={async () => null}
            onImportCalendarTasks={handleImportCalendarTasks}
            onApplyExternalCalendarUpdates={handleApplyExternalCalendarUpdates}
            onMarkTaskSyncedWithPlatform={handleMarkTaskSyncedWithPlatform}
            onQuickAddDateTask={handleQuickAddDateTask}
          />
        )}

        {activeTab === 'pdf' && (
          <PDFReportSearchPanel
            tasksToExport={tasks}
            projectLabel="BM Clinics — Raport Operacyjny"
            periodLabel={new Date().toLocaleDateString('pl-PL')}
            scopeMode="all"
            reportVariant="productivity_and_tasks"
            includeIndexAppendix={includeIndexAppendix}
            onToggleIndexAppendix={setIncludeIndexAppendix}
            generatedReports={generatedReports}
            activeReportId={activeReportId}
            onSelectReport={setActiveReportId}
            onRegisterGeneratedReport={(report) => {
              setGeneratedReports((prev) => [report, ...prev]);
              setActiveReportId(report.id);
            }}
          />
        )}

        {activeTab === 'ai_security' && (
          <AIWorkOptimizerAndMalwareView
            tasks={tasks}
            activeListName="BM Clinics"
            onApplyTaskOptimization={handleApplyTaskOptimization}
            onCreateSuggestedTasks={handleCreateDraftTasks}
          />
        )}
      </div>

      <VoiceAndHandwritingModal
        isOpen={voiceModalOpen}
        initialTab={voiceInitialTab}
        onClose={() => setVoiceModalOpen(false)}
        onCreateTasks={handleCreateDraftTasks}
      />
    </div>
  );
}
