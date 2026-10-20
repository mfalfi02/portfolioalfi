'use client';

import React, { useMemo, useState } from 'react';
import { Plus, Search, Trash2, ArrowUpRight, Github } from 'lucide-react';
import { Project } from '@/types';

interface ProjectsSectionProps {
  projects: Project[];
  isAdmin: boolean;
  onSelectProject: (p: Project) => void;
  onOpenAddModal: () => void;
  onDeleteProject: (id: string) => void;
}

export default function ProjectsSection({ projects, isAdmin, onSelectProject, onOpenAddModal, onDeleteProject }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  const filteredProjects = useMemo(() => projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    return matchesCategory && (project.title.toLowerCase().includes(q) || project.description.toLowerCase().includes(q) || project.tags.some((tag) => tag.toLowerCase().includes(q)));
  }), [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="border-y border-white/10 bg-[#151612] py-24 md:py-32">
      <div className="section-shell">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">01 / Selected work</p>
            <h2 className="section-title max-w-2xl">A few things I&apos;ve<br className="hidden sm:block" /> worked on.</h2>
          </div>
          <p className="section-copy max-w-sm text-sm">Real projects built to solve practical problems, from internal tools to public facing applications.</p>
          {isAdmin && <button onClick={onOpenAddModal} className="inline-flex items-center gap-2 bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[#15170f]"><Plus className="h-4 w-4" /> Add project</button>}
        </div>

        <div className="mb-9 flex flex-col gap-4 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6 overflow-x-auto">
            {categories.map((category) => <button key={category} onClick={() => setSelectedCategory(category)} className={`whitespace-nowrap pb-1 text-sm transition-colors ${selectedCategory === category ? 'text-[var(--accent)]' : 'text-[#85867d] hover:text-white'}`}>{category}</button>)}
          </div>
          <label className="relative block w-full sm:w-64">
            <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77786f]" />
            <input aria-label="Search projects" placeholder="Search work" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full border-0 border-b border-white/15 bg-transparent py-2 pl-6 text-sm text-white outline-none placeholder:text-[#77786f] focus:border-[var(--accent)]" />
          </label>
        </div>

        {filteredProjects.length === 0 ? <p className="py-16 text-center text-sm text-[#a4a49a]">No projects match this search.</p> : (
          <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <article key={project.id} className="group relative">
                <button onClick={() => onSelectProject(project)} className="block w-full overflow-hidden bg-[#22231e] text-left">
                  <div className="relative aspect-[1.62] overflow-hidden">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                    <div className="absolute inset-0 bg-[#10110f]/10 transition-colors group-hover:bg-transparent" />
                    <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[.12em] text-white/80">0{index + 1} / {project.category}</span>
                    <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[#15170f] opacity-0 transition-opacity group-hover:opacity-100"><ArrowUpRight className="h-5 w-5" /></span>
                  </div>
                </button>
                <div className="flex items-start justify-between gap-5 border-b border-white/10 py-5">
                  <div className="min-w-0">
                    <button onClick={() => onSelectProject(project)} className="text-left text-xl font-medium tracking-tight text-[#f1f0e9] transition-colors hover:text-[var(--accent)]">{project.title}</button>
                    <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-[#9c9d93]">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-mono uppercase tracking-wide text-[#77786f]">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 pt-1">
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${project.title}`} className="text-[#898a81] hover:text-white"><Github className="h-4 w-4" /></a>}
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} className="text-[#898a81] hover:text-[var(--accent)]"><ArrowUpRight className="h-4 w-4" /></a>}
                    {isAdmin && <button onClick={() => onDeleteProject(project.id)} title="Delete project" className="text-[#898a81] hover:text-red-400"><Trash2 className="h-4 w-4" /></button>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
