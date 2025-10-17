#!/bin/bash

echo "========================================"
echo "  Запуск локального сервера разработки"
echo "========================================"
echo ""

# Цвета
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ОШИБКА]${NC} Node.js не установлен!"
    echo "Скачайте с https://nodejs.org/"
    exit 1
fi

# Проверка установки зависимостей
if [ ! -d "local-server/node_modules" ]; then
    echo -e "${YELLOW}[1/4]${NC} Установка зависимостей локального сервера..."
    cd local-server
    npm install
    cd ..
    echo ""
else
    echo -e "${GREEN}[1/4]${NC} Зависимости локального сервера уже установлены"
    echo ""
fi

# Переключение на локальную базу
echo -e "${YELLOW}[2/4]${NC} Переключение на локальную базу данных..."
node scripts/switch-api.js local
echo ""

# Запуск локального сервера в фоне
echo -e "${YELLOW}[3/4]${NC} Запуск локального API сервера..."
cd local-server
npm start &
SERVER_PID=$!
cd ..
sleep 2
echo ""

# Запуск frontend
echo -e "${YELLOW}[4/4]${NC} Запуск frontend..."
echo ""
echo "========================================"
echo -e "  ${GREEN}Готово! Сервер запущен${NC}"
echo "========================================"
echo ""
echo "🌐 Локальный сервер: http://localhost:3001"
echo "🎨 Frontend: http://localhost:5173"
echo ""
echo "Для остановки нажмите Ctrl+C"
echo ""

npm run dev

# Остановка сервера при выходе
kill $SERVER_PID 2>/dev/null
