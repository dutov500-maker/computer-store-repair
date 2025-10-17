import CounterStat from '@/components/CounterStat';

export const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.08),transparent_70%)]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Нам <span className="text-gradient">доверяют</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Цифры нашей работы говорят сами за себя
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <CounterStat end={500} suffix="+" label="Собранных ПК" duration={2.5} />
          <CounterStat end={98} suffix="%" label="Довольных клиентов" duration={2} />
          <CounterStat end={3} suffix=" года" label="Гарантия" duration={1.5} />
        </div>
      </div>
    </section>
  );
};
