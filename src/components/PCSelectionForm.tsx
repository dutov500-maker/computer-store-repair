import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { StepIndicator } from './PCSelectionForm/StepIndicator';
import { Step1Purpose } from './PCSelectionForm/Step1Purpose';
import { Step2Budget } from './PCSelectionForm/Step2Budget';
import { Step3Details } from './PCSelectionForm/Step3Details';
import { Step4Contacts } from './PCSelectionForm/Step4Contacts';
import { toast } from 'sonner';
import funcUrls from '../../backend/func2url.json';

const PCSelectionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [purpose, setPurpose] = useState('');
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep === 1 && !purpose) {
      toast.error('Пожалуйста, выберите назначение компьютера');
      return;
    }
    if (currentStep === 2 && !budget) {
      toast.error('Пожалуйста, укажите бюджет');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      toast.error('Пожалуйста, заполните имя и телефон');
      return;
    }

    setSubmitting(true);

    try {
      const message = `Назначение: ${purpose}\nБюджет: ${budget}\nДополнительно: ${details || 'Не указано'}`;
      
      const response = await fetch(funcUrls['submit-request'], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          service_type: 'Подбор ПК',
          message: message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время');
        setPurpose('');
        setBudget('');
        setDetails('');
        setName('');
        setPhone('');
        setEmail('');
        setCurrentStep(1);
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
    <Card className="p-8 md:p-12 max-w-4xl mx-auto">
      <StepIndicator currentStep={currentStep} totalSteps={4} />
      
      <div className="mt-8">
        {currentStep === 1 && (
          <Step1Purpose 
            purpose={purpose}
            onPurposeChange={setPurpose}
            onNext={handleNext}
          />
        )}
        
        {currentStep === 2 && (
          <Step2Budget
            budget={budget}
            onBudgetChange={setBudget}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 3 && (
          <Step3Details
            details={details}
            onDetailsChange={setDetails}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 4 && (
          <Step4Contacts
            name={name}
            phone={phone}
            email={email}
            onNameChange={setName}
            onPhoneChange={setPhone}
            onEmailChange={setEmail}
            onSubmit={handleSubmit}
            onBack={handleBack}
            submitting={submitting}
          />
        )}
      </div>
    </Card>
  );
};

export default PCSelectionForm;
