import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
    <div className="min-h-screen bg-[#0A0A0A] text-white page-transition">
      <Header />

      <section className="py-24 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="text-[#FF6B00] font-mono text-sm tracking-[0.3em] uppercase mb-4">
              // Journal
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase leading-none">
              Журнал
              <br />
              <span className="text-[#FF6B00]">K|LAB</span>
            </h1>
            <p className="text-white/60 text-lg mt-6 max-w-xl">
              Гайды, обзоры железа, технические разборы и новости из мира ПК.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 font-mono text-xs tracking-widest uppercase border transition-all ${
                selectedCategory === category
                  ? 'bg-[#FF6B00] text-black border-[#FF6B00]'
                  : 'border-white/10 text-white/60 hover:border-[#FF6B00] hover:text-[#FF6B00]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(`/blog/${post.id}`)}
              className="group border border-white/10 hover:border-[#FF6B00]/60 bg-[#0D0D0D] transition-all cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase bg-[#FF6B00] text-black px-3 py-1">
                  {post.category}
                </div>
              </div>

              <div className="p-7">
                <div className="flex items-center gap-4 text-xs font-mono tracking-wider uppercase text-white/40 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Icon name="Calendar" size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="Clock" size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl uppercase text-white mb-3 line-clamp-2 group-hover:text-[#FF6B00] transition-colors">
                  {post.title}
                </h3>

                <p className="text-white/60 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="font-mono text-xs tracking-widest uppercase text-[#FF6B00]">
                    Читать
                  </span>
                  <Icon name="ArrowRight" size={16} className="text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 border border-white/10">
            <Icon name="FileQuestion" className="mx-auto mb-4 text-white/30" size={48} />
            <p className="text-white/50 font-mono tracking-wider uppercase">
              В категории пока нет статей
            </p>
          </div>
        )}

        <div className="mt-16 border border-[#FF6B00]/30 bg-[#FF6B00]/5 p-10 md:p-14 text-center">
          <Icon name="Send" className="mx-auto mb-6 text-[#FF6B00]" size={40} />
          <h3 className="font-heading text-3xl md:text-4xl font-black uppercase text-white mb-3">
            Новые статьи <span className="text-[#FF6B00]">первыми</span>
          </h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Подпишитесь на Telegram-канал и получайте гайды и обзоры сразу после выхода.
          </p>
          <a
            href="https://t.me/komplabvlz"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold tracking-widest uppercase px-10 py-5 text-sm"
          >
            <Icon name="Send" size={16} />
            Подписаться
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
