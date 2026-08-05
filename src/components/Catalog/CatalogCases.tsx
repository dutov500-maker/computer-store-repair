import Icon from '@/components/ui/icon';

interface CaseItem {
  photo: string;
  title: string;
  specs: { icon: string; text: string }[];
}

const cases: CaseItem[] = [
  {
    photo: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/6d6e2ccc-4bc5-4bbe-9c0d-2e5e0ad8c77b.jpeg',
    title: 'Новая мощная сборка',
    specs: [
      { icon: 'Cpu', text: 'AMD Ryzen 7 7800X3D' },
      { icon: 'Monitor', text: 'Palit RTX 5070 Ti GamingPro' },
      { icon: 'MemoryStick', text: 'XPG Lancer White 6000MHz' },
      { icon: 'HardDrive', text: '2TB Fast SSD' },
    ],
  },
  {
    photo: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/8367b37f-eb33-43b7-a654-20bde476f801.jpeg',
    title: 'Сборка ПК «под ключ»',
    specs: [
      { icon: 'Wrench', text: 'Подбор комплектующих' },
      { icon: 'Settings', text: 'Полная сборка и настройка' },
      { icon: 'Activity', text: 'Стресс-тест перед выдачей' },
      { icon: 'Truck', text: 'Доставка по Волжскому' },
    ],
  },
  {
    photo: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/28691ed3-2683-40bc-bc11-2a6c59fa2ab7.jpeg',
    title: 'Игровой ноутбук «под ключ»',
    specs: [
      { icon: 'Laptop', text: 'MSI Gaming Laptop' },
      { icon: 'Settings', text: 'Индивидуальная настройка' },
      { icon: 'Gift', text: 'Софт в подарок' },
      { icon: 'CheckCircle', text: 'Протестирован под задачи и игры' },
    ],
  },
];

export const CatalogCases = () => {
  return (
    <div className="mb-14">
      <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
        // Реальные сборки
      </div>
      <h2 className="font-heading text-3xl md:text-4xl font-black uppercase text-white leading-none mb-10">
        Готовые кейсы<span className="text-[#FF6B00]">.</span>{' '}
        <span className="text-white/40">Собрали — отдали — довольны</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map((c) => (
          <div
            key={c.title}
            className="border border-white/10 bg-[#0D0D0D] hover:border-[#FF6B00]/60 transition-all duration-500 overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={c.photo}
                alt={c.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-heading font-black text-base uppercase text-white mb-3">
                {c.title}
              </h3>
              <div className="space-y-1.5">
                {c.specs.map((s) => (
                  <div key={s.text} className="flex items-center gap-2 text-xs text-white/60">
                    <Icon name={s.icon} size={12} className="text-[#FF6B00] shrink-0" />
                    <span className="truncate">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
