import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ExitIntentPopupProps {
  productTitle: string;
}

const SESSION_KEY = 'exit_intent_shown';

const ExitIntentPopup = ({ productTitle }: ExitIntentPopupProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        sessionStorage.setItem(SESSION_KEY, '1');
        setVisible(true);
      }
    };

    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors"
        >
          <Icon name="X" size={18} className="text-muted-foreground" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Icon name="Gift" size={28} className="text-primary" />
          </div>
          <h2 className="font-heading font-bold text-2xl mb-2">Не уходите без подарка!</h2>
          <p className="text-muted-foreground text-sm">
            Забронируйте <span className="font-semibold text-foreground">{productTitle}</span> прямо сейчас и получите{' '}
            <span className="text-primary font-bold">1 год технического обслуживания бесплатно</span>.
          </p>
        </div>

        <a
          href={`https://t.me/komplabvlz?text=${encodeURIComponent(`Привет! Хочу обсудить сборку ${productTitle} + бесплатное ТО`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setVisible(false)}
        >
          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold" size="lg">
            <Icon name="Send" size={18} className="mr-2" />
            Забронировать + получить 1 год ТО
          </Button>
        </a>

        <button
          onClick={() => setVisible(false)}
          className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Спасибо, не надо
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
