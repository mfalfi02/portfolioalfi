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
    <section id="contact" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-emerald-300 text-xs font-mono tracking-[0.24em] uppercase">
              <Mail className="w-4 h-4" /> Contact
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s talk about your project
            </h2>
            <p className="text-sm leading-7 text-slate-400">
              If you need a more polished website, stronger performance, or new features for your portfolio, feel free to send a message.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="p-3 rounded-2xl border border-white/10 bg-white/5 text-emerald-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-500 block">Email</span>
                  <span className="text-sm font-semibold">{profile.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="p-3 rounded-2xl border border-white/10 bg-white/5 text-sky-300">
                  <Globe className="w-5 h-5" />
                </div>
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
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-300/40"
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
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-300/40"
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
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-300/40"
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
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-300/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 font-semibold text-slate-950 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
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
