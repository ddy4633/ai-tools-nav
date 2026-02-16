# 好工具 - 实时内容采集系统

## 快速开始

### 1. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，填入你的密钥
nano .env
```

需要配置的变量：
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
GITHUB_TOKEN=your-github-token  # 可选，但建议配置以提高 API 限制
```

### 2. 运行监控脚本

```bash
# 运行所有监控
./scripts/run-monitors.sh

# 或单独运行
python3 scripts/monitor/product_hunt.py
python3 scripts/monitor/github_trending.py
```

### 3. 设置定时任务 (Cron)

```bash
# 编辑 crontab
crontab -e

# 添加以下行
0 * * * * cd /path/to/ai-tools-nav && ./scripts/run-monitors.sh >> logs/monitor.log 2>&1
```

## 监控源

| 源 | 频率 | 说明 |
|---|------|------|
| Product Hunt | 每小时 | AI分类新品，热度筛选 |
| GitHub Trending | 每天 | AI/ML相关仓库，增速筛选 |
| Twitter/X | 实时 | 计划中 |
| Hacker News | 实时 | 计划中 |

## 数据流

```
监控源 → 筛选算法 → Supabase (discovered) → 人工审核 → 发布
```

## 筛选标准

工具需要满足以下条件才会被收录：
- Product Hunt: 点赞 > 50，且热度得分 > 15
- GitHub: 日增星标 > 100，且是实际工具（非列表/教程）
- AI 相关：名称/描述/标签包含 AI 相关关键词

## 内容分级

| 级别 | 得分 | 处理方式 |
|------|------|----------|
| S级 | >30 | 立即审核，全渠道推广 |
| A级 | >20 | 当天审核发布 |
| B级 | >15 | 批量审核，定时发布 |

## 下一步

- [ ] 接入 Product Hunt API（获取真实数据）
- [ ] 搭建人工审核后台
- [ ] 实现自动内容生成
- [ ] 接入 Twitter/X 监控
- [ ] 实现社交媒体自动发布
