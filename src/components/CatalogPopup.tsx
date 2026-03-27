import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const SESSION_KEY = 'catalog_popup_shown';

const CatalogPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(true);
    };

    const timer = setTimeout(trigger, 40000);

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.7) trigger();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors"
        >
          <Icon name="X" size={18} className="text-muted-foreground" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon name="Send" size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Антон — основатель K|LAB</p>
            <p className="font-heading font-bold text-lg leading-tight">Подберём конфиг за 15 минут</p>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-5">
          Скажите бюджет — получите готовую сборку с оптимальным соотношением цена/производительность. Без лишних звонков.
        </p>

        <a
          href="https://t.me/komplabvlz?text=Привет!%20Хочу%20подобрать%20конфиг%20под%20бюджет"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setVisible(false)}
        >
          <Button className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold" size="lg">
            <Icon name="Send" size={18} className="mr-2" />
            Написать Антону в Telegram
          </Button>
        </a>

        <button
          onClick={() => setVisible(false)}
          className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Нет, я ещё смотрю
        </button>
      </div>
    </div>
  );
};

export default CatalogPopup;
