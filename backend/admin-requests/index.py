import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Admin panel API to view and update service requests
    Args: event with httpMethod (GET to list, PUT to update status)
    Returns: HTTP response with requests list or update confirmation
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    if method == 'GET':
        query_params = event.get('queryStringParameters', {}) or {}
        status_filter = query_params.get('status', '')
        
        if status_filter:
            status_safe = status_filter.replace("'", "''")
            query = f"""
                SELECT id, name, phone, email, service_type, message, status, 
                       created_at, updated_at
                FROM service_requests
                WHERE status = '{status_safe}'
                ORDER BY created_at DESC
                LIMIT 100
            """
            cur.execute(query)
        else:
            query = """
                SELECT id, name, phone, email, service_type, message, status, 
                       created_at, updated_at
                FROM service_requests
                ORDER BY created_at DESC
                LIMIT 100
            """
            cur.execute(query)
        
        rows = cur.fetchall()
        
        requests = []
        for row in rows:
            requests.append({
                'id': row[0],
                'name': row[1],
                'phone': row[2],
                'email': row[3],
                'service_type': row[4],
                'message': row[5],
                'status': row[6],
                'created_at': row[7].isoformat() if row[7] else None,
                'updated_at': row[8].isoformat() if row[8] else None
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'requests': requests, 'total': len(requests)}),
            'isBase64Encoded': False
        }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        request_id = body_data.get('id')
        new_status = body_data.get('status', '').strip()
        
        if not request_id or not new_status:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'ID and status are required'}),
                'isBase64Encoded': False
            }
        
        status_safe = new_status.replace("'", "''")
        query = f"""
            UPDATE service_requests
            SET status = '{status_safe}', updated_at = CURRENT_TIMESTAMP
            WHERE id = {int(request_id)}
        """
        cur.execute(query)
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Status updated'}),
            'isBase64Encoded': False
        }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }