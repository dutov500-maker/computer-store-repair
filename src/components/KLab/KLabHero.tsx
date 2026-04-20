import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const KLabHero = () => {
  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-[#0A0A0A] flex items-center">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/dc9369a4-8b65-4c6a-af45-d45456fefb80.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/60" />

      <div className="absolute top-0 left-0 w-1 h-24 bg-[#FF6B00]" />
      <div className="absolute bottom-0 right-0 w-24 h-1 bg-[#FF6B00]" />

      <div className="container relative z-10 mx-auto px-6 py-32">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-8 border border-[#FF6B00]/40 bg-[#FF6B00]/5 px-4 py-2">
            <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse" />
            <span className="text-xs font-mono tracking-[0.3em] text-[#FF6B00] uppercase">
              K|LAB · Custom PC Atelier
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95] animate-fade-in-up">
            Инженерный
            <br />
            <span className="text-[#FF6B00]">перфекционизм</span>
            <br />
            в каждой сборке
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed animate-fade-in-up">
            Создаем компьютеры как искусство. Кастомные решения для игр и работы.
            <br className="hidden md:block" />
            <span className="text-white/50 font-mono text-sm tracking-widest mt-3 block">
              ВОЛЖСКИЙ · МОСКВА · ВЕСЬ МИР
            </span>
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
            <Button
              size="lg"
              className="bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold text-base tracking-wider uppercase px-10 py-7 rounded-none border-2 border-[#FF6B00] shadow-[0_0_40px_rgba(255,107,0,0.3)] hover:shadow-[0_0_60px_rgba(255,107,0,0.6)] transition-all"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Записаться на консультацию
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/20 hover:border-[#FF6B00] bg-transparent text-white hover:text-[#FF6B00] font-bold text-base tracking-wider uppercase px-10 py-7 rounded-none"
              onClick={() => window.location.href = '/catalog'}
            >
              Смотреть каталог
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl border-t border-white/10 pt-10">
            {[
              { num: '4', label: 'Проекта в месяц' },
              { num: '5', label: 'Лет гарантии' },
              { num: '20', label: 'Этапов проверки' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-heading font-black text-[#FF6B00]">
                  {s.num}
                </div>
                <div className="text-xs font-mono tracking-widest text-white/50 uppercase mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};