import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';

const contactInfo = [
  { icon: 'MapPin', label: 'Адрес', value: 'Волжский, ул. Александрова, 24а', sub: 'K|LAB — Custom PC Atelier' },
  { icon: 'Phone', label: 'Телефон', value: '+7 995 027-27-07', sub: 'Пн-Пт: 11:00 — 18:00' },
  { icon: 'Mail', label: 'E-mail', value: 'dutov.off@yandex.ru', sub: 'Ответ в течение часа' },
  { icon: 'Clock', label: 'График', value: 'Пн-Пт 11-18 · Сб 11-16', sub: 'Вс — выходной' },
];

const channels = [
  { icon: 'Send', name: 'Telegram', handle: '@komplabvlz', url: 'https://t.me/komplabvlz', bg: '#229ED9' },
  { icon: 'MessageCircle', name: 'Мессенджер MAX', handle: 'Написать MAX', url: 'https://max.ru/u/f9LHodD0cOIA6d075Cod-oEXOD45O0dMe4dxvcb69ZiIjPWreMI9fiLCoVg', bg: '#FF6B00' },
  { icon: 'Phone', name: 'Звонок', handle: '+7 995 027-27-07', url: 'tel:+79950272707', bg: '#333' },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white page-transition">
      <Header />

      <section className="relative py-24 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Contact
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase leading-none">
              Свяжитесь
              <br />
              с <span className="text-[#FF6B00]">лабораторией</span>
            </h1>
            <p className="text-white/60 text-lg mt-6 max-w-xl">
              Ответим на любые вопросы по сборке, обсудим проект, подберём комплектующие.
              Выбирайте любой удобный канал.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {channels.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target={c.url.startsWith('http') ? '_blank' : undefined}
              rel={c.url.startsWith('http') ? 'noreferrer' : undefined}
              className="group relative bg-[#0D0D0D] border-2 border-white/10 hover:border-[#FF6B00] p-8 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 flex items-center justify-center shrink-0" style={{ backgroundColor: c.bg }}>
                  <Icon name={c.icon} size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-heading text-xl font-black uppercase text-white">{c.name}</div>
                  <div className="font-mono text-xs text-white/50 tracking-wider mt-1">{c.handle}</div>
                </div>
                <Icon name="ArrowUpRight" size={20} className="ml-auto text-white/30 group-hover:text-[#FF6B00]" />
              </div>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 mb-16">
          {contactInfo.map((it) => (
            <div key={it.label} className="bg-[#0A0A0A] p-8 hover:bg-[#111] transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border border-[#FF6B00]/40 flex items-center justify-center group-hover:bg-[#FF6B00] transition-all shrink-0">
                  <Icon name={it.icon} size={20} className="text-[#FF6B00] group-hover:text-black transition-colors" />
                </div>
                <div>
                  <div className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase mb-2">
                    {it.label}
                  </div>
                  <div className="font-heading text-lg font-black text-white uppercase">{it.value}</div>
                  <div className="text-white/50 text-sm mt-1">{it.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 border border-white/10">
          <div className="p-10 md:p-12 bg-[#0D0D0D]">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Как добраться
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-black uppercase text-white mb-10">
              Заезжайте
              <br />в <span className="text-[#FF6B00]">лабораторию</span>
            </h2>

            <div className="space-y-6">
              {[
                { icon: 'MapPin', title: 'Волжский, ул. Александрова, 24а', sub: 'Приём по предварительной записи' },
                { icon: 'Bus', title: 'Остановка «Александрова»', sub: 'Автобусы: 16, 123' },
                { icon: 'Car', title: 'Бесплатная парковка', sub: 'Перед зданием лаборатории' },
              ].map((r) => (
                <div key={r.title} className="flex items-start gap-4 border-l-2 border-[#FF6B00] pl-5">
                  <Icon name={r.icon} size={20} className="text-[#FF6B00] mt-1" />
                  <div>
                    <div className="font-heading font-bold text-white uppercase">{r.title}</div>
                    <div className="text-white/50 text-sm mt-1">{r.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[400px] bg-black">
            <iframe
              src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=105118454033"
              width="100%"
              height="100%"
              frameBorder="0"
              className="absolute inset-0 w-full h-full min-h-[400px] grayscale contrast-125"
              title="Яндекс Карта — K|LAB"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;