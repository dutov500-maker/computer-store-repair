import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const defaultSEO = {
  title: 'Сборка компьютеров и ремонт ПК в Волжском | Компьютерная Лаборатория',
  description: 'Профессиональная сборка игровых и офисных компьютеров в Волжском. Ремонт ПК и ноутбуков с гарантией. Только новые комплектующие. Бесплатная доставка от 50 000₽. ☎️ +7 (995) 027-27-07',
  keywords: 'сборка компьютеров волжский, ремонт компьютеров волжский, игровой пк волжский, компьютерная лаборатория, ремонт пк волжский, сборка пк на заказ, купить компьютер волжский',
  ogImage: 'https://cdn.poehali.dev/files/1258a3ce-944b-46de-88b7-5a629a1775c1.png'
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
  }, [location]);

  return null;
};

export default SEO;
