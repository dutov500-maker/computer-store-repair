import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ReviewsSectionProps {
  fullPage?: boolean;
}

export const ReviewsSection = ({ fullPage = false }: ReviewsSectionProps) => {
  return (
    <section id="reviews" className={`py-20 bg-gradient-to-b from-background to-primary/5 ${fullPage ? 'min-h-screen' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">⭐ ОТЗЫВЫ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Что говорят <span className="text-gradient">наши клиенты</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            Реальные отзывы с Яндекс Карт и Авито
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto mb-8">
          <Card className="p-6 gradient-card border-primary/20 shadow-xl animate-slide-in-left hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">Яндекс Карты</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.9 из 5</span>
                </div>
              </div>
            </div>
            <div 
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '500px'
              }}
            >
              <iframe
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #e6e6e6',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
                src="https://yandex.ru/maps-reviews-widget/105118454033?comments"
                title="Отзывы на Яндекс Картах"
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <a 
                href="https://yandex.ru/profile/105118454033" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="w-full hover:bg-red-500/10 hover:border-red-500">
                  <Icon name="ExternalLink" className="mr-2" size={18} />
                  Все отзывы на Яндекс Картах
                </Button>
              </a>
            </div>
          </Card>

          <Card className="p-6 gradient-card border-primary/20 shadow-xl animate-slide-in-right hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">Авито</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">5.0 из 5</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">Отличный продавец!</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Всё быстро, качественно, профессионально. Компьютер собран отлично, работает без нареканий. Рекомендую!
                </p>
                <span className="text-xs text-muted-foreground">Покупатель с Авито</span>
              </div>
              
              <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">Супер!</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Компьютер собрали под мои задачи, всё работает отлично. Цены адекватные, консультация на высоте. Спасибо!
                </p>
                <span className="text-xs text-muted-foreground">Покупатель с Авито</span>
              </div>

              <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">Рекомендую</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Быстрая сборка, качественные комплектующие. Ребята знают своё дело, помогли с выбором конфигурации.
                </p>
                <span className="text-xs text-muted-foreground">Покупатель с Авито</span>
              </div>

              <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">Очень доволен</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Заказывал игровой ПК. Собрали быстро, всё работает идеально. Игры летают на максимальных настройках!
                </p>
                <span className="text-xs text-muted-foreground">Покупатель с Авито</span>
              </div>

              <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">Отличная работа!</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Профессиональный подход, адекватные цены, быстрая доставка. Всё на высшем уровне. Буду обращаться ещё!
                </p>
                <span className="text-xs text-muted-foreground">Покупатель с Авито</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <a 
                href="https://www.avito.ru/brands/54e5b9245dfb13dda34429b64ed9ab14/all?sellerId=838f5cfc85832c17ec8cdf8faab5817d" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="w-full hover:bg-blue-500/10 hover:border-blue-500">
                  <Icon name="ExternalLink" className="mr-2" size={18} />
                  Все отзывы на Авито
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};