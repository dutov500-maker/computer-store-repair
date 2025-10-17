-- Добавление компьютеров из скриншотов

-- Первый скриншот (6 компьютеров)

-- ECO 1 (Ryzen 5 5500 + GTX 1080)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'ECO 1 ( Ryzen 5 5500 + GTX 1080 )',
  'Бюджетный игровой системный блок за 45.000 руб под Full HD Gaming',
  45000,
  'Full HD',
  '{"cpu": "AMD Ryzen 5 5500", "gpu": "GTX 1080", "ram": "16GB", "storage": "512GB SSD"}'::jsonb,
  'https://cdn.poehali.dev/files/f574c09d-4176-4149-a073-73c6e024b053.png'
);

-- Eco #2
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'Eco #2',
  'Бюджетный игровой системный блок за 50.000 руб под Full HD Gaming',
  50000,
  'Full HD',
  '{"cpu": "Intel Core i3-12100F", "gpu": "RTX 3050", "ram": "16GB", "storage": "512GB SSD"}'::jsonb,
  'https://cdn.poehali.dev/files/f574c09d-4176-4149-a073-73c6e024b053.png'
);

-- ECO 3 (Ryzen 5 5600 + RTX 3060ti)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'ECO 3 ( Ryzen 5 5600 + RTX 3060ti )',
  'Бюджетный игровой системный блок за 60.000 руб под Full HD Gaming',
  65000,
  'Full HD',
  '{"cpu": "AMD Ryzen 5 5600", "gpu": "RTX 3060Ti", "ram": "16GB", "storage": "512GB SSD"}'::jsonb,
  'https://cdn.poehali.dev/files/f574c09d-4176-4149-a073-73c6e024b053.png'
);

-- Special 1 (Ryzen 5600 + RTX 5060)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'Special 1 ( Ryzen 5600 + RTX 5060 )',
  'Готовое решение для сборки за 75 тысяч рублей под FullHD Gaming на Ультра настройках графики',
  75000,
  'Full HD',
  '{"cpu": "AMD Ryzen 5 5600", "gpu": "Palit RTX 5060 Dual 8GB", "ram": "16GB", "storage": "1000GB SSD"}'::jsonb,
  'https://cdn.poehali.dev/files/f574c09d-4176-4149-a073-73c6e024b053.png'
);

-- Special 2 (i5 12400F + RTX 5060)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'Special 2 (i5 12400F + RTX 5060)',
  'Готовое решение для сборки за 89 тысяч рублей под FullHD Gaming на Ультра настройках графики',
  89000,
  'Full HD',
  '{"cpu": "Intel Core i5-12400F", "gpu": "RTX 5060", "ram": "16GB DDR4", "storage": "1TB NVMe SSD"}'::jsonb,
  'https://cdn.poehali.dev/files/f574c09d-4176-4149-a073-73c6e024b053.png'
);

-- Special 3 (Ryzen 8400F + RTX 5060)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'Special 3 (Ryzen 8400F + RTX 5060)',
  'Готовое решение для сборки за 91 тысяч рублей под FullHD Gaming на Ультра настройках графики',
  92000,
  'Full HD',
  '{"cpu": "AMD Ryzen 5 8400F", "gpu": "RTX 5060", "ram": "16GB DDR5", "storage": "1TB SSD NVMe"}'::jsonb,
  'https://cdn.poehali.dev/files/f574c09d-4176-4149-a073-73c6e024b053.png'
);

-- Второй скриншот (9 компьютеров)

-- Special 4 (Ryzen 7500F + RTX 5060 Ti)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'Special 4 (Ryzen 7500F + RTX 5060 Ti)',
  'Готовое решение для сборки за 110.000 тысяч рублей под QHD Gaming на Ультра настройках графики',
  110000,
  'QHD',
  '{"cpu": "AMD Ryzen 5 7500F", "gpu": "RTX 5060 TI", "ram": "16GB", "storage": "1TB SSD NVMe"}'::jsonb,
  'https://cdn.poehali.dev/files/f19a6705-f610-4757-be48-8d1a9415d3c8.png'
);

-- Special 5 White (Ryzen 7500F + RTX 5060 Ti)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'Special 5 White (Ryzen 7500F + RTX 5060 Ti)',
  'Готовое решение для сборки за 125.000 тысяч рублей под QHD Gaming на Ультра настройках графики',
  125000,
  'QHD',
  '{"cpu": "AMD Ryzen 5 7500F", "gpu": "RTX 5060 TI", "ram": "16GB", "storage": "1TB SSD NVMe"}'::jsonb,
  'https://cdn.poehali.dev/files/f19a6705-f610-4757-be48-8d1a9415d3c8.png'
);

-- Special 6 (Ryzen 7500F + RTX 5070)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'Special 6 (Ryzen 7500F + RTX 5070)',
  'Готовое решение для сборки за 135.000 тысяч рублей под QHD Gaming на Ультра настройках графики',
  135000,
  'QHD',
  '{"cpu": "AMD Ryzen 5 7500F", "gpu": "RTX 5070", "ram": "16GB", "storage": "1TB SSD NVMe"}'::jsonb,
  'https://cdn.poehali.dev/files/f19a6705-f610-4757-be48-8d1a9415d3c8.png'
);

-- Special 7 (Ryzen 7700 + RTX 5070)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'Special 7 (Ryzen 7700 + RTX 5070)',
  'Готовое решение для сборки за 150.000 тысяч рублей под QHD Gaming на Ультра настройках графики',
  150000,
  'QHD',
  '{"cpu": "AMD Ryzen 7 7700", "gpu": "RTX 5070", "ram": "16GB", "storage": "1TB SSD NVMe"}'::jsonb,
  'https://cdn.poehali.dev/files/f19a6705-f610-4757-be48-8d1a9415d3c8.png'
);

-- Special 8 (Ryzen 7700 + RTX 5070 Ti)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'Special 8 (Ryzen 7700 + RTX 5070 Ti)',
  'Готовое решение для сборки за 195.000 тысяч рублей под 4K Gaming на Ультра настройках графики',
  195000,
  '4K',
  '{"cpu": "AMD Ryzen 7 7700", "gpu": "RTX 5070 TI", "ram": "16GB", "storage": "1TB SSD NVMe"}'::jsonb,
  'https://cdn.poehali.dev/files/f19a6705-f610-4757-be48-8d1a9415d3c8.png'
);

-- Special 9 (Ryzen 7700 + RTX 5070 Ti)
INSERT INTO catalog (title, description, price, resolution, specs, image_url)
VALUES (
  'Special 9 (Ryzen 7700 + RTX 5070 Ti )',
  'Готовое решение для сборки за 205.000 тысяч рублей под 4K Gaming на Ультра настройках графики',
  205000,
  '4K',
  '{"cpu": "AMD Ryzen 7 7700", "gpu": "RTX 5070 TI", "ram": "16GB", "storage": "1TB SSD NVMe"}'::jsonb,
  'https://cdn.poehali.dev/files/f19a6705-f610-4757-be48-8d1a9415d3c8.png'
);
