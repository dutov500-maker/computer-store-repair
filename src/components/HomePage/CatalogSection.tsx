import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

export const CatalogSection = () => {
  return (
    <section id="selection" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.12),transparent_70%)]"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">💰 ГОТОВЫЕ СБОРКИ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Решения под <span className="text-gradient">любой бюджет</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Сбалансированная производительность без переплат
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {[
            { res: 'FHD', title: 'Начальный', desc: 'Full HD с высокими настройками', price: '50 000', gradient: 'from-blue-500/20 to-cyan-500/20', icon: 'Zap' },
            { res: 'QHD', title: 'Оптимальный', desc: 'Идеальный баланс для QHD', price: '120 000', gradient: 'from-primary/20 to-orange-500/20', icon: 'Sparkles', featured: true },
            { res: 'UHD', title: 'Максимум', desc: 'Безграничная мощь для 4K', price: '200 000', gradient: 'from-purple-500/20 to-pink-500/20', icon: 'Flame' }
          ].map((config, index) => (
            <Card 
              key={config.res}
              className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up hover-lift ${
                config.featured ? 'md:scale-110 border-primary shadow-lg shadow-primary/20 z-10' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {config.featured && (
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse-glow z-10">
                  ХИТ
                </div>
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-6 lg:p-8">
                <div className="mb-6">
                  <div className="inline-block p-3 bg-primary/20 rounded-xl mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/50">
                    <Icon name={config.icon as any} className="text-primary group-hover:text-white transition-colors" size={28} />
                  </div>
                  <div className="text-sm font-semibold text-primary mb-1">{config.res}</div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-2">
                    {config.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {config.desc}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-1">От</div>
                  <div className="text-3xl lg:text-4xl font-heading font-bold">
                    {config.price} ₽
                  </div>
                </div>
                <Link to="/catalog">
                  <Button 
                    className={`w-full ${config.featured ? 'gradient-animated' : 'bg-card hover:bg-primary hover:text-white'} group-hover:shadow-lg transition-all hover:scale-105 relative overflow-hidden`}
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center justify-center w-full">
                      Подробнее
                      <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                    </span>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/catalog">
            <Button size="lg" variant="outline" className="border-2 hover:border-primary hover:bg-primary hover:text-white text-lg px-8">
              Смотреть весь каталог
              <Icon name="ExternalLink" className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};