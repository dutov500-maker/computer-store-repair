import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import StickyHelpButton from '@/components/StickyHelpButton';
import { CatalogCases } from '@/components/Catalog/CatalogCases';
import { CATALOG_DATA } from '@/data/catalog';

interface CatalogItem {
  id: number;
  title: string;
  description: string;
  price: number;
  resolution: string;
  category: string;
  brand: 'AMD' | 'Intel';
  image_url: string;
  tags?: string[];
  signature?: 'orange' | 'snow' | 'obsidian' | 'glacier';
  outOfStock?: boolean;
  specs: { cpu: string; gpu: string; ram: string; storage: string; cooling?: string };
}

const STATIC_CATALOG = (CATALOG_DATA as (CatalogItem & { hidden?: boolean })[]).filter(item => !item.hidden);

const CATEGORY_META: Record<string, { label: string; accent: string; border: string; bg: string; price: string }> = {
  ECO:     { label: 'ECO',     accent: '#4ade80', border: 'border-green-500/40',  bg: 'bg-green-500/10',  price: '95К' },
  SPECIAL: { label: 'SPECIAL', accent: '#60a5fa', border: 'border-blue-500/40',   bg: 'bg-blue-500/10',   price: '115-159К' },
  PREMIUM: { label: 'PREMIUM', accent: '#c084fc', border: 'border-purple-500/40', bg: 'bg-purple-500/10', price: '160-195К' },
  ULTRA:   { label: 'ULTRA',   accent: '#FF6B00', border: 'border-[#FF6B00]/50',  bg: 'bg-[#FF6B00]/10',  price: '209-290К' },
  ELITE:   { label: 'ELITE',   accent: '#f87171', border: 'border-red-500/40',    bg: 'bg-red-500/10',    price: '320-345К' },
};

const SIGNATURE_META: Record<string, { label: string; accent: string; border: string; bg: string }> = {
  orange:   { label: 'ORANGE EDITION',   accent: '#FF6B00', border: 'border-[#FF6B00]',   bg: 'bg-[#FF6B00]/10' },
  snow:     { label: 'SNOW EDITION',     accent: '#f8fafc', border: 'border-white/70',    bg: 'bg-white/10' },
  obsidian: { label: 'OBSIDIAN',         accent: '#ef4444', border: 'border-red-500/70',  bg: 'bg-red-500/10' },
  glacier:  { label: 'GLACIER',          accent: '#7dd3fc', border: 'border-sky-300/70',  bg: 'bg-sky-300/10' },
};

type SortMode = 'default' | 'price-asc' | 'price-desc';

const Catalog = () => {
  const [catalog] = useState<CatalogItem[]>(STATIC_CATALOG);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [activeBrand, setActiveBrand] = useState<'ALL' | 'AMD' | 'Intel'>('ALL');
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const [consultPC, setConsultPC] = useState<CatalogItem | null>(null);
  const [consultOpen, setConsultOpen] = useState(false);

  const seoTitle = 'Купить компьютер в Волжском — Готовые игровые ПК | K|LAB';
  const seoDescription = 'Купить готовый игровой компьютер в Волжском. Сборки от 95 000₽. Новые комплектующие, гарантия до 3 лет. ☎️ +7 (995) 027-27-07';

  const filters = [
    { id: 'ALL',     label: 'Все',     count: catalog.length },
    { id: 'ECO',     label: 'Eco',     count: catalog.filter(pc => pc.category === 'ECO').length,     price: '95К' },
    { id: 'SPECIAL', label: 'Special', count: catalog.filter(pc => pc.category === 'SPECIAL').length, price: '115-159К' },
    { id: 'PREMIUM', label: 'Premium', count: catalog.filter(pc => pc.category === 'PREMIUM').length, price: '160-195К' },
    { id: 'ULTRA',   label: 'Ultra',   count: catalog.filter(pc => pc.category === 'ULTRA').length,   price: '209-290К' },
    { id: 'ELITE',   label: 'Elite',   count: catalog.filter(pc => pc.category === 'ELITE').length,   price: '320-345К' },
  ];

  const brandFilters = [
    { id: 'ALL' as const,   label: 'Все', count: catalog.length },
    { id: 'AMD' as const,   label: 'AMD', count: catalog.filter(pc => pc.brand === 'AMD').length },
    { id: 'Intel' as const, label: 'Intel', count: catalog.filter(pc => pc.brand === 'Intel').length },
  ];

  const filteredCatalog = useMemo(() => {
    let result = activeFilter === 'ALL'
      ? catalog
      : catalog.filter(pc => pc.category === activeFilter);

    if (activeBrand !== 'ALL') {
      result = result.filter(pc => pc.brand === activeBrand);
    }

    if (sortMode === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortMode === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [catalog, activeFilter, activeBrand, sortMode]);

  const openConsult = (e: React.MouseEvent, pc: CatalogItem) => {
    e.preventDefault();
    e.stopPropagation();
    setConsultPC(pc);
    setConsultOpen(true);
  };

  const meta = (category: string) => CATEGORY_META[category] ?? CATEGORY_META['ULTRA'];

  return (
    <div className="min-h-screen page-transition bg-[#0A0A0A] text-white">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href="https://комплаб.рф/catalog" />
      </Helmet>

      <Header />
      <StickyHelpButton />

      {/* Hero */}
      <section className="py-24 md:py-28 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Catalog
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase leading-none">
              Каталог
              <br />
              <span className="text-[#FF6B00]">сборок K|LAB</span>
            </h1>
            <p className="text-white/60 text-lg mt-6 max-w-xl">
              Готовые конфигурации с гарантией 1 год и бесплатным ТО.
              Каждая сборка прошла 4-часовой стресс-тест.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-6">

        {/* Trade-in баннер */}
        <div className="mb-10 border border-[#FF6B00]/30 bg-[#FF6B00]/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FF6B00] flex items-center justify-center shrink-0">
              <Icon name="ArrowLeftRight" size={22} className="text-black" />
            </div>
            <div>
              <div className="font-heading font-black uppercase text-white">Trade-in — сдай старое, получи скидку</div>
              <div className="text-white/60 text-sm">Обменяем твой старый ПК на скидку до 30 000 ₽</div>
            </div>
          </div>
          <a
            href="https://t.me/komplabvlz?text=Привет!%20Хочу%20узнать%20про%20Trade-in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold text-xs tracking-widest uppercase px-6 py-3 whitespace-nowrap shrink-0"
          >
            <Icon name="Send" size={14} />
            Узнать стоимость
          </a>
        </div>

        <CatalogCases />

        {/* Sticky filters */}
        <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md py-4 -mx-6 px-6 border-b border-white/5 mb-10 space-y-3">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex items-center gap-2 px-4 py-2.5 border font-mono text-xs tracking-widest uppercase transition-all ${
                  activeFilter === f.id
                    ? 'bg-[#FF6B00] border-[#FF6B00] text-black font-bold'
                    : 'border-white/10 text-white/60 hover:border-[#FF6B00]/60 hover:text-white'
                }`}
              >
                <span>{f.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 ${activeFilter === f.id ? 'bg-black/20 text-black' : 'bg-white/10'}`}>
                  {f.count}
                </span>
                {'price' in f && (
                  <span className="hidden sm:inline opacity-60">{f.price}</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {brandFilters.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBrand(b.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 border font-mono text-[10px] tracking-widest uppercase transition-all ${
                    activeBrand === b.id
                      ? 'bg-white text-black border-white font-bold'
                      : 'border-white/10 text-white/50 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {b.id !== 'ALL' && <Icon name="Cpu" size={11} />}
                  <span>{b.label}</span>
                  <span className={`text-[9px] px-1 ${activeBrand === b.id ? 'bg-black/20' : 'bg-white/10'}`}>
                    {b.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {[
                { id: 'default' as const, label: 'По умолчанию', icon: 'ListFilter' },
                { id: 'price-asc' as const, label: 'Цена ↑', icon: 'ArrowUp' },
                { id: 'price-desc' as const, label: 'Цена ↓', icon: 'ArrowDown' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortMode(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 border font-mono text-[10px] tracking-widest uppercase transition-all ${
                    sortMode === s.id
                      ? 'bg-[#FF6B00] border-[#FF6B00] text-black font-bold'
                      : 'border-white/10 text-white/50 hover:border-[#FF6B00]/60 hover:text-white'
                  }`}
                >
                  <Icon name={s.icon} size={11} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCatalog.map((pc) => {
            const cm = meta(pc.category);
            const sig = pc.signature ? SIGNATURE_META[pc.signature] : null;
            const accent = sig?.accent ?? cm.accent;
            const border = sig?.border ?? cm.border;
            const bg = sig?.bg ?? cm.bg;

            return (
              <Link key={pc.id} to={`/pc/${pc.id}`} className="block group">
                <div className={`relative h-full flex flex-col bg-[#0D0D0D] border ${border} ${sig ? 'border-2' : ''} hover:border-[#FF6B00] transition-all duration-500 overflow-hidden ${pc.outOfStock ? 'opacity-70' : ''}`}>

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, opacity: 0.7 }} />

                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={pc.image_url}
                      alt={pc.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${pc.outOfStock ? 'grayscale' : 'group-hover:scale-105'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />

                    {pc.outOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="font-mono text-xs tracking-[0.2em] uppercase px-4 py-2 bg-black/80 border border-white/30 text-white/80 font-bold">
                          Временно нет в наличии
                        </span>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2 max-w-[80%]">
                      {sig && (
                        <span className={`font-mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 ${sig.bg} border ${sig.border} font-bold`}
                          style={{ color: sig.accent }}>
                          {sig.label}
                        </span>
                      )}
                      <span className={`font-mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 ${bg} border ${border}`}
                        style={{ color: accent }}>
                        {cm.label}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 bg-black/60 backdrop-blur border border-white/20 text-white/80">
                        {pc.resolution}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <span className="flex items-center gap-2 bg-[#FF6B00] text-black text-xs font-bold tracking-widest uppercase px-5 py-3">
                        <Icon name="ArrowRight" size={14} />
                        Подробнее
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-heading font-black text-lg uppercase text-white mb-2 group-hover:text-[#FF6B00] transition-colors line-clamp-2">
                      {pc.title}
                    </h3>

                    {/* Tags */}
                    {pc.tags && pc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pc.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-white/5 border border-white/10 text-white/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Specs */}
                    <div className="space-y-1.5 mb-5">
                      {[
                        { icon: 'Cpu', val: pc.specs.cpu },
                        { icon: 'Monitor', val: pc.specs.gpu },
                        { icon: 'MemoryStick', val: `${pc.specs.ram} · ${pc.specs.storage}` },
                      ].map((s) => (
                        <div key={s.icon} className="flex items-center gap-2 text-xs text-white/60">
                          <Icon name={s.icon} size={12} className="text-[#FF6B00] shrink-0" />
                          <span className="truncate">{s.val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Trust row */}
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/10">
                      {[
                        { icon: 'Shield', text: 'Гарантия 1 год' },
                        { icon: 'Activity', text: 'Стресс-тест' },
                        { icon: 'Wrench', text: 'ТО в подарок' },
                      ].map((b) => (
                        <div key={b.text} className="flex items-center gap-1 flex-1">
                          <Icon name={b.icon} size={11} className="text-[#FF6B00] shrink-0" />
                          <span className="text-[10px] font-mono text-white/50 leading-tight">{b.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-auto">
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase mb-1">Цена</div>
                          <div className="font-heading text-3xl font-black text-white">
                            {pc.price.toLocaleString()} <span className="text-[#FF6B00]">₽</span>
                          </div>
                          <div className="text-[10px] font-mono text-white/40 mt-1">Рассрочка 0%</div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {pc.outOfStock ? (
                          <button disabled className="w-full flex items-center justify-center gap-2 bg-white/5 text-white/40 font-bold text-xs tracking-widest uppercase py-4 cursor-not-allowed">
                            <Icon name="Clock" size={14} />
                            Нет в наличии
                          </button>
                        ) : (
                          <button className="w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold text-xs tracking-widest uppercase py-4 transition-all">
                            <Icon name="ArrowRight" size={14} />
                            Узнать больше
                          </button>
                        )}
                        <button
                          onClick={(e) => openConsult(e, pc)}
                          className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-[#FF6B00] text-white/70 hover:text-[#FF6B00] font-mono text-[10px] tracking-widest uppercase py-3.5 transition-all"
                        >
                          <Icon name="MessageCircle" size={12} />
                          Консультация
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredCatalog.length === 0 && (
          <div className="text-center py-20 border border-white/10">
            <Icon name="Search" size={48} className="mx-auto text-white/30 mb-4" />
            <p className="font-mono tracking-wider uppercase text-white/50">Нет сборок в этой категории</p>
          </div>
        )}
      </section>

      {/* Consultation Dialog */}
      <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
        <DialogContent className="max-w-sm bg-[#0A0A0A] border-2 border-[#FF6B00]/40 text-white rounded-none">
          <DialogHeader>
            <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-2">
              // Консультация
            </div>
            <DialogTitle className="font-heading text-2xl font-black uppercase text-white">
              {consultPC?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <p className="text-white/60 text-sm">
              Выберите удобный способ связи — ответим за 15 минут.
            </p>

            <a
              href="tel:+79950272707"
              className="flex items-center gap-4 border border-white/10 hover:border-[#FF6B00] bg-[#0D0D0D] p-4 group transition-all"
              onClick={() => setConsultOpen(false)}
            >
              <div className="w-11 h-11 bg-[#FF6B00] flex items-center justify-center shrink-0">
                <Icon name="Phone" size={20} className="text-black" />
              </div>
              <div>
                <div className="font-heading font-black uppercase text-white group-hover:text-[#FF6B00] transition-colors">
                  Позвонить
                </div>
                <div className="font-mono text-xs text-white/50 tracking-wider">+7 995 027-27-07</div>
              </div>
              <Icon name="ArrowRight" size={16} className="ml-auto text-white/30 group-hover:text-[#FF6B00]" />
            </a>

            <a
              href={`https://t.me/komplabvlz?text=${encodeURIComponent(`Привет! Хочу узнать подробнее про ${consultPC?.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-white/10 hover:border-[#FF6B00] bg-[#0D0D0D] p-4 group transition-all"
              onClick={() => setConsultOpen(false)}
            >
              <div className="w-11 h-11 bg-[#229ED9] flex items-center justify-center shrink-0">
                <Icon name="Send" size={20} className="text-white" />
              </div>
              <div>
                <div className="font-heading font-black uppercase text-white group-hover:text-[#FF6B00] transition-colors">
                  Telegram
                </div>
                <div className="font-mono text-xs text-white/50 tracking-wider">@komplabvlz</div>
              </div>
              <Icon name="ArrowRight" size={16} className="ml-auto text-white/30 group-hover:text-[#FF6B00]" />
            </a>

            <a
              href="https://max.ru/u/f9LHodD0cOIA6d075Cod-oEXOD45O0dMe4dxvcb69ZiIjPWreMI9fiLCoVg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-white/10 hover:border-[#FF6B00] bg-[#0D0D0D] p-4 group transition-all"
              onClick={() => setConsultOpen(false)}
            >
              <div className="w-11 h-11 bg-[#FF6B00] flex items-center justify-center shrink-0">
                <Icon name="MessageCircle" size={20} className="text-black" />
              </div>
              <div>
                <div className="font-heading font-black uppercase text-white group-hover:text-[#FF6B00] transition-colors">
                  Мессенджер MAX
                </div>
                <div className="font-mono text-xs text-white/50 tracking-wider">Антоний Дутов</div>
              </div>
              <Icon name="ArrowRight" size={16} className="ml-auto text-white/30 group-hover:text-[#FF6B00]" />
            </a>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Catalog;