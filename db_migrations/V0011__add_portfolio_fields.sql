ALTER TABLE portfolio_items 
ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'Игровой ПК',
ADD COLUMN IF NOT EXISTS specs TEXT,
ADD COLUMN IF NOT EXISTS price_range VARCHAR(100),
ADD COLUMN IF NOT EXISTS completion_date DATE;

UPDATE portfolio_items 
SET category = 'Игровой ПК' 
WHERE category IS NULL;

UPDATE portfolio_items
SET specs = 'RTX 4090, i9-14900K, 64GB RAM, 2TB NVMe'
WHERE id = 1;

UPDATE portfolio_items
SET specs = 'RTX 4070, i7-13700K, 32GB RAM, 1TB NVMe'
WHERE id = 2;

UPDATE portfolio_items
SET specs = 'RTX 4080, Ryzen 9 7900X, 64GB RAM, 2TB NVMe'
WHERE id = 3;