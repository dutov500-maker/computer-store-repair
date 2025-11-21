import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import { HeroSection } from '@/components/HomePage/HeroSection';
import { ConsultationSection } from '@/components/HomePage/ConsultationSection';
import { CatalogSection } from '@/components/HomePage/CatalogSection';
import { ServicesSection } from '@/components/HomePage/ServicesSection';
import { FAQSection } from '@/components/HomePage/FAQSection';
import { StatsSection } from '@/components/HomePage/StatsSection';
import { ConsultationFormSection } from '@/components/HomePage/ConsultationFormSection';
import { initializeStorage, getServices } from '@/lib/localStorage';

const Index = () => {
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
    <div className="min-h-screen relative page-transition">
      <ParticlesBackground />
      <Header />
      <HeroSection />
      <StatsSection />
      <CatalogSection />
      <ServicesSection services={services} advantages={advantages} />
      <ConsultationSection />
      <FAQSection />
      <ConsultationFormSection />
      <Footer />
    </div>
  );
};

export default Index;