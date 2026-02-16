FROM node:20-alpine

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 复制源代码
COPY . .

# 构建
RUN npm run build

# 暴露端口
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 使用 Next.js 标准启动方式
CMD ["npm", "start"]
