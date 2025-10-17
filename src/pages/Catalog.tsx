import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Catalog = () => {
  const [catalog, setCatalog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753?resource=catalog');
      const data = await response.json();
      if (response.ok && data.catalog && data.catalog.length > 0) {
        setCatalog(data.catalog.filter((item: any) => item.is_active));
      } else {
        setCatalog([]);
      }
    } catch (error) {
      console.error('Failed to fetch catalog:', error);
      setCatalog([]);
    } finally {
      setLoading(false);
    }
  };

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
          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
              <p className="text-muted-foreground">Загрузка...</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalog.map((pc, index) => (
              <Card 
                key={pc.id} 
                className="overflow-hidden bg-card hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-secondary to-background">
                  {pc.image_url ? (
                    <img 
                      src={pc.image_url} 
                      alt={pc.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="Monitor" size={64} className="text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                    {pc.resolution}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold mb-4">{pc.title}</h3>
                  {pc.description && (
                    <p className="text-muted-foreground mb-4 text-sm">{pc.description}</p>
                  )}
                  {pc.specs && (
                    <ul className="space-y-2 mb-6">
                      {Object.entries(pc.specs).map(([key, value], i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={16} className="text-primary" />
                          <span className="capitalize">{key}:</span> {value as string}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">От</div>
                      <div className="text-2xl font-heading font-bold">{pc.price.toLocaleString()} ₽</div>
                    </div>
                    <Link to={`/product/${pc.id}`}>
                      <Button className="bg-primary hover:bg-primary/90">
                        Подробнее
                        <Icon name="ArrowRight" size={18} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          )}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Не нашли подходящую конфигурацию?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Мы подберем комплектующие специально под ваши задачи и бюджет
          </p>
          <a href="/#pc-selection">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Icon name="Settings" size={20} />
              Собрать свой компьютер
            </Button>
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Catalog;