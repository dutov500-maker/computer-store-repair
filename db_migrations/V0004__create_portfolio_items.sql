CREATE TABLE IF NOT EXISTS portfolio_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO portfolio_items (title, description, image_url, display_order) VALUES
('Игровая станция Premium', 'Мощная сборка для 4K-гейминга', 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/4411866f-6b88-4906-b361-b61006c52f6b.jpg', 1),
('Рабочая станция', 'Оптимальная конфигурация для работы', 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/f640ba71-1984-4233-ad18-c61376c8d6de.jpg', 2),
('Стримерская сборка', 'Для стриминга и контент-создания', 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/b7124fb7-4401-4730-9bb4-9d4c2a163e21.jpg', 3);