import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import { HeroSection } from '@/components/HomePage/HeroSection';
import { ConsultationSection } from '@/components/HomePage/ConsultationSection';
import { CatalogSection } from '@/components/HomePage/CatalogSection';
import { ServicesSection } from '@/components/HomePage/ServicesSection';
import { RepairsSection } from '@/components/HomePage/RepairsSection';
import { FAQSection } from '@/components/HomePage/FAQSection';
import { StatsSection } from '@/components/HomePage/StatsSection';
import { ConsultationFormSection } from '@/components/HomePage/ConsultationFormSection';
import { PortfolioSection } from '@/components/HomePage/PortfolioSection';
import funcUrls from '../../backend/func2url.json';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [services, setServices] = useState<any[]>([]);
  const [repairs, setRepairs] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [orderDialog, setOrderDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [orderType, setOrderType] = useState('service');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const servicesRes = await fetch(`${funcUrls.api}?type=services`);
      const servicesData = await servicesRes.json();
      setServices(servicesData);

      const repairsRes = await fetch(`${funcUrls.api}?type=repairs`);
      const repairsData = await repairsRes.json();
      setRepairs(repairsData);

      const portfolioRes = await fetch(`${funcUrls.api}?type=portfolio`);
      const portfolioData = await portfolioRes.json();
      setPortfolio(portfolioData);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  const handleOrderClick = (item: any, type: string) => {
    setSelectedItem(item);
    setOrderType(type);
    setOrderDialog(true);
  };

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          order_type: orderType,
          item_title: selectedItem?.title,
          message: formData.get('message')
        })
      });

      if (response.ok) {
        toast({
          title: 'Заказ принят!',
          description: 'Мы свяжемся с вами в ближайшее время'
        });
        setOrderDialog(false);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заказ',
        variant: 'destructive'
      });
    }
  };

  const advantages = [
    {
      icon: 'Package',
      title: 'Только новые комплектующие',
      description: 'Работаем только с официальными поставщиками'
    },
    {
      icon: 'Truck',
      title: 'Бесплатная доставка',
      description: 'По Волжскому при заказе от 50 000 ₽'
    },
    {
      icon: 'Shield',
      title: 'Гарантия качества',
      description: 'До 3 лет на все комплектующие'
    },
    {
      icon: 'Wrench',
      title: 'Бесплатный ремонт',
      description: 'В течение гарантийного срока'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      <Header />
      <HeroSection />
      <StatsSection />
      <ConsultationSection />
      <CatalogSection />
      <ServicesSection services={services} advantages={advantages} />
      <RepairsSection repairs={repairs} onOrderClick={(item) => handleOrderClick(item, 'repair')} />
      <PortfolioSection portfolio={portfolio} />
      <FAQSection />
      <ConsultationFormSection />
      <Footer />

      <Dialog open={orderDialog} onOpenChange={setOrderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Заказать: {selectedItem?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <Input name="name" placeholder="Ваше имя" required />
            </div>
            <div>
              <Input name="phone" placeholder="Телефон" required />
            </div>
            <div>
              <Input name="email" type="email" placeholder="Email (необязательно)" />
            </div>
            <div>
              <Textarea name="message" placeholder="Комментарий к заказу (необязательно)" />
            </div>
            <Button type="submit" className="w-full">Отправить заявку</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;