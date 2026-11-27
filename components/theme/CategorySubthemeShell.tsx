'use client';

import { useEffect, useState } from 'react';
import type { CategorySubthemeOption } from '@/lib/categoryThemes';

interface Props {
  slug: string;
  subthemes?: CategorySubthemeOption[];
  children: React.ReactNode;
}

const STORAGE_KEY = 'bm_flebologia_subtheme_v1';

export default function CategorySubthemeShell({ slug, subthemes, children }: Props) {
  const [activeSubtheme, setActiveSubtheme] = useState<'female' | 'male'>('female');

  useEffect(() => {
    if (!subthemes || subthemes.length === 0) return;
    try {
      const params = new URLSearchParams(window.location.search);
      const urlProf = (params.get('profil') || '').toLowerCase();
      if (urlProf === 'mezczyzni' || urlProf === 'male') {
        setActiveSubtheme('male');
        localStorage.setItem(STORAGE_KEY, 'male');
        return;
      }
      if (urlProf === 'kobiety' || urlProf === 'female') {
        setActiveSubtheme('female');
        localStorage.setItem(STORAGE_KEY, 'female');
        return;
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'male' || saved === 'female') {
        setActiveSubtheme(saved);
      }
    } catch {
      // ignore storage errors in restricted environments
    }
  }, [subthemes]);

  const handleSelect = (id: 'female' | 'male') => {
    setActiveSubtheme(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
      const url = new URL(window.location.href);
      url.searchParams.set('profil', id === 'male' ? 'mezczyzni' : 'kobiety');
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore URL update failures
    }
  };

  return (
    <div
      data-category={slug}
      data-subtheme={subthemes && subthemes.length > 0 ? activeSubtheme : undefined}
      className="category-shell min-h-screen"
    >
      {subthemes && subthemes.length > 0 && (
        <div className="relative z-20 mx-auto max-w-5xl px-4 pt-5">
          <div
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-xs shadow-sm backdrop-blur-md"
            style={{
              background: 'var(--cat-card-bg)',
              border: '1px solid var(--cat-card-border)',
              color: 'var(--cat-text)',
            }}
          >
            <span className="font-medium opacity-85">
              Flebologia · dobierz tonację wizualną strefy:
            </span>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Wariant kolorystyczny flebologii">
              {subthemes.map((opt) => {
                const isActive = opt.id === activeSubtheme;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    aria-pressed={isActive}
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-semibold transition"
                    style={
                      isActive
                        ? {
                            background: 'var(--cat-cta-bg)',
                            color: 'var(--cat-cta-text)',
                            border: '1px solid transparent',
                          }
                        : {
                            background: 'var(--cat-secondary-bg)',
                            color: 'var(--cat-secondary-text)',
                            border: '1px solid var(--cat-secondary-border)',
                          }
                    }
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: opt.accent }}
                    />
                    <span>{opt.label}</span>
                    <span className="opacity-75 font-normal">({opt.paletteName})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
