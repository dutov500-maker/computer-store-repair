-- 💾 Структура базы данных для переноса на VPS
-- Выполните этот файл на новом сервере после настройки PostgreSQL

-- Таблица каталога товаров
CREATE TABLE IF NOT EXISTS catalog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER,
    resolution VARCHAR(50),
    specs JSONB,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица портфолио
CREATE TABLE IF NOT EXISTS portfolio_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    category VARCHAR(100),
    specs TEXT,
    price_range VARCHAR(100),
    completion_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    order_type VARCHAR(50),
    item_title VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица услуг
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(100),
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица ремонтов
CREATE TABLE IF NOT EXISTS repairs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(100),
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица настроек сайта
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_catalog_active ON catalog(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_active ON portfolio_items(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_repairs_active ON repairs(is_active);

-- Комментарии
COMMENT ON TABLE catalog IS 'Каталог игровых компьютеров';
COMMENT ON TABLE portfolio_items IS 'Портфолио выполненных работ';
COMMENT ON TABLE orders IS 'Заказы и заявки от клиентов';
COMMENT ON TABLE services IS 'Список услуг';
COMMENT ON TABLE repairs IS 'Список ремонтных услуг';
COMMENT ON TABLE settings IS 'Настройки сайта';

-- ⚠️ ВАЖНО: После создания структуры экспортируйте данные с poehali.dev
-- и импортируйте их командой:
-- psql -U store_user -d computer_store -c "COPY catalog FROM '/path/to/catalog.csv' CSV HEADER;"
