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

  const generateServiceSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Сборка компьютера на заказ",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Компьютерная Лаборатория",
        "telephone": "+79950272707",
        "email": "complab34@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Волжский",
          "addressRegion": "Волгоградская область",
          "addressCountry": "RU"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "50"
        }
      },
      "description": "Профессиональная сборка компьютера под любые задачи: игровые ПК, офисные компьютеры, рабочие станции. Подбор оптимальных комплектующих, сборка и настройка.",
      "areaServed": {
        "@type": "City",
        "name": "Волжский"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Типы сборок",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Игровой компьютер",
              "description": "Сборка мощного игрового ПК для современных игр"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "45000",
              "maxPrice": "530000",
              "priceCurrency": "RUB"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Офисный компьютер",
              "description": "Надежная сборка для работы и учебы"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "25000",
              "maxPrice": "60000",
              "priceCurrency": "RUB"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Рабочая станция",
              "description": "Мощная сборка для профессиональных задач"
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "minPrice": "80000",
              "maxPrice": "500000",
              "priceCurrency": "RUB"
            }
          }
        ]
      }
    };
  };

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
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema()) }}
      />
      
      <Header />
      <div className="pt-20">
        <PCSelectionSection fullPage={true} />
      </div>
      <Footer />
    </div>
  );
};

export default PCSelection;