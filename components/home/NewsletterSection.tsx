'use client';

import { NewsletterForm } from '@/components/newsletter-form';
import { Mail, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-accent-warm/5 via-bg-primary to-accent-cool/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft border border-border-light">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* 左侧文案 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-accent-warm/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent-warm" />
                </div>
                <span className="text-sm font-medium text-accent-warm bg-accent-warm/10 px-3 py-1 rounded-full">
                  每周更新
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                订阅 AI 工具周报
              </h2>
              
              <p className="text-text-secondary mb-6">
                每周精选最新 AI 工具、行业动态和独家评测，助你保持技术前沿。
                <span className="text-accent-warm font-medium">已有 1000+ 订阅者</span>
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1 text-sm text-text-muted">
                  <Sparkles className="w-4 h-4 text-accent-warm" />
                  新工具首发
                </div>
                <div className="flex items-center gap-1 text-sm text-text-muted">
                  <Sparkles className="w-4 h-4 text-accent-warm" />
                  深度评测
                </div>
                <div className="flex items-center gap-1 text-sm text-text-muted">
                  <Sparkles className="w-4 h-4 text-accent-warm" />
                  行业动态
                </div>
              </div>
            </div>
            
            {/* 右侧表单 */}
            <div className="bg-bg-secondary rounded-xl p-6">
              <NewsletterForm variant="default" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
