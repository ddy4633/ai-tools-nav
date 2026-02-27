'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/tools?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const quickTags = ['ChatGPT', 'Claude', 'Midjourney', 'Cursor'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-grid" />
      
      {/* 霓虹光晕装饰 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" 
      />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* 终端风格标签 */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
            <span className="text-sm font-mono text-accent-cyan">SYSTEM.ONLINE</span>
          </motion.div>
          
          {/* 科技感标题 */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-mono font-bold mb-6"
          >
            <span className="text-text-primary">DISCOVER</span>
            <br />
            <span className="text-gradient-cyber">
              NEXT_GEN
            </span>
            <br />
            <span className="text-text-primary">TOOLS</span>
          </motion.h1>
          
          {/* 副标题 - 终端风格 */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-text-secondary font-mono mb-12 max-w-2xl"
          >
            <span className="text-accent-cyan">$</span> curating the best developer tools from the future
          </motion.p>
          
          {/* 终端风格搜索框 */}
          <motion.div 
            variants={itemVariants}
            className="relative max-w-2xl"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 rounded-xl blur opacity-0 hover:opacity-100 transition-opacity" />
            <form onSubmit={handleSearch} className="relative flex items-center bg-bg-card border border-border-glow rounded-xl overflow-hidden focus-within:border-accent-cyan/50 focus-within:shadow-glow-cyan transition-all">
              <span className="pl-4 text-accent-cyan font-mono">&gt;</span>
              <input
                type="text"
                placeholder="search_tools --category=ai"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-4 bg-transparent text-text-primary font-mono placeholder:text-text-muted focus:outline-none"
              />
              <button 
                type="submit"
                className="px-6 py-2 m-2 bg-accent-cyan/10 border border-accent-cyan/50 rounded-lg text-accent-cyan font-mono hover:bg-accent-cyan/20 transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                EXEC
              </button>
            </form>
          </motion.div>
          
          {/* 快捷标签 */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <span className="text-sm font-mono text-text-muted">// popular:</span>
            {quickTags.map((tag) => (
              <a
                key={tag}
                href={`/tools?search=${encodeURIComponent(tag)}`}
                className="px-3 py-1 text-sm font-mono text-text-secondary border border-border-subtle rounded hover:border-accent-cyan/50 hover:text-accent-cyan transition-all"
              >
                {tag}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
