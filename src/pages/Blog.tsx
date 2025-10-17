import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { blogPosts } from '@/components/BlogPost/BlogPostData';

const Blog = () => {
  const navigate = useNavigate();
  const postsWithExcerpt = blogPosts.map(post => ({
    ...post,
    excerpt: post.content.split('\n\n')[0].replace(/[#*]/g, '').trim()
  }));
  
  const categories = ['Все', ...Array.from(new Set(blogPosts.map(p => p.category)))];
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  
  const filteredPosts = selectedCategory === 'Все' 
    ? postsWithExcerpt 
    : postsWithExcerpt.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen page-transition">
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