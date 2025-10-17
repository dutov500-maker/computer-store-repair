"""
Business: Универсальное API для получения и управления каталогом, услугами, ремонтом и портфолио
Args: event - dict с httpMethod, queryStringParameters (type, action, id), body
      context - объект с request_id
Returns: HTTP response с JSON данными
"""

import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Database connection not configured'})
        }
    
    query_params = event.get('queryStringParameters', {}) or {}
    data_type = query_params.get('type', 'catalog')
    action = query_params.get('action', 'list')
    
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cursor = conn.cursor()
    
    if method == 'POST' and data_type == 'catalog':
        try:
            if action == 'create':
                body_data = json.loads(event.get('body', '{}'))
                specs = body_data.get('specs', {})
                
                cursor.execute("""
                    INSERT INTO catalog 
                    (title, description, price, resolution, specs, image_url, is_active)
                    VALUES (%s, %s, %s, %s, %s, %s, true)
                    RETURNING id
                """, (
                    body_data.get('title'),
                    body_data.get('description'),
                    body_data.get('price'),
                    body_data.get('resolution', 'Full HD'),
                    json.dumps(specs),
                    body_data.get('image_url')
                ))
                
                new_id = cursor.fetchone()[0]
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'id': new_id, 'message': 'Created successfully'})
                }
            
            elif action == 'update':
                item_id = query_params.get('id')
                body_data = json.loads(event.get('body', '{}'))
                specs = body_data.get('specs', {})
                
                cursor.execute("""
                    UPDATE catalog 
                    SET title = %s, description = %s, price = %s, resolution = %s,
                        specs = %s, image_url = %s
                    WHERE id = %s
                """, (
                    body_data.get('title'),
                    body_data.get('description'),
                    body_data.get('price'),
                    body_data.get('resolution'),
                    json.dumps(specs),
                    body_data.get('image_url'),
                    item_id
                ))
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'message': 'Updated successfully'})
                }
            
            elif action == 'delete':
                item_id = query_params.get('id')
                
                cursor.execute("UPDATE catalog SET is_active = false WHERE id = %s", (item_id,))
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'message': 'Deleted successfully'})
                }
        except Exception as e:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': str(e)})
            }
    
    if method == 'POST' and data_type == 'portfolio':
        try:
            if action == 'create':
                body_data = json.loads(event.get('body', '{}'))
                
                cursor.execute("""
                    INSERT INTO portfolio_items 
                    (title, description, image_url, category, specs, price_range, completion_date, is_active)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, true)
                    RETURNING id
                """, (
                    body_data.get('title'),
                    body_data.get('description'),
                    body_data.get('image_url'),
                    body_data.get('category', 'Игровой ПК'),
                    body_data.get('specs'),
                    body_data.get('price_range'),
                    body_data.get('completion_date') or None
                ))
                
                new_id = cursor.fetchone()[0]
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'id': new_id, 'message': 'Created successfully'})
                }
            
            elif action == 'update':
                item_id = query_params.get('id')
                body_data = json.loads(event.get('body', '{}'))
                
                cursor.execute("""
                    UPDATE portfolio_items 
                    SET title = %s, description = %s, image_url = %s, category = %s,
                        specs = %s, price_range = %s, completion_date = %s
                    WHERE id = %s
                """, (
                    body_data.get('title'),
                    body_data.get('description'),
                    body_data.get('image_url'),
                    body_data.get('category'),
                    body_data.get('specs'),
                    body_data.get('price_range'),
                    body_data.get('completion_date') or None,
                    item_id
                ))
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'message': 'Updated successfully'})
                }
            
            elif action == 'delete':
                item_id = query_params.get('id')
                
                cursor.execute("UPDATE portfolio_items SET is_active = false WHERE id = %s", (item_id,))
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'isBase64Encoded': False,
                    'body': json.dumps({'message': 'Deleted successfully'})
                }
        except Exception as e:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': str(e)})
            }
    
    if data_type == 'services':
        cursor.execute("""
            SELECT id, title, description, price, icon, display_order, is_active
            FROM services
            WHERE is_active = true
            ORDER BY display_order, id
        """)
        
        rows = cursor.fetchall()
        items = []
        
        for row in rows:
            items.append({
                'id': row[0],
                'title': row[1],
                'description': row[2],
                'price': row[3],
                'icon': row[4],
                'display_order': row[5],
                'is_active': row[6]
            })
    
    elif data_type == 'repairs':
        cursor.execute("""
            SELECT id, title, description, price, icon, display_order, is_active
            FROM repairs
            WHERE is_active = true
            ORDER BY display_order, id
        """)
        
        rows = cursor.fetchall()
        items = []
        
        for row in rows:
            items.append({
                'id': row[0],
                'title': row[1],
                'description': row[2],
                'price': row[3],
                'icon': row[4],
                'display_order': row[5],
                'is_active': row[6]
            })
    
    elif data_type == 'portfolio':
        cursor.execute("""
            SELECT id, title, description, image_url, category, specs, price_range, 
                   completion_date, display_order, is_active
            FROM portfolio_items
            WHERE is_active = true
            ORDER BY display_order, id
        """)
        
        rows = cursor.fetchall()
        items = []
        
        for row in rows:
            items.append({
                'id': row[0],
                'title': row[1],
                'description': row[2],
                'image_url': row[3],
                'category': row[4],
                'specs': row[5],
                'price_range': row[6],
                'completion_date': row[7],
                'display_order': row[8],
                'is_active': row[9]
            })
    
    else:
        cursor.execute("""
            SELECT id, title, description, price, resolution, specs, image_url, display_order, is_active
            FROM catalog
            WHERE is_active = true
            ORDER BY display_order, id
        """)
        
        rows = cursor.fetchall()
        items = []
        
        for row in rows:
            items.append({
                'id': row[0],
                'title': row[1],
                'description': row[2],
                'price': row[3],
                'resolution': row[4],
                'specs': row[5],
                'image_url': row[6],
                'display_order': row[7],
                'is_active': row[8]
            })
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps(items, ensure_ascii=False)
    }