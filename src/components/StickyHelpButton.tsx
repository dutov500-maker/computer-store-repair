import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const StickyHelpButton = () => {
  const { pathname } = useLocation();
  const isRepairPage = pathname === '/services' || pathname === '/repair';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur-md border-t border-border/60 shadow-2xl">
      {isRepairPage ? (
        <a
          href="https://t.me/komplabvlz?text=Привет!%20Хочу%20записаться%20на%20ремонт"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="w-full gradient-animated text-white font-bold text-base shadow-lg"
          >
            <Icon name="Wrench" size={20} className="mr-2" />
            Записаться на ремонт
          </Button>
        </a>
      ) : (
        <div className="flex gap-2">
          <Link to="/pc-selection" className="flex-1">
            <Button
              size="lg"
              className="w-full gradient-animated text-white font-bold text-sm shadow-lg"
            >
              <Icon name="Gamepad2" size={18} className="mr-1.5" />
              Подобрать ПК
            </Button>
          </Link>
          <a
            href="https://t.me/komplabvlz?text=Привет!%20Нужна%20консультация"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc]/10 text-sm font-bold"
            >
              <Icon name="Send" size={18} className="mr-1.5" />
              Консультация
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default StickyHelpButton;
