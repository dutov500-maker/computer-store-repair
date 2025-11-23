import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
    id: 1,
    title: "Eco 1 (Ryzen 5 5500 + RTX 1660 Super)",
    description: "Бюджетная сборка для комфортной игры в популярные игры на средних настройках",
    price: 45000,
    resolution: "HD",
    category: "ECO",
    image_url: "https://cdn.poehali.dev/files/206fb641-30d1-4d87-b3ec-322e0f76a02e.jpg",
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
    price: 49500,
    resolution: "Full HD",
    category: "ECO",
    image_url: "https://cdn.poehali.dev/files/89621141-3188-48fd-a9eb-52b97c276daf.jpg",
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
    price: 53000,
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
    price: 56000,
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
    price: 60000,
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
    price: 79000,
    resolution: "Full HD",
    category: "SPECIAL",
    image_url: "https://cdn.poehali.dev/files/b0057820-1125-4d2f-954d-082634cd44a6.jpg",
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
    price: 92500,
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
    price: 99000,
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
    price: 113500,
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
    price: 115000,
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
    price: 139000,
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
    price: 175000,
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
    price: 205000,
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
    price: 235000,
    resolution: "4K",
    category: "ULTRA",
    image_url: "https://cdn.poehali.dev/files/044e99ed-96c0-4b15-a20f-d24bc03dd8bf.jpg",
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
    price: 255000,
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
    price: 270000,
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
    price: 530000,
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

const Catalog = () => {
  const [catalog] = useState<any[]>(STATIC_CATALOG);
  const [selectedPC, setSelectedPC] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const seoTitle = "Купить компьютер в Волжском - Готовые игровые ПК | Компьютерная Лаборатория";
  const seoDescription = "Купить готовый игровой компьютер в Волжском. Сборки от 45 000₽. Новые комплектующие, гарантия до 3 лет. Бесплатная доставка от 50 000₽. ☎️ +7 (995) 027-27-07";
  
  const loading = false;
  const error = null;

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
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="купить компьютер волжский, игровой компьютер волжский, игровой пк волжский, купить пк волжский, готовые сборки пк волжский, компьютер для игр волжский, мощный компьютер волжский, купить игровой компьютер волжский" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <link rel="canonical" href="https://комплаб.рф/catalog" />
      </Helmet>
      <Header />
      
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">🎮 ГОТОВЫЕ СБОРКИ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Каталог <span className="text-gradient">игровых ПК</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Выберите готовую конфигурацию или создайте индивидуальную сборку
          </p>

          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto mb-8">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`group relative px-6 py-3 rounded-xl border-2 transition-all duration-300 animate-fade-in hover:scale-105 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-br from-primary to-primary/80 border-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2">
                  <Icon 
                    name={filter.icon as any} 
                    size={20} 
                    className={activeFilter === filter.id ? 'text-white' : 'text-primary'}
                  />
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{filter.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activeFilter === filter.id 
                          ? 'bg-white/20' 
                          : 'bg-primary/10'
                      }`}>
                        {filter.count}
                      </span>
                    </div>
                    {filter.description && (
                      <span className={`text-xs ${
                        activeFilter === filter.id 
                          ? 'text-white/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {filter.description}
                      </span>
                    )}
                  </div>
                </div>
                {activeFilter === filter.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-white rounded-full animate-slide-in-left"></div>
                )}
              </button>
            ))}
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
              <Card 
                key={pc.id}
                onClick={() => handlePCClick(pc)}
                className={`group relative overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 animate-fade-in hover:-translate-y-2 border-2 bg-card/50 backdrop-blur-sm`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-sm border-2 ${getCategoryBadgeColor(pc.category)} shadow-lg`}>
                      {pc.category}
                    </span>
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

                <div className="p-6 relative">
                  <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {pc.title}
                  </h3>
                  <p className="text-base text-muted-foreground mb-5 line-clamp-2">
                    {pc.description}
                  </p>

                  <div className="space-y-2.5 mb-5 text-sm">
                    <div className="flex items-center gap-2.5">
                      <Icon name="Cpu" size={16} className="text-primary" />
                      <span className="text-muted-foreground">{pc.specs.cpu}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Icon name="Monitor" size={16} className="text-primary" />
                      <span className="text-muted-foreground">{pc.specs.gpu}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Icon name="MemoryStick" size={16} className="text-primary" />
                      <span className="text-muted-foreground">{pc.specs.ram} • {pc.specs.storage}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-border/50">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Цена</p>
                      <p className="text-3xl font-bold text-gradient">
                        {pc.price.toLocaleString()} ₽
                      </p>
                    </div>
                    <Button 
                      size="default" 
                      className="gradient-animated opacity-0 group-hover:opacity-100 transition-opacity shadow-lg px-6"
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Заказать
                    </Button>
                  </div>
                </div>

                <div className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-orange-500 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl"></div>
              </Card>
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