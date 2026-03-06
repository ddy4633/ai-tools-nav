#!/bin/bash
# 完整测试脚本

echo "=========================================="
echo "🧪 AI工具导航站 - 完整功能测试"
echo "=========================================="

echo ""
echo "等待 60 秒让部署生效..."
sleep 60

BASE_URL="https://ai.poph163.com"
PASS=0
FAIL=0

test_page() {
    local name=$1
    local url=$2
    local code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$code" = "200" ]; then
        echo "✅ $name: HTTP $code"
        ((PASS++))
    else
        echo "❌ $name: HTTP $code"
        ((FAIL++))
    fi
}

echo ""
echo "📄 页面访问测试"
echo "----------------------------------------"
test_page "首页" "$BASE_URL/"
test_page "工具列表" "$BASE_URL/tools"
test_page "分类页" "$BASE_URL/categories"
test_page "关于页" "$BASE_URL/about"
test_page "提交页" "$BASE_URL/submit"
test_page "搜索功能" "$BASE_URL/tools?search=ChatGPT"

echo ""
echo "🎨 视觉元素检查"
echo "----------------------------------------"

# 检查关键文本
check_text() {
    local name=$1
    local text=$2
    if curl -s "$BASE_URL/" | grep -q "$text"; then
        echo "✅ $name"
        ((PASS++))
    else
        echo "❌ $name"
        ((FAIL++))
    fi
}

check_text "Logo文字" "好工具"
check_text "主标题" "值得被看见"
check_text "编辑精选板块" "编辑精选"
check_text "新配色应用" "bg-bg-primary"
check_text "SEO描述" "发现真正好用的工具"

echo ""
echo "📱 功能测试"
echo "----------------------------------------"

# 测试响应头
if curl -s -I "$BASE_URL/" | grep -q "text/html"; then
    echo "✅ Content-Type正确"
    ((PASS++))
else
    echo "❌ Content-Type异常"
    ((FAIL++))
fi

# 测试gzip压缩
if curl -s -I "$BASE_URL/" | grep -q "gzip\|br"; then
    echo "✅ 压缩已启用"
    ((PASS++))
else
    echo "⚠️ 压缩可能未启用"
    ((FAIL++))
fi

echo ""
echo "⚡ 性能测试"
echo "----------------------------------------"
for i in 1 2 3; do
    TIME=$(curl -s -o /dev/null -w "%{time_total}" "$BASE_URL/")
    echo "  测试 $i: ${TIME}s"
done

echo ""
echo "=========================================="
echo "📊 测试结果汇总"
echo "=========================================="
echo "✅ 通过: $PASS"
echo "❌ 失败: $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
    echo "🎉 所有测试通过！"
    exit 0
else
    echo "⚠️ 有 $FAIL 项测试未通过，请检查"
    exit 1
fi
