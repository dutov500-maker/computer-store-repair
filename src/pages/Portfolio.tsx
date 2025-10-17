import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PortfolioSection } from '@/components/HomePage/PortfolioSection';
import funcUrls from '../../backend/func2url.json';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${funcUrls.api}?type=portfolio`);
      const data = await response.json();
      setPortfolio(data);
    } catch (error) {
      console.error('Ошибка загрузки портфолио:', error);
    } finally {
      setLoading(false);
    }
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