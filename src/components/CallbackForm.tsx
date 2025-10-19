import { useState } from 'react';
import { Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const CallbackForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length === 0) return '';
    if (numbers.length <= 1) return `+7 (${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Пожалуйста, укажите ваше имя');
      return;
    }
    
    if (phone.replace(/\D/g, '').length < 11) {
      toast.error('Пожалуйста, укажите корректный номер телефона');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success(`Спасибо, ${name}! Мы перезвоним вам в ближайшее время`, {
        description: `Номер телефона: ${phone}`
      });
      
      setName('');
      setPhone('');
      setOpen(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          <Phone size={20} className="mr-2" />
          <span className="hidden sm:inline">Заказать звонок</span>
          <span className="sm:hidden">Звонок</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Заказать обратный звонок</DialogTitle>
          <DialogDescription>
            Оставьте ваши контакты и мы перезвоним вам в течение 15 минут
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="callback-name">Ваше имя</Label>
            <Input
              id="callback-name"
              placeholder="Например, Александр"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="callback-phone">Номер телефона</Label>
            <Input
              id="callback-phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhoneChange}
              required
              className="focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Отправка...
                </span>
              ) : (
                <>
                  <Phone size={16} className="mr-2" />
                  Жду звонка
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CallbackForm;
