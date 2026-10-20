import React from 'react';
import { Briefcase } from 'lucide-react';
import { EXPERIENCES } from '@/lib/data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="border-y border-white/10 bg-[#151612] py-24 md:py-32">
      <div className="section-shell max-w-5xl">
        <div className="mb-12 max-w-xl">
          <div className="eyebrow mb-4"><Briefcase className="mr-2 inline h-4 w-4" /> 03 / Experience</div>
          <h2 className="section-title">Learning by building and contributing.</h2>
        </div>
        <div className="relative border-l border-white/10">
          {EXPERIENCES.map((exp, idx) => (
            <article key={idx} className="relative grid grid-cols-1 gap-3 py-7 pl-7 md:grid-cols-[180px_1fr] md:gap-10 md:pl-10">
              <span className="absolute -left-[5px] top-9 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[#151612]" />
              <p className="pt-1 text-xs font-mono text-[var(--accent)]">{exp.period}</p>
              <div>
                <h3 className="text-lg font-medium text-white">{exp.role}</h3>
                <h4 className="mb-3 mt-1 text-sm text-[#b0b0a7]">{exp.company}</h4>
                <p className="max-w-2xl text-sm leading-7 text-[#898a81]">{exp.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
