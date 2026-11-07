'use client';

import React, { useState } from 'react';
import { Check, Github, Instagram, Linkedin, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { UserProfile } from '@/types';

export default function ContactSection({ profile }: { profile: UserProfile }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const whatsappNumber = profile.phone.replace(/\D/g, '');

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error ?? 'The message could not be sent. Please try again.');
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'The message could not be sent. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-[#77786f] focus:border-[var(--accent)]';

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="section-shell">
        <div className="grid gap-12 border-t border-white/10 pt-9 md:grid-cols-[.8fr_1.2fr] md:gap-20 md:pt-12">
          <div>
            <p className="eyebrow mb-4">05 / Contact</p>
            <h2 className="section-title max-w-md">Let&apos;s make something useful.</h2>
            <p className="section-copy mt-5 max-w-md text-sm">For web development roles, freelance work, or a collaboration, send me a note.</p>

            <div className="mt-9 space-y-5 border-t border-white/10 pt-6">
              <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 text-sm text-[#d0d0c8]">
                <Mail className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                <span className="transition-colors group-hover:text-[var(--accent)]">{profile.email}</span>
              </a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-sm text-[#d0d0c8]">
                <Phone className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                <span className="transition-colors group-hover:text-[var(--accent)]">WhatsApp · {profile.phone}</span>
              </a>
              <p className="flex items-center gap-4 text-sm text-[#a4a49a]">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" /> {profile.location}
              </p>
            </div>

            <div className="mt-7 flex gap-5 text-xs text-[#a4a49a]">
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white"><Github className="h-3.5 w-3.5" /> GitHub</a>
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a>
              <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white"><Instagram className="h-3.5 w-3.5" /> Instagram</a>
            </div>
          </div>

          <div>
            {submitted ? (
              <div role="status" className="flex min-h-64 flex-col justify-center border-y border-[var(--accent)]/40 py-8">
                <Check className="mb-5 h-6 w-6 text-[var(--accent)]" />
                <h3 className="text-xl font-medium text-white">Message sent.</h3>
                <p className="mt-2 text-sm text-[#a4a49a]">Thank you for getting in touch. I&apos;ll get back to you as soon as I can.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 w-fit text-sm text-[var(--accent)] underline underline-offset-4">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="text-xs text-[#a4a49a]">Your name</label>
                    <input id="contact-name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={(event) => updateField('name', event.target.value)} className={inputClass} placeholder="Name" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-xs text-[#a4a49a]">Email address</label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={(event) => updateField('email', event.target.value)} className={inputClass} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="text-xs text-[#a4a49a]">Subject</label>
                  <input id="contact-subject" name="subject" type="text" required value={formData.subject} onChange={(event) => updateField('subject', event.target.value)} className={inputClass} placeholder="What would you like to discuss?" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-xs text-[#a4a49a]">Message</label>
                  <textarea id="contact-message" name="message" required rows={4} value={formData.message} onChange={(event) => updateField('message', event.target.value)} className={`${inputClass} resize-y`} placeholder="A few details about the project or role..." />
                </div>
                {errorMessage && <p role="alert" className="text-sm text-red-300">{errorMessage}</p>}
                <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#15170f] transition-colors hover:bg-[#d6f993] disabled:cursor-wait disabled:opacity-60">
                  {loading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Sending</> : <><Send className="h-4 w-4" /> Send message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
