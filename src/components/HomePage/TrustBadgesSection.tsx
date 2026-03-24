import Icon from '@/components/ui/icon';

export const TrustBadgesSection = () => {
  const badges = [
    {
      icon: 'Star',
      value: '5.0',
      label: 'Яндекс Карты',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10 border-yellow-500/20'
    },
    {
      icon: 'Star',
      value: '5.0',
      label: 'Авито',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      icon: 'Users',
      value: '500+',
      label: 'Клиентов',
      color: 'text-primary',
      bg: 'bg-primary/10 border-primary/20'
    },
    {
      icon: 'ShieldCheck',
      value: '3 года',
      label: 'Гарантия',
      color: 'text-green-500',
      bg: 'bg-green-500/10 border-green-500/20'
    },
    {
      icon: 'Clock',
      value: '1-2 дня',
      label: 'Сборка',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20'
    }
  ];

  return (
    <section className="py-6 border-y border-border/50 bg-background/80 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${badge.bg} transition-all hover:scale-105`}
            >
              <Icon name={badge.icon as any} size={18} className={`${badge.color} fill-current`} />
              <div className="flex items-baseline gap-1">
                <span className={`font-bold text-base ${badge.color}`}>{badge.value}</span>
                <span className="text-xs text-muted-foreground">{badge.label}</span>
              </div>
            </div>
          ))}
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>г. Волжский</span>
          </div>
        </div>
      </div>
    </section>
  );
};
