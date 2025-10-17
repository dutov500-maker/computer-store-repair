import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  icon: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Как выбрать процессор для игрового ПК в 2024',
      content: `При выборе процессора для игрового компьютера важно учитывать несколько ключевых факторов.

## Производитель: Intel vs AMD

Intel и AMD предлагают отличные решения для игр. Intel традиционно имеет преимущество в одноядерной производительности, что важно для многих игр. AMD предлагает больше ядер за те же деньги и отличается лучшей энергоэффективностью.

**Актуальные линейки:**
- Intel: Core i5-13400F, i5-14600K, i7-14700K
- AMD: Ryzen 5 7600, Ryzen 7 7800X3D, Ryzen 9 7950X3D

## Количество ядер и потоков

Для современных игр достаточно 6-8 ядер. Процессоры с 12+ ядрами нужны только для одновременного стриминга, рендеринга видео или профессиональных задач.

**Рекомендации:**
- **Бюджетные игры**: 6 ядер / 12 потоков (i5-13400F, Ryzen 5 7600)
- **Средний уровень**: 8 ядер / 16 потоков (i7-14700K без E-cores, Ryzen 7 7800X3D)
- **Топовый уровень**: 12+ ядер (i9-14900K, Ryzen 9 7950X3D)

## Частота процессора

Выбирайте процессоры с базовой частотой от 3.5 ГГц и возможностью разгона до 4.5-5 ГГц. Высокая частота напрямую влияет на FPS в играх.

**Важно:** Процессоры с индексом "X3D" от AMD имеют специальный 3D V-Cache, что даёт прирост до 15-30% в играх.

## Совместимость с материнской платой

- **Intel 13-14 поколение**: Socket LGA 1700 (платы B760, Z790)
- **AMD Ryzen 7000**: Socket AM5 (платы B650, X670)

Убедитесь, что процессор совместим с выбранной материнской платой и поддерживает нужный тип памяти (DDR4 или DDR5).

## Охлаждение

- **Бюджетные процессоры** (до 65W): достаточно боксового кулера или недорогого башенного за 2-3К
- **Средний уровень** (125W): хороший башенный кулер за 3-5К (Deepcool AK400, Arctic Freezer 34)
- **Топовые процессоры** (180W+): мощный башенный (7-10К) или водяное охлаждение (15-20К)

## Итоговые рекомендации

**Бюджет до 20К:**
- Intel Core i5-13400F (~18 000 ₽) - лучший выбор цена/качество
- AMD Ryzen 5 7600 (~20 000 ₽) - более современная платформа

**Бюджет 30-35К:**
- AMD Ryzen 7 7800X3D (~35 000 ₽) - король игр в 2024

**Бюджет 50К+:**
- Intel Core i9-14900K или AMD Ryzen 9 7950X3D - для энтузиастов`,
      category: 'Гайды',
      date: '15 октября 2024',
      readTime: '5 мин',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&q=80',
      icon: 'Cpu'
    },
    {
      id: 2,
      title: 'Видеокарта: RTX 4070 vs RTX 4060 Ti',
      content: `Выбор между RTX 4070 и RTX 4060 Ti зависит от ваших задач, бюджета и монитора.

## RTX 4060 Ti (8GB)

**Технические характеристики:**
- Ядра CUDA: 4352
- Память: 8GB GDDR6, 128-bit
- TDP: 160W
- Цена: ~45 000 ₽

**Производительность:**
- Full HD (1080p): 120-180 FPS в AAA-играх на ультра настройках
- QHD (1440p): 60-90 FPS на высоких настройках
- 4K: не рекомендуется

**Оптимально для:**
- Игр в Full HD на максимальных настройках
- Бюджетного стриминга
- Компактных сборок (низкое энергопотребление)

## RTX 4070 (12GB)

**Технические характеристики:**
- Ядра CUDA: 5888
- Память: 12GB GDDR6X, 192-bit
- TDP: 200W
- Цена: ~65 000 ₽

**Производительность:**
- Full HD (1080p): 180-240+ FPS на ультра
- QHD (1440p): 100-144 FPS на ультра
- 4K: 50-70 FPS на высоких настройках

**Оптимально для:**
- Игр в QHD на максимальных настройках
- Рейтрейсинга с DLSS
- Продвинутого стриминга
- Будущего апгрейда монитора

## Технологии NVIDIA

**DLSS 3.0:**
Обе карты поддерживают Frame Generation, что удваивает FPS в поддерживаемых играх.

**Рейтрейсинг:**
RTX 4070 на 35% быстрее в играх с RT благодаря большему количеству RT-ядер.

## Энергопотребление

- RTX 4060 Ti: рекомендуется БП от 550W
- RTX 4070: рекомендуется БП от 650W

## Итоговое сравнение

| Характеристика | RTX 4060 Ti | RTX 4070 |
|----------------|-------------|----------|
| Цена | 45 000 ₽ | 65 000 ₽ |
| 1080p Ultra | ★★★★★ | ★★★★★ |
| 1440p Ultra | ★★★☆☆ | ★★★★★ |
| 4K | ★☆☆☆☆ | ★★★☆☆ |
| RT Performance | ★★★☆☆ | ★★★★☆ |
| Энергоэффект. | ★★★★★ | ★★★★☆ |

## Вывод

**Берите RTX 4060 Ti если:**
- У вас монитор Full HD и вы не планируете апгрейд
- Бюджет ограничен 50К на видеокарту
- Важна энергоэффективность и тихая работа
- Играете в киберспортивные игры

**Берите RTX 4070 если:**
- У вас монитор QHD или планируете покупку
- Хотите максимум от рейтрейсинга
- Стримите или работаете с видео
- Планируете использовать карту 3-5 лет`,
      category: 'Обзоры',
      date: '12 октября 2024',
      readTime: '7 мин',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&q=80',
      icon: 'Sparkles'
    },
    {
      id: 3,
      title: 'Сборка ПК за 100 000 ₽: оптимальная конфигурация',
      content: `Разберём сбалансированную сборку игрового компьютера за 100 000 рублей с объяснением выбора каждого компонента.

## Полная конфигурация

### 1. Процессор: Intel Core i5-13400F — 18 000 ₽

**Почему именно он:**
- 10 ядер (6P+4E) / 16 потоков
- Частота до 4.6 ГГц
- Отличная производительность в играх
- Не требует мощного охлаждения
- Лучшее соотношение цена/производительность в 2024

**Альтернатива:** AMD Ryzen 5 7600 (~20 000 ₽) - более современная платформа AM5

### 2. Видеокарта: RTX 4060 Ti 8GB — 45 000 ₽

**Почему именно она:**
- Уверенно тянет Full HD на ультра настройках
- Поддержка DLSS 3.0 и Frame Generation
- Низкое энергопотребление (160W)
- Отличный рейтрейсинг для своей цены

### 3. Материнская плата: B760M — 12 000 ₽

**Что важно:**
- Сокет LGA 1700 для Intel 13 поколения
- Поддержка DDR4 (дешевле DDR5)
- 4 слота памяти для будущего апгрейда
- M.2 слоты для NVMe SSD

**Рекомендуемые модели:** MSI PRO B760M-A, Gigabyte B760M DS3H

### 4. Оперативная память: 16GB DDR4-3200 — 5 000 ₽

**Конфигурация:**
- 2 планки по 8GB (dual channel - обязательно!)
- Частота 3200 МГц (оптимум для i5-13400F)
- CL16 латентность

**Бренды:** Kingston Fury, Crucial, Corsair Vengeance

### 5. SSD: 512GB NVMe M.2 — 4 000 ₽

**Параметры:**
- Интерфейс: NVMe PCIe 3.0 (достаточно для игр)
- Объём: 512GB (система + 3-5 игр)
- Скорость чтения: 3000+ MB/s

**Рекомендации:** Kingston NV2, WD Blue SN570, Crucial P3

### 6. Блок питания: 650W 80+ Bronze — 5 000 ₽

**Требования:**
- Мощность: 650W (с запасом 30%)
- Сертификация: минимум 80+ Bronze
- Модульный кабель-менеджмент (опционально)

**Бренды:** Aerocool, Chieftec, DeepCool

### 7. Корпус: средний ATX — 5 000 ₽

**Что важно:**
- Хорошая вентиляция (2-3 вентилятора в комплекте)
- Поддержка видеокарт до 320mm
- Пылевые фильтры
- Прозрачная боковая панель (опционально)

**Модели:** DeepCool MATREXX 55, Zalman S2, AeroCool Cylon

### 8. Кулер процессора: башенный — 3 000 ₽

**Параметры:**
- Высота: до 155mm (проверить совместимость с корпусом)
- TDP: 180-200W (i5-13400F греется до 100W)
- Тихая работа: до 25 dB

**Рекомендации:** DeepCool AK400, Arctic Freezer 34

## Итого: ~97 000 ₽ + сборка

Остаётся 3 000 ₽ на сборку или можно улучшить один из компонентов.

## Производительность этой сборки

**Игры в Full HD (1080p):**
- Cyberpunk 2077: 90-120 FPS (ультра + DLSS)
- Hogwarts Legacy: 80-100 FPS (высокие)
- CS2: 200-300 FPS (максимальные)
- Fortnite: 144+ FPS стабильно
- GTA V: 120-150 FPS (ультра)

## Возможности апгрейда

**В ближайший год:**
- +8GB ОЗУ → 24GB (~2 500 ₽)
- +1TB HDD → хранилище (~3 000 ₽)

**Через 2-3 года:**
- Замена GPU на RTX 5060/5070
- Процессор i5-13400F ещё 3-4 года актуален

## Альтернативные варианты

**Если нужна мощнее видеокарта:**
- Уменьшить SSD до 256GB (-1 500 ₽)
- Взять боксовый кулер Intel (-3 000 ₽)
- Добавить к GPU → RTX 4060 Ti 16GB (~50 000 ₽)

**Если важна тишина:**
- Более дорогой корпус с шумоизоляцией (+2 000 ₽)
- Be Quiet кулер (+2 000 ₽)
- 80+ Gold БП (+2 000 ₽)`,
      category: 'Сборки',
      date: '10 октября 2024',
      readTime: '8 мин',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&q=80',
      icon: 'Wrench'
    }
  ];

  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileQuestion" className="mx-auto mb-4 text-muted-foreground" size={64} />
          <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
          <Link to="/blog">
            <Button>Вернуться к блогу</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      <Header />
      
      <article className="py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="mb-6"
          >
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад к блогу
          </Button>

          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  {post.date}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                {post.title}
              </h1>

              <div className="aspect-video rounded-2xl overflow-hidden mb-8 border border-border">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={index} className="text-3xl font-heading font-bold mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <p key={index} className="font-bold text-lg mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                }

                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="text-foreground">
                          {item.replace('- ', '').replace(/\*\*/g, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (paragraph.includes('|')) {
                  return null;
                }

                return (
                  <p key={index} className="mb-4 text-foreground leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Icon name="Share2" className="mr-2" size={16} />
                    Поделиться
                  </Button>
                </div>
                <div className="flex gap-2">
                  <a href="https://t.me/+79950272707" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-[#0088cc] hover:bg-[#0088cc]/90">
                      <Icon name="Send" className="mr-2" size={16} />
                      Telegram
                    </Button>
                  </a>
                  <a href="https://wa.me/79950272707" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-[#25D366] hover:bg-[#25D366]/90">
                      <Icon name="MessageCircle" className="mr-2" size={16} />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-heading font-bold mb-6">
                  Похожие статьи
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card
                      key={relatedPost.id}
                      className="group overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
                      onClick={() => navigate(`/blog/${relatedPost.id}`)}
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{relatedPost.date}</span>
                          <span>•</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
