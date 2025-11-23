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
  },
  {
    url: 'https://cdn.poehali.dev/files/7ee56c73-98a8-4957-ae0c-232e8ea3033f.jpg',
    title: 'Чистка системного блока',
    description: 'Глубокая очистка корпуса и вентиляторов от пыли'
  },
  {
    url: 'https://cdn.poehali.dev/files/8c257930-0a3c-47d1-bb92-a00fc2d6f6cb.jpg',
    title: 'Чистка радиатора ПК',
    description: 'Удаление пылевых отложений с алюминиевого радиатора'
  },
  {
    url: 'https://cdn.poehali.dev/files/3fcef4d5-badb-4152-97ea-990a8af07a76.jpg',
    title: 'Тестирование GeForce RTX',
    description: 'Видеокарта с RGB-подсветкой Gaming Pro после ремонта'
  },
  {
    url: 'https://cdn.poehali.dev/files/1b692aa3-4bb7-44c7-a931-b67944d81e34.jpg',
    title: 'Ремонт видеокарты RTX',
    description: 'Замена термопасты на GPU и настройка системы питания'
  },
  {
    url: 'https://cdn.poehali.dev/files/d2c5d8c6-63b6-4d1f-899b-09b1751a907d.jpg',
    title: 'Чистка после залития',
    description: 'Загрязненный корпус ноутбука MSI перед чисткой'
  },
  {
    url: 'https://cdn.poehali.dev/files/79274275-a300-401f-865c-2c8d387e9e5b.jpg',
    title: 'Восстановление платы после залития',
    description: 'Следы окисления и коррозии на материнской плате'
  },
  {
    url: 'https://cdn.poehali.dev/files/60cf56be-bdb5-4de8-b515-06d9bbbc5986.jpg',
    title: 'Разборка видеокарты RTX 3080',
    description: 'Демонтаж системы охлаждения для замены термопасты'
  },
  {
    url: 'https://cdn.poehali.dev/files/072471be-037f-4d96-b38f-ff2850c01902.jpg',
    title: 'Тестирование GeForce RTX',
    description: 'Проверка работы видеокарты после ремонта системы охлаждения'
  },
  {
    url: 'https://cdn.poehali.dev/files/af8eb999-348f-4a08-a0e2-8301b6ac0ffe.jpg',
    title: 'Разборка RTX 3080 Palit',
    description: 'Снятие кожуха видеокарты для обслуживания'
  },
  {
    url: 'https://cdn.poehali.dev/files/ddd4b92e-f02c-41dd-8924-b0c7cfc36c5e.jpg',
    title: 'Полная разборка RTX 3080',
    description: 'Все компоненты видеокарты для глубокой чистки'
  },
  {
    url: 'https://cdn.poehali.dev/files/56f6922f-c2d3-4e62-a339-40b3a72d4a7d.jpg',
    title: 'Плата RTX 3080 без системы охлаждения',
    description: 'GPU и память GDDR6X готовы к замене термопасты'
  },
  {
    url: 'https://cdn.poehali.dev/files/77c63464-6653-4d1a-b7b6-1fa42ee59dd0.jpg',
    title: 'Система охлаждения RTX 3080',
    description: 'Медные радиаторы видеокарты высокого класса'
  },
  {
    url: 'https://cdn.poehali.dev/files/c63db1e5-0a37-4420-8b83-17f2a5dcf0bf.jpg',
    title: 'Ремонт видеокарты ASUS',
    description: 'Работа с платой GeForce GTX высокого уровня'
  },
  {
    url: 'https://cdn.poehali.dev/files/2312fee9-5978-49df-be7e-da650884333f.jpg',
    title: 'Разборка RTX с кулером',
    description: 'Система охлаждения Palit с тепловыми трубками'
  },
  {
    url: 'https://cdn.poehali.dev/files/63a42906-eed2-4915-866c-76dc53055a7f.jpg',
    title: 'Тест RTX после обслуживания',
    description: 'Видеокарта Colorful с белым дизайном работает исправно'
  },
  {
    url: 'https://cdn.poehali.dev/files/ffad20ec-f37c-4130-ad0e-5fa1664af903.jpg',
    title: 'Диагностика ноутбука Lenovo',
    description: 'Тестирование после ремонта и чистки системы'
  },
  {
    url: 'https://cdn.poehali.dev/files/f29b12d8-2f7a-46d6-af0b-e9cd1f67b361.png',
    title: 'Диагностика BSOD ошибки',
    description: 'Синий экран смерти на ноутбуке Lenovo - поиск причины'
  },
  {
    url: 'https://cdn.poehali.dev/files/d58d7116-949f-4576-846d-930f88a1bd44.png',
    title: 'Тестирование блока питания',
    description: 'Проверка напряжений питания с помощью тестера'
  },
  {
    url: 'https://cdn.poehali.dev/files/0f93a99d-8125-433a-96ae-5f85c708a849.png',
    title: 'Замена батареи ноутбука',
    description: 'Установка нового аккумулятора на ноутбук'
  },
  {
    url: 'https://cdn.poehali.dev/files/40010b80-7f41-4c08-bd85-0fecb8c0e747.png',
    title: 'Разборка MacBook Pro',
    description: 'Доступ к материнской плате для диагностики'
  },
  {
    url: 'https://cdn.poehali.dev/files/840081c4-ddfe-4483-9e62-e1c36e573d9f.png',
    title: 'Восстановление платы после залития',
    description: 'Чистка материнской платы от следов окисления'
  },
  {
    url: 'https://cdn.poehali.dev/files/23a22c7d-12d5-4803-abbd-f47452bcf9fe.png',
    title: 'Внутренности MacBook Pro',
    description: 'Материнская плата с аккумуляторной батареей'
  },
  {
    url: 'https://cdn.poehali.dev/files/3cf94858-d44c-4d2d-ad2d-37160e897755.png',
    title: 'Сборка игрового ПК',
    description: 'Белый корпус с RGB-подсветкой и жидкостным охлаждением'
  },
  {
    url: 'https://cdn.poehali.dev/files/0c3be981-59fb-430a-81c5-8de7c1b004b5.jpg',
    title: 'Тестирование видеокарты',
    description: 'Colorful GeForce RTX после замены системы охлаждения'
  },
  {
    url: 'https://cdn.poehali.dev/files/fd9599d3-1484-4b8e-9861-39a9ef069b1f.jpg',
    title: 'Видеокарта Colorful RTX 3060',
    description: 'Обратная сторона карты с логотипом и маркировкой'
  },
  {
    url: 'https://cdn.poehali.dev/files/065b6886-4193-41c7-96b0-a92b0fb10050.jpg',
    title: 'Разборка системы охлаждения',
    description: 'Демонтаж кулеров и радиаторов видеокарты'
  },
  {
    url: 'https://cdn.poehali.dev/files/3bd6a1f6-a558-48e6-aa81-6c7ced716372.jpg',
    title: 'Плата RTX 3060 Colorful',
    description: 'Открытая печатная плата видеокарты без охлаждения'
  },
  {
    url: 'https://cdn.poehali.dev/files/80e1078f-b116-4c38-812b-b3e647acd145.jpg',
    title: 'Система охлаждения видеокарты',
    description: 'Медные радиаторы с тепловыми трубками'
  },
  {
    url: 'https://cdn.poehali.dev/files/0cc6d2e1-c310-447d-9e7b-ed94f3b3a47e.jpg',
    title: 'Разобранная видеокарта RTX',
    description: 'Все компоненты системы охлаждения отдельно'
  },
  {
    url: 'https://cdn.poehali.dev/files/6d1e3643-51e7-4b1f-ba09-93e02c478c1f.jpg',
    title: 'Видеокарта Colorful Battle-AX',
    description: 'Двухвентиляторная система охлаждения с красным акцентом'
  },
  {
    url: 'https://cdn.poehali.dev/files/265f9614-9bf1-417d-8034-9c13447f6bd2.jpg',
    title: 'Тестирование FurMark',
    description: 'Стресс-тест видеокарты с мониторингом температур'
  },
  {
    url: 'https://cdn.poehali.dev/files/c8f49d2a-52c1-4074-8cce-1fb2990bc944.jpg',
    title: 'Обратная сторона видеокарты',
    description: 'Задняя панель платы RTX без системы охлаждения'
  },
  {
    url: 'https://cdn.poehali.dev/files/fe65b76d-f2bf-43c0-8ecb-0967801fb7c6.jpg',
    title: 'Бэкплейт видеокарты',
    description: 'Металлическая задняя крышка с вентиляционными отверстиями'
  },
  {
    url: 'https://cdn.poehali.dev/files/aa70b8d9-58a8-4310-84bf-93cea2ce3f17.jpg',
    title: 'Разборка HP Omen',
    description: 'Замена системы охлаждения игрового ноутбука'
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