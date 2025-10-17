import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Catalog = () => {
  const computers = [
    {
      id: 1,
      title: 'FHD Сборка',
      resolution: 'FHD',
      price: '70 000',
      image: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/7af8ccc7-5ee3-446f-b00e-337ddca48cfe.jpg',
      specs: ['Intel Core i5', 'RTX 3060', '16GB RAM', 'SSD 512GB']
    },
    {
      id: 2,
      title: 'QHD Сборка',
      resolution: 'QHD',
      price: '120 000',
      image: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/2b5dafce-7e95-461a-8ea0-672f75f983c8.jpg',
      specs: ['Intel Core i7', 'RTX 4070', '32GB RAM', 'SSD 1TB']
    },
    {
      id: 3,
      title: 'UHD Сборка',
      resolution: 'UHD',
      price: '200 000',
      image: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/b60f8712-bfd3-4260-86d2-608aea8266d6.jpg',
      specs: ['Intel Core i9', 'RTX 4090', '64GB RAM', 'SSD 2TB']
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Каталог компьютеров
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите готовую сборку под ваши задачи или создайте уникальную конфигурацию
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-heading font-bold mb-8">Игровые компьютеры</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {computers.map((pc, index) => (
              <Card 
                key={pc.id} 
                className="overflow-hidden bg-card hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-secondary to-background">
                  <img 
                    src={pc.image} 
                    alt={pc.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                    {pc.resolution}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold mb-4">{pc.title}</h3>
                  <ul className="space-y-2 mb-6">
                    {pc.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Check" size={16} className="text-primary" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">От</div>
                      <div className="text-2xl font-heading font-bold">{pc.price} ₽</div>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Подробнее
                      <Icon name="ArrowRight" size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Не нашли подходящую конфигурацию?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Мы подберем комплектующие специально под ваши задачи и бюджет
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Icon name="Settings" size={20} />
            Собрать свой компьютер
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Catalog;
