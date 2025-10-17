import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { StepIndicator } from './PCSelectionForm/StepIndicator';
import { Step1Purpose } from './PCSelectionForm/Step1Purpose';
import { Step2Budget } from './PCSelectionForm/Step2Budget';
import { Step3Details } from './PCSelectionForm/Step3Details';
import { Step4Contacts } from './PCSelectionForm/Step4Contacts';

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
      const response = await fetch('https://functions.poehali.dev/25621ff4-c4e5-4302-9356-43afeac8b2c5', {
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

  return (
    <Card className="p-6 md:p-8 max-w-5xl mx-auto">
      <StepIndicator currentStep={step} totalSteps={4} />

      {step === 1 && (
        <Step1Purpose
          purposes={purposes}
          selectedPurposes={formData.purpose}
          onPurposeToggle={handlePurposeToggle}
          onNext={nextStep}
        />
      )}

      {step === 2 && (
        <Step2Budget
          budgetRanges={budgetRanges}
          selectedBudget={formData.budget}
          onBudgetSelect={(budget) => setFormData(prev => ({ ...prev, budget }))}
          onNext={nextStep}
          onBack={() => setStep(step - 1)}
        />
      )}

      {step === 3 && (
        <Step3Details
          resolutions={resolutions}
          selectedResolution={formData.resolution}
          hasMonitor={formData.hasMonitor}
          timing={formData.timing}
          additionalInfo={formData.additionalInfo}
          onResolutionSelect={(resolution) => setFormData(prev => ({ ...prev, resolution }))}
          onMonitorSelect={(hasMonitor) => setFormData(prev => ({ ...prev, hasMonitor }))}
          onTimingChange={(timing) => setFormData(prev => ({ ...prev, timing }))}
          onAdditionalInfoChange={(info) => setFormData(prev => ({ ...prev, additionalInfo: info }))}
          onNext={nextStep}
          onBack={() => setStep(step - 1)}
        />
      )}

      {step === 4 && (
        <Step4Contacts
          name={formData.name}
          phone={formData.phone}
          email={formData.email}
          onNameChange={(name) => setFormData(prev => ({ ...prev, name }))}
          onPhoneChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
          onEmailChange={(email) => setFormData(prev => ({ ...prev, email }))}
          onSubmit={handleSubmit}
          onBack={() => setStep(step - 1)}
          submitting={submitting}
        />
      )}
    </Card>
  );
};

export default PCSelectionForm;
