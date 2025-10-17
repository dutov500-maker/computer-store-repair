import json
import os
import psycopg2
from typing import Dict, Any
from urllib import request, error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Handle service request submissions from contact form
    Args: event with httpMethod, body (name, phone, email, service_type, message)
    Returns: HTTP response with success/error status
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
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    name = body_data.get('name', '').strip()
    phone = body_data.get('phone', '').strip()
    email = body_data.get('email', '').strip()
    service_type = body_data.get('service_type', '').strip()
    message = body_data.get('message', '').strip()
    
    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Name and phone are required'}),
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    query = """
        INSERT INTO service_requests (name, phone, email, service_type, message, status)
        VALUES (%s, %s, %s, %s, %s, 'new')
        RETURNING id
    """
    
    cur.execute(query, (name, phone, email if email else None, service_type if service_type else None, message if message else None))
    request_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    conn.close()
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if bot_token and chat_id:
        try:
            service_name = service_type if service_type else 'Консультация'
            message_text = f"""🔔 Новая заявка #{request_id}

👤 Имя: {name}
📞 Телефон: {phone}
✉️ Email: {email if email else 'Не указан'}
🛠 Услуга: {service_name}
📝 Сообщение: {message if message else 'Не указано'}"""
            
            telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
            telegram_data = json.dumps({
                'chat_id': chat_id,
                'text': message_text
            }).encode('utf-8')
            
            req = request.Request(
                telegram_url,
                data=telegram_data,
                headers={'Content-Type': 'application/json'}
            )
            
            with request.urlopen(req, timeout=10) as response:
                response.read()
                
        except (error.URLError, Exception):
            pass
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': 'Request submitted successfully',
            'request_id': request_id
        }),
        'isBase64Encoded': False
    }