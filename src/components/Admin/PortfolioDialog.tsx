import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { PortfolioItem } from './types';

interface PortfolioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: PortfolioItem | null;
  formData: {
    title: string;
    description: string;
    image_url: string;
    category: string;
    specs: string;
    price_range: string;
    completion_date: string;
  };
  imagePreview: string;
  uploadingImage: boolean;
  onFormChange: (data: any) => void;
  onImagePreviewChange: (url: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const PortfolioDialog = ({
  open,
  onOpenChange,
  editingItem,
  formData,
  imagePreview,
  uploadingImage,
  onFormChange,
  onImagePreviewChange,
  onImageUpload,
  onSave
}: PortfolioDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Редактировать работу' : 'Добавить работу'}
          </DialogTitle>
          <DialogDescription>
            Заполните информацию о выполненной работе
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="title">Название работы *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => onFormChange({...formData, title: e.target.value})}
              placeholder="Игровой ПК на RTX 4090"
            />
          </div>

          <div>
            <Label htmlFor="category">Категория *</Label>
            <select
              id="category"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.category}
              onChange={(e) => onFormChange({...formData, category: e.target.value})}
            >
              <option value="Игровой ПК">Игровой ПК</option>
              <option value="Рабочая станция">Рабочая станция</option>
              <option value="Офисный ПК">Офисный ПК</option>
              <option value="Сервер">Сервер</option>
              <option value="Upgrade">Upgrade</option>
            </select>
          </div>

          <div>
            <Label htmlFor="description">Описание *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onFormChange({...formData, description: e.target.value})}
              placeholder="Мощный игровой компьютер для стриминга..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Изображение *</Label>
            
            {imagePreview && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    onImagePreviewChange('');
                    onFormChange({...formData, image_url: ''});
                  }}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            )}

            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  disabled={uploadingImage}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs text-muted-foreground">или</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <Input
              id="image_url"
              value={formData.image_url.startsWith('data:') ? '' : formData.image_url}
              onChange={(e) => {
                onFormChange({...formData, image_url: e.target.value});
                onImagePreviewChange(e.target.value);
              }}
              placeholder="Вставьте URL изображения"
            />
          </div>

          <div>
            <Label htmlFor="specs">Характеристики</Label>
            <Textarea
              id="specs"
              value={formData.specs}
              onChange={(e) => onFormChange({...formData, specs: e.target.value})}
              placeholder="RTX 4090, i9-14900K, 64GB RAM..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price_range">Цена</Label>
              <Input
                id="price_range"
                value={formData.price_range}
                onChange={(e) => onFormChange({...formData, price_range: e.target.value})}
                placeholder="250 000 ₽"
              />
            </div>
            <div>
              <Label htmlFor="completion_date">Дата выполнения</Label>
              <Input
                id="completion_date"
                type="date"
                value={formData.completion_date}
                onChange={(e) => onFormChange({...formData, completion_date: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={onSave} className="flex-1">
            <Icon name="Save" size={18} className="mr-2" />
            Сохранить
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioDialog;
