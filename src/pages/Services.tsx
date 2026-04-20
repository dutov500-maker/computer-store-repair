import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import funcUrls from '../../backend/func2url.json';

const SERVICES = [
  {
    id: 1,
    icon: 'Zap',
    category: 'СРОЧНЫЙ РЕМОНТ',
    title: 'Ремонт при вас',
    desc: 'Диагностика 0 ₽. Большинство работ выполняем в вашем присутствии — уходите с рабочей техникой.',
    price: 'от 500 ₽',
    tags: ['Диагностика бесплатно', 'Быстро', 'Гарантия'],
    accent: '#FF6B00',
  },
  {
    id: 2,
    icon: 'Thermometer',
    category: 'ТЕХНИЧЕСКОЕ ОБС.',
    title: 'Чистка и термопаста',
    desc: 'Только Honeywell PTM7950 и Laird. Снижаем температуру CPU/GPU на 10-25°C или возвращаем деньги.',
    price: 'от 1 500 ₽',
    tags: ['PTM7950', 'Laird', 'Гарантия результата'],
    accent: '#60a5fa',
  },
  {
    id: 3,
    icon: 'Cpu',
    category: 'АПГРЕЙД И СБОРКА',
    title: 'Модернизация ПК',
    desc: 'Честный Trade-in на старое железо. Кабель-менеджмент по линейке. Стресс-тест 4 часа после сборки.',
    price: 'от 2 000 ₽',
    tags: ['Trade-in', 'Кабель-менеджмент', 'Стресс-тест'],
    accent: '#c084fc',
  },
  {
    id: 4,
    icon: 'HardDrive',
    category: 'НОСИТЕЛИ ДАННЫХ',
    title: 'Восстановление данных',
    desc: 'Работаем с SSD, HDD, флешками. Оцениваем бесплатно — платите только за результат.',
    price: 'от 2 000 ₽',
    tags: ['SSD / HDD', 'Бесплатная оценка', 'Конфиденциально'],
    accent: '#4ade80',
  },
  {
    id: 5,
    icon: 'Monitor',
    category: 'ПРОГРАММЫ И ОС',
    title: 'Установка и настройка',
    desc: 'Windows, драйверы, офисный пакет, антивирус. Настраиваем под задачи — ничего лишнего.',
    price: 'от 800 ₽',
    tags: ['Windows 11', 'Драйверы', 'Быстро'],
    accent: '#fb923c',
  },
  {
    id: 6,
    icon: 'Wifi',
    category: 'СЕТИ И РОУТЕРЫ',
    title: 'Настройка Wi-Fi и LAN',
    desc: 'Настройка роутеров, создание домашней сети, устранение проблем со связью.',
    price: 'от 1 000 ₽',
    tags: ['Любые роутеры', 'Выезд', 'Быстро'],
    accent: '#34d399',
  },
];

const REVIEWS = [
  {
    platform: 'Авито',
    icon: 'Star',
    rating: '5.0',
    count: '200+',
    color: '#00AEEF',
    url: 'https://www.avito.ru/brands/i390049413',
    border: 'border-[#00AEEF]/30',
    bg: 'bg-[#00AEEF]/5',
    desc: 'Рейтинг 5.0 — более 200 довольных клиентов',
  },
  {
    platform: 'Яндекс.Карты',
    icon: 'MapPin',
    rating: '4.9',
    count: '50+',
    color: '#FF6B00',
    url: 'https://yandex.ru/maps/org/kompyuternaya_laboratoriya/105118454033/',
    border: 'border-[#FF6B00]/30',
    bg: 'bg-[#FF6B00]/5',
    desc: 'Реальные отзывы и фото наших работ',
  },
];

const Services = () => {
  const [callOpen, setCallOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [problem, setProblem] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error('Заполните имя и телефон');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: null,
          service_type: 'Вызов мастера',
          message: problem.trim() || 'Вызов мастера на дом',
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Заявка отправлена! Перезвоним в течение 15 минут');
        setName(''); setPhone(''); setProblem('');
        setCallOpen(false);
      } else {
        toast.error('Ошибка при отправке');
      }
    } catch {
      toast.error('Ошибка. Позвоните: +7 995 027 27 07');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen page-transition bg-[#0A0A0A] text-white">
      <Helmet>
        <title>Ремонт компьютеров в Волжском | K|LAB — Мастерская</title>
        <meta name="description" content="Ремонт компьютеров, ноутбуков, планшетов в Волжском. Диагностика 0₽. Гарантия 1 год. Вызов мастера на дом. ☎️ +7 995 027-27-07" />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/dc9369a4-8b65-4c6a-af45-d45456fefb80.jpg')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] to-[#0A0A0A]/60" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Services
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase leading-none">
              Мастерская
              <br />
              <span className="text-[#FF6B00]">K|LAB</span>
            </h1>
            <p className="text-white/60 text-lg mt-6 max-w-xl">
              Ремонт при вас. Диагностика бесплатно. Договор и гарантия 1 год на все работы.
            </p>
          </div>
        </div>
      </section>

      {/* 2 пути */}
      <section className="py-10 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setCallOpen(true)}
              className="group relative border-2 border-[#FF6B00] bg-[#FF6B00]/5 hover:bg-[#FF6B00]/15 p-8 text-left transition-all"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#FF6B00]" />
              <div className="w-14 h-14 bg-[#FF6B00] flex items-center justify-center mb-5">
                <Icon name="Home" size={26} className="text-black" />
              </div>
              <div className="font-heading text-2xl md:text-3xl font-black uppercase text-white mb-2">
                Вызвать мастера на дом
              </div>
              <div className="text-white/60">Приедем, диагностируем и отремонтируем. Без очередей.</div>
              <div className="flex items-center gap-2 mt-5 font-mono text-xs tracking-widest uppercase text-[#FF6B00]">
                Оставить заявку
                <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <a
              href="https://yandex.ru/maps/org/105118454033"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative border border-white/10 hover:border-[#FF6B00] bg-[#0D0D0D] p-8 text-left transition-all"
            >
              <div className="w-14 h-14 border border-[#FF6B00]/40 flex items-center justify-center mb-5 group-hover:bg-[#FF6B00] transition-all">
                <Icon name="MapPin" size={26} className="text-[#FF6B00] group-hover:text-black transition-colors" />
              </div>
              <div className="font-heading text-2xl md:text-3xl font-black uppercase text-white mb-2">
                Приехать в мастерскую
              </div>
              <div className="text-white/60 mb-2">Волжский, ул. Александрова, д. 24а</div>
              <div className="font-mono text-xs text-white/40 tracking-wider">
                Профессиональное оборудование · Стерильные условия
              </div>
              <div className="flex items-center gap-2 mt-5 font-mono text-xs tracking-widest uppercase text-[#FF6B00]">
                Маршрут
                <Icon name="ArrowUpRight" size={14} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Связь с мастером MAX */}
      <section className="py-8 border-b border-[#FF6B00]/20 bg-[#FF6B00]/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div>
              <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-1">
                // Связь с мастером MAX
              </div>
              <div className="font-heading text-xl font-black uppercase text-white">
                Ответим в течение 15 минут
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+79950272707"
                className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold text-xs tracking-widest uppercase px-6 py-4 transition-all">
                <Icon name="Phone" size={16} />
                +7 995 027-27-07
              </a>
              <a href="https://t.me/komplabvlz" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#229ED9] hover:bg-[#1a8ab8] text-white font-bold text-xs tracking-widest uppercase px-6 py-4 transition-all">
                <Icon name="Send" size={16} />
                Telegram
              </a>
              <a href="https://wa.me/79950272707" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1db354] text-white font-bold text-xs tracking-widest uppercase px-6 py-4 transition-all">
                <Icon name="MessageCircle" size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section className="py-20 container mx-auto px-6">
        <div className="mb-12">
          <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">// Услуги</div>
          <h2 className="font-heading text-4xl md:text-6xl font-black uppercase text-white leading-none">
            Что мы <span className="text-[#FF6B00]">делаем</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 mb-16">
          {SERVICES.map((s) => (
            <div key={s.id} className="group relative bg-[#0A0A0A] p-8 hover:bg-[#111] transition-all">
              <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: s.accent }} />
              <div className="flex items-start justify-between mb-6">
                <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">{s.category}</div>
                <div className="w-11 h-11 border flex items-center justify-center"
                  style={{ borderColor: `${s.accent}40` }}>
                  <Icon name={s.icon} size={20} style={{ color: s.accent }} />
                </div>
              </div>
              <div className="font-mono text-lg font-bold text-white mb-1 uppercase tracking-wider">{s.price}</div>
              <h3 className="font-heading text-2xl font-black uppercase text-white mb-3">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {s.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 bg-white/5 border border-white/10 text-white/50">
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setCallOpen(true)}
                className="w-full flex items-center justify-center gap-2 border font-mono text-xs tracking-widest uppercase py-3.5 transition-all hover:bg-[#FF6B00] hover:border-[#FF6B00] hover:text-black"
                style={{ borderColor: `${s.accent}60`, color: s.accent }}
              >
                <Icon name="Phone" size={12} />
                Вызвать мастера
              </button>
            </div>
          ))}
        </div>

        {/* Юридический блок */}
        <div className="border border-[#FF6B00]/30 bg-[#FF6B00]/5 p-8 md:p-12 mb-20">
          <div className="flex items-start gap-5 flex-wrap">
            <div className="w-14 h-14 bg-[#FF6B00] flex items-center justify-center shrink-0">
              <Icon name="FileText" size={26} className="text-black" />
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-2">// Официально</div>
              <h3 className="font-heading text-2xl md:text-3xl font-black uppercase text-white mb-3 leading-tight">
                Работаем по договору. Никаких рисков.
              </h3>
              <p className="text-white/70 leading-relaxed">
                Выдаём официальный договор на все виды работ, акт выполненных работ,
                гарантийный талон на <strong className="text-white">1 год</strong> и полный пакет документов.
                ИП Дутов Антоний Александрович, ИНН 501817855432, ОГРНИП 325344300038542.
              </p>
            </div>
          </div>
        </div>

        {/* Отзывы */}
        <div className="mb-20">
          <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">// Доверие</div>
          <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white mb-8">
            Нам <span className="text-[#FF6B00]">доверяют</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {REVIEWS.map((r) => (
              <a key={r.platform} href={r.url} target="_blank" rel="noopener noreferrer"
                className={`group border ${r.border} ${r.bg} p-8 hover:border-[#FF6B00]/60 transition-all`}>
                <div className="flex items-center gap-5 mb-4">
                  <div className="w-14 h-14 border flex items-center justify-center shrink-0"
                    style={{ borderColor: `${r.color}40`, backgroundColor: `${r.color}15` }}>
                    <Icon name={r.icon} size={26} style={{ color: r.color }} />
                  </div>
                  <div>
                    <div className="font-heading text-xl font-black uppercase text-white">{r.platform}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono font-bold" style={{ color: r.color }}>{r.rating} ★</span>
                      <span className="text-white/50 text-sm">{r.count} отзывов</span>
                    </div>
                  </div>
                  <Icon name="ArrowUpRight" size={20} className="ml-auto text-white/30 group-hover:text-[#FF6B00] transition-colors" />
                </div>
                <p className="text-white/60 text-sm">{r.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Карта + адрес */}
        <div>
          <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">// Мастерская</div>
          <h2 className="font-heading text-3xl md:text-4xl font-black uppercase text-white mb-8">
            Волжский, ул. Александрова, <span className="text-[#FF6B00]">д. 24а</span>
          </h2>
          <div className="grid lg:grid-cols-2 border border-white/10">
            <div className="p-10 bg-[#0D0D0D]">
              <div className="space-y-5">
                {[
                  { icon: 'MapPin', title: 'Волжский, ул. Александрова, д. 24а', sub: 'Компьютерная Лаборатория K|LAB' },
                  { icon: 'Clock', title: 'Пн-Пт 11:00 — 18:00', sub: 'Сб 11:00 — 16:00 · Вс выходной' },
                  { icon: 'Phone', title: '+7 995 027-27-07', sub: 'Приём по предварительной записи' },
                  { icon: 'Bus', title: 'Остановка «Александрова»', sub: 'Автобусы: 16, 123' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 border-l-2 border-[#FF6B00] pl-5">
                    <Icon name={item.icon} size={18} className="text-[#FF6B00] mt-0.5" />
                    <div>
                      <div className="font-heading font-bold text-white uppercase text-sm">{item.title}</div>
                      <div className="text-white/50 text-xs mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCallOpen(true)}
                className="mt-8 w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold text-xs tracking-widest uppercase py-5 transition-all"
              >
                <Icon name="Phone" size={14} />
                Вызвать мастера на дом
              </button>
            </div>
            <div className="relative min-h-[400px] bg-black">
              <iframe
                src="https://yandex.ru/map-widget/v1/?z=15&ol=biz&oid=105118454033"
                width="100%"
                height="100%"
                frameBorder="0"
                className="absolute inset-0 w-full h-full min-h-[400px] grayscale contrast-125"
                title="K|LAB — Волжский"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Диалог вызова мастера */}
      <Dialog open={callOpen} onOpenChange={setCallOpen}>
        <DialogContent className="max-w-md bg-[#0A0A0A] border-2 border-[#FF6B00]/40 text-white rounded-none">
          <DialogHeader>
            <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-2">// Вызов мастера</div>
            <DialogTitle className="font-heading text-2xl font-black uppercase text-white">
              Мастер на дом
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-[#FF6B00]/10 border border-[#FF6B00]/30">
              <Icon name="Clock" size={18} className="text-[#FF6B00] mt-0.5" />
              <div>
                <div className="font-bold text-sm text-white uppercase tracking-wider">Перезвон за 15 минут</div>
                <div className="text-xs text-white/60 mt-1">Диагностика и выезд по городу — бесплатно</div>
              </div>
            </div>
            <form onSubmit={handleCallSubmit} className="space-y-4">
              <div>
                <Label className="font-mono text-xs tracking-widest uppercase text-white/60">Имя *</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов" required
                  className="bg-[#0D0D0D] border-white/10 focus:border-[#FF6B00] rounded-none mt-2" />
              </div>
              <div>
                <Label className="font-mono text-xs tracking-widest uppercase text-white/60">Телефон *</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 999 123 45 67" required
                  className="bg-[#0D0D0D] border-white/10 focus:border-[#FF6B00] rounded-none mt-2" />
              </div>
              <div>
                <Label className="font-mono text-xs tracking-widest uppercase text-white/60">Проблема</Label>
                <Textarea value={problem} onChange={(e) => setProblem(e.target.value)}
                  placeholder="Опишите проблему: не включается, греется, шумит..." rows={3}
                  className="bg-[#0D0D0D] border-white/10 focus:border-[#FF6B00] rounded-none mt-2" />
              </div>
              <Button type="submit" disabled={submitting}
                className="w-full bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold tracking-widest uppercase rounded-none py-6">
                {submitting ? 'Отправка...' : 'Вызвать мастера'}
              </Button>
            </form>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a href="tel:+79950272707"
                className="flex items-center justify-center gap-2 border border-white/10 hover:border-[#FF6B00] py-3 text-white/70 hover:text-[#FF6B00] font-mono text-xs tracking-widest uppercase transition-all">
                <Icon name="Phone" size={12} />
                Позвонить напрямую
              </a>
              <a href="https://t.me/komplabvlz" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-white/10 hover:border-[#229ED9] py-3 text-white/70 hover:text-[#229ED9] font-mono text-xs tracking-widest uppercase transition-all">
                <Icon name="Send" size={12} />
                Написать в Telegram
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Services;
