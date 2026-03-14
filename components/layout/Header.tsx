'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Menu, Sparkles, X } from 'lucide-react';
import { CommandPalette } from '@/components/search/CommandPalette';

const navItems = [
  { name: '工具库', href: '/tools' },
  { name: '分类浏览', href: '/categories' },
  { name: '热门榜单', href: '/trending' },
  { name: '专题内容', href: '/blog' },
  { name: '商务合作', href: '/advertise' },
  { name: '提交工具', href: '/submit' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 glass">
      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(125,226,212,0.32),transparent)]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-18 items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
              <Compass className="h-5 w-5 text-accent-cyan" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-base font-semibold text-text-primary md:text-lg">AI工具导航</span>
                <span className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-text-muted sm:inline-flex">
                  精选策展
                </span>
              </div>
              <p className="hidden text-xs text-text-muted md:block">先给判断，再给工具链接</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-text-secondary transition hover:text-text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <CommandPalette />

            <Link
              href="/advertise"
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary transition hover:border-accent-cyan/28 hover:text-text-primary md:inline-flex"
            >
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              商务合作
            </Link>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-text-secondary transition hover:text-text-primary md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
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
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-text-secondary transition hover:text-text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
