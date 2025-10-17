import Header from '@/components/Header';
import ConsultationForm from '@/components/ConsultationForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Index = () => {
  const advantages = [
    {
      icon: 'Package',
      title: 'Только новые комплектующие',
      description: 'Работаем только с официальными поставщиками'
    },
    {
      icon: 'Truck',
      title: 'Бесплатная доставка',
      description: 'По всей России при заказе от 50 000 ₽'
    },
    {
      icon: 'Shield',
      title: 'Гарантия качества',
      description: 'До 3 лет на все комплектующие'
    },
    {
      icon: 'Wrench',
      title: 'Бесплатный ремонт',
      description: 'В течение гарантийного срока'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                Создадим компьютер вашей мечты
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Игровые компьютеры от 70 000 рублей
              </p>
              <div className="flex flex-wrap gap-4">
                <ConsultationForm trigger={
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                    Подобрать компьютер
                  </Button>
                } />
                <Link to="/catalog">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Каталог
                    <Icon name="ArrowRight" size={20} />
                  </Button>
                </Link>
              </div>
              <div className="flex gap-6 mt-8">
                <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-lg border border-border">
                  <Icon name="Cpu" className="text-primary" size={24} />
                  <span className="text-sm">Только новые комплектующие</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-lg border border-border">
                  <Icon name="Truck" className="text-primary" size={24} />
                  <span className="text-sm">Бесплатная доставка</span>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl"></div>
              <img 
                src="https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/b60f8712-bfd3-4260-86d2-608aea8266d6.jpg"
                alt="Gaming PC"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Выгодные решения под любой бюджет
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы подберем комплектующие соблюдая баланс - цена/производительность, и не экономим на качестве в погоне за самой низкой ценой
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {['FHD', 'QHD', 'UHD'].map((resolution, index) => (
              <Card 
                key={resolution}
                className="relative overflow-hidden group hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-8">
                  <div className="text-6xl font-heading font-bold text-muted mb-4">{resolution}</div>
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    {resolution === 'FHD' && 'Начальный уровень'}
                    {resolution === 'QHD' && 'Оптимальный выбор'}
                    {resolution === 'UHD' && 'Максимум мощности'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {resolution === 'FHD' && 'Отличное решение для игр в Full HD с высокими настройками графики'}
                    {resolution === 'QHD' && 'Идеальный баланс производительности и цены для QHD-гейминга'}
                    {resolution === 'UHD' && 'Безграничная мощность для 4K-игр и профессиональных задач'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">От</div>
                      <div className="text-2xl font-heading font-bold">
                        {resolution === 'FHD' && '70 000 ₽'}
                        {resolution === 'QHD' && '120 000 ₽'}
                        {resolution === 'UHD' && '200 000 ₽'}
                      </div>
                    </div>
                    <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon name="ArrowRight" size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Смотреть все сборки
                <Icon name="ArrowRight" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Наши преимущества
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((item, index) => (
              <Card 
                key={index} 
                className="p-6 text-center hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon as any} className="text-primary" size={32} />
                </div>
                <h3 className="font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Наши работы
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Примеры собранных нами компьютеров для игр, работы и творчества
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              {
                image: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/4411866f-6b88-4906-b361-b61006c52f6b.jpg',
                title: 'Игровая станция Premium',
                description: 'Мощная сборка для 4K-гейминга'
              },
              {
                image: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/f640ba71-1984-4233-ad18-c61376c8d6de.jpg',
                title: 'Рабочая станция',
                description: 'Оптимальная конфигурация для работы'
              },
              {
                image: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/b7124fb7-4401-4730-9bb4-9d4c2a163e21.jpg',
                title: 'Стримерская сборка',
                description: 'Для стриминга и контент-создания'
              }
            ].map((work, index) => (
              <Card 
                key={index}
                className="overflow-hidden group hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-heading font-bold mb-1">{work.title}</h3>
                    <p className="text-sm text-muted-foreground">{work.description}</p>
                  </div>
                </div>
              </Card>
            ))}
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

      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary-foreground">
            Готовы собрать компьютер мечты?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Оставьте заявку, и наши специалисты помогут подобрать идеальную конфигурацию
          </p>
          <ConsultationForm />
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Cpu" className="text-primary-foreground" size={24} />
                </div>
                <span className="text-xl font-heading font-bold">Компьютерная Лаборатория</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональная сборка игровых компьютеров и ноутбуков
              </p>
              <a 
                href="https://yandex.ru/profile/105118454033?lang=ru" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Icon name="MapPin" size={16} />
                Мы на Яндекс.Картах
              </a>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Подбор ПК</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Услуги</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">О компании</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Гарантия</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Доставка</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+79950272707" className="hover:text-primary transition-colors">+7 995 027 27 07</a>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:info@gurupc.ru" className="hover:text-primary transition-colors">info@gurupc.ru</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Компьютерная Лаборатория. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;