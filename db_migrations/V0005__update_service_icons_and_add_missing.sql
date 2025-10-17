-- Обновление иконок услуг для лучшего соответствия

UPDATE services SET icon = 'Search' WHERE title = 'Диагностика компьютера';
UPDATE services SET icon = 'HardDrive' WHERE title = 'Замена комплектующих';
UPDATE services SET icon = 'Fan' WHERE title = 'Чистка от пыли';
UPDATE services SET icon = 'Download' WHERE title = 'Установка Windows';

-- Добавляем новые услуги, если их нет
INSERT INTO services (title, description, price, icon, display_order, is_active, features)
VALUES 
  ('Удаление вирусов', 'Полная проверка и удаление вредоносных программ', 'от 600 ₽', 'Shield', 5, true, ARRAY['']::TEXT[]),
  ('Апгрейд системы', 'Улучшение производительности вашего ПК', 'от 1500 ₽', 'Zap', 6, true, ARRAY['']::TEXT[])
ON CONFLICT DO NOTHING;