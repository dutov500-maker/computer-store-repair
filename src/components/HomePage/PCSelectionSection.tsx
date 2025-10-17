import PCSelectionForm from '@/components/PCSelectionForm';

export const PCSelectionSection = () => {
  return (
    <section id="pc-selection" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">📋 ПОДБОР ПК</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Подберём <span className="text-gradient">компьютер мечты</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            Ответьте на несколько вопросов и получите персональную сборку
          </p>
        </div>
        <div className="animate-scale-in">
          <PCSelectionForm />
        </div>
      </div>
    </section>
  );
};