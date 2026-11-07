import React from 'react';
import { UserProfile } from '@/types';

export default function AboutSection({ profile }: { profile: UserProfile }) {
  return (
    <section id="about" className="border-t border-white/10 py-20 md:py-28">
      <div className="section-shell grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <div>
          <p className="eyebrow mb-4">01 / About</p>
          <h2 className="section-title max-w-sm">A systems perspective on useful software.</h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-lg leading-8 text-[#e4e3db] sm:text-xl sm:leading-9">
            I’m an Information Systems graduate from Universitas Widya Dharma Pontianak, focused on building web applications for real operational needs.
          </p>
          <p className="section-copy mt-5 text-sm sm:text-base">
            My work includes a faculty queue management system, a school portal, inventory and point-of-sale tools, and decision-support systems. I bring together requirement analysis, workflow design, and application development to make each tool fit the way people work.
          </p>
          <div className="mt-8 grid gap-5 border-t border-white/10 pt-5 text-sm sm:grid-cols-2">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[.14em] text-[#77786f]">Based in</span>
              <span className="mt-1 block text-[#d0d0c8]">{profile.location}</span>
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[.14em] text-[#77786f]">Focus</span>
              <span className="mt-1 block text-[#d0d0c8]">Web-based information systems</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
