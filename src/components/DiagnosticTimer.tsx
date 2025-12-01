import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const DiagnosticTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(18, 0, 0, 0);

      if (now >= endOfDay) {
        endOfDay.setDate(endOfDay.getDate() + 1);
      }

      const distance = endOfDay.getTime() - now.getTime();

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+79950272707';
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border-2 border-green-500/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500/20 rounded-xl animate-bounce">
            <Icon name="Clock" size={28} className="text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold flex items-center gap-2">
              🎁 Акция "Бесплатная диагностика"
            </h3>
            <p className="text-sm text-muted-foreground">Звоните прямо сейчас!</p>
          </div>
        </div>

        <div className="p-4 bg-background/50 rounded-xl border border-green-500/20">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Акция действует ещё:</div>
            <div className="flex justify-center gap-2">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg min-w-[70px]">
                <div className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs mt-1">часов</div>
              </div>
              <div className="flex items-center text-2xl font-bold text-green-500">:</div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg min-w-[70px]">
                <div className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs mt-1">минут</div>
              </div>
              <div className="flex items-center text-2xl font-bold text-green-500">:</div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg min-w-[70px]">
                <div className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs mt-1">секунд</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <Icon name="Check" size={18} className="text-green-500 mt-0.5" />
            <span>Определим проблему за 15-30 минут</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Icon name="Check" size={18} className="text-green-500 mt-0.5" />
            <span>Назовём точную стоимость ремонта</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Icon name="Check" size={18} className="text-green-500 mt-0.5" />
            <span>Если откажетесь — ничего не платите!</span>
          </div>
        </div>

        <Button
          onClick={handleCall}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-12 text-base"
        >
          <Icon name="Phone" size={20} className="mr-2" />
          Позвонить сейчас: +7 995 027 27 07
        </Button>
      </div>
    </Card>
  );
};