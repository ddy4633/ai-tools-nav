'use client';

import Link from 'next/link';
import { Terminal, Github, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { buildMailtoLink, siteConfig } from '@/lib/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'TOOLS', href: '/tools' },
    { name: 'CATEGORIES', href: '/categories' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SUBMIT', href: '/submit' },
  ];

  const socials = [
    { name: 'GITHUB', href: siteConfig.githubUrl, icon: Github },
    siteConfig.xUrl ? { name: 'TWITTER', href: siteConfig.xUrl, icon: Twitter } : null,
    { name: 'EMAIL', href: buildMailtoLink(), icon: Mail },
  ].filter(Boolean) as Array<{ name: string; href: string; icon: typeof Github }>;

  return (
    <footer className="bg-bg-secondary border-t border-border-subtle py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          {/* 左侧 Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-accent-cyan" />
            <span className="text-xl font-mono font-bold text-text-primary">
              <span className="text-accent-cyan">&gt;</span>_TOOLS
            </span>
          </div>
          
          {/* 中间导航 */}
          <nav className="flex flex-wrap items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-mono text-text-secondary hover:text-accent-cyan transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* 右侧社交链接 */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-accent-cyan transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
        
        {/* 底部版权 */}
        <div className="mt-10 pt-8 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs font-mono text-text-muted"
          >
            <p>© {currentYear} _TOOLS. All systems operational.</p>
            <p><span className="text-accent-cyan">&lt;</span> Crafted for developers <span className="text-accent-cyan">/&gt;</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
