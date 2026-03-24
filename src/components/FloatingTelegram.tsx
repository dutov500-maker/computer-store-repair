import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const FloatingTelegram = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://t.me/komplab_vlz"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Написать в Telegram"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#0088cc] rounded-full blur-xl opacity-40 group-hover:opacity-70 animate-pulse"></div>
        <div className="relative bg-[#0088cc] hover:bg-[#0077b5] text-white p-4 rounded-full shadow-2xl hover:shadow-[#0088cc]/50 transition-all hover:scale-110 flex items-center justify-center">
          <Icon name="Send" size={26} />
        </div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full"></div>
      </div>
      <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Написать в Telegram
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-zinc-800"></div>
      </div>
    </a>
  );
};

export default FloatingTelegram;
