#!/usr/bin/env python3
"""
社交热度聚合器
整合 GitHub、Twitter、Hacker News、Reddit 数据，计算综合热度分
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class SocialMetrics:
    github_stars: int = 0
    github_stars_per_day: float = 0
    github_forks: int = 0
    twitter_likes: int = 0
    twitter_retweets: int = 0
    hn_votes: int = 0
    hn_comments: int = 0
    reddit_upvotes: int = 0
    reddit_comments: int = 0
    
    def to_dict(self):
        return {
            'github': {
                'stars': self.github_stars,
                'stars_per_day': round(self.github_stars_per_day, 1),
                'forks': self.github_forks
            },
            'twitter': {
                'likes': self.twitter_likes,
                'retweets': self.twitter_retweets
            },
            'hackernews': {
                'votes': self.hn_votes,
                'comments': self.hn_comments
            },
            'reddit': {
                'upvotes': self.reddit_upvotes,
                'comments': self.reddit_comments
            }
        }

@dataclass
class ToolCandidate:
    name: str
    repo_url: str
    website: str
    description: str
    created_at: datetime
    metrics: SocialMetrics
    hype_score: float = 0
    viral_coefficient: float = 0
    tier: str = "WATCH"
    
    def calculate_scores(self):
        """计算热度分和病毒系数"""
        m = self.metrics
        
        # 基础分
        github_score = min(m.github_stars_per_day / 200 * 30, 30)
        twitter_score = min((m.twitter_likes + m.twitter_retweets * 2) / 1000 * 25, 25)
        hn_score = min(m.hn_votes / 200 * 20, 20)
        reddit_score = min(m.reddit_upvotes / 500 * 15, 15)
        
        # 时间衰减（越新越热）
        hours_old = (datetime.now() - self.created_at).total_seconds() / 3600
        freshness_bonus = max(0, 20 - hours_old / 6)
        
        self.hype_score = github_score + twitter_score + hn_score + reddit_score + freshness_bonus
        
        # 病毒系数（增速比绝对值重要）
        # 简化计算：前24h vs 前48-24h
        recent_velocity = m.github_stars_per_day
        self.viral_coefficient = recent_velocity / max(m.github_stars / 30, 10)
        
        # 分级
        if self.hype_score > 80 and self.viral_coefficient > 2.0:
            self.tier = "🔥 BREAKING"
        elif self.hype_score > 60 and self.viral_coefficient > 1.2:
            self.tier = "⚡ TRENDING"
        elif self.hype_score > 40 and self.viral_coefficient > 0.8:
            self.tier = "🚀 NEW"
        elif self.hype_score > 20:
            self.tier = "💡 WATCH"

class HypeAggregator:
    def __init__(self):
        self.github_token = os.getenv('GITHUB_TOKEN', '')
        self.twitter_bearer = os.getenv('TWITTER_BEARER_TOKEN', '')
        
    async def fetch_github_data(self, session: aiohttp.ClientSession, repo: str) -> Dict:
        """获取 GitHub 数据"""
        headers = {'Accept': 'application/vnd.github.v3+json'}
        if self.github_token:
            headers['Authorization'] = f'token {self.github_token}'
        
        try:
            async with session.get(
                f'https://api.github.com/repos/{repo}',
                headers=headers
            ) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    created = datetime.fromisoformat(data['created_at'].replace('Z', '+00:00'))
                    days_old = (datetime.now() - created).days or 1
                    
                    return {
                        'stars': data['stargazers_count'],
                        'stars_per_day': data['stargazers_count'] / days_old,
                        'forks': data['forks_count'],
                        'created_at': created,
                        'description': data['description'] or '',
                        'homepage': data['homepage'] or '',
                        'language': data['language'] or 'Unknown'
                    }
        except Exception as e:
            print(f"❌ GitHub error for {repo}: {e}")
        
        return {}
    
    async def fetch_hackernews(self, session: aiohttp.ClientSession, query: str) -> Dict:
        """搜索 Hacker News"""
        try:
            # 使用 Algolia HN Search API
            async with session.get(
                'https://hn.algolia.com/api/v1/search',
                params={'query': query, 'tags': 'story', 'hitsPerPage': 5}
            ) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    hits = data.get('hits', [])
                    if hits:
                        top = hits[0]
                        return {
                            'votes': top.get('points', 0),
                            'comments': top.get('num_comments', 0),
                            'url': f"https://news.ycombinator.com/item?id={top.get('objectID')}"
                        }
        except Exception as e:
            print(f"❌ HN error for {query}: {e}")
        
        return {'votes': 0, 'comments': 0}
    
    async def analyze_tool(self, session: aiohttp.ClientSession, repo: str) -> Optional[ToolCandidate]:
        """分析单个工具的综合热度"""
        print(f"🔍 Analyzing {repo}...")
        
        # 获取 GitHub 数据
        github_data = await self.fetch_github_data(session, repo)
        if not github_data:
            return None
        
        # 只关注近期热门（30天内创建或最近爆发）
        if github_data['stars_per_day'] < 50:
            return None
        
        # 获取其他平台数据（简化版，实际需要更多API调用）
        hn_data = await self.fetch_hackernews(session, repo.split('/')[-1])
        
        metrics = SocialMetrics(
            github_stars=github_data['stars'],
            github_stars_per_day=github_data['stars_per_day'],
            github_forks=github_data['forks'],
            hn_votes=hn_data.get('votes', 0),
            hn_comments=hn_data.get('comments', 0)
        )
        
        candidate = ToolCandidate(
            name=repo.split('/')[-1],
            repo_url=f"https://github.com/{repo}",
            website=github_data['homepage'] or f"https://github.com/{repo}",
            description=github_data['description'],
            created_at=github_data['created_at'],
            metrics=metrics
        )
        
        candidate.calculate_scores()
        
        return candidate
    
    async def scan_trending_repos(self) -> List[ToolCandidate]:
        """扫描 trending repos"""
        # 获取 GitHub trending（通过搜索API模拟）
        search_queries = [
            'AI language model created:>2026-01-01',
            'LLM chatbot created:>2026-01-01',
            'AI image generation created:>2026-01-01',
            'machine learning tool created:>2026-01-01'
        ]
        
        candidates = []
        
        async with aiohttp.ClientSession() as session:
            headers = {'Accept': 'application/vnd.github.v3+json'}
            if self.github_token:
                headers['Authorization'] = f'token {self.github_token}'
            
            for query in search_queries:
                try:
                    async with session.get(
                        'https://api.github.com/search/repositories',
                        headers=headers,
                        params={
                            'q': query,
                            'sort': 'stars',
                            'order': 'desc',
                            'per_page': 10
                        }
                    ) as resp:
                        if resp.status == 200:
                            data = await resp.json()
                            repos = [item['full_name'] for item in data.get('items', [])]
                            
                            # 并发分析每个repo
                            tasks = [self.analyze_tool(session, repo) for repo in repos]
                            results = await asyncio.gather(*tasks)
                            
                            for candidate in results:
                                if candidate and candidate.hype_score > 30:
                                    candidates.append(candidate)
                            
                except Exception as e:
                    print(f"❌ Search error: {e}")
        
        # 去重并排序
        seen = set()
        unique = []
        for c in candidates:
            if c.name not in seen:
                seen.add(c.name)
                unique.append(c)
        
        unique.sort(key=lambda x: x.hype_score, reverse=True)
        return unique[:20]  # 返回Top 20

def generate_install_guide(tool: ToolCandidate) -> str:
    """生成安装指南"""
    name = tool.name.lower()
    
    guide = f"""## ⚡ 30秒快速体验

```bash
# 访问在线Demo（如果有）
open {tool.website}
```

## 🐳 Docker 部署（推荐）

```bash
# 一键启动
docker run -d -p 8080:8080 --name {name} {name}/{name}:latest

# 或使用 docker-compose
curl -O https://raw.githubusercontent.com/xxx/{name}/main/docker-compose.yml
docker-compose up -d
```

## 📦 包管理器安装

### 从源码
```bash
git clone {tool.repo_url}
cd {name}
# 根据项目类型选择：
npm install && npm run build  # Node.js
pip install -r requirements.txt  # Python
```

## ✅ 验证安装

```bash
# 检查服务状态
curl http://localhost:8080/health

# 查看日志
docker logs -f {name}
```
"""
    return guide

def format_output(candidates: List[ToolCandidate]) -> str:
    """格式化输出"""
    lines = []
    lines.append("=" * 70)
    lines.append("🔥 今日热门 AI 工具（社交热度驱动）")
    lines.append("=" * 70)
    lines.append("")
    
    for i, c in enumerate(candidates[:10], 1):
        lines.append(f"{i}. {c.tier} {c.name}")
        lines.append(f"   📊 热度分: {c.hype_score:.1f} | 病毒系数: {c.viral_coefficient:.2f}")
        lines.append(f"   📝 {c.description[:60]}...")
        lines.append(f"   ⭐ GitHub: {c.metrics.github_stars} ({c.metrics.github_stars_per_day:.0f}/天)")
        lines.append(f"   🔗 {c.website}")
        lines.append("")
    
    return "\n".join(lines)

async def main():
    print("🚀 启动社交热度扫描...")
    print()
    
    aggregator = HypeAggregator()
    candidates = await aggregator.scan_trending_repos()
    
    print(format_output(candidates))
    
    # 保存结果
    output = {
        'scanned_at': datetime.now().isoformat(),
        'candidates': [
            {
                'name': c.name,
                'description': c.description,
                'website': c.website,
                'repo_url': c.repo_url,
                'hype_score': c.hype_score,
                'viral_coefficient': c.viral_coefficient,
                'tier': c.tier,
                'metrics': c.metrics.to_dict(),
                'install_guide': generate_install_guide(c)
            }
            for c in candidates
        ]
    }
    
    os.makedirs('content/daily', exist_ok=True)
    date_str = datetime.now().strftime('%Y-%m-%d')
    with open(f'content/daily/{date_str}.json', 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"✅ 结果已保存到 content/daily/{date_str}.json")

if __name__ == '__main__':
    asyncio.run(main())
