const STANDARDS = [
  {
    icon: '🌡️',
    title: 'Климат-контроль',
    value: '22°C / 40% влажности',
    description: 'Поддерживаем идеальный микроклимат для сохранности каждого компонента на всех этапах сборки.',
  },
  {
    icon: '⚡',
    title: 'Антистатика',
    value: '100% защита электроники',
    description: 'Сборка только на антистатических покрытиях с заземлением — статический разряд исключён.',
  },
  {
    icon: '🔥',
    title: 'Стендовые испытания',
    value: '4 часа под 100% нагрузкой',
    description: 'Каждый ПК проходит стресс-тест перед отправкой. Если есть брак — мы найдём его до вас.',
  },
  {
    icon: '📲',
    title: 'Отчётность',
    value: 'Видео каждого этапа',
    description: 'Присылаем видео сборки прямо в ваш Telegram — видите процесс в реальном времени.',
  },
];

export const StandardsSection = () => {
  return (
    <section className="py-20 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Инфраструктура лаборатории
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-background mb-4">
            Наши стандарты
          </h2>
          <p className="text-background/60 text-lg">
            Не слова — процессы. Каждая сборка проходит через четыре обязательных этапа контроля.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STANDARDS.map((item) => (
            <div
              key={item.title}
              className="bg-background/5 border border-background/10 rounded-2xl p-6 hover:border-primary/50 hover:bg-background/8 transition-all duration-200"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <div className="text-primary text-sm font-bold uppercase tracking-wide mb-1">
                {item.value}
              </div>
              <h3 className="text-background font-heading font-bold text-lg mb-3">
                {item.title}
              </h3>
              <p className="text-background/55 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
