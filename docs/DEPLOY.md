# 部署指南

## 概述

本文档描述如何将 AI Tools Navigator 部署到生产环境。

---

## 部署方式

### 方式一: Dokploy 自动部署 (推荐) ✅

这是当前项目使用的部署方式。

#### 配置步骤

1. **准备代码**
   ```bash
   # 确保代码已推送到 GitHub
   git push origin main
   ```

2. **Dokploy 自动检测**
   - Dokploy 会自动检测 GitHub 推送
   - 自动拉取最新代码
   - 自动执行构建
   - 自动部署到生产环境

3. **查看部署状态**
   - 访问 Dokploy Dashboard
   - 查看部署日志
   - 确认构建成功

4. **验证部署**
   ```bash
   curl -I https://ai.poph163.com/
   # HTTP/2 200
   ```

#### 环境变量配置

在 Dokploy Dashboard 中设置：

```env
# 必需
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 可选
NEXT_PUBLIC_SITE_URL=https://ai.poph163.com
NODE_ENV=production
```

#### 自动部署触发

只需执行：
```bash
git push origin main
```

Dokploy 会自动完成：
1. 拉取代码
2. 安装依赖
3. 构建项目
4. 部署上线

---

### 方式二: Vercel 部署

#### 步骤

1. **导入项目**
   - 访问 https://vercel.com
   - 导入 GitHub 仓库

2. **配置环境变量**
   - 添加 Supabase 相关变量

3. **部署**
   - 自动检测并部署
   - 获得 vercel.app 域名

4. **绑定自定义域名**
   - 在 Vercel 设置中添加 ai.poph163.com
   - 配置 DNS 记录

---

### 方式三: 手动服务器部署

#### 要求
- Linux 服务器
- Node.js 18+
- Nginx (反向代理)
- PM2 (进程管理)

#### 步骤

1. **服务器准备**
   ```bash
   # 安装 Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # 安装 PM2
   npm install -g pm2
   ```

2. **拉取代码**
   ```bash
   git clone https://github.com/ddy4633/ai-tools-nav.git
   cd ai-tools-nav
   npm install
   ```

3. **配置环境变量**
   ```bash
   nano .env.local
   # 添加 Supabase 配置
   ```

4. **构建**
   ```bash
   npm run build
   ```

5. **启动服务**
   ```bash
   pm2 start npm --name "ai-tools-nav" -- start
   pm2 save
   pm2 startup
   ```

6. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name ai.poph163.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **配置 HTTPS**
   ```bash
   sudo certbot --nginx -d ai.poph163.com
   ```

---

## 数据库初始化

首次部署需要初始化数据库：

### 1. 创建 Supabase 项目

1. 访问 https://supabase.com
2. 创建新项目
3. 记录项目 URL 和 API Keys

### 2. 执行初始化 SQL

```sql
-- 创建分类表
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  count INTEGER DEFAULT 0,
  popularity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建工具表
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  website VARCHAR(500),
  repo_url VARCHAR(500),
  category_id UUID REFERENCES categories(id),
  pricing_type VARCHAR(20) CHECK (pricing_type IN ('free', 'paid', 'freemium')),
  is_featured BOOLEAN DEFAULT FALSE,
  hype_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_featured ON tools(is_featured);
CREATE INDEX idx_tools_hype ON tools(hype_score DESC);

-- 插入初始分类
INSERT INTO categories (name, slug, description, count, popularity) VALUES
('AI写作', 'writing', '智能写作助手', 120, 95),
('AI图像', 'image', '图像生成与编辑', 85, 90),
('AI编程', 'code', '代码助手与开发工具', 64, 85),
('AI音频', 'audio', '语音合成与音乐创作', 42, 70);

-- 插入示例工具
INSERT INTO tools (name, description, website, pricing_type, is_featured) VALUES
('ChatGPT', 'OpenAI 开发的大型语言模型', 'https://chatgpt.com', 'freemium', true),
('Midjourney', '强大的 AI 图像生成工具', 'https://midjourney.com', 'paid', true),
('Claude', 'Anthropic 开发的 AI 助手', 'https://claude.ai', 'freemium', true);
```

### 3. 验证数据库连接

```bash
# 测试连接
curl -I https://ai.poph163.com/api/health
```

---

## 监控与日志

### Dokploy 监控

- **Dashboard**: 查看实时日志
- **Metrics**: CPU、内存、网络使用
- **Alerts**: 部署失败通知

### 应用日志

```bash
# 查看 PM2 日志 (如果使用)
pm2 logs ai-tools-nav

# 查看 Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 健康检查

```bash
# 检查应用状态
curl https://ai.poph163.com/api/health

# 预期响应
{"status":"ok","timestamp":"2026-02-25T18:30:00.000Z"}
```

---

## 故障排除

### 部署失败

**症状**: Dokploy 显示构建失败

**检查**:
1. 查看构建日志
2. 检查 package.json 是否正确
3. 确认环境变量已设置

**解决**:
```bash
# 本地测试构建
npm run build

# 修复错误后重新推送
git push origin main
```

### 数据库连接失败

**症状**: 页面显示模拟数据

**检查**:
1. Supabase URL 是否正确
2. API Key 是否有效
3. 数据库表是否存在

**解决**:
```bash
# 检查环境变量
echo $NEXT_PUBLIC_SUPABASE_URL

# 重新执行 SQL 初始化
```

### 性能问题

**症状**: 页面加载慢

**优化**:
1. 启用 CDN (CloudFlare)
2. 优化图片大小
3. 启用 gzip 压缩
4. 调整缓存策略

---

## 更新部署

### 常规更新

```bash
# 1. 本地修改代码
# 2. 测试
npm run dev

# 3. 提交
git add .
git commit -m "更新描述"

# 4. 推送 (自动触发部署)
git push origin main
```

### 回滚

如果需要回滚到之前版本：

```bash
# 查看历史
git log --oneline

# 回滚到指定版本
git revert <commit-hash>
git push origin main
```

---

## 备份策略

### 数据库备份

Supabase 自动每日备份，也可手动导出：

```bash
# 使用 Supabase CLI
supabase db dump -f backup.sql
```

### 代码备份

GitHub 本身就是代码备份，建议：
- 定期 push 到 GitHub
- 创建 release 标签
- 使用 GitHub 的备份功能

---

**部署平台**: Dokploy  
**域名**: https://ai.poph163.com/  
**最后更新**: 2026-02-25
