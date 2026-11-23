import Image from 'next/image';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react';
import type { UserProfile } from '@/types';

export default function PortfolioHero({ profile }: { profile: UserProfile }) {
  const name = profile.fullName || profile.name;
  const nameParts = name.trim().split(/\s+/);
  const finalNamePart = nameParts.pop() ?? name;
  const firstNameParts = nameParts.join(' ');
  const socialLinks = [
    { label: 'GitHub', href: profile.githubUrl, icon: Github },
    { label: 'LinkedIn', href: profile.linkedinUrl, icon: Linkedin },
    { label: 'Instagram', href: profile.instagramUrl, icon: Instagram },
  ].filter((link) => link.href);

  return (
    <section id="hero" className="portfolio-hero relative flex min-h-[min(860px,100svh)] flex-col justify-between overflow-hidden px-0 pb-7 pt-24 sm:pb-9 sm:pt-28">
      <div className="section-shell flex w-full items-center justify-between gap-4">
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          {profile.hireStatus}
        </p>
        <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[.14em] text-muted/70 sm:block">{profile.location}</p>
      </div>

      <div className="section-shell relative my-auto w-full py-12 sm:py-16">
        <h1 className="portfolio-hero-title text-center font-semibold uppercase leading-[.78] tracking-[-.09em] text-[var(--accent)]" aria-label={name}>
          {firstNameParts && <span aria-hidden="true" className="portfolio-name-line block">{firstNameParts}</span>}
          <span aria-hidden="true" className="portfolio-name-line block">{finalNamePart}</span>
        </h1>
        <div className="portfolio-portrait absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-foreground/15 bg-surface-alt">
          <Image
            src="/images/alfi-portrait.png"
            alt={`Portrait of ${name}`}
            fill
            priority
            sizes="(max-width: 640px) 78px, (max-width: 1024px) 104px, 128px"
            className="object-cover object-[center_28%] transition-transform duration-500 hover:scale-105"
          />
        </div>
        <p className="mt-7 text-center text-sm tracking-wide text-foreground/85 sm:text-base">{profile.roleTitle}</p>
      </div>

      <div className="section-shell grid w-full items-end gap-7 border-t border-foreground/10 pt-5 sm:grid-cols-[1fr_auto] sm:gap-10 sm:pt-6">
        <div className="max-w-xl">
          <p className="text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">{profile.heroBio}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[.12em] text-muted/70 sm:hidden">{profile.location}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]">
                <Icon aria-hidden="true" className="h-3.5 w-3.5" /> {label} <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <a href="#projects" className="inline-flex min-h-11 items-center gap-3 bg-[var(--accent)] px-4 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 sm:px-5">
            Explore selected work <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <a href="/cv/muhammad-fatkhul-alfi-en.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-foreground/15 px-4 text-sm font-medium text-foreground transition-colors hover:border-foreground/40">
            Resume · EN
          </a>
          <a href="/cv/muhammad-fatkhul-alfi-id.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-foreground/15 px-4 text-sm font-medium text-foreground transition-colors hover:border-foreground/40">
            Resume · ID
          </a>
        </div>
      </div>

      <a href="#about" aria-label="Scroll to about section" className="absolute bottom-[6.4rem] left-1/2 hidden -translate-x-1/2 text-muted/70 transition-colors hover:text-[var(--accent)] lg:block">
        <ArrowDown aria-hidden="true" className="h-5 w-5" />
      </a>
    </section>
  );
}
