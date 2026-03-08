'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Megaphone, ArrowRight } from 'lucide-react';
import type { Tool } from '@/types/tool';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import { getToolSponsorLabel } from '@/lib/monetization/sponsored';

interface SponsoredToolsProps {
  tools: Tool[];
}

export default function SponsoredTools({ tools }: SponsoredToolsProps) {
  if (!tools || tools.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-bg-secondary/60 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-yellow/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Megaphone className="w-6 h-6 text-accent-yellow" />
              <h2 className="text-2xl font-mono font-bold text-text-primary">SPONSORED</h2>
              <span className="text-sm font-mono text-text-muted">{'// paid_placements'}</span>
            </div>
            <p className="text-sm text-text-secondary">
              商务合作展示位，会清晰标注为赞助推荐。
            </p>
          </div>
          <Link
            href="/submit"
            className="text-sm font-mono text-accent-cyan hover:text-accent-cyan/80 transition-colors flex items-center gap-1"
          >
            BOOK_SLOT
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <article
              key={tool.id}
              className="group bg-bg-card rounded-2xl border border-border-card p-6 hover:border-accent-yellow/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3 min-w-0">
                  <ToolLogo
                    name={tool.name}
                    icon={tool.icon}
                    size={32}
                    alt={`${tool.name} logo`}
                    wrapperClassName="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex-shrink-0"
                    imageClassName="w-8 h-8"
                    textClassName="text-xl text-accent-cyan"
                  />
                  <div className="min-w-0">
                    <h3 className="text-lg font-mono font-bold text-text-primary truncate">
                      {tool.name}
                    </h3>
                    <p className="text-xs font-mono text-text-muted mt-1">{tool.category}</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/30 shrink-0">
                  {getToolSponsorLabel(tool)}
                </span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                {tool.reason || tool.description}
              </p>

              {tool.priceRange ? (
                <p className="text-xs text-text-muted mb-4">
                  价格：{tool.priceRange}
                </p>
              ) : null}

              <div className="mt-auto pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
                <Link
                  href={`/tools/${tool.id}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-accent-cyan hover:opacity-80 transition-opacity"
                >
                  查看详情
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <ToolPrimaryCta
                  tool={tool}
                  placement="home_sponsored_primary_cta"
                  affiliateLabel="合作链接"
                  websiteLabel="官网"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-accent-yellow/40 text-accent-yellow hover:bg-accent-yellow/10 transition-colors"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
