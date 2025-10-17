import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ServiceRequestForm from '@/components/ServiceRequestForm';

interface Service {
  id?: number;
  title: string;
  description: string;
  price: string;
  icon?: string;
  features?: string[];
  is_active?: boolean;
}

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  services: Service[];
  advantages: Advantage[];
}

export const ServicesSection = ({ services, advantages }: ServicesSectionProps) => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">🔧 РЕМОНТ И ОБСЛУЖИВАНИЕ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Услуги по <span className="text-gradient">ремонту</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Профессиональный ремонт любой сложности с гарантией
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.length > 0 ? services.map((service, index) => (
            <Card 
              key={service.id || index}
              className="group relative overflow-hidden p-6 hover:shadow-xl transition-all duration-500 animate-slide-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="mb-4">
                  <div className="inline-flex p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Icon name={service.icon || 'Wrench'} className="text-primary" size={28} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 border-t border-border pt-4">
                    {service.features.map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={12} className="text-primary" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          )) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Загрузка услуг...
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <ServiceRequestForm />
        </div>

        <div className="text-center mb-12 mt-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Почему <span className="text-gradient">выбирают нас</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <Card 
              key={index} 
              className="group p-6 text-center hover:shadow-xl transition-all duration-500 animate-slide-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:scale-110 transition-transform"></div>
                <div className="relative inline-flex p-4 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name={item.icon as any} className="text-primary" size={32} />
                </div>
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
