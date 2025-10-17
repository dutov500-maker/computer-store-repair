import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Cpu" className="text-primary-foreground" size={24} />
            </div>
            <span className="text-xl font-heading font-bold">GURUPC</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-sm hover:text-primary transition-colors">
              Каталог
            </Link>
            <a href="#" className="text-sm hover:text-primary transition-colors">
              Подбор компьютера
            </a>
            <a href="#" className="text-sm hover:text-primary transition-colors">
              Услуги
            </a>
            <a href="#" className="text-sm hover:text-primary transition-colors">
              Наши работы
            </a>
            <a href="#" className="text-sm hover:text-primary transition-colors">
              Блог
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+79500059822" className="hidden lg:flex items-center gap-2 text-sm font-medium">
              <Icon name="Phone" size={18} />
              8 950 005 98 22
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
