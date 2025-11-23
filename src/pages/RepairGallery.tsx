import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface RepairImage {
  url: string;
  title: string;
  description: string;
}

const repairImages: RepairImage[] = [
  {
    url: 'https://cdn.poehali.dev/files/53556925-539f-4d42-8bee-635edf6c7fe1.png',
    title: 'Разборка MacBook Pro',
    description: 'Демонтаж материнской платы с модулем памяти Samsung'
  },
  {
    url: 'https://cdn.poehali.dev/files/27d273c3-6024-43dc-98dd-8648ad5029a4.png',
    title: 'Сборка игрового ПК',
    description: 'Белый корпус с RGB-подсветкой и жидкостным охлаждением'
  },
  {
    url: 'https://cdn.poehali.dev/files/e2ea3bd9-fbd6-4f30-8f3e-7afe25315365.jpg',
    title: 'Восстановление MacBook Pro',
    description: 'Ремонт петель и замена термопасты на системе охлаждения'
  },
  {
    url: 'https://cdn.poehali.dev/files/7c73d4f9-3a0c-435a-b190-14bbc228e477.jpg',
    title: 'Диагностика ноутбука Acer',
    description: 'Тестирование после чистки и замены термоинтерфейса'
  },
  {
    url: 'https://cdn.poehali.dev/files/f5349dfa-ad79-4647-be9f-4a071d83a7a8.jpg',
    title: 'Ремонт видеокарты',
    description: 'Детальный осмотр графического процессора и VRM'
  },
  {
    url: 'https://cdn.poehali.dev/files/f600c63c-5651-46d1-a09d-d4c7df174f2a.jpg',
    title: 'Материнская плата ноутбука',
    description: 'Осмотр после жидкостного повреждения и чистки'
  },
  {
    url: 'https://cdn.poehali.dev/files/4385f1fb-0c5d-4298-b222-6e2130ef7eee.jpg',
    title: 'Система охлаждения HP Omen',
    description: 'Двойная система с медными тепловыми трубками'
  },
  {
    url: 'https://cdn.poehali.dev/files/c80b1a35-d522-4ff5-b789-f6b0aa616ade.jpg',
    title: 'Ремонт ноутбука после залития',
    description: 'Очистка материнской платы от следов окисления'
  },
  {
    url: 'https://cdn.poehali.dev/files/2e274234-b4f1-44c3-a9f3-d60eec738953.jpg',
    title: 'Замена системы охлаждения',
    description: 'Новые кулеры Sunon и радиаторы для игрового ноутбука HP Omen'
  },
  {
    url: 'https://cdn.poehali.dev/files/d6867179-91d1-47ed-923a-b7cfcd4886c5.jpg',
    title: 'Готовый ноутбук Lenovo Legion',
    description: 'После полного обслуживания и апгрейда'
  }
];

export default function RepairGallery() {
  const [selectedImage, setSelectedImage] = useState<RepairImage | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            Галерея работ
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Профессиональный ремонт и обслуживание компьютерной техники. 
            Качество работы на каждом этапе.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repairImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-900"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-6 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {image.title}
                </h3>
                <p className="text-sm text-zinc-300">
                  {image.description}
                </p>
              </div>

              <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                >
                  <Icon name="Maximize2" size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl border-zinc-800 bg-zinc-950 p-0">
            {selectedImage && (
              <div className="flex flex-col">
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h2 className="mb-2 text-2xl font-bold text-white">
                    {selectedImage.title}
                  </h2>
                  <p className="text-zinc-400">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
