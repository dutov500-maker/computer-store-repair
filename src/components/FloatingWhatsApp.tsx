import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/79950272707?text=Здравствуйте!%20Хочу%20узнать%20подробнее%20о%20ваших%20услугах"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-32 right-6 z-40 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Написать в WhatsApp"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
        <div className="relative bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl hover:shadow-[#25D366]/50 transition-all hover:scale-110 flex items-center justify-center">
          <Icon name="MessageCircle" size={28} className="animate-bounce-slow" />
        </div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
      </div>
      <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Написать в WhatsApp
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-zinc-800"></div>
      </div>
    </a>
  );
};

export default FloatingWhatsApp;