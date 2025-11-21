import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ServiceRequestForm from '@/components/ServiceRequestForm';
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
import funcUrls from '../../../backend/func2url.json';

interface Service {
  id?: number;
  title: string;
  description: string;
  price: string;
  icon?: string;
  features?: string[];
  is_active?: boolean;
}

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  services: Service[];
  advantages: Advantage[];
  fullPage?: boolean;
}

export const ServicesSection = ({ services, advantages, fullPage = false }: ServicesSectionProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleServiceClick = (service: Service) => {
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
      const serviceMessage = `Услуга: ${selectedService?.title}\nЦена: ${selectedService?.price}\n\nДополнительно: ${message.trim() || 'Не указано'}`;

      const response = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: null,
          service_type: selectedService?.title,
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
    <section id="services" className={`py-20 bg-gradient-to-b from-background to-primary/5 ${fullPage ? 'min-h-screen' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">🔧 РЕМОНТ И ОБСЛУЖИВАНИЕ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Услуги по <span className="text-gradient">ремонту</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Профессиональный ремонт любой сложности с гарантией
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.length > 0 ? services.map((service, index) => (
            <Card 
              key={service.id || index}
              className="group relative overflow-hidden p-6 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-slide-up hover:-translate-y-3 border-primary/10 hover:border-primary/30 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleServiceClick(service)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="mb-4">
                  <div className="inline-flex p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/50">
                    <Icon name={service.icon || 'Wrench'} className="text-primary group-hover:text-white transition-colors" size={28} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-gradient mb-4">{service.price}</div>
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 border-t border-border pt-4">
                    {service.features.map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                          <Icon name="Check" size={12} className="text-primary" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          )) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Загрузка услуг...
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <ServiceRequestForm />
        </div>

        <div className="text-center mb-12 mt-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Почему <span className="text-gradient">выбирают нас</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <Card 
              key={index} 
              className="group p-6 text-center hover:shadow-xl transition-all duration-500 animate-slide-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:scale-110 transition-transform"></div>
                <div className="relative inline-flex p-4 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name={item.icon as any} className="text-primary" size={32} />
                </div>
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>

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
    </section>
  );
};