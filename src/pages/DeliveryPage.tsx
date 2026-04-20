import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const delivery = [
  {
    icon: 'Home',
    title: 'Самовывоз из лаборатории',
    price: 'Бесплатно',
    desc: 'Забираете готовый ПК сами. Проведём тестирование при вас и покажем работу системы.',
    note: 'Пн-Пт 10:00-20:00 · Сб 11:00-18:00',
  },
  {
    icon: 'MapPin',
    title: 'Доставка по Волжскому',
    price: 'от 500 ₽',
    desc: 'Курьером по любому адресу. Поможем с подключением и первым запуском.',
    note: 'В день готовности или на следующий день',
  },
  {
    icon: 'Package',
    title: 'Отправка по России',
    price: 'от 1000 ₽',
    desc: 'СДЭК, Boxberry, Почта России. Надёжная упаковка и страхование груза.',
    note: 'Срок 3-7 дней в зависимости от региона',
  },
];

const payments = [
  { icon: 'Wallet', title: 'Наличными', desc: 'Курьеру при доставке или в офисе. Выдаём кассовый чек.' },
  { icon: 'CreditCard', title: 'Картой', desc: 'Visa, MasterCard, МИР. Онлайн или через терминал.' },
  { icon: 'Building', title: 'Безнал', desc: 'Для юрлиц и ИП. Все закрывающие документы.' },
  { icon: 'Percent', title: 'Рассрочка 0%', desc: 'На 3-6 месяцев от банков-партнёров. Оформление за 5 минут.' },
];

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white page-transition">
      <Header />

      <section className="py-24 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Delivery & Payment
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase leading-none">
              Доставка
              <br />
              и <span className="text-[#FF6B00]">оплата</span>
            </h1>
            <p className="text-white/60 text-lg mt-6 max-w-xl">
              Удобные способы получения заказа и гибкие варианты оплаты,
              включая рассрочку 0%.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="mb-16">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
                // Доставка
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white">
                Как <span className="text-[#FF6B00]">получить</span> ПК
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {delivery.map((d) => (
              <div key={d.title} className="bg-[#0A0A0A] p-10 hover:bg-[#111] transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 border border-[#FF6B00]/40 flex items-center justify-center group-hover:bg-[#FF6B00] transition-all">
                    <Icon name={d.icon} size={22} className="text-[#FF6B00] group-hover:text-black" />
                  </div>
                  <span className="font-mono text-sm text-[#FF6B00] font-bold tracking-wider">
                    {d.price}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-black uppercase text-white mb-3">
                  {d.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{d.desc}</p>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40 tracking-wider border-t border-white/10 pt-4">
                  <Icon name="Clock" size={12} />
                  {d.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-10">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Оплата
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white">
              Способы <span className="text-[#FF6B00]">оплаты</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {payments.map((p) => (
              <div key={p.title} className="bg-[#0A0A0A] p-8 flex items-start gap-5 hover:bg-[#111] transition-all">
                <div className="w-12 h-12 border border-[#FF6B00]/40 flex items-center justify-center shrink-0">
                  <Icon name={p.icon} size={20} className="text-[#FF6B00]" />
                </div>
                <div>
                  <div className="font-heading text-xl font-black uppercase text-white mb-2">
                    {p.title}
                  </div>
                  <p className="text-white/60 text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[#FF6B00]/30 bg-[#FF6B00]/5 p-10 md:p-14 text-center">
          <h3 className="font-heading text-3xl md:text-4xl font-black uppercase text-white mb-4">
            Готовы <span className="text-[#FF6B00]">оформить заказ?</span>
          </h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Выберите ПК в каталоге или свяжитесь с нами для индивидуальной сборки.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold tracking-widest uppercase px-10 py-5 text-sm"
            >
              <Icon name="LayoutGrid" size={16} />
              В каталог
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-[#FF6B00] text-white hover:text-[#FF6B00] font-bold tracking-widest uppercase px-10 py-5 text-sm"
            >
              <Icon name="Phone" size={16} />
              Связаться
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
