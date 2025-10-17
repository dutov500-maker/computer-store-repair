-- Добавляем примеры работ в портфолио
INSERT INTO portfolio_items (title, description, image_url, display_order, is_active) VALUES
('Игровая сборка RTX 4070', 'Мощный игровой ПК для стримера с RGB-подсветкой и водяным охлаждением', 'https://cdn.poehali.dev/files/d322308c-7515-48ef-af5a-e8afd42ad954.png', 1, true),
('Рабочая станция для 3D', 'Профессиональная сборка для работы с Blender, Maya и рендеринга', 'https://cdn.poehali.dev/files/7a10690c-ba60-40fe-a683-842c32c6e137.png', 2, true),
('Компактный Gaming ПК', 'Производительная сборка в компактном корпусе с отличным охлаждением', 'https://cdn.poehali.dev/files/95355beb-a823-466e-becf-c0bf50640d6e.jpg', 3, true),
('Бюджетный Gaming', 'Оптимальная сборка для Full HD гейминга на высоких настройках', 'https://cdn.poehali.dev/files/24ed0cbd-6032-448e-8a4e-c2452e415fc2.jpg', 4, true),
('White Premium Build', 'Премиальная белая сборка с водяным охлаждением и подсветкой', 'https://cdn.poehali.dev/files/b5843de2-f16d-4792-af97-f03dca355267.jpg', 5, true),
('Офисная рабочая станция', 'Тихая и производительная сборка для офисной работы', 'https://cdn.poehali.dev/files/d322308c-7515-48ef-af5a-e8afd42ad954.png', 6, true)
ON CONFLICT DO NOTHING;
