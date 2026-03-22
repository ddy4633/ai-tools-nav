'use client';

import { Compass, Github, Mail, Sparkles, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { buildMailtoLink, siteConfig } from '@/lib/site';
import { useUiLanguage } from '@/components/providers/LanguageProvider';
import TrackedLink from '@/components/ui/TrackedLink';
import { brandConfig } from '@/lib/brand';

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
  const { copy } = useUiLanguage();

  const navLinks = [
    { name: copy.nav.directory, href: '/tools' },
    { name: copy.nav.categories, href: '/categories' },
    { name: copy.nav.trending, href: '/trending' },
    { name: copy.nav.editorial, href: '/blog' },
    { name: copy.nav.advertise, href: '/advertise' },
    { name: copy.nav.about, href: '/about' },
    { name: copy.nav.submit, href: '/submit' },
  ];

  const legalLinks = [
    { name: copy.legal.privacy, href: '/privacy' },
    { name: copy.legal.terms, href: '/terms' },
    { name: copy.legal.disclosure, href: '/disclosure' },
  ];

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
              {copy.footer.audienceBlurb}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              {copy.footer.audienceBadge}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm uppercase tracking-[0.24em] text-text-muted">{copy.footer.navigation}</h3>
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
              <h3 className="text-sm uppercase tracking-[0.24em] text-text-muted">{copy.footer.connect}</h3>
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
                {copy.footer.contactBlurb}
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
                <h4 className="text-xs uppercase tracking-[0.22em] text-text-muted">{copy.footer.creatorToolbox}</h4>
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
          <p>{copy.footer.bottomLeft(brandConfig.siteName, currentYear)}</p>
          <p>{copy.footer.bottomRight}</p>
        </div>
      </div>
    </footer>
  );
}
