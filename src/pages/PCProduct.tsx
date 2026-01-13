import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import StickyHelpButton from '@/components/StickyHelpButton';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import funcUrls from '../../backend/func2url.json';
import { CATALOG_DATA } from '@/data/catalog';

const STATIC_CATALOG = CATALOG_DATA;

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'ECO':
      return 'from-green-500/20 to-green-600/10 border-green-500/30';
    case 'SPECIAL':
      return 'from-blue-500/20 to-blue-600/10 border-blue-500/30';
    case 'PREMIUM':
      return 'from-purple-500/20 to-purple-600/10 border-purple-500/30';
    case 'ULTRA':
      return 'from-orange-500/20 to-orange-600/10 border-orange-500/30';
    case 'ELITE':
      return 'from-red-500/20 to-red-600/10 border-red-500/30';
    default:
      return 'from-primary/20 to-primary/10 border-primary/30';
  }
};

const getCategoryBadgeColor = (category: string) => {
  switch (category) {
    case 'ECO':
      return 'bg-green-500/10 text-green-500 border-green-500/30';
    case 'SPECIAL':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    case 'PREMIUM':
      return 'bg-purple-500/10 text-purple-500 border-purple-500/30';
    case 'ULTRA':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
    case 'ELITE':
      return 'bg-red-500/10 text-red-500 border-red-500/30';
    default:
      return 'bg-primary/10 text-primary border-primary/30';
  }
};

export default function PCProduct() {
  const { id } = useParams();
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = STATIC_CATALOG.find(p => p.id === Number(id));

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-24 pb-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Товар не найден</h1>
            <Link to="/catalog">
              <Button>Вернуться в каталог</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(funcUrls.orders, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'Заказ компьютера',
          product: product.title,
          price: product.price
        })
      });

      if (response.ok) {
        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        setOrderDialogOpen(false);
        setFormData({ name: '', phone: '', comment: '' });
      } else {
        toast.error('Ошибка отправки заявки');
      }
    } catch (error) {
      toast.error('Ошибка отправки заявки');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{product.title} - Купить в КомпМастер</title>
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
              <img 
                src={product.image_url} 
                alt={product.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div>
              {product.badge && (
                <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/30 mb-4">
                  {product.badge}
                </div>
              )}
              
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ml-2 ${getCategoryBadgeColor(product.category)}`}>
                {product.category}
              </div>

              <h1 className="text-4xl font-bold mb-4 mt-4">{product.title}</h1>
              
              <p className="text-xl text-muted-foreground mb-6">{product.description}</p>
              
              <div className="text-4xl font-bold text-primary mb-6">
                {product.price.toLocaleString('ru-RU')} ₽
              </div>

              {product.fps && (
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Gauge" className="text-primary" />
                    <span className="font-semibold">Производительность</span>
                  </div>
                  <p className="text-sm">{product.fps}</p>
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full mb-4"
                onClick={() => setOrderDialogOpen(true)}
              >
                <Icon name="ShoppingCart" className="mr-2" />
                Заказать компьютер
              </Button>

              <Link to="/pc-selection">
                <Button variant="outline" size="lg" className="w-full">
                  <Icon name="Settings" className="mr-2" />
                  Нужна индивидуальная сборка?
                </Button>
              </Link>
            </div>
          </div>

          <Card className={`p-6 bg-gradient-to-br ${getCategoryColor(product.category)} border`}>
            <h2 className="text-2xl font-bold mb-6">Характеристики</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Icon name="Cpu" className="text-primary mt-1" />
                <div>
                  <div className="font-semibold">Процессор</div>
                  <div className="text-muted-foreground">{product.specs.cpu}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="MonitorPlay" className="text-primary mt-1" />
                <div>
                  <div className="font-semibold">Видеокарта</div>
                  <div className="text-muted-foreground">{product.specs.gpu}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="MemoryStick" className="text-primary mt-1" />
                <div>
                  <div className="font-semibold">Оперативная память</div>
                  <div className="text-muted-foreground">{product.specs.ram}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="HardDrive" className="text-primary mt-1" />
                <div>
                  <div className="font-semibold">Накопитель</div>
                  <div className="text-muted-foreground">{product.specs.storage}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Monitor" className="text-primary mt-1" />
                <div>
                  <div className="font-semibold">Разрешение</div>
                  <div className="text-muted-foreground">{product.resolution}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Заказать {product.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}