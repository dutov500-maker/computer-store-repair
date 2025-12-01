import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const StickyHelpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
        <Link to="/pc-selection">
          <Button
            size="lg"
            className="relative gradient-animated text-white px-8 py-6 text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all border-2 border-white/20"
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            <div className="relative flex items-center gap-3">
              <Icon name="Sparkles" size={24} className="animate-pulse" />
              <div className="text-left">
                <div className="font-bold">Не можете выбрать?</div>
                <div className="text-xs opacity-90">Подберём бесплатно за 5 минут</div>
              </div>
              <Icon name="ArrowRight" size={20} className="animate-bounce-horizontal" />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StickyHelpButton;
