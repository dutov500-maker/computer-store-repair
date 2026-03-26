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

const STATIC_CATALOG = CATALOG_DATA as CatalogItem[];

const TRUST_BADGES = [
  { icon: 'Shield', label: 'Гарантия 1 год' },
  { icon: 'Activity', label: 'Стресс-тест 4 ч.' },
  { icon: 'Wrench', label: 'Обслуживание 1 год бесплатно' },
];

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
        <div className="min-h-screen bg-background pt-24 pb-12">
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

      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link to="/catalog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <Icon name="ArrowLeft" size={20} />
            Вернуться в каталог
          </Link>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <img src={product.image_url} alt={product.title} className="w-full rounded-xl shadow-lg" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap mb-4">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/30">
                    {product.badge}
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeColor(product.category)}`}>
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.title}</h1>
              <p className="text-lg text-muted-foreground mb-5">{product.description}</p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
                  <Icon name="Monitor" size={14} />
                  {product.specs.gpu}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 font-medium">
                  <Icon name="Cpu" size={14} />
                  {product.specs.cpu}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-400 font-medium">
                  <Icon name="MemoryStick" size={14} />
                  {product.specs.ram}
                </span>
              </div>

              <div className="text-4xl font-bold text-gradient mb-4">
                {product.price.toLocaleString('ru-RU')} ₽
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
              {isHighTicket ? (
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

              {/* WhatsApp */}
              <a
                href={`https://wa.me/79950272707?text=Здравствуйте!%20Интересует%20${encodeURIComponent(product.title)}%20за%20${product.price.toLocaleString('ru-RU')}₽`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-3"
              >
                <Button variant="outline" size="lg" className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366] text-[#25D366]">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Консультация с мастером
                </Button>
              </a>

              {/* Trade-in */}
              <a
                href={`https://wa.me/79950272707?text=Хочу%20узнать%20про%20Trade-in%20на%20${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-5"
              >
                <Button variant="ghost" size="sm" className="w-full text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 border border-orange-500/20">
                  <Icon name="ArrowLeftRight" size={14} className="mr-2" />
                  Trade-in — зачтём старый ПК в скидку
                </Button>
              </a>

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

      <Footer />
    </>
  );
}
