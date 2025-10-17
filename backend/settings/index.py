import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления настройками сайта, услугами, каталогом и страницами  
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict with settings/services/catalog/pages data
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
            elif resource == 'catalog':
                return get_catalog(conn)
            elif resource == 'portfolio':
                return get_portfolio(conn)
            elif resource == 'page':
                slug = query_params.get('slug')
                return get_page(conn, slug)
            else:
                return error_response('Invalid resource', 400)
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            resource = body_data.get('resource')
            
            if resource == 'settings':
                return update_settings(conn, body_data)
            elif resource == 'service':
                return update_service(conn, body_data)
            elif resource == 'catalog_item':
                return update_catalog_item(conn, body_data)
            elif resource == 'portfolio_item':
                return update_portfolio_item(conn, body_data)
            elif resource == 'page':
                return update_page(conn, body_data)
            else:
                return error_response('Invalid resource', 400)
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            resource = body_data.get('resource')
            if resource == 'service':
                return create_service(conn, body_data)
            elif resource == 'catalog_item':
                return create_catalog_item(conn, body_data)
            elif resource == 'portfolio_item':
                return create_portfolio_item(conn, body_data)
            else:
                return error_response('Invalid resource', 400)
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {})
            resource = query_params.get('resource')
            item_id = query_params.get('id')
            if not item_id:
                return error_response('Missing ID', 400)
            if resource == 'service':
                return delete_service(conn, int(item_id))
            elif resource == 'catalog_item':
                return delete_catalog_item(conn, int(item_id))
            elif resource == 'portfolio_item':
                return delete_portfolio_item(conn, int(item_id))
            else:
                return error_response('Invalid resource', 400)
        
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


def get_catalog(conn) -> Dict[str, Any]:
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("""
        SELECT id, title, description, price, resolution, specs, image_url, display_order, is_active
        FROM catalog_items 
        WHERE is_active = true
        ORDER BY display_order, id
    """)
    items = cursor.fetchall()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'catalog': items}),
        'isBase64Encoded': False
    }


def get_page(conn, slug: str) -> Dict[str, Any]:
    if not slug:
        return error_response('Missing page slug', 400)
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT slug, title, content, meta_description FROM pages WHERE slug = %s", (slug,))
    page = cursor.fetchone()
    cursor.close()
    
    if not page:
        return error_response('Page not found', 404)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'page': page}),
        'isBase64Encoded': False
    }


def update_catalog_item(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    item_id = data.get('id')
    title = data.get('title')
    description = data.get('description')
    price = data.get('price')
    resolution = data.get('resolution')
    specs = data.get('specs', {})
    image_url = data.get('image_url')
    display_order = data.get('display_order', 0)
    is_active = data.get('is_active', True)
    
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE catalog_items 
        SET title = %s, description = %s, price = %s, resolution = %s, 
            specs = %s, image_url = %s, display_order = %s, is_active = %s, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
    """, (title, description, price, resolution, json.dumps(specs), image_url, display_order, is_active, item_id))
    
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'message': 'Товар обновлен'}),
        'isBase64Encoded': False
    }


def update_page(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    slug = data.get('slug')
    title = data.get('title')
    content = data.get('content')
    meta_description = data.get('meta_description')
    
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE pages 
        SET title = %s, content = %s, meta_description = %s, updated_at = CURRENT_TIMESTAMP
        WHERE slug = %s
    """, (title, content, meta_description, slug))
    
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'message': 'Страница обновлена'}),
        'isBase64Encoded': False
    }


def create_catalog_item(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    title = data.get('title')
    description = data.get('description', '')
    price = data.get('price', 0)
    resolution = data.get('resolution', 'FHD')
    specs = data.get('specs', {})
    image_url = data.get('image_url')
    display_order = data.get('display_order', 0)
    
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO catalog_items (title, description, price, resolution, specs, image_url, display_order)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (title, description, price, resolution, json.dumps(specs), image_url, display_order))
    
    new_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 201,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'id': new_id, 'message': 'Товар создан'}),
        'isBase64Encoded': False
    }


def delete_catalog_item(conn, item_id: int) -> Dict[str, Any]:
    cursor = conn.cursor()
    cursor.execute("DELETE FROM catalog_items WHERE id = %s", (item_id,))
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'message': 'Товар удален'}),
        'isBase64Encoded': False
    }


def get_portfolio(conn) -> Dict[str, Any]:
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("""
        SELECT id, title, description, image_url, display_order, is_active
        FROM portfolio_items 
        WHERE is_active = true
        ORDER BY display_order, id
    """)
    items = cursor.fetchall()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'portfolio': items}),
        'isBase64Encoded': False
    }


def create_portfolio_item(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    title = data.get('title')
    description = data.get('description', '')
    image_url = data.get('image_url')
    display_order = data.get('display_order', 0)
    
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO portfolio_items (title, description, image_url, display_order)
        VALUES (%s, %s, %s, %s)
        RETURNING id
    """, (title, description, image_url, display_order))
    
    new_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 201,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'id': new_id, 'message': 'Работа добавлена'}),
        'isBase64Encoded': False
    }


def update_portfolio_item(conn, data: Dict[str, Any]) -> Dict[str, Any]:
    item_id = data.get('id')
    title = data.get('title')
    description = data.get('description')
    image_url = data.get('image_url')
    display_order = data.get('display_order', 0)
    is_active = data.get('is_active', True)
    
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE portfolio_items 
        SET title = %s, description = %s, image_url = %s, 
            display_order = %s, is_active = %s, updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
    """, (title, description, image_url, display_order, is_active, item_id))
    
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'message': 'Работа обновлена'}),
        'isBase64Encoded': False
    }


def delete_portfolio_item(conn, item_id: int) -> Dict[str, Any]:
    cursor = conn.cursor()
    cursor.execute("DELETE FROM portfolio_items WHERE id = %s", (item_id,))
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'message': 'Работа удалена'}),
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