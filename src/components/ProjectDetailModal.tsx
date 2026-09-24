import React from 'react';
import { X, Star, Github, Globe, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

export default function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl">
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full border border-white/10 bg-slate-950/70 p-2 text-slate-300 transition-colors hover:bg-slate-900"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
              {project.category}
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{project.title}</h2>
          </div>
        </div>

        <div className="space-y-6 overflow-y-auto p-6">
          <p className="text-base leading-8 text-slate-300">
            {project.description}
          </p>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Tech stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{project.stars} Github Stars</span>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <Github className="w-4 h-4" /> Code Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-200"
                >
                  <Globe className="w-4 h-4" /> Live Demo <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
