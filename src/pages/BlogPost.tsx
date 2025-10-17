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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Статья не найдена</h1>
          <Button onClick={() => navigate('/blog')}>
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Вернуться к блогу
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-transition">
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
        
        <div className="container mx-auto px-4 max-w-4xl pb-20">
          <BlogPostContent content={post.content} />
          <RelatedPosts posts={blogPosts} currentPostId={post.id} />
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;