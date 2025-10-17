import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PortfolioItem {
  image_url: string;
  title: string;
  description: string;
  is_active?: boolean;
}

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

export const PortfolioSection = ({ portfolio }: PortfolioSectionProps) => {
  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,hsl(var(--primary)/0.08),transparent_70%)]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">💼 ПОРТФОЛИО</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Наши <span className="text-gradient">работы</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Примеры собранных компьютеров для различных задач
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {portfolio.length > 0 ? (
            portfolio.map((work, index) => (
              <Card 
                key={index}
                className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-slide-up hover:-translate-y-2 border-primary/10 hover:border-primary/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={work.image_url} 
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    Подробнее →
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">{work.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{work.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Загрузка работ...
            </div>
          )}
        </div>

        <div className="text-center">
          <a 
            href="https://vk.com/labkomp" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Icon name="ExternalLink" size={20} />
              Больше работ в нашей группе ВК
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};