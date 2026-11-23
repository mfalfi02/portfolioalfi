import React from 'react';
import { SKILL_CATEGORIES } from '@/lib/data';

export default function TechStackSection() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="section-shell">
        <div className="mb-12 grid gap-6 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
            <h2 className="section-title">Tools I work with.</h2>
          </div>
          <p className="section-copy max-w-xl text-sm">
            A practical mix of application development, data, and design tools used across my projects and studies.
          </p>
        </div>

        <div className="border-t border-foreground/10">
          {SKILL_CATEGORIES.map((category, index) => (
            <div key={category.name} className="grid gap-4 border-b border-foreground/10 py-6 md:grid-cols-[150px_1fr] md:gap-10 md:py-7">
              <h3 className="font-mono text-xs uppercase tracking-[.08em] text-muted">0{index + 1} &nbsp; {category.name}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="group/skill inline-flex min-h-10 items-center gap-2.5 border border-foreground/10 px-3 text-sm text-foreground/90 transition-colors hover:border-foreground/30 hover:text-foreground">
                    <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center border border-foreground/10 font-mono text-[9px] text-muted/80 transition-colors group-hover/skill:border-[var(--accent)]/50 group-hover/skill:text-[var(--accent)]">{skill.name.slice(0, 1)}</span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
