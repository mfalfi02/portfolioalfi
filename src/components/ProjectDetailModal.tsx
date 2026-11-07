'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react';
import { Project } from '@/types';

export default function ProjectDetailModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;
  const external = /^https?:\/\//.test(project.image);
  const svg = project.image.toLowerCase().endsWith('.svg');

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#10110f]/85 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto border border-white/10 bg-[#171813] shadow-2xl">
        <div className="relative aspect-[1.8] max-h-[48vh] min-h-48 w-full shrink-0 overflow-hidden bg-[#22231e]">
          <Image src={project.image} alt={`Interface preview: ${project.title}`} fill sizes="(max-width: 896px) 100vw, 896px" unoptimized={external || svg} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171813]/90 via-transparent to-transparent" />
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close project details" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#10110f]/70 text-white backdrop-blur-sm transition-colors hover:border-white/50">
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-8 sm:right-8">
            <p className="eyebrow">{project.category} · Selected work</p>
            <h2 id="project-dialog-title" className="mt-2 max-w-3xl text-2xl font-medium leading-tight tracking-[-.035em] text-white sm:text-4xl">{project.title}</h2>
          </div>
        </div>

        <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-sm leading-7 text-[#c4c4bb]">{project.description}</p>
          </div>
          <div className="border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-0">
            <h3 className="font-mono text-[10px] uppercase tracking-[.14em] text-[#77786f]">Built with</h3>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {project.tags.map((tag) => <li key={tag} className="text-sm text-[#e2e1d9]">{tag}</li>)}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-[var(--accent)]"><Github className="h-4 w-4" /> Source code <ArrowUpRight className="h-3.5 w-3.5" /></a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-[var(--accent)]"><ExternalLink className="h-4 w-4" /> Live project <ArrowUpRight className="h-3.5 w-3.5" /></a>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
