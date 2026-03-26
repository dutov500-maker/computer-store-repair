import { Card } from '@/components/ui/card';
import ConsultationForm from '@/components/ConsultationForm';

export const ConsultationSection = () => {
  return (
    <section className="py-20 relative bg-transparent">
      <div className="container mx-auto px-4 relative">
        <Card className="p-8 md:p-12 bg-card/30 backdrop-blur-sm border-primary/20 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="grid md:grid-cols-2 gap-8 items-center relative">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/20 rounded-full mb-4">
                <span className="text-xs font-bold text-primary">💬 БЕСПЛАТНАЯ КОНСУЛЬТАЦИЯ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Подберём компьютер под ваши задачи
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Мы создаём сбалансированные сборки, где каждый компонент идеально дополняет другой
              </p>
              <ConsultationForm />
            </div>
            <div className="relative hidden md:block max-w-md ml-auto">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-3xl blur-3xl animate-pulse"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-primary/20 aspect-[3/4]">
                <img 
                  src="https://cdn.poehali.dev/files/f96e93e5-2304-476f-a06d-598cde35d145.jpg"
                  alt="Gaming PC Components"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};