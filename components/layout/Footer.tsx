'use client';

import { Compass, Github, Mail, Sparkles, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { buildMailtoLink, siteConfig } from '@/lib/site';
import TrackedLink from '@/components/ui/TrackedLink';

const navLinks = [
  { name: '全部工具', href: '/tools' },
  { name: '分类浏览', href: '/categories' },
  { name: '热门榜单', href: '/trending' },
  { name: '专题内容', href: '/blog' },
  { name: '商务合作', href: '/advertise' },
  { name: '关于我们', href: '/about' },
  { name: '提交工具', href: '/submit' },
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
                <p className="text-lg font-semibold text-text-primary">AI工具导航</p>
                <p className="text-sm text-text-muted">先给判断，再给工具链接</p>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-sm leading-7 text-text-secondary">
              这是一个面向中文用户的 AI 工具策展站。我们更关心“哪个工具适合什么场景”，而不是单纯把名字堆满页面。
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary">
              <Sparkles className="h-4 w-4 text-accent-yellow" />
              站点已升级为“策展 + 转化”双引擎结构
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm uppercase tracking-[0.24em] text-text-muted">导航</h3>
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
              <h3 className="text-sm uppercase tracking-[0.24em] text-text-muted">联系</h3>
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
                如果你发现更值得收录的产品，或者希望购买首页、分类页、榜单页和专题页曝光，可以通过上面的方式联系。
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} AI工具导航。保留判断，也保留透明度。</p>
          <p>Made for people who really want to ship, not just browse.</p>
        </div>
      </div>
    </footer>
  );
}
