import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ServicesSection } from '@/components/HomePage/ServicesSection';
import { initializeStorage, getServices } from '@/lib/localStorage';

const Services = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    initializeStorage();
    fetchData();
  }, []);

  const fetchData = () => {
    const servicesData = getServices();
    setServices(servicesData.filter((s: any) => s.is_active));
  };

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
      <div className="pt-20">
        <ServicesSection services={services} advantages={advantages} fullPage={true} />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
