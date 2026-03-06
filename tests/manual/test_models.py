import requests
import json
import os

# 测试 MiniMax
def test_minimax():
    print("=== 测试 MiniMax ===")
    try:
        response = requests.post(
            "https://api.minimax.chat/v1/text/chatcompletion_v2",
            headers={
                "Authorization": f"Bearer {os.getenv('MINIMAX_API_KEY', 'sk-cp-3j1CJqg4FcIftDXhHKkSP5AU8flu5PG92bg66_cR0mi1G1P8PGoMPK5OErj5QyQqHxvD5RL5pwB6B7pIINvilc0dS68Iiu1_NW1W8htzClsdkw4w0fjeCCg')}",
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
        response = requests.post(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {os.getenv('NVIDIA_API_KEY', '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')}",
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
        response = requests.post(
            "https://api.moonshot.cn/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {os.getenv('MOONSHOT_API_KEY', '19c33701-5cc2-883b-8000-00002f2fc8d8')}",
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
