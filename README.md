# AI Tools Navigator - 发现最好用的 AI 工具

🌐 **在线访问**: [https://ai.poph163.com/](https://ai.poph163.com/)

## 项目简介

AI Tools Navigator（好工具）是一个专注于发现和评测 AI 工具的中文导航平台。当前版本以精选工具为主，涵盖 AI 写作、图像生成、代码助手、对话 AI 等热门领域，帮助用户快速找到适合自己需求的工具。

## 核心特性

- 🔥 **热度排行** - 静态示例数据，可扩展接入真实数据源
- 🏷️ **智能分类** - 20+ 精细分类，快速定位目标工具
- 🔍 **高级搜索** - 支持关键词、拼音、分类多维搜索
- ⭐ **用户评分** - 静态版本为本地评分（localStorage）
- 📧 **Newsletter** - 静态版本为本地订阅（localStorage）
- 📱 **响应式设计** - 完美适配桌面和移动端
- 🚀 **极速加载** - 静态生成 + CDN 加速

## 相关生态工具

- [ProductoKit 图片工具箱](https://www.productokit.com/image-kit?utm_source=ai-tools-nav-readme&utm_medium=github&utm_campaign=ecosystem_links) - 一站式图片裁剪、压缩与尺寸处理
- [ProductoKit 文案润色器](https://www.productokit.com/text-polisher?utm_source=ai-tools-nav-readme&utm_medium=github&utm_campaign=ecosystem_links) - 面向创作者与运营团队的文本优化工具

## 技术架构

- **框架**: Next.js 15 + React 19 + TypeScript
- **样式**: Tailwind CSS 4.x
- **数据库**: Supabase (PostgreSQL，可选)
- **部署**: Dokploy / Vercel
- **监控**: 内置健康检查 API

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Git

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/ddy4633/ai-tools-nav.git
cd ai-tools-nav

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的配置

# 本地开发
npm run dev

# 访问 http://localhost:3000
```

### 构建部署

```bash
# 生产构建
npm run build

# 启动服务
npm start
```

## 环境变量配置

创建 `.env.local` 文件：

```env
# Supabase 配置（可选，未配置则使用本地数据）
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 站点配置
NEXT_PUBLIC_SITE_URL=https://ai.poph163.com
```

## 项目结构

```
ai-tools-nav/
├── app/                    # Next.js App Router
├── components/             # React 组件
├── lib/                    # 业务逻辑与工具函数
├── content/                # 内容与导入数据
├── public/                 # 静态资源与图标
├── scripts/                # 数据脚本与运维脚本
├── docs/                   # 核心文档、专题文档、历史归档
│   ├── archive/            # 历史方案与自动迭代归档
│   ├── iteration-reports/  # 迭代报告
│   └── research/           # 研究文档
├── research/               # 早期调研资料
├── reviews/                # 评审记录
├── tests/                  # 手工测试脚本
└── types/                  # TypeScript 类型
```

## 核心功能模块

### 1. 热度系统
- 基于 GitHub Stars 增长趋势
- Hacker News 投票和评论
- 社交媒体热度追踪
- 实时热度分数计算

### 2. 工具管理
- 完整工具信息录入
- 多维度分类标签
- 定价模式标识
- 用户评分（静态版本为本地评分）

### 3. 内容系统
- 工具评测文章
- 使用教程
- 行业资讯
- Newsletter 订阅

## 开发指南

### 添加新工具

1. 在本地数据文件中添加工具记录（`lib/content/tools-data.ts`）
2. 上传工具图标到 `public/` 或使用外链
3. 添加工具评测文章（可选）

### 添加新分类

1. 更新 `lib/content/tools-data.ts` 中的分类列表
2. 添加分类图标
3. 更新首页分类展示

### SEO 优化

- 所有页面已配置动态元数据
- 自动生成 sitemap.xml
- 结构化数据标记
- Open Graph 图片

## 部署指南

### Dokploy 部署（推荐）

1. Fork 本仓库到 GitHub
2. 在 Dokploy 中创建新项目
3. 连接 GitHub 仓库
4. 配置环境变量
5. 一键部署

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ddy4633/ai-tools-nav)

## 文档索引

- 项目文档总览：[`docs/README.md`](docs/README.md)
- 部署说明：[`docs/DEPLOY.md`](docs/DEPLOY.md)
- 更新日志：[`docs/CHANGELOG.md`](docs/CHANGELOG.md)

## 更新日志

查看 [`docs/CHANGELOG.md`](docs/CHANGELOG.md) 了解详细更新历史。

## 贡献指南

欢迎提交 Issue 和 PR！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 开发计划

- [x] MVP 版本发布
- [x] 热度排行榜
- [x] 搜索和筛选
- [x] 用户评分系统（静态版本为本地评分）
- [x] Newsletter 订阅（静态版本为本地订阅）
- [ ] 用户系统（登录/收藏）
- [ ] 工具对比功能
- [ ] 微信小程序
- [ ] AI 推荐引擎

## 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 联系方式

- 项目主页: https://ai.poph163.com/
- GitHub: https://github.com/ddy4633/ai-tools-nav
- Email: hello@ai.poph163.com

---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
