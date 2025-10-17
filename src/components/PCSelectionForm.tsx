import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const PCSelectionForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    purpose: [] as string[],
    resolution: '',
    games: [] as string[],
    programs: '',
    hasMonitor: '',
    timing: '',
    additionalInfo: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const purposes = [
    { id: 'gaming-casual', label: 'Нетребовательные игры: Minecraft, Dota 2, Genshin...', category: 'gaming' },
    { id: 'gaming-mid', label: 'Требовательные игры: CyberPunk 2077, Alan Wake...', category: 'gaming' },
    { id: 'gaming-esports', label: 'Киберспортивные игры: CS 2, PUBG, Fortnite...', category: 'gaming' },
    { id: 'design-graphics', label: 'Графический дизайн: Photoshop, Illustrator, Lightroom...', category: 'work' },
    { id: 'design-cad', label: 'Для работы в САПР: AutoCAD, Revit, ArchiCAD...', category: 'work' },
    { id: 'design-3d', label: 'Для 3D моделирования: 3Ds MAX, Blender, Sketchup...', category: 'work' },
    { id: 'video', label: 'Для видеомонтажа: Vegas Pro, DaVinci, Premiere Pro...', category: 'work' },
    { id: 'streaming', label: 'Для стриминга', category: 'work' },
    { id: 'office', label: 'Для спокойной работы: Word, Excel, интернет-сёрфинг...', category: 'work' },
    { id: 'other', label: 'Другое', category: 'other' }
  ];

  const budgetRanges = [
    { 
      value: '70000-100000', 
      label: '70-100 тыс.', 
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&h=300&fit=crop',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      value: '100000-150000', 
      label: '100-150 тыс.', 
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop',
      color: 'from-gray-400 to-gray-600'
    },
    { 
      value: '150000-200000', 
      label: '150-200 тыс.', 
      image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=300&h=300&fit=crop',
      color: 'from-red-500 to-red-700'
    },
    { 
      value: '200000+', 
      label: 'Более 200 тыс.', 
      image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=300&h=300&fit=crop',
      color: 'from-purple-400 to-white'
    }
  ];

  const resolutions = [
    { value: 'FHD', label: 'FHD' },
    { value: 'QHD', label: 'QHD (2K)' },
    { value: 'UHD', label: 'UHD (4K)' }
  ];

  const handlePurposeToggle = (purposeId: string) => {
    setFormData(prev => ({
      ...prev,
      purpose: prev.purpose.includes(purposeId)
        ? prev.purpose.filter(p => p !== purposeId)
        : [...prev.purpose, purposeId]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      toast({
        title: 'Ошибка',
        description: 'Заполните имя и телефон',
        variant: 'destructive'
      });
      return;
    }

    setSubmitting(true);

    const message = `
ПОДБОР КОМПЬЮТЕРА

Контакты:
Имя: ${formData.name}
Телефон: ${formData.phone}
Email: ${formData.email || 'не указан'}

Бюджет: ${formData.budget}

Назначение: ${formData.purpose.map(p => purposes.find(pur => pur.id === p)?.label).join(', ')}

Разрешение монитора: ${formData.resolution || 'не указано'}

Есть монитор: ${formData.hasMonitor === 'yes' ? 'Да' : formData.hasMonitor === 'no' ? 'Нет' : 'не указано'}

Когда планируете покупку: ${formData.timing || 'не указано'}

${formData.additionalInfo ? `Дополнительно: ${formData.additionalInfo}` : ''}
    `.trim();

    try {
      const response = await fetch('https://functions.poehali.dev/d6f4fe03-53d6-44bb-be39-1d7dd4bbb6c5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service_type: 'Подбор компьютера',
          message
        })
      });

      if (response.ok) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время'
        });
        
        setFormData({
          name: '',
          phone: '',
          email: '',
          budget: '',
          purpose: [],
          resolution: '',
          games: [],
          programs: '',
          hasMonitor: '',
          timing: '',
          additionalInfo: ''
        });
        setStep(1);
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && formData.purpose.length === 0) {
      toast({
        title: 'Выберите назначение',
        description: 'Укажите для чего нужен компьютер',
        variant: 'destructive'
      });
      return;
    }
    if (step === 2 && !formData.budget) {
      toast({
        title: 'Укажите бюджет',
        variant: 'destructive'
      });
      return;
    }
    setStep(step + 1);
  };

  const gamingPurposes = purposes.filter(p => p.category === 'gaming');
  const workPurposes = purposes.filter(p => p.category === 'work');
  const otherPurposes = purposes.filter(p => p.category === 'other');

  return (
    <Card className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-1 md:mx-2 transition-colors ${
                    step > s ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">
              Для каких задач нужен компьютер?
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">Для игр</h4>
              <div className="space-y-2">
                {gamingPurposes.map((purpose) => (
                  <div
                    key={purpose.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.purpose.includes(purpose.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => handlePurposeToggle(purpose.id)}
                  >
                    <Checkbox
                      checked={formData.purpose.includes(purpose.id)}
                      onCheckedChange={() => handlePurposeToggle(purpose.id)}
                    />
                    <label className="text-sm flex-1 cursor-pointer">
                      {purpose.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">Для работы</h4>
              <div className="space-y-2">
                {workPurposes.map((purpose) => (
                  <div
                    key={purpose.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.purpose.includes(purpose.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => handlePurposeToggle(purpose.id)}
                  >
                    <Checkbox
                      checked={formData.purpose.includes(purpose.id)}
                      onCheckedChange={() => handlePurposeToggle(purpose.id)}
                    />
                    <label className="text-sm flex-1 cursor-pointer">
                      {purpose.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {otherPurposes.map((purpose) => (
              <div
                key={purpose.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.purpose.includes(purpose.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
                onClick={() => handlePurposeToggle(purpose.id)}
              >
                <Checkbox
                  checked={formData.purpose.includes(purpose.id)}
                  onCheckedChange={() => handlePurposeToggle(purpose.id)}
                />
                <label className="text-sm flex-1 cursor-pointer">
                  {purpose.label}
                </label>
              </div>
            ))}
          </div>

          <Button onClick={nextStep} className="w-full" size="lg">
            Далее
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">
              Укажите ваш бюджет на ПК
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {budgetRanges.map((range) => (
              <div
                key={range.value}
                className={`relative cursor-pointer rounded-xl overflow-hidden transition-all ${
                  formData.budget === range.value
                    ? 'ring-4 ring-primary scale-105'
                    : 'hover:scale-102'
                }`}
                onClick={() => setFormData({ ...formData, budget: range.value })}
              >
                <div className="aspect-square relative">
                  <img
                    src={range.image}
                    alt={range.label}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${range.color} opacity-40`} />
                  <div className="absolute inset-0 flex items-end justify-center pb-4">
                    <div className="text-center bg-background/90 backdrop-blur px-4 py-2 rounded-lg">
                      <p className="text-lg font-bold">{range.label}</p>
                    </div>
                  </div>
                  {formData.budget === range.value && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Icon name="Check" size={20} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
              Назад
            </Button>
            <Button onClick={nextStep} className="flex-1">
              Далее
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">
              Разрешение вашего монитора
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {resolutions.map((res) => (
              <div
                key={res.value}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all text-center ${
                  formData.resolution === res.value
                    ? 'border-primary bg-primary/5 scale-105'
                    : 'border-muted hover:border-primary/50'
                }`}
                onClick={() => setFormData({ ...formData, resolution: res.value })}
              >
                <p className="font-bold text-lg">{res.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="text-center">
              <h4 className="text-xl font-heading font-bold mb-4 text-primary">
                Важен внешний вид компьютера?
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.hasMonitor === 'yes'
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-primary/50'
                  }`}
                  onClick={() => setFormData({ ...formData, hasMonitor: 'yes' })}
                >
                  <p className="font-semibold">Да</p>
                </div>
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.hasMonitor === 'no'
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-primary/50'
                  }`}
                  onClick={() => setFormData({ ...formData, hasMonitor: 'no' })}
                >
                  <p className="font-semibold">Нет</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-heading font-bold mb-4 text-primary">
                Когда планируете покупку?
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Сейчас', 'В течение 1-2 недель', 'В течение месяца', 'Через 1-2 месяца'].map((time) => (
                  <div
                    key={time}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      formData.timing === time
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => setFormData({ ...formData, timing: time })}
                  >
                    <p className="text-sm font-medium">{time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
              Назад
            </Button>
            <Button onClick={nextStep} className="flex-1">
              Далее
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">
              Отправим информацию в WhatsApp
            </h3>
            <p className="text-muted-foreground">
              Минимальная стоимость игрового компьютера 70 000 руб.
            </p>
          </div>

          <div className="space-y-4 max-w-xl mx-auto">
            <div>
              <Input
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Номер телефона (WhatsApp)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <Input
                type="text"
                placeholder="Ваш город"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <Textarea
                placeholder="Дополнительная информация (необязательно)"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="agreement" defaultChecked />
              <label htmlFor="agreement" className="text-xs text-muted-foreground leading-relaxed">
                Нажимая кнопку Отправить вы даёте согласие на обработку персональных данных
              </label>
            </div>
          </div>

          <div className="flex gap-3 max-w-xl mx-auto">
            <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
              Назад
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={submitting}
            >
              {submitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PCSelectionForm;
