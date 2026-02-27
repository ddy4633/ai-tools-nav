'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  reason?: string;
  category: string;
  pricing_type: 'free' | 'paid' | 'freemium';
  icon?: string;
}

interface FeaturedToolsProps {
  tools: Tool[];
}

const pricingLabels = {
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
    }
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
            <span className="text-sm font-mono text-text-muted">// handpicked</span>
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

function ToolCard({ tool, variants }: { tool: Tool; variants: any }) {
  const pricing = pricingLabels[tool.pricing_type] || pricingLabels.freemium;
  
  return (
    <motion.div variants={variants}>
      <Link 
        href={`/tools/${tool.id}`}
        className="group block relative"
      >
        {/* 发光边框 */}
        <div className="absolute -inset-px bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        
        <div className="relative bg-bg-card border border-border-card rounded-xl p-5 hover:border-accent-cyan/30 transition-colors h-full"
        >
          {/* 头部：图标 + 名称 */}
          
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:border-accent-cyan/50 group-hover:shadow-glow-cyan transition-all"
            >
              {tool.icon ? (
                <img src={tool.icon} alt="" className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-xl font-mono text-accent-cyan">{tool.name[0]}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-mono font-bold text-text-primary group-hover:text-accent-cyan transition-colors truncate"
              >
                {tool.name}
              </h3>
              <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-mono rounded border ${pricing.className}`}
              >
                {pricing.text}
              </span>
            </div>
          </div>
          
          {/* 推荐理由 */}
          
          <p className="text-text-secondary text-sm leading-relaxed mb-4 font-mono line-clamp-2"
          >
            {tool.reason || tool.description}
          </p>
          
          {/* 底部分类 */}
          
          <div className="flex items-center justify-between pt-4 border-t border-border-subtle"
          >
            <span className="text-xs font-mono text-text-muted"
            >
              // {tool.category}
            </span>
            <span className="text-xs font-mono text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity"
            >
              [VIEW] →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
