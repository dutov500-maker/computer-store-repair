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
    image_url: 'https://storage.yandexcloud.net/poehali-static/dalle-gaming-pc-1.webp',
    specs: { cpu: 'Intel i9-13900K', gpu: 'RTX 4080', ram: '32GB DDR5' },
    is_active: true
  },
  {
    id: 2,
    title: 'Рабочая станция для дизайна',
    description: 'Компьютер для работы с графикой и 3D-моделированием',
    image_url: 'https://storage.yandexcloud.net/poehali-static/dalle-gaming-pc-2.webp',
    specs: { cpu: 'AMD Ryzen 9 5950X', gpu: 'RTX 4070', ram: '64GB DDR4' },
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