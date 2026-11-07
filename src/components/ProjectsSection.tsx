'use client';

import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, ExternalLink, Github, Plus, Search, Trash2 } from 'lucide-react';
import { Project } from '@/types';
import { usePortfolioControls } from '@/components/PortfolioControls';

function ProjectImage({ project, sizes }: { project: Project; sizes: string }) {
  const external = /^https?:\/\//.test(project.image);
  const svg = project.image.toLowerCase().endsWith('.svg');

  return (
    <Image
      src={project.image}
      alt={`Interface preview: ${project.title}`}
      fill
      sizes={sizes}
      unoptimized={external || svg}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
    />
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#d0d0c8] transition-colors hover:text-[var(--accent)]">
          <Github className="h-3.5 w-3.5" /> Source code <ArrowUpRight className="h-3 w-3" />
        </a>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#d0d0c8] transition-colors hover:text-[var(--accent)]">
          <ExternalLink className="h-3.5 w-3.5" /> Live project <ArrowUpRight className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const { projects, isAdmin, onSelectProject, onOpenAddModal, onDeleteProject } = usePortfolioControls();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter((project) =>
      [project.title, project.description, project.category, ...project.tags].some((value) => value.toLowerCase().includes(query)),
    );
  }, [projects, searchQuery]);

  const [featured, ...supporting] = filteredProjects;

  return (
    <section id="projects" className="border-y border-white/10 bg-[#151612] py-24 md:py-32">
      <div className="section-shell">
        <div className="mb-12 grid gap-6 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
            <p className="eyebrow mb-4">02 / Selected work</p>
            <h2 className="section-title max-w-xl">Built for the work people do every day.</h2>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="section-copy max-w-sm text-sm">Web applications for queues, school operations, sales, inventory, and decision support.</p>
            {isAdmin && (
              <button onClick={onOpenAddModal} className="inline-flex shrink-0 items-center gap-2 border border-white/15 px-4 py-2.5 text-sm text-white transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
                <Plus className="h-4 w-4" /> Add project
              </button>
            )}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[.12em] text-[#77786f]">{filteredProjects.length.toString().padStart(2, '0')} projects</p>
          <label className="relative block w-full sm:w-64">
            <Search aria-hidden="true" className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77786f]" />
            <input
              aria-label="Search projects"
              placeholder="Search projects"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full border-0 border-b border-white/15 bg-transparent py-2 pl-6 text-sm text-white outline-none placeholder:text-[#77786f] focus:border-[var(--accent)]"
            />
          </label>
        </div>

        {!featured ? (
          <p className="border-b border-white/10 py-14 text-sm text-[#a4a49a]">No projects match “{searchQuery}”.</p>
        ) : (
          <>
            <article className="group grid overflow-hidden border-b border-white/10 pb-10 md:grid-cols-[1.2fr_.8fr] md:gap-10 md:pb-12">
              <button onClick={() => onSelectProject(featured)} aria-label={`View details for ${featured.title}`} className="relative block aspect-[1.55] w-full overflow-hidden bg-[#23241f] text-left">
                <ProjectImage project={featured} sizes="(max-width: 768px) 100vw, 65vw" />
                <span className="absolute bottom-4 left-4 bg-[#10110f]/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.12em] text-white">01 / {featured.category}</span>
                <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-[var(--accent)] text-[#15170f] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><ArrowUpRight className="h-5 w-5" /></span>
              </button>
              <div className="flex flex-col justify-center py-6 md:py-2">
                <p className="eyebrow mb-4">Featured project</p>
                <button onClick={() => onSelectProject(featured)} className="text-left text-2xl font-medium leading-tight tracking-[-.035em] text-white transition-colors hover:text-[var(--accent)] sm:text-3xl">{featured.title}</button>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[#a4a49a]">{featured.description}</p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[.08em] text-[#888980]">{featured.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <ProjectLinks project={featured} />
                  {isAdmin && <button onClick={() => onDeleteProject(featured.id)} aria-label={`Delete ${featured.title}`} className="text-[#898a81] transition-colors hover:text-red-400"><Trash2 className="h-4 w-4" /></button>}
                </div>
              </div>
            </article>

            {supporting.length > 0 && (
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-10 md:grid-cols-2 md:gap-y-12">
                {supporting.map((project, index) => (
                  <article key={project.id} className="group min-w-0">
                    <button onClick={() => onSelectProject(project)} aria-label={`View details for ${project.title}`} className="relative block aspect-[1.65] w-full overflow-hidden bg-[#23241f] text-left">
                      <ProjectImage project={project} sizes="(max-width: 768px) 100vw, 50vw" />
                      <span className="absolute bottom-4 left-4 bg-[#10110f]/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.12em] text-white">{String(index + 2).padStart(2, '0')} / {project.category}</span>
                      <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center bg-[var(--accent)] text-[#15170f] opacity-0 transition-opacity group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></span>
                    </button>
                    <div className="border-b border-white/10 py-5">
                      <div className="flex items-start justify-between gap-4">
                        <button onClick={() => onSelectProject(project)} className="text-left text-xl font-medium leading-tight tracking-[-.025em] text-white transition-colors hover:text-[var(--accent)]">{project.title}</button>
                        {isAdmin && <button onClick={() => onDeleteProject(project.id)} aria-label={`Delete ${project.title}`} className="pt-1 text-[#898a81] transition-colors hover:text-red-400"><Trash2 className="h-4 w-4" /></button>}
                      </div>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#a4a49a]">{project.description}</p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[.08em] text-[#77786f]">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                        <ProjectLinks project={project} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
        <a href="#contact" className="mt-10 inline-flex items-center gap-2 text-sm text-[#d0d0c8] transition-colors hover:text-[var(--accent)]">Discuss a project <ArrowDownRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}
