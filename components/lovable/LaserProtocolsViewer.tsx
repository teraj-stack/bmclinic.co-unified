'use client';

import { useState } from 'react';

interface ProtocolBundle {
  id: string;
  title: string;
  subtitle: string;
  data: unknown;
}

export default function LaserProtocolsViewer({
  bundles,
}: {
  bundles: ProtocolBundle[];
}) {
  const [activeId, setActiveId] = useState(bundles[0]?.id ?? '');
  const [search, setSearch] = useState('');

  const active = bundles.find((b) => b.id === activeId) ?? bundles[0];
  const jsonString = JSON.stringify(active?.data ?? {}, null, 2);
  const filteredLines = search.trim()
    ? jsonString
        .split('\n')
        .filter((l) => l.toLowerCase().includes(search.toLowerCase()))
        .join('\n')
    : jsonString;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {bundles.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setActiveId(b.id)}
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
              activeId === b.id
                ? 'bg-emerald-600 text-white'
                : 'border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {b.title}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 text-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white">{active?.title}</h2>
            <p className="text-xs text-slate-400">{active?.subtitle}</p>
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtruj parametry / wskazania..."
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder:text-slate-500"
          />
        </div>

        <pre className="mt-4 max-h-[60vh] overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-relaxed text-emerald-300">
          {filteredLines || 'Brak pasujących wierszy.'}
        </pre>
      </div>
    </div>
  );
}
