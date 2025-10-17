-- Отключение старых дубликатов, оставляем только новые записи активными
UPDATE catalog SET is_active = false WHERE id < 15;
