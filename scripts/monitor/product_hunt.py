#!/usr/bin/env python3
"""
Product Hunt 监控脚本
每小时抓取 AI 分类的新品，筛选出有价值的工具
"""

import requests
import json
import os
from datetime import datetime, timedelta
from typing import List, Dict, Optional

# 配置
SUPABASE_URL = os.getenv('SUPABASE_URL', '')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY', '')
MIN_VOTES = 50  # 最小点赞数
MIN_AGE_HOURS = 48  # 最大年龄（小时）

def fetch_product_hunt_posts() -> List[Dict]:
    """获取 Product Hunt 最新帖子"""
    # 使用 Product Hunt GraphQL API
    # 注意：实际使用需要 API Token
    query = """
    {
      posts(first: 20, postedAfter: "{date}") {
        edges {
          node {
            id
            name
            tagline
            description
            url
            website
            thumbnail {
              url
            }
            votesCount
            commentsCount
            createdAt
            topics {
              edges {
                node {
                  name
                }
              }
            }
            makers {
              name
              twitterUsername
            }
          }
        }
      }
    }
    """.format(date=(datetime.now() - timedelta(hours=MIN_AGE_HOURS)).isoformat())
    
    # 这里使用模拟数据演示结构
    # 实际部署时需要替换为真实 API 调用
    mock_posts = [
        {
            "id": "mock-1",
            "name": "AI Code Reviewer",
            "tagline": "Automated code reviews using AI",
            "description": "Get instant code reviews on every PR with AI-powered suggestions.",
            "url": "https://www.producthunt.com/posts/ai-code-reviewer",
            "website": "https://aicodereview.com",
            "thumbnail": {"url": "https://example.com/icon.png"},
            "votesCount": 120,
            "commentsCount": 25,
            "createdAt": datetime.now().isoformat(),
            "topics": [{"node": {"name": "AI"}}, {"node": {"name": "Developer Tools"}}],
            "makers": [{"name": "John Doe", "twitterUsername": "johndoe"}]
        }
    ]
    
    return mock_posts

def calculate_viral_score(post: Dict) -> float:
    """计算热度得分"""
    votes = post.get('votesCount', 0)
    comments = post.get('commentsCount', 0)
    
    # 基础得分
    score = min(votes / 100, 10) + min(comments / 20, 5)
    
    # 时效加分（24小时内）
    created = datetime.fromisoformat(post['createdAt'].replace('Z', '+00:00'))
    hours_old = (datetime.now() - created).total_seconds() / 3600
    if hours_old <= 24:
        score += 10
    elif hours_old <= 48:
        score += 5
    
    return score

def is_ai_related(post: Dict) -> bool:
    """判断是否 AI 相关"""
    ai_keywords = ['ai', 'artificial intelligence', 'machine learning', 'llm', 'gpt', 'chatbot', 'automation']
    
    text = f"{post.get('name', '')} {post.get('tagline', '')} {post.get('description', '')}".lower()
    
    # 检查 topics
    topics = [t['node']['name'].lower() for t in post.get('topics', {}).get('edges', [])]
    
    return any(kw in text or kw in ' '.join(topics) for kw in ai_keywords)

def should_track(post: Dict) -> bool:
    """判断是否值得追踪"""
    # 基本条件
    if post.get('votesCount', 0) < MIN_VOTES:
        return False
    
    # 必须是 AI 相关
    if not is_ai_related(post):
        return False
    
    # 计算得分
    score = calculate_viral_score(post)
    return score >= 15

def save_to_supabase(posts: List[Dict]):
    """保存到 Supabase"""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("⚠️ Supabase credentials not set, skipping database save")
        return
    
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json'
    }
    
    for post in posts:
        data = {
            'name': post['name'],
            'tagline': post['tagline'],
            'description': post.get('description', ''),
            'website': post.get('website', post['url']),
            'icon': post.get('thumbnail', {}).get('url', ''),
            'source': 'product-hunt',
            'source_url': post['url'],
            'viral_score': calculate_viral_score(post),
            'social_metrics': {
                'productHunt': {
                    'votes': post.get('votesCount', 0),
                    'comments': post.get('commentsCount', 0)
                }
            },
            'status': 'discovered',
            'discovered_at': datetime.now().isoformat(),
            'source_posted_at': post['createdAt']
        }
        
        try:
            response = requests.post(
                f"{SUPABASE_URL}/rest/v1/tools",
                headers=headers,
                json=data
            )
            if response.status_code == 201:
                print(f"✅ Saved: {post['name']}")
            else:
                print(f"❌ Failed to save {post['name']}: {response.text}")
        except Exception as e:
            print(f"❌ Error saving {post['name']}: {e}")

def main():
    print(f"🔍 Starting Product Hunt monitor at {datetime.now()}")
    
    # 获取帖子
    posts = fetch_product_hunt_posts()
    print(f"📊 Found {len(posts)} posts in last {MIN_AGE_HOURS}h")
    
    # 筛选
    tracked_posts = [p for p in posts if should_track(p)]
    print(f"⭐ {len(tracked_posts)} posts worth tracking")
    
    # 按得分排序
    tracked_posts.sort(key=calculate_viral_score, reverse=True)
    
    # 打印结果
    for post in tracked_posts:
        score = calculate_viral_score(post)
        print(f"\n[{score:.1f}] {post['name']}")
        print(f"    {post['tagline']}")
        print(f"    👍 {post.get('votesCount', 0)} 💬 {post.get('commentsCount', 0)}")
        print(f"    🔗 {post.get('website', post['url'])}")
    
    # 保存到数据库
    save_to_supabase(tracked_posts)
    
    print(f"\n✅ Monitor completed at {datetime.now()}")

if __name__ == '__main__':
    main()
