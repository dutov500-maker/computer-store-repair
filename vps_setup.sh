#!/bin/bash

# 🚀 Автоматическая настройка VPS для backend
# Использование: bash vps_setup.sh

echo "🚀 Начинаю настройку VPS для backend..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Проверка прав root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}❌ Запустите скрипт с правами root: sudo bash vps_setup.sh${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Запуск от имени root${NC}"

# Шаг 1: Обновление системы
echo -e "${YELLOW}📦 Обновление системы...${NC}"
apt update && apt upgrade -y

# Шаг 2: Установка Python 3.11
echo -e "${YELLOW}🐍 Установка Python 3.11...${NC}"
apt install -y software-properties-common
add-apt-repository -y ppa:deadsnakes/ppa
apt update
apt install -y python3.11 python3.11-venv python3.11-dev python3-pip

# Шаг 3: Установка PostgreSQL
echo -e "${YELLOW}🐘 Установка PostgreSQL...${NC}"
apt install -y postgresql postgresql-contrib

# Шаг 4: Установка Nginx
echo -e "${YELLOW}🌐 Установка Nginx...${NC}"
apt install -y nginx

# Шаг 5: Установка Supervisor
echo -e "${YELLOW}👷 Установка Supervisor...${NC}"
apt install -y supervisor

# Шаг 6: Установка дополнительных инструментов
echo -e "${YELLOW}🛠 Установка дополнительных инструментов...${NC}"
apt install -y git curl wget nano htop

# Шаг 7: Настройка PostgreSQL
echo -e "${YELLOW}💾 Настройка базы данных...${NC}"

read -p "Введите имя базы данных [computer_store]: " DB_NAME
DB_NAME=${DB_NAME:-computer_store}

read -p "Введите имя пользователя БД [store_user]: " DB_USER
DB_USER=${DB_USER:-store_user}

read -sp "Введите пароль для БД (будет скрыт): " DB_PASS
echo ""

sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
sudo -u postgres psql -d $DB_NAME -c "GRANT ALL ON SCHEMA public TO $DB_USER;"

echo -e "${GREEN}✅ База данных создана${NC}"

# Шаг 8: Создание директории для приложения
echo -e "${YELLOW}📁 Создание директории приложения...${NC}"
mkdir -p /var/www/backend
cd /var/www/backend

# Шаг 9: Запрос данных для backend
echo -e "${YELLOW}⚙️ Настройка backend...${NC}"

read -p "У вас есть GitHub репозиторий? (y/n): " HAS_GITHUB

if [ "$HAS_GITHUB" == "y" ]; then
  read -p "Введите URL GitHub репозитория: " REPO_URL
  git clone $REPO_URL .
else
  echo -e "${YELLOW}📋 Загрузите файлы backend через SFTP в /var/www/backend${NC}"
  echo "Структура должна быть:"
  echo "/var/www/backend/"
  echo "├── api/"
  echo "├── submit-request/"
  echo "└── admin-requests/"
  read -p "Нажмите Enter когда загрузите файлы..."
fi

# Шаг 10: Создание главного файла приложения
echo -e "${YELLOW}📝 Создание main.py...${NC}"

cat > /var/www/backend/main.py << 'EOF'
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import os
import importlib.util
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_function(path):
    spec = importlib.util.spec_from_file_location("handler", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.handler

api_handler = load_function("/var/www/backend/api/index.py")
submit_handler = load_function("/var/www/backend/submit-request/index.py")
admin_handler = load_function("/var/www/backend/admin-requests/index.py")

class Context:
    request_id = "local"
    function_name = "local"
    function_version = "1"
    memory_limit_in_mb = 128

@app.api_route("/api", methods=["GET", "POST", "OPTIONS"])
@app.api_route("/api/{path:path}", methods=["GET", "POST", "OPTIONS"])
async def api_route(request: Request, path: str = ""):
    body = await request.body()
    event = {
        "httpMethod": request.method,
        "queryStringParameters": dict(request.query_params),
        "body": body.decode() if body else "{}",
        "headers": dict(request.headers),
        "isBase64Encoded": False
    }
    
    result = api_handler(event, Context())
    
    return Response(
        content=result.get("body", ""),
        status_code=result.get("statusCode", 200),
        headers=result.get("headers", {})
    )

@app.api_route("/submit-request", methods=["POST", "OPTIONS"])
async def submit_route(request: Request):
    body = await request.body()
    event = {
        "httpMethod": request.method,
        "body": body.decode() if body else "{}",
        "headers": dict(request.headers),
        "isBase64Encoded": False
    }
    
    result = submit_handler(event, Context())
    
    return Response(
        content=result.get("body", ""),
        status_code=result.get("statusCode", 200),
        headers=result.get("headers", {})
    )

@app.api_route("/admin-requests", methods=["GET", "OPTIONS"])
async def admin_route(request: Request):
    event = {
        "httpMethod": request.method,
        "queryStringParameters": dict(request.query_params),
        "headers": dict(request.headers),
        "isBase64Encoded": False
    }
    
    result = admin_handler(event, Context())
    
    return Response(
        content=result.get("body", ""),
        status_code=result.get("statusCode", 200),
        headers=result.get("headers", {})
    )

@app.get("/health")
async def health():
    return {"status": "ok"}
EOF

echo -e "${GREEN}✅ main.py создан${NC}"

# Шаг 11: Создание .env файла
echo -e "${YELLOW}🔐 Создание .env файла...${NC}"

read -p "Введите Telegram Bot Token (или Enter для пропуска): " BOT_TOKEN
read -p "Введите Telegram Chat ID (или Enter для пропуска): " CHAT_ID

cat > /var/www/backend/.env << EOF
DATABASE_URL=postgresql://$DB_USER:$DB_PASS@localhost/$DB_NAME
TELEGRAM_BOT_TOKEN=$BOT_TOKEN
TELEGRAM_CHAT_ID=$CHAT_ID
EOF

echo -e "${GREEN}✅ .env файл создан${NC}"

# Шаг 12: Создание виртуального окружения
echo -e "${YELLOW}🐍 Создание виртуального окружения...${NC}"
python3.11 -m venv /var/www/backend/venv
source /var/www/backend/venv/bin/activate

# Шаг 13: Установка зависимостей
echo -e "${YELLOW}📦 Установка зависимостей...${NC}"
pip install --upgrade pip
pip install fastapi uvicorn psycopg2-binary python-multipart python-dotenv

# Установка зависимостей из requirements.txt
if [ -f "api/requirements.txt" ]; then
  pip install -r api/requirements.txt
fi
if [ -f "submit-request/requirements.txt" ]; then
  pip install -r submit-request/requirements.txt
fi
if [ -f "admin-requests/requirements.txt" ]; then
  pip install -r admin-requests/requirements.txt
fi

echo -e "${GREEN}✅ Зависимости установлены${NC}"

# Шаг 14: Настройка прав
chown -R www-data:www-data /var/www/backend
chmod -R 755 /var/www/backend

# Шаг 15: Настройка Supervisor
echo -e "${YELLOW}👷 Настройка Supervisor...${NC}"

cat > /etc/supervisor/conf.d/backend.conf << EOF
[program:backend]
directory=/var/www/backend
command=/var/www/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
user=www-data
autostart=true
autorestart=true
stderr_logfile=/var/log/backend.err.log
stdout_logfile=/var/log/backend.out.log
environment=DATABASE_URL="postgresql://$DB_USER:$DB_PASS@localhost/$DB_NAME",TELEGRAM_BOT_TOKEN="$BOT_TOKEN",TELEGRAM_CHAT_ID="$CHAT_ID"
EOF

supervisorctl reread
supervisorctl update
supervisorctl start backend

echo -e "${GREEN}✅ Supervisor настроен и запущен${NC}"

# Шаг 16: Настройка Nginx
echo -e "${YELLOW}🌐 Настройка Nginx...${NC}"

SERVER_IP=$(curl -s ifconfig.me)

cat > /etc/nginx/sites-available/backend << EOF
server {
    listen 80;
    server_name $SERVER_IP;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

echo -e "${GREEN}✅ Nginx настроен${NC}"

# Итоговая информация
echo ""
echo -e "${GREEN}🎉 Настройка завершена!${NC}"
echo ""
echo -e "${YELLOW}📋 Информация о сервере:${NC}"
echo "IP адрес: $SERVER_IP"
echo "Backend URL: http://$SERVER_IP"
echo ""
echo -e "${YELLOW}🔗 Эндпоинты:${NC}"
echo "API: http://$SERVER_IP/api"
echo "Отправка заявок: http://$SERVER_IP/submit-request"
echo "Админ заявки: http://$SERVER_IP/admin-requests"
echo "Health check: http://$SERVER_IP/health"
echo ""
echo -e "${YELLOW}📊 Полезные команды:${NC}"
echo "Статус backend: supervisorctl status backend"
echo "Логи backend: tail -f /var/log/backend.out.log"
echo "Ошибки backend: tail -f /var/log/backend.err.log"
echo "Перезапуск backend: supervisorctl restart backend"
echo ""
echo -e "${YELLOW}📝 Следующие шаги:${NC}"
echo "1. Импортируйте дамп базы данных"
echo "2. Обновите func2url.json в frontend проекте"
echo "3. Пересоберите и загрузите frontend"
echo "4. Проверьте работу: curl http://$SERVER_IP/health"
echo ""
echo -e "${GREEN}✅ Всё готово!${NC}"
