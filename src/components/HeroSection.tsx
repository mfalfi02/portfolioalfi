import React from 'react';
import { ArrowDownRight, ArrowUpRight, FileText, Github, Instagram, Linkedin } from 'lucide-react';
import { UserProfile } from '@/types';
import ThreeHeroCanvas from '@/components/ThreeHeroCanvas';

export default function HeroSection({ profile }: { profile: UserProfile }) {
  const socialLinks = [
    { label: 'GitHub', href: profile.githubUrl, icon: Github },
    { label: 'LinkedIn', href: profile.linkedinUrl, icon: Linkedin },
    { label: 'Instagram', href: profile.instagramUrl, icon: Instagram },
  ].filter((link) => link.href);

  return (
    <section id="hero" className="scroll-mt-24 pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-36">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="mb-7 flex items-center gap-3 eyebrow">
              <span className="h-px w-8 bg-[var(--accent)]" />
              {profile.hireStatus}
            </div>
            <p className="mb-3 text-sm text-[#a4a49a]">Hello, I&apos;m</p>
            <h1 className="max-w-3xl text-[clamp(2.8rem,7vw,5.8rem)] font-medium leading-[.96] tracking-[-.065em] text-[#f1f0e9]">
              {profile.fullName || profile.name}<span className="text-[var(--accent)]">.</span>
            </h1>
            <p className="mt-5 text-lg tracking-tight text-[#d0d0c8] sm:text-xl">{profile.roleTitle}</p>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#a4a49a] sm:text-base sm:leading-8">{profile.heroBio}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#projects" className="inline-flex items-center gap-3 bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#15170f] transition-transform hover:-translate-y-0.5">
                Explore selected work <ArrowDownRight className="h-4 w-4" />
              </a>
              <a href="/cv/muhammad-fatkhul-alfi-en.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-sm font-medium text-[#f1f0e9] transition-colors hover:border-white/40">
                <FileText className="h-4 w-4" /> Resume · EN
              </a>
              <a href="/cv/muhammad-fatkhul-alfi-id.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-sm font-medium text-[#f1f0e9] transition-colors hover:border-white/40">
                <FileText className="h-4 w-4" /> Resume · ID
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs text-[#aaa99f]">
              <span>{profile.location}</span>
              <span aria-hidden="true" className="text-[#55564e]">/</span>
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} profile`} className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]">
                  <Icon className="h-3.5 w-3.5" /> {label} <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-[520px] lg:order-2 lg:max-w-none">
            <div className="overflow-hidden border border-white/10 bg-[#1b1c18]">
              <ThreeHeroCanvas />
            </div>
            <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[.16em] text-[#73746c]">Muhammad Fatkhul Alfi · Pontianak</p>
          </div>
        </div>
      </div>
    </section>
  );
}
