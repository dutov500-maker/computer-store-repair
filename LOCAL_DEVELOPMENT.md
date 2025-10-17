# 🏠 Локальная разработка с SQLite

Полное руководство по работе с локальной базой данных для разработки.

---

## 🎯 Что это даёт?

✅ **Работа без интернета** - вся база данных локально  
✅ **Быстрая разработка** - нет задержек от сети  
✅ **Безопасное тестирование** - не влияет на production  
✅ **Полный контроль** - просмотр и редактирование БД  
✅ **Легкий откат** - удалил базу и создал заново  

---

## 🚀 Быстрый старт (3 минуты)

### Шаг 1: Установить зависимости локального сервера
```bash
cd local-server
npm install
cd ..
```

### Шаг 2: Переключиться на локальную базу
```bash
node scripts/switch-api.js local
```

### Шаг 3: Запустить локальный сервер
Откройте **новый терминал** и запустите:
```bash
cd local-server
npm start
```

Вы увидите:
```
🚀 Локальный сервер запущен: http://localhost:3001
📊 API доступен: http://localhost:3001/api
💾 База данных: local-server/database.db
✅ База данных заполнена тестовыми данными
```

### Шаг 4: Запустить frontend
В **другом терминале** (первый не закрывайте!):
```bash
npm run dev
```

### Готово! 🎉
Откройте http://localhost:5173 - сайт работает с локальной базой!

---

## 🔄 Переключение между базами

### Локальная база (для разработки):
```bash
node scripts/switch-api.js local
```

### Production база (poehali.dev):
```bash
node scripts/switch-api.js production
```

**Важно:** После переключения перезапустите `npm run dev`

---

## 📊 Что внутри локальной базы

### Автоматически создаются тестовые данные:

#### 🖥️ Каталог (3 товара):
1. Игровой ПК RTX 4090 - 250,000₽ (4K)
2. Игровой ПК RTX 4070 - 120,000₽ (2K)
3. Игровой ПК RTX 4060 - 70,000₽ (Full HD)

#### 🎨 Портфолио (2 работы):
1. Игровой ПК для стримера - 220,000₽
2. Рабочая станция для 3D - 350,000₽

#### 🛠️ Услуги (2 услуги):
1. Сборка ПК под ключ - от 5,000₽
2. Апгрейд компьютера - от 2,000₽

#### 🔧 Ремонты (2 услуги):
1. Диагностика неисправностей - от 500₽
2. Замена термопасты - от 1,000₽

---

## 🛠️ Работа с локальной базой

### Просмотр данных

#### Через браузер:
```bash
# Каталог
http://localhost:3001/api?type=catalog

# Портфолио
http://localhost:3001/api?type=portfolio

# Заявки (для админки)
http://localhost:3001/admin-requests
```

#### Через SQLite GUI:
1. Скачайте [DB Browser for SQLite](https://sqlitebrowser.org/)
2. Откройте файл `local-server/database.db`
3. Просматривайте и редактируйте данные визуально

#### Через командную строку:
```bash
cd local-server
sqlite3 database.db

# Просмотр товаров
SELECT * FROM catalog;

# Просмотр заявок
SELECT * FROM orders;

# Выход
.quit
```

---

## 🧪 Тестирование функций

### Добавить товар в каталог
```bash
curl -X POST http://localhost:3001/api?type=catalog&action=create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Тестовый ПК",
    "description": "Описание",
    "price": 100000,
    "resolution": "2K",
    "specs": {
      "cpu": "Intel i5",
      "gpu": "RTX 3060",
      "ram": "16GB",
      "storage": "512GB SSD"
    },
    "image_url": "https://example.com/image.jpg"
  }'
```

### Отправить заявку
```bash
curl -X POST http://localhost:3001/submit-request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Иван Иванов",
    "phone": "+79991234567",
    "email": "test@example.com",
    "order_type": "catalog",
    "item_title": "Игровой ПК RTX 4090",
    "message": "Хочу купить"
  }'
```

---

## 🔄 Сброс базы данных

### Вариант 1: Удалить файл базы
```bash
cd local-server
rm database.db
npm start
```
База создастся заново с тестовыми данными.

### Вариант 2: Очистить таблицы через SQL
```bash
cd local-server
sqlite3 database.db

DELETE FROM catalog;
DELETE FROM portfolio_items;
DELETE FROM orders;
DELETE FROM services;
DELETE FROM repairs;

.quit
```

Затем перезапустите сервер:
```bash
npm start
```

---

## 📁 Структура проекта

```
/
├── local-server/              ← Локальный API сервер
│   ├── database.js           ← Настройка SQLite базы
│   ├── server.js             ← Express сервер
│   ├── package.json          ← Зависимости сервера
│   ├── database.db           ← База SQLite (создаётся автоматически)
│   └── README.md             ← Документация сервера
│
├── backend/
│   ├── func2url.json         ← Текущая конфигурация API
│   ├── func2url.local.json   ← Локальные URL
│   └── func2url.production.json  ← Production URL
│
└── scripts/
    └── switch-api.js         ← Скрипт переключения API
```

---

## 🔍 Проверка работы

### 1. Проверить сервер
```bash
curl http://localhost:3001/health
```
Должно вернуть: `{"status":"ok","database":"connected"}`

### 2. Проверить каталог
```bash
curl http://localhost:3001/api?type=catalog
```
Должен вернуть JSON с 3 товарами

### 3. Проверить переключение API
```bash
cat backend/func2url.json
```
Должно быть: `"api": "http://localhost:3001/api"`

---

## ⚠️ Частые проблемы

### Порт 3001 уже занят
**Решение:** Измените порт в `local-server/server.js`:
```javascript
const PORT = 3002; // или любой свободный
```

И обновите `backend/func2url.local.json`:
```json
{
  "api": "http://localhost:3002/api",
  ...
}
```

### Сервер не запускается
**Решение:** Установите зависимости:
```bash
cd local-server
npm install
```

### Frontend не видит локальный API
**Решение:** 
1. Проверьте что сервер запущен: `curl http://localhost:3001/health`
2. Проверьте переключение: `cat backend/func2url.json`
3. Перезапустите frontend: `npm run dev`

### CORS ошибки в браузере
**Решение:** Убедитесь что сервер запущен и в `server.js` включен `cors()`

### База данных не создаётся
**Решение:** Проверьте права на запись:
```bash
cd local-server
ls -la
chmod 755 .
```

---

## 🎓 Расширенное использование

### Добавить свои тестовые данные
Отредактируйте `local-server/database.js`, функцию `seedDatabase()`:

```javascript
export function seedDatabase() {
  // Добавьте свои данные здесь
  insertCatalog.run(
    'Мой товар',
    'Описание',
    50000,
    'Full HD',
    JSON.stringify({ cpu: '...', gpu: '...' }),
    'https://...'
  );
}
```

### Создать резервную копию
```bash
cd local-server
cp database.db backups/database-$(date +%Y%m%d).db
```

### Восстановить из резервной копии
```bash
cd local-server
cp backups/database-20241017.db database.db
```

---

## 🎯 Workflow разработки

### Типичный рабочий процесс:

1. **Утро:**
   ```bash
   node scripts/switch-api.js local
   cd local-server && npm start
   # В другом терминале:
   npm run dev
   ```

2. **Разработка:**
   - Работаете с локальной базой
   - Тестируете изменения
   - Добавляете/удаляете данные

3. **Тестирование на production:**
   ```bash
   node scripts/switch-api.js production
   npm run dev
   ```

4. **Вечер (коммит):**
   ```bash
   git add .
   git commit -m "Добавил новую функцию"
   git push
   ```

---

## 📈 Сравнение с production

| Параметр | Локальная база | Production (poehali.dev) |
|----------|---------------|--------------------------|
| Скорость | ⚡ <5ms | 🌐 20-80ms |
| Интернет | ❌ Не нужен | ✅ Требуется |
| Данные | 🧪 Тестовые | 💾 Реальные |
| Откат | ✅ Легко | ⚠️ Сложно |
| Безопасность | 🏠 Локально | 🔒 Облако |

---

## 🎉 Готово!

Теперь вы можете:
- ✅ Разрабатывать без интернета
- ✅ Быстро тестировать изменения
- ✅ Не бояться сломать production
- ✅ Полностью контролировать данные

**Команды для запуска:**
```bash
# Терминал 1 (сервер)
cd local-server && npm start

# Терминал 2 (frontend)
npm run dev
```

**Хорошей разработки! 🚀**
