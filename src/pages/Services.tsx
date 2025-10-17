import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const STATIC_SERVICES = [
  {
    id: 1,
    title: "Диагностика компьютера",
    description: "Полная проверка всех компонентов системы",
    icon: "Search",
    price: "Бесплатно"
  },
  {
    id: 2,
    title: "Чистка от пыли",
    description: "Профессиональная чистка системного блока",
    icon: "Wind",
    price: "от 500 ₽"
  },
  {
    id: 3,
    title: "Замена термопасты",
    description: "Замена термопасты на процессоре и видеокарте",
    icon: "Droplet",
    price: "от 800 ₽"
  },
  {
    id: 4,
    title: "Установка Windows",
    description: "Установка и настройка операционной системы",
    icon: "HardDrive",
    price: "от 1000 ₽"
  },
  {
    id: 5,
    title: "Ремонт материнской платы",
    description: "Диагностика и ремонт неисправностей",
    icon: "Cpu",
    price: "от 2000 ₽"
  },
  {
    id: 6,
    title: "Замена блока питания",
    description: "Подбор и установка нового БП",
    icon: "Zap",
    price: "от 500 ₽"
  },
  {
    id: 7,
    title: "Апгрейд компьютера",
    description: "Модернизация и улучшение характеристик",
    icon: "TrendingUp",
    price: "от 1000 ₽"
  },
  {
    id: 8,
    title: "Восстановление данных",
    description: "Восстановление файлов с HDD/SSD",
    icon: "Database",
    price: "от 3000 ₽"
  },
  {
    id: 9,
    title: "Настройка BIOS",
    description: "Оптимизация параметров системы",
    icon: "Settings",
    price: "от 800 ₽"
  },
  {
    id: 10,
    title: "Удаление вирусов",
    description: "Полная очистка от вредоносного ПО",
    icon: "Shield",
    price: "от 1500 ₽"
  },
  {
    id: 11,
    title: "Замена кулера",
    description: "Установка нового охлаждения",
    icon: "Fan",
    price: "от 700 ₽"
  },
  {
    id: 12,
    title: "Ремонт видеокарты",
    description: "Диагностика и устранение неисправностей GPU",
    icon: "MonitorCheck",
    price: "от 2500 ₽"
  },
  {
    id: 13,
    title: "Установка драйверов",
    description: "Поиск и установка актуальных драйверов",
    icon: "Download",
    price: "от 500 ₽"
  },
  {
    id: 14,
    title: "Настройка сети",
    description: "Подключение к интернету и локальной сети",
    icon: "Wifi",
    price: "от 800 ₽"
  },
  {
    id: 15,
    title: "Замена жесткого диска",
    description: "Установка HDD/SSD с переносом данных",
    icon: "HardDrive",
    price: "от 1200 ₽"
  }
];

const Services = () => {
  const [services] = useState<any[]>(STATIC_SERVICES);

  return (
    <div className="min-h-screen page-transition">
      <Header />
      
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Услуги по <span className="text-primary">ремонту</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Профессиональный ремонт и обслуживание компьютеров
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className="p-6 hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name={service.icon} size={28} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {service.description}
                  </p>
                  <div className="text-primary font-bold">
                    {service.price}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            Наши преимущества
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Icon name="Clock" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold mb-2">Быстрый ремонт</h3>
              <p className="text-sm text-muted-foreground">Большинство работ выполняем за 1-2 дня</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold mb-2">Гарантия</h3>
              <p className="text-sm text-muted-foreground">На все виды работ до 6 месяцев</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Icon name="Wrench" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold mb-2">Опытные мастера</h3>
              <p className="text-sm text-muted-foreground">Более 10 лет опыта в ремонте ПК</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Icon name="BadgeCheck" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold mb-2">Оригинальные запчасти</h3>
              <p className="text-sm text-muted-foreground">Только качественные комплектующие</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;