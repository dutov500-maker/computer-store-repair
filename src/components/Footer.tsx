import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';
import { initializeStorage, getSettings } from '@/lib/localStorage';

const Footer = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    initializeStorage();
    fetchSettings();
  }, []);

  const fetchSettings = () => {
    const data = getSettings();
    setSettings(data);
  };

  return (
    <footer className="bg-card border-t border-primary/20 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">
              {settings?.company_name || 'Компьютерная Лаборатория'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {settings?.about_text || 'Профессиональная сборка игровых компьютеров и ремонт техники'}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/page/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Гарантия
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Доставка и оплата
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Услуги
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={`tel:${settings?.phone || '+79950272707'}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Icon name="Phone" size={16} />
                  {settings?.phone || '+7 995 027 27 07'}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${settings?.email || 'info@example.com'}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Icon name="Mail" size={16} />
                  {settings?.email || 'info@example.com'}
                </a>
              </li>
              <li className="text-sm text-muted-foreground flex items-start gap-2">
                <Icon name="MapPin" size={16} className="mt-1" />
                {settings?.address || 'Москва, ул. Примерная, д. 1'}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {settings?.company_name || 'Компьютерная Лаборатория'}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;