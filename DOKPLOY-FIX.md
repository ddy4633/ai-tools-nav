# Dokploy 手动配置指南

## 问题根源
Dokploy 服务仍在使用旧的 Nixpacks 配置，需要手动切换到 Dockerfile。

## 手动修复步骤

### 1. 登录 Dokploy
- 访问: https://dokploy.vibecodinghub.org/dashboard/projects
- 点击项目 `ai-tools-nav`

### 2. 进入服务配置
- 点击服务名称 `web`
- 切换到 **General** 标签

### 3. 修改构建配置
找到 **Build** 部分，修改以下设置：

```
Build Type: Dockerfile
Dockerfile: ./Dockerfile
```

### 4. 确认端口配置
```
Port: 3000
```

### 5. 修改健康检查（可选）
如果健康检查导致问题，可以先禁用：
```
Health Check Path: /api/health
或者暂时禁用
```

### 6. 重新部署
- 点击 **Deploy** 按钮
- 等待 3-5 分钟构建完成

### 7. 验证部署
- 查看 **Logs** 标签检查构建日志
- 访问 http://aitoolsnav-web.dokploy.vibecodinghub.org/

## 备用方案：重新创建服务

如果修改配置无效，建议删除服务重新创建：

1. 删除现有 `web` 服务
2. 点击 **Create Service** → **Application**
3. 填写配置：
   - Name: `web`
   - Type: `Dockerfile`
   - Dockerfile: `./Dockerfile`
   - Port: `3000`
4. 环境变量已配置，无需修改
5. 点击 **Deploy**

## 当前代码状态

✅ Dockerfile 已修复
✅ 自动检测 standalone 路径
✅ 健康检查端点已添加
✅ Next.js 15 + Tailwind v4 配置正确

## 本地验证命令

```bash
cd ~/Downloads/openclaw_code/ai-tools-nav
npm run build
# 构建成功，8 个页面
```

等待 Dokploy 配置更新后网站即可访问。
