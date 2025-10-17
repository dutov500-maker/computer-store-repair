import { useEffect, useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface CounterStatProps {
  end: number;
  duration?: number;
  label: string;
  icon: string;
  suffix?: string;
  delay?: number;
}

const CounterStat = ({ end, duration = 2000, label, icon, suffix = '', delay = 0 }: CounterStatProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setHasAnimated(true);
            const startTime = Date.now();
            const animate = () => {
              const currentTime = Date.now();
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              setCount(Math.floor(easeOutQuart * end));

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            animate();
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated, delay]);

  return (
    <div 
      ref={elementRef}
      className="text-center animate-slide-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative inline-block mb-4">
        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-colors"></div>
        <div className="relative w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
          <Icon name={icon as any} className="text-primary" size={32} />
        </div>
      </div>
      <div className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

export default CounterStat;
