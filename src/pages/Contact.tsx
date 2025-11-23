import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Contact = () => {
  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Адрес',
      content: 'г. Волжский, ул. Александрова д. 24а',
      subtitle: '"Компьютерная Лаборатория"'
    },
    {
      icon: 'Phone',
      title: 'Телефон',
      content: '+7 995 027 27 07',
      subtitle: 'Звоните в рабочее время'
    },
    {
      icon: 'Mail',
      title: 'Email',
      content: 'dutov.off@yandex.ru',
      subtitle: 'Ответим в течение часа'
    },
    {
      icon: 'Clock',
      title: 'Режим работы',
      content: 'Пн-Пт: 11:00 - 18:00',
      subtitle: 'Сб: 11:00 - 16:00, Вс: выходной'
    }
  ];

  const socialLinks = [
    { icon: 'Send', name: 'Telegram', color: 'hover:text-[#0088cc]', url: 'https://t.me/+79950272707' },
    { icon: 'Phone', name: 'Звонок', color: 'hover:text-primary', url: 'tel:+79950272707' },
    { icon: 'MessageCircle', name: 'WhatsApp', color: 'hover:text-[#25D366]', url: 'https://wa.me/79950272707' },
    { icon: 'Users', name: 'VK', color: 'hover:text-[#0077FF]', url: 'https://vk.com/labkomp' }
  ];

  return (
    <div className="min-h-screen page-transition">
      <Header />
      
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-4">
            <span className="text-sm font-semibold text-red-400">🎄 НОВОГОДНИЕ СКИДКИ ДО 15%</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Свяжитесь с <span className="text-primary">нами</span> 🎁
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Мы всегда рады ответить на ваши вопросы и помочь с выбором
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <Card 
                key={index}
                className="p-6 hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon name={item.icon} size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-foreground font-medium mb-1">
                      {item.content}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 animate-fade-in bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20" style={{ animationDelay: '400ms' }}>
            <h3 className="font-heading font-bold text-2xl mb-4 text-center">
              Свяжитесь с нами
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Выберите удобный способ связи — мы всегда на связи!
            </p>
            <div className="space-y-3">
              <a
                href="tel:+79950272707"
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="Phone" size={22} />
                Позвонить: +7 995 027 27 07
              </a>
              <a
                href="https://wa.me/79950272707"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-4 bg-[#25D366] text-white rounded-lg font-bold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="MessageCircle" size={22} />
                Написать в WhatsApp
              </a>
              <a
                href="https://t.me/+79950272707"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-4 bg-[#0088cc] text-white rounded-lg font-bold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={22} />
                Написать в Telegram
              </a>
              <a
                href="mailto:dutov.off@yandex.ru"
                className="w-full px-6 py-4 bg-secondary text-foreground border border-border rounded-lg font-bold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="Mail" size={22} />
                Email: dutov.off@yandex.ru
              </a>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              <Icon name="Clock" size={14} className="inline mr-1" />
              Пн-Пт: 11:00-18:00, Сб: 11:00-16:00
            </p>
          </Card>
        </div>

        <Card className="overflow-hidden animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-heading font-bold mb-6">
                Как до нас добраться
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg mt-1">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold mb-1">г. Волжский, ул. Александрова д. 24а</p>
                    <p className="text-sm text-muted-foreground">"Компьютерная Лаборатория"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg mt-1">
                    <Icon name="Bus" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Остановка "Александрова"</p>
                    <p className="text-sm text-muted-foreground">Автобусы: 16, 123</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg mt-1">
                    <Icon name="Car" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Парковка</p>
                    <p className="text-sm text-muted-foreground">Бесплатная парковка перед зданием</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Мы в социальных сетях:</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target={social.url.startsWith('http') ? '_blank' : undefined}
                      rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-all duration-300 hover:scale-110 ${social.color}`}
                      title={social.name}
                    >
                      <Icon name={social.icon} size={22} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-auto">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=105118454033" 
                width="100%" 
                height="100%" 
                frameBorder="0"
                className="absolute inset-0 w-full h-full min-h-[400px]"
                title="Яндекс Карта - Компьютерная Лаборатория"
              />
            </div>
          </div>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
              <Icon name="Headphones" size={32} className="text-primary" />
            </div>
            <h3 className="font-bold mb-2">Бесплатная консультация</h3>
            <p className="text-sm text-muted-foreground">Поможем выбрать комплектующие под ваши задачи</p>
          </Card>

          <Card className="p-6 text-center hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '700ms' }}>
            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
              <Icon name="Zap" size={32} className="text-primary" />
            </div>
            <h3 className="font-bold mb-2">Быстрый ответ</h3>
            <p className="text-sm text-muted-foreground">Отвечаем на заявки в течение 15 минут</p>
          </Card>

          <Card className="p-6 text-center hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
              <Icon name="MapPin" size={32} className="text-primary" />
            </div>
            <h3 className="font-bold mb-2">Удобное расположение</h3>
            <p className="text-sm text-muted-foreground">В центре города, легко добраться</p>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;