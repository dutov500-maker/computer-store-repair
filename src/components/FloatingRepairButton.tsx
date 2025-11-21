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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import funcUrls from '../../backend/func2url.json';

export const FloatingRepairButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
          service_type: 'Срочный ремонт',
          message: message.trim() || 'Срочный вызов мастера'
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
      <button
        onClick={() => setDialogOpen(true)}
        className="fixed bottom-24 right-6 z-40 group"
        aria-label="Срочный ремонт"
      >
        <div className="relative animate-bounce-slow">
          <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-full shadow-2xl hover:scale-125 transition-all duration-300 flex items-center gap-3 pr-6 animate-pulse-glow">
            <div className="relative">
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <Icon name="Wrench" size={24} />
            </div>
            <span className="font-bold text-sm whitespace-nowrap hidden sm:inline">
              Срочный ремонт
            </span>
          </div>
        </div>
      </button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading flex items-center gap-2">
              <Icon name="Wrench" className="text-red-500" size={28} />
              Срочный вызов мастера
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="flex items-start gap-3">
                <Icon name="Clock" className="text-red-500 mt-1" size={20} />
                <div>
                  <p className="font-bold text-sm">Перезвоним в течение 15 минут</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Диагностика бесплатно. Выезд мастера по городу — бесплатно
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
                <Label htmlFor="message">Опишите проблему</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Например: компьютер не включается, пищит при запуске..."
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600" disabled={submitting}>
                {submitting ? 'Отправка...' : 'Вызвать мастера'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};