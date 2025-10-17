import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HeroSection } from '@/components/HomePage/HeroSection';
import { ConsultationSection } from '@/components/HomePage/ConsultationSection';
import { CatalogSection } from '@/components/HomePage/CatalogSection';
import { ServicesSection } from '@/components/HomePage/ServicesSection';
import { PortfolioSection } from '@/components/HomePage/PortfolioSection';
import { PCSelectionSection } from '@/components/HomePage/PCSelectionSection';
import { ReviewsSection } from '@/components/HomePage/ReviewsSection';
import { FAQSection } from '@/components/HomePage/FAQSection';
import { StatsSection } from '@/components/HomePage/StatsSection';
import { ConsultationFormSection } from '@/components/HomePage/ConsultationFormSection';

const servicesData = [
  {
    id: 1,
    title: 'Диагностика компьютера',
    description: 'Полная проверка всех компонентов и выявление неисправностей',
    price: 'от 500₽',
    icon: 'Search',
    features: ['Тестирование процессора', 'Проверка оперативной памяти', 'Диагностика жёсткого диска', 'Анализ системы охлаждения'],
    is_active: true
  },
  {
    id: 2,
    title: 'Замена комплектующих',
    description: 'Установка новых компонентов с проверкой совместимости',
    price: 'от 800₽',
    icon: 'Package',
    features: ['Подбор совместимых деталей', 'Профессиональная установка', 'Настройка BIOS', 'Тестирование стабильности'],
    is_active: true
  },
  {
    id: 3,
    title: 'Чистка от пыли',
    description: 'Удаление пыли и замена термопасты для оптимального охлаждения',
    price: 'от 600₽',
    icon: 'Wind',
    features: ['Полная разборка', 'Чистка всех компонентов', 'Замена термопасты', 'Проверка вентиляторов'],
    is_active: true
  },
  {
    id: 4,
    title: 'Установка Windows',
    description: 'Установка операционной системы с необходимыми драйверами',
    price: 'от 700₽',
    icon: 'HardDrive',
    features: ['Установка ОС', 'Установка драйверов', 'Базовые программы', 'Настройка системы'],
    is_active: true
  },
  {
    id: 5,
    title: 'Удаление вирусов',
    description: 'Полная очистка системы от вредоносного ПО',
    price: 'от 500₽',
    icon: 'Shield',
    features: ['Сканирование системы', 'Удаление вирусов', 'Настройка защиты', 'Профилактика'],
    is_active: true
  },
  {
    id: 6,
    title: 'Апгрейд компьютера',
    description: 'Модернизация для повышения производительности',
    price: 'от 1000₽',
    icon: 'TrendingUp',
    features: ['Консультация по апгрейду', 'Подбор комплектующих', 'Установка и настройка', 'Тестирование'],
    is_active: true
  }
];

const portfolioData = [
  {
    id: 1,
    title: 'Игровой ПК для киберспорта',
    description: 'Сборка мощного компьютера для профессионального гейминга',
    image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/7ce5968e-7e5b-4c60-9373-f858c5c625d8.jpg',
    specs: { cpu: 'Intel i9-13900K', gpu: 'RTX 4080', ram: '32GB DDR5' },
    is_active: true
  },
  {
    id: 2,
    title: 'Рабочая станция для дизайна',
    description: 'Компьютер для работы с графикой и 3D-моделированием',
    image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/5cb84848-df29-46a1-8a92-15598168f17c.jpg',
    specs: { cpu: 'AMD Ryzen 9 5950X', gpu: 'RTX 4070', ram: '64GB DDR4' },
    is_active: true
  },
  {
    id: 3,
    title: 'Офисная конфигурация Pro',
    description: 'Надёжный компьютер для работы с документами и интернетом',
    image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/26bdd8a8-f50e-4b82-ab8b-9350c35ea7c6.jpg',
    specs: { cpu: 'Intel i5-12400', gpu: 'Intel UHD 730', ram: '16GB DDR4' },
    is_active: true
  },
  {
    id: 4,
    title: 'Стример-сборка 4K',
    description: 'Мощная система для стриминга и записи видео',
    image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/ea9a7115-026e-4dab-a031-6a18e5477583.jpg',
    specs: { cpu: 'AMD Ryzen 9 7950X', gpu: 'RTX 4090', ram: '64GB DDR5' },
    is_active: true
  },
  {
    id: 5,
    title: 'Компактный Mini-ITX',
    description: 'Небольшой, но производительный компьютер для дома',
    image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/f42f0239-7a8a-4bc7-8618-509d0ccc635e.jpg',
    specs: { cpu: 'AMD Ryzen 7 5800X3D', gpu: 'RTX 3070', ram: '32GB DDR4' },
    is_active: true
  },
  {
    id: 6,
    title: 'Монтажная станция 4K',
    description: 'Специализированная сборка для видеомонтажа',
    image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/df14b2bc-cb92-495c-a2c3-d763703c08a9.jpg',
    specs: { cpu: 'Intel i9-13900KS', gpu: 'RTX 4080', ram: '128GB DDR5' },
    is_active: true
  }
];

const Index = () => {
  const [services] = useState<any[]>(servicesData);
  const [portfolio] = useState<any[]>(portfolioData);
  const [settings] = useState<any>(null);

  const advantages = [
    {
      icon: 'Package',
      title: 'Только новые комплектующие',
      description: 'Работаем только с официальными поставщиками'
    },
    {
      icon: 'Truck',
      title: 'Бесплатная доставка',
      description: 'По Волжскому при заказе от 50 000 ₽'
    },
    {
      icon: 'Shield',
      title: 'Гарантия качества',
      description: 'До 3 лет на все комплектующие'
    },
    {
      icon: 'Wrench',
      title: 'Бесплатный ремонт',
      description: 'В течение гарантийного срока'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ConsultationSection />
      <CatalogSection />
      <ServicesSection services={services} advantages={advantages} />
      <PortfolioSection portfolio={portfolio} />
      <PCSelectionSection />
      <ReviewsSection />
      <FAQSection />
      <StatsSection />
      <ConsultationFormSection />
      <Footer />
    </div>
  );
};

export default Index;