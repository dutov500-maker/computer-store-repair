import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const breadcrumbNames: Record<string, string> = {
  '/': 'Главная',
  '/services': 'Услуги',
  '/catalog': 'Каталог',
  '/portfolio': 'Примеры работ',
  '/reviews': 'Отзывы',
  '/contact': 'Контакты',
  '/pc-selection': 'Подбор компьютера',
  '/blog': 'Блог',
  '/warranty': 'Гарантия',
  '/delivery': 'Доставка',
  '/admin': 'Админ-панель',
  '/admin/login': 'Вход'
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' }
  ];

  let currentPath = '';
  pathnames.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = breadcrumbNames[currentPath] || segment;
    breadcrumbs.push({ label, path: currentPath });
  });

  const generateBreadcrumbSchema = () => {
    const itemListElement = breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://комплаб.рф${crumb.path}`
    }));

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema()) }}
      />
      <nav className="bg-[#0A0A0A] border-b border-white/5">
        <div className="container mx-auto px-6 py-3">
          <ol className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase">
            <li>
              <Link
                to="/"
                className="flex items-center text-white/50 hover:text-[#FF6B00] transition-colors"
              >
                <Home size={14} className="mr-1.5" />
                <span className="hidden sm:inline">Главная</span>
              </Link>
            </li>
            {breadcrumbs.slice(1).map((crumb, index) => (
              <li key={crumb.path} className="flex items-center">
                <ChevronRight size={14} className="text-white/20 mx-1" />
                {index === breadcrumbs.length - 2 ? (
                  <span className="text-[#FF6B00] font-bold">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="text-white/50 hover:text-[#FF6B00] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;