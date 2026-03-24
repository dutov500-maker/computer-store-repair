import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const QuickPCCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const purposes = [
    { value: 'gaming', label: '🎮 Игры', icon: 'Gamepad2' },
    { value: 'work', label: '💼 Работа/Учеба', icon: 'Briefcase' },
    { value: 'content', label: '🎬 Монтаж видео', icon: 'Video' },
    { value: 'universal', label: '🌟 Универсальный', icon: 'Sparkles' }
  ];

  const budgets = [
    '50 000 - 70 000 ₽',
    '70 000 - 100 000 ₽',
    '100 000 - 150 000 ₽',
    '150 000 - 200 000 ₽',
    'Более 200 000 ₽'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.purpose || !formData.budget) {
      toast.error('Пожалуйста, выберите назначение и бюджет');
      return;
    }

    setIsSubmitting(true);

    const purposeLabel = purposes.find(p => p.value === formData.purpose)?.label || formData.purpose;
    const telegramMessage = `🖥 Запрос на подбор ПК\n\n👤 Имя: ${formData.name}\n📱 Телефон: ${formData.phone}\n🎯 Назначение: ${purposeLabel}\n💰 Бюджет: ${formData.budget}`;
    
    window.open(`https://t.me/komplab_vlz?text=${encodeURIComponent(telegramMessage)}`, '_blank');
    
    toast.success('Запрос отправлен! Мы подберём идеальную конфигурацию для вас');
    
    setFormData({ name: '', phone: '', budget: '', purpose: '' });
    setIsSubmitting(false);
  };

  return (
    <Card className="p-8 gradient-card border-primary/20 shadow-xl">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-primary/20 rounded-xl mb-4">
          <Icon name="Calculator" size={32} className="text-primary" />
        </div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
          Быстрый расчёт ПК
        </h3>
        <p className="text-muted-foreground">
          Подберём оптимальную конфигурацию под ваш бюджет за 5 минут
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">
            Для чего нужен компьютер? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {purposes.map((purpose) => (
              <button
                key={purpose.value}
                type="button"
                onClick={() => setFormData({ ...formData, purpose: purpose.value })}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  formData.purpose === purpose.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <Icon name={purpose.icon as any} size={20} />
                  <span className="font-medium text-sm">{purpose.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Ваш бюджет <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {budgets.map((budget) => (
              <button
                key={budget}
                type="button"
                onClick={() => setFormData({ ...formData, budget })}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left hover:scale-[1.02] ${
                  formData.budget === budget
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium">{budget}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="calc-name" className="block text-sm font-medium mb-2">
            Ваше имя <span className="text-red-500">*</span>
          </label>
          <input
            id="calc-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Иван"
          />
        </div>

        <div>
          <label htmlFor="calc-phone" className="block text-sm font-medium mb-2">
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            id="calc-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="+7 999 123 45 67"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full gradient-animated text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 relative overflow-hidden group"
        >
          {isSubmitting ? (
            <>
              <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
              Отправка...
            </>
          ) : (
            <>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              <Icon name="Calculator" className="mr-2 relative z-10" size={20} />
              <span className="relative z-10">Получить расчёт</span>
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Бесплатный подбор конфигурации • Ответ в течение 15 минут
        </p>
      </form>
    </Card>
  );
};

export default QuickPCCalculator;