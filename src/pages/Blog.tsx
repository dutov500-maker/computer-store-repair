import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  icon: string;
}

const Blog = () => {
  const navigate = useNavigate();
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Как выбрать процессор для игрового ПК в 2024',
      excerpt: 'Полное руководство по выбору процессора: Intel vs AMD, количество ядер, частоты и другие важные параметры.',
      content: `При выборе процессора для игрового компьютера важно учитывать несколько ключевых факторов.
      
**Производитель**: Intel и AMD предлагают отличные решения для игр. Intel традиционно имеет преимущество в одноядерной производительности, а AMD предлагает больше ядер за те же деньги.

**Количество ядер**: Для современных игр достаточно 6-8 ядер. Процессоры с 12+ ядрами нужны только для стриминга и рендеринга.

**Частота**: Выбирайте процессоры с базовой частотой от 3.5 ГГц и возможностью разгона до 4.5-5 ГГц.

**Совместимость**: Убедитесь, что процессор совместим с выбранной материнской платой и оперативной памятью.`,
      category: 'Гайды',
      date: '15 октября 2024',
      readTime: '5 мин',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80',
      icon: 'Cpu'
    },
    {
      id: 2,
      title: 'Видеокарта: RTX 4070 vs RTX 4060 Ti',
      excerpt: 'Сравнение популярных видеокарт NVIDIA: производительность, цена, энергопотребление и оптимальные сценарии использования.',
      content: `Выбор между RTX 4070 и RTX 4060 Ti зависит от ваших задач и бюджета.

**RTX 4060 Ti (8GB)**:
- Цена: ~45 000 ₽
- Производительность: отлично для Full HD при высоких настройках
- Энергопотребление: 160W
- Оптимально для: 1080p игр, легкого стриминга

**RTX 4070 (12GB)**:
- Цена: ~65 000 ₽
- Производительность: уверенно тянет QHD при ультра настройках
- Энергопотребление: 200W
- Оптимально для: 1440p игр, рейтрейсинг, продвинутый стриминг

**Вывод**: Если играете в Full HD - берите 4060 Ti. Для QHD и будущего апгрейда монитора - 4070.`,
      category: 'Обзоры',
      date: '12 октября 2024',
      readTime: '7 мин',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80',
      icon: 'Sparkles'
    },
    {
      id: 3,
      title: 'Сборка ПК за 100 000 ₽: оптимальная конфигурация',
      excerpt: 'Подробный разбор сбалансированной сборки за 100К с объяснением выбора каждого компонента.',
      content: `**Конфигурация за 100 000 ₽:**

1. **Процессор**: Intel Core i5-13400F или AMD Ryzen 5 7600 (~18 000 ₽)
2. **Видеокарта**: RTX 4060 Ti 8GB (~45 000 ₽)
3. **Материнская плата**: B760 / B650 (~12 000 ₽)
4. **Оперативная память**: 16GB DDR4-3200 (~5 000 ₽)
5. **SSD**: 512GB NVMe (~4 000 ₽)
6. **Блок питания**: 650W 80+ Bronze (~5 000 ₽)
7. **Корпус**: с нормальным охлаждением (~5 000 ₽)
8. **Кулер**: башенный кулер (~3 000 ₽)

**Итого**: ~97 000 ₽ + запас на сборку

Эта конфигурация обеспечит комфортный гейминг в Full HD на ультра настройках в любых современных играх.`,
      category: 'Сборки',
      date: '10 октября 2024',
      readTime: '8 мин',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
      icon: 'Wrench'
    },
    {
      id: 4,
      title: 'Охлаждение ПК: воздушное vs водяное',
      excerpt: 'Разбираемся в системах охлаждения: когда нужна СВО, а когда достаточно хорошего башенного кулера.',
      content: `**Воздушное охлаждение**:
+ Надёжность: меньше компонентов, которые могут сломаться
+ Цена: дешевле при той же эффективности
+ Обслуживание: не требуется
- Габариты: может мешать установке ОЗУ
- Шум: может быть громче при максимальной нагрузке

**Водяное охлаждение (СВО)**:
+ Тише работает при высоких нагрузках
+ Компактнее в районе сокета
+ Выглядит эффектнее с RGB-подсветкой
- Дороже на 30-50%
- Риск протечки (минимальный, но есть)
- Требует периодического обслуживания

**Вывод**: Для процессоров до i7/Ryzen 7 достаточно хорошего башенного кулера за 3-5К. СВО имеет смысл для топовых i9/Ryzen 9 или если важна эстетика.`,
      category: 'Гайды',
      date: '8 октября 2024',
      readTime: '6 мин',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80',
      icon: 'Fan'
    },
    {
      id: 5,
      title: 'Апгрейд старого ПК: что менять в первую очередь',
      excerpt: 'Пошаговый план модернизации компьютера для максимального прироста производительности.',
      content: `**Приоритеты апгрейда**:

**1. SSD вместо HDD** (если ещё нет)
Самое заметное улучшение! Система загружается за 10 секунд вместо минуты.
Стоимость: 4 000 ₽ за 512GB

**2. Оперативная память до 16GB**
Если у вас меньше 16GB - это первый кандидат на замену.
Стоимость: 5 000 - 7 000 ₽

**3. Видеокарта**
Если процессор не старше 5 лет - меняйте видеокарту. Прирост FPS от 50% до 200%.
Стоимость: от 25 000 ₽

**4. Процессор + материнская плата**
Самый дорогой апгрейд. Имеет смысл, если процессору больше 5-6 лет.
Стоимость: от 30 000 ₽

**Совет**: Не меняйте всё сразу. Начните с SSD и ОЗУ - это даст заметный эффект за небольшие деньги.`,
      category: 'Гайды',
      date: '5 октября 2024',
      readTime: '5 мин',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80',
      icon: 'Settings'
    },
    {
      id: 6,
      title: 'Ошибки при сборке ПК: топ-5 проблем новичков',
      excerpt: 'Разбор частых ошибок при самостоятельной сборке компьютера и как их избежать.',
      content: `**5 распространённых ошибок**:

**1. Забыли установить заглушки I/O**
Нужно ставить ДО установки материнской платы, иначе придётся всё разбирать.

**2. Недостаточная мощность БП**
Берите БП с запасом 20-30%. RTX 4070 требует минимум 650W, а лучше 750W.

**3. Неправильная установка кулера**
Проверьте направление вентиляторов! Поток воздуха должен идти от передней к задней панели.

**4. Забыли снять защитную плёнку с подошвы кулера**
Процессор будет перегреваться до 90°C под нагрузкой.

**5. Один модуль ОЗУ вместо двух**
16GB в dual-channel (2x8GB) быстрее чем 16GB в single-channel (1x16GB) на 20-30%.

**Совет**: Если не уверены в своих силах - закажите профессиональную сборку. Это дешевле, чем замена сгоревших комплектующих.`,
      category: 'Советы',
      date: '1 октября 2024',
      readTime: '6 мин',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80',
      icon: 'AlertTriangle'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const categories = ['Все', 'Гайды', 'Обзоры', 'Сборки', 'Советы'];

  const filteredPosts = selectedCategory === 'Все' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">📚 БЛОГ</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              Блог о <span className="text-gradient">сборке ПК</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Гайды, обзоры, советы и актуальные новости из мира компьютерного железа
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 animate-slide-up hover:-translate-y-2 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    Читать статью
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="FileQuestion" className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground text-lg">
                Статей в этой категории пока нет
              </p>
            </div>
          )}

          <div className="mt-16 text-center">
            <Card className="p-8 max-w-2xl mx-auto gradient-card border-primary/20">
              <Icon name="Mail" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="font-heading font-bold text-2xl mb-3">
                Хотите получать новые статьи?
              </h3>
              <p className="text-muted-foreground mb-6">
                Подпишитесь на наш Telegram-канал и узнавайте первыми о новых гайдах и обзорах
              </p>
              <a href="https://t.me/+79950272707" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#0088cc] hover:bg-[#0088cc]/90">
                  <Icon name="Send" className="mr-2" size={20} />
                  Подписаться в Telegram
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;