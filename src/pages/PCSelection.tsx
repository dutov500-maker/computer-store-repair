import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PCSelectionSection } from '@/components/HomePage/PCSelectionSection';
import { initializeStorage } from '@/lib/localStorage';

const PCSelection = () => {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="min-h-screen page-transition">
      <Helmet>
        <title>Сборка компьютера на заказ в Волжском - Игровые и офисные ПК</title>
        <meta name="description" content="Профессиональная сборка компьютера под ваши задачи в Волжском. Игровые, офисные, рабочие станции. Подбор комплектующих и сборка. Гарантия до 3 лет. ☎️ +7 (995) 027-27-07" />
        <meta name="keywords" content="сборка компьютеров волжский, сборка пк на заказ волжский, собрать пк волжский, сборка игрового пк волжский, подбор компьютера волжский, сборка компьютера под ключ волжский" />
        <meta property="og:title" content="Сборка компьютера на заказ в Волжском" />
        <meta property="og:description" content="Профессиональная сборка ПК под ваши задачи. Гарантия до 3 лет. ☎️ +7 (995) 027-27-07" />
        <link rel="canonical" href="https://комплаб.рф/pc-selection" />
      </Helmet>
      <Header />
      <div className="pt-20">
        <PCSelectionSection fullPage={true} />
      </div>
      <Footer />
    </div>
  );
};

export default PCSelection;