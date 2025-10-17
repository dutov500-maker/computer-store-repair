import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import funcUrls from '../../backend/func2url.json';

interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  order_type: string;
  item_title?: string;
  message?: string;
  status: string;
  created_at: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  specs?: string;
  price_range?: string;
  completion_date?: string;
  is_active: boolean;
}

interface CatalogItem {
  id: number;
  title: string;
  description: string;
  price: number;
  resolution: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  image_url: string;
  is_active: boolean;
}

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

  const getOrderTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'catalog': '🖥 Товар',
      'service': '🛠 Услуга',
      'repair': '🔧 Ремонт'
    };
    return types[type] || type;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-blue-500',
      'in_progress': 'bg-yellow-500',
      'completed': 'bg-green-500',
      'cancelled': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'new': 'Новый',
      'in_progress': 'В работе',
      'completed': 'Выполнен',
      'cancelled': 'Отменён'
    };
    return labels[status] || status;
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
            <Card>
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Список заказов</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Управляйте заказами клиентов
                </p>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-8">
                    <Icon name="Loader2" size={32} className="animate-spin mx-auto text-muted-foreground" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Заказов пока нет</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusLabel(order.status)}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">
                              {getOrderTypeLabel(order.order_type)}
                              {order.item_title && ` - ${order.item_title}`}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Icon name="User" size={16} className="text-muted-foreground" />
                                <span>{order.customer_name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Icon name="Phone" size={16} className="text-muted-foreground" />
                                <span>{order.customer_phone}</span>
                              </div>
                              {order.customer_email && (
                                <div className="flex items-center gap-2">
                                  <Icon name="Mail" size={16} className="text-muted-foreground" />
                                  <span>{order.customer_email}</span>
                                </div>
                              )}
                            </div>
                            {order.message && (
                              <p className="text-sm text-muted-foreground mt-2 p-3 bg-muted rounded-md">
                                {order.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="catalog">
            <Card>
              <div className="p-6 border-b flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Каталог товаров</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Управляйте товарами в каталоге
                  </p>
                </div>
                <Button onClick={openAddCatalogDialog}>
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
                              onClick={() => openEditCatalogDialog(item)}
                            >
                              <Icon name="Edit" size={14} className="mr-1" />
                              Изменить
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeleteCatalog(item.id)}
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
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <div className="p-6 border-b flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Портфолио работ</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Управляйте примерами выполненных работ
                  </p>
                </div>
                <Button onClick={openAddDialog}>
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
                              onClick={() => openEditDialog(item)}
                            >
                              <Icon name="Edit" size={14} className="mr-1" />
                              Изменить
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeletePortfolio(item.id)}
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
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Настройки</h2>
              <p className="text-muted-foreground">Раздел в разработке</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={portfolioDialog} onOpenChange={setPortfolioDialog}>
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
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Игровой ПК на RTX 4090"
              />
            </div>

            <div>
              <Label htmlFor="category">Категория *</Label>
              <select
                id="category"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                onChange={(e) => setFormData({...formData, description: e.target.value})}
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
                      setImagePreview('');
                      setFormData({...formData, image_url: ''});
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
                    onChange={handleImageUpload}
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
                  setFormData({...formData, image_url: e.target.value});
                  setImagePreview(e.target.value);
                }}
                placeholder="Вставьте URL изображения"
              />
            </div>

            <div>
              <Label htmlFor="specs">Характеристики</Label>
              <Textarea
                id="specs"
                value={formData.specs}
                onChange={(e) => setFormData({...formData, specs: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, price_range: e.target.value})}
                  placeholder="250 000 ₽"
                />
              </div>
              <div>
                <Label htmlFor="completion_date">Дата выполнения</Label>
                <Input
                  id="completion_date"
                  type="date"
                  value={formData.completion_date}
                  onChange={(e) => setFormData({...formData, completion_date: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSavePortfolio} className="flex-1">
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить
            </Button>
            <Button variant="outline" onClick={() => setPortfolioDialog(false)}>
              Отмена
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={catalogDialog} onOpenChange={setCatalogDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCatalogItem ? 'Редактировать товар' : 'Добавить товар'}
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
                value={catalogFormData.title}
                onChange={(e) => setCatalogFormData({...catalogFormData, title: e.target.value})}
                placeholder="Игровой ПК RTX 4090"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Цена *</Label>
                <Input
                  id="price"
                  type="number"
                  value={catalogFormData.price}
                  onChange={(e) => setCatalogFormData({...catalogFormData, price: parseInt(e.target.value) || 0})}
                  placeholder="150000"
                />
              </div>
              <div>
                <Label htmlFor="resolution">Разрешение *</Label>
                <select
                  id="resolution"
                  className="w-full px-3 py-2 border rounded-md"
                  value={catalogFormData.resolution}
                  onChange={(e) => setCatalogFormData({...catalogFormData, resolution: e.target.value})}
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
                value={catalogFormData.description}
                onChange={(e) => setCatalogFormData({...catalogFormData, description: e.target.value})}
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
                      setImagePreview('');
                      setCatalogFormData({...catalogFormData, image_url: ''});
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
                    onChange={handleCatalogImageUpload}
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
                value={catalogFormData.image_url.startsWith('data:') ? '' : catalogFormData.image_url}
                onChange={(e) => {
                  setCatalogFormData({...catalogFormData, image_url: e.target.value});
                  setImagePreview(e.target.value);
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
                    value={catalogFormData.cpu}
                    onChange={(e) => setCatalogFormData({...catalogFormData, cpu: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Видеокарта (GPU)"
                    value={catalogFormData.gpu}
                    onChange={(e) => setCatalogFormData({...catalogFormData, gpu: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Оперативная память (RAM)"
                    value={catalogFormData.ram}
                    onChange={(e) => setCatalogFormData({...catalogFormData, ram: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Накопитель (Storage)"
                    value={catalogFormData.storage}
                    onChange={(e) => setCatalogFormData({...catalogFormData, storage: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSaveCatalog} className="flex-1">
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить
            </Button>
            <Button variant="outline" onClick={() => setCatalogDialog(false)}>
              Отмена
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;