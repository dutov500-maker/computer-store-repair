import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const NewYearSaleTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-01-14T23:59:59').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 border-2 border-red-500/30 p-6 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-orange-500/10 animate-pulse"></div>
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl animate-bounce">🎄</span>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
              Новогодняя акция -15%
            </h3>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎁</span>
          </div>
          
          <p className="text-muted-foreground mb-6 text-lg">
            Успейте купить со скидкой! До конца акции осталось:
          </p>

          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative bg-card/80 backdrop-blur-sm border-2 border-red-500/30 rounded-xl p-4 hover:scale-105 transition-transform">
                <div className="text-3xl md:text-5xl font-bold text-gradient mb-1">
                  {timeLeft.days}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  дней
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative bg-card/80 backdrop-blur-sm border-2 border-orange-500/30 rounded-xl p-4 hover:scale-105 transition-transform">
                <div className="text-3xl md:text-5xl font-bold text-gradient mb-1">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  часов
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-green-500/20 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative bg-card/80 backdrop-blur-sm border-2 border-yellow-500/30 rounded-xl p-4 hover:scale-105 transition-transform">
                <div className="text-3xl md:text-5xl font-bold text-gradient mb-1">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  минут
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative bg-card/80 backdrop-blur-sm border-2 border-green-500/30 rounded-xl p-4 hover:scale-105 transition-transform">
                <div className="text-3xl md:text-5xl font-bold text-gradient mb-1 animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  секунд
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Icon name="Flame" size={18} className="text-red-500 animate-pulse" />
            <span className="font-semibold">Количество ПК по акции ограничено</span>
            <Icon name="Flame" size={18} className="text-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewYearSaleTimer;
