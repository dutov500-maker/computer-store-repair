import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const KLabTradeIn = () => {
  const steps = [
    { icon: 'Camera', title: 'Фото вашего ПК', text: 'Присылаете фото в Telegram или WhatsApp' },
    { icon: 'Calculator', title: 'Оценка за 15 минут', text: 'Даём честную рыночную цену' },
    { icon: 'Repeat', title: 'Зачёт в новый проект', text: 'Сумма уходит в оплату новой сборки' },
  ];

  const guarantees = [
    { icon: 'Award', title: '1 год', text: 'Гарантия от лаборатории K|LAB' },
    { icon: 'BadgeCheck', title: 'до 5 лет', text: 'Гарантия от производителей' },
    { icon: 'Wrench', title: 'ТО в подарок', text: '1 год бесплатного обслуживания' },
  ];

  return (
    <section className="relative bg-[#0A0A0A] py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Trade-in
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase text-white leading-none">
              Ваш старый ПК —
              <br />
              <span className="text-[#FF6B00]">это деньги</span>
            </h2>
            <p className="text-white/60 text-lg mt-6 max-w-xl leading-relaxed">
              Оценим ваш компьютер за 15 минут и зачтем его стоимость в новый проект.
              Без очередей, без занижения цены.
            </p>

            <div className="mt-12 space-y-1">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className="flex items-center gap-6 border-l-2 border-[#FF6B00] bg-white/[0.02] hover:bg-white/[0.04] transition-all p-6"
                >
                  <div className="font-heading text-4xl font-black text-[#FF6B00]/40 shrink-0 w-10">
                    0{i + 1}
                  </div>
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center shrink-0">
                    <Icon name={s.icon} size={20} className="text-[#FF6B00]" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white uppercase">{s.title}</div>
                    <div className="text-white/50 text-sm mt-1">{s.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="mt-10 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold tracking-wider uppercase rounded-none px-10 py-7"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Send" size={18} className="mr-2" />
              Отправить на оценку
            </Button>
          </div>

          <div className="sticky top-24">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Гарантия
            </div>
            <h3 className="font-heading text-3xl md:text-4xl font-black uppercase text-white leading-tight mb-10">
              Забудьте о железе на <span className="text-[#FF6B00]">5 лет</span>
            </h3>

            <div className="space-y-6">
              {guarantees.map((g) => (
                <div
                  key={g.title}
                  className="border border-white/10 bg-[#0D0D0D] p-8 hover:border-[#FF6B00]/50 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 border-2 border-[#FF6B00] flex items-center justify-center group-hover:bg-[#FF6B00] transition-all">
                      <Icon
                        name={g.icon}
                        size={28}
                        className="text-[#FF6B00] group-hover:text-black transition-colors"
                      />
                    </div>
                    <div>
                      <div className="font-heading text-3xl font-black uppercase text-white">
                        {g.title}
                      </div>
                      <div className="text-white/60 mt-1">{g.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
