import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import StickyHelpButton from '@/components/StickyHelpButton';
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import funcUrls from '../../backend/func2url.json';
import { CATALOG_DATA } from '@/data/catalog';
import { FpsBlock, DesignNote } from '@/components/PCCardDetails';


interface CatalogItem {
  id: number;
  title: string;
  description: string;
  price: number;
  resolution: string;
  category: string;
  brand?: 'AMD' | 'Intel';
  image_url: string;
  badge?: string;
  tags?: string[];
  signature?: 'orange' | 'snow' | 'obsidian' | 'glacier';
  outOfStock?: boolean;
  fps?: string;
  specs: { cpu: string; gpu: string; ram: string; storage: string; cooling?: string };
}

const STATIC_CATALOG = CATALOG_DATA as CatalogItem[];

const TRUST_BADGES = [
  { icon: 'Shield', label: 'Гарантия 1 год' },
  { icon: 'Activity', label: 'Стресс-тест 4 ч.' },
  { icon: 'Wrench', label: 'Обслуживание 1 год бесплатно' },
];

const SERVICE_FEATURES = [
  { icon: 'ShieldCheck', title: 'Гарантия', text: '1 год от K Lab + до 5 лет от вендоров' },
  { icon: 'Activity', title: 'Стресс-тест', text: '4 часа под OCCT, AIDA64, FurMark перед выдачей' },
  { icon: 'Wrench', title: 'ТО в подарок', text: '1 год бесплатного планового обслуживания' },
  { icon: 'ArrowLeftRight', title: 'Trade-in', text: 'Честный обмен старого ПК в счёт покупки' },
  { icon: 'MonitorCheck', title: 'Windows 11 Pro', text: 'Предустановлена с драйверами и оптимизацией' },
];

const SIGNATURE_META: Record<string, { label: string; accent: string; text: string; border: string; bg: string; gradient: string }> = {
  orange:   { label: 'ORANGE EDITION', accent: '#FF6B00', text: 'text-[#FF6B00]', border: 'border-[#FF6B00]/40', bg: 'bg-[#FF6B00]/10', gradient: 'from-orange-500/20 to-orange-600/10 border-orange-500/40' },
  snow:     { label: 'SNOW EDITION',   accent: '#f8fafc', text: 'text-white',    border: 'border-white/50',     bg: 'bg-white/10',     gradient: 'from-white/20 to-white/5 border-white/40' },
  obsidian: { label: 'OBSIDIAN',       accent: '#ef4444', text: 'text-red-400',  border: 'border-red-500/50',   bg: 'bg-red-500/10',   gradient: 'from-red-500/20 to-red-900/10 border-red-500/40' },
  glacier:  { label: 'GLACIER',        accent: '#7dd3fc', text: 'text-sky-300',  border: 'border-sky-300/50',   bg: 'bg-sky-300/10',   gradient: 'from-sky-400/20 to-sky-900/10 border-sky-300/40' },
};

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

export default function PCProduct() {
  const { id } = useParams();
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [discountDialogOpen, setDiscountDialogOpen] = useState(false);
  const [creditDialogOpen, setCreditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [discountForm, setDiscountForm] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDiscountSubmitting, setIsDiscountSubmitting] = useState(false);
  const discountShownRef = useRef(false);

  const product = STATIC_CATALOG.find(p => p.id === Number(id));

  useEffect(() => {
    discountShownRef.current = false;
    const timer = setTimeout(() => {
      if (!discountShownRef.current) {
        discountShownRef.current = true;
        setDiscountDialogOpen(true);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [id]);

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Товар не найден</h1>
            <Link to="/catalog"><Button>Вернуться в каталог</Button></Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const isHighTicket = product.price > 40000;
  const signature = product.signature ? SIGNATURE_META[product.signature] : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: null,
          service_type: 'Заказ компьютера',
          message: `${product.title} — ${product.price.toLocaleString('ru-RU')} ₽\n${formData.comment || ''}`
        })
      });
      if (response.ok) {
        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        setOrderDialogOpen(false);
        setFormData({ name: '', phone: '', comment: '' });
      } else { toast.error('Ошибка отправки заявки'); }
    } catch { toast.error('Ошибка отправки заявки'); }
    finally { setIsSubmitting(false); }
  };

  const handleDiscountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountForm.name.trim() || !discountForm.phone.trim()) {
      toast.error('Заполните имя и телефон');
      return;
    }
    setIsDiscountSubmitting(true);
    try {
      const response = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: discountForm.name.trim(),
          phone: discountForm.phone.trim(),
          email: null,
          service_type: 'Персональная скидка',
          message: `Запрос персональной скидки на: ${product.title} — ${product.price.toLocaleString('ru-RU')} ₽`
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Отлично! Мы рассчитаем персональную скидку и перезвоним в течение 15 минут');
        setDiscountDialogOpen(false);
        setDiscountForm({ name: '', phone: '' });
      } else { toast.error('Ошибка отправки'); }
    } catch { toast.error('Ошибка. Позвоните: +7 995 027 27 07'); }
    finally { setIsDiscountSubmitting(false); }
  };

  return (
    <>
      <Helmet>
        <title>{product.title} - Купить в КомпЛаб</title>
        <meta name="description" content={`${product.description}. ${product.specs.cpu}, ${product.specs.gpu}, ${product.specs.ram}, ${product.specs.storage}. Цена: ${product.price.toLocaleString('ru-RU')} ₽`} />
      </Helmet>
      <Header />
      <StickyHelpButton />

      <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link to="/catalog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <Icon name="ArrowLeft" size={20} />
            Вернуться в каталог
          </Link>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className={`relative ${signature ? `p-1 rounded-xl bg-gradient-to-br ${signature.gradient} border` : ''}`}>
              <img src={product.image_url} alt={product.title} className={`w-full rounded-xl shadow-lg ${product.outOfStock ? 'grayscale' : ''}`} />
              {product.outOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                  <span className="font-mono text-sm tracking-[0.2em] uppercase px-5 py-2.5 bg-black/80 border border-white/30 text-white/90 font-bold">
                    Временно нет в наличии
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap mb-4">
                {signature && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${signature.border} ${signature.bg} ${signature.text}`}
                  >
                    {signature.label}
                  </span>
                )}
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/30">
                    {product.badge}
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeColor(product.category)}`}>
                  {product.category}
                </span>
                {product.brand && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-muted text-muted-foreground border-border">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.title}</h1>
              <p className="text-lg text-muted-foreground mb-5">{product.description}</p>

              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 bg-muted border border-border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-muted-foreground font-medium">
                  <Icon name="Monitor" size={14} className="text-muted-foreground" />
                  {product.specs.gpu}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-muted-foreground font-medium">
                  <Icon name="Cpu" size={14} className="text-muted-foreground" />
                  {product.specs.cpu}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-muted-foreground font-medium">
                  <Icon name="MemoryStick" size={14} className="text-muted-foreground" />
                  {product.specs.ram}
                </span>
              </div>

              {/* FPS block */}
              <FpsBlock price={product.price} />

              {/* Design note */}
              <DesignNote />

              <div className="mb-4">
                <div className="text-4xl font-bold text-gradient mb-2">
                  {product.price.toLocaleString('ru-RU')} ₽
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded font-mono font-bold">МИР</span>
                  <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded font-mono font-bold">VISA</span>
                  <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded font-mono font-bold">MC</span>
                  <span className="text-[11px] text-muted-foreground">· Рассрочка · Кредит</span>
                </div>
              </div>

              {product.fps && (
                <div className="bg-muted/50 rounded-xl p-4 mb-5 border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="Gauge" className="text-primary" size={18} />
                    <span className="font-semibold text-sm">Производительность</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.fps}</p>
                </div>
              )}

              {/* Primary CTA */}
              {product.outOfStock ? (
                <Button size="lg" disabled className="w-full mb-3 bg-white/5 text-white/40 font-bold cursor-not-allowed">
                  <Icon name="Clock" size={18} className="mr-2" />
                  Временно нет в наличии
                </Button>
              ) : isHighTicket ? (
                <Button
                  size="lg"
                  className="w-full mb-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-lg shadow-orange-500/30"
                  onClick={() => setOrderDialogOpen(true)}
                >
                  <Icon name="Lock" size={18} className="mr-2" />
                  Забронировать сборку
                </Button>
              ) : (
                <Button size="lg" className="w-full mb-3 gradient-animated" onClick={() => setOrderDialogOpen(true)}>
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Заказать компьютер
                </Button>
              )}

              {/* Telegram */}
              <a
                href={`https://t.me/komplabvlz?text=${encodeURIComponent(`Привет! Хочу обсудить сборку ${product.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-3"
              >
                <Button variant="outline" size="lg" className="w-full bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border-[#0088cc] text-[#0088cc]">
                  <Icon name="Send" size={18} className="mr-2" />
                  Консультация с мастером
                </Button>
              </a>

              {/* Кредит */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full mb-5 text-orange-500 hover:text-orange-600 hover:bg-orange-500/10 border border-orange-500/30"
                onClick={() => setCreditDialogOpen(true)}
              >
                <Icon name="CreditCard" size={14} className="mr-2" />
                Оформить в кредит / рассрочку
              </Button>

              {/* Trust Badges */}
              <div className="flex items-center justify-around p-4 bg-card/50 rounded-xl border border-border/50">
                {TRUST_BADGES.map((badge) => (
                  <div key={badge.label} className="flex flex-col items-center gap-1.5 text-center">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name={badge.icon} size={16} className="text-primary" />
                    </div>
                    <span className="text-[10px] text-muted-foreground leading-tight max-w-[70px]">{badge.label}</span>
                  </div>
                ))}
              </div>

              <Link to="/pc-selection" className="mt-3">
                <Button variant="outline" size="sm" className="w-full text-muted-foreground">
                  <Icon name="Settings" size={14} className="mr-2" />
                  Нужна индивидуальная сборка?
                </Button>
              </Link>
            </div>
          </div>

          <Card className={`p-6 bg-gradient-to-br ${getCategoryColor(product.category)} border mb-8`}>
            <h2 className="text-2xl font-bold mb-6">Характеристики</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Icon name="Cpu" className="text-primary mt-1" />
                <div><div className="font-semibold">Процессор</div><div className="text-muted-foreground">{product.specs.cpu}</div></div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="MonitorPlay" className="text-primary mt-1" />
                <div><div className="font-semibold">Видеокарта</div><div className="text-muted-foreground">{product.specs.gpu}</div></div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="MemoryStick" className="text-primary mt-1" />
                <div><div className="font-semibold">Оперативная память</div><div className="text-muted-foreground">{product.specs.ram}</div></div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="HardDrive" className="text-primary mt-1" />
                <div><div className="font-semibold">Накопитель</div><div className="text-muted-foreground">{product.specs.storage}</div></div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Monitor" className="text-primary mt-1" />
                <div><div className="font-semibold">Разрешение</div><div className="text-muted-foreground">{product.resolution}</div></div>
              </div>
              {product.specs.cooling && (
                <div className="flex items-start gap-3">
                  <Icon name="Snowflake" className="text-primary mt-1" />
                  <div><div className="font-semibold">Охлаждение</div><div className="text-muted-foreground">{product.specs.cooling}</div></div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-card/50 border mb-8">
            <h2 className="text-2xl font-bold mb-6">Сервис K|LAB</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {SERVICE_FEATURES.map((f) => (
                <div key={f.title} className="flex flex-col items-center text-center gap-2 p-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={f.icon} size={20} className="text-primary" />
                  </div>
                  <div className="font-semibold text-sm">{f.title}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{f.text}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Order Dialog */}
      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isHighTicket ? 'Забронировать' : 'Заказать'} {product.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea id="comment" value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Discount pop-up — triggers after 30s */}
      <Dialog open={discountDialogOpen} onOpenChange={setDiscountDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-heading">
              <span className="text-2xl">🎯</span>
              Персональная скидка на эту сборку
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Вы смотрите</p>
              <p className="font-bold">{product.title}</p>
              <p className="text-2xl font-bold text-gradient mt-1">{product.price.toLocaleString('ru-RU')} ₽</p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <Icon name="Tag" size={18} className="text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                Оставьте контакты — мы рассчитаем <span className="font-bold text-yellow-300">персональную скидку</span> и перезвоним в течение 15 минут.
              </p>
            </div>

            <form onSubmit={handleDiscountSubmit} className="space-y-3">
              <div>
                <Label htmlFor="disc-name">Ваше имя *</Label>
                <Input
                  id="disc-name"
                  value={discountForm.name}
                  onChange={(e) => setDiscountForm({ ...discountForm, name: e.target.value })}
                  placeholder="Иван"
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="disc-phone">Телефон *</Label>
                <Input
                  id="disc-phone"
                  value={discountForm.phone}
                  onChange={(e) => setDiscountForm({ ...discountForm, phone: e.target.value })}
                  placeholder="+7 999 123 45 67"
                  required
                  className="mt-1.5"
                />
              </div>
              <Button type="submit" size="lg" className="w-full gradient-animated font-bold" disabled={isDiscountSubmitting}>
                <Icon name="Tag" size={16} className="mr-2" />
                {isDiscountSubmitting ? 'Отправка...' : 'Получить скидку'}
              </Button>
              <button
                type="button"
                onClick={() => setDiscountDialogOpen(false)}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                Нет, спасибо
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Credit Dialog */}
      <Dialog open={creditDialogOpen} onOpenChange={setCreditDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading flex items-center gap-2">
              <Icon name="CreditCard" size={22} className="text-primary" />
              Кредит и рассрочка
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Мы работаем с <strong className="text-foreground">Т-Банком</strong> и <strong className="text-foreground">Сбербанком</strong>. Напишите нам в Telegram — пришлём ссылку на анкету, которую можно заполнить за 5 минут прямо с телефона.
            </p>
            <div className="bg-muted rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={15} className="text-green-500 shrink-0" />
                <span>Одобрение за 1-2 минуты</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={15} className="text-green-500 shrink-0" />
                <span>Рассрочка 0% до 12 месяцев</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={15} className="text-green-500 shrink-0" />
                <span>Кредит от 0,1% в день</span>
              </div>
            </div>
            <a
              href="https://t.me/komplabvlz?text=Привет!%20Хочу%20оформить%20покупку%20ПК%20в%20кредит%2Fрассрочку"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full bg-[#0088cc] hover:bg-[#0077bb] text-white font-bold" size="lg">
                <Icon name="Send" size={16} className="mr-2" />
                Написать в Telegram
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}