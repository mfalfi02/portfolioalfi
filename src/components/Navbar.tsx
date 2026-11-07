'use client';

import React, { useState } from 'react';
import { Code2, Lock, Menu, Settings, Unlock, X } from 'lucide-react';
import { UserProfile } from '@/types';
import { usePortfolioControls } from '@/components/PortfolioControls';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Background' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ profile }: { profile: UserProfile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAdmin, onOpenAdminLogin, onOpenAdminDashboard, onLogoutAdmin } = usePortfolioControls();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#10110f]/90 backdrop-blur-md">
      <div className="section-shell flex min-h-[72px] items-center justify-between gap-5">
        <a href="#hero" onClick={closeMenu} className="group flex min-w-0 items-center gap-3" aria-label={`${profile.fullName}, home`}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--accent)] text-[#15170f] transition-transform group-hover:-rotate-6">
            <Code2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-tight text-white sm:text-base">{profile.fullName || profile.name}</span>
            <span className="mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[.13em] text-[#898a81]">{profile.roleTitle}</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-[13px] text-[#aaa99f] md:flex">
          {links.map((link) => <a key={link.href} href={link.href} className="transition-colors hover:text-white">{link.label}</a>)}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {isAdmin ? (
            <>
              <button onClick={onOpenAdminDashboard} className="hidden items-center gap-2 border border-white/15 px-3 py-2 text-xs text-white transition-colors hover:border-[var(--accent)] sm:inline-flex">
                <Settings className="h-3.5 w-3.5" /> Manage
              </button>
              <button onClick={onLogoutAdmin} aria-label="Exit admin mode" className="flex h-9 w-9 items-center justify-center border border-white/15 text-[#c9c9c1] transition-colors hover:text-white">
                <Unlock className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button onClick={onOpenAdminLogin} aria-label="Admin access" className="flex h-9 w-9 items-center justify-center border border-white/15 text-[#77786f] transition-colors hover:border-white/40 hover:text-white">
              <Lock className="h-4 w-4" />
            </button>
          )}
          <a href="#contact" className="hidden bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-[#15170f] transition-colors hover:bg-[#d6f993] sm:inline-flex">Let&apos;s talk</a>
          <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className="flex h-9 w-9 items-center justify-center border border-white/15 text-white md:hidden">
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-white/10 bg-[#10110f] px-6 py-3 md:hidden">
          {links.map((link, index) => (
            <a key={link.href} href={link.href} onClick={closeMenu} className="flex items-center gap-4 border-b border-white/10 py-3.5 text-sm text-[#d0d0c8] last:border-0">
              <span className="font-mono text-[10px] text-[var(--accent)]">0{index + 1}</span>{link.label}
            </a>
          ))}
          <a href="#contact" onClick={closeMenu} className="mt-3 inline-flex bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-[#15170f]">Let&apos;s talk</a>
        </nav>
      )}
    </header>
  );
}
