'use client';

import React, { useEffect, useState } from 'react';
import { INITIAL_PROFILE, INITIAL_PROJECTS } from '@/lib/data';
import { Project, UserProfile } from '@/types';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import TechStackSection from '@/components/TechStackSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ProjectDetailModal from '@/components/ProjectDetailModal';
import { AddProjectModal, AdminLoginModal, AdminDashboardModal } from '@/components/AdminModals';

export default function Home() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await fetch('/api/site-content', { cache: 'no-store' });
        if (!response.ok) return;

        const content = await response.json();
        if (content?.profile) setProfile(content.profile);
        if (Array.isArray(content?.projects)) setProjects(content.projects);
      } catch {
        // Keep the seeded content if the backend is unavailable.
      } finally {
        setIsLoadingContent(false);
      }
    };

    loadPortfolio();
  }, []);

  const persistPortfolio = async (nextProfile: UserProfile, nextProjects: Project[]) => {
    const response = await fetch('/api/site-content', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin,
      },
      body: JSON.stringify({
        profile: nextProfile,
        projects: nextProjects,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.error ?? 'Unable to save content.');
    }

    setProfile(payload.profile);
    setProjects(payload.projects);
  };

  const handleAddProject = async (newProj: Project) => {
    const nextProjects = [newProj, ...projects];
    await persistPortfolio(profile, nextProjects);
  };

  const handleDeleteProject = async (id: string) => {
    const nextProjects = projects.filter((p) => p.id !== id);
    await persistPortfolio(profile, nextProjects);
  };

  const handleSaveProfile = async (updatedProfile: UserProfile) => {
    await persistPortfolio(updatedProfile, projects);
  };

  return (
    <main className="min-h-screen text-slate-100 relative">
      {isLoadingContent && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200 shadow-2xl">
            Loading portfolio...
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="sticky top-0 z-50 flex items-center justify-between border-b border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-50 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admin mode is active. Content is saved to the local backend.</span>
          </div>
          <button
            onClick={() => setIsAdminDashboardOpen(true)}
            className="rounded-full border border-emerald-200/20 bg-slate-950/40 px-3 py-1 text-emerald-100 transition-colors hover:bg-slate-950/60"
          >
            Open dashboard
          </button>
        </div>
      )}

      <Navbar
        profile={profile}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onLogoutAdmin={() => {
          setIsAdmin(false);
          setAdminPin('');
        }}
      />

      <HeroSection profile={profile} />

      <ProjectsSection
        projects={projects}
        isAdmin={isAdmin}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onDeleteProject={handleDeleteProject}
      />

      <TechStackSection />

      <ExperienceSection />

      <ContactSection profile={profile} />

      <Footer profile={profile} />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(pin) => {
          setAdminPin(pin);
          setIsAdmin(true);
          setIsAdminDashboardOpen(true);
        }}
      />

      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onOpenAddProject={() => setIsAddModalOpen(true)}
      />
    </main>
  );
}
