import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  schema?: any;
}

const defaultSEO = {
  title: 'Сборка компьютеров и ремонт ПК в Волжском | Компьютерная Лаборатория',
  description: 'Профессиональная сборка игровых и офисных компьютеров в Волжском. Ремонт ПК и ноутбуков с гарантией. Только новые комплектующие. Бесплатная доставка от 50 000₽. ☎️ +7 (995) 027-27-07',
  keywords: 'сборка компьютеров волжский, ремонт компьютеров волжский, игровой пк волжский, компьютерная лаборатория, ремонт пк волжский, сборка пк на заказ, купить компьютер волжский',
  ogImage: 'https://cdn.poehali.dev/files/1258a3ce-944b-46de-88b7-5a629a1775c1.png'
};

const pageSchemas: Record<string, any> = {
  '/services': {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Компьютерные услуги",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Компьютерная Лаборатория",
      "telephone": "+79950272707",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Волжский",
        "addressRegion": "Волгоградская область",
        "addressCountry": "RU"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Волжский"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Компьютерные услуги",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Сборка компьютеров на заказ",
            "description": "Профессиональная сборка игровых и офисных компьютеров под ключ"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ремонт компьютеров и ноутбуков",
            "description": "Диагностика и ремонт ПК любой сложности с гарантией"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Чистка компьютера от пыли",
            "description": "Профессиональная чистка системного блока и замена термопасты"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Модернизация и апгрейд ПК",
            "description": "Улучшение характеристик компьютера, замена комплектующих"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Установка Windows и программ",
            "description": "Установка операционной системы и необходимого ПО"
          }
        }
      ]
    }
  },
  '/catalog': {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Каталог готовых компьютеров",
    "description": "Готовые сборки игровых и офисных компьютеров",
    "itemListElement": [
      {
        "@type": "Product",
        "name": "Игровой компьютер",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "RUB",
          "lowPrice": "50000",
          "highPrice": "150000"
        }
      },
      {
        "@type": "Product",
        "name": "Офисный компьютер",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "RUB",
          "lowPrice": "30000",
          "highPrice": "60000"
        }
      }
    ]
  },
  '/reviews': {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Компьютерная Лаборатория",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    }
  },
  '/contact': {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
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
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  },
  '/blog': {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Блог о компьютерах и комплектующих",
    "description": "Полезные статьи о выборе, сборке и обслуживании компьютеров",
    "publisher": {
      "@type": "Organization",
      "name": "Компьютерная Лаборатория"
    }
  },
  '/warranty': {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Гарантия на сборку и ремонт",
    "description": "Условия гарантийного обслуживания",
    "mainEntity": {
      "@type": "WarrantyPromise",
      "durationOfWarranty": {
        "@type": "QuantitativeValue",
        "value": "12",
        "unitCode": "MON"
      }
    }
  },
  '/delivery': {
    "@context": "https://schema.org",
    "@type": "DeliveryMethod",
    "name": "Доставка компьютеров по Волжскому",
    "description": "Бесплатная доставка при заказе от 50 000₽"
  }
};

const pageSEO: Record<string, SEOProps> = {
  '/': {
    title: 'Сборка компьютеров и ремонт ПК в Волжском | Компьютерная Лаборатория',
    description: 'Профессиональная сборка игровых и офисных компьютеров в Волжском. Ремонт ПК и ноутбуков с гарантией. Только новые комплектующие. Бесплатная доставка от 50 000₽.',
    keywords: 'сборка компьютеров волжский, ремонт компьютеров волжский, игровой пк волжский, компьютерная лаборатория, купить компьютер волжский, собрать пк на заказ'
  },
  '/services': {
    title: 'Услуги по сборке и ремонту компьютеров в Волжском | Компьютерная Лаборатория',
    description: 'Полный спектр компьютерных услуг: сборка ПК, ремонт компьютеров и ноутбуков, чистка от пыли, замена термопасты, модернизация. Гарантия на все работы.',
    keywords: 'услуги компьютерной помощи волжский, ремонт компьютеров волжский, сборка пк на заказ, чистка компьютера волжский, замена термопасты, установка windows волжский, модернизация компьютера, апгрейд пк волжский, настройка компьютера, компьютерный мастер волжский, ремонт ноутбуков волжский, диагностика пк'
  },
  '/catalog': {
    title: 'Каталог готовых компьютеров и сборок ПК | Волжский',
    description: 'Готовые игровые и офисные компьютеры от 30 000₽. Только проверенные комплектующие. Индивидуальная сборка под ваши задачи. Гарантия 12 месяцев.',
    keywords: 'купить компьютер волжский, готовые сборки пк, игровой компьютер цена, офисный пк купить, компьютер для работы, мощный пк волжский, готовый пк волжский, сборка компьютера под заказ, игровой компьютер купить, стоимость сборки пк'
  },
  '/portfolio': {
    title: 'Примеры работ: собранные компьютеры и выполненный ремонт | Волжский',
    description: 'Фото готовых сборок игровых и офисных компьютеров. Реальные примеры наших работ по ремонту и модернизации ПК в Волжском.',
    keywords: 'примеры сборки компьютеров, готовые игровые пк фото, наши работы ремонт компьютеров, портфолио сборки пк, собранные компьютеры волжский, фото игровых сборок'
  },
  '/reviews': {
    title: 'Отзывы клиентов о сборке и ремонте компьютеров | Волжский',
    description: 'Реальные отзывы клиентов о наших услугах по сборке компьютеров и ремонту ПК в Волжском. Более 50 положительных отзывов.',
    keywords: 'отзывы компьютерная лаборатория, отзывы сборка компьютеров волжский, отзывы ремонт пк, рейтинг компьютерного сервиса, отзывы клиентов ремонт компьютеров'
  },
  '/contact': {
    title: 'Контакты: адрес, телефон, часы работы | Компьютерная Лаборатория Волжский',
    description: 'Свяжитесь с нами для заказа сборки ПК или ремонта компьютера. Телефон: +7 (995) 027-27-07, Email: complab34@gmail.com. Работаем Пн-Пт 9:00-18:00.',
    keywords: 'компьютерная лаборатория волжский адрес, телефон компьютерного сервиса, контакты ремонт компьютеров, как заказать сборку пк, записаться на ремонт компьютера'
  },
  '/pc-selection': {
    title: 'Подбор компьютера под ваши задачи | Волжский',
    description: 'Поможем подобрать оптимальную конфигурацию компьютера для игр, работы или учебы. Бесплатная консультация по выбору комплектующих.',
    keywords: 'подбор компьютера волжский, подобрать комплектующие пк, конфигурация компьютера для игр, какой компьютер выбрать, консультация по сборке пк, помощь в выборе компьютера'
  },
  '/blog': {
    title: 'Блог о компьютерах: советы по выбору и сборке ПК | Волжский',
    description: 'Полезные статьи о выборе комплектующих, сборке компьютеров, обслуживании ПК. Советы и рекомендации от профессионалов.',
    keywords: 'блог о компьютерах, как выбрать компьютер, советы по сборке пк, обслуживание компьютера, статьи о железе пк'
  },
  '/warranty': {
    title: 'Гарантия на сборку и ремонт компьютеров | Волжский',
    description: 'Гарантия 12 месяцев на все собранные компьютеры и выполненные работы. Бесплатное гарантийное обслуживание.',
    keywords: 'гарантия на сборку компьютера, гарантия ремонт пк, гарантийное обслуживание компьютеров волжский'
  },
  '/delivery': {
    title: 'Доставка компьютеров по Волжскому | Бесплатная доставка от 50 000₽',
    description: 'Бесплатная доставка готовых компьютеров по Волжскому при заказе от 50 000₽. Курьерская доставка в удобное время.',
    keywords: 'доставка компьютеров волжский, доставка пк на дом, бесплатная доставка компьютеров, курьерская доставка пк волжский'
  }
};

const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const seo = pageSEO[currentPath] || defaultSEO;
    const schema = pageSchemas[currentPath];

    document.title = seo.title || defaultSEO.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description || defaultSEO.description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seo.keywords || defaultSEO.keywords);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.title || defaultSEO.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', seo.description || defaultSEO.description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://computer-store-repair.poehali.dev${currentPath}`);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://computer-store-repair.poehali.dev${currentPath}`);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', seo.title || defaultSEO.title);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', seo.description || defaultSEO.description);
    }

    let schemaScript = document.getElementById('page-schema');
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schema) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'page-schema';
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }
  }, [location]);

  return null;
};

export default SEO;
