import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления настройками сайта и услугами
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict with settings/services data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    
    try:
        if method == 'GET':
            query_params = event.get('queryStringParameters', {})
            resource = query_params.get('resource', 'settings')
            
            if resource == 'settings':
                return get_settings(conn)
            elif resource == 'services':
                return get_services(conn)
            else:
                return error_response('Invalid resource', 400)
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            resource = body_data.get('resource')
            
            if resource == 'settings':
                return update_settings(conn, body_data)
            elif resource == 'service':
                return update_service(conn, body_data)
            else:
                return error_response('Invalid resource', 400)
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            return create_service(conn, body_data)
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {})
            service_id = query_params.get('id')
            if not service_id:
                return error_response('Missing service ID', 400)
            return delete_service(conn, int(service_id))
        
        return error_response('Method not allowed', 405)
    
    finally:
        conn.close()


def get_settings(conn) -> Dict[str, Any]:
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT key, value, category FROM site_settings ORDER BY category, key")
    rows = cursor.fetchall()
    cursor.close()
    
    settings = {row['key']: row['value'] for row in rows}
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'settings': settings}),
        'isBase64Encoded': False
    }


def get_services(conn) -> Dict[str, Any]:
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("""
        SELECT id, title, description, price, features, icon, display_order, is_active
        FROM services 
        ORDER BY display_order, id
    """)
    services = cursor.fetchall()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'services': services}),
        'isBase64Encoded': False
    }


def update_settings(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    settings = data.get('settings', {})
    
    cursor = conn.cursor()
    for key, value in settings.items():
        cursor.execute("""
            UPDATE site_settings 
            SET value = %s, updated_at = CURRENT_TIMESTAMP 
            WHERE key = %s
        """, (value, key))
    
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'message': 'Настройки обновлены'}),
        'isBase64Encoded': False
    }


def update_service(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    service_id = data.get('id')
    title = data.get('title')
    description = data.get('description')
    price = data.get('price')
    features = data.get('features', [])
    icon = data.get('icon')
    display_order = data.get('display_order', 0)
    is_active = data.get('is_active', True)
    
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE services 
        SET title = %s, description = %s, price = %s, features = %s, 
            icon = %s, display_order = %s, is_active = %s, updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
    """, (title, description, price, features, icon, display_order, is_active, service_id))
    
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'message': 'Услуга обновлена'}),
        'isBase64Encoded': False
    }


def create_service(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    title = data.get('title')
    description = data.get('description', '')
    price = data.get('price', '')
    features = data.get('features', [])
    icon = data.get('icon', 'Wrench')
    display_order = data.get('display_order', 0)
    
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO services (title, description, price, features, icon, display_order)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (title, description, price, features, icon, display_order))
    
    new_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 201,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'id': new_id, 'message': 'Услуга создана'}),
        'isBase64Encoded': False
    }


def delete_service(conn, service_id: int) -> Dict[str, Any]:
    cursor = conn.cursor()
    cursor.execute("DELETE FROM services WHERE id = %s", (service_id,))
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'message': 'Услуга удалена'}),
        'isBase64Encoded': False
    }


def error_response(message: str, status_code: int) -> Dict[str, Any]:
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': message}),
        'isBase64Encoded': False
    }
