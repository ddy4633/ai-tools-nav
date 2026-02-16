#!/usr/bin/env python3
"""
GitHub Trending 监控脚本
每天抓取 AI/ML 相关的热门仓库
"""

import requests
import json
import os
from datetime import datetime
from typing import List, Dict

SUPABASE_URL = os.getenv('SUPABASE_URL', '')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY', '')
MIN_STARS_DAILY = 100  # 日增星标数阈值

def fetch_github_trending() -> List[Dict]:
    """获取 GitHub Trending"""
    # GitHub API 没有直接的 trending endpoint
    # 使用搜索 API 按创建时间和星标排序
    
    query = "machine learning OR ai OR llm OR chatbot created:>2026-01-01"
    
    headers = {
        'Accept': 'application/vnd.github.v3+json'
    }
    
    # 如果有 GitHub Token，添加到 headers
    github_token = os.getenv('GITHUB_TOKEN', '')
    if github_token:
        headers['Authorization'] = f'token {github_token}'
    
    try:
        response = requests.get(
            'https://api.github.com/search/repositories',
            headers=headers,
            params={
                'q': query,
                'sort': 'stars',
                'order': 'desc',
                'per_page': 30
            }
        )
        
        if response.status_code == 200:
            return response.json().get('items', [])
        else:
            print(f"⚠️ GitHub API error: {response.status_code}")
            return []
    except Exception as e:
        print(f"❌ Error fetching GitHub: {e}")
        return []

def calculate_growth_rate(repo: Dict) -> float:
    """计算星标增长速度"""
    total_stars = repo.get('stargazers_count', 0)
    created_at = datetime.fromisoformat(repo['created_at'].replace('Z', '+00:00'))
    days_since_creation = (datetime.now() - created_at).days
    
    if days_since_creation == 0:
        return total_stars
    
    return total_stars / days_since_creation

def is_tool_not_collection(repo: Dict) -> bool:
    """判断是否是实际工具，不是列表/教程"""
    name = repo.get('name', '').lower()
    description = repo.get('description', '').lower()
    
    # 排除列表类仓库
    list_keywords = ['awesome', 'list', 'resources', 'papers', 'courses', 'tutorial', 'examples']
    if any(kw in name or kw in description for kw in list_keywords):
        return False
    
    return True

def should_track(repo: Dict) -> bool:
    """判断是否值得追踪"""
    # 必须是实际工具
    if not is_tool_not_collection(repo):
        return False
    
    # 星标增长速度
    growth_rate = calculate_growth_rate(repo)
    if growth_rate < MIN_STARS_DAILY:
        return False
    
    # 有 README
    if not repo.get('has_readme', True):
        return False
    
    return True

def save_to_supabase(repos: List[Dict]):
    """保存到 Supabase"""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("⚠️ Supabase credentials not set, skipping database save")
        return
    
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json'
    }
    
    for repo in repos:
        data = {
            'name': repo['name'],
            'tagline': repo.get('description', '')[:100],
            'description': repo.get('description', ''),
            'website': repo.get('homepage') or repo['html_url'],
            'github_url': repo['html_url'],
            'icon': f"https://github.com/{repo['owner']['login']}.png",
            'source': 'github',
            'source_url': repo['html_url'],
            'viral_score': calculate_growth_rate(repo),
            'social_metrics': {
                'github': {
                    'stars': repo.get('stargazers_count', 0),
                    'forks': repo.get('forks_count', 0),
                    'language': repo.get('language', '')
                }
            },
            'status': 'discovered',
            'discovered_at': datetime.now().isoformat(),
            'source_posted_at': repo['created_at']
        }
        
        try:
            response = requests.post(
                f"{SUPABASE_URL}/rest/v1/tools",
                headers=headers,
                json=data
            )
            if response.status_code == 201:
                print(f"✅ Saved: {repo['name']}")
            else:
                print(f"❌ Failed to save {repo['name']}: {response.text}")
        except Exception as e:
            print(f"❌ Error saving {repo['name']}: {e}")

def main():
    print(f"🔍 Starting GitHub Trending monitor at {datetime.now()}")
    
    repos = fetch_github_trending()
    print(f"📊 Found {len(repos)} repos")
    
    # 筛选
    tracked_repos = [r for r in repos if should_track(r)]
    print(f"⭐ {len(tracked_repos)} repos worth tracking")
    
    # 按增长速度排序
    tracked_repos.sort(key=calculate_growth_rate, reverse=True)
    
    # 打印结果
    for repo in tracked_repos[:10]:
        growth = calculate_growth_rate(repo)
        print(f"\n[{growth:.0f}⭐/day] {repo['name']}")
        print(f"    {repo.get('description', 'No description')[:80]}")
        print(f"    ⭐ {repo.get('stargazers_count', 0)} 🔀 {repo.get('forks_count', 0)}")
        print(f"    🔗 {repo['html_url']}")
    
    # 保存到数据库
    save_to_supabase(tracked_repos)
    
    print(f"\n✅ Monitor completed at {datetime.now()}")

if __name__ == '__main__':
    main()
