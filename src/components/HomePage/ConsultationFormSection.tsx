import ConsultationForm from '@/components/ConsultationForm';

export const ConsultationFormSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_70%)]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">💬 ОСТАЛИСЬ ВОПРОСЫ?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Получите <span className="text-gradient">бесплатную консультацию</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Наши специалисты ответят на все ваши вопросы и помогут подобрать идеальную конфигурацию
          </p>
        </div>
        <div className="flex justify-center animate-scale-in">
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
};