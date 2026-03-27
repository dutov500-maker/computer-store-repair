import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HeroSection } from '@/components/HomePage/HeroSection';
import { ConsultationSection } from '@/components/HomePage/ConsultationSection';
import { CatalogSection } from '@/components/HomePage/CatalogSection';
import { FAQSection } from '@/components/HomePage/FAQSection';
import { StatsSection } from '@/components/HomePage/StatsSection';
import { RepairCTASection } from '@/components/HomePage/RepairCTASection';
import { ReviewsSection } from '@/components/HomePage/ReviewsSection';
import { PCSelectionSection } from '@/components/HomePage/PCSelectionSection';
import { TrustBadgesSection } from '@/components/HomePage/TrustBadgesSection';
import { RepairUpgradeSection } from '@/components/HomePage/RepairUpgradeSection';
import { StandardsSection } from '@/components/HomePage/StandardsSection';

import { initializeStorage, getServices } from '@/lib/localStorage';

const Index = () => {
  const [services, setServices] = useState<{ id: number; is_active: boolean }[]>([]);

  useEffect(() => {
    initializeStorage();
    fetchData();
  }, []);

  const fetchData = () => {
    const servicesData = getServices() as { id: number; is_active: boolean }[];
    setServices(servicesData.filter(s => s.is_active));
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
      <Header />
      <div className="space-y-0">
        <HeroSection />
        <TrustBadgesSection />
        <StandardsSection />
        <RepairUpgradeSection />
        <ReviewsSection />
        <PCSelectionSection />
        <RepairCTASection />
        <CatalogSection />
        <ConsultationSection />
        <FAQSection />
        <StatsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;