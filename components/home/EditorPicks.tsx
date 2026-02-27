'use client';

import Link from 'next/link';
import { Star, Zap } from 'lucide-react';
import { EditorPick } from '@/types/tool';
import { motion } from 'framer-motion';

interface EditorPicksProps {
  picks: EditorPick[];
}

const pricingLabels = {
  free: { text: 'FREE', className: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30' },
  paid: { text: 'PAID', className: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30' },
  freemium: { text: 'FREEMIUM', className: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30' },
};

export default function EditorPicks({ picks }: EditorPicksProps) {
  if (!picks || picks.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <section className="py-20 bg-bg-secondary relative overflow-hidden" aria-labelledby="editor-picks-title">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题区域 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <Zap className="w-6 h-6 text-accent-yellow" />
          <h2 
            id="editor-picks-title"
            className="text-2xl font-mono font-bold text-text-primary"
          >
            EDITOR_PICKS
          </h2>
          <span className="text-sm font-mono text-text-muted">// weekly_selection</span>
        </motion.div>
        
        {/* 精选卡片网格 */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {picks.map((pick) => (
            <motion.article 
              key={pick.id}
              variants={cardVariants}
              className="group relative"
            >
              {/* 发光边框效果 */}
              <div className="absolute -inset-px bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative bg-bg-card border border-border-card rounded-xl overflow-hidden hover:border-accent-cyan/30 transition-colors">
                <Link 
                  href={`/tools/${pick.tool.slug}`}
                  className="block p-6"
                >
                  {/* 头部：图标 + 名称 */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:border-accent-cyan/50 group-hover:shadow-glow-cyan transition-all">
                      {pick.tool.icon ? (
                        <img 
                          src={pick.tool.icon} 
                          alt="" 
                          className="w-8 h-8 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xl font-mono text-accent-cyan">{pick.tool.name[0]}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-mono font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
                        {pick.tool.name}
                      </h3>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-mono rounded border ${pricingLabels[pick.tool.pricingType].className}`}>
                        {pricingLabels[pick.tool.pricingType].text}
                      </span>
                    </div>
                  </div>
                  
                  {/* 推荐理由 */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 font-mono">
                    <span className="text-accent-cyan">"</span>
                    {pick.tool.reason}
                    <span className="text-accent-cyan">"</span>
                  </p>
                  
                  {/* 底部分类 */}
                  <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                    <span className="text-xs font-mono text-text-muted">
                      // {pick.tool.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
                      <span className="text-sm font-mono text-text-secondary">
                        {pick.tool.editorRating}
                      </span>
                    </div>
                  </div>
                </Link>
                
                {/* 编辑评语 */}
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-border-subtle flex items-start gap-3">
                    <img 
                      src={pick.editor.avatar} 
                      alt={pick.editor.name}
                      className="w-8 h-8 rounded-full flex-shrink-0 border border-border-subtle"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-secondary font-mono">
                        <span className="text-accent-purple">#</span> {pick.comment}
                      </p>
                      <p className="text-xs text-text-muted font-mono mt-1">
                        @ {pick.editor.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
