"""
Business: API для управления каталогом товаров (CRUD операции)
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с request_id, function_name и др.
Returns: HTTP response с результатом операции
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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
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
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            cursor.execute("""
                SELECT id, title, description, price, resolution, specs, image_url, display_order, is_active
                FROM catalog
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
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(items, ensure_ascii=False)
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            cursor.execute("""
                INSERT INTO catalog (title, description, price, resolution, specs, image_url, display_order, is_active)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                body.get('title'),
                body.get('description'),
                body.get('price'),
                body.get('resolution'),
                json.dumps(body.get('specs', {})),
                body.get('image_url'),
                body.get('display_order', 0),
                body.get('is_active', True)
            ))
            new_id = cursor.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': new_id, 'success': True}, ensure_ascii=False)
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            item_id = body.get('id')
            
            cursor.execute("""
                UPDATE catalog
                SET title = %s, description = %s, price = %s, resolution = %s,
                    specs = %s, image_url = %s, display_order = %s, is_active = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (
                body.get('title'),
                body.get('description'),
                body.get('price'),
                body.get('resolution'),
                json.dumps(body.get('specs', {})),
                body.get('image_url'),
                body.get('display_order', 0),
                body.get('is_active', True),
                item_id
            ))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True}, ensure_ascii=False)
            }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {}) or {}
            item_id = query_params.get('id')
            
            cursor.execute("DELETE FROM catalog WHERE id = %s", (item_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True}, ensure_ascii=False)
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
    finally:
        cursor.close()
        conn.close()
