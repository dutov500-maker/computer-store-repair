import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const KLabEditions = () => {
  const editions = [
    {
      name: 'ORANGE EDITION',
      tagline: 'Агрессия · Медь · Мощь',
      image: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/469abf18-af93-4471-9e4d-98debe89aa53.jpg',
      color: '#FF6B00',
      features: [
        'Оранжевая подсветка и акценты',
        'Медные теплотрубки премиум-класса',
        'Тонированное закалённое стекло',
        'Агрессивный визуальный характер',
      ],
    },
    {
      name: 'SNOW EDITION',
      tagline: 'Минимализм · Стерильность · Эстетика',
      image: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/57f7141b-b5ec-4ab8-8fc7-2d4cd5613a40.jpg',
      color: '#FFFFFF',
      features: [
        'Полностью белый корпус и компоненты',
        'Белые кабели с кастомной оплёткой',
        'Чистый скандинавский минимализм',
        'Идеален для студии и офиса',
      ],
    },
  ];

  return (
    <section id="editions" className="relative bg-[#050505] py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
            // Editions
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-black uppercase text-white leading-none">
            Флагманы <span className="text-[#FF6B00]">K|LAB</span>
          </h2>
          <p className="text-white/50 mt-6 max-w-xl mx-auto">
            Два характера. Два визуальных кода. Одинаковая инженерия.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {editions.map((ed) => (
            <div
              key={ed.name}
              className="group relative bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-[#FF6B00]/50 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={ed.image}
                  alt={ed.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
                <div className="absolute top-6 left-6 font-mono text-xs tracking-[0.3em] text-white/60 uppercase">
                  K|LAB // Edition
                </div>
              </div>

              <div className="p-10">
                <h3 className="font-heading text-3xl md:text-4xl font-black uppercase text-white mb-2">
                  {ed.name}
                </h3>
                <p className="font-mono text-xs tracking-[0.2em] uppercase mb-8" style={{ color: ed.color }}>
                  {ed.tagline}
                </p>

                <ul className="space-y-3 mb-10">
                  {ed.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-white/70">
                      <Icon name="Check" size={18} className="text-[#FF6B00] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="w-full border-2 border-white/20 hover:border-[#FF6B00] bg-transparent text-white hover:text-[#FF6B00] hover:bg-[#FF6B00]/5 font-bold tracking-wider uppercase rounded-none py-6"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Обсудить сборку
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 relative border border-[#FF6B00]/30 bg-[#FF6B00]/5 p-8 md:p-10 flex items-center gap-6 flex-wrap">
          <div className="w-14 h-14 bg-[#FF6B00] flex items-center justify-center shrink-0">
            <Icon name="AlertTriangle" size={26} className="text-black" />
          </div>
          <div className="flex-1 min-w-[250px]">
            <div className="font-heading text-xl md:text-2xl font-black uppercase text-white">
              Всего 4 индивидуальных проекта в месяц
            </div>
            <div className="text-white/60 mt-1">Качество важнее потока. Бронируйте слот заранее.</div>
          </div>
          <Button
            className="bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold tracking-wider uppercase rounded-none px-8 py-6"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Забронировать
          </Button>
        </div>
      </div>
    </section>
  );
};
