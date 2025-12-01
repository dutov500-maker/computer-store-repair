import QuickPCCalculator from '@/components/QuickPCCalculator';

export const QuickCalculatorSection = () => {
  return (
    <section className="py-20 relative bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">🖥️ ПОДБОР КОНФИГУРАЦИИ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Не знаете, что выбрать? <span className="text-gradient">Поможем!</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ответьте на 4 вопроса и получите персональный расчёт ПК под ваши задачи
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <QuickPCCalculator />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="text-center p-6 glass-effect rounded-xl border border-primary/20">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-semibold mb-1">Быстро</h4>
            <p className="text-sm text-muted-foreground">Ответ в течение 15 минут</p>
          </div>
          <div className="text-center p-6 glass-effect rounded-xl border border-primary/20">
            <div className="text-3xl mb-2">💎</div>
            <h4 className="font-semibold mb-1">Бесплатно</h4>
            <p className="text-sm text-muted-foreground">Консультация не стоит ни копейки</p>
          </div>
          <div className="text-center p-6 glass-effect rounded-xl border border-primary/20">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="font-semibold mb-1">Точно</h4>
            <p className="text-sm text-muted-foreground">Учитываем все ваши пожелания</p>
          </div>
        </div>
      </div>
    </section>
  );
};
