# 变更日志 (Changelog)

所有项目的显著变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [1.0.0] - 2026-02-25

### 🚀 新增

#### 文档
- ✅ 创建完整的项目文档体系
  - `docs/PROJECT.md` - 项目总览和开发指南
  - `docs/API.md` - 详细的 API 文档
  - `docs/DEPLOY.md` - 部署指南
  - `docs/CHANGELOG.md` - 变更日志
- ✅ 更新 `docs/business-plan.md` - 补充竞争对手分析

#### 功能
- ✅ 首页 - 热度工具展示
- ✅ 工具列表页 - 全部 AI 工具
- ✅ 关于页面 - 项目介绍
- ✅ 工具提交页面 - 用户可以提交新工具
- ✅ 分类浏览 - 按类别查找工具
- ✅ 博客页面 - 文章展示

#### 技术
- ✅ Next.js 15 + React 19 + TypeScript
- ✅ Tailwind CSS 4.x 样式系统
- ✅ Supabase 数据库集成
- ✅ 响应式设计 (移动端友好)
- ✅ 懒加载 Supabase 客户端 (避免构建错误)
- ✅ 模拟数据回退 (数据库不可用时)

### 🔧 修复

- ✅ 修复 Supabase 客户端构建错误
  - 使用懒加载模式
  - 避免构建时初始化失败
- ✅ 修复 TypeScript 类型错误
  - `pricing_type` 类型精确定义
  - `Category` 接口字段对齐

### 📝 文档改进

| 文档 | 改进内容 |
|------|----------|
| PROJECT.md | 新增，包含项目概述、快速开始、开发指南、API、部署、故障排除 |
| API.md | 新增，详细的 API 文档，包含函数签名、参数、返回值、示例 |
| DEPLOY.md | 新增，Dokploy/Vercel/手动部署指南 |
| business-plan.md | 补充竞争对手分析 (5个竞品对比) |

### 🎯 里程碑

- ✅ 项目成功部署到 https://ai.poph163.com/
- ✅ Dokploy 自动部署配置完成
- ✅ GitHub 仓库配置完成
- ✅ 基础功能全部可用

---

## [0.9.0] - 2026-02-25

### 🚀 新增
- 基础项目结构
- 首页组件 (Hero, TrendingTools, FeaturedTools, Categories)
- Header 和 Footer 组件
- Supabase 数据获取函数
- 模拟数据 (数据库不可用时)

### 🔧 修复
- 构建错误修复
- 类型错误修复

---

## [0.1.0] - 2026-02-17

### 🚀 新增
- 项目初始化
- 基础设计文档
- 商业计划书

---

## 计划功能

### 即将发布
- [ ] 工具详情页面优化
- [ ] 用户评分系统
- [ ] 搜索功能增强
- [ ] Newsletter 订阅
- [ ] 微信小程序

### 未来规划
- [ ] 用户系统 (登录/注册)
- [ ] 收藏夹功能
- [ ] 工具对比功能
- [ ] 社区评论系统
- [ ] AI 推荐引擎

---

## 版本说明

### 版本号规则
- **主版本号 (X.y.z)**: 不兼容的 API 修改
- **次版本号 (x.Y.z)**: 向下兼容的功能新增
- **修订号 (x.y.Z)**: 向下兼容的问题修复

### 标签说明
- 🚀 新增 (Added)
- 🔧 修复 (Fixed)
- ⚡ 优化 (Changed)
- 🗑️ 废弃 (Deprecated)
- 🗑️️ 移除 (Removed)
- 🔒 安全 (Security)

---

**维护者**: ddy4633  
**最后更新**: 2026-02-25
