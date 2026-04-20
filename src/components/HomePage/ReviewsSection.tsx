import { useState, useEffect, useCallback } from 'react';
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
    source: 'avito',
  },
  {
    name: 'Александр П.',
    date: '2 апреля 2025',
    rating: 5,
    text: 'Отличный сервис! Ребята быстро и аккуратно собрали ПК под мои задачи — 3D и монтаж. Сделали стресс-тест, всё показали. Цена честная, без накруток.',
    tag: 'Рабочая станция',
    avatar: 'А',
    source: 'avito',
  },
  {
    name: 'Дмитрий Л.',
    date: '18 февраля 2025',
    rating: 5,
    text: 'Сделали апгрейд ПК — поставили новую видеокарту RTX 4070 и добавили памяти. Ребята знают своё дело, всё сделали аккуратно. FPS в играх вырос в 2 раза!',
    tag: 'Апгрейд',
    avatar: 'Д',
    source: 'avito',
  },
  {
    name: 'Андрей В.',
    date: '7 января 2025',
    rating: 5,
    text: 'Взял готовый игровой компьютер. Очень доволен — все игры летают на максимальных настройках. Качество сборки на высоте, кабель-менеджмент идеальный!',
    tag: 'Готовая сборка',
    avatar: 'А',
    source: 'avito',
  },
  {
    name: 'Сергей М.',
    date: '22 декабря 2024',
    rating: 5,
    text: 'Обращался по ремонту — сгорел блок питания. Диагностика бесплатно, починили быстро, цена разумная. Заодно почистили от пыли. Буду рекомендовать знакомым.',
    tag: 'Ремонт',
    avatar: 'С',
    source: 'avito',
  },
  {
    name: 'Роман Ш.',
    date: '10 ноября 2024',
    rating: 5,
    text: 'Покупал ПК для стриминга. Ребята сразу предложили правильную конфигурацию, объяснили что и зачем. Сборка заняла 2 дня, гарантия 1 год. Топ!',
    tag: 'Готовая сборка',
    avatar: 'Р',
    source: 'avito',
  },
];

const YANDEX_REVIEWS = [
  {
    name: 'Максим Т.',
    date: '5 апреля 2025',
    rating: 5,
    text: 'Обратился с проблемой перегрева ноутбука. Почистили, поменяли термопасту на PTM7950 — температура упала с 95 до 68 градусов! Работа сделана аккуратно и быстро.',
    tag: 'Чистка и ТО',
    avatar: 'М',
    source: 'yandex',
  },
  {
    name: 'Екатерина Н.',
    date: '12 марта 2025',
    rating: 5,
    text: 'Покупала игровой компьютер в подарок мужу. Антоний помог выбрать конфигурацию под бюджет, всё объяснил. Муж в восторге, FPS в любимых играх высокий.',
    tag: 'Готовая сборка',
    avatar: 'Е',
    source: 'yandex',
  },
  {
    name: 'Виталий С.',
    date: '20 февраля 2025',
    rating: 5,
    text: 'Ремонт материнской платы. Думал уже выбрасывать, но мастер починил за разумные деньги. Дали гарантию 1 год. Очень приятно иметь дело с профессионалами.',
    tag: 'Ремонт',
    avatar: 'В',
    source: 'yandex',
  },
  {
    name: 'Павел О.',
    date: '8 января 2025',
    rating: 5,
    text: 'Собирал ПК для работы с видео. Кабель-менеджмент идеальный, всё аккуратно, никаких лишних проводов. Стресс-тест 4 часа — всё отлично. Рекомендую!',
    tag: 'Сборка',
    avatar: 'П',
    source: 'yandex',
  },
  {
    name: 'Наталья Р.',
    date: '15 декабря 2024',
    rating: 5,
    text: 'Обратилась за установкой Windows и настройкой ПК. Быстро, аккуратно, объяснили всё что поставили. Цена адекватная. Мастерская отличная, буду обращаться!',
    tag: 'Установка ОС',
    avatar: 'Н',
    source: 'yandex',
  },
  {
    name: 'Алексей Д.',
    date: '3 ноября 2024',
    rating: 5,
    text: 'Делал апгрейд видеокарты — взял новую RTX 4080. Помогли с выбором, проверили совместимость, установили. Разница в играх колоссальная. Спасибо!',
    tag: 'Апгрейд',
    avatar: 'А',
    source: 'yandex',
  },
];

const ALL_REVIEWS = [...AVITO_REVIEWS, ...YANDEX_REVIEWS];

export const ReviewsSection = ({ fullPage = false }: ReviewsSectionProps) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSource, setActiveSource] = useState<'all' | 'avito' | 'yandex'>('all');

  const filtered = activeSource === 'all' ? ALL_REVIEWS
    : activeSource === 'avito' ? AVITO_REVIEWS : YANDEX_REVIEWS;

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 200);
  }, [isAnimating]);

  const prev = () => goTo((current - 1 + filtered.length) % filtered.length);
  const next = () => goTo((current + 1) % filtered.length);

  useEffect(() => {
    setCurrent(0);
  }, [activeSource]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % filtered.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [filtered.length]);

  const visibleCount = 3;
  const visibleReviews = Array.from({ length: Math.min(visibleCount, filtered.length) }, (_, i) =>
    filtered[(current + i) % filtered.length]
  );

  return (
    <section id="reviews" className={`py-20 ${fullPage ? 'min-h-[60vh]' : ''}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Нас выбирают <span className="text-gradient">снова и снова</span>
          </h2>

          {/* Платформы */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <a
              href="https://www.avito.ru/brands/54e5b9245dfb13dda34429b64ed9ab14"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-[#00AAFF]/10 border border-[#00AAFF]/30 hover:border-[#00AAFF] rounded-xl transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#00AAFF] flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-black">A</span>
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Авито</div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                  <span className="text-xs text-white/60">5.0 · 100+ отзывов</span>
                </div>
              </div>
            </a>

            <a
              href="https://yandex.ru/maps/org/kompyuternaya_laboratoriya/105118454033/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-[#FF6B00]/10 border border-[#FF6B00]/30 hover:border-[#FF6B00] rounded-xl transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center shrink-0">
                <Icon name="MapPin" size={14} className="text-black" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Яндекс.Карты</div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                  <span className="text-xs text-white/60">5.0 · 30+ отзывов</span>
                </div>
              </div>
            </a>
          </div>

          {/* Фильтр по источнику */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {([
              { id: 'all', label: 'Все' },
              { id: 'avito', label: 'Авито' },
              { id: 'yandex', label: 'Яндекс' },
            ] as const).map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveSource(f.id)}
                className={`px-4 py-2 text-xs font-bold rounded-full border transition-all ${
                  activeSource === f.id
                    ? 'bg-primary border-primary text-white'
                    : 'border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {f.label}
              </button>
            ))}
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {review.source === 'avito' ? (
                      <div className="w-8 h-8 rounded-lg bg-[#00AAFF] flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-black">A</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center shrink-0">
                        <Icon name="MapPin" size={12} className="text-black" />
                      </div>
                    )}
                    <span className="text-xs font-semibold text-muted-foreground">
                      {review.source === 'avito' ? 'Авито' : 'Яндекс.Карты'}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>

                <div className="flex text-yellow-400 gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Icon key={j} name="Star" size={15} className="fill-current" />
                  ))}
                </div>

                <p className="text-sm text-foreground/85 leading-relaxed flex-1">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {review.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{review.name}</p>
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
              {filtered.map((_, i) => (
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

        {/* CTA кнопки */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="https://www.avito.ru/brands/54e5b9245dfb13dda34429b64ed9ab14"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#00AAFF]/50 text-[#00AAFF] hover:bg-[#00AAFF]/10 hover:border-[#00AAFF] rounded-xl transition-all text-sm font-semibold"
          >
            <div className="w-5 h-5 rounded bg-[#00AAFF] flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-bold">A</span>
            </div>
            Все отзывы на Авито
          </a>
          <a
            href="https://yandex.ru/maps/org/kompyuternaya_laboratoriya/105118454033/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#FF6B00]/50 text-[#FF6B00] hover:bg-[#FF6B00]/10 hover:border-[#FF6B00] rounded-xl transition-all text-sm font-semibold"
          >
            <Icon name="MapPin" size={16} />
            Все отзывы на Яндекс
          </a>
        </div>
      </div>
    </section>
  );
};
