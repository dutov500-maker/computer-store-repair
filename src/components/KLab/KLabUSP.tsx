import Icon from '@/components/ui/icon';

const items = [
  {
    num: '01',
    icon: 'Cable',
    title: 'Религия кабель-менеджмента',
    text: 'Идеальный порядок внутри — залог тишины и долговечности. Укладываем кабели по линейке.',
  },
  {
    num: '02',
    icon: 'ShieldCheck',
    title: 'Ядро надежности',
    text: 'Только новые комплектующие. Б/у видеокарты проходят 20 этапов проверки и 4-часовые стресс-тесты.',
  },
  {
    num: '03',
    icon: 'Thermometer',
    title: 'Технологии охлаждения',
    text: 'Используем фазовый переход Honeywell PTM7950. Температуры ниже, срок службы — дольше.',
  },
];

export const KLabUSP = () => {
  return (
    <section className="relative bg-[#0A0A0A] py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
          <div>
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Почему K|LAB
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase text-white leading-none max-w-2xl">
              Три принципа,
              <br />
              на которых стоит <span className="text-[#FF6B00]">лаборатория</span>
            </h2>
          </div>
          <div className="h-px flex-1 bg-white/10 hidden md:block mb-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {items.map((it) => (
            <div
              key={it.num}
              className="group relative bg-[#0A0A0A] p-10 md:p-12 hover:bg-[#111] transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-0 h-1 bg-[#FF6B00] group-hover:w-full transition-all duration-500" />

              <div className="flex items-start justify-between mb-10">
                <span className="font-mono text-xs tracking-[0.3em] text-white/30">
                  {it.num} / 03
                </span>
                <div className="w-14 h-14 border border-[#FF6B00]/40 flex items-center justify-center group-hover:bg-[#FF6B00] transition-all">
                  <Icon
                    name={it.icon}
                    size={24}
                    className="text-[#FF6B00] group-hover:text-black transition-colors"
                  />
                </div>
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-black uppercase text-white mb-5 leading-tight">
                {it.title}
              </h3>

              <p className="text-white/60 leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
