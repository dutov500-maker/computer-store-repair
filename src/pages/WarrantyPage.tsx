import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const componentWarranty = [
  { name: 'Процессоры', term: '1-3 года' },
  { name: 'Видеокарты', term: '2-3 года' },
  { name: 'Материнские платы', term: '3 года' },
  { name: 'Оперативная память', term: 'Пожизненная' },
  { name: 'Накопители SSD/HDD', term: '3-5 лет' },
  { name: 'Блоки питания', term: '3-10 лет' },
  { name: 'Корпуса', term: '1-2 года' },
];

const covered = [
  'Неисправности по вине некачественной сборки',
  'Проблемы совместимости компонентов',
  'Производственный брак комплектующих',
  'Сбои системы охлаждения по вине монтажа',
];

const notCovered = [
  'Механические повреждения после передачи',
  'Повреждения от жидкости',
  'Последствия разгона и модификаций',
  'Вмешательство сторонних лиц',
];

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white page-transition">
      <Header />

      <section className="py-24 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Warranty
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase leading-none">
              Гарантия
              <br />
              <span className="text-[#FF6B00]">K|LAB</span>
            </h1>
            <p className="text-white/60 text-lg mt-6 max-w-xl">
              Мы отвечаем за каждую сборку. До 5 лет гарантии от производителей
              + 1 год от лаборатории + 1 год бесплатного ТО.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 mb-16">
          {[
            { num: '01', icon: 'Shield', title: '1 год', sub: 'Гарантия от лаборатории' },
            { num: '02', icon: 'Award', title: 'до 5 лет', sub: 'От производителей' },
            { num: '03', icon: 'Wrench', title: '1 год ТО', sub: 'Бесплатное обслуживание' },
          ].map((it) => (
            <div key={it.num} className="bg-[#0A0A0A] p-10">
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs tracking-widest text-white/30">{it.num} / 03</span>
                <div className="w-12 h-12 border border-[#FF6B00]/40 flex items-center justify-center">
                  <Icon name={it.icon} size={22} className="text-[#FF6B00]" />
                </div>
              </div>
              <div className="font-heading text-4xl font-black uppercase text-[#FF6B00] mb-2">{it.title}</div>
              <div className="text-white/60">{it.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="border border-white/10 bg-[#0D0D0D] p-10">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Компоненты
            </div>
            <h2 className="font-heading text-3xl font-black uppercase text-white mb-8">
              Гарантия на железо
            </h2>
            <div className="space-y-2">
              {componentWarranty.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between p-4 border-l-2 border-[#FF6B00] bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                >
                  <span className="text-white/80">{c.name}</span>
                  <span className="font-mono text-sm font-bold text-[#FF6B00] tracking-wider">
                    {c.term}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs font-mono text-white/40 mt-6 tracking-wider">
              * С официальными гарантийными талонами
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-[#FF6B00]/30 bg-[#FF6B00]/5 p-10">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="CheckCircle2" size={24} className="text-[#FF6B00]" />
                <h3 className="font-heading text-2xl font-black uppercase text-white">
                  Покрывается
                </h3>
              </div>
              <ul className="space-y-3">
                {covered.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-white/70">
                    <Icon name="Check" size={18} className="text-[#FF6B00] mt-1 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/10 bg-[#0D0D0D] p-10">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="AlertTriangle" size={24} className="text-white/60" />
                <h3 className="font-heading text-2xl font-black uppercase text-white/80">
                  Не покрывается
                </h3>
              </div>
              <ul className="space-y-3">
                {notCovered.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-white/50">
                    <Icon name="X" size={18} className="text-white/40 mt-1 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border border-white/10 bg-[#0D0D0D] p-10 md:p-14 text-center">
          <h3 className="font-heading text-3xl md:text-4xl font-black uppercase text-white mb-4">
            Есть вопросы <span className="text-[#FF6B00]">по гарантии?</span>
          </h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Свяжитесь с нами — расскажем всё подробно и поможем оформить обращение.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold tracking-widest uppercase px-10 py-5 text-sm"
          >
            <Icon name="Phone" size={16} />
            Связаться
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
