import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Header = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e?resource=settings');
      const data = await response.json();
      if (response.ok) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

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
            <span className="text-xl font-heading font-bold">{settings?.company_name || 'Компьютерная Лаборатория'}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
              Каталог
            </Link>
            <a href="#pc-selection" className="text-sm font-medium hover:text-primary transition-colors">
              Подбор ПК
            </a>
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Услуги
            </a>
            <a href="#works" className="text-sm font-medium hover:text-primary transition-colors">
              Работы
            </a>
            <a href="#reviews" className="text-sm font-medium hover:text-primary transition-colors">
              Отзывы
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a href={`tel:${settings?.phone || '+79950272707'}`} className="hidden lg:flex items-center gap-2 text-sm font-medium">
              <Icon name="Phone" size={18} />
              {settings?.phone || '+7 995 027 27 07'}
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