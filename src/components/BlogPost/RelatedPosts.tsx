import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { BlogPost } from './BlogPostData';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: number;
}

export const RelatedPosts = ({ posts, currentPostId }: RelatedPostsProps) => {
  const relatedPosts = posts
    .filter(p => p.id !== currentPostId)
    .slice(0, 3);

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-heading font-bold mb-8">Читайте также</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((relatedPost) => (
          <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
              <div className="aspect-video overflow-hidden">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-3">
                  <Icon name={relatedPost.icon} size={14} className="text-primary" />
                  <span className="text-xs font-semibold text-primary">{relatedPost.category}</span>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {relatedPost.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{relatedPost.date}</span>
                  <span>{relatedPost.readTime}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/blog">
          <Button variant="outline" size="lg">
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Все статьи
          </Button>
        </Link>
      </div>
    </div>
  );
};
