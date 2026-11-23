import React from 'react';
import { UserProfile } from '@/types';

export default function Footer({ profile }: { profile: UserProfile }) {
  const whatsapp = profile.phone.replace(/\D/g, '');
  return (
    <footer className="border-t border-foreground/10 py-7 text-xs text-muted/70">
      <div className="section-shell flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} {profile.fullName || profile.name}<span className="mx-2 text-muted/60">/</span>Built with Next.js</div>
        <nav aria-label="Social links" className="flex flex-wrap gap-x-5 gap-y-2 text-muted">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">GitHub</a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">LinkedIn</a>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">WhatsApp</a>
          <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">Instagram</a>
        </nav>
      </div>
    </footer>
  );
}
