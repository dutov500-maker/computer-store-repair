-- Создание таблицы для настроек сайта
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  category VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для услуг и цен
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price VARCHAR(100),
  features TEXT[], -- массив особенностей услуги
  icon VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных настроек
INSERT INTO site_settings (key, value, category) VALUES
('company_name', 'СантехМастер', 'contacts'),
('phone', '+7 (999) 123-45-67', 'contacts'),
('email', 'info@santehmaster.ru', 'contacts'),
('address', 'Москва, ул. Примерная, д. 1', 'contacts'),
('work_hours', 'Пн-Вс: 8:00 - 22:00', 'contacts'),
('about_text', 'Профессиональные сантехнические услуги в Москве. Работаем быстро, качественно и с гарантией.', 'general')
ON CONFLICT (key) DO NOTHING;

-- Вставка начальных услуг
INSERT INTO services (title, description, price, features, icon, display_order) VALUES
('Устранение засоров', 'Профессиональная прочистка труб и канализации', 'от 1500₽', ARRAY['Диагностика', 'Прочистка тросом', 'Гарантия результата'], 'Wrench', 1),
('Замена смесителей', 'Установка и замена смесителей любой сложности', 'от 2000₽', ARRAY['Демонтаж старого', 'Установка нового', 'Проверка герметичности'], 'Droplet', 2),
('Ремонт сантехники', 'Ремонт унитазов, раковин, ванн', 'от 1000₽', ARRAY['Диагностика', 'Замена деталей', 'Гарантия 6 месяцев'], 'Settings', 3),
('Установка оборудования', 'Монтаж водонагревателей, фильтров, насосов', 'от 3000₽', ARRAY['Доставка', 'Профессиональный монтаж', 'Настройка и запуск'], 'Hammer', 4)
ON CONFLICT DO NOTHING;