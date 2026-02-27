# 开发标准操作流程 (SOP)

## 文件修改后必做检查清单

### 1. 类型检查
- [ ] 运行 `npm run type-check` 或检查 IDE 类型错误
- [ ] 修复所有 TypeScript 错误

### 2. 本地构建验证
- [ ] 运行 `npm run build`
- [ ] 确保构建成功，无错误
- [ ] 检查 .next/standalone 目录是否生成（如使用 Docker 部署）

### 3. 代码检查
- [ ] 检查是否有未使用的导入
- [ ] 检查是否有 console.log 需要移除
- [ ] 检查文件权限是否正确

### 4. Git 提交
- [ ] `git status` 查看变更
- [ ] `git add .` 或选择性添加
- [ ] `git commit -m "type: 描述"`（遵循 Conventional Commits）
- [ ] `git push` 推送到远程

### 5. 部署验证
- [ ] 检查 Dokploy/Vercel 构建状态
- [ ] 验证线上功能正常

## 提交信息规范

### 格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式（不影响代码运行）
- refactor: 重构
- test: 测试
- chore: 构建/工具

### 示例
```
feat(seo): 添加面包屑导航组件

- 实现 Breadcrumb 组件
- 添加 JSON-LD 结构化数据
- 应用到工具详情页
```

## 常见问题速查

### Q: Docker 构建失败
A: 检查 next.config.js 是否有 `output: 'standalone'`

### Q: 类型检查失败
A: 修复所有红色下划线错误后再提交

### Q: 合并冲突
A: 先 `git pull`，解决冲突后再 `git push`
