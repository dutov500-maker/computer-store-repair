import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PageData {
  slug: string;
  title: string;
  content: string;
  meta_description: string;
}

const AboutPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPage(slug);
    }
  }, [slug]);

  const fetchPage = (pageSlug: string) => {
    setLoading(true);
    // Static page data
    const staticPages: Record<string, any> = {
      'about': {
        title: 'О компании',
        content: `
          <div class="space-y-6">
            <div class="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <span class="text-2xl">🏢</span>
                </div>
                <h2 class="text-2xl font-bold">Кто мы?</h2>
              </div>
              <p class="text-lg">
                Мы — команда энтузиастов и профессионалов, специализирующихся на сборке 
                персональных компьютеров любой сложности. Работаем в городе Волжский и 
                помогаем клиентам по всей России создать идеальный ПК для работы, игр или творчества.
              </p>
            </div>

            <div class="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <span class="text-2xl">🎯</span>
                </div>
                <h2 class="text-2xl font-bold">Наша миссия</h2>
              </div>
              <p class="text-lg">
                Сделать качественные игровые и рабочие компьютеры доступными для каждого. 
                Мы верим, что каждый заслуживает ПК, который полностью соответствует его 
                потребностям и бюджету, без переплат за ненужные функции.
              </p>
            </div>

            <div class="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <span class="text-2xl">⭐</span>
                </div>
                <h2 class="text-2xl font-bold">Наши преимущества</h2>
              </div>
              <div class="space-y-4 text-lg">
                <div class="flex gap-3">
                  <span class="text-orange-500 font-bold">✓</span>
                  <div>
                    <strong>Опыт и экспертиза:</strong> Более 5 лет на рынке, сотни довольных клиентов
                  </div>
                </div>
                <div class="flex gap-3">
                  <span class="text-orange-500 font-bold">✓</span>
                  <div>
                    <strong>Индивидуальный подход:</strong> Подбираем конфигурацию под ваши задачи и бюджет
                  </div>
                </div>
                <div class="flex gap-3">
                  <span class="text-orange-500 font-bold">✓</span>
                  <div>
                    <strong>Качественные комплектующие:</strong> Работаем только с проверенными брендами
                  </div>
                </div>
                <div class="flex gap-3">
                  <span class="text-orange-500 font-bold">✓</span>
                  <div>
                    <strong>Прозрачность:</strong> Полная детализация стоимости, без скрытых платежей
                  </div>
                </div>
                <div class="flex gap-3">
                  <span class="text-orange-500 font-bold">✓</span>
                  <div>
                    <strong>Техподдержка:</strong> Помогаем и консультируем даже после покупки
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
                <div class="text-4xl font-bold text-orange-500 mb-2">500+</div>
                <div class="text-sm">Собранных ПК</div>
              </div>
              <div class="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
                <div class="text-4xl font-bold text-orange-500 mb-2">4.9</div>
                <div class="text-sm">Средний рейтинг</div>
              </div>
              <div class="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
                <div class="text-4xl font-bold text-orange-500 mb-2">5 лет</div>
                <div class="text-sm">На рынке</div>
              </div>
            </div>
          </div>
        `
      },
      'services': {
        title: 'Наши услуги',
        content: 'Предоставляем полный спектр услуг по сборке, ремонту и обслуживанию компьютеров.'
      }
    };
    setPage(staticPages[pageSlug] || null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
              <p className="text-muted-foreground">Загрузка...</p>
            </div>
          ) : page ? (
            <Card className="max-w-4xl mx-auto p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">{page.title}</h1>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </Card>
          ) : (
            <div className="text-center py-12">
              <Icon name="AlertCircle" className="mx-auto mb-4 text-muted-foreground" size={64} />
              <h2 className="text-2xl font-heading font-bold mb-2">Страница не найдена</h2>
              <p className="text-muted-foreground">Запрашиваемая страница не существует</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;