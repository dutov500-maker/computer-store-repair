import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import funcUrls from '../../backend/func2url.json';
import StickyHelpButton from '@/components/StickyHelpButton';
import { CATALOG_DATA } from '@/data/catalog';

interface CatalogItem {
  id: number;
  title: string;
  description: string;
  price: number;
  resolution: string;
  category: string;
  image_url: string;
  badge?: string;
  fps?: string;
  specs: { cpu: string; gpu: string; ram: string; storage: string };
}

const STATIC_CATALOG = (CATALOG_DATA as (CatalogItem & { hidden?: boolean })[]).filter(item => !item.hidden);

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'ECO': return 'from-green-500/20 to-green-600/10 border-green-500/30';
    case 'SPECIAL': return 'from-blue-500/20 to-blue-600/10 border-blue-500/30';
    case 'PREMIUM': return 'from-purple-500/20 to-purple-600/10 border-purple-500/30';
    case 'ULTRA': return 'from-orange-500/20 to-orange-600/10 border-orange-500/30';
    case 'ELITE': return 'from-red-500/20 to-red-600/10 border-red-500/30';
    default: return 'from-primary/20 to-primary/10 border-primary/30';
  }
};

const getCategoryBadgeColor = (category: string) => {
  switch (category) {
    case 'ECO': return 'bg-green-500/10 text-green-500 border-green-500/30';
    case 'SPECIAL': return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    case 'PREMIUM': return 'bg-purple-500/10 text-purple-500 border-purple-500/30';
    case 'ULTRA': return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
    case 'ELITE': return 'bg-red-500/10 text-red-500 border-red-500/30';
    default: return 'bg-primary/10 text-primary border-primary/30';
  }
};

const TRUST_BADGES = [
  { icon: 'Shield', label: 'Гарантия 1 год' },
  { icon: 'Activity', label: 'Стресс-тест 4 ч.' },
  { icon: 'Wrench', label: 'Обслуживание 1 год' },
];

const Catalog = () => {
  const [catalog] = useState<CatalogItem[]>(STATIC_CATALOG);
  const [selectedPC, setSelectedPC] = useState<CatalogItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reserveDialogOpen, setReserveDialogOpen] = useState(false);
  const [reservePC, setReservePC] = useState<CatalogItem | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [reserveName, setReserveName] = useState('');
  const [reservePhone, setReservePhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [formStep, setFormStep] = useState(1);

  const seoTitle = "Купить компьютер в Волжском - Готовые игровые ПК | Компьютерная Лаборатория";
  const seoDescription = "Купить готовый игровой компьютер в Волжском. Сборки от 45 000₽. Новые комплектующие, гарантия до 3 лет. Бесплатная доставка от 50 000₽. ☎️ +7 (995) 027-27-07";

  const loading = false;
  const error = null;

  const generateProductSchema = () => {
    return catalog.map((pc) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": pc.title,
      "description": pc.description,
      "image": pc.image_url,
      "brand": { "@type": "Brand", "name": "Компьютерная Лаборатория" },
      "offers": {
        "@type": "Offer",
        "url": `https://комплаб.рф/catalog#${pc.id}`,
        "priceCurrency": "RUB",
        "price": pc.price,
        "availability": "https://schema.org/InStock",
        "seller": { "@type": "Organization", "name": "Компьютерная Лаборатория" }
      },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "50" }
    }));
  };

  const filters = [
    { id: 'ALL', label: 'Все', icon: 'LayoutGrid', count: catalog.length },
    { id: 'ECO', label: 'Eco', icon: 'DollarSign', count: catalog.filter(pc => pc.category === 'ECO').length, description: '45-60К' },
    { id: 'SPECIAL', label: 'Special', icon: 'Star', count: catalog.filter(pc => pc.category === 'SPECIAL').length, description: '79-113К' },
    { id: 'PREMIUM', label: 'Premium', icon: 'Crown', count: catalog.filter(pc => pc.category === 'PREMIUM').length, description: '115-205К' },
    { id: 'ULTRA', label: 'Ultra', icon: 'Zap', count: catalog.filter(pc => pc.category === 'ULTRA').length, description: '235-270К' },
    { id: 'ELITE', label: 'Elite', icon: 'Flame', count: catalog.filter(pc => pc.category === 'ELITE').length, description: '530К' }
  ];

  const filteredCatalog = activeFilter === 'ALL'
    ? catalog
    : catalog.filter(pc => pc.category === activeFilter);

  const handleOrderClick = (e: React.MouseEvent, pc: CatalogItem) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedPC(pc);
    setDialogOpen(true);
    setFormStep(1);
  };

  const handleReserveClick = (e: React.MouseEvent, pc: CatalogItem) => {
    e.preventDefault();
    e.stopPropagation();
    setReservePC(pc);
    setReserveDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error('Пожалуйста, заполните имя и телефон');
      return;
    }
    setSubmitting(true);
    try {
      const pcMessage = `Интересует: ${selectedPC.title}\nЦена: ${selectedPC.price.toLocaleString()} ₽\n\nДополнительно: ${message.trim() || 'Не указано'}`;
      const response = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: null, service_type: 'Заказ ПК', message: pcMessage })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время');
        setName(''); setPhone(''); setMessage(''); setDialogOpen(false);
      } else {
        toast.error(data.error || 'Ошибка при отправке заявки');
      }
    } catch {
      toast.error('Ошибка при отправке заявки. Попробуйте позвонить нам: +7 995 027 27 07');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReserveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveName.trim() || !reservePhone.trim()) {
      toast.error('Пожалуйста, заполните имя и телефон');
      return;
    }
    setSubmitting(true);
    try {
      const pcMessage = `БРОНИРОВАНИЕ: ${reservePC.title}\nЦена: ${reservePC.price.toLocaleString()} ₽`;
      const response = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: reserveName.trim(), phone: reservePhone.trim(), email: null, service_type: 'Бронирование сборки', message: pcMessage })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Сборка забронирована! Перезвоним в течение 15 минут');
        setReserveName(''); setReservePhone(''); setReserveDialogOpen(false);
      } else {
        toast.error(data.error || 'Ошибка при отправке');
      }
    } catch {
      toast.error('Ошибка. Позвоните нам: +7 995 027 27 07');
    } finally {
      setSubmitting(false);
    }
  };

  const isHighTicket = (price: number) => price > 40000;

  return (
    <div className="min-h-screen page-transition">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="купить компьютер волжский, игровой компьютер волжский, игровой пк волжский, купить пк волжский, готовые сборки пк волжский, компьютер для игр волжский, мощный компьютер волжский, купить игровой компьютер волжский" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <link rel="canonical" href="https://комплаб.рф/catalog" />
      </Helmet>

      {generateProductSchema().map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <Header />
      <StickyHelpButton />

      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Каталог <span className="text-gradient">игровых ПК</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите готовую конфигурацию или создайте индивидуальную сборку
          </p>
        </div>

        {/* Trade-in баннер */}
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <Card className="p-4 bg-gradient-to-r from-orange-500/15 via-orange-400/10 to-yellow-500/15 border-orange-500/40 border-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Icon name="ArrowLeftRight" size={20} className="text-orange-400" />
                </div>
                <div>
                  <p className="font-bold text-orange-300 text-sm">Trade-in — сдай старое, получи скидку</p>
                  <p className="text-xs text-muted-foreground">Обменяем твой старый ПК или комплектующие на скидку до 30 000 ₽</p>
                </div>
              </div>
              <a
                href="https://wa.me/79950272707?text=Хочу%20узнать%20про%20Trade-in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white shrink-0">
                  Узнать стоимость
                </Button>
              </a>
            </div>
          </Card>
        </div>

        {/* Sticky filters */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md pt-3 pb-3 -mx-4 px-4 border-b border-border/30 mb-8">
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`group relative px-4 py-2 rounded-xl border-2 transition-all duration-300 animate-fade-in hover:scale-105 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-br from-primary to-primary/80 border-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-1.5">
                  <Icon
                    name={filter.icon}
                    size={16}
                    className={activeFilter === filter.id ? 'text-white' : 'text-primary'}
                  />
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm">{filter.label}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === filter.id ? 'bg-white/20' : 'bg-primary/10'}`}>
                        {filter.count}
                      </span>
                    </div>
                    {filter.description && (
                      <span className={`text-xs ${activeFilter === filter.id ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {filter.description}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {activeFilter !== 'ALL' && (
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center justify-center gap-4 text-sm">
                <Icon name="Info" size={18} className="text-primary" />
                <p className="text-muted-foreground">
                  {activeFilter === 'ECO' && 'Бюджетные сборки для комфортной игры в популярные игры'}
                  {activeFilter === 'SPECIAL' && 'Оптимальные сборки для игр на ультра настройках в Full HD'}
                  {activeFilter === 'PREMIUM' && 'Мощные сборки для QHD гейминга на максимальных настройках'}
                  {activeFilter === 'ULTRA' && 'Топовые сборки для 4K игр без компромиссов'}
                  {activeFilter === 'ELITE' && 'Абсолютная максимальная производительность для профессионалов'}
                </p>
              </div>
            </Card>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredCatalog.length > 0 ? (
              <>
                <div className="mb-6 animate-fade-in">
                  <p className="text-center text-muted-foreground">
                    Найдено компьютеров: <span className="font-bold text-primary">{filteredCatalog.length}</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCatalog.map((pc, index) => (
                    <Link key={pc.id} to={`/pc/${pc.id}`}>
                      <Card
                        className="group relative overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 animate-fade-in hover:-translate-y-2 border-2 bg-card/50 backdrop-blur-sm flex flex-col"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                          <div className="absolute top-4 left-4 z-10 space-y-2">
                            <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm border-2 ${getCategoryBadgeColor(pc.category)} shadow-lg`}>
                              {pc.category}
                            </span>
                            {pc.badge && (
                              <div>
                                <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/90 backdrop-blur-sm text-white border-2 border-red-500 shadow-lg animate-pulse">
                                  {pc.badge}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="absolute top-4 right-4 z-10">
                            <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold bg-primary/90 backdrop-blur-sm text-white border-2 border-primary shadow-lg">
                              {pc.resolution}
                            </span>
                          </div>
                          <img
                            src={pc.image_url}
                            alt={pc.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                        </div>

                        <div className="p-5 relative flex flex-col flex-1">
                          {/* Title */}
                          <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {pc.title}
                          </h3>

                          {/* Feature Tags — GPU, CPU, RAM at a glance */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                              <Icon name="Monitor" size={11} />
                              {pc.specs.gpu.split(' ').slice(-2).join(' ')}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-medium">
                              <Icon name="Cpu" size={11} />
                              {pc.specs.cpu.split(' ').slice(-2).join(' ')}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-medium">
                              <Icon name="MemoryStick" size={11} />
                              {pc.specs.ram}
                            </span>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {pc.description}
                          </p>

                          {/* Specs */}
                          <div className="space-y-2 mb-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Icon name="Cpu" size={14} className="text-primary shrink-0" />
                              <span className="text-muted-foreground truncate">{pc.specs.cpu}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="Monitor" size={14} className="text-primary shrink-0" />
                              <span className="text-muted-foreground truncate">{pc.specs.gpu}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon name="MemoryStick" size={14} className="text-primary shrink-0" />
                              <span className="text-muted-foreground truncate">{pc.specs.ram} • {pc.specs.storage}</span>
                            </div>
                            {pc.fps && (
                              <div className="flex items-center gap-2 pt-1.5 border-t border-border/50">
                                <Icon name="Gamepad2" size={14} className="text-green-500 shrink-0" />
                                <span className="text-muted-foreground text-xs">{pc.fps}</span>
                              </div>
                            )}
                          </div>

                          {/* Price + CTA */}
                          <div className="mt-auto space-y-3 pt-4 border-t border-border/50">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-muted-foreground mb-0.5">Цена</p>
                                <p className="text-3xl font-bold text-gradient">
                                  {pc.price.toLocaleString()} ₽
                                </p>
                              </div>
                            </div>

                            {/* Primary CTA — always visible */}
                            {isHighTicket(pc.price) ? (
                              <Button
                                size="default"
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-lg shadow-orange-500/30"
                                onClick={(e) => handleReserveClick(e, pc)}
                              >
                                <Icon name="Lock" size={16} className="mr-2" />
                                Забронировать сборку
                              </Button>
                            ) : (
                              <Button
                                size="default"
                                className="w-full gradient-animated shadow-lg"
                                onClick={(e) => handleOrderClick(e, pc)}
                              >
                                <Icon name="ShoppingCart" size={16} className="mr-2" />
                                Заказать
                              </Button>
                            )}

                            {/* WhatsApp */}
                            <a
                              href={`https://wa.me/79950272707?text=Здравствуйте!%20Хочу%20узнать%20подробнее%20о%20${encodeURIComponent(pc.title)}%20за%20${pc.price}₽`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="block w-full"
                            >
                              <Button
                                size="default"
                                variant="outline"
                                className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366] hover:border-[#25D366] text-[#25D366] hover:text-[#25D366] shadow-md transition-all"
                              >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                Консультация с мастером
                              </Button>
                            </a>

                            {/* Trade-in */}
                            <a
                              href={`https://wa.me/79950272707?text=Хочу%20узнать%20про%20Trade-in%20на%20${encodeURIComponent(pc.title)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="block w-full"
                            >
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-full text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 border border-orange-500/20 hover:border-orange-400/40 text-xs font-medium"
                              >
                                <Icon name="ArrowLeftRight" size={13} className="mr-1.5" />
                                Trade-in — зачтём старый ПК в скидку
                              </Button>
                            </a>

                            {/* Trust Badges */}
                            <div className="flex items-center justify-between pt-1">
                              {TRUST_BADGES.map((badge) => (
                                <div key={badge.label} className="flex flex-col items-center gap-1 text-center flex-1">
                                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Icon name={badge.icon} size={13} className="text-primary" />
                                  </div>
                                  <span className="text-[9px] text-muted-foreground leading-tight">{badge.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-orange-500 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl"></div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl font-bold mb-2">Ничего не найдено</p>
                <p className="text-muted-foreground">Попробуйте выбрать другую категорию</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* Order Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">{selectedPC?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <img src={selectedPC?.image_url} alt={selectedPC?.title} className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Cpu" className="text-primary" size={20} />
                  <p className="text-xs text-muted-foreground">Процессор</p>
                </div>
                <p className="font-semibold">{selectedPC?.specs.cpu}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Monitor" className="text-primary" size={20} />
                  <p className="text-xs text-muted-foreground">Видеокарта</p>
                </div>
                <p className="font-semibold">{selectedPC?.specs.gpu}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MemoryStick" className="text-primary" size={20} />
                  <p className="text-xs text-muted-foreground">Оперативная память</p>
                </div>
                <p className="font-semibold">{selectedPC?.specs.ram}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="HardDrive" className="text-primary" size={20} />
                  <p className="text-xs text-muted-foreground">Накопитель</p>
                </div>
                <p className="font-semibold">{selectedPC?.specs.storage}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Шаг {formStep} из 3</span>
                <span className="font-medium text-primary">{formStep === 1 ? 'Контакты' : formStep === 2 ? 'Детали' : 'Готово'}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out" style={{ width: `${(formStep / 3) * 100}%` }} />
              </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Стоимость сборки</p>
                  <p className="text-4xl font-bold text-gradient">{selectedPC?.price.toLocaleString()} ₽</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getCategoryBadgeColor(selectedPC?.category)}`}>
                    {selectedPC?.category}
                  </span>
                  <p className="text-sm text-muted-foreground mt-2">{selectedPC?.resolution} Gaming</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Ваше имя *</Label>
                <Input id="name" value={name} onChange={(e) => { setName(e.target.value); if (e.target.value && formStep === 1) setFormStep(2); }} placeholder="Иван Иванов" required />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input id="phone" value={phone} onChange={(e) => { setPhone(e.target.value); if (e.target.value && name && formStep === 2) setFormStep(3); }} placeholder="+7 999 123 45 67" required />
              </div>
              <div>
                <Label htmlFor="message">Дополнительные пожелания</Label>
                <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Например: нужен монитор, хочу RGB подсветку..." rows={4} />
              </div>
              <Button type="submit" className="w-full gradient-animated text-lg" size="lg" disabled={submitting}>
                {submitting ? 'Отправка...' : 'Заказать эту сборку'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reserve Dialog — high-ticket */}
      <Dialog open={reserveDialogOpen} onOpenChange={setReserveDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading flex items-center gap-2">
              <Icon name="Lock" size={20} className="text-orange-400" />
              Забронировать сборку
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <div className="p-4 bg-gradient-to-br from-orange-500/15 to-amber-500/10 border border-orange-500/30 rounded-xl">
              <p className="font-bold text-base mb-1">{reservePC?.title}</p>
              <p className="text-2xl font-bold text-gradient">{reservePC?.price.toLocaleString()} ₽</p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <Icon name="Clock" size={18} className="text-green-400 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                Перезвоним в течение <span className="font-bold text-green-400">15 минут</span> для подтверждения конфигурации и условий бронирования.
              </p>
            </div>

            <form onSubmit={handleReserveSubmit} className="space-y-4">
              <div>
                <Label htmlFor="reserve-name">Ваше имя *</Label>
                <Input id="reserve-name" value={reserveName} onChange={(e) => setReserveName(e.target.value)} placeholder="Иван Иванов" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="reserve-phone">Номер телефона *</Label>
                <Input id="reserve-phone" value={reservePhone} onChange={(e) => setReservePhone(e.target.value)} placeholder="+7 999 123 45 67" required className="mt-1.5" />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-lg shadow-orange-500/30"
                disabled={submitting}
              >
                <Icon name="Lock" size={18} className="mr-2" />
                {submitting ? 'Отправка...' : 'Забронировать'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Catalog;