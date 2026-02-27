// components/home/EditorPicks.tsx - 编辑精选板块
'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { EditorPick } from '@/types/tool';

interface EditorPicksProps {
  picks: EditorPick[];
}

const pricingLabels = {
  free: { text: '免费', className: 'bg-accent-cool/10 text-accent-cool' },
  paid: { text: '付费', className: 'bg-accent-warm/10 text-accent-warm' },
  freemium: { text: '部分免费', className: 'bg-text-muted/10 text-text-muted' },
};

export default function EditorPicks({ picks }: EditorPicksProps) {
  if (!picks || picks.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white" aria-labelledby="editor-picks-title">
      <div className="max-w-6xl mx-auto px-6">
        {/* 标题区域 */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl" aria-hidden="true">👋</span>
          <h2 
            id="editor-picks-title"
            className="text-2xl font-medium text-text-primary"
          >
            编辑精选
          </h2>
          <span className="text-sm text-text-muted">
            本周我们最爱的工具
          </span>
        </div>
        
        {/* 精选卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {picks.map((pick) => (
            <article 
              key={pick.id}
              className="bg-bg-secondary rounded-xl p-6 group"
            >
              {/* 工具卡片 */}
              <Link 
                href={`/tools/${pick.tool.slug}`}
                className="block bg-white rounded-xl border border-border-light p-5 hover:shadow-hover hover:border-border-medium transition-all duration-300"
              >
                {/* 头部：图标 + 名称 */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {pick.tool.icon ? (
                      <img 
                        src={pick.tool.icon} 
                        alt="" 
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xl text-accent-warm font-medium">
                        {pick.tool.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-warm transition-colors">
                      {pick.tool.name}
                    </h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${pricingLabels[pick.tool.pricingType].className}`}>
                      {pricingLabels[pick.tool.pricingType].text}
                    </span>
                  </div>
                </div>
                
                {/* 推荐理由 */}
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  「{pick.tool.reason}」
                </p>
                
                {/* 底部分类 */}
                <div className="flex items-center justify-between pt-4 border-t border-bg-primary">
                  <span className="text-xs text-text-muted">
                    {pick.tool.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent-warm fill-accent-warm" />
                    <span className="text-sm font-medium text-text-primary">
                      {pick.tool.editorRating}
                    </span>
                  </div>
                </div>
              </Link>
              
              {/* 编辑评语 */}
              <div className="mt-4 pt-4 border-t border-border-light flex items-start gap-3">
                <img 
                  src={pick.editor.avatar} 
                  alt={pick.editor.name}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-secondary italic">
                    "{pick.comment}"
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    — {pick.editor.name}，{pick.editor.role === 'editor' ? '编辑' : '管理员'}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
