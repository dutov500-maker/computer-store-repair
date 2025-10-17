import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';

const STATIC_PORTFOLIO = [
  {
    id: 1,
    title: "Игровой системный блок для 4K гейминга",
    description: "Мощная сборка для 4K-гейминга с RTX 4080",
    image_url: "https://cdn.poehali.dev/files/47a9814a-0246-4ac6-aa93-a35c472f606f.jpg",
    category: "Игровой ПК",
    specs: "Процессор AMD Ryzen 7 7800X3D • Видеокарта RTX 4080",
    price_range: "200000 ₽"
  },
  {
    id: 2,
    title: "Компактный игровой компьютер",
    description: "Тихая и производительная сборка для игр и работы",
    image_url: "https://cdn.poehali.dev/files/1a84e611-89ea-4feb-9364-5ab4c578d6fe.jpg",
    category: "Игровой ПК",
    specs: "Процессор AMD Ryzen 5 5600X • Видеокарта KFA2 GeForce RTX 5070 ROCK(X) OC White",
    price_range: "120000 ₽"
  },
  {
    id: 3,
    title: "Игровой монстр для любых игр на ближайшие 5 лет 💪",
    description: "Топовая сборка с мощной видеокартой",
    image_url: "https://cdn.poehali.dev/files/022b9002-704a-432c-8640-8b6877016612.jpg",
    category: "Игровой ПК",
    specs: "Процессор AMD Ryzen 7 7800X3D • Видеокарта MSI GeForce RTX 5070 Ti GAMING TRIO OC",
    price_range: "250000 ₽"
  },
  {
    id: 4,
    title: "Белоснежный компик ❄️",
    description: "Стильная белая сборка с RGB подсветкой",
    image_url: "https://cdn.poehali.dev/files/e2cab568-abdf-41af-9a9f-740013842310.jpg",
    category: "Игровой ПК",
    specs: "Процессор AMD Ryzen 5 9600X • Видеокарта KFA2 GeForce RTX 5070 ROCK(X) OC White",
    price_range: "150000 ₽"
  },
  {
    id: 5,
    title: "Заказ для киберспортсмена",
    description: "Высокопроизводительная система для соревнований",
    image_url: "https://cdn.poehali.dev/files/b7be6eda-2639-4f88-86a8-48abdbd07051.jpg",
    category: "Профессиональный",
    specs: "Процессор AMD Ryzen 7 9800X3D • Видеокарта Palit GeForce RTX 5070 GamingPro OC",
    price_range: "180000 ₽"
  },
  {
    id: 6,
    title: "Топовое решение в корпусе от Lian Li",
    description: "Премиальная сборка в легендарном корпусе",
    image_url: "https://cdn.poehali.dev/files/7ab77389-609a-4e35-8e36-e100031e6bae.jpg",
    category: "Премиум",
    specs: "Процессор AMD Ryzen 7 7800X3D • Видеокарта Palit GeForce RTX 5070 Ti GameRock",
    price_range: "220000 ₽"
  },
  {
    id: 7,
    title: "Бюджетный игровой ПК для Full HD",
    description: "Оптимальное решение для игр в Full HD",
    image_url: "https://cdn.poehali.dev/files/ae489047-44a3-4dde-932f-ed6a5199e352.jpg",
    category: "Игровой ПК",
    specs: "Процессор Intel Core i5-12400F • Видеокарта RTX 3060",
    price_range: "70000 ₽"
  },
  {
    id: 8,
    title: "Стримерская станция",
    description: "Мощный ПК для стриминга и контент-создания",
    image_url: "https://cdn.poehali.dev/files/56cb3b09-3249-4909-977d-b29d88f7b9a3.jpg",
    category: "Профессиональный",
    specs: "Процессор AMD Ryzen 9 7950X • Видеокарта RTX 4070 Ti",
    price_range: "280000 ₽"
  },
  {
    id: 9,
    title: "Рабочая станция для 3D моделирования",
    description: "Профессиональная сборка для работы с 3D графикой",
    image_url: "https://cdn.poehali.dev/files/8a36ec5e-21fd-46cb-8e25-bc66341b14c9.jpg",
    category: "Профессиональный",
    specs: "Процессор AMD Threadripper 3970X • Видеокарта RTX A5000",
    price_range: "450000 ₽"
  },
  {
    id: 10,
    title: "Минималистичная сборка для офиса",
    description: "Тихий и энергоэффективный компьютер для работы",
    image_url: "https://cdn.poehali.dev/files/c34a83da-49a6-4f23-be6f-9170e632efa2.jpg",
    category: "Офисный",
    specs: "Процессор Intel Core i3-13100 • Встроенная графика",
    price_range: "40000 ₽"
  },
  {
    id: 11,
    title: "Игровой ПК с водяным охлаждением",
    description: "Кастомная система водяного охлаждения",
    image_url: "https://cdn.poehali.dev/files/25848486-d127-48bf-bfdc-36a0c277e5c8.jpg",
    category: "Премиум",
    specs: "Процессор Intel Core i9-14900K • Видеокарта RTX 4090",
    price_range: "500000 ₽"
  },
  {
    id: 12,
    title: "Компактная сборка Mini-ITX",
    description: "Мощный компьютер в компактном корпусе",
    image_url: "https://cdn.poehali.dev/files/cd49eac6-95f0-48e5-a2e2-3987a99a7e44.jpg",
    category: "Игровой ПК",
    specs: "Процессор AMD Ryzen 7 5800X3D • Видеокарта RTX 4060 Ti",
    price_range: "110000 ₽"
  },
  {
    id: 13,
    title: "RGB монстр для ярких геймеров",
    description: "Максимум RGB подсветки и производительности",
    image_url: "https://cdn.poehali.dev/files/8f7c4b94-c6cc-4755-acd9-b8a2a84bd597.jpg",
    category: "Игровой ПК",
    specs: "Процессор Intel Core i7-14700KF • Видеокарта RTX 4070 Super",
    price_range: "190000 ₽"
  },
  {
    id: 14,
    title: "Сборка для монтажа видео",
    description: "Оптимизированная система для Adobe Premiere Pro",
    image_url: "https://cdn.poehali.dev/files/8f7c4b94-c6cc-4755-acd9-b8a2a84bd597.jpg",
    category: "Профессиональный",
    specs: "Процессор AMD Ryzen 9 5950X • Видеокарта RTX 4060",
    price_range: "160000 ₽"
  },
  {
    id: 15,
    title: "Киберпанк-стиль с неоновой подсветкой",
    description: "Уникальный дизайн с кастомной подсветкой",
    image_url: "https://cdn.poehali.dev/files/8f7c4b94-c6cc-4755-acd9-b8a2a84bd597.jpg",
    category: "Премиум",
    specs: "Процессор AMD Ryzen 7 9800X3D • Видеокарта RTX 4080 Super",
    price_range: "320000 ₽"
  }
];

const Portfolio = () => {
  const [portfolio] = useState<any[]>(STATIC_PORTFOLIO);

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Наши <span className="text-primary">работы</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Примеры собранных компьютеров для различных задач
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((item, index) => (
            <Card 
              key={item.id}
              className="overflow-hidden bg-card hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-secondary to-background">
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-heading font-bold mb-2 text-white drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/90 mb-3 drop-shadow">
                    {item.description}
                  </p>
                  {item.specs && (
                    <p className="text-xs text-white/80 mb-2 drop-shadow">
                      {item.specs}
                    </p>
                  )}
                  {item.price_range && (
                    <div className="text-lg font-bold text-primary drop-shadow">
                      {item.price_range}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Portfolio;