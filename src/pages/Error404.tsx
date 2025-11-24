import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Error404 = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 - Страница не найдена | Компьютерная Лаборатория";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Запрашиваемая страница не найдена');
    }

    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'robots';
      newMeta.content = 'noindex, nofollow';
      document.head.appendChild(newMeta);
    }

    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl">
          <div className="mb-8 animate-bounce">
            <Icon name="AlertCircle" size={120} className="text-primary mx-auto" />
          </div>
          
          <h1 className="text-7xl md:text-9xl font-heading font-bold text-primary mb-4">
            404
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
            Страница не найдена
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Icon name="Home" size={20} className="mr-2" />
                На главную
              </Button>
            </Link>
            
            <Link to="/catalog">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Каталог компьютеров
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Icon name="Phone" size={20} className="mr-2" />
                Связаться с нами
              </Button>
            </Link>
          </div>

          <div className="mt-12 p-6 bg-card border border-border rounded-lg">
            <h3 className="font-heading font-bold text-lg mb-3">
              Возможно, вас заинтересует:
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Link to="/services" className="text-primary hover:underline">
                Услуги ремонта
              </Link>
              <Link to="/pc-selection" className="text-primary hover:underline">
                Подбор компьютера
              </Link>
              <Link to="/repair-gallery" className="text-primary hover:underline">
                Галерея работ
              </Link>
              <Link to="/reviews" className="text-primary hover:underline">
                Отзывы клиентов
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error404;
