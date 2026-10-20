import React from 'react';
import { Cpu } from 'lucide-react';
import { SKILL_CATEGORIES } from '@/lib/data';

export default function TechStackSection() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow mb-4">
            <Cpu className="w-4 h-4" /> Skills
          </div>
          <h2 className="section-title">
            Tools for building useful products.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="border-y border-white/10 py-6"
            >
              <h3 className="mb-5 flex items-center gap-3 text-lg font-medium text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                {cat.name}
              </h3>

              <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="border border-white/10 px-3 py-2 text-sm text-[#b5b5ac] transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
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
