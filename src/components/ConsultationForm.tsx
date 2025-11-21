import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import funcUrls from '../../backend/func2url.json';

const ConsultationForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast.error('Пожалуйста, заполните имя и телефон');
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
          service_type: 'Консультация',
          message: message.trim() || 'Запрос на консультацию'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время');
        setName('');
        setPhone('');
        setMessage('');
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
    <Card className="p-8 max-w-2xl w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-base mb-2 block">
            Ваше имя <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться?"
            className="h-12"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-base mb-2 block">
            Телефон <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className="h-12"
            required
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-base mb-2 block">
            Сообщение (опционально)
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Расскажите, что вас интересует..."
            className="min-h-[100px]"
          />
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" className="text-primary mt-1 flex-shrink-0" size={20} />
            <p className="text-sm text-muted-foreground">
              Мы не передаём ваши данные третьим лицам. Используем только для связи по вашей заявке.
            </p>
          </div>
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full text-lg h-14"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Icon name="Loader2" className="animate-spin" size={20} />
              Отправка...
            </>
          ) : (
            <>
              <Icon name="Send" size={20} />
              Отправить заявку
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ConsultationForm;
