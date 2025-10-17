import Icon from '@/components/ui/icon';

interface BlogPostHeaderProps {
  title: string;
  category: string;
  date: string;
  readTime: string;
  icon: string;
  image: string;
}

export const BlogPostHeader = ({ title, category, date, readTime, icon, image }: BlogPostHeaderProps) => {
  return (
    <>
      <div className="relative h-[400px] -mt-8 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full mb-4">
              <Icon name={icon} size={16} className="text-primary" />
              <span className="text-sm font-semibold text-primary">{category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
          {title}
        </h1>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} />
            <span>{readTime} чтения</span>
          </div>
        </div>
      </div>
    </>
  );
};
