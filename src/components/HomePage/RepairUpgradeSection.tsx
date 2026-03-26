import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import funcUrls from '../../../backend/func2url.json';

const SERVICES = [
  { icon: 'Wrench', title: 'Ремонт любой сложности', desc: 'Чистка, замена термопасты, замена деталей', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: 'Zap', title: 'Апгрейд под ваш бюджет', desc: 'Добавим RAM, SSD, новую видеокарту', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { icon: 'Stethoscope', title: 'Бесплатная диагностика', desc: 'Выясним проблему без предоплаты', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: 'Truck', title: 'Выезд к вам', desc: 'Мастер приедет в удобное время', color: 'text-blue-400', bg: 'bg-blue-500/10' },
];

export const RepairUpgradeSection = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) { toast.error('Заполните имя и телефон'); return; }
    setSubmitting(true);
    try {
      const res = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: null, service_type: 'Диагностика/Апгрейд', message: 'Заявка на бесплатную диагностику с главной страницы' })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Принято! Мастер перезвонит в течение 15 минут');
        setName(''); setPhone(''); setOpen(false);
      } else { toast.error('Ошибка отправки'); }
    } catch { toast.error('Ошибка. Позвоните: +7 995 027 27 07'); }
    finally { setSubmitting(false); }
  };

  return (
    <>
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4">
              <Icon name="Wrench" size={16} className="text-primary" />
              <span className="text-sm font-semibold text-primary">РЕМОНТ И АПГРЕЙД</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Починим что угодно.<br />
              <span className="text-gradient">Бесплатная диагностика</span> в лабе.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Чиним то, от чего другие отказались. 25% наших клиентов приходят именно за ремонтом — и остаются навсегда.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {SERVICES.map((s, i) => (
              <Card
                key={i}
                className="p-5 group hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 bg-card/60 backdrop-blur animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon name={s.icon} size={24} className={s.color} />
                </div>
                <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-card to-primary/5 border-2 border-primary/30 animate-fade-in">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Мастер онлайн</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Бесплатная диагностика ПК прямо сейчас</h3>
                  <p className="text-muted-foreground text-sm mb-1">Оставьте заявку — мастер перезвонит за 15 минут.</p>
                  <p className="text-muted-foreground text-sm">Диагностика 0 ₽ при любом ремонте.</p>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                  <Button
                    size="lg"
                    className="gradient-animated px-8 font-bold shadow-lg shadow-primary/30"
                    onClick={() => setOpen(true)}
                  >
                    <Icon name="Stethoscope" size={18} className="mr-2" />
                    Записаться бесплатно
                  </Button>
                  <Link to="/services">
                    <Button variant="outline" size="lg" className="w-full border-primary/40 hover:border-primary">
                      <Icon name="List" size={16} className="mr-2" />
                      Все услуги и цены
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-heading">
              <Icon name="Stethoscope" size={22} className="text-primary" />
              Бесплатная диагностика
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <Icon name="Clock" size={18} className="text-green-400 mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                Мастер перезвонит за <span className="font-bold text-green-400">15 минут</span> и согласует удобное время
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="diag-name">Ваше имя *</Label>
                <Input id="diag-name" value={name} onChange={e => setName(e.target.value)} placeholder="Иван" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="diag-phone">Телефон *</Label>
                <Input id="diag-phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 999 123 45 67" required className="mt-1.5" />
              </div>
              <Button type="submit" size="lg" className="w-full gradient-animated font-bold" disabled={submitting}>
                {submitting ? 'Отправка...' : 'Записаться на диагностику'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
