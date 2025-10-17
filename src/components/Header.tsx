import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { initializeStorage, getSettings } from '@/lib/localStorage';

const Header = () => {
  const [settings, setSettings] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    initializeStorage();
    fetchSettings();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchSettings = () => {
    const data = getSettings();
    setSettings(data);
  };

  return (
    <header className={`bg-background/95 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'border-primary/20 shadow-lg shadow-primary/5' : 'border-border'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-md group-hover:blur-lg transition-all"></div>
              <img 
                src="https://cdn.poehali.dev/files/1258a3ce-944b-46de-88b7-5a629a1775c1.png" 
                alt="КЛАБ"
                className="h-10 w-10 rounded-full object-cover relative group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-xl font-heading font-bold group-hover:text-primary transition-colors">{settings?.company_name || 'Компьютерная Лаборатория'}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-all relative group">
              <span className="relative z-10">Каталог</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-all relative group">
              <span className="relative z-10">Блог</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              to="/pc-selection" 
              className="text-sm font-medium hover:text-primary transition-all relative group"
            >
              <span className="relative z-10">Подбор ПК</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              to="/services" 
              className="text-sm font-medium hover:text-primary transition-all relative group"
            >
              <span className="relative z-10">Ремонт и Услуги</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              to="/portfolio" 
              className="text-sm font-medium hover:text-primary transition-all relative group"
            >
              <span className="relative z-10">Портфолио</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              to="/#about-old" 
              className="text-sm font-medium hover:text-primary transition-colors hidden"
              onClick={(e) => {
                const element = document.getElementById('portfolio');
                if (element) {
                  e.preventDefault();
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Работы
            </Link>
            <Link 
              to="/reviews" 
              className="text-sm font-medium hover:text-primary transition-all relative group"
            >
              <span className="relative z-10">Отзывы</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              to="/contact" 
              className="text-sm font-medium hover:text-primary transition-all relative group"
            >
              <span className="relative z-10">Контакты</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href={`tel:${settings?.phone || '+79950272707'}`} className="hidden lg:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Icon name="Phone" size={18} />
              {settings?.phone || '+7 995 027 27 07'}
            </a>
            <a href="https://wa.me/79950272707" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-md hover:shadow-xl hover:scale-105 transition-all relative overflow-hidden group">
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <Icon name="MessageCircle" size={18} className="mr-2 relative z-10" />
                <span className="hidden sm:inline relative z-10">Написать</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;