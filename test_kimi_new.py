import requests

API_KEY = "sk-kimi-W9kJlEsEmee7KtKSf9BPLfSw76es7WHvtwNlS5hB6juw5x7B19QidgiXpbX0a20h"

print("=== 测试 Kimi K2.5 新 API Key ===\n")

# 测试文本对话
print("1. 测试文本对话...")
try:
    response = requests.post(
        "https://api.moonshot.cn/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "kimi-k2-5",
            "messages": [
                {"role": "system", "content": "你是 Kimi，一个 helpful 的 AI 助手"},
                {"role": "user", "content": "你好，请介绍一下 Kimi K2.5 模型的特点"}
            ],
            "max_tokens": 200,
            "temperature": 0.7
        },
        timeout=30
    )
    
    print(f"   状态码: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        content = data['choices'][0]['message']['content']
        print(f"   ✅ Kimi K2.5 正常")
        print(f"   响应: {content[:150]}...")
    else:
        print(f"   ❌ 错误: {response.status_code}")
        print(f"   {response.text[:300]}")
        
except Exception as e:
    print(f"   ❌ 异常: {e}")

# 测试模型列表
print("\n2. 测试模型列表...")
try:
    response = requests.get(
        "https://api.moonshot.cn/v1/models",
        headers={"Authorization": f"Bearer {API_KEY}"},
        timeout=10
    )
    print(f"   状态码: {response.status_code}")
    if response.status_code == 200:
        models = response.json()
        print(f"   ✅ 可用模型:")
        for model in models.get('data', [])[:5]:
            print(f"      - {model.get('id')}")
    else:
        print(f"   响应: {response.text[:200]}")
except Exception as e:
    print(f"   ❌ 异常: {e}")

print("\n=== 测试完成 ===")
