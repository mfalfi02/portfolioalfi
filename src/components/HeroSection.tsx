import React from 'react';
import { ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react';
import { UserProfile } from '@/types';
import ThreeHeroCanvas from '@/components/ThreeHeroCanvas';

export default function HeroSection({ profile }: { profile: UserProfile }) {
  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="section-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-20">
          <div className="order-2 space-y-7 lg:order-1">
            <div className="flex items-center gap-3 eyebrow">
              <span className="h-px w-8 bg-[var(--accent)]" /> {profile.hireStatus}
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-[#a4a49a]">Hello, I&apos;m</p>
              <h1 className="max-w-3xl text-5xl font-medium leading-[.98] tracking-[-.065em] text-[#f1f0e9] sm:text-6xl md:text-7xl xl:text-[5.8rem]">
                {profile.fullName || profile.name}<span className="text-[var(--accent)]">.</span>
              </h1>
              <p className="mt-6 text-xl tracking-tight text-[#d0d0c8] sm:text-2xl">{profile.roleTitle}</p>
            </div>
            <p className="max-w-xl text-[15px] leading-7 text-[#a4a49a] sm:text-base sm:leading-8">{profile.heroBio}</p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href="#projects" className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#15170f] transition-transform hover:-translate-y-0.5">
                Explore my work <ArrowDownRight className="h-4 w-4" />
              </a>
              <a href="/cv/muhammad-fatkhul-alfi.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-[#f1f0e9] transition-colors hover:border-white/40">
                <FileText className="h-4 w-4" /> View résumé
              </a>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-[#a4a49a]">
              <span><span className="mr-2 text-[#f1f0e9]">{profile.projectsCompleted}</span> selected projects</span>
              <span><span className="mr-2 text-[#f1f0e9]">{profile.location}</span></span>
            </div>
          </div>
          <div className="order-1 relative mx-auto w-full max-w-[460px] lg:order-2 lg:max-w-none">
            <div className="absolute -right-3 -top-3 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-[#15170f] sm:-right-5 sm:-top-5">
              <ArrowUpRight className="h-6 w-6" />
            </div>
            <div className="overflow-hidden rounded-[2px] border border-white/10 bg-[#1b1c18]">
              <ThreeHeroCanvas />
            </div>
            <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[.16em] text-[#73746c]">Based in {profile.location.split(',')[0]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
