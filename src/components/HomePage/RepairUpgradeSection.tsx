import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const SERVICES = [
  {
    icon: 'Wrench',
    title: 'Ремонт любой сложности',
    desc: 'Чистка, замена термопасты, замена деталей',
  },
  {
    icon: 'Zap',
    title: 'Апгрейд под ваш бюджет',
    desc: 'Добавим RAM, SSD или новую видеокарту',
  },
  {
    icon: 'Stethoscope',
    title: 'Бесплатная диагностика при вас',
    desc: 'Выясним проблему за 15 минут без предоплаты',
  },
  {
    icon: 'Truck',
    title: 'Выезд к вам',
    desc: 'Мастер приедет в удобное время',
  },
];

export const RepairUpgradeSection = () => {
  return (
    <section className="py-20 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Ремонт и апгрейд
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Чиним то, от чего<br />другие отказались
          </h2>
          <p className="text-muted-foreground text-lg">
            Бесплатная диагностика при вас за 15 минут — без записи и предоплаты.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name={s.icon} size={22} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://t.me/komplabvlz?text=Привет!%20Хочу%20записаться%20в%20Лабораторию%20на%20диагностику"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8">
              <Icon name="Send" size={18} className="mr-2" />
              Записаться в Лабораторию
            </Button>
          </a>
          <Link to="/services">
            <Button variant="outline" size="lg" className="border-border hover:border-primary/50">
              <Icon name="List" size={16} className="mr-2" />
              Все услуги и цены
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};