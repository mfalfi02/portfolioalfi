'use client';

import React, { useState, useMemo } from 'react';
import { FolderGit2, Plus, Search, Cpu, Trash2, Eye, Github, ExternalLink } from 'lucide-react';
import { Project } from '@/types';

interface ProjectsSectionProps {
  projects: Project[];
  isAdmin: boolean;
  onSelectProject: (p: Project) => void;
  onOpenAddModal: () => void;
  onDeleteProject: (id: string) => void;
}

export default function ProjectsSection({
  projects,
  isAdmin,
  onSelectProject,
  onOpenAddModal,
  onDeleteProject,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Fullstack', '3D/WebXR', 'Mobile', 'AI/ML'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono tracking-[0.24em] uppercase mb-2">
              <FolderGit2 className="w-4 h-4" /> Selected work
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Most relevant projects
            </h2>
          </div>

          {isAdmin && (
            <button
              onClick={onOpenAddModal}
              className="self-start md:self-auto inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200"
            >
              <Plus className="w-4 h-4" /> Add project
            </button>
          )}
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-300 to-violet-300 text-slate-950 shadow-lg shadow-violet-950/30'
                    : 'bg-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-slate-950/40 pl-10 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-emerald-300/40"
            />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-white/10 bg-white/5">
            <Cpu className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400 text-base font-medium">
              No projects match your filter or search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border bg-gradient-to-br shadow-xl transition-all duration-300 hover:-translate-y-2 ${[
                  'border-cyan-200/15 from-cyan-300/[0.09] to-blue-500/[0.03] hover:border-cyan-200/40 hover:shadow-cyan-950/40',
                  'border-fuchsia-200/15 from-fuchsia-300/[0.09] to-violet-500/[0.03] hover:border-fuchsia-200/40 hover:shadow-fuchsia-950/40',
                  'border-amber-200/15 from-amber-300/[0.09] to-rose-500/[0.03] hover:border-amber-200/40 hover:shadow-rose-950/40',
                ][index % 3]}`}
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                  <span className="absolute top-3 left-3 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-200 backdrop-blur-md">
                    {project.category}
                  </span>

                  {isAdmin && (
                    <button
                      onClick={async () => {
                        try {
                          await onDeleteProject(project.id);
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                      title="Delete project"
                      className="absolute right-3 top-3 rounded-full border border-red-400/20 bg-red-500/80 p-2 text-white transition-colors hover:bg-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white transition-colors line-clamp-1 group-hover:text-emerald-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3 mt-2 leading-7">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-500">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-300 hover:text-emerald-200"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full p-2 text-emerald-300 transition-colors hover:bg-white/5 hover:text-emerald-200"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
