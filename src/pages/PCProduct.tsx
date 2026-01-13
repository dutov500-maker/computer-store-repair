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

const STATIC_CATALOG = [
  {
    id: 1,
    title: "Eco 1 (Ryzen 5 5500 + RTX 1660 Super)",
    description: "Бюджетная сборка для комфортной игры в популярные игры на средних настройках",
    price: 55000,
    resolution: "HD",
    category: "ECO",
    image_url: "https://cdn.poehali.dev/files/206fb641-30d1-4d87-b3ec-322e0f76a02e.jpg",
    badge: "💰 Лучшая цена",
    fps: "Dota 2: 120 FPS | CS2: 90 FPS",
    specs: {
      cpu: "AMD Ryzen 5 5500",
      gpu: "RTX 1660 Super",
      ram: "16GB DDR4",
      storage: "512GB SSD"
    }
  },
  {
    id: 2,
    title: "Eco 2 (Intel Core i3 12100F + RTX 2060 Super)",
    description: "Доступная сборка для Full HD гейминга в современных играх",
    price: 59500,
    resolution: "Full HD",
    category: "ECO",
    image_url: "https://cdn.poehali.dev/files/89621141-3188-48fd-a9eb-52b97c276daf.jpg",
    badge: "🔥 Хит продаж",
    fps: "GTA V: 110 FPS | Fortnite: 100 FPS",
    specs: {
      cpu: "Intel Core i3-12100F",
      gpu: "RTX 2060 Super",
      ram: "16GB DDR4",
      storage: "512GB SSD"
    }
  },
  {
    id: 3,
    title: "Eco 3 (Intel Core i3 12100F + RTX 3050)",
    description: "Экономичная сборка с поддержкой современных технологий для Full HD",
    price: 63000,
    resolution: "Full HD",
    category: "ECO",
    image_url: "https://cdn.poehali.dev/files/d05492af-a3fa-47dc-b463-ec2a235f82d0.jpg",
    specs: {
      cpu: "Intel Core i3-12100F",
      gpu: "RTX 3050",
      ram: "16GB DDR4",
      storage: "512GB SSD"
    }
  },
  {
    id: 4,
    title: "Eco 4 (Intel Core i3 12100F + RX 6600)",
    description: "Оптимальный выбор для Full HD гейминга по доступной цене",
    price: 66000,
    resolution: "Full HD",
    category: "ECO",
    image_url: "https://cdn.poehali.dev/files/685646fc-d51b-477b-b294-12b6a80a82ea.jpg",
    specs: {
      cpu: "Intel Core i3-12100F",
      gpu: "RX 6600",
      ram: "16GB DDR4",
      storage: "512GB SSD"
    }
  },
  {
    id: 5,
    title: "Eco 5 (Intel Core i5 12400F + RTX 3060)",
    description: "Продвинутая бюджетная сборка для стабильных 60+ FPS в Full HD",
    price: 70000,
    resolution: "Full HD",
    category: "ECO",
    image_url: "https://cdn.poehali.dev/files/d241ade4-22ce-4900-a491-b83941c30138.jpg",
    specs: {
      cpu: "Intel Core i5-12400F",
      gpu: "RTX 3060",
      ram: "16GB DDR4",
      storage: "512GB SSD"
    }
  },
  {
    id: 18,
    title: "Special 1 (Ryzen 5 5600 + RTX 5060)",
    description: "Готовое решение для сборки под Full-HD Gaming на Ультра настройках графики",
    price: 95000,
    resolution: "Full HD",
    category: "SPECIAL",
    image_url: "https://cdn.poehali.dev/files/b0057820-1125-4d2f-954d-082634cd44a6.jpg",
    badge: "🔥 Хит продаж",
    specs: {
      cpu: "AMD Ryzen 5 5600",
      gpu: "RTX 5060",
      ram: "16GB DDR4",
      storage: "512GB SSD"
    }
  },
  {
    id: 19,
    title: "Special 2 (Intel Core i5 12400F + RTX 5060)",
    description: "Оптимальная сборка для игр на ультра настройках в Full HD",
    price: 115000,
    resolution: "Full HD",
    category: "SPECIAL",
    image_url: "https://cdn.poehali.dev/files/6d7728a0-edb7-4641-a890-db926f449fda.jpg",
    specs: {
      cpu: "Intel Core i5-12400F",
      gpu: "RTX 5060",
      ram: "16GB DDR4",
      storage: "512GB SSD"
    }
  },
  {
    id: 20,
    title: "Special 3 (Ryzen 5 7500F + RTX 5060)",
    description: "Мощная сборка на новой платформе для современных игр",
    price: 130000,
    resolution: "Full HD",
    category: "SPECIAL",
    image_url: "https://cdn.poehali.dev/files/e64f5e62-80bd-4d33-89e6-6d2a1eb1a3ea.jpg",
    specs: {
      cpu: "AMD Ryzen 5 7500F",
      gpu: "RTX 5060",
      ram: "16GB DDR5",
      storage: "512GB SSD"
    }
  },
  {
    id: 21,
    title: "Special 4 (Ryzen 5 7500F + RTX 5060 Ti)",
    description: "Продвинутая сборка для требовательных игр в высоком разрешении",
    price: 140000,
    resolution: "Full HD",
    category: "SPECIAL",
    image_url: "https://cdn.poehali.dev/files/ec9759c8-f83f-4e38-b820-e4ecc88e0393.jpg",
    specs: {
      cpu: "AMD Ryzen 5 7500F",
      gpu: "RTX 5060 Ti",
      ram: "16GB DDR5",
      storage: "512GB SSD"
    }
  },
  {
    id: 22,
    title: "Premium 1 (Ryzen 7 8700F + RTX 5060 Ti)",
    description: "Высокопроизводительная сборка для QHD Gaming",
    price: 145000,
    resolution: "QHD",
    category: "PREMIUM",
    image_url: "https://cdn.poehali.dev/files/79caa51e-f352-4071-8947-6d87c6de8754.jpg",
    specs: {
      cpu: "AMD Ryzen 7 8700F",
      gpu: "RTX 5060 Ti",
      ram: "32GB DDR5",
      storage: "1TB SSD"
    }
  },
  {
    id: 23,
    title: "Premium 2 (Ryzen 7 8700F + RTX 5070)",
    description: "Игровой компьютер премиум-класса для QHD на максимальных настройках",
    price: 165000,
    resolution: "QHD",
    category: "PREMIUM",
    image_url: "https://cdn.poehali.dev/files/5bfaffcf-fb2c-4f1c-a3d1-28750297e406.jpg",
    specs: {
      cpu: "AMD Ryzen 7 8700F",
      gpu: "RTX 5070",
      ram: "32GB DDR5",
      storage: "1TB SSD"
    }
  },
  {
    id: 24,
    title: "Premium 3 (Ryzen 7 7800X3D + RTX 5070)",
    description: "Топовая сборка на легендарном процессоре для геймеров",
    price: 205000,
    resolution: "QHD",
    category: "PREMIUM",
    image_url: "https://cdn.poehali.dev/files/34e17fa0-2c72-4493-97cc-8f7ace0a91df.jpg",
    specs: {
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 5070",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD"
    }
  },
  {
    id: 25,
    title: "Premium 4 (Ryzen 7 7800X3D + RTX 5070 Ti)",
    description: "Премиальная сборка для максимальной производительности в QHD",
    price: 225000,
    resolution: "QHD",
    category: "PREMIUM",
    image_url: "https://cdn.poehali.dev/files/8a8ed9ab-26a2-498e-a7bd-4132aeb73c1a.jpg",
    specs: {
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 5070 Ti",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD"
    }
  },
  {
    id: 26,
    title: "Ultra 1 (Ryzen 7 7800X3D + RTX 5070 Ti)",
    description: "Ультимативная сборка для 4K Gaming без компромиссов",
    price: 265000,
    resolution: "4K",
    category: "ULTRA",
    image_url: "https://cdn.poehali.dev/files/044e99ed-96c0-4b15-a20f-d24bc03dd8bf.jpg",
    badge: "🔥 Хит продаж",
    specs: {
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 5070 Ti",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD"
    }
  },
  {
    id: 27,
    title: "Ultra 2 (Ryzen 7 7800X3D + RTX 5080)",
    description: "Флагманская сборка для профессионального гейминга в 4K",
    price: 299000,
    resolution: "4K",
    category: "ULTRA",
    image_url: "https://cdn.poehali.dev/files/726026af-4bf4-490a-bc38-49f556de2d58.jpg",
    specs: {
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 5080",
      ram: "32GB DDR5",
      storage: "2TB NVMe SSD"
    }
  },
  {
    id: 28,
    title: "Ultra 3 (Ryzen 7 7800X3D + RTX 5080)",
    description: "Максимальная производительность для 4K Gaming и стриминга",
    price: 309000,
    resolution: "4K",
    category: "ULTRA",
    image_url: "https://cdn.poehali.dev/files/e0b8df0c-9ab8-460e-b09a-73ca20860665.jpg",
    specs: {
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "RTX 5080",
      ram: "64GB DDR5",
      storage: "2TB NVMe SSD"
    }
  },
  {
    id: 29,
    title: "Elite 1 (Ryzen 9 9950X3D + RTX 5090)",
    description: "Абсолютный топ для профессионалов и энтузиастов",
    price: 560000,
    resolution: "4K",
    category: "ELITE",
    image_url: "https://cdn.poehali.dev/files/58fe0b06-c3a8-4533-a82d-2057abfb5d7c.jpg",
    specs: {
      cpu: "AMD Ryzen 9 9950X3D",
      gpu: "RTX 5090",
      ram: "64GB DDR5",
      storage: "4TB NVMe SSD"
    }
  }
];

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
