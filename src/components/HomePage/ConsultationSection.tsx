import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const ConsultationSection = () => {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      <div className="container mx-auto px-4 relative">
        <Card className="p-8 md:p-12 gradient-card border-primary/20 shadow-xl overflow-hidden relative">
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
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://t.me/+79950272707" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button size="lg" className="w-full bg-[#0088cc] hover:bg-[#0088cc]/90 text-white shadow-lg hover:shadow-xl transition-all">
                    <Icon name="Send" className="mr-2" size={20} />
                    Написать в Telegram
                  </Button>
                </a>
                <a 
                  href="https://wa.me/79950272707" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-lg hover:shadow-xl transition-all">
                    <Icon name="MessageCircle" className="mr-2" size={20} />
                    Написать в WhatsApp
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative hidden md:block max-w-md ml-auto">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-3xl blur-3xl animate-pulse"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-primary/20 aspect-[3/4]">
                <img 
                  src="https://cdn.poehali.dev/files/80e5488c-2bfa-4e1c-9cbb-85c091071149.jpg"
                  alt="Gaming PC Components"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
