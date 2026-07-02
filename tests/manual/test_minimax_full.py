import os
import requests


def main() -> None:
    api_key = os.getenv('MINIMAX_API_KEY')
    if not api_key:
        print('缺少环境变量: MINIMAX_API_KEY')
        return

    print('=== 测试 MiniMax 2.5 全模态模型 ===\n')

    print('1. 测试文本对话...')
    try:
        response = requests.post(
            'https://api.minimax.chat/v1/text/chatcompletion_v2',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'MiniMax-Text-01',
                'messages': [
                    {'role': 'system', 'content': '你是一个 helpful 的 AI 助手'},
                    {'role': 'user', 'content': '你好，请介绍一下 MiniMax-Text-01 模型'}
                ],
                'max_tokens': 200,
                'temperature': 0.7
            },
            timeout=30
        )

        print(f'   状态码: {response.status_code}')
        data = response.json()

        if 'base_resp' in data and data['base_resp'].get('status_code') == 0:
            print('   ✅ 文本对话正常')
            if 'choices' in data and len(data['choices']) > 0:
                content = data['choices'][0].get('message', {}).get('content', '')
                print(f'   响应: {content[:100]}...')
        else:
            print(f"   ❌ 错误: {data.get('base_resp', {})}")

    except Exception as error:
        print(f'   ❌ 异常: {error}')

    print('\n2. 检查模型列表...')
    try:
        response = requests.get(
            'https://api.minimax.chat/v1/models',
            headers={'Authorization': f'Bearer {api_key}'},
            timeout=10
        )
        print(f'   状态码: {response.status_code}')
        if response.status_code == 200:
            models = response.json()
            print(f'   ✅ 可用模型: {models}')
        else:
            print(f'   响应: {response.text[:200]}')
    except Exception as error:
        print(f'   ❌ 异常: {error}')

    print('\n=== 测试完成 ===')


if __name__ == '__main__':
    main()
