import { Metadata } from 'next';
import { getTrendingTools } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowRight, Home, TrendingUp, Star, GitFork } from 'lucide-react';

export const metadata: Metadata = {
  title: '热门 AI工具排行 - 最受欢迎的人工智能工具 | AI工具导航',
  description: '发现最受欢迎的AI工具排行，基于热度、用户评价、社区活跃度等多维度数据，推荐最热门的AI工具。',
  keywords: ['热门AI工具', 'AI工具排行', '最受欢迎AI工具', 'AI工具推荐', '热门人工智能'],
};

export const revalidate = 3600;

const tierLabels: Record<string, { text: string; className: string }> = {
  '🔥 BREAKING': { text: '🔥 爆款', className: 'bg-red-500/10 text-red-500' },
  '⚡ TRENDING': { text: '⚡ 热门', className: 'bg-orange-500/10 text-orange-500' },
  '🚀 NEW': { text: '🚀 新品', className: 'bg-green-500/10 text-green-500' },
  '⭐ STABLE': { text: '⭐ 稳定', className: 'bg-blue-500/10 text-blue-500' },
};

export default async function TrendingPage() {
  const tools = await getTrendingTools(20);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* 面包屑导航 */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="flex items-center gap-1 hover:text-accent-warm transition-colors">
            <Home className="w-4 h-4" />
            首页
          </Link>
          <span>/</span>
          <span className="text-text-primary">热门排行</span>
        </nav>

        {/* 页面标题 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-accent-warm" />
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
              热门 AI工具排行
            </h1>
          </div>
          <p className="text-text-secondary max-w-2xl">
            基于热度分数、GitHub Stars、社区讨论等多维度数据，为你推荐最受欢迎的AI工具。
            数据每小时更新，紧跟AI技术前沿。
          </p>
        </div>

        {/* 排行说明 */}
        <div className="bg-white rounded-xl p-4 shadow-soft mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-text-muted">热度等级：</span>
            {Object.entries(tierLabels).map(([key, { text, className }]) => (
              <span key={key} className={`text-xs px-2 py-1 rounded ${className}`}>
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* 工具排行列表 */}
        {tools.length > 0 ? (
          <div className="space-y-4">
            {tools.map((tool: any, index: number) => {
              const tier = tierLabels[tool.tier] || tierLabels['⭐ STABLE'];
              const hasMetrics = tool.metrics?.github?.stars > 0;
              
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="group block bg-white rounded-xl p-6 shadow-soft hover:shadow-hover border border-transparent hover:border-accent-warm/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* 排名 */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-bg-primary flex items-center justify-center">
                      <span className={`text-xl font-bold ${
                        index < 3 ? 'text-accent-warm' : 'text-text-muted'
                      }`}>
                        #{index + 1}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-warm transition-colors">
                            {tool.name}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded ${tier.className}`}>
                            {tier.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                          <TrendingUp className="w-4 h-4" />
                          <span>热度 {tool.hype_score}</span>
                        </div>
                      </div>
                      
                      <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                        {tool.one_liner || tool.description}
                      </p>

                      {/* 指标 */}
                      {hasMetrics && (
                        <div className="flex items-center gap-4 text-xs text-text-muted">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            <span>{tool.metrics.github.stars.toLocaleString()} stars</span>
                          </div>
                          {tool.metrics.github.forks > 0 && (
                            <div className="flex items-center gap-1">
                              <GitFork className="w-3 h-3" />
                              <span>{tool.metrics.github.forks.toLocaleString()} forks</span>
                            </div>
                          )}
                          {tool.metrics.github.stars_per_day > 0 && (
                            <span className="text-accent-warm">
                              +{tool.metrics.github.stars_per_day}/day
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-bg-primary">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-muted bg-bg-secondary px-2 py-1 rounded">
                            {tool.category}
                          </span>
                          {tool.viral_coefficient > 0 && (
                            <span className="text-xs text-accent-warm">
                              传播系数 {tool.viral_coefficient}x
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-accent-warm opacity-0 group-hover:opacity-100 transition-opacity">
                          查看详情
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-soft">
            <div className="text-6xl mb-4">📈</div>
            <p className="text-text-primary text-lg mb-2">暂无热度数据</p>
            <p className="text-text-muted text-sm mb-6">请稍后再试或查看全部工具</p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-2 bg-accent-warm text-white rounded-lg hover:bg-accent-warm-hover transition-colors"
            >
              浏览全部工具
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* 返回首页 */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent-warm hover:text-accent-warm-hover transition-colors"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
