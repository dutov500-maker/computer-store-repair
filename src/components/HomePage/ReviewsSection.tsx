import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ReviewsSectionProps {
  fullPage?: boolean;
}

export const ReviewsSection = ({ fullPage = false }: ReviewsSectionProps) => {
  return (
    <section id="reviews" className={`py-20 bg-gradient-to-b from-background to-primary/5 ${fullPage ? 'min-h-screen' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">⭐ ОТЗЫВЫ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Что говорят <span className="text-gradient">наши клиенты</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            Реальные отзывы с Яндекс Карт
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-scale-in">
          <Card className="p-6 gradient-card border-primary/20 shadow-xl">
            <div 
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '600px'
              }}
            >
              <iframe
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #e6e6e6',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
                src="https://yandex.ru/maps-reviews-widget/105118454033?comments"
                title="Отзывы на Яндекс Картах"
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <a 
                href="https://yandex.ru/profile/105118454033" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  <Icon name="ExternalLink" className="mr-2" size={18} />
                  Посмотреть все отзывы на Яндекс Картах
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};