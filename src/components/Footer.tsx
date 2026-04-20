import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-[#FF6B00]/20 text-white pt-20 pb-28 md:pb-16 overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-24 bg-[#FF6B00]" />
      <div className="absolute top-0 right-0 w-24 h-1 bg-[#FF6B00]" />

      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border-2 border-[#FF6B00] flex items-center justify-center font-heading font-black text-[#FF6B00]">
                K|L
              </div>
              <div className="leading-tight">
                <div className="font-heading font-black text-white tracking-widest uppercase">
                  K|LAB
                </div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                  Custom PC Atelier
                </div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Инженерный перфекционизм в каждой сборке. Кастомные ПК премиум-класса
              с фанатичным вниманием к деталям.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-6">
              // Лаборатория
            </div>
            <ul className="space-y-3">
              {[
                { to: '/page/about', label: 'О компании' },
                { to: '/warranty', label: 'Гарантия' },
                { to: '/delivery', label: 'Доставка' },
                { to: '/blog', label: 'Журнал' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/60 hover:text-[#FF6B00] transition-colors text-sm font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-6">
              // Навигация
            </div>
            <ul className="space-y-3">
              {[
                { to: '/catalog', label: 'Каталог' },
                { to: '/pc-selection', label: 'Подбор ПК' },
                { to: '/services', label: 'Услуги' },
                { to: '/repair-gallery', label: 'Галерея работ' },
                { to: '/reviews', label: 'Отзывы' },
                { to: '/contact', label: 'Контакты' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/60 hover:text-[#FF6B00] transition-colors text-sm font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-6">
              // Связь
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+79950272707"
                  className="flex items-center gap-3 text-white/70 hover:text-[#FF6B00] transition-colors"
                >
                  <div className="w-9 h-9 border border-white/10 flex items-center justify-center">
                    <Icon name="Phone" size={14} className="text-[#FF6B00]" />
                  </div>
                  <span className="font-mono text-sm tracking-wider">+7 995 027-27-07</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/komplabvlz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-[#FF6B00] transition-colors"
                >
                  <div className="w-9 h-9 border border-white/10 flex items-center justify-center">
                    <Icon name="Send" size={14} className="text-[#FF6B00]" />
                  </div>
                  <span className="font-mono text-sm tracking-wider">Telegram</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <div className="w-9 h-9 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon name="MapPin" size={14} className="text-[#FF6B00]" />
                </div>
                <span className="text-sm leading-relaxed pt-1">
                  Волжский,
                  <br />
                  ул. Александрова, 24а
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-xs text-white/40 space-y-1">
            <div>ИП Дутов Антоний Александрович</div>
            <div>ИНН 501817855432 · ОГРНИП 325344300038542</div>
          </div>
          <div className="font-mono text-xs text-white/30 tracking-wider uppercase">
            © {new Date().getFullYear()} K|LAB · All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
