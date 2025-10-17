import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationForm from '@/components/ConsultationForm';
import ServiceRequestForm from '@/components/ServiceRequestForm';
import PCSelectionForm from '@/components/PCSelectionForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Index = () => {
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetchServices();
    fetchPortfolio();
    fetchSettings();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e?resource=services');
      const data = await response.json();
      if (response.ok && data.services) {
        setServices(data.services.filter((s: any) => s.is_active));
      }
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e?resource=portfolio');
      const data = await response.json();
      if (response.ok && data.portfolio) {
        setPortfolio(data.portfolio.filter((p: any) => p.is_active));
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e?resource=settings');
      const data = await response.json();
      if (response.ok) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

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
                src="https://cdn.poehali.dev/files/abecf990-0148-4af7-ace4-2c4056d6be5b.jpg"
                alt="Gaming PC"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Card className="p-8 md:p-12 bg-gradient-to-r from-card to-card/80 border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  Давайте подберём компьютер под ваши задачи
                </h2>
                <p className="text-muted-foreground mb-6">
                  Мы создаём компьютеры для решения любых задач. Наши сборки идеально сбалансированы - вы получаете лучшую производительность за свой бюджет
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://t.me/+79950272707" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button size="lg" className="w-full bg-[#0088cc] hover:bg-[#0088cc]/90 text-white">
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
                    <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                      <Icon name="MessageCircle" className="mr-2" size={20} />
                      Написать в WhatsApp
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  <Icon name="Phone" className="inline mr-1" size={14} />
                  +7 (995) 027-27-07
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="selection" className="py-20 bg-card/50">
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

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Услуги по ремонту
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Профессиональный ремонт компьютеров и ноутбуков любой сложности
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services.length > 0 ? services.map((service, index) => (
              <Card 
                key={service.id || index}
                className="p-6 hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={service.icon || 'Wrench'} className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <div className="text-primary font-bold">{service.price}</div>
                    {service.features && service.features.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {service.features.map((feature: string, idx: number) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="Check" size={12} className="text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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

          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 mt-20">
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

      <section id="works" className="py-20 bg-card/50">
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
            {portfolio.length > 0 ? (
              portfolio.map((work, index) => (
                <Card 
                  key={index}
                  className="overflow-hidden group hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={work.image_url} 
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-xl font-heading font-bold mb-1">{work.title}</h3>
                      <p className="text-sm text-muted-foreground">{work.description}</p>
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

      <section id="pc-selection" className="py-20 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Подбор компьютера
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Заполните анкету и мы поможем подобрать идеальный компьютер для ваших задач
            </p>
          </div>
          <PCSelectionForm />
        </div>
      </section>

      <section id="reviews" className="py-20 bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Отзывы наших клиентов
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Реальные отзывы с Яндекс Карт от наших клиентов
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-6 bg-card/80 backdrop-blur">
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

      <section id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Частые вопросы
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ответы на популярные вопросы наших клиентов
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: 'Какие гарантии вы предоставляете?',
                answer: 'Мы предоставляем гарантию до 3 лет на все комплектующие от официальных производителей. На нашу работу по сборке действует гарантия 1 год.'
              },
              {
                question: 'Сколько времени занимает сборка компьютера?',
                answer: 'Стандартная сборка занимает 1-2 дня. Если требуются комплектующие под заказ, срок может увеличиться до 5-7 дней.'
              },
              {
                question: 'Можно ли принести свои комплектующие?',
                answer: 'Да, мы можем собрать компьютер из ваших комплектующих. Стоимость работы по сборке составит от 2000 ₽.'
              },
              {
                question: 'Делаете ли вы выездной ремонт?',
                answer: 'Да, мы предоставляем услугу выездного ремонта. Стоимость выезда в пределах города - 500 ₽.'
              },
              {
                question: 'Какие способы оплаты вы принимаете?',
                answer: 'Мы принимаем оплату наличными, банковскими картами, переводом на карту и по безналичному расчету для юридических лиц.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 hover:border-primary transition-colors animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <h3 className="font-heading font-bold text-lg mb-3 flex items-start gap-3">
                  <Icon name="HelpCircle" className="text-primary flex-shrink-0 mt-1" size={20} />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground pl-8">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Где мы находимся
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Приходите к нам в мастерскую или закажите выездное обслуживание
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=105118454033" 
                width="100%" 
                height="400" 
                frameBorder="0"
                className="w-full"
                title="Компьютерная Лаборатория на карте"
              />
            </Card>
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

      <Footer />
    </div>
  );
};

export default Index;