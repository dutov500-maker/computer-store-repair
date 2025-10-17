import express from 'express';
import cors from 'cors';
import db, { seedDatabase } from './database.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Инициализация БД с тестовыми данными
seedDatabase();

// API эндпоинт
app.get('/api', (req, res) => {
  const { type = 'catalog' } = req.query;

  try {
    if (type === 'catalog') {
      const items = db.prepare('SELECT * FROM catalog WHERE is_active = 1 ORDER BY created_at DESC').all();
      const formatted = items.map(item => ({
        ...item,
        specs: JSON.parse(item.specs || '{}'),
        is_active: Boolean(item.is_active)
      }));
      return res.json(formatted);
    }

    if (type === 'portfolio') {
      const items = db.prepare('SELECT * FROM portfolio_items WHERE is_active = 1 ORDER BY created_at DESC').all();
      const formatted = items.map(item => ({
        ...item,
        is_active: Boolean(item.is_active)
      }));
      return res.json(formatted);
    }

    if (type === 'services') {
      const items = db.prepare('SELECT * FROM services WHERE is_active = 1').all();
      return res.json(items.map(item => ({ ...item, is_active: Boolean(item.is_active) })));
    }

    if (type === 'repairs') {
      const items = db.prepare('SELECT * FROM repairs WHERE is_active = 1').all();
      return res.json(items.map(item => ({ ...item, is_active: Boolean(item.is_active) })));
    }

    res.status(400).json({ error: 'Unknown type' });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api', (req, res) => {
  const { type = 'catalog', action = 'create', id } = req.query;
  const data = req.body;

  try {
    if (type === 'catalog') {
      if (action === 'create') {
        const stmt = db.prepare(`
          INSERT INTO catalog (title, description, price, resolution, specs, image_url)
          VALUES (?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(
          data.title,
          data.description,
          data.price,
          data.resolution,
          JSON.stringify(data.specs),
          data.image_url
        );
        return res.json({ id: result.lastInsertRowid, message: 'Created successfully' });
      }

      if (action === 'update') {
        const stmt = db.prepare(`
          UPDATE catalog 
          SET title = ?, description = ?, price = ?, resolution = ?, specs = ?, image_url = ?
          WHERE id = ?
        `);
        stmt.run(
          data.title,
          data.description,
          data.price,
          data.resolution,
          JSON.stringify(data.specs),
          data.image_url,
          id
        );
        return res.json({ message: 'Updated successfully' });
      }

      if (action === 'delete') {
        const stmt = db.prepare('UPDATE catalog SET is_active = 0 WHERE id = ?');
        stmt.run(id);
        return res.json({ message: 'Deleted successfully' });
      }
    }

    if (type === 'portfolio') {
      if (action === 'create') {
        const stmt = db.prepare(`
          INSERT INTO portfolio_items (title, description, image_url, category, specs, price_range, completion_date)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(
          data.title,
          data.description,
          data.image_url,
          data.category,
          data.specs,
          data.price_range,
          data.completion_date
        );
        return res.json({ id: result.lastInsertRowid, message: 'Created successfully' });
      }

      if (action === 'update') {
        const stmt = db.prepare(`
          UPDATE portfolio_items 
          SET title = ?, description = ?, image_url = ?, category = ?, specs = ?, price_range = ?, completion_date = ?
          WHERE id = ?
        `);
        stmt.run(
          data.title,
          data.description,
          data.image_url,
          data.category,
          data.specs,
          data.price_range,
          data.completion_date,
          id
        );
        return res.json({ message: 'Updated successfully' });
      }

      if (action === 'delete') {
        const stmt = db.prepare('UPDATE portfolio_items SET is_active = 0 WHERE id = ?');
        stmt.run(id);
        return res.json({ message: 'Deleted successfully' });
      }
    }

    res.status(400).json({ error: 'Unknown action' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Прием заявок
app.post('/submit-request', (req, res) => {
  const { name, phone, email, order_type, item_title, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO orders (customer_name, customer_phone, customer_email, order_type, item_title, message, status)
      VALUES (?, ?, ?, ?, ?, ?, 'new')
    `);
    const result = stmt.run(name, phone, email || '', order_type || 'service', item_title || '', message || '');

    console.log(`📬 Новая заявка #${result.lastInsertRowid}: ${name}, ${phone}`);

    res.json({
      success: true,
      message: 'Request submitted successfully',
      request_id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Error submitting request:', error);
    res.status(500).json({ error: error.message });
  }
});

// Список заявок для админа
app.get('/admin-requests', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected' });
});

app.listen(PORT, () => {
  console.log(`🚀 Локальный сервер запущен: http://localhost:${PORT}`);
  console.log(`📊 API доступен: http://localhost:${PORT}/api`);
  console.log(`💾 База данных: local-server/database.db`);
});
