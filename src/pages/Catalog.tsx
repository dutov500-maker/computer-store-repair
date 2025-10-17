import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const STATIC_CATALOG = [
  {
    id: 15,
    title: "ECO 1 ( Ryzen 5 5500 + GTX 1080 )",
    description: "Бюджетный игровой системный блок за 45.000 руб под Full HD Gaming",
    price: 45000,
    resolution: "Full HD",
    image_url: "https://cdn.poehali.dev/files/d79b0d18-d94b-4c73-8029-cecde6393f0a.png",
    specs: {
      cpu: "AMD Ryzen 5 5500",
      gpu: "GTX 1080",
      ram: "16GB",
      storage: "512GB SSD"
    }
  },
  {
    id: 16,
    title: "Eco #2",
    description: "Бюджетный игровой системный блок за 50.000 руб под Full HD Gaming",
    price: 50000,
    resolution: "Full HD",
    image_url: "https://cdn.poehali.dev/files/d79b0d18-d94b-4c73-8029-cecde6393f0a.png",
    specs: {
      cpu: "Intel Core i3-12100F",
      gpu: "RTX 3050",
      ram: "16GB",
      storage: "512GB SSD"
    }
  },
  {
    id: 17,
    title: "ECO 3 ( Ryzen 5 5600 + RTX 3060ti )",
    description: "Бюджетный игровой системный блок за 60.000 руб под Full HD Gaming",
    price: 65000,
    resolution: "Full HD",
    image_url: "https://cdn.poehali.dev/files/d79b0d18-d94b-4c73-8029-cecde6393f0a.png",
    specs: {
      cpu: "AMD Ryzen 5 5600",
      gpu: "RTX 3060ti",
      ram: "16GB",
      storage: "512GB SSD"
    }
  },
  {
    id: 18,
    title: "Special 1 ( Ryzen 5600 + RTX 5060 )",
    description: "Готовое решение для сборки за 75 тысяч рублей под Full-HD Gaming на Ультра настройках графики",
    price: 75000,
    resolution: "Full HD",
    image_url: "https://cdn.poehali.dev/files/d79b0d18-d94b-4c73-8029-cecde6393f0a.png",
    specs: {
      cpu: "AMD Ryzen 5 5600",
      gpu: "Palit RTX 5060 Dual 8GB",
      ram: "16GB",
      storage: "512GB SSD"
    }
  },
  {
    id: 19,
    title: "Special 2 (i5 12400F + RTX 5060)",
    description: "Готовое решение для сборки за 89 тысяч рублей под Full-HD Gaming на Ультра настройках графики",
    price: 89000,
    resolution: "FULL HD",
    image_url: "https://cdn.poehali.dev/files/d79b0d18-d94b-4c73-8029-cecde6393f0a.png",
    specs: {
      cpu: "Intel Core i5-12400F",
      gpu: "RTX 5060",
      ram: "16GB DDR4",
      storage: "512GB SSD"
    }
  },
  {
    id: 20,
    title: "Special 3 (Ryzen 8400F + RTX 5060)",
    description: "Готовое решение для сборки за 91 тысяч рублей под Full-HD Gaming на Ультра настройках графики",
    price: 91000,
    resolution: "Full HD",
    image_url: "https://cdn.poehali.dev/files/d79b0d18-d94b-4c73-8029-cecde6393f0a.png",
    specs: {
      cpu: "AMD Ryzen 5 8400F",
      gpu: "RTX 5060",
      ram: "16GB DDR5",
      storage: "512GB SSD"
    }
  }
];

const Catalog = () => {
  const [catalog] = useState<any[]>(STATIC_CATALOG);
  const loading = false;
  const error = null;

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
          ) : error ? (
            <div className="text-center py-12">
              <Icon name="AlertCircle" className="mx-auto mb-4 text-destructive" size={64} />
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchCatalog}>Повторить</Button>
            </div>
          ) : catalog.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Package" className="mx-auto mb-4 text-muted-foreground" size={64} />
              <p className="text-muted-foreground">Товары временно отсутствуют</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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