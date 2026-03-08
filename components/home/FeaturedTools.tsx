'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import type { Tool } from '@/types/tool';
import ToolLogo from '@/components/ui/ToolLogo';
import ToolPrimaryCta from '@/components/ui/ToolPrimaryCta';
import SponsorBadge from '@/components/ui/SponsorBadge';

interface FeaturedToolsProps {
  tools: Tool[];
}

const pricingLabels: Record<string, { text: string; className: string }> = {
  free: { text: 'FREE', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  paid: { text: 'PAID', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  freemium: { text: 'FREEMIUM', className: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30' },
};

export default function FeaturedTools({ tools }: FeaturedToolsProps) {
  if (!tools || tools.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="py-20 bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-accent-yellow fill-accent-yellow" />
            <h2 className="text-2xl font-mono font-bold text-text-primary">FEATURED</h2>
            <span className="text-sm font-mono text-text-muted">{'// handpicked'}</span>
          </div>

          <Link
            href="/tools"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tools.slice(0, 8).map((tool) => (
            <ToolCard key={tool.id} tool={tool} variants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ToolCard({ tool, variants }: { tool: Tool; variants: Variants }) {
  const pricingType = tool.pricing_type || tool.pricingType || 'freemium';
  const pricing = pricingLabels[pricingType] || pricingLabels.freemium;
  const detailHref = `/tools/${tool.id}`;

  return (
    <motion.div variants={variants} className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-cyan/30 via-accent-purple/30 to-accent-pink/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl blur-sm group-hover:blur-md" />
      <div className="absolute -inset-px bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

      <div className="relative bg-bg-card border border-border-card rounded-xl p-5 group-hover:border-accent-cyan/40 transition-all duration-300 h-full group-hover:shadow-[0_0_30px_rgba(0,245,212,0.15)] flex flex-col">
        <Link href={detailHref} className="block flex-1">
          <div className="flex items-start gap-4 mb-4">
            <ToolLogo
              name={tool.name}
              icon={tool.icon}
              size={32}
              alt={`${tool.name} logo`}
              wrapperClassName="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex-shrink-0 group-hover:border-accent-cyan/50 group-hover:shadow-glow-cyan transition-all duration-300 group-hover:scale-105"
              imageClassName="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
              textClassName="text-xl text-accent-cyan group-hover:text-accent-pink transition-colors"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-mono font-bold text-text-primary group-hover:text-accent-cyan transition-colors duration-300 truncate">
                {tool.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className={`inline-block px-2 py-0.5 text-xs font-mono rounded border transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(0,245,212,0.2)] ${pricing.className}`}>
                  {pricing.text}
                </span>
                <SponsorBadge tool={tool} />
              </div>
            </div>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-4 font-mono line-clamp-2 group-hover:text-text-primary transition-colors duration-300">
            {tool.reason || tool.description}
          </p>
        </Link>

        <div className="mt-auto pt-4 border-t border-border-subtle group-hover:border-accent-cyan/20 transition-colors duration-300 flex items-center justify-between gap-3">
          <span className="text-xs font-mono text-text-muted group-hover:text-text-secondary transition-colors duration-300">
            {`// ${tool.category}`}
          </span>
          <div className="flex items-center gap-2">
            <ToolPrimaryCta
              tool={tool}
              placement="home_featured_card_primary_cta"
              affiliateLabel="合作链接"
              websiteLabel="官网"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
            />
            <Link
              href={detailHref}
              className="inline-flex items-center gap-1 text-xs font-mono text-accent-cyan hover:opacity-80 transition-opacity"
            >
              [详情]
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
