import Icon from '@/components/ui/icon';

export const RepairServicesSection = () => {
  const repairServices = [
    {
      icon: 'Wrench',
      title: 'Диагностика компьютера',
      description: 'Полная проверка всех компонентов и выявление неисправностей',
      price: 'от 500 ₽'
    },
    {
      icon: 'HardDrive',
      title: 'Замена комплектующих',
      description: 'Установка новых или замена неисправных деталей',
      price: 'от 800 ₽'
    },
    {
      icon: 'Fan',
      title: 'Чистка от пыли',
      description: 'Профессиональная чистка системы охлаждения',
      price: 'от 600 ₽'
    },
    {
      icon: 'Download',
      title: 'Установка Windows',
      description: 'Установка ОС и необходимых программ',
      price: 'от 1000 ₽'
    },
    {
      icon: 'Shield',
      title: 'Удаление вирусов',
      description: 'Полная проверка и удаление вредоносных программ',
      price: 'от 700 ₽'
    },
    {
      icon: 'Zap',
      title: 'Апгрейд системы',
      description: 'Улучшение производительности вашего ПК',
      price: 'от 1500 ₽'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Услуги по <span className="text-gradient">ремонту</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Профессиональный ремонт и обслуживание компьютеров
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {repairServices.map((service, index) => (
            <div
              key={index}
              className="group p-6 gradient-card rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Icon name={service.icon} className="text-primary" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  <p className="text-lg font-bold text-primary">{service.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
