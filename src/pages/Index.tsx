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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, portfolioRes] = await Promise.all([
        fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753?resource=services'),
        fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753?resource=portfolio')
      ]);

      const servicesData = await servicesRes.json();
      const portfolioData = await portfolioRes.json();

      if (servicesRes.ok && servicesData.services && servicesData.services.length > 0) {
        setServices(servicesData.services.filter((s: any) => s.is_active));
      } else {
        setServices([]);
      }

      if (portfolioRes.ok && portfolioData.portfolio && portfolioData.portfolio.length > 0) {
        setPortfolio(portfolioData.portfolio.filter((p: any) => p.is_active));
      } else {
        setPortfolio([]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setServices([]);
      setPortfolio([]);
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