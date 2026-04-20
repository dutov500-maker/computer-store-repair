import { useLocation, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const StickyHelpButton = () => {
  const { pathname } = useLocation();
  const isRepairPage = pathname === '/services' || pathname === '/repair';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#FF6B00]/30">
      {isRepairPage ? (
        <a
          href="https://t.me/komplabvlz?text=Привет!%20Хочу%20записаться%20на%20ремонт"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold text-xs tracking-widest uppercase py-4"
        >
          <Icon name="Wrench" size={18} />
          Записаться на ремонт
        </a>
      ) : (
        <div className="flex gap-2">
          <Link
            to="/pc-selection"
            className="flex-1 flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold text-xs tracking-widest uppercase py-4"
          >
            <Icon name="Gamepad2" size={16} />
            Подобрать
          </Link>
          <a
            href="https://t.me/komplabvlz?text=Привет!%20Нужна%20консультация"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-white/20 hover:border-[#FF6B00] text-white font-bold text-xs tracking-widest uppercase py-4"
          >
            <Icon name="Send" size={16} />
            Консультация
          </a>
        </div>
      )}
    </div>
  );
};

export default StickyHelpButton;
