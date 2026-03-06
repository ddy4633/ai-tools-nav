'use client';

import Link from 'next/link';
import { Menu, X, Terminal } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CommandPalette } from '@/components/search/CommandPalette';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'TOOLS', href: '/tools' },
    { name: 'CATEGORIES', href: '/categories' },
    { name: 'ABOUT', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 glass border-b border-border-subtle">
      {/* 霓虹下划线装饰 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - 霓虹效果 */}
          <Link href="/" className="flex items-center gap-2 group">
            <Terminal className="w-5 h-5 text-accent-cyan group-hover:text-accent-pink transition-colors" />
            <span className="text-xl font-mono font-bold text-text-primary">
              <span className="text-accent-cyan">&gt;</span>_TOOLS
            </span>
            <span className="text-xs font-mono text-accent-cyan/70 border border-accent-cyan/30 px-1.5 py-0.5 rounded">
              v2.0
            </span>
          </Link>
          
          {/* 桌面导航 - 发光悬停 */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-sm font-mono text-text-secondary hover:text-accent-cyan transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-cyan group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
          
          {/* 右侧操作 */}
          <div className="flex items-center gap-4">
            {/* Command Palette 搜索按钮 */}
            <CommandPalette />
            
            <button 
              className="md:hidden p-2 text-text-secondary hover:text-accent-cyan transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* 移动端菜单 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-border-subtle overflow-hidden"
            >
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href} 
                      className="block text-text-secondary hover:text-accent-cyan py-2 font-mono transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-accent-cyan">$</span> {item.name.toLowerCase()}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
