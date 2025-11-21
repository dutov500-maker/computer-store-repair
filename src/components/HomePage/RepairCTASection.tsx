import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import funcUrls from '../../../backend/func2url.json';

export const RepairCTASection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const urgentServices = [
    { icon: 'AlertCircle', text: 'Компьютер не включается' },
    { icon: 'ThermometerSun', text: 'Перегревается и шумит' },
    { icon: 'MonitorX', text: 'Нет изображения на экране' },
    { icon: 'HardDrive', text: 'Медленно работает' },
    { icon: 'Wifi', text: 'Не подключается к сети' },
    { icon: 'Bug', text: 'Заражен вирусами' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast.error('Заполните имя и телефон');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: null,
          service_type: 'Срочный звонок',
          message: message.trim() || 'Прошу перезвонить для консультации по ремонту'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Заявка отправлена! Мы перезвоним в течение 15 минут');
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
    <>
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.15),transparent_50%)]"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                <span className="text-sm font-semibold text-red-500">🚨 СРОЧНЫЙ РЕМОНТ</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Компьютер <span className="text-gradient">сломался?</span><br />
                Починим быстро!
              </h2>
              
              <p className="text-xl text-muted-foreground">
                Профессиональная диагностика бесплатно. Большинство ремонтов выполняем за 1-2 дня
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/services">
                  <Button size="lg" className="gradient-animated text-lg px-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                    <Icon name="Wrench" className="mr-2" size={20} />
                    Все услуги по ремонту
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 border-2 hover:scale-105 transition-all"
                  onClick={() => setDialogOpen(true)}
                >
                  <Icon name="Phone" className="mr-2" size={20} />
                  Заказать звонок
                </Button>
              </div>

              <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-xl">
                    <Icon name="BadgeCheck" className="text-green-500" size={32} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Гарантия до 6 месяцев</p>
                    <p className="text-sm text-muted-foreground">На все виды ремонтных работ</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4 animate-slide-up">
              <h3 className="text-2xl font-heading font-bold mb-6">Типичные проблемы, которые мы решаем:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {urgentServices.map((service, index) => (
                  <Card 
                    key={index}
                    className="p-4 hover:border-primary transition-all duration-300 hover:scale-105 group cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
                        <Icon name={service.icon as any} size={20} className="text-primary group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-sm font-medium">{service.text}</p>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="p-6 bg-primary/5 border-primary/30 mt-6">
                <div className="flex items-start gap-3">
                  <Icon name="Clock" className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-bold mb-2">Работаем быстро</p>
                    <p className="text-sm text-muted-foreground">
                      Диагностика — в течение дня. Простой ремонт — 1-2 дня. Сложный — до недели с гарантией качества
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading flex items-center gap-2">
              <Icon name="Phone" className="text-primary" size={28} />
              Заказать обратный звонок
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <Icon name="Clock" className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-bold text-sm">Перезвоним в течение 15 минут</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Бесплатная консультация по ремонту и диагностике
                  </p>
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
                <Label htmlFor="message">Опишите проблему (опционально)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Например: компьютер не включается, нужна чистка от пыли..."
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full gradient-animated" size="lg" disabled={submitting}>
                {submitting ? 'Отправка...' : 'Заказать звонок'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
