import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import funcUrls from '../../backend/func2url.json';
import { repairImages } from '@/data/repairImages';
import { FAQSchema, commonFAQs } from '@/components/FAQSchema';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';


const STATIC_SERVICES = [
  {
    id: 1,
    title: "Диагностика компьютера",
    description: "Полная проверка всех компонентов системы",
    icon: "Search",
    price: "Бесплатно"
  },
  {
    id: 2,
    title: "Чистка от пыли",
    description: "Профессиональная чистка системного блока",
    icon: "Wind",
    price: "от 500 ₽"
  },
  {
    id: 3,
    title: "Замена термопасты",
    description: "Замена термопасты на процессоре и видеокарте",
    icon: "Droplet",
    price: "от 800 ₽"
  },
  {
    id: 4,
    title: "Установка Windows",
    description: "Установка и настройка операционной системы",
    icon: "HardDrive",
    price: "от 1000 ₽"
  },
  {
    id: 5,
    title: "Ремонт материнской платы",
    description: "Диагностика и ремонт неисправностей",
    icon: "Cpu",
    price: "от 2000 ₽"
  },
  {
    id: 6,
    title: "Замена блока питания",
    description: "Подбор и установка нового БП",
    icon: "Zap",
    price: "от 500 ₽"
  },
  {
    id: 7,
    title: "Апгрейд компьютера",
    description: "Модернизация и улучшение характеристик",
    icon: "TrendingUp",
    price: "от 1000 ₽"
  },
  {
    id: 8,
    title: "Восстановление данных",
    description: "Восстановление файлов с HDD/SSD",
    icon: "Database",
    price: "от 3000 ₽"
  },
  {
    id: 9,
    title: "Настройка BIOS",
    description: "Оптимизация параметров системы",
    icon: "Settings",
    price: "от 800 ₽"
  },
  {
    id: 10,
    title: "Удаление вирусов",
    description: "Полная очистка от вредоносного ПО",
    icon: "Shield",
    price: "от 1500 ₽"
  },
  {
    id: 11,
    title: "Замена кулера",
    description: "Установка нового охлаждения",
    icon: "Fan",
    price: "от 700 ₽"
  },
  {
    id: 12,
    title: "Ремонт видеокарты",
    description: "Диагностика и устранение неисправностей GPU",
    icon: "MonitorCheck",
    price: "от 2500 ₽"
  },
  {
    id: 13,
    title: "Установка драйверов",
    description: "Поиск и установка актуальных драйверов",
    icon: "Download",
    price: "от 500 ₽"
  },
  {
    id: 14,
    title: "Настройка сети",
    description: "Подключение к интернету и локальной сети",
    icon: "Wifi",
    price: "от 800 ₽"
  },
  {
    id: 15,
    title: "Замена жесткого диска",
    description: "Установка HDD/SSD с переносом данных",
    icon: "HardDrive",
    price: "от 1200 ₽"
  },
  {
    id: 16,
    title: "Ремонт ноутбука",
    description: "Диагностика и ремонт ноутбуков любых марок",
    icon: "Laptop",
    price: "от 1000 ₽"
  },
  {
    id: 17,
    title: "Замена экрана ноутбука",
    description: "Замена матрицы на ноутбуке",
    icon: "Monitor",
    price: "от 3000 ₽"
  },
  {
    id: 18,
    title: "Чистка ноутбука от пыли",
    description: "Профессиональная чистка системы охлаждения",
    icon: "Wind",
    price: "от 800 ₽"
  },
  {
    id: 19,
    title: "Замена клавиатуры ноутбука",
    description: "Замена неисправной клавиатуры",
    icon: "Keyboard",
    price: "от 1500 ₽"
  },
  {
    id: 20,
    title: "Ремонт планшета",
    description: "Диагностика и ремонт планшетов",
    icon: "Tablet",
    price: "от 1500 ₽"
  },
  {
    id: 21,
    title: "Замена экрана планшета",
    description: "Замена дисплея на планшете",
    icon: "TabletSmartphone",
    price: "от 2500 ₽"
  },
  {
    id: 22,
    title: "Ремонт телефона",
    description: "Диагностика и ремонт смартфонов",
    icon: "Smartphone",
    price: "от 1000 ₽"
  },
  {
    id: 23,
    title: "Замена экрана телефона",
    description: "Замена дисплея iPhone, Samsung, Xiaomi и др.",
    icon: "Smartphone",
    price: "от 2000 ₽"
  },
  {
    id: 24,
    title: "Замена батареи телефона",
    description: "Замена аккумулятора на смартфоне",
    icon: "Battery",
    price: "от 1200 ₽"
  },
  {
    id: 25,
    title: "Ремонт разъема зарядки",
    description: "Замена или ремонт USB разъема",
    icon: "Cable",
    price: "от 1500 ₽"
  },
  {
    id: 26,
    title: "Замена камеры телефона",
    description: "Замена основной или фронтальной камеры",
    icon: "Camera",
    price: "от 1800 ₽"
  }
];

const Services = () => {
  const [services] = useState<any[]>(STATIC_SERVICES);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const generateServiceSchema = () => {
    const serviceOffers = services.map((service) => {
      const priceMatch = service.price.match(/\d+/);
      const price = priceMatch ? priceMatch[0] : '0';
      const isFree = service.price.toLowerCase().includes('бесплатно');
      
      return {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        },
        "price": isFree ? '0' : price,
        "priceCurrency": "RUB",
        "availability": "https://schema.org/InStock",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": isFree ? '0' : price,
          "priceCurrency": "RUB",
          "valueAddedTaxIncluded": true
        }
      };
    });

    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://комплаб.рф",
      "name": "Компьютерная Лаборатория",
      "description": "Профессиональный ремонт компьютеров, ноутбуков, планшетов и телефонов в Волжском",
      "url": "https://комплаб.рф/services",
      "telephone": "+79950272707",
      "email": "complab34@gmail.com",
      "priceRange": "₽₽",
      "image": "https://cdn.poehali.dev/files/1258a3ce-944b-46de-88b7-5a629a1775c1.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Волжский",
        "addressRegion": "Волгоградская область",
        "addressCountry": "RU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "48.7894",
        "longitude": "44.7742"
      },
      "openingHours": "Mo-Fr 09:00-18:00",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "50",
        "bestRating": "5",
        "worstRating": "1"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Услуги ремонта",
        "itemListElement": serviceOffers
      },
      "sameAs": [
        "https://vk.com/labkomp",
        "https://wa.me/79950272707"
      ]
    };
  };

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast.error('Заполните имя и телефон');
      return;
    }

    setSubmitting(true);

    try {
      const serviceMessage = `Услуга: ${selectedService.title}\nЦена: ${selectedService.price}\n\nДополнительно: ${message.trim() || 'Не указано'}`;

      const response = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: null,
          service_type: selectedService.title,
          message: serviceMessage
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
        toast.error('Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Ошибка при отправке. Позвоните нам: +7 995 027 27 07');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen page-transition">
      <Helmet>
        <title>Ремонт компьютеров, ноутбуков, планшетов и телефонов в Волжском - Компьютерная Лаборатория</title>
        <meta name="description" content="Профессиональный ремонт компьютеров, ноутбуков, планшетов и телефонов в Волжском. Диагностика бесплатно, замена комплектующих, чистка от пыли, ремонт материнских плат, замена экранов. Гарантия до 6 месяцев. ☎️ +7 (995) 027-27-07" />
        <meta name="keywords" content="ремонт компьютеров волжский, ремонт ноутбуков волжский, ремонт планшетов волжский, ремонт телефонов волжский, ремонт смартфонов волжский, компьютерный мастер волжский, чистка компьютера волжский, замена термопасты волжский, установка windows волжский, диагностика пк волжский, ремонт видеокарты волжский, замена блока питания волжский, замена экрана телефона волжский, замена батареи телефона волжский, ремонт айфона волжский, ремонт samsung волжский" />
        <meta property="og:title" content="Ремонт компьютеров, ноутбуков, планшетов и телефонов в Волжском" />
        <meta property="og:description" content="Профессиональный ремонт компьютеров, ноутбуков, планшетов и смартфонов с гарантией. Диагностика бесплатно. ☎️ +7 (995) 027-27-07" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://комплаб.рф/services" />
        <link rel="canonical" href="https://комплаб.рф/services" />
      </Helmet>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema()) }}
      />
      
      <FAQSchema faqs={commonFAQs} />
      
      <Header />
      
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Услуги по <span className="text-primary">ремонту</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Профессиональный ремонт компьютеров, ноутбуков, планшетов и телефонов в Волжском
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className="p-6 hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleServiceClick(service)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name={service.icon} size={28} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {service.description}
                  </p>
                  <div className="text-primary font-bold">
                    {service.price}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Примеры наших работ
            </h2>
            <p className="text-muted-foreground">
              Профессиональный ремонт компьютеров, ноутбуков, планшетов и телефонов
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {repairImages.map((image, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden group cursor-pointer h-full">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 line-clamp-1">{image.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/repair-gallery" className="gap-2">
                Смотреть все работы
                <Icon name="ArrowRight" size={18} />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            Наши преимущества
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Icon name="Clock" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold mb-2">Быстрый ремонт</h3>
              <p className="text-sm text-muted-foreground">Большинство работ выполняем за 1-2 дня</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold mb-2">Гарантия</h3>
              <p className="text-sm text-muted-foreground">На все виды работ до 6 месяцев</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Icon name="Wrench" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold mb-2">Опытные мастера</h3>
              <p className="text-sm text-muted-foreground">Более 10 лет опыта в ремонте ПК</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Icon name="BadgeCheck" size={32} className="text-primary" />
              </div>
              <h3 className="font-bold mb-2">Оригинальные запчасти</h3>
              <p className="text-sm text-muted-foreground">Только качественные комплектующие</p>
            </div>
          </div>
        </div>
      </section>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">
              Заказать: {selectedService?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name={selectedService?.icon || 'Wrench'} size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{selectedService?.description}</p>
                  <p className="text-xl font-bold text-primary mt-1">{selectedService?.price}</p>
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
                <Label htmlFor="message">Дополнительная информация</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Опишите проблему или уточните детали..."
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Отправка...' : 'Отправить заявку'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Services;