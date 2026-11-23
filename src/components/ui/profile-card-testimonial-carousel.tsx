'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react';
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
  const trackRef = useRef<HTMLUListElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startScroll: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateScrollState = () => {
      setCanScrollLeft(track.scrollLeft > 4);
      setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
    };

    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(track);
    return () => {
      track.removeEventListener('scroll', updateScrollState);
      resizeObserver.disconnect();
    };
  }, [projects.length]);

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction === 'left' ? -track.clientWidth * 0.8 : track.clientWidth * 0.8, behavior: 'smooth' });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (event.pointerType === 'touch' || event.button !== 0) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startScroll: event.currentTarget.scrollLeft, moved: false };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 5) {
      dragRef.current.moved = true;
      suppressClickRef.current = true;
      event.currentTarget.scrollLeft = dragRef.current.startScroll - distance;
    }
  };

  const endDrag = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      const moved = dragRef.current.moved;
      dragRef.current = null;
      if (moved) window.setTimeout(() => { suppressClickRef.current = false; }, 0);
    }
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLUListElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  const socialLinks = [
    { label: 'GitHub', href: profile.githubUrl, icon: Github },
    { label: 'LinkedIn', href: profile.linkedinUrl, icon: Linkedin },
    { label: 'Instagram', href: profile.instagramUrl, icon: Instagram },
  ].filter((link) => link.href);

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-end gap-2">
        <button type="button" onClick={() => scroll('left')} disabled={!canScrollLeft} aria-label="Scroll to previous projects" className="flex h-10 w-10 items-center justify-center border border-foreground/15 text-foreground transition-colors hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft className="h-4 w-4" /></button>
        <button type="button" onClick={() => scroll('right')} disabled={!canScrollRight} aria-label="Scroll to more projects" className="flex h-10 w-10 items-center justify-center border border-foreground/15 text-foreground transition-colors hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-35"><ChevronRight className="h-4 w-4" /></button>
      </div>

      <ul
        ref={trackRef}
        aria-label="Projects, scroll horizontally to explore"
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={handleClickCapture}
        onDragStart={(event) => event.preventDefault()}
        className="project-horizontal-track flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent sm:gap-6"
      >
        {projects.map((project) => {
          const external = /^https?:\/\//.test(project.image);
          const svg = project.image.toLowerCase().endsWith('.svg');

          return (
            <li key={project.id} className="w-[min(82vw,520px)] shrink-0 snap-start sm:w-[min(70vw,520px)]">
              <article className="group flex h-full min-h-[540px] flex-col overflow-hidden border border-foreground/10 bg-background transition-colors hover:border-foreground/25">
                <button type="button" onClick={() => onSelectProject(project)} aria-label={`View details for ${project.title}`} className="relative block aspect-[1.65] w-full shrink-0 overflow-hidden bg-surface-alt text-left">
                  <Image src={project.image} alt={`Interface preview: ${project.title}`} fill sizes="(max-width: 640px) 82vw, 520px" unoptimized={external || svg} className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                  <span className="absolute bottom-3 left-3 bg-background/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.12em] text-foreground">{project.category}</span>
                  <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-accent text-accent-foreground"><ArrowUpRight className="h-4 w-4" /></span>
                </button>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <button type="button" onClick={() => onSelectProject(project)} className="display-heading text-left text-xl font-medium leading-tight tracking-[-.025em] text-foreground transition-colors hover:text-accent sm:text-2xl">{project.title}</button>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{project.description}</p>
                  <ul aria-label="Technologies used" className="mt-4 flex min-h-6 flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[.07em] text-muted/80">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>

                  <div className="mt-auto flex flex-col gap-4 border-t border-foreground/10 pt-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-foreground/15">
                        <Image src="/images/alfi-portrait.png" alt="" fill sizes="40px" className="object-cover object-[center_25%]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{profile.fullName || profile.name}</p>
                        <p className="mt-0.5 text-[11px] text-muted">{profile.roleTitle}</p>
                        <div className="mt-1.5 flex gap-2.5">
                          {socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} profile`} className="text-muted transition-colors hover:text-accent"><Icon aria-hidden="true" className="h-3.5 w-3.5" /></a>)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"><Github className="h-3.5 w-3.5" /> Source <ArrowUpRight className="h-3 w-3" /></a>}
                      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"><ExternalLink className="h-3.5 w-3.5" /> Live <ArrowUpRight className="h-3 w-3" /></a>}
                      {isAdmin && <button type="button" onClick={() => onDeleteProject(project.id)} aria-label={`Delete ${project.title}`} className="text-muted transition-colors hover:text-red-400"><Trash2 className="h-4 w-4" /></button>}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
