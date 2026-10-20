'use client';

import React from 'react';
import Image from 'next/image';

/** Temporary portrait while the 3D model is unavailable for deployment. */
export default function ThreeHeroCanvas() {
  return (
    <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden bg-[#1b1c18] sm:h-[500px] md:h-[560px]">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(200,241,105,.08),transparent_42%)]" />

      <div className="relative h-full w-full overflow-hidden">
        <Image
          src="/images/alfi-portrait.png"
          alt="Foto profil Alfi"
          width={1696}
          height={2528}
          priority
          sizes="(max-width: 768px) 88vw, 540px"
          className="h-full w-full object-cover object-[center_30%]"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#10110f]/60 to-transparent" />
    </div>
  );
}
