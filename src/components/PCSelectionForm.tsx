import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
    preferences: '',
    hasMonitor: '',
    hasPeripherals: '',
    casePreference: '',
    rgbLighting: '',
    additionalInfo: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const purposes = [
    { id: 'gaming', label: 'Игры', icon: 'Gamepad2' },
    { id: 'work', label: 'Работа/Офис', icon: 'Briefcase' },
    { id: 'design', label: '3D моделирование/Дизайн', icon: 'Palette' },
    { id: 'video', label: 'Видеомонтаж', icon: 'Film' },
    { id: 'streaming', label: 'Стриминг', icon: 'Radio' },
    { id: 'programming', label: 'Программирование', icon: 'Code' }
  ];

  const gamesList = [
    'CS2/CS:GO',
    'Dota 2/LoL',
    'Valorant',
    'Apex Legends',
    'Cyberpunk 2077',
    'GTA V/GTA VI',
    'Red Dead Redemption 2',
    'The Witcher 3',
    'Baldur\'s Gate 3',
    'Hogwarts Legacy',
    'Другие AAA-игры'
  ];

  const budgetRanges = [
    { value: '30000-50000', label: '30 000 - 50 000 ₽' },
    { value: '50000-70000', label: '50 000 - 70 000 ₽' },
    { value: '70000-100000', label: '70 000 - 100 000 ₽' },
    { value: '100000-150000', label: '100 000 - 150 000 ₽' },
    { value: '150000+', label: 'Более 150 000 ₽' }
  ];

  const resolutions = [
    { value: 'FHD', label: 'Full HD (1920x1080)' },
    { value: 'QHD', label: '2K (2560x1440)' },
    { value: 'UHD', label: '4K (3840x2160)' },
    { value: 'unknown', label: 'Не знаю' }
  ];

  const handlePurposeToggle = (purposeId: string) => {
    setFormData(prev => ({
      ...prev,
      purpose: prev.purpose.includes(purposeId)
        ? prev.purpose.filter(p => p !== purposeId)
        : [...prev.purpose, purposeId]
    }));
  };

  const handleGameToggle = (game: string) => {
    setFormData(prev => ({
      ...prev,
      games: prev.games.includes(game)
        ? prev.games.filter(g => g !== game)
        : [...prev.games, game]
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

Разрешение монитора: ${formData.resolution}

${formData.games.length > 0 ? `Игры: ${formData.games.join(', ')}` : ''}

${formData.programs ? `Программы: ${formData.programs}` : ''}

${formData.preferences ? `Предпочтения по комплектующим: ${formData.preferences}` : ''}

Есть монитор: ${formData.hasMonitor === 'yes' ? 'Да' : formData.hasMonitor === 'no' ? 'Нет' : 'не указано'}
Есть клавиатура/мышь: ${formData.hasPeripherals === 'yes' ? 'Да' : formData.hasPeripherals === 'no' ? 'Нет' : 'не указано'}

Предпочтения по корпусу: ${formData.casePreference || 'не указано'}
RGB подсветка: ${formData.rgbLighting === 'yes' ? 'Да' : formData.rgbLighting === 'no' ? 'Нет' : 'не указано'}

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
          description: 'Мы свяжемся с вами в ближайшее время для уточнения деталей'
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
          preferences: '',
          hasMonitor: '',
          hasPeripherals: '',
          casePreference: '',
          rgbLighting: '',
          additionalInfo: ''
        });
        setStep(1);
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже.',
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
        description: 'Выберите примерный бюджет',
        variant: 'destructive'
      });
      return;
    }
    setStep(step + 1);
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    step > s ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Шаг {step} из 4
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">
              Для чего нужен компьютер?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Выберите одно или несколько назначений
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {purposes.map((purpose) => (
                <Card
                  key={purpose.id}
                  className={`p-4 cursor-pointer transition-all hover:border-primary ${
                    formData.purpose.includes(purpose.id)
                      ? 'border-primary bg-primary/5'
                      : ''
                  }`}
                  onClick={() => handlePurposeToggle(purpose.id)}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <Icon name={purpose.icon as any} size={32} className="text-primary" />
                    <span className="text-sm font-medium">{purpose.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {formData.purpose.includes('gaming') && (
            <div>
              <Label className="text-base mb-3 block">
                В какие игры планируете играть?
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {gamesList.map((game) => (
                  <div key={game} className="flex items-center space-x-2">
                    <Checkbox
                      id={game}
                      checked={formData.games.includes(game)}
                      onCheckedChange={() => handleGameToggle(game)}
                    />
                    <label htmlFor={game} className="text-sm cursor-pointer">
                      {game}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(formData.purpose.includes('design') ||
            formData.purpose.includes('video') ||
            formData.purpose.includes('programming')) && (
            <div>
              <Label htmlFor="programs">
                Какие программы планируете использовать?
              </Label>
              <Textarea
                id="programs"
                placeholder="Например: Adobe Photoshop, Premiere Pro, AutoCAD..."
                value={formData.programs}
                onChange={(e) =>
                  setFormData({ ...formData, programs: e.target.value })
                }
                rows={3}
              />
            </div>
          )}

          <Button onClick={nextStep} className="w-full" size="lg">
            Далее
            <Icon name="ArrowRight" className="ml-2" size={18} />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">
              Какой у вас бюджет?
            </h3>
            <RadioGroup
              value={formData.budget}
              onValueChange={(value) =>
                setFormData({ ...formData, budget: value })
              }
            >
              {budgetRanges.map((range) => (
                <div key={range.value} className="flex items-center space-x-3 mb-3">
                  <RadioGroupItem value={range.value} id={range.value} />
                  <Label htmlFor={range.value} className="cursor-pointer text-base">
                    {range.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-heading font-bold mb-4">
              Разрешение монитора
            </h3>
            <RadioGroup
              value={formData.resolution}
              onValueChange={(value) =>
                setFormData({ ...formData, resolution: value })
              }
            >
              {resolutions.map((res) => (
                <div key={res.value} className="flex items-center space-x-3 mb-3">
                  <RadioGroupItem value={res.value} id={res.value} />
                  <Label htmlFor={res.value} className="cursor-pointer">
                    {res.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              Назад
            </Button>
            <Button onClick={nextStep} className="flex-1">
              Далее
              <Icon name="ArrowRight" className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">
              Дополнительные параметры
            </h3>

            <div className="space-y-4">
              <div>
                <Label className="text-base mb-3 block">У вас есть монитор?</Label>
                <RadioGroup
                  value={formData.hasMonitor}
                  onValueChange={(value) =>
                    setFormData({ ...formData, hasMonitor: value })
                  }
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="monitor-yes" />
                    <Label htmlFor="monitor-yes" className="cursor-pointer">Да, есть</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="monitor-no" />
                    <Label htmlFor="monitor-no" className="cursor-pointer">Нет, нужен монитор</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base mb-3 block">
                  У вас есть клавиатура и мышь?
                </Label>
                <RadioGroup
                  value={formData.hasPeripherals}
                  onValueChange={(value) =>
                    setFormData({ ...formData, hasPeripherals: value })
                  }
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="periph-yes" />
                    <Label htmlFor="periph-yes" className="cursor-pointer">Да, есть</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="periph-no" />
                    <Label htmlFor="periph-no" className="cursor-pointer">Нет, нужны</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="case">Предпочтения по корпусу</Label>
                <Input
                  id="case"
                  placeholder="Например: компактный, с окном, белый цвет..."
                  value={formData.casePreference}
                  onChange={(e) =>
                    setFormData({ ...formData, casePreference: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-base mb-3 block">RGB подсветка?</Label>
                <RadioGroup
                  value={formData.rgbLighting}
                  onValueChange={(value) =>
                    setFormData({ ...formData, rgbLighting: value })
                  }
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="yes" id="rgb-yes" />
                    <Label htmlFor="rgb-yes" className="cursor-pointer">Да, хочу RGB</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="rgb-no" />
                    <Label htmlFor="rgb-no" className="cursor-pointer">Нет, не нужна</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="preferences">
                  Предпочтения по производителям комплектующих
                </Label>
                <Textarea
                  id="preferences"
                  placeholder="Например: только Intel, только AMD, предпочитаю NVIDIA..."
                  value={formData.preferences}
                  onChange={(e) =>
                    setFormData({ ...formData, preferences: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              Назад
            </Button>
            <Button onClick={nextStep} className="flex-1">
              Далее
              <Icon name="ArrowRight" className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Ваши контакты</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Мы свяжемся с вами для уточнения деталей и расчета стоимости
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="example@mail.com"
                />
              </div>

              <div>
                <Label htmlFor="additional">Дополнительная информация</Label>
                <Textarea
                  id="additional"
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    setFormData({ ...formData, additionalInfo: e.target.value })
                  }
                  placeholder="Дополнительные пожелания или вопросы..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              Назад
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Icon name="Loader2" className="animate-spin mr-2" size={18} />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Send" className="mr-2" size={18} />
                  Отправить заявку
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PCSelectionForm;
