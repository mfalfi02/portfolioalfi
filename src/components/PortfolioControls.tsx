'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project, UserProfile } from '@/types';
import ProjectDetailModal from '@/components/ProjectDetailModal';
import { AddProjectModal, AdminDashboardModal, AdminLoginModal } from '@/components/AdminModals';

interface PortfolioControlsValue {
  projects: Project[];
  isAdmin: boolean;
  onSelectProject: (project: Project) => void;
  onDeleteProject: (id: string) => Promise<void>;
  onOpenAddModal: () => void;
  onOpenAdminLogin: () => void;
  onOpenAdminDashboard: () => void;
  onLogoutAdmin: () => void;
}

const PortfolioControlsContext = createContext<PortfolioControlsValue | null>(null);

export function usePortfolioControls() {
  const value = useContext(PortfolioControlsContext);
  if (!value) throw new Error('usePortfolioControls must be used within PortfolioControls.');
  return value;
}

export default function PortfolioControls({
  profile: initialProfile,
  projects: initialProjects,
  children,
}: {
  profile: UserProfile;
  projects: Project[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [adminPin, setAdminPin] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const persist = useCallback(async (nextProfile: UserProfile, nextProjects: Project[]) => {
    const response = await fetch('/api/site-content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-pin': adminPin },
      body: JSON.stringify({ profile: nextProfile, projects: nextProjects }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload?.error ?? 'Unable to save portfolio content.');
    setProfile(payload.profile);
    setProjects(payload.projects);
    router.refresh();
  }, [adminPin, router]);

  const value = useMemo<PortfolioControlsValue>(() => ({
    projects,
    isAdmin,
    onSelectProject: setSelectedProject,
    onDeleteProject: async (id) => persist(profile, projects.filter((project) => project.id !== id)),
    onOpenAddModal: () => setIsAddProjectOpen(true),
    onOpenAdminLogin: () => setIsLoginOpen(true),
    onOpenAdminDashboard: () => setIsDashboardOpen(true),
    onLogoutAdmin: () => { setIsAdmin(false); setAdminPin(''); },
  }), [projects, isAdmin, profile, persist]);

  return (
    <PortfolioControlsContext.Provider value={value}>
      {isAdmin && (
        <div className="relative z-50 flex items-center justify-between gap-4 border-b border-[var(--accent)]/20 bg-[#20251a] px-5 py-2 text-xs text-[#e7f5ce] sm:px-8">
          <p><span className="mr-2 text-[var(--accent)]">●</span>Portfolio editing is enabled.</p>
          <button onClick={() => setIsDashboardOpen(true)} className="underline decoration-white/30 underline-offset-4 hover:text-[var(--accent)]">Open dashboard</button>
        </div>
      )}
      {children}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <AddProjectModal isOpen={isAddProjectOpen} onClose={() => setIsAddProjectOpen(false)} onAddProject={(project) => persist(profile, [project, ...projects])} />
      <AdminLoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={(pin) => { setAdminPin(pin); setIsAdmin(true); setIsDashboardOpen(true); }} />
      <AdminDashboardModal isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} profile={profile} onSaveProfile={(nextProfile) => persist(nextProfile, projects)} onOpenAddProject={() => setIsAddProjectOpen(true)} />
    </PortfolioControlsContext.Provider>
  );
}
