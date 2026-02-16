'use client';

import Link from 'next/link';

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

const tierColors: Record<string, string> = {
  '🔥 BREAKING': 'bg-red-500 text-white',
  '⚡ TRENDING': 'bg-orange-500 text-white',
  '🚀 NEW': 'bg-blue-500 text-white',
  '💡 WATCH': 'bg-gray-400 text-white',
};

const formatNumber = (num: number) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};

export default function TrendingTools({ tools }: TrendingToolsProps) {
  return (
    <section className="py-16 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <h2 className="text-2xl font-medium text-text-primary">正在病毒式传播</h2>
            </div>
            <p className="text-sm text-text-muted">
              基于 GitHub、Twitter、Hacker News 实时热度计算
            </p>
          </div>
          
          <Link
            href="/trending"
            className="text-sm text-accent-warm hover:text-accent-warm-hover font-medium"
          >
            查看全部 →
          </Link>
        </div>

        <div className="space-y-4">
          {tools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} rank={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool, rank }: { tool: Tool; rank: number }) {
  const tierClass = tierColors[tool.tier] || tierColors['💡 WATCH'];
  
  return (
    <div className="group bg-white rounded-xl border border-border-light p-5 hover:shadow-hover hover:border-border-medium transition-all">
      <div className="flex items-start gap-4">
        {/* 排名 */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-bg-primary flex items-center justify-center font-medium text-text-primary">
          {rank}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* 头部 */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-warm transition-colors"
                >
                  {tool.name}
                </h3>
                <span className={`px-2 py-0.5 text-xs rounded font-medium ${tierClass}`}>
                  {tool.tier.replace(/[🔥⚡🚀💡]/g, '').trim()}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary leading-relaxed">
                {tool.one_liner || tool.description}
              </p>
            </div>
            
            {/* 热度分 */}
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-accent-warm">
                {tool.hype_score.toFixed(0)}
              </div>
              <div className="text-xs text-text-muted">
                热度分
              </div>
            </div>
          </div>
          
          {/* 社交指标 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-4">
            {tool.metrics.github && (
              <a
                href={tool.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-accent-warm transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>⭐ {formatNumber(tool.metrics.github.stars)}</span>
                <span className="text-text-muted/60">(+{tool.metrics.github.stars_per_day.toFixed(0)}/天)</span>
              </a>
            )}
            
            {tool.metrics.hackernews && tool.metrics.hackernews.votes > 0 && (
              <span className="flex items-center gap-1">
                <span>▲</span>
                <span>{tool.metrics.hackernews.votes}</span>
              </span>
            )}
            
            {tool.viral_coefficient > 1.5 && (
              <span className="text-orange-500 font-medium">
                🚀 病毒系数 {tool.viral_coefficient.toFixed(1)}x
              </span>
            )}
          </div>
          
          {/* 安装方案 */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-bg-primary">
            <span className="text-xs text-text-muted mr-2">快速安装:</span>
            
            {tool.install_methods?.map((method) => (
              <button
                key={method}
                className="px-3 py-1 text-xs bg-bg-primary text-text-secondary rounded hover:bg-border-light hover:text-text-primary transition-colors"
              >
                {method}
              </button>
            )) || (
              <>
                <button className="px-3 py-1 text-xs bg-bg-primary text-text-secondary rounded hover:bg-border-light transition-colors">
                  🐳 Docker
                </button>
                <button className="px-3 py-1 text-xs bg-bg-primary text-text-secondary rounded hover:bg-border-light transition-colors">
                  📦 源码
                </button>
              </>
            )}
            
            <Link
              href={`/tools/${tool.id}`}
              className="ml-auto text-xs text-accent-warm hover:text-accent-warm-hover font-medium"
            >
              完整安装指南 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
