import React from 'react';
import { UserProfile } from '@/types';

export default function Footer({ profile }: { profile: UserProfile }) {
  return (
    <footer className="border-t border-white/10 py-8 text-xs text-[#77786f]">
      <div className="section-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and a lightweight backend.
        </div>
        <div className="flex items-center gap-6 text-[#aaa99f]">
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href={profile.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
