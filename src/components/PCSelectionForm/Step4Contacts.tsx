import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Step4ContactsProps {
  name: string;
  phone: string;
  email: string;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
}

export const Step4Contacts = ({
  name,
  phone,
  email,
  onNameChange,
  onPhoneChange,
  onEmailChange,
  onSubmit,
  onBack,
  submitting
}: Step4ContactsProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">
          Как с вами связаться?
        </h3>
        <p className="text-muted-foreground">Мы подберём идеальную конфигурацию и свяжемся с вами</p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <div>
          <Label htmlFor="name" className="text-base mb-2 block">
            Ваше имя <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
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
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className="h-12"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-base mb-2 block">
            Email (опционально)
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="your@email.com"
            className="h-12"
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
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          Назад
        </Button>
        <Button size="lg" onClick={onSubmit} disabled={submitting}>
          {submitting ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </div>
    </div>
  );
};
