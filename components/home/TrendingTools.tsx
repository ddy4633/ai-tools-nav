'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Github, Star } from 'lucide-react';

interface SocialMetrics {
  github: {
    stars: number;
    stars_per_day: number;
    forks: number;
  };
  twitter?: {
    likes: number;
    retweets: number;
  };
  hackernews?: {
    votes: number;
    comments: number;
  };
}

interface Tool {
  id: string;
  name: string;
  description: string;
  website: string;
  repo_url: string;
  hype_score: number;
  viral_coefficient: number;
  tier: string;
  metrics: SocialMetrics;
  install_methods: string[];
  one_liner: string;
}

interface TrendingToolsProps {
  tools: Tool[];
}

const tierConfig: Record<string, { text: string; className: string }> = {
  '🔥 BREAKING': { text: 'BREAKING', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  '⚡ TRENDING': { text: 'TRENDING', className: 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/30' },
  '🚀 NEW': { text: 'NEW', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  '💡 WATCH': { text: 'WATCH', className: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30' },
};

const formatNumber = (num: number) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};

export default function TrendingTools({ tools }: TrendingToolsProps) {
  if (!tools || tools.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <section className="py-20 bg-bg-primary relative overflow-hidden">
      {/* 顶部边框 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-pink/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-accent-pink" />
            <h2 className="text-2xl font-mono font-bold text-text-primary">TRENDING</h2>
            <span className="text-sm font-mono text-text-muted">// viral_now</span>
          </div>
          
          <Link
            href="/trending"
            className="text-sm font-mono text-accent-cyan hover:text-accent-cyan/80 transition-colors flex items-center gap-1"
          >
            VIEW_ALL
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {tools.slice(0, 5).map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} rank={index + 1} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ToolCard({ tool, rank, variants }: { tool: Tool; rank: number; variants: any }) {
  const tier = tierConfig[tool.tier] || tierConfig['💡 WATCH'];
  
  return (
    <motion.div 
      variants={variants}
      className="group relative"
    >
      <div className="absolute -inset-px bg-gradient-to-r from-accent-pink/10 via-transparent to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      
      <div className="relative bg-bg-card border border-border-card rounded-xl p-5 hover:border-accent-pink/30 transition-colors">
        <div className="flex items-start gap-4">
          {/* 排名 */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center font-mono font-bold text-accent-cyan">
            {rank.toString().padStart(2, '0')}
          </div>
          
          <div className="flex-1 min-w-0">
            {/* 头部 */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-mono font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
                    {tool.name}
                  </h3>
                  <span className={`px-2 py-0.5 text-xs font-mono rounded border ${tier.className}`}>
                    {tier.text}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary font-mono leading-relaxed">
                  {tool.one_liner || tool.description}
                </p>
              </div>
              
              {/* 热度分 */}
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-mono font-bold text-accent-pink">
                  {tool.hype_score.toFixed(0)}
                </div>
                <div className="text-xs font-mono text-text-muted">
                  HYPE_SCORE
                </div>
              </div>
            </div>
            
            {/* 社交指标 */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-mono mb-4">
              {tool.metrics.github && (
                <a
                  href={tool.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-text-secondary hover:text-accent-cyan transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>{formatNumber(tool.metrics.github.stars)}</span>
                  <span className="text-accent-cyan">(+{tool.metrics.github.stars_per_day.toFixed(0)})</span>
                </a>
              )}
              
              {tool.metrics.hackernews && tool.metrics.hackernews.votes > 0 && (
                <span className="flex items-center gap-1 text-text-secondary"
                >
                  <span className="text-accent-orange">▲</span>
                  <span>{tool.metrics.hackernews.votes}</span>
                </span>
              )}
              
              {tool.viral_coefficient > 1.5 && (
                <span className="text-accent-yellow font-mono"
                >
                  VIRAL: {tool.viral_coefficient.toFixed(1)}x
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
