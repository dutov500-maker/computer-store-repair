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
    <div className="min-h-screen bg-[#0A0A0A] text-white page-transition">
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
      <section className="py-24 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // PC Configurator
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase leading-none">
              Подбор
              <br />
              <span className="text-[#FF6B00]">компьютера</span>
            </h1>
            <p className="text-white/60 text-lg mt-6 max-w-xl">
              Ответьте на несколько вопросов — предложим оптимальную сборку
              под ваши задачи и бюджет.
            </p>
          </div>
        </div>
      </section>
      <div>
        <PCSelectionSection fullPage={true} />
      </div>
      <Footer />
    </div>
  );
};

export default PCSelection;