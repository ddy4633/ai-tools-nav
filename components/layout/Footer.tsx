'use client';

import { Compass, Github, Mail, Sparkles, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { buildMailtoLink, siteConfig } from '@/lib/site';
import TrackedLink from '@/components/ui/TrackedLink';
import { brandConfig, globalAudienceBlurb } from '@/lib/brand';

const navLinks = [
  { name: 'Tools', href: '/tools' },
  { name: 'Categories', href: '/categories' },
  { name: 'Trending', href: '/trending' },
  { name: 'Editorial', href: '/blog' },
  { name: 'Advertise', href: '/advertise' },
  { name: 'About', href: '/about' },
  { name: 'Submit', href: '/submit' },
];

const legalLinks = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Disclosure', href: '/disclosure' },
];

const creatorToolLinks = [
  {
    name: 'ProductoKit Image Kit',
    href: 'https://www.productokit.com/image-kit?utm_source=ai-tools-nav&utm_medium=footer&utm_campaign=creator_toolbox',
  },
  {
    name: 'ProductoKit Text Polisher',
    href: 'https://www.productokit.com/text-polisher?utm_source=ai-tools-nav&utm_medium=footer&utm_campaign=creator_toolbox',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    siteConfig.githubUrl ? { name: 'GitHub', href: siteConfig.githubUrl, icon: Github } : null,
    siteConfig.xUrl ? { name: 'X', href: siteConfig.xUrl, icon: Twitter } : null,
    { name: 'Email', href: buildMailtoLink(), icon: Mail },
  ].filter(Boolean) as Array<{ name: string; href: string; icon: typeof Github }>;

  return (
    <footer className="border-t border-white/8 bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6">
                <Compass className="h-5 w-5 text-accent-cyan" />
              </div>
              <div>
                <p className="text-lg font-semibold text-text-primary">{brandConfig.siteName}</p>
                <p className="text-sm text-text-muted">{brandConfig.taglines.secondary}</p>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-7 text-text-secondary">
              {globalAudienceBlurb}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              English-first discovery with multi-market launch intent
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm uppercase tracking-[0.24em] text-text-muted">Navigation</h3>
              <div className="mt-4 grid gap-3">
                {navLinks.map((link) => (
                  <TrackedLink
                    key={link.name}
                    href={link.href}
                    trackingPayload={{ placement: 'footer_nav', source: 'footer' }}
                    className="text-sm text-text-secondary transition hover:text-text-primary"
                  >
                    {link.name}
                  </TrackedLink>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.24em] text-text-muted">Connect</h3>
              <div className="mt-4 flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-text-secondary transition hover:border-accent-cyan/28 hover:text-text-primary"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-text-secondary">
                Found a launch-worthy product, or want sponsored placement across discovery, category, trending, and editorial surfaces? Reach out here.
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-xs text-text-muted">
                {legalLinks.map((link) => (
                  <TrackedLink
                    key={link.name}
                    href={link.href}
                    trackingPayload={{ placement: 'footer_legal', source: 'footer' }}
                    className="rounded-full border border-white/10 bg-black/10 px-3 py-1 transition hover:text-text-primary"
                  >
                    {link.name}
                  </TrackedLink>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-[0.22em] text-text-muted">Creator toolbox</h4>
                <div className="mt-3 flex flex-wrap gap-3">
                  {creatorToolLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs text-text-muted transition hover:border-accent-cyan/28 hover:text-text-primary"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} {brandConfig.siteName}. Keep the signal clear and the disclosures honest.</p>
          <p>Made for people who really want to ship, not just browse.</p>
        </div>
      </div>
    </footer>
  );
}
