import Icon from '@/components/ui/icon';

export const KLabTrust = () => {
  return (
    <section className="relative bg-[#050505] py-32 border-t border-white/5 overflow-hidden">
      <div
        className="absolute right-0 top-0 w-1/2 h-full opacity-20"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/dc9369a4-8b65-4c6a-af45-d45456fefb80.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-r from-[#050505] to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-3xl">
          <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
            // Founder
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-black uppercase text-white leading-none mb-12">
            Антоний Дутов<span className="text-[#FF6B00]">.</span>
            <br />
            Основатель KLAB
          </h2>

          <div className="relative border-l-4 border-[#FF6B00] pl-8 py-4">
            <Icon name="Quote" size={32} className="text-[#FF6B00] mb-4" />
            <blockquote className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight">
              Я лично отвечаю за каждый винтик в вашей сборке. Моя цель — чтобы вы забыли
              о проблемах с железом на <span className="text-[#FF6B00]">3 года</span>.
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8A2E] flex items-center justify-center font-heading font-black text-black text-xl">
                АД
              </div>
              <div>
                <div className="font-heading font-black text-white uppercase">Антоний Дутов</div>
                <div className="text-white/50 text-sm font-mono tracking-wider uppercase">
                  Founder · Lead Engineer
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'Wrench', label: '10+ лет опыта' },
              { icon: 'Cpu', label: '500+ сборок' },
              { icon: 'Star', label: '100% 5-star' },
              { icon: 'Globe', label: 'Доставка РФ' },
            ].map((x) => (
              <div
                key={x.label}
                className="border border-white/10 bg-[#0A0A0A]/80 backdrop-blur p-5 flex items-center gap-3"
              >
                <Icon name={x.icon} size={20} className="text-[#FF6B00]" />
                <span className="font-mono text-xs tracking-widest uppercase text-white/80">
                  {x.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};