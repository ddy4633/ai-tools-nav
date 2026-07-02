import requests
import json
import os

def require_api_key(env_name):
    api_key = os.getenv(env_name)
    if not api_key:
        raise RuntimeError(f"Missing required environment variable: {env_name}")
    return api_key

# 测试 MiniMax
def test_minimax():
    print("=== 测试 MiniMax ===")
    try:
        api_key = require_api_key('MINIMAX_API_KEY')
        response = requests.post(
            "https://api.minimax.chat/v1/text/chatcompletion_v2",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "MiniMax-Text-01",
                "messages": [{"role": "user", "content": "你好"}],
                "max_tokens": 100
            },
            timeout=30
        )
        if response.status_code == 200:
            print(f"✅ MiniMax 正常")
            print(f"   响应: {response.json()['choices'][0]['message']['content'][:50]}...")
            return True
        else:
            print(f"❌ MiniMax 错误: {response.status_code}")
            print(f"   {response.text[:200]}")
            return False
    except Exception as e:
        print(f"❌ MiniMax 异常: {e}")
        return False

# 测试 NVIDIA GLM
def test_nvidia_glm():
    print("\n=== 测试 NVIDIA GLM 5.0 ===")
    try:
        api_key = require_api_key('NVIDIA_API_KEY')
        response = requests.post(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "z-ai/glm5",
                "messages": [{"role": "user", "content": "你好"}],
                "max_tokens": 100
            },
            timeout=30
        )
        if response.status_code == 200:
            print(f"✅ NVIDIA GLM 正常")
            print(f"   响应: {response.json()['choices'][0]['message']['content'][:50]}...")
            return True
        else:
            print(f"❌ NVIDIA GLM 错误: {response.status_code}")
            print(f"   {response.text[:200]}")
            return False
    except Exception as e:
        print(f"❌ NVIDIA GLM 异常: {e}")
        return False

# 测试 Kimi
def test_kimi():
    print("\n=== 测试 Kimi K2.5 ===")
    try:
        api_key = require_api_key('MOONSHOT_API_KEY')
        response = requests.post(
            "https://api.moonshot.cn/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": "kimi-k2-5",
                "messages": [{"role": "user", "content": "你好"}],
                "max_tokens": 100
            },
            timeout=30
        )
        if response.status_code == 200:
            print(f"✅ Kimi 正常")
            print(f"   响应: {response.json()['choices'][0]['message']['content'][:50]}...")
            return True
        else:
            print(f"❌ Kimi 错误: {response.status_code}")
            print(f"   {response.text[:200]}")
            return False
    except Exception as e:
        print(f"❌ Kimi 异常: {e}")
        return False

if __name__ == "__main__":
    print("开始测试模型 API...\n")
    
    results = {
        "MiniMax": test_minimax(),
        "NVIDIA GLM": test_nvidia_glm(),
        "Kimi": test_kimi()
    }
    
    print("\n=== 测试结果汇总 ===")
    for model, status in results.items():
        icon = "✅" if status else "❌"
        print(f"{icon} {model}: {'正常' if status else '异常'}")
