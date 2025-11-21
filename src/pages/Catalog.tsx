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
    image_url: "https://cdn.poehali.dev/files/47a9814a-0246-4ac6-aa93-a35c472f606f.jpg",
    specs: {
      cpu: "Intel Core i9-14900KS",
      gpu: "RTX 4090",
      ram: "64GB DDR5",
      storage: "4TB NVMe SSD"
    }
  }
];

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
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Каталог компьютеров
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите готовую сборку под ваши задачи или создайте уникальную конфигурацию
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-heading font-bold mb-8">Игровые компьютеры</h2>
          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
              <p className="text-muted-foreground">Загрузка...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <Icon name="AlertCircle" className="mx-auto mb-4 text-destructive" size={64} />
              <p className="text-muted-foreground mb-4">{error}</p>
            </div>
          ) : catalog.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Package" className="mx-auto mb-4 text-muted-foreground" size={64} />
              <p className="text-muted-foreground">Товары временно отсутствуют</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalog.map((pc, index) => (
              <Card 
                key={pc.id} 
                className="overflow-hidden bg-card hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handlePCClick(pc)}
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-secondary to-background">
                  {pc.image_url ? (
                    <img 
                      src={pc.image_url} 
                      alt={pc.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="Monitor" size={64} className="text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                    {pc.resolution}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold mb-4">{pc.title}</h3>
                  {pc.description && (
                    <p className="text-muted-foreground mb-4 text-sm">{pc.description}</p>
                  )}
                  {pc.specs && (
                    <ul className="space-y-2 mb-6">
                      {Object.entries(pc.specs).map(([key, value], i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={16} className="text-primary" />
                          <span className="capitalize">{key}:</span> {value as string}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">От</div>
                      <div className="text-2xl font-heading font-bold">{pc.price.toLocaleString()} ₽</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          )}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Не нашли подходящую конфигурацию?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Мы подберем комплектующие специально под ваши задачи и бюджет
          </p>
          <a href="/#pc-selection">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Icon name="Settings" size={20} />
              Собрать свой компьютер
            </Button>
          </a>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedPC?.title}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Цена:</span>
                <span className="text-2xl font-bold">{selectedPC?.price.toLocaleString()} ₽</span>
              </div>
              {selectedPC?.specs && (
                <ul className="space-y-1 mt-4">
                  {Object.entries(selectedPC.specs).map(([key, value], i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={14} className="text-primary" />
                      <span className="capitalize text-muted-foreground">{key}:</span> {value as string}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <Label htmlFor="order-name" className="text-base mb-2 block">
                Ваше имя <span className="text-destructive">*</span>
              </Label>
              <Input
                id="order-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться?"
                className="h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="order-phone" className="text-base mb-2 block">
                Телефон <span className="text-destructive">*</span>
              </Label>
              <Input
                id="order-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="order-message" className="text-base mb-2 block">
                Комментарий (опционально)
              </Label>
              <Textarea
                id="order-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Дополнительные пожелания, вопросы..."
                className="min-h-[100px]"
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-lg h-14"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Icon name="Loader2" className="animate-spin" size={20} />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Send" size={20} />
                  Отправить заявку
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Catalog;