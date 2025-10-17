-- Обновляем первый товар
UPDATE catalog SET 
  title = 'ECO 1 ( Ryzen 5 5500 + GTX 1080 )',
  description = 'Бюджетный игровой системный блок за 45.000 руб под Full HD Gaming',
  price = 45000,
  specs = '{"cpu": "AMD Ryzen 5 5500", "gpu": "GTX 1080", "ram": "16GB", "storage": "512GB SSD"}'::jsonb,
  display_order = 1
WHERE id = 1;

-- Обновляем второй товар
UPDATE catalog SET
  title = 'Eco #2',
  description = 'Бюджетный игровой системный блок за 50.000 руб под Full HD Gaming',
  price = 50000,
  specs = '{"cpu": "Intel Core i3-12100F", "gpu": "RTX 3050", "ram": "16GB", "storage": "512GB SSD"}'::jsonb,
  display_order = 2
WHERE id = 2;

-- Делаем старые дубликаты неактивными
UPDATE catalog SET is_active = false WHERE id IN (3, 4);

-- Добавляем новые товары
INSERT INTO catalog (title, description, price, resolution, specs, image_url, display_order, is_active) VALUES
('ECO 3 ( Ryzen 5 5600 + RTX 3060ti )', 'Бюджетный игровой системный блок за 65.000 руб под Full HD Gaming', 65000, 'Full HD',
 '{"cpu": "AMD Ryzen 5 5600", "gpu": "RTX 3060ti", "ram": "16GB", "storage": "512GB SSD"}'::jsonb,
 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/e101c528-ba74-4da4-87b5-a003d4a18478.jpg',
 3, true),
('Special 1 ( Ryzen 5600 + RTX 3070 )', 'Средний игровой системный блок за 80.000 руб', 80000, 'Full HD',
 '{"cpu": "AMD Ryzen 5 5600", "gpu": "RTX 3070", "ram": "16GB DDR4", "storage": "1TB SSD"}'::jsonb,
 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/e101c528-ba74-4da4-87b5-a003d4a18478.jpg',
 4, true),
('Special 2 (i5 12400F + RTX 4060 )', 'Игровой ПК для Full HD на ультра настройках', 90000, 'Full HD',
 '{"cpu": "Intel Core i5-12400F", "gpu": "RTX 4060", "ram": "16GB DDR4", "storage": "1TB NVMe SSD"}'::jsonb,
 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/e101c528-ba74-4da4-87b5-a003d4a18478.jpg',
 5, true),
('Special 3 (Ryzen 8600G + RTX 4060 Ti)', 'Мощный игровой ПК для требовательных игр', 110000, 'FULL HD',
 '{"cpu": "AMD Ryzen 8600G", "gpu": "RTX 4060 Ti", "ram": "16GB DDR4", "storage": "1TB NVMe SSD"}'::jsonb,
 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/e101c528-ba74-4da4-87b5-a003d4a18478.jpg',
 6, true);
