-- Обновляем Special 1 (изменилась видеокарта)
UPDATE catalog SET
  title = 'Special 1 ( Ryzen 5600 + RTX 5060 )',
  description = 'Готовое решение для сборки за 75 тысяч рублей под FullHD Gaming на Ультра настройках графики',
  price = 75000,
  resolution = 'FullHD',
  specs = '{"cpu": "AMD Ryzen 5 5600", "gpu": "Palit RTX 5060 Dual 8GB", "ram": "16GB", "storage": "1000GB SSD"}'::jsonb,
  image_url = 'https://cdn.poehali.dev/files/d322308c-7515-48ef-af5a-e8afd42ad954.png',
  display_order = 4
WHERE id = 6;

-- Обновляем Special 2
UPDATE catalog SET
  title = 'Special 2 (i5 12400F + RTX 5060)',
  description = 'Готовое решение для сборки за 89 тысяч рублей под FullHD Gaming на Ультра настройках графики',
  price = 89000,
  resolution = 'FullHD',
  specs = '{"cpu": "Intel Core i5-12400F", "gpu": "RTX 5060", "ram": "16GB DDR4", "storage": "1TB NVMe SSD"}'::jsonb,
  image_url = 'https://cdn.poehali.dev/files/d322308c-7515-48ef-af5a-e8afd42ad954.png',
  display_order = 5
WHERE id = 7;

-- Обновляем Special 3 (новые характеристики)
UPDATE catalog SET
  title = 'Special 3 (Ryzen 8400F + RTX 5060)',
  description = 'Готовое решение для сборки за 91 тысячу рублей под FullHD Gaming на Ультра настройках графики',
  price = 92000,
  resolution = 'FullHD',
  specs = '{"cpu": "AMD Ryzen 5 8400F", "gpu": "RTX 5060", "ram": "16GB DDR5", "storage": "1TB SSD NvME"}'::jsonb,
  image_url = 'https://cdn.poehali.dev/files/d322308c-7515-48ef-af5a-e8afd42ad954.png',
  display_order = 6
WHERE id = 8;

-- Добавляем новые товары из скриншотов
INSERT INTO catalog (title, description, price, resolution, specs, image_url, display_order, is_active) VALUES
('Special 4 (Ryzen 7500F + RTX 5060 Ti)', 'Готовое решение для сборки за 110.000 тысяч рублей под QHD Gaming на Ультра настройках графики', 110000, 'QHD',
 '{"cpu": "AMD Ryzen 5 7500F", "gpu": "RTX 5060 Ti", "ram": "16GB", "storage": "1TB SSD NvME"}'::jsonb,
 'https://cdn.poehali.dev/files/7a10690c-ba60-40fe-a683-842c32c6e137.png', 7, true),

('Special 5 White (Ryzen 7500F + RTX 5060 Ti)', 'Готовое решение для сборки за 125.000 тысяч рублей под QHD Gaming на Ультра настройках графики', 125000, 'QHD',
 '{"cpu": "AMD Ryzen 5 7500F", "gpu": "RTX 5060 Ti", "ram": "16GB", "storage": "1TB SSD NvME"}'::jsonb,
 'https://cdn.poehali.dev/files/95355beb-a823-466e-becf-c0bf50640d6e.jpg', 8, true),

('Special 6 (Ryzen 7500F + RTX 5070)', 'Готовое решение для сборки за 135.000 тысяч рублей под QHD Gaming на Ультра настройках графики', 135000, 'QHD',
 '{"cpu": "AMD Ryzen 5 7500F", "gpu": "RTX 5070", "ram": "16GB", "storage": "1TB SSD NvME"}'::jsonb,
 'https://cdn.poehali.dev/files/7a10690c-ba60-40fe-a683-842c32c6e137.png', 9, true),

('Special 7 (Ryzen 7700 + RTX 5070)', 'Готовое решение для сборки за 150.000 тысяч рублей под QHD Gaming на Ультра настройках графики', 150000, 'QHD',
 '{"cpu": "AMD Ryzen 7 7700", "gpu": "RTX 5070", "ram": "16GB", "storage": "1TB SSD NvME"}'::jsonb,
 'https://cdn.poehali.dev/files/7a10690c-ba60-40fe-a683-842c32c6e137.png', 10, true),

('Special 8 (Ryzen 7700 + RTX 5070 Ti)', 'Готовое решение для сборки за 195.000 тысяч рублей под 4K Gaming на Ультра настройках графики', 195000, '4K',
 '{"cpu": "AMD Ryzen 7 7700", "gpu": "RTX 5070 Ti", "ram": "16GB", "storage": "1TB SSD NvME"}'::jsonb,
 'https://cdn.poehali.dev/files/24ed0cbd-6032-448e-8a4e-c2452e415fc2.jpg', 11, true),

('Special 9 (Ryzen 7700 + RTX 5070 Ti )', 'Готовое решение для сборки за 205.000 тысяч рублей под 4K Gaming на Ультра настройках графики', 205000, '4K',
 '{"cpu": "AMD Ryzen 7 7700", "gpu": "RTX 5070 Ti", "ram": "16GB", "storage": "1TB SSD NvME"}'::jsonb,
 'https://cdn.poehali.dev/files/b5843de2-f16d-4792-af97-f03dca355267.jpg', 12, true);
