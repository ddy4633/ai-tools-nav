'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Menu, Sparkles, X } from 'lucide-react';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { useUiLanguage } from '@/components/providers/LanguageProvider';
import { CommandPalette } from '@/components/search/CommandPalette';
import TrackedLink from '@/components/ui/TrackedLink';
import { brandConfig } from '@/lib/brand';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { copy } = useUiLanguage();

  const navItems = [
    { name: copy.nav.directory, href: '/tools' },
    { name: copy.nav.categories, href: '/categories' },
    { name: copy.nav.trending, href: '/trending' },
    { name: copy.nav.editorial, href: '/blog' },
    { name: copy.nav.advertise, href: '/advertise' },
    { name: copy.nav.submit, href: '/submit' },
  ];

  return (
    <header className="sticky top-0 z-40 px-3 py-3">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-[#090c12]/76 px-4 shadow-[0_20px_70px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:px-5">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(125,226,212,0.42),rgba(240,154,121,0.28),transparent)]" />

        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-[linear-gradient(145deg,rgba(125,226,212,0.18),rgba(255,255,255,0.06))] shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
              <Compass className="h-5 w-5 text-accent-cyan transition group-hover:rotate-12" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-semibold text-text-primary md:text-lg">{brandConfig.siteName}</div>
              <p className="hidden text-xs text-text-muted md:block">{copy.header.taglineSecondary}</p>
            </div>
          </Link>

          <nav className="hidden items-center rounded-full border border-white/8 bg-white/5 p-1 md:flex">
            {navItems.map((item) => (
              <TrackedLink
                key={item.name}
                href={item.href}
                trackingPayload={{ placement: 'header_nav', source: 'header' }}
                className="rounded-full px-3 py-2 text-sm text-text-secondary transition hover:bg-white/10 hover:text-text-primary"
              >
                {item.name}
              </TrackedLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <CommandPalette />

            <TrackedLink
              href="/advertise"
              trackingPayload={{ placement: 'header_top_cta', source: 'header' }}
              className="hidden items-center gap-2 rounded-full border border-accent-yellow/24 bg-accent-yellow/10 px-4 py-2 text-sm text-[#f5ddb1] transition hover:bg-accent-yellow/15 md:inline-flex"
            >
              <Sparkles className="h-4 w-4" />
              {copy.header.promote}
            </TrackedLink>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-text-secondary transition hover:text-text-primary md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? copy.header.closeMenu : copy.header.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/8 pb-4 md:hidden"
            >
              <div className="space-y-2 pt-4">
                <LanguageSwitcher mobile />
                {navItems.map((item) => (
                  <TrackedLink
                    key={item.name}
                    href={item.href}
                    trackingPayload={{ placement: 'header_mobile_nav', source: 'header_mobile' }}
                    className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-text-secondary transition hover:text-text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </TrackedLink>
                ))}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
