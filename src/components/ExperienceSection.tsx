import React from 'react';

const background = [
  {
    period: '2022 — 2026',
    title: 'Bachelor of Information Systems',
    place: 'Universitas Widya Dharma Pontianak',
    detail: 'GPA 3.30 / 4.00',
  },
  {
    period: '2017 — 2020',
    title: 'Islamic Studies',
    place: 'MSU Imam Syafi’i Tulungagung',
    detail: '',
  },
  {
    period: '1 year',
    title: 'Active Member & Core Committee',
    place: 'Faculty of Information Technology Student Senate',
    detail: 'Supported student programs, a campus coding competition, event hosting, and documentation.',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="border-y border-white/10 bg-[#151612] py-24 md:py-32">
      <div className="section-shell">
        <div className="mb-12 grid gap-6 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
            <p className="eyebrow mb-4">04 / Background</p>
            <h2 className="section-title">Education &amp; involvement.</h2>
          </div>
          <p className="section-copy max-w-xl text-sm">
            My training in Information Systems combines software development with an understanding of how people and organizations work.
          </p>
        </div>

        <div className="border-t border-white/10">
          {background.map((item) => (
            <article key={`${item.title}-${item.period}`} className="grid gap-3 border-b border-white/10 py-6 md:grid-cols-[150px_1fr] md:gap-10 md:py-7">
              <p className="font-mono text-xs text-[var(--accent)]">{item.period}</p>
              <div className="grid gap-2 md:grid-cols-[.9fr_1.1fr] md:gap-8">
                <div>
                  <h3 className="text-base font-medium text-white sm:text-lg">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#a4a49a]">{item.place}</p>
                </div>
                  {item.detail && <p className="text-sm leading-7 text-[#898a81]">{item.detail}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
