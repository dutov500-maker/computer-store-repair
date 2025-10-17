import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HeroSection } from '@/components/HomePage/HeroSection';
import { ConsultationSection } from '@/components/HomePage/ConsultationSection';
import { CatalogSection } from '@/components/HomePage/CatalogSection';
import { PCSelectionSection } from '@/components/HomePage/PCSelectionSection';
import { FAQSection } from '@/components/HomePage/FAQSection';
import { StatsSection } from '@/components/HomePage/StatsSection';
import { ConsultationFormSection } from '@/components/HomePage/ConsultationFormSection';
import { initializeStorage } from '@/lib/localStorage';

const Index = () => {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ConsultationSection />
      <CatalogSection />
      <PCSelectionSection />
      <FAQSection />
      <StatsSection />
      <ConsultationFormSection />
      <Footer />
    </div>
  );
};

export default Index;