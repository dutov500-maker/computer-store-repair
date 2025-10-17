import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { PortfolioItem } from './types';

interface PortfolioTabProps {
  portfolio: PortfolioItem[];
  onAdd: () => void;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (id: number) => void;
}

const PortfolioTab = ({ portfolio, onAdd, onEdit, onDelete }: PortfolioTabProps) => {
  return (
    <Card>
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Портфолио работ</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Управляйте примерами выполненных работ
          </p>
        </div>
        <Button onClick={onAdd}>
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить работу
        </Button>
      </div>
      <div className="p-6">
        {portfolio.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Briefcase" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Портфолио пусто</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    {!item.is_active && <Badge variant="outline">Неактивно</Badge>}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  {item.price_range && (
                    <p className="text-sm font-medium mb-2">💰 {item.price_range}</p>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => onEdit(item)}
                    >
                      <Icon name="Edit" size={14} className="mr-1" />
                      Изменить
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => onDelete(item.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PortfolioTab;
