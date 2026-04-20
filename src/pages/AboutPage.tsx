import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';

const AboutPage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (slug !== 'about' && slug !== 'services') {
    return (
      <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
        <Header />
        <main className="flex-1 py-24 container mx-auto px-6 text-center">
          <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-4">// 404</div>
          <h2 className="font-heading text-4xl font-black uppercase text-white mb-2">
            Страница не найдена
          </h2>
          <p className="text-white/60">Запрашиваемая страница не существует</p>
        </main>
        <Footer />
      </div>
    );
  }

  const advantages = [
    { title: 'Опыт и экспертиза', desc: 'Более 10 лет на рынке, сотни довольных клиентов' },
    { title: 'Индивидуальный подход', desc: 'Подбираем конфигурацию под задачи и бюджет' },
    { title: 'Качественные комплектующие', desc: 'Только проверенные бренды и официальная гарантия' },
    { title: 'Прозрачность', desc: 'Полная детализация стоимости, без скрытых платежей' },
    { title: 'Техподдержка', desc: 'Консультируем и после покупки. До 5 лет гарантии' },
    { title: 'Инженерия', desc: 'Кабель-менеджмент, PTM7950, стресс-тесты' },
  ];

  const stats = [
    { num: '500+', label: 'Собранных ПК' },
    { num: '10', label: 'Лет на рынке' },
    { num: '4.9', label: 'Средний рейтинг' },
    { num: '5', label: 'Лет гарантии' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white page-transition">
      <Header />

      <section className="py-24 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // About K|LAB
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase leading-none">
              О <span className="text-[#FF6B00]">лаборатории</span>
            </h1>
            <p className="text-white/60 text-lg mt-6 max-w-xl leading-relaxed">
              Мы — команда инженеров и энтузиастов. Собираем персональные компьютеры премиум-класса
              в Волжском и по всей России. Делаем ПК как искусство.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-px bg-white/5 border border-white/5 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0A0A0A] p-8 text-center hover:bg-[#111] transition-all">
              <div className="font-heading text-5xl font-black text-[#FF6B00] mb-2">{s.num}</div>
              <div className="font-mono text-xs tracking-widest uppercase text-white/50">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="border border-white/10 bg-[#0D0D0D] p-10">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Миссия
            </div>
            <h2 className="font-heading text-3xl font-black uppercase text-white mb-5 leading-tight">
              Сделать <span className="text-[#FF6B00]">премиум</span> доступным
            </h2>
            <p className="text-white/70 leading-relaxed">
              Мы верим, что каждый заслуживает ПК, который соответствует его задачам и бюджету —
              без переплат и без компромиссов в качестве. Инженерия, а не маркетинг.
            </p>
          </div>

          <div className="border border-white/10 bg-[#0D0D0D] p-10">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Философия
            </div>
            <h2 className="font-heading text-3xl font-black uppercase text-white mb-5 leading-tight">
              Перфекционизм в <span className="text-[#FF6B00]">деталях</span>
            </h2>
            <p className="text-white/70 leading-relaxed">
              Кабели по линейке. Термопаста Honeywell PTM7950. Стресс-тесты 4 часа.
              20 этапов проверки компонентов. Мы делаем меньше — но качественнее.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-10">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Почему мы
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white">
              Наши <span className="text-[#FF6B00]">преимущества</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {advantages.map((a, i) => (
              <div key={a.title} className="bg-[#0A0A0A] p-8 hover:bg-[#111] transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs tracking-widest text-[#FF6B00]/60">
                    0{i + 1}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                  <Icon name="Check" size={16} className="text-[#FF6B00]" />
                </div>
                <h3 className="font-heading text-xl font-black uppercase text-white mb-3">
                  {a.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
