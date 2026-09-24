import React from 'react';
import { Cpu } from 'lucide-react';
import { SKILL_CATEGORIES } from '@/lib/data';

export default function TechStackSection() {
  return (
    <section id="skills" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-300 text-xs font-mono tracking-[0.24em] uppercase mb-2">
            <Cpu className="w-4 h-4" /> Skills
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            The tech stack I use to build real-world products
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className={`group rounded-[1.75rem] border bg-gradient-to-br p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 ${[
                'border-cyan-200/15 from-cyan-300/[0.08] to-blue-500/[0.02] hover:border-cyan-200/35',
                'border-fuchsia-200/15 from-fuchsia-300/[0.08] to-violet-500/[0.02] hover:border-fuchsia-200/35',
                'border-amber-200/15 from-amber-300/[0.08] to-rose-500/[0.02] hover:border-amber-200/35',
                'border-emerald-200/15 from-emerald-300/[0.08] to-teal-500/[0.02] hover:border-emerald-200/35',
              ][idx % 4]}`}
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300 shadow-[0_0_12px_rgba(103,232,249,0.45)]" />
                {cat.name}
              </h3>

              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 text-sm text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/10 hover:text-cyan-100"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
