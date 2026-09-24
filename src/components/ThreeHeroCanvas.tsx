'use client';

import React from 'react';
import Image from 'next/image';

/** Temporary portrait while the 3D model is unavailable for deployment. */
export default function ThreeHeroCanvas() {
  return (
    <div className="relative flex h-[480px] w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-slate-950/40 md:h-[580px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12),transparent_68%)]" />

      <div className="relative h-[92%] max-h-[560px] w-auto max-w-[88%] overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-[0_30px_90px_-24px_rgba(0,0,0,0.8)] [transform:perspective(1200px)_rotateY(-5deg)_rotateX(2deg)] transition-transform duration-500 hover:[transform:perspective(1200px)_rotateY(0deg)_rotateX(0deg)]">
        <Image
          src="/images/alfi-portrait.png"
          alt="Foto profil Alfi"
          width={1696}
          height={2528}
          priority
          sizes="(max-width: 768px) 88vw, 540px"
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-slate-950/80 px-4 py-1.5 text-xs text-slate-300 shadow-lg backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
        Muhammad Alfi
      </div>
    </div>
  );
}
