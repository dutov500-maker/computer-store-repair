# ⚡ Быстрый старт с локальной базой

## 3 команды - и всё работает!

### 1️⃣ Установить зависимости сервера
```bash
cd local-server && npm install && cd ..
```

### 2️⃣ Переключиться на локальную базу
```bash
node scripts/switch-api.js local
```

### 3️⃣ Запустить всё

**Терминал 1** (локальный API сервер):
```bash
cd local-server
npm start
```

**Терминал 2** (frontend):
```bash
npm run dev
```

---

## ✅ Готово!

Откройте: http://localhost:5173

**Что работает:**
- ✅ Каталог товаров (3 тестовых товара)
- ✅ Портфолио (2 тестовые работы)
- ✅ Формы заявок (сохраняются в локальную БД)
- ✅ Админ-панель (вход: admin / admin123)
- ✅ Всё без интернета!

---

## 🔄 Вернуться на production

```bash
node scripts/switch-api.js production
npm run dev
```

---

**Подробная документация:** [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)
