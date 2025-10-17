import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database.db'));

// Создание таблиц
db.exec(`
  CREATE TABLE IF NOT EXISTS catalog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price INTEGER,
    resolution TEXT,
    specs TEXT,
    image_url TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS portfolio_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT,
    specs TEXT,
    price_range TEXT,
    completion_date TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    order_type TEXT,
    item_title TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT,
    icon TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS repairs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT,
    icon TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Функция для вставки тестовых данных
export function seedDatabase() {
  const catalogCount = db.prepare('SELECT COUNT(*) as count FROM catalog').get();
  
  if (catalogCount.count === 0) {
    console.log('Заполнение базы тестовыми данными...');
    
    // Каталог
    const insertCatalog = db.prepare(`
      INSERT INTO catalog (title, description, price, resolution, specs, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertCatalog.run(
      'Игровой ПК RTX 4090',
      'Топовый игровой компьютер для 4K гейминга',
      250000,
      '4K',
      JSON.stringify({
        cpu: 'Intel Core i9-14900K',
        gpu: 'RTX 4090 24GB',
        ram: '64GB DDR5',
        storage: '2TB NVMe SSD'
      }),
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800'
    );

    insertCatalog.run(
      'Игровой ПК RTX 4070',
      'Оптимальный выбор для 2K гейминга',
      120000,
      '2K',
      JSON.stringify({
        cpu: 'AMD Ryzen 7 7800X3D',
        gpu: 'RTX 4070 12GB',
        ram: '32GB DDR5',
        storage: '1TB NVMe SSD'
      }),
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800'
    );

    insertCatalog.run(
      'Игровой ПК RTX 4060',
      'Бюджетный вариант для Full HD',
      70000,
      'Full HD',
      JSON.stringify({
        cpu: 'Intel Core i5-13400F',
        gpu: 'RTX 4060 8GB',
        ram: '16GB DDR4',
        storage: '512GB NVMe SSD'
      }),
      'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800'
    );

    // Портфолио
    const insertPortfolio = db.prepare(`
      INSERT INTO portfolio_items (title, description, image_url, category, specs, price_range, completion_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertPortfolio.run(
      'Игровой ПК для стримера',
      'Мощная сборка для стриминга в Full HD с захватом игр',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800',
      'Игровой ПК',
      'RTX 4080, i9-13900K, 64GB RAM, 2TB SSD',
      '220 000 ₽',
      '2024-01-15'
    );

    insertPortfolio.run(
      'Рабочая станция для 3D',
      'Профессиональная сборка для рендеринга и моделирования',
      'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800',
      'Рабочая станция',
      'RTX 4090, Threadripper 3970X, 128GB RAM, 4TB NVMe',
      '350 000 ₽',
      '2024-02-10'
    );

    // Услуги
    const insertService = db.prepare(`
      INSERT INTO services (title, description, price, icon)
      VALUES (?, ?, ?, ?)
    `);

    insertService.run(
      'Сборка ПК под ключ',
      'Полная сборка компьютера по вашим требованиям',
      'от 5 000 ₽',
      'Wrench'
    );

    insertService.run(
      'Апгрейд компьютера',
      'Модернизация вашего существующего ПК',
      'от 2 000 ₽',
      'Settings'
    );

    // Ремонты
    const insertRepair = db.prepare(`
      INSERT INTO repairs (title, description, price, icon)
      VALUES (?, ?, ?, ?)
    `);

    insertRepair.run(
      'Диагностика неисправностей',
      'Полная проверка системы и выявление проблем',
      'от 500 ₽',
      'Search'
    );

    insertRepair.run(
      'Замена термопасты',
      'Замена термоинтерфейса на CPU и GPU',
      'от 1 000 ₽',
      'Cpu'
    );

    console.log('✅ База данных заполнена тестовыми данными');
  }
}

export default db;
