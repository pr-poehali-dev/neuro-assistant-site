import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Генерация персональных советов для людей с СДВГ через OpenAI GPT-4
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_str = event.get('body', '{}')
        if not body_str or body_str.strip() == '':
            body_str = '{}'
        body_data = json.loads(body_str)
        user_situation = body_data.get('situation', '')
        
        if not user_situation:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Опиши свою ситуацию'}),
                'isBase64Encoded': False
            }
        
        try:
            import openai
            
            openai.api_key = os.environ.get('OPENAI_API_KEY')
            
            response = openai.chat.completions.create(
                model='gpt-4',
                messages=[
                    {
                        'role': 'system',
                        'content': '''Ты психолог-помощник для людей с СДВГ. 
Твоя задача: давать короткие, конкретные и добрые советы.
Используй простые техники: дыхание, движение, разбивку задач, таймеры.
Ответ должен быть 2-4 предложения, с эмпатией и пониманием.
Всегда предлагай конкретное действие, которое можно сделать прямо сейчас.'''
                    },
                    {
                        'role': 'user',
                        'content': user_situation
                    }
                ],
                max_tokens=200,
                temperature=0.8
            )
            
            advice = response.choices[0].message.content.strip()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'advice': advice,
                    'timestamp': context.request_id
                }),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': 'Не удалось получить совет',
                    'details': str(e)
                }),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }