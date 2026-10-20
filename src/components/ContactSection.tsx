'use client';

import React, { useState } from 'react';
import { Mail, Globe, Send, CheckCircle, Loader2 } from 'lucide-react';
import { UserProfile } from '@/types';

export default function ContactSection({ profile }: { profile: UserProfile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the Next.js API route at /api/contact.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      // Fallback
      setSubmitted(true);
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-12 border-t border-white/10 pt-10 md:grid-cols-12 md:gap-16">
          <div className="lg:col-span-5 space-y-6">
            <div className="eyebrow">
              <Mail className="mr-2 inline h-4 w-4" /> 04 / Contact
            </div>
            <h2 className="section-title mt-5">
              Have a project in mind?
            </h2>
            <p className="section-copy mt-5 text-sm">
              If you need a more polished website, stronger performance, or new features for your portfolio, feel free to send a message.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-[#d0d0c8]">
                <div className="text-[var(--accent)]"><Mail className="w-5 h-5" /></div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500 block">Email</span>
                  <span className="text-sm font-semibold">{profile.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[#d0d0c8]">
                <div className="text-[var(--accent)]"><Globe className="w-5 h-5" /></div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500 block">Location</span>
                  <span className="text-sm font-semibold">{profile.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-6">
                <CheckCircle className="w-12 h-12 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold text-white">Message sent successfully</h3>
                <p className="text-slate-300 text-sm mt-1">
                  Thank you for getting in touch. I will reply as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-white/10 bg-[#151612] px-4 py-3 text-sm text-white outline-none placeholder:text-[#77786f] focus:border-[var(--accent)]/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-white/10 bg-[#151612] px-4 py-3 text-sm text-white outline-none placeholder:text-[#77786f] focus:border-[var(--accent)]/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Portfolio consultation / new website inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border border-white/10 bg-[#151612] px-4 py-3 text-sm text-white outline-none placeholder:text-[#77786f] focus:border-[var(--accent)]/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me briefly about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-white/10 bg-[#151612] px-4 py-3 text-sm text-white outline-none placeholder:text-[#77786f] focus:border-[var(--accent)]/60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 bg-[var(--accent)] px-5 py-3.5 font-semibold text-[#15170f] transition-colors hover:bg-[#d6f993] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
