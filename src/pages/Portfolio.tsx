import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PortfolioSection } from '@/components/HomePage/PortfolioSection';
import { initializeStorage, getPortfolio } from '@/lib/localStorage';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<any[]>([]);

  useEffect(() => {
    initializeStorage();
    fetchData();
  }, []);

  const fetchData = () => {
    const portfolioData = getPortfolio();
    setPortfolio(portfolioData.filter((p: any) => p.is_active));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20">
        <PortfolioSection portfolio={portfolio} fullPage={true} />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
