"""
Business: API для получения каталога товаров из базы данных
Args: event - dict с httpMethod, queryStringParameters
      context - объект с request_id, function_name и др.
Returns: HTTP response с JSON списком товаров
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
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database connection not configured'})
        }
    
    query_params = event.get('queryStringParameters', {}) or {}
    item_id = query_params.get('id')
    
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
    if item_id:
        cursor.execute("""
            SELECT id, title, description, price, resolution, specs, image_url, display_order, is_active
            FROM catalog
            WHERE id = %s AND is_active = true
        """, (item_id,))
        
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if not row:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Item not found'})
            }
        
        item = {
            'id': row[0],
            'title': row[1],
            'description': row[2],
            'price': row[3],
            'resolution': row[4],
            'specs': row[5],
            'image_url': row[6],
            'display_order': row[7],
            'is_active': row[8]
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(item, ensure_ascii=False)
        }
    
    cursor.execute("""
        SELECT id, title, description, price, resolution, specs, image_url, display_order, is_active
        FROM catalog
        WHERE is_active = true
        ORDER BY display_order, id
    """)
    
    rows = cursor.fetchall()
    catalog = []
    
    for row in rows:
        catalog.append({
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
        'body': json.dumps(catalog, ensure_ascii=False)
    }