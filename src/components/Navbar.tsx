'use client';

import React, { useEffect, useState } from 'react';
import { Code2, Lock, Menu, Moon, Settings, Sun, Unlock, X } from 'lucide-react';
import { UserProfile } from '@/types';
import { usePortfolioControls } from '@/components/PortfolioControls';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Background' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ profile }: { profile: UserProfile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const { isAdmin, onOpenAdminLogin, onOpenAdminDashboard, onLogoutAdmin } = usePortfolioControls();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    const nextTheme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('portfolio-theme', nextTheme);
  };

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((section) => section.classList.add('reveal-pending'));
    }
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
      entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('reveal-visible');
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.15, 0.4, 0.7] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur-md">
      <div className="section-shell flex min-h-[72px] items-center justify-between gap-5">
        <a href="#hero" onClick={closeMenu} className="group flex min-w-0 items-center gap-3" aria-label={`${profile.fullName}, home`}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--accent)] text-accent-foreground transition-transform group-hover:-rotate-6">
            <Code2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">{profile.fullName || profile.name}</span>
            <span className="mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[.13em] text-muted/80">{profile.roleTitle}</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-[13px] text-muted lg:flex">
          {links.map((link) => <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined} className={`nav-link transition-colors hover:text-foreground ${activeSection === link.href.slice(1) ? 'is-active' : ''}`}>{link.label}</a>)}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} aria-pressed={theme === 'light'} className="flex h-9 w-9 items-center justify-center border border-foreground/15 text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground">
            {theme === 'dark' ? <Sun aria-hidden="true" className="h-4 w-4" /> : <Moon aria-hidden="true" className="h-4 w-4" />}
          </button>
          {isAdmin ? (
            <>
              <button onClick={onOpenAdminDashboard} className="hidden items-center gap-2 border border-foreground/15 px-3 py-2 text-xs text-foreground transition-colors hover:border-[var(--accent)] sm:inline-flex">
                <Settings className="h-3.5 w-3.5" /> Manage
              </button>
              <button onClick={onLogoutAdmin} aria-label="Exit admin mode" className="flex h-9 w-9 items-center justify-center border border-foreground/15 text-foreground/85 transition-colors hover:text-foreground">
                <Unlock className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button onClick={onOpenAdminLogin} aria-label="Admin access" className="flex h-9 w-9 items-center justify-center border border-foreground/15 text-muted/70 transition-colors hover:border-foreground/40 hover:text-foreground">
              <Lock className="h-4 w-4" />
            </button>
          )}
          <a href="#contact" className="hidden bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-accent-foreground transition-colors hover:opacity-90 lg:inline-flex">Let&apos;s talk</a>
          <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className="flex h-9 w-9 items-center justify-center border border-foreground/15 text-foreground lg:hidden">
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-foreground/10 bg-background px-6 py-3 lg:hidden">
          {links.map((link, index) => (
            <a key={link.href} href={link.href} onClick={closeMenu} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined} className={`flex items-center gap-4 border-b border-foreground/10 py-3.5 text-sm last:border-0 ${activeSection === link.href.slice(1) ? 'text-[var(--accent)]' : 'text-foreground/85'}`}>
              <span className="font-mono text-[10px] text-[var(--accent)]">0{index + 1}</span>{link.label}
            </a>
          ))}
          <a href="#contact" onClick={closeMenu} className="mt-3 inline-flex bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-accent-foreground">Let&apos;s talk</a>
        </nav>
      )}
    </header>
  );
}
