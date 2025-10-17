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

const Index = () => {
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetchServices();
    fetchPortfolio();
    fetchSettings();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e?resource=services');
      const data = await response.json();
      if (response.ok && data.services) {
        setServices(data.services.filter((s: any) => s.is_active));
      }
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e?resource=portfolio');
      const data = await response.json();
      if (response.ok && data.portfolio) {
        setPortfolio(data.portfolio.filter((p: any) => p.is_active));
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e?resource=settings');
      const data = await response.json();
      if (response.ok) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
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
      description: 'По всей России при заказе от 50 000 ₽'
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
