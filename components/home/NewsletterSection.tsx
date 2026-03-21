'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check, Mail, Send, Sparkles } from 'lucide-react';
import { subscribeToNewsletterApi, validateEmail } from '@/lib/newsletter/client';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [website2, setWebsite2] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatus('error');
      setMessage('Enter an email address.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setStatus('error');
      setMessage('Enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const result = await subscribeToNewsletterApi({
        email: trimmedEmail,
        source: 'home_newsletter',
        tags: ['homepage'],
        website2,
      });

      if (!result.success) {
        setStatus('error');
        setMessage('Subscription failed. Please try again in a moment.');
        return;
      }

      setStatus('success');
      setMessage('You are in. We will send the next launch digest to your inbox.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Subscription failed. Please try again in a moment.');
    }
  };

  return (
    <section className="relative border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] px-6 py-8 shadow-[0_28px_70px_rgba(0,0,0,0.25)] md:px-10 md:py-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,226,212,0.18),transparent_38%),radial-gradient(circle_at_88%_12%,rgba(240,154,121,0.16),transparent_28%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.85fr)] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-text-secondary">
                <Sparkles className="h-4 w-4 text-accent-yellow" />
                Weekly launch digest
              </div>

              <h2 className="mt-5 font-display text-4xl leading-tight text-text-primary md:text-5xl">
                One email a week,
                {' '}
                <span className="block text-gradient-cyber">only when the tool movement matters.</span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary">
                No filler, no generic “AI news” dump. We send the tool launches, breakout movers, major product updates, and editorial decisions worth acting on across global markets.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  'One tight email per week',
                  'Why it matters, not just what happened',
                  'Unsubscribe anytime',
                ].map((item) => (
                  <div key={item} className="rounded-[20px] border border-white/8 bg-black/10 px-4 py-4 text-sm text-text-secondary">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/12 p-5">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="h-4 w-4 text-accent-cyan" />
                Get the editorial launch recap
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <input
                  type="text"
                  name="website2"
                  value={website2}
                  onChange={(event) => setWebsite2(event.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden"
                />
                <label className="block">
                  <span className="mb-2 block text-sm text-text-muted">Work email</span>
                  <div className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/6 p-3 sm:flex-row sm:items-center">
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="min-w-0 flex-1 rounded-[18px] bg-black/10 px-4 py-3 text-base text-text-primary outline-none placeholder:text-text-muted"
                      disabled={status === 'loading'}
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] border border-accent-cyan/35 bg-accent-cyan/12 px-5 text-sm font-semibold text-text-primary transition hover:bg-accent-cyan/18 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        'Joining...'
                      ) : (
                        <>
                          Join the digest
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </label>

                {status !== 'idle' && status !== 'loading' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 rounded-[18px] border px-4 py-3 text-sm ${
                      status === 'success'
                        ? 'border-accent-cyan/25 bg-accent-cyan/10 text-text-primary'
                        : 'border-red-400/20 bg-red-400/10 text-red-100'
                    }`}
                  >
                    {status === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <span>{message}</span>
                  </motion.div>
                ) : null}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
