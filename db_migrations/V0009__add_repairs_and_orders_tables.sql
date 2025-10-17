-- Создаем таблицу ремонта
CREATE TABLE IF NOT EXISTS repairs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  icon VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем таблицу заказов
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_email VARCHAR(255),
  order_type VARCHAR(50) NOT NULL,
  item_id INTEGER,
  item_title VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем таблицу каталога (если не существует)
CREATE TABLE IF NOT EXISTS catalog (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  resolution VARCHAR(50),
  specs JSONB,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавляем типичные ремонты
INSERT INTO repairs (title, description, price, icon, display_order, is_active) VALUES
('Чистка от пыли', 'Полная чистка системного блока с заменой термопасты', 1500, 'Wind', 1, true),
('Замена термопасты', 'Замена термопасты на процессоре и видеокарте', 800, 'Droplet', 2, true),
('Диагностика', 'Полная диагностика ПК с выявлением неисправностей', 500, 'Search', 3, true),
('Замена комплектующих', 'Замена неисправных компонентов (цена зависит от детали)', 1000, 'Package', 4, true),
('Восстановление данных', 'Восстановление файлов с поврежденных носителей', 3000, 'Database', 5, true),
('Удаление вирусов', 'Глубокая проверка и удаление вредоносного ПО', 1500, 'ShieldAlert', 6, true);

-- Добавляем товары в catalog если таблица пустая
INSERT INTO catalog (title, description, price, resolution, specs, image_url, display_order, is_active)
SELECT * FROM (VALUES
('ECO 1 ( Ryzen 5 5500 + GTX 1080 )', 'Бюджетный игровой системный блок за 45.000 руб под Full HD Gaming', 45000, 'Full HD',
 '{"cpu": "AMD Ryzen 5 5500", "gpu": "GTX 1080", "ram": "16GB", "storage": "512GB SSD"}'::jsonb,
 'https://cdn.poehali.dev/files/d322308c-7515-48ef-af5a-e8afd42ad954.png', 1, true),
('Eco #2', 'Бюджетный игровой системный блок за 50.000 руб под Full HD Gaming', 50000, 'Full HD',
 '{"cpu": "Intel Core i3-12100F", "gpu": "RTX 3050", "ram": "16GB", "storage": "512GB SSD"}'::jsonb,
 'https://cdn.poehali.dev/files/d322308c-7515-48ef-af5a-e8afd42ad954.png', 2, true),
('ECO 3 ( Ryzen 5 5600 + RTX 3060ti )', 'Бюджетный игровой системный блок за 65.000 руб под Full HD Gaming', 65000, 'Full HD',
 '{"cpu": "AMD Ryzen 5 5600", "gpu": "RTX 3060ti", "ram": "16GB", "storage": "512GB SSD"}'::jsonb,
 'https://cdn.poehali.dev/files/d322308c-7515-48ef-af5a-e8afd42ad954.png', 3, true)
) AS v(title, description, price, resolution, specs, image_url, display_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM catalog LIMIT 1);
