# 好工具 - 社交热度驱动的发现引擎
## 最新 · 最热 · AI原生 · 一键安装

**核心理念**: 我们不生产内容，我们只是社交热度的搬运工和放大器  
**数据来源**: 100% 来自社区（GitHub、Twitter、Reddit、Discord、Hacker News）  
**价值主张**: 发现「正在病毒式传播」的AI工具，并提供「复制即用」的安装方案

---

## 一、数据金字塔

```
                    ┌─────────────┐
                    │   精选发布    │  ← 网站展示（每日Top 5-10）
                    │  (Top 0.1%)  │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   人工审核    │  ← 快速验证（30分钟/篇）
                    │  (Top 1%)   │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
     ┌──────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
     │  GitHub     │ │ Twitter  │ │  Reddit/    │
     │  Trending   │ │  Viral    │ │  Discord/   │
     │  (Top 10%)  │ │  (Top 5%) │ │  HN (Top 5%)│
     └─────────────┘ └──────────┘ └─────────────┘
```

---

## 二、监控网络（全社交覆盖）

### 2.1 监控矩阵

| 平台 | 监控方式 | 热度指标 | 权重 | 延迟 |
|------|----------|----------|------|------|
| **GitHub** | Trending API + Search | ⭐增速/天 | 30% | 实时 |
| **Twitter/X** | API v2 + List监控 | 🔥转发/点赞增速 | 25% | 实时 |
| **Hacker News** | Firebase API | ▲投票/评论 | 20% | 实时 |
| **Reddit** | PRAW API | ⬆️Upvote增速 | 15% | 15分钟 |
| **Discord** | Bot监控热门频道 | 💬讨论热度 | 10% | 30分钟 |
| **Product Hunt** | GraphQL API | 👍投票增速 | 10% | 1小时 |

### 2.2 热度计算公式

```python
# 综合热度分（0-100）
def calculate_hype_score(tool_data):
    github_score = min(tool_data['stars_per_day'] / 200 * 30, 30)
    twitter_score = min(tool_data['tweet_engagement'] / 1000 * 25, 25)
    hn_score = min(tool_data['hn_votes'] / 200 * 20, 20)
    reddit_score = min(tool_data['reddit_upvotes'] / 500 * 15, 15)
    discord_score = min(tool_data['discord_mentions'] / 100 * 10, 10)
    
    # 时间衰减（越新越热）
    hours_old = tool_data['age_hours']
    freshness_bonus = max(0, 20 - hours_old / 6)  # 24小时内最高+20
    
    return github_score + twitter_score + hn_score + reddit_score + discord_score + freshness_bonus

# 病毒系数（判断是否会爆）
def calculate_viral_coefficient(tool_data):
    # 增速比绝对值更重要
    velocity = tool_data['growth_velocity']  # 最近6小时 vs 前6小时
    return velocity * 0.6 + tool_data['hype_score'] * 0.4
```

---

## 三、工具分级系统

### 3.1 实时分级

| 等级 | 热度分 | 病毒系数 | 标签 | 处理方式 |
|------|--------|----------|------|----------|
| **🔥 爆炸级** | >80 | >2.0 | BREAKING | 立即推送，全渠道覆盖 |
| **⚡ 热门级** | 60-80 | 1.2-2.0 | TRENDING | 2小时内审核发布 |
| **🚀 新兴级** | 40-60 | 0.8-1.2 | NEW | 当日审核，次日发布 |
| **💡 观察级** | 20-40 | <0.8 | WATCH | 入库观察，暂不发布 |

### 3.2 分级示例

```yaml
工具: Lovable.dev
GitHub: ⭐ 2.1k (增速: 800/天)
Twitter: 1.2k likes, 400 RTs (24h)
Hacker News: 312 points, 89 comments
Reddit: r/webdev 890 upvotes
热度分: 85
病毒系数: 2.3
等级: 🔥 爆炸级
标签: BREAKING | AI编程 | 低代码
```

---

## 四、安装方案标准（核心差异化）

### 4.1 安装方案矩阵

每个工具必须提供以下安装方式：

| 方式 | 难度 | 时间 | 适用场景 | 必须提供 |
|------|------|------|----------|----------|
| **☁️ 云端即用** | ⭐ | 1分钟 | 快速体验 | ✅ 官方Demo/Playground |
| **🐳 Docker** | ⭐⭐ | 5分钟 | 本地快速部署 | ✅ 一键docker-compose.yml |
| **📦 包管理器** | ⭐⭐⭐ | 10分钟 | 开发环境 | ✅ pip/npm/conda 命令 |
| **🔧 源码安装** | ⭐⭐⭐⭐ | 30分钟 | 深度定制 | ✅ 依赖清单+步骤 |
| **☸️ K8s** | ⭐⭐⭐⭐⭐ | 1小时 | 生产部署 | ⚠️ 热门工具才需提供 |

### 4.2 安装文档模板

```markdown
# {工具名} - 安装指南

## ⚡ 30秒快速体验
```bash
# 在线Demo（无需安装）
open https://{tool}.demo

# 或 Docker 一键启动
docker run -p 3000:3000 {tool}/{tool}:latest
```

## 🐳 Docker 部署（推荐）

### 基础版
```bash
docker pull {tool}/{tool}:latest
docker run -d -p 8080:8080 --name {tool} {tool}/{tool}:latest
```

### 完整版（带数据库/缓存）
```bash
# 下载 compose 文件
curl -O https://raw.githubusercontent.com/{user}/{tool}/main/docker-compose.yml

# 启动
docker-compose up -d

# 查看日志
docker-compose logs -f
```

### 环境变量配置
```bash
cp .env.example .env
# 编辑必要配置
nano .env
```

## 📦 包管理器安装

### macOS
```bash
brew install {tool}
{tool} --version
```

### Ubuntu/Debian
```bash
wget -qO- https://{tool}.dev/install.sh | bash
# 或
sudo apt install {tool}
```

### Python
```bash
pip install {tool}
python -m {tool} --help
```

### Node.js
```bash
npm install -g {tool}
# 或
npx {tool}
```

## 🔧 源码安装

### 前置依赖
- Node.js >= 18
- Python >= 3.10
- Git

### 步骤
```bash
# 克隆
git clone https://github.com/{user}/{tool}.git
cd {tool}

# 安装依赖
npm install
# 或
pip install -r requirements.txt

# 配置
cp .env.example .env
# 编辑配置

# 启动
cd scripts
./run.sh
```

## ☸️ Kubernetes 部署

```bash
# 使用 Helm
helm repo add {tool} https://charts.{tool}.dev
helm install {tool} {tool}/{tool}

# 或使用 kubectl
kubectl apply -f https://raw.githubusercontent.com/{user}/{tool}/main/k8s/
```

## ✅ 验证安装

```bash
# 检查版本
{tool} --version

# 运行测试
{tool} --test

# 访问 Web UI
open http://localhost:8080
```

## 🆘 常见问题

### 端口冲突
```bash
# 修改端口映射
docker run -p 8081:8080 {tool}/{tool}:latest
```

### 内存不足
```bash
# 限制内存
docker run -m 2g {tool}/{tool}:latest
```

## 📚 下一步

- [快速开始指南](./quickstart.md)
- [配置详解](./config.md)
- [API文档](./api.md)
```

---

## 五、内容生产流水线

### 5.1 自动化流程

```
社交媒体监控 → 热度计算 → 分级筛选 → 信息聚合 → 安装方案生成 → 人工审核 → 发布
     ↑________________________↓←←←←←←← 用户反馈优化 ←←←←←←←←┘
```

### 5.2 信息聚合（AI辅助）

对于每个被筛选出的工具，自动抓取：

1. **GitHub 元数据**
   - README 内容
   - 最近 commits
   - Issues 统计
   - 依赖分析

2. **社交媒体讨论**
   - Twitter 上谁在讨论
   - Hacker News 评论摘要
   - Reddit 讨论热度

3. **安装信息**
   - 是否有 Dockerfile
   - 是否有 docker-compose
   - 包管理器支持
   - 环境要求

4. **竞品对比**
   - 同类型工具热度对比
   - 功能差异点
   - 迁移成本

### 5.3 AI生成内容

```python
# 使用多模型生成
prompt = f"""
基于以下数据生成工具评测：

工具名: {tool_name}
GitHub: {stars}⭐ ({stars_per_day}/天)
热度分: {hype_score}
社交讨论: {social_summary}
安装方式: {install_methods}

要求：
1. 一句话卖点（为什么现在火）
2. 3个核心功能点
3. 最适合的场景（具体例子）
4. 与竞品的差异化
5. 快速开始命令（复制即用）

语气：像朋友推荐，有观点，不客观
"""

# GLM5 生成技术评测
# Kimi 生成使用场景
# MiniMax 生成安装指南
```

---

## 六、实时推送机制

### 6.1 推送渠道

| 渠道 | 内容形式 | 频率 | 自动化 |
|------|----------|------|--------|
| **网站首页** | 实时榜单 | 实时 | ✅ |
| **Twitter/X** | 快讯 + 链接 | 即时 | ✅ |
| **Telegram频道** | 详细评测 | 每日Top 5 | ⚠️ |
| **Newsletter** | 周刊汇总 | 每周 | ⚠️ |
| **RSS** | 全文输出 | 实时 | ✅ |

### 6.2 Twitter 快讯模板

```
🔥 {工具名} 正在 GitHub 上病毒式传播！

📊 { stars }⭐ | { forks }🍴 | 增速 { velocity }x

{一句话卖点}

⚡ 30秒体验：
```bash
{一键启动命令}
```

👉 {链接}

#{分类} #AI工具 #开源
```

---

## 七、成功指标

### 7.1 核心指标

| 指标 | 目标 | 监控方式 |
|------|------|----------|
| **发现延迟** | < 2小时 | 社交发布时间 vs 我们发布时间 |
| **热度预测准确率** | > 70% | 预测热门 vs 实际热门 |
| **安装方案完整度** | 100% | 每个工具都有 Docker/包管理器方案 |
| **一键部署成功率** | > 90% | 用户反馈统计 |
| **内容新鲜度** | < 7天 | 首页工具平均发布时间 |

### 7.2 用户行为指标

- **点击安装按钮率** > 30%
- **部署成功反馈率** > 50%
- **次日回访率** > 40%
- **社交分享率** > 5%

---

## 八、技术架构

### 8.1 数据流

```
┌─────────────────────────────────────────────────────────┐
│                      监控层                              │
│  GitHub  Twitter  HN  Reddit  Discord  Product Hunt     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                      计算层                              │
│  热度聚合  病毒预测  分级筛选  去重                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                      内容层                              │
│  信息聚合  安装方案生成  AI写作  人工审核                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                      发布层                              │
│  网站  Twitter  Telegram  Newsletter  RSS               │
└─────────────────────────────────────────────────────────┘
```

### 8.2 技术栈

- **监控**: Python + aiohttp (异步并发)
- **计算**: Redis (缓存) + PostgreSQL (存储)
- **内容**: Next.js (网站) + AI APIs (生成)
- **发布**: Vercel (边缘部署) + Twitter API

---

**下一步**: 实施这套系统，先搭建监控网络。
