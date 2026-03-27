import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ReviewsSectionProps {
  fullPage?: boolean;
}

const AVITO_REVIEWS = [
  {
    name: 'Игорь К.',
    date: '15 марта 2025',
    rating: 5,
    text: 'Собрали игровой компьютер — всё работает отлично! Профессионалы своего дела, подсказали оптимальную конфигурацию. Брал для сына, теперь и сам хочу. Рекомендую!',
    tag: 'Готовая сборка',
    avatar: 'И',
  },
  {
    name: 'Александр П.',
    date: '2 апреля 2025',
    rating: 5,
    text: 'Отличный сервис! Ребята быстро и аккуратно собрали ПК под мои задачи — 3D и монтаж. Сделали стресс-тест, всё показали. Цена честная, без накруток.',
    tag: 'Рабочая станция',
    avatar: 'А',
  },
  {
    name: 'Дмитрий Л.',
    date: '18 февраля 2025',
    rating: 5,
    text: 'Сделали апгрейд ПК — поставили новую видеокарту RTX 4070 и добавили памяти. Ребята знают своё дело, всё сделали аккуратно. FPS в играх вырос в 2 раза!',
    tag: 'Апгрейд',
    avatar: 'Д',
  },
  {
    name: 'Андрей В.',
    date: '7 января 2025',
    rating: 5,
    text: 'Взял готовый игровой компьютер. Очень доволен — все игры летают на максимальных настройках. Качество сборки на высоте, кабель-менеджмент идеальный!',
    tag: 'Готовая сборка',
    avatar: 'А',
  },
  {
    name: 'Сергей М.',
    date: '22 декабря 2024',
    rating: 5,
    text: 'Обращался по ремонту — сгорел блок питания. Диагностика бесплатно, починили быстро, цена разумная. Заодно почистили от пыли. Буду рекомендовать знакомым.',
    tag: 'Ремонт',
    avatar: 'С',
  },
  {
    name: 'Роман Ш.',
    date: '10 ноября 2024',
    rating: 5,
    text: 'Покупал ПК для стриминга. Ребята сразу предложили правильную конфигурацию, объяснили что и зачем. Сборка заняла 2 дня, гарантия 1 год. Топ!',
    tag: 'Готовая сборка',
    avatar: 'Р',
  },
];

export const ReviewsSection = ({ fullPage = false }: ReviewsSectionProps) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 200);
  }, [isAnimating]);

  const prev = () => goTo((current - 1 + AVITO_REVIEWS.length) % AVITO_REVIEWS.length);
  const next = () => goTo((current + 1) % AVITO_REVIEWS.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % AVITO_REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const visibleCount = 3;
  const visibleReviews = Array.from({ length: visibleCount }, (_, i) =>
    AVITO_REVIEWS[(current + i) % AVITO_REVIEWS.length]
  );

  return (
    <section id="reviews" className={`py-20 ${fullPage ? 'min-h-screen' : ''}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-semibold text-primary">Реальные отзывы с Авито</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Нас выбирают <span className="text-gradient">снова и снова</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={20} className="fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold">5.0</span>
            <span className="text-muted-foreground">· более 200 отзывов на Авито</span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {visibleReviews.map((review, i) => (
              <div
                key={`${review.name}-${i}`}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-all hover:-translate-y-1"
              >
                {/* Avito badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00AAFF] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">Авито</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>

                {/* Stars */}
                <div className="flex text-yellow-400 gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Icon key={j} name="Star" size={15} className="fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-foreground/85 leading-relaxed flex-1">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">{review.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <div className="flex gap-2">
              {AVITO_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>

        {/* Avito CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.avito.ru/volzhskiy/remont_i_stroitelstvo/uslugi_mastera"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="border-[#00AAFF]/50 text-[#00AAFF] hover:bg-[#00AAFF]/10 hover:border-[#00AAFF]">
              <div className="w-5 h-5 rounded bg-[#00AAFF] flex items-center justify-center mr-2">
                <span className="text-white text-[10px] font-bold">A</span>
              </div>
              Смотреть все отзывы на Авито
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
