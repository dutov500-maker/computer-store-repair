import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { blogPosts } from '@/components/BlogPost/BlogPostData';
import { BlogPostHeader } from '@/components/BlogPost/BlogPostHeader';
import { BlogPostContent } from '@/components/BlogPost/BlogPostContent';
import { RelatedPosts } from '@/components/BlogPost/RelatedPosts';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center px-6">
          <div className="font-mono text-xs tracking-[0.3em] text-[#FF6B00] uppercase mb-4">
            // 404
          </div>
          <h1 className="font-heading text-4xl font-black uppercase text-white mb-6">
            Статья не найдена
          </h1>
          <Button
            onClick={() => navigate('/blog')}
            className="bg-[#FF6B00] hover:bg-[#FF8A2E] text-black font-bold tracking-widest uppercase rounded-none px-8 py-5 text-xs"
          >
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            К журналу
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white page-transition">
      <Header />
      <article className="pt-8">
        <BlogPostHeader
          title={post.title}
          category={post.category}
          date={post.date}
          readTime={post.readTime}
          icon={post.icon}
          image={post.image}
        />

        <div className="container mx-auto px-6 max-w-4xl pb-20">
          <BlogPostContent content={post.content} />
          <RelatedPosts posts={blogPosts} currentPostId={post.id} />
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;