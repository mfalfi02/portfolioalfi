'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Github, Instagram, Linkedin, Trash2 } from 'lucide-react';
import type { Project, UserProfile } from '@/types';

interface ProfileCardTestimonialCarouselProps {
  projects: Project[];
  profile: UserProfile;
  onSelectProject: (project: Project) => void;
  isAdmin: boolean;
  onDeleteProject: (id: string) => Promise<void>;
}

export function ProfileCardTestimonialCarousel({ projects, profile, onSelectProject, isAdmin, onDeleteProject }: ProfileCardTestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (projects.length === 0) return null;

  const index = Math.min(activeIndex, projects.length - 1);
  const project = projects[index];
  const external = /^https?:\/\//.test(project.image);
  const svg = project.image.toLowerCase().endsWith('.svg');
  const socialLinks = [
    { label: 'GitHub', href: profile.githubUrl, icon: Github },
    { label: 'LinkedIn', href: profile.linkedinUrl, icon: Linkedin },
    { label: 'Instagram', href: profile.instagramUrl, icon: Instagram },
  ].filter((link) => link.href);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <article key={project.id} aria-live="polite" className="profile-project-card grid overflow-hidden border border-foreground/10 bg-background md:min-h-[390px] md:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-[240px] overflow-hidden bg-surface-alt sm:min-h-[320px] md:min-h-full">
          <Image
            src={project.image}
            alt={`Interface preview: ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            unoptimized={external || svg}
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 bg-background/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.12em] text-foreground">{project.category} / {String(index + 1).padStart(2, '0')}</span>
        </div>

        <div className="flex flex-col justify-between p-5 sm:p-8 md:p-9">
          <div>
            <p className="eyebrow">Project notes</p>
            <button type="button" onClick={() => onSelectProject(project)} className="display-heading mt-4 text-left text-2xl font-medium leading-tight tracking-[-.035em] text-foreground transition-colors hover:text-accent sm:text-3xl">{project.title}</button>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-[15px]">{project.description}</p>
            <ul aria-label="Technologies used" className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[.08em] text-muted">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>

          <div className="mt-7 flex flex-col gap-5 border-t border-foreground/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-foreground/15">
                <Image src="/images/alfi-portrait.png" alt="" fill sizes="44px" className="object-cover object-[center_25%]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{profile.fullName || profile.name}</p>
                <p className="mt-0.5 text-xs text-muted">{profile.roleTitle}</p>
                <div className="mt-2 flex gap-3">
                  {socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} profile`} className="text-muted transition-colors hover:text-accent"><Icon aria-hidden="true" className="h-3.5 w-3.5" /></a>)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"><Github className="h-3.5 w-3.5" /> Source <ArrowUpRight className="h-3 w-3" /></a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"><ExternalLink className="h-3.5 w-3.5" /> Live <ArrowUpRight className="h-3 w-3" /></a>}
              {isAdmin && <button type="button" onClick={() => onDeleteProject(project.id)} aria-label={`Delete ${project.title}`} className="text-muted transition-colors hover:text-red-400"><Trash2 className="h-4 w-4" /></button>}
            </div>
          </div>
        </div>
      </article>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[.12em] text-muted">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</p>
        <div className="flex items-center gap-2" role="group" aria-label="Choose a project">
          {projects.map((item, itemIndex) => (
            <button key={item.id} type="button" onClick={() => setActiveIndex(itemIndex)} aria-label={`Show project ${itemIndex + 1}: ${item.title}`} aria-pressed={index === itemIndex} className={`h-1.5 transition-all ${index === itemIndex ? 'w-7 bg-accent' : 'w-1.5 bg-foreground/25 hover:bg-foreground/50'}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setActiveIndex(Math.max(0, index - 1))} disabled={index === 0} aria-label="Previous project" className="flex h-10 w-10 items-center justify-center border border-foreground/15 text-foreground transition-colors hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => setActiveIndex(Math.min(projects.length - 1, index + 1))} disabled={index === projects.length - 1} aria-label="Next project" className="flex h-10 w-10 items-center justify-center border border-foreground/15 text-foreground transition-colors hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-35"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
