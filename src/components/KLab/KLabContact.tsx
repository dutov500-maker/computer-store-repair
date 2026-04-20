import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const KLabContact = () => {
  return (
    <section id="contact" className="relative bg-[#0A0A0A] py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
            // Забронировать слот
          </div>
          <h2 className="font-heading text-4xl md:text-7xl font-black uppercase text-white leading-none">
            Готовы собрать <span className="text-[#FF6B00]">свой K|LAB?</span>
          </h2>
          <p className="text-white/60 text-lg mt-6 max-w-xl mx-auto">
            Напишите в удобный мессенджер. Ответим в течение 15 минут и обсудим ваш проект.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <a
            href="https://t.me/klab_pc"
            target="_blank"
            rel="noreferrer"
            className="group relative bg-[#0D0D0D] border-2 border-white/10 hover:border-[#FF6B00] p-10 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/0 to-[#FF6B00]/0 group-hover:from-[#FF6B00]/10 group-hover:to-transparent transition-all" />
            <div className="relative flex items-center gap-6">
              <div className="w-16 h-16 bg-[#229ED9] flex items-center justify-center shrink-0">
                <Icon name="Send" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-heading text-2xl font-black uppercase text-white">Telegram</div>
                <div className="text-white/50 font-mono text-sm tracking-wider mt-1">@klab_pc</div>
              </div>
              <Icon
                name="ArrowUpRight"
                size={24}
                className="ml-auto text-white/30 group-hover:text-[#FF6B00] transition-colors"
              />
            </div>
          </a>

          <a
            href="https://wa.me/79000000000"
            target="_blank"
            rel="noreferrer"
            className="group relative bg-[#0D0D0D] border-2 border-white/10 hover:border-[#FF6B00] p-10 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/0 to-[#FF6B00]/0 group-hover:from-[#FF6B00]/10 group-hover:to-transparent transition-all" />
            <div className="relative flex items-center gap-6">
              <div className="w-16 h-16 bg-[#25D366] flex items-center justify-center shrink-0">
                <Icon name="MessageCircle" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-heading text-2xl font-black uppercase text-white">WhatsApp</div>
                <div className="text-white/50 font-mono text-sm tracking-wider mt-1">+7 900 000-00-00</div>
              </div>
              <Icon
                name="ArrowUpRight"
                size={24}
                className="ml-auto text-white/30 group-hover:text-[#FF6B00] transition-colors"
              />
            </div>
          </a>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="border border-white/10 bg-[#0D0D0D] p-8 md:p-10 flex items-center gap-6 flex-wrap">
            <div className="w-14 h-14 border-2 border-[#FF6B00] flex items-center justify-center shrink-0">
              <Icon name="MapPin" size={24} className="text-[#FF6B00]" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-[#FF6B00] font-mono text-xs tracking-[0.3em] uppercase mb-1">
                // Атéлье
              </div>
              <div className="font-heading text-xl md:text-2xl font-black uppercase text-white">
                Волжский, ул. Александрова
              </div>
              <div className="text-white/50 mt-1">Приём по предварительной записи</div>
            </div>
            <Button
              variant="outline"
              className="border-2 border-white/20 hover:border-[#FF6B00] bg-transparent text-white hover:text-[#FF6B00] font-bold tracking-wider uppercase rounded-none px-6 py-5"
            >
              Построить маршрут
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
