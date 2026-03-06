import requests

API_KEY = "sk-cp-3j1CJqg4FcIftDXhHKkSP5AU8flu5PG92bg66_cR0mi1G1P8PGoMPK5OErj5QyQqHxvD5RL5pwB6B7pIINvilc0dS68Iiu1_NW1W8htzClsdkw4w0fjeCCg"

print("=== MiniMax API 测试 (带 Group ID) ===\n")

# MiniMax 需要从 API Key 提取 Group ID
# 格式: sk-{group_id}-{random_string}
if API_KEY.startswith("sk-"):
    parts = API_KEY.split("-")
    if len(parts) >= 3:
        group_id = parts[2]  # cp
        print(f"提取的 Group ID: {group_id}\n")

# 测试 API - 标准 OpenAI 格式
print("测试标准 OpenAI 格式...")
response = requests.post(
    "https://api.minimax.chat/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "model": "MiniMax-Text-01",
        "messages": [{"role": "user", "content": "你好"}],
        "max_tokens": 100
    },
    timeout=30
)

print(f"状态码: {response.status_code}")
print(f"响应: {response.text[:500]}")
