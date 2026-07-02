import os
import requests


def main() -> None:
    api_key = os.getenv('MINIMAX_API_KEY')
    if not api_key:
        print('缺少环境变量: MINIMAX_API_KEY')
        return

    print('=== MiniMax API 测试 (带 Group ID) ===\n')

    if api_key.startswith('sk-'):
        parts = api_key.split('-')
        if len(parts) >= 3:
            group_id = parts[2]
            print(f'提取的 Group ID: {group_id}\n')

    print('测试标准 OpenAI 格式...')
    response = requests.post(
        'https://api.minimax.chat/v1/chat/completions',
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        },
        json={
            'model': 'MiniMax-Text-01',
            'messages': [{'role': 'user', 'content': '你好'}],
            'max_tokens': 100
        },
        timeout=30
    )

    print(f'状态码: {response.status_code}')
    print(f'响应: {response.text[:500]}')


if __name__ == '__main__':
    main()
