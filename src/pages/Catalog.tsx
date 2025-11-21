import { useState } from 'react';
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

const STATIC_CATALOG = [
  {
    id: 15,
    title: "ECO 1 ( Ryzen 5 5500 + GTX 1080 )",
    description: "Бюджетный игровой системный блок за 45.000 руб под Full HD Gaming",
    price: 45000,
    resolution: "Full HD",
    category: "ECO",
    image_url: "https://cdn.poehali.dev/files/c34a83da-49a6-4f23-be6f-9170e632efa2.jpg",
    specs: {
      cpu: "AMD Ryzen 5 5500",
      gpu: "GTX 1080",
      ram: "16GB",
      storage: "512GB SSD"
    }
  },
  {
    id: 16,
    title: "Eco #2",
    description: "Бюджетный игровой системный блок за 50.000 руб под Full HD Gaming",
    price: 50000,
    resolution: "Full HD",
    category: "ECO",
    image_url: "https://cdn.poehali.dev/files/56cb3b09-3249-4909-977d-b29d88f7b9a3.jpg",
    specs: {
      cpu: "Intel Core i3-12100F",
      gpu: "RTX 3050",
      ram: "16GB",
      storage: "512GB SSD"
    }
  },
  {
    id: 17,
    title: "ECO 3 ( Ryzen 5 5600 + RTX 3060ti )",
    description: "Бюджетный игровой системный блок за 60.000 руб под Full HD Gaming",
    price: 65000,
    resolution: "Full HD",
    category: "ECO",
    image_url: "https://cdn.poehali.dev/files/8a36ec5e-21fd-46cb-8e25-bc66341b14c9.jpg",
    specs: {
      cpu: "AMD Ryzen 5 5600",
      gpu: "RTX 3060ti",
      ram: "16GB",
      storage: "512GB SSD"
    }
  },
  {
    id: 18,
    title: "Special 1 ( Ryzen 5600 + RTX 5060 )",
    description: "Готовое решение для сборки за 75 тысяч рублей под Full-HD Gaming на Ультра настройках графики",
    price: 75000,
    resolution: "Full HD",
    category: "SPECIAL",
    image_url: "https://cdn.poehali.dev/files/1a84e611-89ea-4feb-9364-5ab4c578d6fe.jpg",
    specs: {
      cpu: "AMD Ryzen 5 5600",
      gpu: "Palit RTX 5060 Dual 8GB",
      ram: "16GB",
      storage: "512GB SSD"
    }
  },
  {
    id: 19,
    title: "Special 2 (i5 12400F + RTX 5060)",
    description: "Готовое решение для сборки за 89 тысяч рублей под Full-HD Gaming на Ультра настройках графики",
    price: 89000,
    resolution: "Full HD",
    category: "SPECIAL",
    image_url: "https://cdn.poehali.dev/files/25848486-d127-48bf-bfdc-36a0c277e5c8.jpg",
    specs: {
      cpu: "Intel Core i5-12400F",
      gpu: "RTX 5060",
      ram: "16GB DDR4",
      storage: "512GB SSD"
    }
  },
  {
    id: 20,
    title: "Special 3 (Ryzen 8400F + RTX 5060)",
    description: "Готовое решение для сборки за 91 тысяч рублей под Full-HD Gaming на Ультра настройках графики",
    price: 91000,
    resolution: "Full HD",
    category: "SPECIAL",
    image_url: "https://cdn.poehali.dev/files/e2cab568-abdf-41af-9a9f-740013842310.jpg",
    specs: {
      cpu: "AMD Ryzen 5 8400F",
      gpu: "RTX 5060",
      ram: "16GB DDR5",
      storage: "512GB SSD"
    }
  },
  {
    id: 21,
    title: "Premium 1 ( Ryzen 7 7700 + RTX 4070 Super )",
    description: "Игровой компьютер за 135 тысяч рублей под QHD Gaming на Ультра настройках графики",
    price: 135000,
    resolution: "QHD",
    category: "PREMIUM",
    image_url: "https://cdn.poehali.dev/files/b7be6eda-2639-4f88-86a8-48abdbd07051.jpg",
    specs: {
      cpu: "AMD Ryzen 7 7700",
      gpu: "RTX 4070 Super",
      ram: "32GB DDR5",
      storage: "1TB SSD"
    }
  },
  {
    id: 22,
    title: "Premium 2 ( i5 14400F + RTX 4070 Super )",
    description: "Игровой компьютер за 145 тысяч рублей под QHD Gaming на Ультра настройках графики",
    price: 145000,
    resolution: "QHD",
    category: "PREMIUM",
    image_url: "https://cdn.poehali.dev/files/ae489047-44a3-4dde-932f-ed6a5199e352.jpg",
    specs: {
      cpu: "Intel Core i5-14400F",
      gpu: "RTX 4070 Super",
      ram: "32GB DDR5",
      storage: "1TB SSD"
    }
  },
  {
    id: 23,
    title: "Premium 3 ( i7 14700F + RTX 4070 Super )",
    description: "Игровой компьютер за 169 тысяч рублей под QHD Gaming на Ультра настройках графики",
    price: 169000,
    resolution: "QHD",
    category: "PREMIUM",
    image_url: "https://cdn.poehali.dev/files/022b9002-704a-432c-8640-8b6877016612.jpg",
    specs: {
      cpu: "Intel Core i7-14700F",
      gpu: "RTX 4070 Super",
      ram: "32GB DDR5",
      storage: "1TB SSD"
    }
  },
  {
    id: 24,
    title: "Ultra 1 ( Ryzen 7 9700X + RTX 4080 Super )",
    description: "Топовый игровой компьютер за 205 тысяч рублей под 4K Gaming",
    price: 205000,
    resolution: "4K",
    category: "ULTRA",
    image_url: "https://cdn.poehali.dev/files/cd49eac6-95f0-48e5-a2e2-3987a99a7e44.jpg",
    specs: {
      cpu: "AMD Ryzen 7 9700X",
      gpu: "RTX 4080 Super",
      ram: "32GB DDR5",
      storage: "2TB SSD"
    }
  },
  {
    id: 25,
    title: "Ultra 2 ( i7 14700F + RTX 4080 Super )",
    description: "Топовый игровой компьютер за 215 тысяч рублей под 4K Gaming",
    price: 215000,
    resolution: "4K",
    category: "ULTRA",
    image_url: "https://cdn.poehali.dev/files/7ab77389-609a-4e35-8e36-e100031e6bae.jpg",
    specs: {
      cpu: "Intel Core i7-14700F",
      gpu: "RTX 4080 Super",
      ram: "32GB DDR5",
      storage: "2TB SSD"
    }
  },
  {
    id: 26,
    title: "Ultra 3 ( i9 14900F + RTX 4090 )",
    description: "Максимальная производительность для 4K Gaming без компромиссов",
    price: 350000,
    resolution: "4K",
    category: "ULTRA",
    image_url: "https://cdn.poehali.dev/files/8f7c4b94-c6cc-4755-acd9-b8a2a84bd597.jpg",
    specs: {
      cpu: "Intel Core i9-14900F",
      gpu: "RTX 4090",
      ram: "64GB DDR5",
      storage: "2TB NVMe SSD"
    }
  },
  {
    id: 27,
    title: "Ultra 4 ( i9 14900KS + RTX 4090 )",
    description: "Абсолютный топ для профессионального гейминга и стриминга в 4K",
    price: 450000,
    resolution: "4K",
    category: "ULTRA",
    image_url: "https://cdn.poehali.dev/files/47a9814a-0246-4ac6-aa93-a35c472f606f.jpg",
    specs: {
      cpu: "Intel Core i9-14900KS",
      gpu: "RTX 4090",
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
    default:
      return 'bg-primary/10 text-primary border-primary/30';
  }
};

const Catalog = () => {
  const [catalog] = useState<any[]>(STATIC_CATALOG);
  const [selectedPC, setSelectedPC] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const loading = false;
  const error = null;

  const handlePCClick = (pc: any) => {
    setSelectedPC(pc);
    setDialogOpen(true);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: null,
          service_type: 'Заказ ПК',
          message: pcMessage
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время');
        setName('');
        setPhone('');
        setMessage('');
        setDialogOpen(false);
      } else {
        toast.error(data.error || 'Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Ошибка при отправке заявки. Попробуйте позвонить нам: +7 995 027 27 07');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen page-transition">
      <Header />
      
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">🎮 ГОТОВЫЕ СБОРКИ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Каталог <span className="text-gradient">игровых ПК</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите готовую конфигурацию или создайте индивидуальную сборку
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка каталога...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Ошибка загрузки: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catalog.map((pc, index) => (
              <Card 
                key={pc.id}
                onClick={() => handlePCClick(pc)}
                className={`group relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 animate-fade-in hover:-translate-y-3 border-2 bg-gradient-to-br ${getCategoryColor(pc.category)}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getCategoryBadgeColor(pc.category)}`}>
                      {pc.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/90 text-white border border-primary">
                      {pc.resolution}
                    </span>
                  </div>
                  <img 
                    src={pc.image_url} 
                    alt={pc.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                </div>

                <div className="p-5 relative">
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {pc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {pc.description}
                  </p>

                  <div className="space-y-2 mb-4 text-xs">
                    <div className="flex items-center gap-2">
                      <Icon name="Cpu" size={14} className="text-primary" />
                      <span className="text-muted-foreground">{pc.specs.cpu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Monitor" size={14} className="text-primary" />
                      <span className="text-muted-foreground">{pc.specs.gpu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="MemoryStick" size={14} className="text-primary" />
                      <span className="text-muted-foreground">{pc.specs.ram} • {pc.specs.storage}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground">Цена</p>
                      <p className="text-2xl font-bold text-gradient">
                        {pc.price.toLocaleString()} ₽
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      className="gradient-animated opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-1" />
                      Заказать
                    </Button>
                  </div>
                </div>

                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">
              {selectedPC?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <img 
                src={selectedPC?.image_url} 
                alt={selectedPC?.title}
                className="w-full h-full object-cover"
              />
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
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 999 123 45 67"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Дополнительные пожелания</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Например: нужен монитор, хочу RGB подсветку..."
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full gradient-animated text-lg" size="lg" disabled={submitting}>
                {submitting ? 'Отправка...' : 'Заказать эту сборку'}
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
