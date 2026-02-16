#!/bin/sh

# 查找 server.js 的多个可能位置
SERVER_JS=""

# 尝试多个可能的路径
for path in \
    ".next/standalone/server.js" \
    ".next/standalone/openclaw_code/ai-tools-nav/server.js" \
    ".next/standalone/app/server.js"
do
    if [ -f "$path" ]; then
        SERVER_JS="$path"
        echo "Found server.js at: $path"
        break
    fi
done

# 如果没找到，搜索整个 standalone 目录
if [ -z "$SERVER_JS" ]; then
    echo "Searching for server.js in .next/standalone..."
    SERVER_JS=$(find .next/standalone -name "server.js" -type f | grep -v node_modules | head -1)
fi

# 如果找到了，启动它
if [ -n "$SERVER_JS" ]; then
    echo "Starting server: $SERVER_JS"
    node "$SERVER_JS"
else
    echo "ERROR: server.js not found!"
    echo "Contents of .next/standalone:"
    ls -la .next/standalone/ 2>/dev/null || echo "Directory not found"
    exit 1
fi
