import React from 'react';
import { SKILL_CATEGORIES } from '@/lib/data';

export default function TechStackSection() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="section-shell">
        <div className="mb-12 grid gap-6 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
            <p className="eyebrow mb-4">03 / Toolkit</p>
            <h2 className="section-title">Tools I work with.</h2>
          </div>
          <p className="section-copy max-w-xl text-sm">
            A practical mix of application development, data, and design tools used across my projects and studies.
          </p>
        </div>

        <div className="border-t border-white/10">
          {SKILL_CATEGORIES.map((category, index) => (
            <div key={category.name} className="grid gap-4 border-b border-white/10 py-6 md:grid-cols-[150px_1fr] md:gap-10 md:py-7">
              <h3 className="font-mono text-xs uppercase tracking-[.08em] text-[#a4a49a]">0{index + 1} &nbsp; {category.name}</h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="text-sm text-[#e2e1d9] transition-colors hover:text-[var(--accent)]">{skill.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
