import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { initializeStorage, getSettings } from '@/lib/localStorage';

const Header = () => {
  const [settings, setSettings] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initializeStorage();
    fetchSettings();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const fetchSettings = () => {
    const data = getSettings();
    setSettings(data);
  };

  const menuItems = [
    { to: '/catalog', label: 'Каталог' },
    { to: '/blog', label: 'Блог' },
    { to: '/pc-selection', label: 'Подбор ПК' },
    { to: '/services', label: 'Ремонт и Услуги' },
    { to: '/portfolio', label: 'Портфолио' },
    { to: '/reviews', label: 'Отзывы' },
    { to: '/contact', label: 'Контакты' }
  ];

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

          <div className="flex items-center gap-2 md:gap-4">
            <a href="tel:+79950272707" className="hidden lg:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Icon name="Phone" size={18} />
              +7 995 027 27 07
            </a>
            <a href="https://wa.me/79950272707" target="_blank" rel="noopener noreferrer" className="hidden md:block">
              <Button size="sm" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-md hover:shadow-xl hover:scale-105 transition-all relative overflow-hidden group">
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <Icon name="MessageCircle" size={18} className="mr-2 relative z-10" />
                <span className="relative z-10">Написать</span>
              </Button>
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 hover:bg-secondary rounded-lg transition-colors border border-border"
              aria-label="Меню"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && createPortal(
        <>
          <div 
            className="fixed inset-0 bg-black/70 z-[9998] md:hidden backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white dark:bg-zinc-900 z-[9999] md:hidden shadow-2xl animate-slide-in-from-right flex flex-col" style={{ minHeight: '100vh', maxHeight: '100vh' }}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700 flex-shrink-0">
              <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">Меню</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} className="text-gray-900 dark:text-white" />
              </button>
            </div>
            <nav className="px-4 py-6 flex-1 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={item.to} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <Link
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-4 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all font-medium text-lg text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 hover:border-primary/40"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-700 space-y-3">
                <a
                  href="tel:+79950272707"
                  className="flex items-center gap-3 px-4 py-4 rounded-xl border-2 border-gray-200 dark:border-zinc-700 hover:border-primary dark:hover:border-primary transition-all bg-gray-50 dark:bg-zinc-800"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="Phone" size={20} className="text-primary" />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">+7 995 027 27 07</span>
                </a>
                <a
                  href="https://wa.me/79950272707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-4 rounded-xl bg-[#25D366] text-white shadow-lg hover:bg-[#20BA5A] transition-all"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Icon name="MessageCircle" size={20} />
                  </div>
                  <span className="font-semibold">Написать в WhatsApp</span>
                </a>
              </div>
            </nav>
          </div>
        </>,
        document.body
      )}
    </header>
  );
};

export default Header;