import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { KLabHero } from '@/components/KLab/KLabHero';
import { KLabUSP } from '@/components/KLab/KLabUSP';
import { KLabEditions } from '@/components/KLab/KLabEditions';
import { KLabTradeIn } from '@/components/KLab/KLabTradeIn';
import { KLabTrust } from '@/components/KLab/KLabTrust';
import { KLabContact } from '@/components/KLab/KLabContact';
import StickyHelpButton from '@/components/StickyHelpButton';
import { initializeStorage } from '@/lib/localStorage';

const Index = () => {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="min-h-screen relative page-transition bg-[#0A0A0A] text-white">
      <Header />
      <main>
        <KLabHero />
        <KLabUSP />
        <KLabEditions />
        <KLabTradeIn />
        <KLabTrust />
        <KLabContact />
      </main>
      <Footer />
      <StickyHelpButton />
    </div>
  );
};

export default Index;
