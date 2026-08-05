export const KLabHappyClients = () => {
  const clients = [
    {
      photo: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/6d6e2ccc-4bc5-4bbe-9c0d-2e5e0ad8c77b.jpeg',
      title: 'Новый клиент — новая мощная сборка!',
      subtitle: 'Ryzen 7 7800X3D · RTX 5070 Ti · 2TB SSD',
    },
    {
      photo: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/8367b37f-eb33-43b7-a654-20bde476f801.jpeg',
      title: 'Мощь из коробки!',
      subtitle: 'Сборка ПК "под ключ" — от подбора до настройки',
    },
    {
      photo: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/bucket/28691ed3-2683-40bc-bc11-2a6c59fa2ab7.jpeg',
      title: 'Ноутбук "под ключ"',
      subtitle: 'Подбор, настройка и софт в подарок',
    },
  ];

  return (
    <section className="bg-[#0A0A0A] py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
          // Happy Clients
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-black uppercase text-white leading-none mb-16">
          Наши клиенты<span className="text-[#FF6B00]">.</span>
          <br />
          <span className="text-white/40">Довольные и с новым железом</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clients.map((client, i) => (
            <div key={i} className="group relative">
              <div className="relative overflow-hidden border border-white/10 bg-[#111]">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={client.photo}
                    alt={client.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-[#FF6B00] text-black font-mono text-xs font-bold px-2 py-1 uppercase tracking-widest">
                    K Lab
                  </span>
                </div>
              </div>

              <div className="mt-4 border-l-2 border-[#FF6B00] pl-4">
                <div className="font-heading font-black text-white uppercase text-lg leading-tight">
                  {client.title}
                </div>
                <div className="text-white/60 font-mono text-sm mt-1">
                  {client.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};