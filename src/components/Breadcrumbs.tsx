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
      "item": `https://computer-store-repair.poehali.dev${crumb.path}`
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
      <nav className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                to="/"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                <Home size={16} className="mr-1" />
                <span className="hidden sm:inline">Главная</span>
              </Link>
            </li>
            {breadcrumbs.slice(1).map((crumb, index) => (
              <li key={crumb.path} className="flex items-center">
                <ChevronRight size={16} className="text-gray-400 dark:text-gray-600 mx-1" />
                {index === breadcrumbs.length - 2 ? (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
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
