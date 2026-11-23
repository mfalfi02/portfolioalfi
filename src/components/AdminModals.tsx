'use client';

import React, { useEffect, useState } from 'react';
import { Check, FolderGit2, Loader2, Plus, Settings, ShieldCheck, User, X } from 'lucide-react';
import { Project, UserProfile } from '@/types';

export function AddProjectModal({
  isOpen,
  onClose,
  onAddProject,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (p: Project) => Promise<void> | void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Fullstack' as Project['category'],
    image: '',
    tags: '',
    githubUrl: '',
    liveUrl: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Fullstack',
      image: '',
      tags: '',
      githubUrl: '',
      liveUrl: '',
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const newProject: Project = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: formData.image,
        tags: formData.tags ? formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
        githubUrl: formData.githubUrl || undefined,
        liveUrl: formData.liveUrl || undefined,
        stars: 0,
        date: new Date().toISOString().slice(0, 7),
      };

      await onAddProject(newProject);
      resetForm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save the project.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/75 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-foreground/10 bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Project manager</p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">Add a new project</h3>
          </div>
          <button onClick={onClose} className="rounded-full border border-foreground/10 p-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
          {error && (
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Project title
            </label>
            <input
              type="text"
              required
              placeholder="Example: Portfolio CMS"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Project['category'] })}
                className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
              >
                <option value="Fullstack">Fullstack</option>
                <option value="3D/WebXR">3D / WebXR</option>
                <option value="Mobile">Mobile</option>
                <option value="AI/ML">AI / Machine Learning</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Project screenshot URL
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe the goal, outcome, and what makes this project relevant."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Tech stack
            </label>
            <input
              type="text"
              placeholder="Next.js, TypeScript, Tailwind CSS"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Github link
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Live demo
              </label>
              <input
                type="url"
                placeholder="https://your-project.vercel.app"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-foreground/10 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Save project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AdminLoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (pin: string) => void;
}) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      if (!response.ok) {
        throw new Error('Invalid PIN.');
      }

      onLoginSuccess(pin);
      setPin('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to verify the PIN.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/75 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-3xl border border-foreground/10 bg-surface shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-foreground/10 p-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-6 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-foreground">Admin dashboard access</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Enter your PIN to manage the profile and project list.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-3 text-left">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Admin PIN
              </label>
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-center text-sm tracking-[0.3em] text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
              />
              {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboardModal({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onOpenAddProject,
}: {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (p: UserProfile) => Promise<void> | void;
  onOpenAddProject: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'bio' | 'projects'>('bio');
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    setFormData({ ...profile });
  }, [profile]);

  if (!isOpen) return null;

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);
    setSaveError('');

    try {
      await onSaveProfile(formData);
      setSavedSuccess(true);
      window.setTimeout(() => setSavedSuccess(false), 2500);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Unable to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/75 backdrop-blur-xl animate-fadeIn">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Content management</h3>
              <p className="text-sm text-muted">Edit the main profile and project list in one place.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-foreground/10 p-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-2 border-b border-foreground/10 px-6 py-4">
          <button
            onClick={() => setActiveTab('bio')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'bio'
                ? 'bg-foreground text-background'
                : 'text-muted hover:bg-foreground/5 hover:text-foreground'
            }`}
          >
            <User className="h-4 w-4" /> Profile
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-foreground text-background'
                : 'text-muted hover:bg-foreground/5 hover:text-foreground'
            }`}
          >
            <FolderGit2 className="h-4 w-4" /> Projects
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          {activeTab === 'bio' && (
            <form onSubmit={handleSubmitProfile} className="space-y-4">
              {saveError && (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {saveError}
                </div>
              )}
              {savedSuccess && (
                <div className="inline-flex items-center gap-2 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent">
                  <Check className="h-4 w-4" />
                  Profile changes saved.
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Brand name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Role
                </label>
                <input
                  type="text"
                  value={formData.roleTitle}
                  onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                  className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Status
                </label>
                <input
                  type="text"
                  value={formData.hireStatus}
                  onChange={(e) => setFormData({ ...formData, hireStatus: e.target.value })}
                  className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Short bio
                </label>
                <textarea
                  rows={4}
                  value={formData.heroBio}
                  onChange={(e) => setFormData({ ...formData, heroBio: e.target.value })}
                  className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent/60"
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-foreground/10 pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  Save changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Project list</p>
                <h4 className="mt-2 text-lg font-semibold text-foreground">Add new work to the portfolio</h4>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Add a project here and the data will be saved to the local backend.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAddProject();
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:opacity-90"
                >
                  <Plus className="h-4 w-4" />
                  Add project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
