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
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path fill="#FC3F1D" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  <path fill="#FC3F1D" d="M7 9h2v2H7zm8 0h2v2h-2zM12 17c-2.757 0-5-2.243-5-5h2c0 1.654 1.346 3 3 3s3-1.346 3-3h2c0 2.757-2.243 5-5 5z"/>
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
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
                  <path fill="#0AF" d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z"/>
                  <path fill="#FFF" d="M21.5 11.5h-11c-.825 0-1.5.675-1.5 1.5v6c0 .825.675 1.5 1.5 1.5h11c.825 0 1.5-.675 1.5-1.5v-6c0-.825-.675-1.5-1.5-1.5zm-9 7.5h-1v-6h1v6zm3 0h-1v-6h1v6zm3 0h-1v-6h1v6zm3 0h-1v-6h1v6z"/>
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
                  <span className="text-sm font-semibold">Игорь</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Собрали игровой компьютер, все работает отлично! Профессионалы своего дела, подсказали оптимальную конфигурацию. Рекомендую!
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
                  <span className="text-sm font-semibold">Александр</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Отличный сервис! Быстро починили ноутбук, поменяли термопасту и почистили от пыли. Теперь работает как новый. Спасибо!
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
                  <span className="text-sm font-semibold">Дмитрий</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Сделали апгрейд моего ПК - поставили новую видеокарту и добавили памяти. Ребята знают свое дело, все сделали аккуратно и быстро.
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
                  <span className="text-sm font-semibold">Андрей</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Взял у них готовый игровой компьютер. Очень доволен! Все игры летают на максимальных настройках. Качество сборки на высоте!
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
                  <span className="text-sm font-semibold">Сергей</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Принес ноутбук после залития. Думал, что уже не восстановить, но ребята смогли его починить! Теперь работает без проблем. Большое спасибо!
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
                  <span className="text-sm font-semibold">Михаил</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Заказал сборку компьютера для работы в 3D. Подобрали оптимальные комплектующие, собрали быстро. Мощности хватает с запасом!
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
                  <span className="text-sm font-semibold">Вадим</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Отличная работа! Быстро починили видеокарту, заменили термопасту и прочистили от пыли. Тепературы снизились на 20 градусов. Рекомендую!
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
                  <span className="text-sm font-semibold">Олег</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Заказывал сборку с белым корпусом и RGB-подсветкой. Получилось очень красиво и мощно! И цена адекватная. Спасибо!
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