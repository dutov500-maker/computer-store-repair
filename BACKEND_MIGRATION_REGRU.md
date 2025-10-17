# 🚀 Перенос Backend на REG.RU

## ⚠️ Важно понять

REG.RU предоставляет **разные типы хостинга**:

1. **Виртуальный хостинг** (обычный) - НЕ ПОДХОДИТ
   - ❌ Только PHP, не поддерживает Python
   - ❌ Нет возможности запускать Node.js приложения
   - ❌ Ограниченный доступ к системе

2. **VPS/VDS** (виртуальный сервер) - ✅ ПОДХОДИТ
   - ✅ Полный контроль над сервером
   - ✅ Можно установить Python, Node.js
   - ✅ Можно настроить PostgreSQL
   - 💰 Цена: от 200₽/месяц

3. **Облачный хостинг** - ✅ ПОДХОДИТ (если есть поддержка Python)
   - ✅ Масштабируемость
   - 💰 Дороже VPS

---

## 🎯 Рекомендуемый вариант

### Вариант 1: Оставить backend на poehali.dev (РЕКОМЕНДУЕТСЯ)

**Преимущества:**
- ✅ Ничего не нужно настраивать
- ✅ Автоматические обновления
- ✅ Бесплатная база данных PostgreSQL
- ✅ Бесплатный хостинг функций
- ✅ Автоматическое масштабирование
- ✅ Мониторинг и логи из коробки

**Как работает:**
1. Frontend на REG.RU (статические файлы)
2. Backend на poehali.dev (API функции)
3. База данных на poehali.dev (PostgreSQL)
4. Frontend обращается к backend по URL из `func2url.json`

**Что нужно сделать:**
- Ничего! Всё уже работает ✅

---

### Вариант 2: Перенести всё на VPS REG.RU

**Требования:**
- VPS с Ubuntu 20.04+ (от 200₽/мес)
- Минимум 1GB RAM, 10GB диск
- SSH доступ

---

## 📦 Вариант 2: Инструкция по переносу на VPS

### Шаг 1: Заказать VPS на REG.RU

1. Войдите в личный кабинет REG.RU
2. Перейдите в **"VPS"** → **"Заказать VPS"**
3. Выберите тариф:
   - **Минимальный:** 1GB RAM, 1 CPU, 10GB SSD (~200₽/мес)
   - **Рекомендуемый:** 2GB RAM, 2 CPU, 20GB SSD (~400₽/мес)
4. Операционная система: **Ubuntu 22.04 LTS**
5. Получите:
   - IP адрес сервера
   - Пароль root
   - SSH доступ

### Шаг 2: Подключиться к серверу

**Windows:**
```bash
# Используйте PuTTY или PowerShell
ssh root@ваш_ip_адрес
```

**Mac/Linux:**
```bash
ssh root@ваш_ip_адрес
```

### Шаг 3: Установить необходимое ПО

```bash
# Обновить систему
apt update && apt upgrade -y

# Установить Python 3.11
apt install -y python3.11 python3.11-venv python3-pip

# Установить PostgreSQL
apt install -y postgresql postgresql-contrib

# Установить Nginx (веб-сервер)
apt install -y nginx

# Установить supervisor (для управления процессами)
apt install -y supervisor

# Установить git
apt install -y git
```

### Шаг 4: Настроить PostgreSQL

```bash
# Переключиться на пользователя postgres
sudo -u postgres psql

# В консоли PostgreSQL выполнить:
CREATE DATABASE computer_store;
CREATE USER store_user WITH PASSWORD 'ваш_сложный_пароль';
GRANT ALL PRIVILEGES ON DATABASE computer_store TO store_user;
\q
```

### Шаг 5: Загрузить дамп базы данных

**Сначала экспортируйте базу с poehali.dev:**

```sql
-- Выполните через get_db_info и perform_sql_query на poehali.dev
-- Скопируйте структуру таблиц и данные
```

Создайте файл `database_export.sql` на сервере:

```bash
nano /root/database_export.sql
```

Вставьте SQL для создания таблиц:

```sql
-- Скопируйте из вашей базы структуру таблиц
CREATE TABLE catalog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER,
    resolution VARCHAR(50),
    specs JSONB,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE portfolio_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    category VARCHAR(100),
    specs TEXT,
    price_range VARCHAR(100),
    completion_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    order_type VARCHAR(50),
    item_title VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(100),
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE repairs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(100),
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT true
);

-- Добавьте INSERT для переноса данных
```

Импортируйте дамп:

```bash
psql -U store_user -d computer_store -f /root/database_export.sql
```

### Шаг 6: Загрузить backend код

```bash
# Создать директорию для приложения
mkdir -p /var/www/backend
cd /var/www/backend

# Если у вас GitHub репозиторий:
git clone https://github.com/ваш_репозиторий.git .

# Или загрузите файлы через SFTP
```

Структура должна быть:

```
/var/www/backend/
├── api/
│   ├── index.py
│   └── requirements.txt
├── submit-request/
│   ├── index.py
│   └── requirements.txt
└── admin-requests/
    ├── index.py
    └── requirements.txt
```

### Шаг 7: Создать FastAPI приложение

Создайте главный файл сервера:

```bash
nano /var/www/backend/main.py
```

```python
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import importlib.util

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Загрузить функции
def load_function(path):
    spec = importlib.util.spec_from_file_location("handler", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.handler

api_handler = load_function("api/index.py")
submit_handler = load_function("submit-request/index.py")
admin_handler = load_function("admin-requests/index.py")

# Эндпоинты
@app.api_route("/api/{path:path}", methods=["GET", "POST", "OPTIONS"])
async def api_route(request: Request, path: str = ""):
    event = {
        "httpMethod": request.method,
        "queryStringParameters": dict(request.query_params),
        "body": await request.body(),
        "headers": dict(request.headers)
    }
    
    class Context:
        request_id = "local"
    
    result = api_handler(event, Context())
    return result

@app.api_route("/submit-request", methods=["POST", "OPTIONS"])
async def submit_route(request: Request):
    event = {
        "httpMethod": request.method,
        "body": await request.body(),
        "headers": dict(request.headers)
    }
    
    class Context:
        request_id = "local"
    
    result = submit_handler(event, Context())
    return result

@app.api_route("/admin-requests", methods=["GET", "OPTIONS"])
async def admin_route(request: Request):
    event = {
        "httpMethod": request.method,
        "queryStringParameters": dict(request.query_params),
        "headers": dict(request.headers)
    }
    
    class Context:
        request_id = "local"
    
    result = admin_handler(event, Context())
    return result
```

### Шаг 8: Установить зависимости

```bash
cd /var/www/backend

# Создать виртуальное окружение
python3.11 -m venv venv
source venv/bin/activate

# Установить зависимости
pip install fastapi uvicorn psycopg2-binary python-multipart

# Установить зависимости из requirements.txt каждой функции
pip install -r api/requirements.txt
pip install -r submit-request/requirements.txt
pip install -r admin-requests/requirements.txt
```

### Шаг 9: Создать .env файл

```bash
nano /var/www/backend/.env
```

```env
DATABASE_URL=postgresql://store_user:ваш_пароль@localhost/computer_store
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id
```

### Шаг 10: Настроить Supervisor

```bash
nano /etc/supervisor/conf.d/backend.conf
```

```ini
[program:backend]
directory=/var/www/backend
command=/var/www/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
user=www-data
autostart=true
autorestart=true
stderr_logfile=/var/log/backend.err.log
stdout_logfile=/var/log/backend.out.log
environment=DATABASE_URL="postgresql://store_user:ваш_пароль@localhost/computer_store"
```

Запустить:

```bash
supervisorctl reread
supervisorctl update
supervisorctl start backend
```

### Шаг 11: Настроить Nginx

```bash
nano /etc/nginx/sites-available/backend
```

```nginx
server {
    listen 80;
    server_name api.ваш_домен.ru;  # или IP адрес

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Активировать:

```bash
ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Шаг 12: Обновить frontend

В вашем frontend проекте обновите `func2url.json`:

```json
{
  "api": "http://ваш_ip_или_домен/api",
  "submit-request": "http://ваш_ip_или_домен/submit-request",
  "admin-requests": "http://ваш_ip_или_домен/admin-requests"
}
```

Пересоберите и загрузите frontend на REG.RU.

### Шаг 13: Настроить SSL (опционально, но рекомендуется)

```bash
# Установить Certbot
apt install -y certbot python3-certbot-nginx

# Получить SSL сертификат
certbot --nginx -d api.ваш_домен.ru

# Автоматическое обновление
certbot renew --dry-run
```

---

## 🔍 Проверка работы

```bash
# Проверить статус backend
supervisorctl status backend

# Проверить логи
tail -f /var/log/backend.out.log
tail -f /var/log/backend.err.log

# Проверить подключение к БД
psql -U store_user -d computer_store -c "SELECT COUNT(*) FROM catalog;"

# Тестовый запрос к API
curl http://localhost:8000/api?type=catalog
```

---

## 💰 Стоимость

**Минимальная конфигурация:**
- VPS 1GB RAM: ~200₽/месяц
- Домен .ru: ~200₽/год
- **Итого:** ~200₽/месяц

**vs poehali.dev:**
- Backend функции: бесплатно
- База данных: бесплатно
- Домен: можно свой подключить
- **Итого:** 0₽/месяц (на текущий момент)

---

## ⚡ Сравнение вариантов

| Параметр | poehali.dev | VPS REG.RU |
|----------|-------------|------------|
| Стоимость | Бесплатно | от 200₽/мес |
| Настройка | Автоматическая | Ручная (2-3 часа) |
| Обслуживание | Не требуется | Обновления, мониторинг |
| Масштабирование | Автоматическое | Ручное |
| База данных | Встроенная | Нужно настраивать |
| Безопасность | Автоматическая | Настройка вручную |
| SSL сертификаты | Автоматические | Настройка вручную |
| Логи и мониторинг | Встроенные | Настройка вручную |

---

## 🎯 Рекомендация

**Для вашего проекта РЕКОМЕНДУЮ оставить backend на poehali.dev:**

✅ Экономия времени и денег
✅ Всё уже работает
✅ Автоматические обновления
✅ Встроенный мониторинг
✅ Бесплатная база данных

**Переносить на VPS имеет смысл только если:**
- Очень высокая нагрузка (>10000 запросов/день)
- Нужны специфические библиотеки
- Корпоративные требования к хостингу

---

## 📞 Поддержка

- REG.RU: https://www.reg.ru/support/
- Сообщество: https://t.me/+QgiLIa1gFRY4Y2Iy
