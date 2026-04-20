import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';

const Error404 = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = '404 — Страница не найдена | K|LAB';
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) metaRobots.setAttribute('content', 'noindex, nofollow');
    console.error('404:', location.pathname);
  }, [location.pathname]);

  const links = [
    { to: '/', label: 'Главная', icon: 'Home' },
    { to: '/catalog', label: 'Каталог', icon: 'LayoutGrid' },
    { to: '/services', label: 'Услуги', icon: 'Wrench' },
    { to: '/contact', label: 'Контакты', icon: 'Phone' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white page-transition">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-3xl relative">
          <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-6">
            // System error · Route not found
          </div>
          <h1 className="font-heading font-black uppercase leading-[0.9] text-[20vw] md:text-[15rem] text-[#FF6B00] tracking-tighter">
            404
          </h1>
          <div className="w-24 h-1 bg-[#FF6B00] mx-auto mb-8" />
          <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white mb-6">
            Страница не найдена
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
            Запрошенный маршрут <span className="font-mono text-[#FF6B00]">{location.pathname}</span> не существует.
            Вернитесь на главную или выберите раздел.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group border border-white/10 hover:border-[#FF6B00] bg-[#0D0D0D] p-5 flex flex-col items-center gap-3 transition-all"
              >
                <Icon name={l.icon} size={22} className="text-[#FF6B00] group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs tracking-widest uppercase text-white/70 group-hover:text-white">
                  {l.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error404;
