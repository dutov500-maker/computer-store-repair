import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Repair {
  id: number;
  title: string;
  description: string;
  price: number;
  icon: string;
}

interface RepairsSectionProps {
  repairs: Repair[];
  onOrderClick: (repair: Repair) => void;
}

export const RepairsSection = ({ repairs, onOrderClick }: RepairsSectionProps) => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ремонт компьютеров
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Профессиональный ремонт и обслуживание вашего ПК
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {repairs.map((repair) => (
            <Card 
              key={repair.id}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={repair.icon as any} size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{repair.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {repair.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">От</p>
                  <p className="text-2xl font-bold">
                    {repair.price > 0 
                      ? `${repair.price.toLocaleString()} ₽`
                      : 'Бесплатно'
                    }
                  </p>
                </div>
                <Button onClick={() => onOrderClick(repair)} size="sm">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Заказать
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
