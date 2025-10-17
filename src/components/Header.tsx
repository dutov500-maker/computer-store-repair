import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/1258a3ce-944b-46de-88b7-5a629a1775c1.png" 
              alt="КЛАБ"
              className="h-10 w-auto"
            />
            <span className="text-xl font-heading font-bold">Компьютерная Лаборатория</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-sm hover:text-primary transition-colors">
              Каталог
            </Link>
            <a href="#selection" className="text-sm hover:text-primary transition-colors">
              Подбор компьютера
            </a>
            <a href="#services" className="text-sm hover:text-primary transition-colors">
              Услуги
            </a>
            <a href="#works" className="text-sm hover:text-primary transition-colors">
              Наши работы
            </a>
            <a href="#blog" className="text-sm hover:text-primary transition-colors">
              Блог
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+79950272707" className="hidden lg:flex items-center gap-2 text-sm font-medium">
              <Icon name="Phone" size={18} />
              +7 995 027 27 07
            </a>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Icon name="MessageCircle" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;