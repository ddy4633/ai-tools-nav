# Dokploy 部署配置指南

## 项目信息

- **GitHub 仓库**: https://github.com/ddy4633/ai-tools-nav
- **Supabase 项目**: https://supabase.com/dashboard/project/crmkyaoczrvnjsizlaas
- **Supabase URL**: https://crmkyaoczrvnjsizlaas.supabase.co

## Dokploy 配置步骤

### 1. 创建项目

在 Dokploy Dashboard:
1. 点击 "Create Project"
2. 项目名称: `ai-tools-nav`
3. 描述: `AI工具导航站`

### 2. 添加服务

创建项目后，添加服务:

**服务类型**: Application

**基础配置**:
- Service Name: `ai-tools-nav-web`
- Build Type: `Dockerfile` 或 `Nixpacks`

**Git 配置**:
- Repository: `https://github.com/ddy4633/ai-tools-nav`
- Branch: `main`
- Auto Deploy: ✅ 启用

**环境变量**:
```
NEXT_PUBLIC_SUPABASE_URL=https://crmkyaoczrvnjsizlaas.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybWt5YW9jenJ2bmpzaXpsYWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNzQxNDksImV4cCI6MjA4Njc1MDE0OX0.q_qxaozd4Ct_B2yyrZXbVJSCon57kO8HCdWr_7xtG9M
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybWt5YW9jenJ2bmpzaXpsYWFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTE3NDE0OSwiZXhwIjoyMDg2NzUwMTQ5fQ.mHcUfPwebMa6QLYeErwey-dDhTvWjR3MUtmKIIarX2M
NODE_ENV=production
```

**构建配置**:
- Port: `3000`
- Build Command: `npm run build`
- Start Command: `npm start`

### 3. 域名配置

**方式 A: 使用 Dokploy 提供的域名**
- 无需额外配置，部署后自动分配

**方式 B: 绑定自定义域名**
1. 在域名 DNS 添加 A 记录指向 Dokploy 服务器 IP
2. 在 Dokploy 中添加 Domain
3. 启用 HTTPS (Let's Encrypt)

### 4. 部署

点击 "Deploy" 开始部署。

### 5. 验证

部署完成后访问:
- Dokploy 域名: `https://ai-tools-nav-web.dokploy.vibecodinghub.org`
- 或自定义域名

## 数据库初始化

部署前必须在 Supabase 执行 SQL:

1. 打开 https://supabase.com/dashboard/project/crmkyaoczrvnjsizlaas
2. 左侧 SQL Editor → New query
3. 粘贴 `supabase/init.sql` 内容
4. 点击 Run

这将创建:
- 9 个分类
- 10 个示例工具数据
- 完整的表结构和索引

## 更新部署

代码推送后自动触发部署，或手动点击 "Deploy"。

## 监控

- Dokploy Dashboard 查看部署日志
- Supabase Dashboard 监控数据库
