import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import { HeroSection } from '@/components/HomePage/HeroSection';
import { ConsultationSection } from '@/components/HomePage/ConsultationSection';
import { CatalogSection } from '@/components/HomePage/CatalogSection';
import { FAQSection } from '@/components/HomePage/FAQSection';
import { StatsSection } from '@/components/HomePage/StatsSection';
import { RepairCTASection } from '@/components/HomePage/RepairCTASection';
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
      icon: 'Clock',
      title: 'Быстрый ремонт',
      description: 'Большинство работ за 1-2 дня'
    },
    {
      icon: 'Shield',
      title: 'Гарантия на ремонт',
      description: 'До 6 месяцев на все виды работ'
    },
    {
      icon: 'Wrench',
      title: 'Опытные мастера',
      description: 'Более 10 лет в ремонте ПК'
    },
    {
      icon: 'BadgeCheck',
      title: 'Оригинальные запчасти',
      description: 'Только качественные комплектующие'
    }
  ];

  return (
    <div className="min-h-screen relative page-transition">
      <ParticlesBackground />
      <Header />
      <HeroSection />
      <RepairCTASection />
      <CatalogSection />
      <ConsultationSection />
      <FAQSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;