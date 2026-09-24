import React from 'react';
import { ChevronRight, Terminal } from 'lucide-react';
import { UserProfile } from '@/types';
import ThreeHeroCanvas from '@/components/ThreeHeroCanvas';

export default function HeroSection({ profile }: { profile: UserProfile }) {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-[150px] pointer-events-none" />
      <div className="absolute right-0 top-1/4 h-[360px] w-[360px] rounded-full bg-cyan-400/15 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-gradient-to-r from-cyan-300/10 via-violet-300/10 to-fuchsia-300/10 px-4 py-2 text-xs font-medium text-slate-100 shadow-lg shadow-cyan-950/20">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-lime-300 to-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              {profile.hireStatus}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.05]">
              <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">Portfolio</span>
              <br />
            
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-8">
              Hello, I&apos;m <span className="text-white font-medium">{profile.name}</span>. {profile.heroBio}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-violet-300 px-6 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition-all hover:-translate-y-1 hover:shadow-cyan-400/20"
              >
                View projects <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition-all hover:-translate-y-1 hover:border-fuchsia-200/50 hover:bg-fuchsia-300/10"
              >
                <Terminal className="w-4 h-4 text-emerald-300" /> Discuss a project
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto border-t border-white/10 lg:mx-0">
              <div>
                <span className="block bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl">{profile.yearsExp}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Years</span>
              </div>
              <div>
                <span className="block bg-gradient-to-r from-violet-200 to-fuchsia-300 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl">{profile.projectsCompleted}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Projects</span>
              </div>
              <div>
                <span className="block bg-gradient-to-r from-amber-200 to-rose-300 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl">{profile.performanceScore}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Focus</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-gradient-to-br from-cyan-300/10 via-violet-300/5 to-fuchsia-300/10 p-2 shadow-[0_30px_100px_-35px_rgba(34,211,238,0.28)] backdrop-blur-xl float-soft">
              <ThreeHeroCanvas />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
