FROM node:20-alpine

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 复制源代码
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 复制静态文件到 standalone 目录（如果使用 standalone 模式）
RUN if [ -d ".next/standalone" ]; then cp -r .next/static .next/standalone/.next/ 2>/dev/null || true; fi

# 暴露端口 3000
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# 启动 Next.js
CMD ["npm", "start"]
