'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Flame, ArrowRight, Github } from 'lucide-react';
import type { TrendingTool } from '@/types/tool';
import TrackedExternalLink from '@/components/ui/TrackedExternalLink';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { getCategoryLabel, getToolCardSummary, getToolDisplayName, isCjkHeavy } from '@/lib/tool-display';

interface TrendingToolsProps {
  tools: TrendingTool[];
}

const tierConfig: Record<string, { text: string; className: string }> = {
  '🔥 BREAKING': { text: 'BREAKING', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  '⚡ TRENDING': { text: 'TRENDING', className: 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/30' },
  '🚀 NEW': { text: 'NEW', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  '💡 WATCH': { text: 'WATCH', className: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30' },
};

const formatNumber = (num: number) => {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};

export default function TrendingTools({ tools }: TrendingToolsProps) {
  if (!tools || tools.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-20 bg-bg-primary relative overflow-hidden">
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
            <span className="text-sm font-mono text-text-muted">{'// viral_now'}</span>
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

function ToolCard({ tool, rank, variants }: { tool: TrendingTool; rank: number; variants: Variants }) {
  const tier = tierConfig[tool.tier] || tierConfig['💡 WATCH'];
  const detailHref = `/tools/${tool.id}`;
  const displayName = getToolDisplayName(tool.name);

  return (
    <motion.div variants={variants} className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-pink/20 via-accent-purple/20 to-accent-cyan/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl blur-sm group-hover:blur-md" />
      <div className="absolute -inset-px bg-gradient-to-r from-accent-pink/10 via-transparent to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

      <div className="relative bg-bg-card border border-border-card rounded-xl p-5 group-hover:border-accent-pink/40 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,0,110,0.1)]">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center font-mono font-bold text-accent-cyan group-hover:border-accent-cyan/50 group-hover:shadow-glow-cyan transition-all duration-300">
            {rank.toString().padStart(2, '0')}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <Link href={detailHref} className="inline-block">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-mono font-bold text-text-primary group-hover:text-accent-pink transition-colors duration-300">
                      {displayName}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs font-mono rounded border transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(255,0,110,0.2)] ${tier.className}`}>
                      {tier.text}
                    </span>
                  </div>
                </Link>

                <p className="text-sm text-text-secondary font-mono leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                  {!isCjkHeavy(tool.one_liner) && tool.one_liner ? tool.one_liner : getToolCardSummary(tool)}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-mono font-bold text-accent-pink group-hover:scale-110 transition-transform duration-300">
                  {tool.hype_score.toFixed(0)}
                </div>
                <div className="text-xs font-mono text-text-muted">HYPE_SCORE</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm font-mono mb-4">
              {tool.metrics?.github ? (
                tool.repo_url ? (
                  <TrackedExternalLink
                    href={tool.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    trackingPayload={{
                      placement: 'home_trending_repo_metric',
                      toolId: tool.id,
                      toolName: tool.name,
                      targetUrl: tool.repo_url,
                      isAffiliate: false,
                    }}
                    className="flex items-center gap-1 text-text-secondary hover:text-accent-cyan transition-colors duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>{formatNumber(tool.metrics.github.stars)}</span>
                    <span className="text-accent-cyan">(+{tool.metrics.github.stars_per_day.toFixed(0)})</span>
                  </TrackedExternalLink>
                ) : (
                  <span className="flex items-center gap-1 text-text-secondary">
                    <Github className="w-4 h-4" />
                    <span>{formatNumber(tool.metrics.github.stars)}</span>
                    <span className="text-accent-cyan">(+{tool.metrics.github.stars_per_day.toFixed(0)})</span>
                  </span>
                )
              ) : null}

              {tool.metrics?.hackernews && tool.metrics.hackernews.votes > 0 && (
                <span className="flex items-center gap-1 text-text-secondary">
                  <span className="text-accent-orange">▲</span>
                  <span>{tool.metrics.hackernews.votes}</span>
                </span>
              )}

              {tool.viral_coefficient > 1.5 && (
                <span className="text-accent-yellow font-mono group-hover:text-accent-pink transition-colors duration-300">
                  VIRAL: {tool.viral_coefficient.toFixed(1)}x
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border-subtle group-hover:border-accent-pink/20 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-text-muted group-hover:text-text-secondary transition-colors duration-300">
                  {`// ${getCategoryLabel(tool.category, tool.categorySlug ?? tool.category_slug)}`}
                </span>
                <Link
                  href={detailHref}
                  className="inline-flex items-center gap-1 text-xs font-mono text-accent-pink hover:opacity-80 transition-opacity"
                >
                  [OPEN]
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <ToolPrimaryCta
                tool={tool}
                placement="home_trending_primary_cta"
                affiliateLabel="Open partner link"
                websiteLabel="Visit site"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border border-accent-pink/40 text-accent-pink hover:bg-accent-pink/10 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
