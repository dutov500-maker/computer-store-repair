import json
import os
import hashlib
import secrets
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Simple password-based authentication for admin panel
    Args: event with httpMethod POST, body with password
    Returns: HTTP response with success status and session token
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
    
    body_str = event.get('body', '{}')
    if not body_str or body_str == '{}':
        body_data = {}
    else:
        body_data = json.loads(body_str)
    
    password = body_data.get('password', '').strip()
    
    if not password:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Password is required'}),
            'isBase64Encoded': False
        }
    
    admin_password = os.environ.get('ADMIN_PASSWORD', 'admin123')
    
    if password == admin_password:
        session_token = secrets.token_hex(32)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'token': session_token,
                'message': 'Authentication successful'
            }),
            'isBase64Encoded': False
        }
    else:
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Invalid password'
            }),
            'isBase64Encoded': False
        }