'use client';

import React, { useMemo, useState } from 'react';
import { ArrowDownRight, Plus, Search } from 'lucide-react';
import { usePortfolioControls } from '@/components/PortfolioControls';
import { ProfileCardTestimonialCarousel } from '@/components/ui/profile-card-testimonial-carousel';

export default function ProjectsSection() {
  const { profile, projects, isAdmin, onSelectProject, onOpenAddModal, onDeleteProject } = usePortfolioControls();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter((project) =>
      [project.title, project.description, project.category, ...project.tags].some((value) => value.toLowerCase().includes(query)),
    );
  }, [projects, searchQuery]);

  return (
    <section id="projects" className="border-y border-foreground/10 bg-surface py-24 md:py-32">
      <div className="section-shell">
        <div className="mb-12 grid gap-6 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
            <h2 className="section-title max-w-xl">Built for the work people do every day.</h2>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="section-copy max-w-sm text-sm">Web applications for queues, school operations, sales, inventory, and decision support.</p>
            {isAdmin && (
              <button onClick={onOpenAddModal} className="inline-flex shrink-0 items-center gap-2 border border-foreground/15 px-4 py-2.5 text-sm text-foreground transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
                <Plus className="h-4 w-4" /> Add project
              </button>
            )}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 border-y border-foreground/10 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[.12em] text-muted/70">{filteredProjects.length.toString().padStart(2, '0')} projects</p>
          <label className="relative block w-full sm:w-64">
            <Search aria-hidden="true" className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/70" />
            <input
              aria-label="Search projects"
              placeholder="Search projects"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full border-0 border-b border-foreground/15 bg-transparent py-2 pl-6 text-sm text-foreground outline-none placeholder:text-muted/70 focus:border-[var(--accent)]"
            />
          </label>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="border-b border-foreground/10 py-14 text-sm text-muted">No projects match “{searchQuery}”.</p>
        ) : (
          <ProfileCardTestimonialCarousel projects={filteredProjects} profile={profile} onSelectProject={onSelectProject} isAdmin={isAdmin} onDeleteProject={onDeleteProject} />
        )}
        <a href="#contact" className="mt-10 inline-flex items-center gap-2 text-sm text-foreground/85 transition-colors hover:text-[var(--accent)]">Discuss a project <ArrowDownRight className="h-4 w-4" /></a>
      </div>
    </section>
  );
}
