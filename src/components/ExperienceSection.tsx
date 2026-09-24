import React from 'react';
import { Briefcase } from 'lucide-react';
import { EXPERIENCES } from '@/lib/data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-300 text-xs font-mono tracking-[0.24em] uppercase mb-2">
            <Briefcase className="w-4 h-4" /> Experience
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            My experience and focus
          </h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-white/10">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-center ${
                idx % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border border-white/15 flex items-center justify-center z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-300" />
              </div>

              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl transition-colors hover:border-white/20">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-emerald-300">
                    {exp.period}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-3">{exp.role}</h3>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">{exp.company}</h4>
                  <p className="text-sm text-slate-400 leading-7">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
