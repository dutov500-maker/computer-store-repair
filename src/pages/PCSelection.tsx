import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PCSelectionSection } from '@/components/HomePage/PCSelectionSection';
import { initializeStorage } from '@/lib/localStorage';

const PCSelection = () => {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20">
        <PCSelectionSection fullPage={true} />
      </div>
      <Footer />
    </div>
  );
};

export default PCSelection;
