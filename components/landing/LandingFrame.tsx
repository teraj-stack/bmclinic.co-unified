import React from 'react';
import Link from 'next/link';

interface LandingFrameProps {
  title: string;
  src: string;
  badge: string;
}

export default function LandingFrame({ title, src, badge }: LandingFrameProps) {
  return (
    <div className="min-h-screen bg-[#06090b] text-slate-100">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-300">
            {badge}
          </span>
          <strong className="font-serif text-sm text-white">{title}</strong>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/mapa-strony" className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10">
            Mapa w segmentach
          </Link>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-amber-300 px-3 py-1.5 font-bold text-slate-950 hover:bg-amber-200"
          >
            Otwórz pełny ekran ↗
          </a>
        </div>
      </div>
      <iframe
        src={src}
        title={title}
        className="w-full h-[calc(100vh-52px)] min-h-[720px] border-0 bg-[#05070a]"
      />
    </div>
  );
}
