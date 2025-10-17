# ✅ Локальная база данных установлена!

## 📦 Что создано:

### 1. Локальный API сервер
- **Технология:** Node.js + Express + SQLite
- **Расположение:** `local-server/`
- **Порт:** 3001
- **База:** SQLite (файл `database.db`)

### 2. Автоматические скрипты запуска
- `start-local.bat` - для Windows (двойной клик)
- `start-local.sh` - для Mac/Linux
- `setup-local.js` - установка и настройка

### 3. Скрипты управления
- `scripts/switch-api.js` - переключение local/production
- Конфигурации:
  - `backend/func2url.local.json` - локальные URL
  - `backend/func2url.production.json` - production URL

### 4. Документация
- `START_HERE_LOCAL.md` - 🌟 НАЧНИТЕ С ЭТОГО
- `LOCAL_DATABASE_SETUP.md` - полная инструкция
- `QUICK_START_LOCAL.md` - быстрый старт (3 команды)
- `LOCAL_DEVELOPMENT.md` - подробное руководство
- `local-server/README.md` - API документация

---

## 🚀 Как запустить (3 способа)

### Способ 1: Автозапуск (самый простой)

**Windows:**
Дважды кликните на `start-local.bat`

**Mac/Linux:**
```bash
./start-local.sh
```

### Способ 2: Через setup скрипт
```bash
# Первый запуск (установка)
node setup-local.js

# Затем в 2 терминалах:
cd local-server && npm start    # Терминал 1
npm run dev                      # Терминал 2
```

### Способ 3: Вручную (полный контроль)
```bash
# Установка (только первый раз)
cd local-server && npm install && cd ..

# Переключение на локальную базу
node scripts/switch-api.js local

# Запуск сервера (терминал 1)
cd local-server && npm start

# Запуск frontend (терминал 2)
npm run dev
```

---

## 🎯 Два режима работы

### 🏠 Локальный режим (для разработки)
```bash
node scripts/switch-api.js local
```

**Что работает:**
- ✅ SQLite база в `local-server/database.db`
- ✅ Работает без интернета
- ✅ Супер быстрый отклик (<5ms)
- ✅ Тестовые данные (3 товара, 2 работы, 4 услуги)
- ✅ Безопасное тестирование

### 🌐 Production режим (для production)
```bash
node scripts/switch-api.js production
```

**Что работает:**
- ✅ PostgreSQL база на poehali.dev
- ✅ Реальные данные
- ✅ Облачное хранение
- ✅ Общий доступ для команды
- ✅ Автоматические бэкапы

---

## 📊 Тестовые данные

### Автоматически создаётся при первом запуске:

**Каталог (3 товара):**
| Название | Цена | Разрешение | Изображение |
|----------|------|------------|-------------|
| Игровой ПК RTX 4090 | 250,000₽ | 4K | ✅ |
| Игровой ПК RTX 4070 | 120,000₽ | 2K | ✅ |
| Игровой ПК RTX 4060 | 70,000₽ | Full HD | ✅ |

**Портфолио (2 работы):**
- Игровой ПК для стримера (220,000₽)
- Рабочая станция для 3D (350,000₽)

**Услуги (2):**
- Сборка ПК под ключ (от 5,000₽)
- Апгрейд компьютера (от 2,000₽)

**Ремонты (2):**
- Диагностика (от 500₽)
- Замена термопасты (от 1,000₽)

---

## 🔌 API Эндпоинты

### Локальные URL (после переключения):
```
GET  http://localhost:3001/api?type=catalog
GET  http://localhost:3001/api?type=portfolio
GET  http://localhost:3001/api?type=services
GET  http://localhost:3001/api?type=repairs

POST http://localhost:3001/api?type=catalog&action=create
POST http://localhost:3001/api?type=catalog&action=update&id=1
POST http://localhost:3001/api?type=catalog&action=delete&id=1

POST http://localhost:3001/submit-request
GET  http://localhost:3001/admin-requests
GET  http://localhost:3001/health
```

---

## 🛠️ Управление базой данных

### Просмотр через GUI (рекомендуется):
1. Скачайте [DB Browser for SQLite](https://sqlitebrowser.org/)
2. Откройте `local-server/database.db`
3. Просматривайте/редактируйте таблицы

### Просмотр через CLI:
```bash
cd local-server
sqlite3 database.db
```
```sql
SELECT * FROM catalog;
SELECT * FROM orders;
.quit
```

### Сброс базы:
```bash
cd local-server
rm database.db
npm start
```
База создастся заново с тестовыми данными.

---

## 📁 Структура файлов

```
/
├── 🚀 start-local.bat           ← Автозапуск Windows
├── 🚀 start-local.sh            ← Автозапуск Mac/Linux
├── 🔧 setup-local.js            ← Установка и настройка
│
├── 📖 START_HERE_LOCAL.md       ← НАЧНИТЕ ОТСЮДА
├── 📖 LOCAL_DATABASE_SETUP.md   ← Полная инструкция
├── ⚡ QUICK_START_LOCAL.md      ← 3 команды для старта
├── 📚 LOCAL_DEVELOPMENT.md      ← Подробное руководство
│
├── 📁 local-server/
│   ├── server.js               ← Express API сервер
│   ├── database.js             ← Настройка SQLite + seed data
│   ├── package.json            ← Зависимости
│   ├── database.db             ← SQLite база (создаётся авто)
│   └── README.md               ← API документация
│
├── 📁 backend/
│   ├── func2url.json           ← Текущая конфигурация
│   ├── func2url.local.json     ← Локальные URL
│   └── func2url.production.json ← Production URL
│
└── 📁 scripts/
    └── switch-api.js           ← Переключение режимов
```

---

## 🎓 Типичный workflow

### День 1: Настройка
```bash
# Запустите автоустановку
node setup-local.js

# Или используйте автозапуск
start-local.bat  # Windows
./start-local.sh # Mac/Linux
```

### Каждый день: Разработка
```bash
# Утро - запуск локального режима
./start-local.sh

# Работа с кодом
# Тестирование в браузере: http://localhost:5173

# Проверка на production (если нужно)
node scripts/switch-api.js production
npm run dev

# Вечер - коммит
git add .
git commit -m "Feature: добавил новую функцию"
git push
```

---

## 📊 Сравнение режимов

| Параметр | Локальная база | Production база |
|----------|----------------|-----------------|
| **База данных** | SQLite | PostgreSQL |
| **Скорость** | ⚡ <5ms | 🌐 20-80ms |
| **Интернет** | ❌ Не нужен | ✅ Требуется |
| **Данные** | 🧪 Тестовые | 💾 Реальные |
| **Безопасность** | 🏠 Локально | 🔒 Облако |
| **Откат** | ✅ Удалить файл | ⚠️ Через SQL |
| **Стоимость** | 💰 Бесплатно | 💰 Бесплатно |
| **Для чего** | Разработка | Production |

---

## ⚡ Быстрые команды

```bash
# Переключение на локальную базу
node scripts/switch-api.js local

# Переключение на production
node scripts/switch-api.js production

# Проверка работы сервера
curl http://localhost:3001/health

# Просмотр каталога
curl http://localhost:3001/api?type=catalog

# Сброс базы
cd local-server && rm database.db && npm start
```

---

## ✅ Checklist первого запуска

- [ ] Скачал/клонировал проект
- [ ] Запустил `node setup-local.js` или `start-local.bat`
- [ ] Проверил http://localhost:3001/health
- [ ] Открыл http://localhost:5173
- [ ] Зашёл в админку (admin/admin123)
- [ ] Добавил тестовый товар
- [ ] Отправил тестовую заявку
- [ ] Посмотрел базу в DB Browser
- [ ] Готов к разработке! 🎉

---

## 🆘 Решение проблем

### Порт 3001 занят
Измените в `local-server/server.js`:
```javascript
const PORT = 3002;
```
И в `backend/func2url.local.json`:
```json
{"api": "http://localhost:3002/api"}
```

### npm install не работает
```bash
cd local-server
rm -rf node_modules
npm cache clean --force
npm install
```

### База не создаётся
```bash
cd local-server
chmod 755 .
npm start
```

### CORS ошибки
Убедитесь что сервер запущен:
```bash
ps aux | grep node
# или
curl http://localhost:3001/health
```

---

## 📚 Дополнительные материалы

### Документация:
- [START_HERE_LOCAL.md](./START_HERE_LOCAL.md) - главная инструкция
- [LOCAL_DATABASE_SETUP.md](./LOCAL_DATABASE_SETUP.md) - подробная настройка
- [QUICK_START_LOCAL.md](./QUICK_START_LOCAL.md) - быстрый старт
- [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) - для опытных

### Ссылки:
- [SQLite](https://www.sqlite.org/) - документация базы
- [DB Browser](https://sqlitebrowser.org/) - GUI для SQLite
- [Express](https://expressjs.com/) - документация API сервера

---

## 🎉 Готово!

Ваш сайт теперь может работать **полностью автономно** с локальной базой данных!

**Запустите прямо сейчас:**

### Windows:
```
start-local.bat
```

### Mac/Linux:
```bash
./start-local.sh
```

**Откроется:** http://localhost:5173

---

**Хорошей разработки! 🚀💻**
