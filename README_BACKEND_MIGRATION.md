# 🚀 Миграция Backend: Быстрый старт

## 🎯 Два варианта

### ✅ Вариант 1: Оставить backend на poehali.dev (РЕКОМЕНДУЕТСЯ)

**Почему это лучший выбор:**
- ✅ Бесплатно
- ✅ Ничего настраивать не нужно
- ✅ Уже работает
- ✅ Автоматические обновления
- ✅ Встроенный мониторинг

**Что делать:**
1. Ничего! 🎉
2. Frontend на REG.RU будет обращаться к backend на poehali.dev
3. Всё работает автоматически

---

### ⚙️ Вариант 2: Перенести на VPS REG.RU

**Когда это нужно:**
- Высокая нагрузка (>10000 запросов/день)
- Корпоративные требования
- Нужны специфические библиотеки

**Стоимость:** от 200₽/месяц (VPS)

---

## 📦 Автоматическая установка на VPS

### Шаг 1: Заказать VPS
1. Зайдите на REG.RU
2. Закажите VPS (Ubuntu 22.04)
3. Запомните IP адрес и пароль root

### Шаг 2: Подключиться
```bash
ssh root@ваш_ip_адрес
```

### Шаг 3: Загрузить скрипт
```bash
# Скачать скрипт установки
wget https://raw.githubusercontent.com/ваш_репозиторий/vps_setup.sh

# Или скопировать вручную из файла vps_setup.sh
nano vps_setup.sh
# Вставить содержимое, Ctrl+X, Y, Enter
```

### Шаг 4: Запустить установку
```bash
chmod +x vps_setup.sh
bash vps_setup.sh
```

Скрипт автоматически:
- ✅ Установит Python 3.11
- ✅ Установит PostgreSQL
- ✅ Установит Nginx
- ✅ Создаст базу данных
- ✅ Настроит backend
- ✅ Запустит сервер

### Шаг 5: Импортировать данные

```bash
# Загрузить структуру БД
psql -U store_user -d computer_store -f database_structure.sql

# Экспортировать данные с poehali.dev через панель управления
# или через SQL запросы в вашем проекте
```

### Шаг 6: Обновить frontend

В вашем проекте обновите `backend/func2url.json`:

```json
{
  "api": "http://ваш_ip/api",
  "submit-request": "http://ваш_ip/submit-request",
  "admin-requests": "http://ваш_ip/admin-requests"
}
```

Пересоберите frontend:
```bash
npm run build
```

Загрузите на REG.RU.

---

## 🔍 Проверка работы

После установки проверьте:

```bash
# Health check
curl http://ваш_ip/health

# API каталога
curl http://ваш_ip/api?type=catalog

# Статус backend
supervisorctl status backend

# Логи
tail -f /var/log/backend.out.log
```

---

## 📊 Сравнение вариантов

| Параметр | poehali.dev | VPS |
|----------|-------------|-----|
| 💰 Стоимость | Бесплатно | 200₽/мес |
| ⏱ Время настройки | 0 минут | 30-60 минут |
| 🔧 Обслуживание | Не требуется | Обновления вручную |
| 📈 Масштабирование | Автоматическое | Ручное |
| 🔒 SSL | Автоматически | Настройка вручную |
| 📊 Мониторинг | Встроенный | Настройка вручную |

---

## 🆘 Что делать при проблемах

### Backend не запускается
```bash
supervisorctl status backend
tail -f /var/log/backend.err.log
```

### Ошибки подключения к БД
```bash
# Проверить, что PostgreSQL работает
systemctl status postgresql

# Проверить подключение
psql -U store_user -d computer_store -c "SELECT 1;"
```

### Nginx не работает
```bash
nginx -t
systemctl status nginx
tail -f /var/log/nginx/error.log
```

---

## 📚 Документация

- **Подробная инструкция:** `BACKEND_MIGRATION_REGRU.md`
- **Скрипт установки:** `vps_setup.sh`
- **Структура БД:** `database_structure.sql`

---

## 💬 Поддержка

- Сообщество: https://t.me/+QgiLIa1gFRY4Y2Iy
- REG.RU: https://www.reg.ru/support/

---

## ✨ Рекомендация

**Для большинства проектов лучше оставить backend на poehali.dev:**
- Экономия времени
- Экономия денег
- Меньше головной боли
- Всё уже работает

**Переносите только если:**
- Действительно нужен полный контроль
- Высокие нагрузки
- Корпоративные требования
