import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';

const SERVICES_PRICING = {
  'diagnostics': { base: 0, urgent: 0, name: 'Диагностика' },
  'cleaning': { base: 1000, urgent: 1500, name: 'Чистка от пыли' },
  'thermal-paste': { base: 900, urgent: 1350, name: 'Замена термопасты' },
  'windows': { base: 2200, urgent: 3300, name: 'Установка Windows' },
  'motherboard': { base: 2000, urgent: 3000, name: 'Ремонт материнской платы' },
  'psu': { base: 700, urgent: 1050, name: 'Замена блока питания' },
  'upgrade': { base: 2000, urgent: 3000, name: 'Апгрейд компьютера' },
  'data-recovery': { base: 3000, urgent: 4500, name: 'Восстановление данных' },
  'bios': { base: 800, urgent: 1200, name: 'Настройка BIOS' },
  'virus-removal': { base: 1500, urgent: 2250, name: 'Удаление вирусов' },
  'cooler': { base: 700, urgent: 1050, name: 'Замена кулера' },
  'gpu': { base: 2500, urgent: 3750, name: 'Ремонт видеокарты' },
  'drivers': { base: 500, urgent: 750, name: 'Установка драйверов' },
  'network': { base: 800, urgent: 1200, name: 'Настройка сети' },
  'hdd': { base: 1200, urgent: 1800, name: 'Замена жесткого диска' },
  'laptop': { base: 1000, urgent: 1500, name: 'Ремонт ноутбука' },
  'laptop-screen': { base: 3000, urgent: 4500, name: 'Замена экрана ноутбука' },
  'laptop-cleaning': { base: 2500, urgent: 3750, name: 'Чистка ноутбука' },
  'laptop-keyboard': { base: 1500, urgent: 2250, name: 'Замена клавиатуры' },
};

export const ServiceCalculator = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [isUrgent, setIsUrgent] = useState(false);

  const calculatePrice = () => {
    if (!selectedService) return null;
    const service = SERVICES_PRICING[selectedService as keyof typeof SERVICES_PRICING];
    const price = isUrgent ? service.urgent : service.base;
    return { price, name: service.name };
  };

  const result = calculatePrice();

  const handleTelegramOrder = () => {
    if (!result) return;
    const urgentText = isUrgent ? ' (СРОЧНО - сегодня)' : '';
    const message = `Здравствуйте! Хочу заказать услугу: ${result.name}${urgentText}\nСтоимость: ${result.price === 0 ? 'Бесплатно' : result.price + ' ₽'}`;
    window.open(`https://t.me/komplab_vlz?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-500/5 to-red-500/5 border-orange-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-500/20 rounded-xl">
          <Icon name="Calculator" size={24} className="text-orange-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold">💰 Калькулятор стоимости</h3>
          <p className="text-sm text-muted-foreground">Узнайте точную цену за 10 секунд</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base mb-3 block">Выберите услугу:</Label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full p-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">-- Выберите услугу --</option>
            {Object.entries(SERVICES_PRICING).map(([key, service]) => (
              <option key={key} value={key}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {selectedService && (
          <>
            <div className="space-y-3">
              <Label className="text-base">Срочность:</Label>
              <RadioGroup value={isUrgent ? 'urgent' : 'normal'} onValueChange={(val) => setIsUrgent(val === 'urgent')}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-input hover:border-orange-500 transition-colors cursor-pointer">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="cursor-pointer flex-1">
                    <div className="font-medium">Обычный ремонт (1-3 дня)</div>
                    <div className="text-sm text-muted-foreground">Стандартные сроки</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-orange-500/50 bg-orange-500/5 hover:border-orange-500 transition-colors cursor-pointer">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="cursor-pointer flex-1">
                    <div className="font-medium flex items-center gap-2">
                      🔥 Срочный ремонт (сегодня)
                      <span className="text-xs px-2 py-1 bg-orange-500/20 rounded-full">+50%</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Сделаем в течение дня</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border-2 border-orange-500/30">
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Итоговая стоимость:</div>
                <div className="text-4xl font-bold text-orange-500">
                  {result?.price === 0 ? 'Бесплатно' : `${result?.price} ₽`}
                </div>
                {isUrgent && result?.price !== 0 && (
                  <div className="text-xs text-muted-foreground">
                    (базовая цена: {SERVICES_PRICING[selectedService as keyof typeof SERVICES_PRICING].base} ₽ + 50%)
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handleTelegramOrder}
              className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white h-12 text-base"
            >
              <Icon name="Send" size={20} className="mr-2" />
              Узнать стоимость сборки
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};