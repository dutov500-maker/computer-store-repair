import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.08),transparent_50%)]"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)/0.15), transparent)`
        }}
      />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">🎮 Игровые ПК от 50 000 ₽</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              Создадим компьютер{' '}
              <span className="text-gradient inline-block animate-pulse">вашей мечты</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Индивидуальная сборка под любые задачи с гарантией до 3 лет
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#pc-selection">
                <Button size="lg" className="gradient-primary text-lg px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Icon name="Gamepad2" className="mr-2" size={20} />
                  Подобрать компьютер
                </Button>
              </a>
              <Link to="/catalog">
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 hover:border-primary">
                  Каталог готовых сборок
                  <Icon name="ArrowRight" className="ml-2" size={20} />
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
              <div className="relative transform-gpu transition-transform duration-500 group-hover:rotateY-5">
                <img 
                  src="https://cdn.poehali.dev/files/abecf990-0148-4af7-ace4-2c4056d6be5b.jpg"
                  alt="Gaming PC"
                  className="relative rounded-2xl shadow-2xl w-full border border-primary/20"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary to-primary/80 text-white px-6 py-4 rounded-2xl shadow-xl animate-bounce-slow">
                <p className="text-sm font-semibold">Гарантия</p>
                <p className="text-2xl font-bold">до 3 лет</p>
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