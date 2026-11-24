'use client';

import { useState } from 'react';
import {
  UI_LIBRARIES,
  MOBILE_LAYOUTS,
  buildCombinedPrompt,
  type UIThemeLibrary,
  type ButtonVariantSpec,
  type MobileLayoutSpec,
} from '@/lib/designLibraryData';
import {
  Smartphone,
  Copy,
  Check,
  Palette,
  LayoutGrid,
  MousePointerClick,
  Sparkles,
  Calendar,
  Phone,
  Clock,
  ShieldCheck,
  ChevronRight,
  Cpu,
} from 'lucide-react';

export default function MobileDesignStudioClient() {
  const [selectedLibId, setSelectedLibId] = useState<string>(UI_LIBRARIES[0].id);
  const [selectedLayoutId, setSelectedLayoutId] = useState<MobileLayoutSpec['id']>('hero-cta');
  const [selectedBtnId, setSelectedBtnId] = useState<ButtonVariantSpec['id']>('primary');
  const [copied, setCopied] = useState(false);

  const lib: UIThemeLibrary =
    UI_LIBRARIES.find((l) => l.id === selectedLibId) || UI_LIBRARIES[0];
  const layout: MobileLayoutSpec =
    MOBILE_LAYOUTS.find((m) => m.id === selectedLayoutId) || MOBILE_LAYOUTS[0];
  const activeBtn: ButtonVariantSpec =
    lib.buttons.find((b) => b.id === selectedBtnId) || lib.buttons[0];

  const promptText = buildCombinedPrompt(lib, activeBtn, layout);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const renderStyledButton = (btn: ButtonVariantSpec, text: string, fullWidth = false) => (
    <button
      type="button"
      onClick={() => setSelectedBtnId(btn.id)}
      style={{
        background: btn.bg,
        color: btn.text,
        border: btn.border,
        boxShadow: btn.shadow,
        borderRadius: lib.radius,
        width: fullWidth ? '100%' : undefined,
      }}
      className="px-4 py-2.5 text-xs font-semibold transition-opacity duration-150 hover:opacity-90 active:opacity-80 cursor-pointer"
    >
      {text}
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8">
      {/* Header */}
      <section className="rounded-3xl border border-white/10 bg-slate-950/85 p-6 sm:p-8 text-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              BM Clinics · Mobile UI & Prompt Library
            </span>
            <h1 className="font-[family-name:var(--font-fraunces)] text-2xl sm:text-4xl font-semibold">
              10 Bibliotek UI na Telefony · 4 Przyciski · 4 Układy · Gotowe Prompty
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Wybierz motyw kolorystyczny, styl przycisku i układ mobilny — zobaczysz od razu efekt na ekranie
              smartfona oraz gotowy prompt do wklejenia w generatorze graficznym lub modelu AI. Ergonomiczne
              przyciski bez „galarety” i męczących animacji.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs text-slate-400">
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-amber-300">
              Next.js 15 · React 19 · Tailwind v4
            </span>
            <span>Mobile-first 390px · WCAG & kciuk 44–48px</span>
          </div>
        </div>
      </section>

      {/* Main 2-column Studio */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: 10 Libraries Selector */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Palette className="h-4 w-4 text-amber-400" />
              10 Podstawowych Bibliotek
            </h2>
            <span className="text-xs text-slate-400">Kliknij, aby przełączyć</span>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {UI_LIBRARIES.map((item) => {
              const isSelected = item.id === lib.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedLibId(item.id)}
                  className={`w-full text-left rounded-2xl border p-3.5 transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'border-amber-400/70 bg-slate-900 shadow-lg ring-1 ring-amber-400/30'
                      : 'border-white/10 bg-slate-950/70 hover:border-white/25 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-amber-300">
                        {item.number}
                      </span>
                      <span className="font-semibold text-sm text-white">{item.name}</span>
                    </div>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                      {item.trendTag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-1">{item.tagline}</p>
                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {[item.palette.bg, item.palette.surface, item.palette.accent, item.palette.text].map(
                        (c, idx) => (
                          <span
                            key={idx}
                            className="h-4 w-4 rounded-full border border-white/25"
                            style={{ background: c }}
                            title={c}
                          />
                        )
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 truncate max-w-[190px]">{item.bestFor}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Mobile Frame + Controls + Live Prompt */}
        <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-20">
          {/* Layout & Button Selectors */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 space-y-5">
            {/* 4 Mobile Layouts */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-amber-400" />
                Wybierz układ na telefon (4 standardy)
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {MOBILE_LAYOUTS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedLayoutId(m.id)}
                    className={`rounded-xl border px-3 py-2.5 text-left transition cursor-pointer ${
                      m.id === layout.id
                        ? 'border-amber-400/70 bg-amber-500/15 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-semibold">{m.label}</div>
                    <div className="text-[11px] opacity-75 mt-0.5 line-clamp-1">{m.shortDesc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Button Variants */}
            <div className="space-y-2.5 pt-3 border-t border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <MousePointerClick className="h-4 w-4 text-amber-400" />
                4 rodzaje przycisków w bibliotece „{lib.name}”
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {lib.buttons.map((b) => {
                  const isSel = b.id === activeBtn.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBtnId(b.id)}
                      className={`rounded-xl border p-3 cursor-pointer transition ${
                        isSel
                          ? 'border-amber-400/70 bg-white/10'
                          : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-white">{b.label}</span>
                        <span className="text-[10px] text-slate-400">{b.usage}</span>
                      </div>
                      <div
                        className="rounded-lg p-2.5 flex justify-center"
                        style={{ background: lib.palette.bg }}
                      >
                        {renderStyledButton(b, 'Umów wizytę', true)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Phone Preview + Prompt side by side on wide / stacked on narrow */}
          <div className="grid gap-6 md:grid-cols-12 items-start">
            {/* Phone Frame */}
            <div className="md:col-span-6 flex justify-center">
              <div
                className="w-[310px] rounded-[36px] border-[6px] border-slate-800 shadow-2xl overflow-hidden flex flex-col"
                style={{ background: lib.palette.bg, color: lib.palette.text }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pt-3 pb-2 text-[10px] font-semibold opacity-75">
                  <span>09:41</span>
                  <span className="h-4 w-20 rounded-full bg-black/50" />
                  <span>5G · 100%</span>
                </div>

                {/* Screen body */}
                <div className="px-4 pb-5 pt-2 space-y-3.5 min-h-[430px] flex flex-col justify-between">
                  {layout.id === 'hero-cta' && (
                    <>
                      <div className="space-y-2.5">
                        <span
                          className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                          style={{ background: lib.palette.accentSoft, color: lib.palette.accent }}
                        >
                          BM Clinics · Wilanów
                        </span>
                        <h3 className="text-xl font-bold leading-snug">
                          Spokojna konsultacja proktologiczna
                        </h3>
                        <p className="text-xs leading-relaxed" style={{ color: lib.palette.muted }}>
                          Delikatne badanie w pozycji bocznej, jasny plan leczenia i zabiegi 1-dnia bez stresu.
                        </p>
                      </div>

                      <div
                        className="rounded-2xl p-3 space-y-2 border text-xs"
                        style={{ background: lib.palette.surface, borderColor: lib.palette.border }}
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-3.5 w-3.5 shrink-0" style={{ color: lib.palette.accent }} />
                          <span>Pełna dyskrecja · bez skierowania</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: lib.palette.accent }} />
                          <span>Konsultacja 30 min · od 250 zł</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-1">
                        {renderStyledButton(activeBtn, 'Umów wizytę online', true)}
                        {renderStyledButton(lib.buttons[1], 'Zadzwoń: +48 510 432 361', true)}
                      </div>
                    </>
                  )}

                  {layout.id === 'bento-2x2' && (
                    <>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: lib.palette.accent }}>
                          Specjalizacje
                        </span>
                        <h3 className="text-lg font-bold">Wybierz strefę opieki</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { name: 'Proktologia', sub: 'Hemoroidy · LHP' },
                          { name: 'Flebologia', sub: 'Żylaki · USG' },
                          { name: 'Estetyka', sub: 'Plazma · Laser' },
                          { name: 'Chirurgia', sub: 'Zabiegi 1-dnia' },
                        ].map((tile) => (
                          <div
                            key={tile.name}
                            className="p-3 border space-y-1"
                            style={{
                              background: lib.palette.surface,
                              borderColor: lib.palette.border,
                              borderRadius: lib.radius,
                            }}
                          >
                            <div className="text-xs font-bold">{tile.name}</div>
                            <div className="text-[10px]" style={{ color: lib.palette.muted }}>
                              {tile.sub}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        {renderStyledButton(activeBtn, 'Przejdź do rezerwacji', true)}
                      </div>
                    </>
                  )}

                  {layout.id === 'service-list' && (
                    <>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">Cennik · Proktologia</h3>
                        <p className="text-[11px]" style={{ color: lib.palette.muted }}>
                          Przejrzyste ceny przed wizytą
                        </p>
                      </div>

                      <div className="space-y-2">
                        {[
                          { name: 'Konsultacja proktologiczna', time: '30 min', price: '250 zł' },
                          { name: 'Anoskopia diagnostyczna', time: '20 min', price: '350 zł' },
                          { name: 'Leczenie hemoroidów', time: '45 min', price: '800 zł' },
                        ].map((srv) => (
                          <div
                            key={srv.name}
                            className="p-3 border flex items-center justify-between gap-2"
                            style={{
                              background: lib.palette.surface,
                              borderColor: lib.palette.border,
                              borderRadius: lib.radius,
                            }}
                          >
                            <div>
                              <div className="text-xs font-semibold leading-tight">{srv.name}</div>
                              <div className="text-[10px] mt-0.5" style={{ color: lib.palette.muted }}>
                                {srv.time}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-xs font-bold" style={{ color: lib.palette.accent }}>
                                {srv.price}
                              </div>
                              <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-60" />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>{renderStyledButton(activeBtn, 'Zarezerwuj termin', true)}</div>
                    </>
                  )}

                  {layout.id === 'patient-card' && (
                    <>
                      <div
                        className="p-3.5 border space-y-2"
                        style={{
                          background: lib.palette.surface,
                          borderColor: lib.palette.border,
                          borderRadius: lib.radius,
                        }}
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold" style={{ color: lib.palette.accent }}>
                          <span>TWOJA WIZYTA</span>
                          <span>JUTRO · 11:30</span>
                        </div>
                        <div className="text-sm font-bold">dr Jan Bujok · Proktologia</div>
                        <div className="text-[11px]" style={{ color: lib.palette.muted }}>
                          ul. Branickiego 10/U6 · Bezpłatny parking
                        </div>
                      </div>

                      <div className="space-y-2 text-[11px]">
                        <div className="font-bold opacity-85">Przygotowanie (3 kroki):</div>
                        {['1. Standardowa higiena miejscowa', '2. Nie musisz być na czczo', '3. Zabierz listę przyjmowanych leków'].map(
                          (st) => (
                            <div
                              key={st}
                              className="px-3 py-2 border"
                              style={{
                                background: lib.palette.surfaceAlt,
                                borderColor: lib.palette.border,
                                borderRadius: lib.radius,
                              }}
                            >
                              {st}
                            </div>
                          )
                        )}
                      </div>

                      {/* Sticky bottom bar */}
                      <div
                        className="mt-2 pt-2.5 border-t flex items-center gap-2"
                        style={{ borderColor: lib.palette.border }}
                      >
                        <div className="flex-1">{renderStyledButton(activeBtn, 'Potwierdź wizytę', true)}</div>
                        <button
                          type="button"
                          style={{
                            background: lib.palette.surfaceAlt,
                            color: lib.palette.text,
                            border: `1px solid ${lib.palette.border}`,
                            borderRadius: lib.radius,
                          }}
                          className="p-2.5"
                          title="Zadzwoń"
                        >
                          <Phone className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Associated AI Prompt Box */}
            <div className="md:col-span-6 rounded-2xl border border-amber-400/30 bg-slate-950/90 p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4" />
                  Gotowy Prompt (1 klik)
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Skopiowano!' : 'Kopiuj prompt'}
                </button>
              </div>

              <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-black/50 p-3.5 text-[11.5px] leading-relaxed text-slate-200 font-mono max-h-[340px] overflow-y-auto">
                {promptText}
              </pre>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Każda zmiana biblioteki, przycisku lub układu na żywo aktualizuje ten prompt — wklejasz go prosto
                do modelu graficznego / AI, aby generować spójne ekrany kliniki.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brief 2026: Next.js / React Rendering + Modern 3D Web Tools */}
      <section className="rounded-3xl border border-white/10 bg-slate-950/85 p-6 sm:p-8 text-white space-y-5">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest">
          <Cpu className="h-4 w-4" />
          Brief Technologiczny · Next.js / React & Nowoczesne 3D w przeglądarce
        </div>
        <div className="grid gap-4 md:grid-cols-3 text-xs leading-relaxed text-slate-300">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="text-sm font-bold text-white">1. Renderowanie Next.js + React 19</h3>
            <p>
              <strong>React Server Components (RSC)</strong> + <strong>Streaming / Partial Prerendering</strong>{' '}
              ładują szkielet strony błyskawicznie z serwera, a przeglądarka pobiera JavaScript tylko dla
              interaktywnych wysp (np. formularza rezerwacji czy suwaka). Zero przeładowań między podstronami.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="text-sm font-bold text-white">2. WebGPU + WGSL & Rust/WASM w 3D</h3>
            <p>
              Następca WebGL: <strong>WebGPU</strong> z nowym językiem shaderów <strong>WGSL</strong> daje
              bezpośredni dostęp do GPU (w tym Apple Silicon) — 3–5× płynniejsze sceny 3D i mniejsze obciążenie
              baterii telefonu. W ciężkiej geometrii CAD/medycznej coraz częściej używa się też{' '}
              <strong>Rust + WebAssembly</strong> oraz <strong>React Three Fiber</strong>.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
            <h3 className="text-sm font-bold text-white">3. 3D Gaussian Splatting & Rive</h3>
            <p>
              <strong>3D Gaussian Splatting (3DGS)</strong> pozwala skanować prawdziwy gabinet lub tkankę telefonem
              i wyświetlać fotorealistyczne 3D w 60 FPS w przeglądarce. Do lekkich animacji UI/ikon (zamiast
              ciężkich wideo) standardem na telefony stało się <strong>Rive</strong> i <strong>Spline</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
