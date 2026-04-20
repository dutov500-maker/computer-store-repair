import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const FloatingTelegram = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://t.me/komplabvlz"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-24 right-6 z-50 transition-all duration-500 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      aria-label="Написать в Telegram"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#FF6B00] blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
        <div className="relative bg-[#FF6B00] hover:bg-[#FF8A2E] text-black p-4 shadow-[0_0_24px_rgba(255,107,0,0.4)] hover:shadow-[0_0_40px_rgba(255,107,0,0.7)] transition-all flex items-center justify-center border border-[#FF6B00]">
          <Icon name="Send" size={24} />
        </div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-white animate-ping" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-white" />
      </div>
      <div className="absolute bottom-full right-0 mb-2 bg-[#0A0A0A] border border-[#FF6B00]/40 text-white px-3 py-2 font-mono text-xs tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Telegram →
      </div>
    </a>
  );
};

export default FloatingTelegram;
