'use client';

import React, { useState, useEffect } from 'react';
import { Code2, Settings, Unlock, Lock } from 'lucide-react';
import { UserProfile } from '@/types';

interface NavbarProps {
  profile: UserProfile;
  isAdmin: boolean;
  onOpenAdminLogin: () => void;
  onOpenAdminDashboard: () => void;
  onLogoutAdmin: () => void;
}

export default function Navbar({
  profile,
  isAdmin,
  onOpenAdminLogin,
  onOpenAdminDashboard,
  onLogoutAdmin,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/75 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center transition-colors group-hover:bg-white/10">
            <Code2 className="w-5 h-5 text-cyan-300 transition-colors group-hover:text-fuchsia-300" />
          </div>
          <div>
            <span className="text-white font-semibold tracking-tight text-lg block">{profile.name}</span>
            <span className="text-[10px] text-slate-400 font-mono tracking-[0.25em] uppercase block -mt-1">
              Web Developer
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-cyan-200 transition-colors">About</a>
          <a href="#projects" className="hover:text-cyan-200 transition-colors">Portfolio</a>
          <a href="#skills" className="hover:text-violet-200 transition-colors">Skills</a>
          <a href="#experience" className="hover:text-fuchsia-200 transition-colors">Experience</a>
          <a href="#contact" className="hover:text-amber-200 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
              >
                <Settings className="w-3.5 h-3.5" /> Dashboard
              </button>
              <button
                onClick={onLogoutAdmin}
                title="Exit admin mode"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Unlock className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              title="Admin access"
              className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-cyan-300 to-violet-300 px-4 py-2 text-xs font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-400/20"
          >
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}
