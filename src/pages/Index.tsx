import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationForm from '@/components/ConsultationForm';
import ServiceRequestForm from '@/components/ServiceRequestForm';
import PCSelectionForm from '@/components/PCSelectionForm';
import CounterStat from '@/components/CounterStat';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
      
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.08),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <span className="text-sm font-semibold text-primary">🎮 Игровые ПК от 50 000 ₽</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
                Создадим компьютер <span className="text-gradient">вашей мечты</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Индивидуальная сборка под любые задачи с гарантией до 3 лет
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#pc-selection">
                  <Button size="lg" className="gradient-primary text-lg px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    <Icon name="Gamepad2" className="mr-2" size={20} />
                    Подобрать компьютер
                  </Button>
                </a>
                <Link to="/catalog">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-2 hover:border-primary">
                    Каталог готовых сборок
                    <Icon name="ArrowRight" className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 gradient-card rounded-xl border border-primary/10">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Icon name="Package" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Новые комплектующие</p>
                    <p className="text-xs text-muted-foreground">Официальные поставщики</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 gradient-card rounded-xl border border-primary/10">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Icon name="Truck" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Бесплатная доставка</p>
                    <p className="text-xs text-muted-foreground">По всей России от 50к</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-3xl blur-3xl animate-pulse"></div>
              <div className="relative group">
                <img 
                  src="https://cdn.poehali.dev/files/abecf990-0148-4af7-ace4-2c4056d6be5b.jpg"
                  alt="Gaming PC"
                  className="relative rounded-2xl shadow-2xl w-full border border-primary/20 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white px-6 py-4 rounded-2xl shadow-xl">
                  <p className="text-sm font-semibold">Гарантия</p>
                  <p className="text-2xl font-bold">до 3 лет</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section id="selection" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.08),transparent_70%)]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">💰 ГОТОВЫЕ СБОРКИ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Решения под <span className="text-gradient">любой бюджет</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Сбалансированная производительность без переплат
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[
              { res: 'FHD', title: 'Начальный', desc: 'Full HD с высокими настройками', price: '50 000', gradient: 'from-blue-500/20 to-cyan-500/20', icon: 'Zap' },
              { res: 'QHD', title: 'Оптимальный', desc: 'Идеальный баланс для QHD', price: '120 000', gradient: 'from-primary/20 to-orange-500/20', icon: 'Sparkles', featured: true },
              { res: 'UHD', title: 'Максимум', desc: 'Безграничная мощь для 4K', price: '200 000', gradient: 'from-purple-500/20 to-pink-500/20', icon: 'Flame' }
            ].map((config, index) => (
              <Card 
                key={config.res}
                className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up ${
                  config.featured ? 'md:scale-110 border-primary shadow-lg shadow-primary/20 z-10' : 'hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {config.featured && (
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    ХИТ
                  </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-50`}></div>
                <div className="relative p-6 lg:p-8">
                  <div className="mb-6">
                    <div className="inline-block p-3 bg-primary/20 rounded-xl mb-4">
                      <Icon name={config.icon as any} className="text-primary" size={28} />
                    </div>
                    <div className="text-sm font-semibold text-primary mb-1">{config.res}</div>
                    <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-2">
                      {config.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {config.desc}
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm text-muted-foreground mb-1">От</div>
                    <div className="text-3xl lg:text-4xl font-heading font-bold">
                      {config.price} ₽
                    </div>
                  </div>
                  <Button 
                    className={`w-full ${config.featured ? 'gradient-primary' : 'bg-card hover:bg-primary hover:text-white'} group-hover:shadow-lg transition-all`}
                    size="lg"
                  >
                    Подробнее
                    <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/catalog">
              <Button size="lg" variant="outline" className="border-2 hover:border-primary hover:bg-primary hover:text-white text-lg px-8">
                Смотреть весь каталог
                <Icon name="ExternalLink" className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-colors"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={item.icon as any} className="text-primary" size={32} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_60%)]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Наши <span className="text-gradient">достижения</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <CounterStat end={500} suffix="+" label="Собранных ПК" icon="Cpu" delay={0} />
            <CounterStat end={3} label="Года на рынке" icon="Award" delay={100} />
            <CounterStat end={450} suffix="+" label="Довольных клиентов" icon="Users" delay={200} />
            <CounterStat end={99} suffix="%" label="Положительных отзывов" icon="Star" delay={300} />
          </div>
        </div>
      </section>

      <section id="works" className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">🖥️ ПОРТФОЛИО</span>
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
                  className="overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={work.image_url} 
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">{work.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{work.description}</p>
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

      <section id="pc-selection" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">📋 ПОДБОР ПК</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Подберём <span className="text-gradient">компьютер мечты</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
              Ответьте на несколько вопросов и получите персональную сборку
            </p>
          </div>
          <div className="animate-scale-in">
            <PCSelectionForm />
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-gradient-to-b from-background to-primary/5">
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

      <section id="faq" className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">❓ FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Частые <span className="text-gradient">вопросы</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Ответы на популярные вопросы о сборке компьютеров
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-6 md:p-8 gradient-card border-primary/20 shadow-xl">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border-border">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    Какие гарантии на собранный компьютер?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Мы предоставляем гарантию до 3 лет на все комплектующие. Бесплатный ремонт и техническая поддержка в течение всего гарантийного срока. Работаем только с официальными поставщиками.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-border">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    Как долго собирается компьютер?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Стандартная сборка занимает 1-3 рабочих дня. Если все комплектующие есть в наличии - можем собрать за 1 день. При необходимости заказа редких компонентов срок может увеличиться до 5-7 дней.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-border">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    Можно ли изменить комплектацию готовой сборки?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Да, абсолютно! Все наши сборки можно кастомизировать под ваши задачи и бюджет. Мы поможем подобрать оптимальные комплектующие с учётом ваших пожеланий.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-border">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    Есть ли доставка в другие города?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Да, доставляем по всей России. Бесплатная доставка при заказе от 50 000 ₽. Надёжно упаковываем каждый компьютер для безопасной транспортировки.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-border">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    Устанавливаете ли вы Windows и программы?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Да, устанавливаем лицензионную Windows, все необходимые драйверы и базовый набор программ. Также можем установить специализированное ПО по вашему запросу.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border-border">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    Можно ли посмотреть сборку перед покупкой?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Конечно! Вы можете приехать к нам в мастерскую, посмотреть готовые сборки, протестировать компьютер и задать любые вопросы нашим специалистам. Предварительно согласуйте визит по телефону.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7" className="border-border">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    Работаете ли вы с юридическими лицами?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Да, работаем как с физическими, так и с юридическими лицами. Предоставляем все необходимые документы, работаем по договору, возможна оплата по безналичному расчёту.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6 text-lg">
                Не нашли ответ на свой вопрос?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://t.me/+79950272707" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white shadow-lg">
                    <Icon name="Send" className="mr-2" size={20} />
                    Задать вопрос в Telegram
                  </Button>
                </a>
                <a href="https://wa.me/79950272707" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-lg">
                    <Icon name="MessageCircle" className="mr-2" size={20} />
                    Написать в WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">🏆 НАДЁЖНЫЕ БРЕНДЫ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Работаем только с <span className="text-gradient">лучшими брендами</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Официальные комплектующие от проверенных производителей
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <Card className="p-8 md:p-12 gradient-card border-primary/20 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
                {[
                  { name: 'Intel', icon: 'Cpu' },
                  { name: 'AMD', icon: 'Cpu' },
                  { name: 'NVIDIA', icon: 'Gpu' },
                  { name: 'Corsair', icon: 'Server' },
                  { name: 'ASUS', icon: 'Monitor' },
                  { name: 'MSI', icon: 'Cpu' },
                  { name: 'Gigabyte', icon: 'HardDrive' },
                  { name: 'Kingston', icon: 'Database' },
                  { name: 'Samsung', icon: 'HardDrive' },
                  { name: 'Cooler Master', icon: 'Fan' }
                ].map((brand, index) => (
                  <div 
                    key={brand.name}
                    className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 group animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl group-hover:scale-110 transition-transform">
                      <Icon name={brand.icon as any} className="text-primary" size={32} />
                    </div>
                    <p className="font-semibold text-sm text-center group-hover:text-primary transition-colors">
                      {brand.name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-border text-center">
                <p className="text-muted-foreground">
                  <Icon name="Shield" className="inline mr-2 text-primary" size={18} />
                  Гарантия качества и официальная поддержка производителей
                </p>
              </div>
            </Card>
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