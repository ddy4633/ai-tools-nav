FROM node:20-alpine

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 复制源代码
COPY . .

# 构建
RUN npm run build

# 复制 static 文件到 standalone 目录（Next.js standalone 需要）
RUN cp -r .next/static .next/standalone/openclaw_code/ai-tools-nav/.next/ 2>/dev/null || cp -r .next/static .next/standalone/.next/ 2>/dev/null || true

# 暴露端口
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 使用完整路径启动
CMD ["sh", "-c", "if [ -f .next/standalone/server.js ]; then node .next/standalone/server.js; else node .next/standalone/openclaw_code/ai-tools-nav/server.js; fi"]
