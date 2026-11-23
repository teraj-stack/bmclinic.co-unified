'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface AestheticTech {
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  mechanism: string;
  applicators?: string[];
  indications?: string[];
  pricing?: { label: string; price: number | null; note?: string }[];
}

const CATEGORIES = [
  { id: 'wszystkie', label: 'Wszystkie (11)' },
  { id: 'twarz', label: 'Twarz' },
  { id: 'skóra', label: 'Skóra i lasery' },
  { id: 'modelowanie', label: 'Modelowanie i PBM' },
];

export default function AestheticTechnologiesClient({
  technologies,
}: {
  technologies: AestheticTech[];
}) {
  const [activeCat, setActiveCat] = useState('wszystkie');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    activeCat === 'wszystkie'
      ? technologies
      : technologies.filter((t) => t.category === activeCat);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCat(cat.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCat === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tech) => {
          const isOpen = expanded === tech.slug;
          return (
            <article
              key={tech.slug}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-lg backdrop-blur"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                    {tech.category}
                  </span>
                  <span className="text-xs text-slate-400">glow-medspa-hub</span>
                </div>

                <h2 className="text-lg font-semibold leading-snug text-white whitespace-pre-line">
                  {tech.name}
                </h2>
                <p className="text-sm text-slate-300">{tech.shortDesc}</p>

                {tech.indications && tech.indications.length > 0 && (
                  <ul className="space-y-1 pt-1 text-xs text-slate-300">
                    {tech.indications.slice(0, isOpen ? 10 : 3).map((ind, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {isOpen && (
                  <div className="space-y-3 border-t border-white/10 pt-3 text-xs text-slate-300">
                    <div>
                      <p className="font-semibold text-amber-300">Mechanizm działania:</p>
                      <p className="mt-1 leading-relaxed">{tech.mechanism}</p>
                    </div>
                    {tech.pricing && tech.pricing.length > 0 && (
                      <div>
                        <p className="font-semibold text-amber-300">Orientacyjny cennik:</p>
                        <ul className="mt-1 space-y-1">
                          {tech.pricing.slice(0, 5).map((p, idx) => (
                            <li key={idx} className="flex justify-between gap-2">
                              <span>{p.label}</span>
                              <span className="font-medium text-white">
                                {p.price ? `${p.price} zł` : p.note || 'wycena ind.'}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : tech.slug)}
                  className="text-xs font-medium text-amber-300 hover:text-amber-200"
                >
                  {isOpen ? 'Zwiń szczegóły' : 'Mechanizm i cennik →'}
                </button>
                <Link
                  href="/rezerwacja"
                  className="rounded-lg bg-amber-500/90 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-amber-400"
                >
                  Umów konsultację
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
