"""
Business: Универсальное API для получения каталога, услуг и ремонта
Args: event - dict с httpMethod, queryStringParameters (type: catalog/services/repairs)
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
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
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
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Database connection not configured'})
        }
    
    query_params = event.get('queryStringParameters', {}) or {}
    data_type = query_params.get('type', 'catalog')
    
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
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
