import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const menuItems = [
  { to: '/catalog', label: 'Каталог' },
  { to: '/pc-selection', label: 'Подбор ПК' },
  { to: '/services', label: 'Услуги' },
  { to: '/repair-gallery', label: 'Галерея' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/blog', label: 'Журнал' },
  { to: '/contact', label: 'Контакты' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-[#0A0A0A]/90 backdrop-blur-md border-b ${
        scrolled ? 'border-[#FF6B00]/40' : 'border-white/5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 border-2 border-[#FF6B00] flex items-center justify-center font-heading font-black text-[#FF6B00] text-sm group-hover:bg-[#FF6B00] group-hover:text-black transition-all">
              K|L
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-black text-white tracking-widest text-sm uppercase">
                K|LAB
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                Custom PC Atelier
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-3 py-2 text-xs font-mono tracking-[0.2em] uppercase text-white/70 hover:text-[#FF6B00] transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-[#FF6B00] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+79950272707"
              className="hidden md:flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-[#FF6B00] transition-colors"
            >
              <Icon name="Phone" size={14} />
              <span>+7 995 027-27-07</span>
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOIA6d075Cod-oEXOD45O0dMe4dxvcb69ZiIjPWreMI9fiLCoVg"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold text-xs tracking-widest uppercase px-5 py-2.5 transition-all border border-[#FF6B00] hover:shadow-[0_0_24px_rgba(255,107,0,0.5)]"
            >
              <Icon name="MessageCircle" size={14} />
              Мессенджер MAX
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 border border-white/10 hover:border-[#FF6B00] transition-colors"
              aria-label="Меню"
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen &&
        createPortal(
          <>
            <div
              className={`fixed inset-0 bg-black/80 z-[9998] lg:hidden backdrop-blur-sm transition-opacity duration-300 ${
                isClosing ? 'opacity-0' : 'opacity-100'
              }`}
              onClick={closeMenu}
            />
            <div
              className={`fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#0A0A0A] border-l border-[#FF6B00]/30 z-[9999] lg:hidden flex flex-col transition-transform duration-300 ${
                isClosing ? 'translate-x-full' : 'translate-x-0'
              }`}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <div className="font-heading font-black text-white tracking-widest uppercase">
                    K|LAB
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.25em] text-[#FF6B00] uppercase mt-1">
                    // Навигация
                  </div>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 border border-white/10 hover:border-[#FF6B00] transition-colors"
                >
                  <Icon name="X" size={20} className="text-white" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-1">
                  {menuItems.map((item, i) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={closeMenu}
                        className="group flex items-center gap-4 p-4 border border-transparent hover:border-[#FF6B00]/40 hover:bg-[#FF6B00]/5 transition-all"
                      >
                        <span className="font-mono text-xs text-[#FF6B00]/50">
                          0{i + 1}
                        </span>
                        <span className="font-heading font-bold text-white uppercase tracking-wider group-hover:text-[#FF6B00] transition-colors">
                          {item.label}
                        </span>
                        <Icon
                          name="ArrowRight"
                          size={16}
                          className="ml-auto text-white/30 group-hover:text-[#FF6B00] transition-colors"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-6 border-t border-white/10 space-y-3">
                <a
                  href="tel:+79950272707"
                  className="flex items-center gap-3 text-white hover:text-[#FF6B00] transition-colors"
                >
                  <Icon name="Phone" size={16} />
                  <span className="font-mono text-sm tracking-wider">+7 995 027-27-07</span>
                </a>
                <a
                  href="https://max.ru/u/f9LHodD0cOIA6d075Cod-oEXOD45O0dMe4dxvcb69ZiIjPWreMI9fiLCoVg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold text-xs tracking-widest uppercase py-3"
                >
                  <Icon name="MessageCircle" size={14} />
                  Мессенджер MAX
                </a>
              </div>
            </div>
          </>,
          document.body
        )}
    </header>
  );
};

export default Header;