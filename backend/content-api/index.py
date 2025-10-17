import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Universal API for managing services, catalog, portfolio, and settings
    Args: event with httpMethod, queryStringParameters, body
    Returns: HTTP response with data or operation result
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    try:
        # GET requests - fetch data
        if method == 'GET':
            query_params = event.get('queryStringParameters', {}) or {}
            resource = query_params.get('resource', '')
            
            if resource == 'services':
                cur.execute("""
                    SELECT id, title, description, price, features, icon, 
                           display_order, is_active
                    FROM services
                    ORDER BY display_order, id
                """)
                rows = cur.fetchall()
                services = []
                for row in rows:
                    features_data = row[4]
                    if isinstance(features_data, str):
                        features_list = json.loads(features_data) if features_data else []
                    else:
                        features_list = features_data if features_data else []
                    
                    services.append({
                        'id': row[0],
                        'title': row[1],
                        'description': row[2],
                        'price': row[3],
                        'features': features_list,
                        'icon': row[5],
                        'display_order': row[6],
                        'is_active': row[7]
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'services': services}),
                    'isBase64Encoded': False
                }
            
            elif resource == 'catalog':
                cur.execute("""
                    SELECT id, title, description, price, resolution, specs, 
                           image_url, display_order, is_active
                    FROM catalog_items
                    ORDER BY display_order, id
                """)
                rows = cur.fetchall()
                catalog = []
                for row in rows:
                    specs_data = row[5]
                    if isinstance(specs_data, str):
                        specs_dict = json.loads(specs_data) if specs_data else {}
                    else:
                        specs_dict = specs_data if specs_data else {}
                    
                    catalog.append({
                        'id': row[0],
                        'title': row[1],
                        'description': row[2],
                        'price': float(row[3]),
                        'resolution': row[4],
                        'specs': specs_dict,
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
                    'body': json.dumps({'catalog': catalog}),
                    'isBase64Encoded': False
                }
            
            elif resource == 'portfolio':
                cur.execute("""
                    SELECT id, title, description, image_url, display_order, is_active
                    FROM portfolio_items
                    ORDER BY display_order, id
                """)
                rows = cur.fetchall()
                portfolio = []
                for row in rows:
                    portfolio.append({
                        'id': row[0],
                        'title': row[1],
                        'description': row[2],
                        'image_url': row[3],
                        'display_order': row[4],
                        'is_active': row[5]
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'portfolio': portfolio}),
                    'isBase64Encoded': False
                }
            
            elif resource == 'settings':
                cur.execute("""
                    SELECT company_name, phone, email, address, work_hours, about_text
                    FROM settings
                    WHERE id = 1
                """)
                row = cur.fetchone()
                if row:
                    settings = {
                        'company_name': row[0],
                        'phone': row[1],
                        'email': row[2],
                        'address': row[3],
                        'work_hours': row[4],
                        'about_text': row[5]
                    }
                else:
                    settings = {}
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'settings': settings}),
                    'isBase64Encoded': False
                }
        
        # POST requests - create new items
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            resource = body_data.get('resource', '')
            
            if resource == 'service':
                title = body_data.get('title', '').strip()
                description = body_data.get('description', '').strip()
                price = body_data.get('price', '').strip()
                features = body_data.get('features', [])
                icon = body_data.get('icon', 'Wrench')
                display_order = body_data.get('display_order', 0)
                
                if not title or not description or not price:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Title, description and price are required'}),
                        'isBase64Encoded': False
                    }
                
                features_json = json.dumps(features)
                title_safe = title.replace("'", "''")
                desc_safe = description.replace("'", "''")
                price_safe = price.replace("'", "''")
                icon_safe = icon.replace("'", "''")
                features_safe = features_json.replace("'", "''")
                
                cur.execute(f"""
                    INSERT INTO services (title, description, price, features, icon, display_order)
                    VALUES ('{title_safe}', '{desc_safe}', '{price_safe}', '{features_safe}', 
                            '{icon_safe}', {int(display_order)})
                    RETURNING id
                """)
                new_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True, 'id': new_id}),
                    'isBase64Encoded': False
                }
            
            elif resource == 'catalog_item':
                title = body_data.get('title', '').strip()
                description = body_data.get('description', '').strip()
                price = body_data.get('price', 0)
                resolution = body_data.get('resolution', '')
                specs = body_data.get('specs', {})
                image_url = body_data.get('image_url', '')
                display_order = body_data.get('display_order', 0)
                
                if not title or not description:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Title and description are required'}),
                        'isBase64Encoded': False
                    }
                
                specs_json = json.dumps(specs)
                title_safe = title.replace("'", "''")
                desc_safe = description.replace("'", "''")
                res_safe = resolution.replace("'", "''")
                specs_safe = specs_json.replace("'", "''")
                img_safe = image_url.replace("'", "''")
                
                cur.execute(f"""
                    INSERT INTO catalog_items (title, description, price, resolution, 
                                              specs, image_url, display_order)
                    VALUES ('{title_safe}', '{desc_safe}', {float(price)}, '{res_safe}', 
                            '{specs_safe}', '{img_safe}', {int(display_order)})
                    RETURNING id
                """)
                new_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True, 'id': new_id}),
                    'isBase64Encoded': False
                }
            
            elif resource == 'portfolio_item':
                title = body_data.get('title', '').strip()
                description = body_data.get('description', '').strip()
                image_url = body_data.get('image_url', '').strip()
                display_order = body_data.get('display_order', 0)
                
                if not title or not description or not image_url:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Title, description and image_url are required'}),
                        'isBase64Encoded': False
                    }
                
                title_safe = title.replace("'", "''")
                desc_safe = description.replace("'", "''")
                img_safe = image_url.replace("'", "''")
                
                cur.execute(f"""
                    INSERT INTO portfolio_items (title, description, image_url, display_order)
                    VALUES ('{title_safe}', '{desc_safe}', '{img_safe}', {int(display_order)})
                    RETURNING id
                """)
                new_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True, 'id': new_id}),
                    'isBase64Encoded': False
                }
        
        # PUT requests - update items
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            resource = body_data.get('resource', '')
            item_id = body_data.get('id')
            
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'ID is required'}),
                    'isBase64Encoded': False
                }
            
            if resource == 'service':
                title = body_data.get('title', '').replace("'", "''")
                description = body_data.get('description', '').replace("'", "''")
                price = body_data.get('price', '').replace("'", "''")
                features = json.dumps(body_data.get('features', [])).replace("'", "''")
                icon = body_data.get('icon', 'Wrench').replace("'", "''")
                display_order = int(body_data.get('display_order', 0))
                is_active = body_data.get('is_active', True)
                
                cur.execute(f"""
                    UPDATE services
                    SET title = '{title}', description = '{description}', 
                        price = '{price}', features = '{features}', 
                        icon = '{icon}', display_order = {display_order}, 
                        is_active = {is_active}, updated_at = CURRENT_TIMESTAMP
                    WHERE id = {int(item_id)}
                """)
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            elif resource == 'catalog_item':
                title = body_data.get('title', '').replace("'", "''")
                description = body_data.get('description', '').replace("'", "''")
                price = float(body_data.get('price', 0))
                resolution = body_data.get('resolution', '').replace("'", "''")
                specs = json.dumps(body_data.get('specs', {})).replace("'", "''")
                image_url = body_data.get('image_url', '').replace("'", "''")
                display_order = int(body_data.get('display_order', 0))
                is_active = body_data.get('is_active', True)
                
                cur.execute(f"""
                    UPDATE catalog_items
                    SET title = '{title}', description = '{description}', 
                        price = {price}, resolution = '{resolution}', 
                        specs = '{specs}', image_url = '{image_url}', 
                        display_order = {display_order}, is_active = {is_active},
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = {int(item_id)}
                """)
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
            
            elif resource == 'portfolio_item':
                title = body_data.get('title', '').replace("'", "''")
                description = body_data.get('description', '').replace("'", "''")
                image_url = body_data.get('image_url', '').replace("'", "''")
                display_order = int(body_data.get('display_order', 0))
                is_active = body_data.get('is_active', True)
                
                cur.execute(f"""
                    UPDATE portfolio_items
                    SET title = '{title}', description = '{description}', 
                        image_url = '{image_url}', display_order = {display_order}, 
                        is_active = {is_active}, updated_at = CURRENT_TIMESTAMP
                    WHERE id = {int(item_id)}
                """)
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        # DELETE requests - remove items
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {}) or {}
            resource = query_params.get('resource', '')
            item_id = query_params.get('id')
            
            if not item_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'ID is required'}),
                    'isBase64Encoded': False
                }
            
            if resource == 'service':
                cur.execute(f"DELETE FROM services WHERE id = {int(item_id)}")
            elif resource == 'catalog_item':
                cur.execute(f"DELETE FROM catalog_items WHERE id = {int(item_id)}")
            elif resource == 'portfolio_item':
                cur.execute(f"DELETE FROM portfolio_items WHERE id = {int(item_id)}")
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True}),
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
    
    finally:
        cur.close()
        conn.close()