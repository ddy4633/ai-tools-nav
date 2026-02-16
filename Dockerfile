FROM node:20-alpine

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装所有依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 创建启动脚本
RUN echo '#!/bin/sh\nif [ -f ".next/standalone/server.js" ]; then\n  node .next/standalone/server.js\nelif [ -f ".next/standalone/openclaw_code/ai-tools-nav/server.js" ]; then\n  node .next/standalone/openclaw_code/ai-tools-nav/server.js\nelse\n  echo "Error: server.js not found"\n  find .next/standalone -name "server.js" -type f\n  exit 1\nfi' > /app/start.sh && chmod +x /app/start.sh

# 启动应用
CMD ["/app/start.sh"]
