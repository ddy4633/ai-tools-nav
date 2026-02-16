#!/bin/bash
# 运行所有监控脚本

cd "$(dirname "$0")/.."

echo "=========================================="
echo "🚀 启动内容监控系统"
echo "=========================================="
echo ""

# 检查 Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not found"
    exit 1
fi

# 安装依赖（如果需要）
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "📦 Installing dependencies..."
pip install -q requests 2>/dev/null

echo ""
echo "🔍 Running monitors..."
echo ""

# 运行 Product Hunt 监控
echo "1️⃣ Product Hunt Monitor"
python3 scripts/monitor/product_hunt.py
echo ""

# 运行 GitHub Trending 监控
echo "2️⃣ GitHub Trending Monitor"
python3 scripts/monitor/github_trending.py
echo ""

echo "=========================================="
echo "✅ 监控完成"
echo "=========================================="
