import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SLIDER_IMAGES = [
  {
    url: 'https://cdn.poehali.dev/files/377a5ae9-ac93-4292-a9aa-71d3fcf60eda.jpg',
    title: 'Ultra 1 - 235К',
    category: 'ULTRA'
  },
  {
    url: 'https://cdn.poehali.dev/files/fbdd3de3-893f-486b-9828-2e385f6b9f93.jpg',
    title: 'Ultra 2 - 255К',
    category: 'ULTRA'
  },
  {
    url: 'https://cdn.poehali.dev/files/5c352159-58db-4d02-9d1d-c950fcee59f6.jpg',
    title: 'Ultra 3 - 270К',
    category: 'ULTRA'
  },
  {
    url: 'https://cdn.poehali.dev/files/da504f58-a4d2-4c37-aea2-222c5de703ac.jpg',
    title: 'Elite 1 - 530К',
    category: 'ELITE'
  }
];

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-transparent">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)/0.2), transparent)`
        }}
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">🔧 Сборка и ремонт ПК</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              Соберем компьютер{' '}
              <span className="text-gradient inline-block animate-pulse">вашей мечты</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Сборка ПК под любые задачи и профессиональный ремонт с гарантией
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
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 hover:border-primary hover:scale-105 transition-all hover:bg-primary/10">
                  Каталог готовых сборок
                  <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 glass-effect rounded-xl border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 group">
                <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Icon name="Package" className="text-primary group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-sm">Новые комплектующие</p>
                  <p className="text-xs text-muted-foreground">Официальные поставщики</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 glass-effect rounded-xl border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 group">
                <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Icon name="Truck" className="text-primary group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-sm">Бесплатная доставка</p>
                  <p className="text-xs text-muted-foreground">По Волжскому от 50к</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-3xl blur-3xl animate-pulse"></div>
            <div className="relative group perspective-1000">
              <div className="relative transform-gpu transition-transform duration-500 group-hover:rotateY-5 overflow-hidden rounded-2xl">
                {SLIDER_IMAGES.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ${
                      index === currentSlide
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={image.url}
                      alt={image.title}
                      className="relative rounded-2xl shadow-2xl w-full h-full object-cover border border-primary/20"
                      loading="lazy"
                    />
                  </div>
                ))}
                <img 
                  src={SLIDER_IMAGES[0].url}
                  alt="Placeholder"
                  className="relative rounded-2xl shadow-2xl w-full border border-primary/20 invisible"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
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