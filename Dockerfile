FROM nginx:alpine

# 复制静态文件到 nginx 目录
COPY dist /usr/share/nginx/html

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口 3000
EXPOSE 3000

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
