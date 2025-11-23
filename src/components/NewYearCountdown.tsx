import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

export const NewYearCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00');

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-2xl p-6 shadow-2xl border-2 border-yellow-400/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="text-2xl animate-bounce">🎄</span>
          <h3 className="text-xl font-bold text-white text-center">До конца новогодних скидок</h3>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎁</span>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-yellow-400/30">
            <div className="text-3xl font-bold text-white text-center mb-1">
              {timeLeft.days}
            </div>
            <div className="text-xs text-yellow-100 text-center uppercase font-semibold">Дней</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-yellow-400/30">
            <div className="text-3xl font-bold text-white text-center mb-1">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-xs text-yellow-100 text-center uppercase font-semibold">Часов</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-yellow-400/30">
            <div className="text-3xl font-bold text-white text-center mb-1">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-xs text-yellow-100 text-center uppercase font-semibold">Минут</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-yellow-400/30">
            <div className="text-3xl font-bold text-white text-center mb-1">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs text-yellow-100 text-center uppercase font-semibold">Секунд</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-yellow-100 text-sm font-medium">
            ⭐ Скидки до 15% на сборку ПК и комплектующие ⭐
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-2 left-2 text-yellow-300 opacity-70 animate-pulse">✨</div>
        <div className="absolute top-4 right-4 text-yellow-300 opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute bottom-4 left-4 text-yellow-300 opacity-70 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-2 right-2 text-yellow-300 opacity-70 animate-pulse" style={{ animationDelay: '1.5s' }}>✨</div>
      </div>
    </div>
  );
};
