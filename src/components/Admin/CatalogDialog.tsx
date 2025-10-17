import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { CatalogItem } from './types';

interface CatalogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: CatalogItem | null;
  formData: {
    title: string;
    description: string;
    price: number;
    resolution: string;
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    image_url: string;
  };
  imagePreview: string;
  uploadingImage: boolean;
  onFormChange: (data: any) => void;
  onImagePreviewChange: (url: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const CatalogDialog = ({
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
}: CatalogDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Редактировать товар' : 'Добавить товар'}
          </DialogTitle>
          <DialogDescription>
            Заполните информацию о товаре в каталоге
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="catalog_title">Название товара *</Label>
            <Input
              id="catalog_title"
              value={formData.title}
              onChange={(e) => onFormChange({...formData, title: e.target.value})}
              placeholder="Игровой ПК RTX 4090"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Цена *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => onFormChange({...formData, price: parseInt(e.target.value) || 0})}
                placeholder="150000"
              />
            </div>
            <div>
              <Label htmlFor="resolution">Разрешение *</Label>
              <select
                id="resolution"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.resolution}
                onChange={(e) => onFormChange({...formData, resolution: e.target.value})}
              >
                <option value="Full HD">Full HD</option>
                <option value="2K">2K</option>
                <option value="4K">4K</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="catalog_description">Описание *</Label>
            <Textarea
              id="catalog_description"
              value={formData.description}
              onChange={(e) => onFormChange({...formData, description: e.target.value})}
              placeholder="Мощный игровой компьютер..."
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
              value={formData.image_url.startsWith('data:') ? '' : formData.image_url}
              onChange={(e) => {
                onFormChange({...formData, image_url: e.target.value});
                onImagePreviewChange(e.target.value);
              }}
              placeholder="Вставьте URL изображения"
            />
          </div>

          <div className="space-y-3">
            <Label>Характеристики *</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  placeholder="Процессор (CPU)"
                  value={formData.cpu}
                  onChange={(e) => onFormChange({...formData, cpu: e.target.value})}
                />
              </div>
              <div>
                <Input
                  placeholder="Видеокарта (GPU)"
                  value={formData.gpu}
                  onChange={(e) => onFormChange({...formData, gpu: e.target.value})}
                />
              </div>
              <div>
                <Input
                  placeholder="Оперативная память (RAM)"
                  value={formData.ram}
                  onChange={(e) => onFormChange({...formData, ram: e.target.value})}
                />
              </div>
              <div>
                <Input
                  placeholder="Накопитель (Storage)"
                  value={formData.storage}
                  onChange={(e) => onFormChange({...formData, storage: e.target.value})}
                />
              </div>
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

export default CatalogDialog;
