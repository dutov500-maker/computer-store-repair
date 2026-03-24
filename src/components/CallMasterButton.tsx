import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface CallMasterButtonProps {
  service?: string;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export const CallMasterButton = ({ service, variant = 'default', className = '' }: CallMasterButtonProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [problem, setProblem] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    setSubmitting(true);

    const message = `🚗 ВЫЗОВ МАСТЕРА НА ДОМ

👤 Имя: ${name}
📞 Телефон: ${phone}
📍 Адрес: ${address}
${service ? `🔧 Услуга: ${service}` : ''}
${problem ? `📝 Описание проблемы:\n${problem}` : ''}`;

    const telegramUrl = `https://t.me/komplabvlz?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');

    toast.success('Перенаправляем в Telegram...');
    
    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      setName('');
      setPhone('');
      setAddress('');
      setProblem('');
    }, 1000);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={variant}
        className={className}
      >
        <Icon name="Car" size={18} className="mr-2" />
        Вызвать мастера на дом
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Car" size={24} className="text-orange-500" />
              Вызов мастера на дом
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <div className="flex items-start gap-2 text-sm">
                <Icon name="Info" size={18} className="text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Выезд мастера — БЕСПЛАТНО!</p>
                  <p className="text-muted-foreground text-xs">
                    Приедем в удобное для вас время. Диагностика на месте. Оплата только за выполненную работу.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например: Иван"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адрес выезда *</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Улица, дом, квартира"
                required
              />
            </div>

            {service && (
              <div className="space-y-2">
                <Label>Услуга</Label>
                <Input value={service} disabled className="bg-muted" />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="problem">Описание проблемы (опционально)</Label>
              <Textarea
                id="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Опишите что случилось с техникой..."
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
                disabled={submitting}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#0088cc] hover:bg-[#0077b5] text-white"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={18} className="mr-2" />
                    Узнать стоимость сборки
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};