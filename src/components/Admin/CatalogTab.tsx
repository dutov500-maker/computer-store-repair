import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { CatalogItem } from './types';

interface CatalogTabProps {
  catalog: CatalogItem[];
  onAdd: () => void;
  onEdit: (item: CatalogItem) => void;
  onDelete: (id: number) => void;
}

const CatalogTab = ({ catalog, onAdd, onEdit, onDelete }: CatalogTabProps) => {
  return (
    <Card>
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Каталог товаров</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Управляйте товарами в каталоге
          </p>
        </div>
        <Button onClick={onAdd}>
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить товар
        </Button>
      </div>
      <div className="p-6">
        {catalog.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Каталог пуст</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalog.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{item.resolution}</Badge>
                    <Badge className="bg-green-500">{item.price.toLocaleString('ru-RU')} ₽</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="space-y-1 mb-4 text-xs text-muted-foreground">
                    <p>🖥️ {item.specs.cpu}</p>
                    <p>🎮 {item.specs.gpu}</p>
                    <p>💾 {item.specs.ram} • {item.specs.storage}</p>
                  </div>
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

export default CatalogTab;
