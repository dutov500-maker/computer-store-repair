import { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const allowedRoutes = ['/', '/services'];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!allowedRoutes.includes(location.pathname)) {
    return null;
  }

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
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="Срочный ремонт"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#FF6B00] blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
          <div className="relative bg-[#FF6B00] hover:bg-[#FF8A2E] text-black p-3 flex items-center gap-2 pr-4 border-2 border-[#FF6B00] shadow-[0_0_24px_rgba(255,107,0,0.5)] group-hover:shadow-[0_0_40px_rgba(255,107,0,0.8)] transition-all">
            <div className="relative">
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 bg-white" />
              </span>
              <Icon name="Wrench" size={18} />
            </div>
            <span className="font-bold text-[10px] tracking-[0.2em] uppercase whitespace-nowrap hidden sm:inline">
              Срочный ремонт
            </span>
          </div>
        </div>
      </button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg bg-[#0A0A0A] border-2 border-[#FF6B00]/40 text-white rounded-none">
          <DialogHeader>
            <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-2">
              // Srochnyy vyzov
            </div>
            <DialogTitle className="font-heading text-2xl md:text-3xl font-black uppercase flex items-center gap-3 text-white">
              <Icon name="Wrench" className="text-[#FF6B00]" size={28} />
              Вызов мастера
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-[#FF6B00]/10 border border-[#FF6B00]/30">
              <div className="flex items-start gap-3">
                <Icon name="Clock" className="text-[#FF6B00] mt-1" size={18} />
                <div>
                  <p className="font-bold text-sm text-white uppercase tracking-wider">Перезвон за 15 минут</p>
                  <p className="text-xs text-white/60 mt-1">
                    Диагностика и выезд по городу — бесплатно.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="font-mono text-xs tracking-widest uppercase text-white/60">Имя *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="bg-[#0D0D0D] border-white/10 focus:border-[#FF6B00] rounded-none mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="font-mono text-xs tracking-widest uppercase text-white/60">Телефон *</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 999 123 45 67"
                  className="bg-[#0D0D0D] border-white/10 focus:border-[#FF6B00] rounded-none mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message" className="font-mono text-xs tracking-widest uppercase text-white/60">Проблема</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Компьютер не включается, пищит при запуске..."
                  rows={4}
                  className="bg-[#0D0D0D] border-white/10 focus:border-[#FF6B00] rounded-none mt-2"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold tracking-widest uppercase rounded-none py-6"
                disabled={submitting}
              >
                {submitting ? 'Отправка...' : 'Вызвать мастера'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};