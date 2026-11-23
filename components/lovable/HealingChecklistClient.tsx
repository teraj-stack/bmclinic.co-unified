'use client';

import { useEffect, useState } from 'react';

export interface ScheduleTask {
  id: string;
  label: string;
  tone?: 'critical' | 'default';
}

export interface ScheduleDay {
  day: number;
  phase: string;
  focus: string;
  tasks: ScheduleTask[];
}

const STORAGE_KEY = 'bmclinic_healing_checklist_v1';

export default function HealingChecklistClient({
  schedule,
}: {
  schedule: ScheduleDay[];
}) {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const current = schedule.find((d) => d.day === selectedDay) ?? schedule[0];
  const totalTasks = schedule.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedTasks = Object.values(checked).filter(Boolean).length;
  const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-medium text-slate-200">
            Postęp protokołu pozabiegowego ({completedTasks} / {totalTasks} kroków)
          </span>
          <span className="font-semibold text-emerald-400">{pct}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Day selector */}
      <div className="flex flex-wrap gap-2">
        {schedule.map((d) => {
          const dayDone = d.tasks.every((t) => checked[t.id]);
          const isActive = d.day === current.day;
          return (
            <button
              key={d.day}
              type="button"
              onClick={() => setSelectedDay(d.day)}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                isActive
                  ? 'bg-sky-500 text-slate-950 shadow'
                  : dayDone
                  ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {d.phase}
            </button>
          );
        })}
      </div>

      {/* Active day checklist */}
      <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
        <div className="border-b border-white/10 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            {current.phase}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white">{current.focus}</h2>
        </div>

        <ul className="mt-5 space-y-3">
          {current.tasks.map((task) => {
            const isDone = !!checked[task.id];
            const isCritical = task.tone === 'critical';
            return (
              <li key={task.id}>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                    isDone
                      ? 'border-emerald-500/30 bg-emerald-950/30 text-slate-400 line-through'
                      : isCritical
                      ? 'border-amber-500/40 bg-amber-500/10 text-white'
                      : 'border-white/10 bg-slate-950/60 text-slate-100 hover:border-white/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggle(task.id)}
                    className="mt-1 h-4 w-4 shrink-0 accent-emerald-500"
                  />
                  <div className="flex-1 text-sm leading-relaxed">
                    <span>{task.label}</span>
                    {isCritical && !isDone && (
                      <span className="ml-2 inline-block rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-300">
                        Krytyczne okno
                      </span>
                    )}
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
