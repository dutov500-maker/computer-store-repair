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
        content: 'Мы занимаемся профессиональной сборкой и ремонтом компьютеров с 2010 года.'
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