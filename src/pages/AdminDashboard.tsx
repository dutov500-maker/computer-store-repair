import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import funcUrls from '../../backend/func2url.json';
import { Order, PortfolioItem, CatalogItem } from '@/components/Admin/types';
import OrdersTab from '@/components/Admin/OrdersTab';
import CatalogTab from '@/components/Admin/CatalogTab';
import PortfolioTab from '@/components/Admin/PortfolioTab';
import CatalogDialog from '@/components/Admin/CatalogDialog';
import PortfolioDialog from '@/components/Admin/PortfolioDialog';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [portfolioDialog, setPortfolioDialog] = useState(false);
  const [catalogDialog, setCatalogDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [editingCatalogItem, setEditingCatalogItem] = useState<CatalogItem | null>(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    newOrders: 0,
    completedOrders: 0,
    revenue: 0
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'Игровой ПК',
    specs: '',
    price_range: '',
    completion_date: ''
  });

  const [catalogFormData, setCatalogFormData] = useState({
    title: '',
    description: '',
    price: 0,
    resolution: 'Full HD',
    cpu: '',
    gpu: '',
    ram: '',
    storage: '',
    image_url: ''
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    checkAuth();
    fetchOrders();
    fetchPortfolio();
    fetchCatalog();
  }, []);

  const checkAuth = () => {
    const isAuth = localStorage.getItem('adminAuth') === 'true';
    if (!isAuth) {
      navigate('/admin/login');
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(funcUrls['admin-requests']);
      const data = await response.json();
      setOrders(data);
      
      setStats({
        totalOrders: data.length,
        newOrders: data.filter((o: Order) => o.status === 'new').length,
        completedOrders: data.filter((o: Order) => o.status === 'completed').length,
        revenue: 0
      });
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить заказы',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`${funcUrls.api}?type=portfolio`);
      const data = await response.json();
      setPortfolio(data);
    } catch (error) {
      console.error('Ошибка загрузки портфолио:', error);
    }
  };

  const fetchCatalog = async () => {
    try {
      const response = await fetch(`${funcUrls.api}?type=catalog`);
      const data = await response.json();
      setCatalog(data);
    } catch (error) {
      console.error('Ошибка загрузки каталога:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: 'Игровой ПК',
      specs: '',
      price_range: '',
      completion_date: ''
    });
    setImagePreview('');
    setPortfolioDialog(true);
  };

  const openEditDialog = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image_url: item.image_url,
      category: item.category,
      specs: item.specs || '',
      price_range: item.price_range || '',
      completion_date: item.completion_date || ''
    });
    setImagePreview(item.image_url);
    setPortfolioDialog(true);
  };

  const handleSavePortfolio = async () => {
    try {
      const url = editingItem 
        ? `${funcUrls.api}?type=portfolio&action=update&id=${editingItem.id}`
        : `${funcUrls.api}?type=portfolio&action=create`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: editingItem ? 'Работа обновлена' : 'Работа добавлена'
        });
        setPortfolioDialog(false);
        fetchPortfolio();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить',
        variant: 'destructive'
      });
    }
  };

  const handleDeletePortfolio = async (id: number) => {
    if (!confirm('Удалить работу из портфолио?')) return;

    try {
      const response = await fetch(`${funcUrls.api}?type=portfolio&action=delete&id=${id}`, {
        method: 'POST'
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Работа удалена'
        });
        fetchPortfolio();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить',
        variant: 'destructive'
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Ошибка',
        description: 'Размер файла не должен превышать 5 МБ',
        variant: 'destructive'
      });
      return;
    }

    setUploadingImage(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImagePreview(dataUrl);
        setFormData({...formData, image_url: dataUrl});
        setUploadingImage(false);
      };
      reader.onerror = () => {
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить изображение',
          variant: 'destructive'
        });
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обработать файл',
        variant: 'destructive'
      });
      setUploadingImage(false);
    }
  };

  const openAddCatalogDialog = () => {
    setEditingCatalogItem(null);
    setCatalogFormData({
      title: '',
      description: '',
      price: 0,
      resolution: 'Full HD',
      cpu: '',
      gpu: '',
      ram: '',
      storage: '',
      image_url: ''
    });
    setImagePreview('');
    setCatalogDialog(true);
  };

  const openEditCatalogDialog = (item: CatalogItem) => {
    setEditingCatalogItem(item);
    setCatalogFormData({
      title: item.title,
      description: item.description,
      price: item.price,
      resolution: item.resolution,
      cpu: item.specs.cpu,
      gpu: item.specs.gpu,
      ram: item.specs.ram,
      storage: item.specs.storage,
      image_url: item.image_url
    });
    setImagePreview(item.image_url);
    setCatalogDialog(true);
  };

  const handleSaveCatalog = async () => {
    try {
      const specs = {
        cpu: catalogFormData.cpu,
        gpu: catalogFormData.gpu,
        ram: catalogFormData.ram,
        storage: catalogFormData.storage
      };

      const url = editingCatalogItem 
        ? `${funcUrls.api}?type=catalog&action=update&id=${editingCatalogItem.id}`
        : `${funcUrls.api}?type=catalog&action=create`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: catalogFormData.title,
          description: catalogFormData.description,
          price: catalogFormData.price,
          resolution: catalogFormData.resolution,
          specs: specs,
          image_url: catalogFormData.image_url
        })
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: editingCatalogItem ? 'Товар обновлен' : 'Товар добавлен'
        });
        setCatalogDialog(false);
        fetchCatalog();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteCatalog = async (id: number) => {
    if (!confirm('Удалить товар из каталога?')) return;

    try {
      const response = await fetch(`${funcUrls.api}?type=catalog&action=delete&id=${id}`, {
        method: 'POST'
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Товар удален'
        });
        fetchCatalog();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить',
        variant: 'destructive'
      });
    }
  };

  const handleCatalogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Ошибка',
        description: 'Размер файла не должен превышать 5 МБ',
        variant: 'destructive'
      });
      return;
    }

    setUploadingImage(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImagePreview(dataUrl);
        setCatalogFormData({...catalogFormData, image_url: dataUrl});
        setUploadingImage(false);
      };
      reader.onerror = () => {
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить изображение',
          variant: 'destructive'
        });
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обработать файл',
        variant: 'destructive'
      });
      setUploadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Icon name="LayoutDashboard" size={28} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Панель управления</h1>
                <p className="text-sm text-muted-foreground">Игровые компьютеры</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего заказов</p>
                <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="ShoppingCart" size={24} className="text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Новые заказы</p>
                <p className="text-3xl font-bold mt-2">{stats.newOrders}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Icon name="Bell" size={24} className="text-blue-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Выполнено</p>
                <p className="text-3xl font-bold mt-2">{stats.completedOrders}</p>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={24} className="text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Каталог</p>
                <p className="text-3xl font-bold mt-2">{catalog.length}</p>
              </div>
              <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Icon name="Package" size={24} className="text-purple-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Портфолио</p>
                <p className="text-3xl font-bold mt-2">{portfolio.length}</p>
              </div>
              <div className="h-12 w-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <Icon name="Briefcase" size={24} className="text-orange-500" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="catalog">
              <Icon name="Package" size={16} className="mr-2" />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="portfolio">
              <Icon name="Briefcase" size={16} className="mr-2" />
              Портфолио
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTab orders={orders} loading={loading} />
          </TabsContent>

          <TabsContent value="catalog">
            <CatalogTab 
              catalog={catalog}
              onAdd={openAddCatalogDialog}
              onEdit={openEditCatalogDialog}
              onDelete={handleDeleteCatalog}
            />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioTab 
              portfolio={portfolio}
              onAdd={openAddDialog}
              onEdit={openEditDialog}
              onDelete={handleDeletePortfolio}
            />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Настройки</h2>
              <p className="text-muted-foreground">Раздел в разработке</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <PortfolioDialog
        open={portfolioDialog}
        onOpenChange={setPortfolioDialog}
        editingItem={editingItem}
        formData={formData}
        imagePreview={imagePreview}
        uploadingImage={uploadingImage}
        onFormChange={setFormData}
        onImagePreviewChange={setImagePreview}
        onImageUpload={handleImageUpload}
        onSave={handleSavePortfolio}
      />

      <CatalogDialog
        open={catalogDialog}
        onOpenChange={setCatalogDialog}
        editingItem={editingCatalogItem}
        formData={catalogFormData}
        imagePreview={imagePreview}
        uploadingImage={uploadingImage}
        onFormChange={setCatalogFormData}
        onImagePreviewChange={setImagePreview}
        onImageUpload={handleCatalogImageUpload}
        onSave={handleSaveCatalog}
      />
    </div>
  );
};

export default AdminDashboard;
