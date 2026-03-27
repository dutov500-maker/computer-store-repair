import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SLIDER_IMAGES = [
  {
    url: 'https://cdn.poehali.dev/files/ea9cf683-2a7b-4b39-978e-3b97077b4cf6.jpg',
    title: 'Ultra 1 - 265К',
    category: 'ULTRA'
  },
  {
    url: 'https://cdn.poehali.dev/files/c2e89173-e95e-4143-8090-a100f334c4cb.jpg',
    title: 'Premium 2 - 165К',
    category: 'PREMIUM'
  },
  {
    url: 'https://cdn.poehali.dev/files/ef30776e-bc42-4a3c-9226-66f03dacf007.jpg',
    title: 'Premium 1 - 145К',
    category: 'PREMIUM'
  },
  {
    url: 'https://cdn.poehali.dev/files/5d2552b2-ef60-4635-a318-97fb773b7e5b.jpg',
    title: 'Premium 4 - 225К',
    category: 'PREMIUM'
  },
  {
    url: 'https://cdn.poehali.dev/files/7596f8cc-1e94-4d3f-b548-2459676f4d29.jpg',
    title: 'Eco 5 - 70К',
    category: 'ECO'
  }
];

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % SLIDER_IMAGES.length;
        setLoadedImages(prev => new Set([...prev, next]));
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-[#1a1a1a]">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)/0.15), transparent)`
        }}
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-sm font-semibold text-orange-400">Акция месяца: Скидка 10% на первую сборку или чистку ПК</span>
            </div>
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-tight text-white">
                Профессиональная сборка игровых и рабочих{' '}
                <span className="text-gradient inline-block">ПК в Волжском</span>{' '}
                с гарантией до 3 лет
              </h1>
            </div>
            <p className="text-xl text-white/75">
              Бесплатная диагностика, сборка за 1-2 дня и доставка по городу
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/pc-selection">
                <Button size="lg" className="gradient-animated text-lg px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 relative overflow-hidden group">
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  <Icon name="Gamepad2" className="mr-2 animate-glow-pulse" size={20} />
                  Подобрать компьютер
                </Button>
              </Link>
              <Link to="/catalog">
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-white/40 text-white hover:border-primary hover:scale-105 transition-all hover:bg-primary/20">
                  Каталог готовых сборок
                  <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/15 md:hover:border-primary/60 transition-all md:hover:scale-105 group">
                <div className="p-2 bg-primary/20 rounded-lg md:group-hover:bg-primary md:group-hover:scale-110 transition-all">
                  <Icon name="Package" className="text-primary md:group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">Новые комплектующие</p>
                  <p className="text-xs text-white/50">Официальные поставщики</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/15 md:hover:border-primary/60 transition-all md:hover:scale-105 group">
                <div className="p-2 bg-primary/20 rounded-lg md:group-hover:bg-primary md:group-hover:scale-110 transition-all">
                  <Icon name="Truck" className="text-primary md:group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">Бесплатная доставка</p>
                  <p className="text-xs text-white/50">По Волжскому от 50к</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="hidden md:block absolute -inset-4 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-3xl blur-3xl animate-pulse"></div>
            <div className="relative group perspective-1000">
              <div className="relative transform-gpu transition-transform duration-500 md:group-hover:rotateY-5 overflow-hidden rounded-2xl">
                {SLIDER_IMAGES.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ${
                      index === currentSlide
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    {loadedImages.has(index) && (
                      <img 
                        src={image.url}
                        alt={image.title}
                        className="relative rounded-2xl shadow-2xl w-full h-full object-cover border border-primary/20"
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    )}
                  </div>
                ))}
                <img 
                  src={SLIDER_IMAGES[0].url}
                  alt="Placeholder"
                  className="relative rounded-2xl shadow-2xl w-full border border-primary/20 invisible"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {SLIDER_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-primary w-8'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Слайд ${index + 1}`}
                  />
                ))}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-primary to-primary/80 text-white px-4 py-2.5 rounded-xl shadow-xl animate-bounce-slow">
                <p className="text-xs font-semibold">Гарантия</p>
                <p className="text-lg font-bold">до 3 лет</p>
              </div>
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <p className="text-xs font-semibold">В наличии</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};