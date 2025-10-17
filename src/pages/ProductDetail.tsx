import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { initializeStorage, getCatalog, addRequest } from '@/lib/localStorage';

interface CatalogItem {
  id: number;
  title: string;
  description: string;
  price: number;
  resolution: string;
  specs: Record<string, string>;
  image_url?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<CatalogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = () => {
    setLoading(true);
    initializeStorage();
    const catalog = getCatalog();
    const item = catalog.find((p: CatalogItem) => p.id === parseInt(id || '0'));
    setProduct(item || null);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      addRequest({
        ...formData,
        service_type: `Заказ: ${product?.title}`,
        message: `${formData.message}\n\nТовар: ${product?.title}\nЦена: ${product?.price.toLocaleString()} ₽`
      });

      toast({
        title: 'Заявка отправлена!',
        description: 'Мы свяжемся с вами в ближайшее время'
      });
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4 text-center">
            <Icon name="AlertCircle" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h2 className="text-2xl font-heading font-bold mb-2">Товар не найден</h2>
            <p className="text-muted-foreground mb-6">К сожалению, запрашиваемый товар не существует</p>
            <Link to="/catalog">
              <Button>
                <Icon name="ArrowLeft" className="mr-2" size={18} />
                Вернуться в каталог
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/catalog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Назад в каталог
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Card className="overflow-hidden">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.title}
                    className="w-full h-[500px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[500px] bg-gradient-to-br from-secondary to-background flex items-center justify-center">
                    <Icon name="Monitor" size={128} className="text-muted-foreground" />
                  </div>
                )}
              </Card>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden cursor-pointer hover:border-primary transition-colors">
                    <div className="aspect-square bg-gradient-to-br from-secondary to-background flex items-center justify-center">
                      <Icon name="Image" size={32} className="text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
                  {product.resolution}
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{product.title}</h1>
                <p className="text-muted-foreground text-lg mb-6">{product.description}</p>
                <div className="text-4xl font-heading font-bold text-primary mb-2">
                  {product.price.toLocaleString()} ₽
                </div>
                <p className="text-sm text-muted-foreground">Цена указана за базовую комплектацию</p>
              </div>

              <Card className="p-6">
                <h3 className="font-heading font-bold text-lg mb-4">Характеристики</h3>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground capitalize">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold mb-2">Гарантия качества</h4>
                    <p className="text-sm text-muted-foreground">
                      Гарантия на сборку 12 месяцев. Гарантия на комплектующие от 1 до 3 лет.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Truck" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold mb-2">Бесплатная доставка</h4>
                    <p className="text-sm text-muted-foreground">
                      По Волжскому при заказе от 50 000 ₽. По России от 100 000 ₽.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Wrench" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold mb-2">Настройка и тестирование</h4>
                    <p className="text-sm text-muted-foreground">
                      Каждый компьютер проходит полное тестирование перед отправкой.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading font-bold text-lg mb-4">Оформить заказ</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ваше имя"
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
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@mail.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Комментарий</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Дополнительные пожелания к конфигурации"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Icon name="Loader2" className="animate-spin mr-2" size={18} />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="ShoppingCart" className="mr-2" size={18} />
                        Оформить заказ
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;