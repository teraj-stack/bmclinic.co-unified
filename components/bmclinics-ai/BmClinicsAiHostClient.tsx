'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  BookOpen,
  Calendar,
  ExternalLink,
  Layers,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';

interface BmClinicsAiHostClientProps {
  initialRoute?: string;
}

const QUICK_ROUTES: Array<{
  route: string;
  label: string;
  icon: 'sparkles' | 'stethoscope' | 'layers' | 'activity' | 'users' | 'shield' | 'book' | 'calendar';
}> = [
  { route: '/', label: 'BMClinics.ai Start', icon: 'sparkles' },
  { route: '/diagnostyka-skory-warszawa', label: 'Diagnostyka Skóry', icon: 'stethoscope' },
  { route: '/technologie', label: '12 Technologii', icon: 'layers' },
  { route: '/wskazania', label: 'Wskazania (7)', icon: 'activity' },
  { route: '/renasculpt', label: 'RenaSculpt', icon: 'sparkles' },
  { route: '/lekarze', label: 'Lekarze (dr Gabara / dr Bujok)', icon: 'users' },
  { route: '/bezpieczenstwo-zabiegow-laserowych', label: 'Bezpieczeństwo Laserów', icon: 'shield' },
  { route: '/funkcje-offline', label: 'Funkcje & Demo Offline', icon: 'layers' },
  { route: '/blog/analiza-skory-twarzy-krok-po-kroku', label: 'Blog Estetyczny (14)', icon: 'book' },
  { route: '/demo/rezerwacja', label: 'Demo Rezerwacja / Panel', icon: 'calendar' },
];

function renderIcon(kind: (typeof QUICK_ROUTES)[number]['icon']) {
  switch (kind) {
    case 'stethoscope':
      return <Stethoscope className="h-3.5 w-3.5" />;
    case 'layers':
      return <Layers className="h-3.5 w-3.5" />;
    case 'activity':
      return <Activity className="h-3.5 w-3.5" />;
    case 'users':
      return <Users className="h-3.5 w-3.5" />;
    case 'shield':
      return <ShieldCheck className="h-3.5 w-3.5" />;
    case 'book':
      return <BookOpen className="h-3.5 w-3.5" />;
    case 'calendar':
      return <Calendar className="h-3.5 w-3.5" />;
    default:
      return <Sparkles className="h-3.5 w-3.5" />;
  }
}

export default function BmClinicsAiHostClient({ initialRoute = '/' }: BmClinicsAiHostClientProps) {
  const normalizedInit = useMemo(() => {
    const clean = initialRoute.trim();
    if (!clean || clean === '/') return '/';
    return clean.startsWith('/') ? clean : `/${clean}`;
  }, [initialRoute]);

  const [activeRoute, setActiveRoute] = useState<string>(normalizedInit);

  const iframeSrc = `/bmclinics-ai/index.html#${activeRoute}`;

  return (
    <div className="min-h-screen bg-[#070b0a] text-slate-100 px-3 py-4 sm:px-6">
      <div className="mx-auto max-w-[1440px] space-y-4">
        {/* Compact navigation bar matching :3016 header style */}
        <section className="rounded-2xl border border-amber-400/25 bg-gradient-to-r from-[#091412] via-[#0b1314] to-[#0a1118] p-4 space-y-3 aether-fresnel-top">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                Scalono z BMClinics-jeden-plik-offline-v2.html · 55 widoków
              </div>
              <h1 className="text-lg sm:text-xl font-serif text-white">
                BMClinics.ai — Medycyna Estetyczna, Diagnostyka Skóry &amp; 12 Technologii
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/medycyna-estetyczna"
                className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 transition"
              >
                ← Medycyna Estetyczna
              </Link>
              <a
                href={iframeSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-300 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-200 transition"
              >
                Otwórz pełny ekran
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {QUICK_ROUTES.map((item) => {
              const active =
                activeRoute === item.route ||
                (item.route !== '/' && activeRoute.startsWith(item.route));
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => setActiveRoute(item.route)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    active
                      ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/50'
                      : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {renderIcon(item.icon)}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Complete Self-Contained SPA Frame */}
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#faf8f4] shadow-2xl">
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title="BMClinics.ai — Pełna Platforma Estetyczna i Diagnostyczna"
            className="w-full h-[82vh] min-h-[720px] border-0"
          />
        </div>
      </div>
    </div>
  );
}
