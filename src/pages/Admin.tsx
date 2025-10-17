import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ServiceRequest {
  id: number;
  name: string;
  phone: string;
  email?: string;
  service_type?: string;
  message?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
  display_order: number;
  is_active: boolean;
}

interface Settings {
  company_name: string;
  phone: string;
  email: string;
  address: string;
  work_hours: string;
  about_text: string;
}

interface CatalogItem {
  id: number;
  title: string;
  description: string;
  price: number;
  resolution: string;
  specs: any;
  image_url?: string;
  display_order: number;
  is_active: boolean;
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

interface SortableItemProps {
  id: number;
  children: React.ReactNode;
}

const SortableItem = ({ id, children }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="relative">
        <div
          {...attributes}
          {...listeners}
          className="absolute left-2 top-2 cursor-move p-2 hover:bg-muted rounded z-10"
        >
          <Icon name="GripVertical" size={20} className="text-muted-foreground" />
        </div>
        {children}
      </div>
    </div>
  );
};

const Admin = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('requests');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchRequests();
    fetchServices();
    fetchCatalog();
    fetchPortfolio();
    fetchSettings();
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token && activeTab === 'requests') {
      fetchRequests();
    }
  }, [filterStatus]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const url = filterStatus && filterStatus !== 'all'
        ? `https://functions.poehali.dev/7e2e325a-8609-4daf-b054-a52bf0b1040c?status=${filterStatus}`
        : 'https://functions.poehali.dev/7e2e325a-8609-4daf-b054-a52bf0b1040c';
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setRequests(data.requests || []);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить заявки',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753?resource=services');
      const data = await response.json();
      if (response.ok) {
        setServices(data.services || []);
      }
    } catch (error) {
      console.error('Fetch services error:', error);
    }
  };

  const fetchCatalog = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753?resource=catalog');
      const data = await response.json();
      if (response.ok) {
        setCatalog(data.catalog || []);
      }
    } catch (error) {
      console.error('Fetch catalog error:', error);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753?resource=portfolio');
      const data = await response.json();
      if (response.ok) {
        setPortfolio(data.portfolio || []);
      }
    } catch (error) {
      console.error('Fetch portfolio error:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753?resource=settings');
      const data = await response.json();
      if (response.ok) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Fetch settings error:', error);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/7e2e325a-8609-4daf-b054-a52bf0b1040c', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (response.ok) {
        toast({
          title: 'Успех',
          description: 'Статус заявки обновлен'
        });
        fetchRequests();
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive'
      });
    }
  };

  const createService = async () => {
    try {
      const newService = {
        resource: 'service',
        title: 'Новая услуга',
        description: 'Описание услуги',
        price: 'от 5000 ₽',
        features: ['Консультация', 'Гарантия'],
        icon: 'Wrench',
        display_order: services.length
      };
      
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Услуга добавлена' });
        fetchServices();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить услугу', variant: 'destructive' });
    }
  };

  const updateService = async (service: Service) => {
    try {
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource: 'service', ...service })
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Услуга обновлена' });
        fetchServices();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить услугу', variant: 'destructive' });
    }
  };

  const deleteService = async (id: number) => {
    if (!confirm('Удалить эту услугу?')) return;
    
    try {
      const response = await fetch(`https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753?resource=service&id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Услуга удалена' });
        fetchServices();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить услугу', variant: 'destructive' });
    }
  };

  const createPortfolioItem = async () => {
    try {
      const newItem = {
        resource: 'portfolio_item',
        title: 'Новая работа',
        description: 'Описание работы',
        image_url: '',
        display_order: portfolio.length
      };
      
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Работа добавлена' });
        fetchPortfolio();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить работу', variant: 'destructive' });
    }
  };

  const updatePortfolioItem = async (item: PortfolioItem) => {
    try {
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource: 'portfolio_item', ...item })
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Работа обновлена' });
        fetchPortfolio();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить работу', variant: 'destructive' });
    }
  };

  const deletePortfolioItem = async (id: number) => {
    if (!confirm('Удалить эту работу?')) return;
    
    try {
      const response = await fetch(`https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753?resource=portfolio_item&id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Работа удалена' });
        fetchPortfolio();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить работу', variant: 'destructive' });
    }
  };

  const createCatalogItem = async () => {
    try {
      const newItem = {
        resource: 'catalog_item',
        title: 'Новый компьютер',
        description: 'Описание компьютера',
        price: 50000,
        resolution: 'FHD',
        specs: { cpu: 'Intel Core i5', gpu: 'GTX 1660', ram: '16GB' },
        display_order: catalog.length
      };
      
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Товар добавлен' });
        fetchCatalog();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить товар', variant: 'destructive' });
    }
  };

  const updateCatalogItem = async (item: CatalogItem) => {
    try {
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource: 'catalog_item', ...item })
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Товар обновлен' });
        fetchCatalog();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить товар', variant: 'destructive' });
    }
  };

  const deleteCatalogItem = async (id: number) => {
    if (!confirm('Удалить этот товар?')) return;
    
    try {
      const response = await fetch(`https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753?resource=catalog_item&id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Товар удален' });
        fetchCatalog();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить товар', variant: 'destructive' });
    }
  };

  const updateSettings = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/c67940be-1583-4617-bdf4-2518f115d753', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource: 'settings', settings })
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Настройки сохранены' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось сохранить настройки', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndCatalog = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = catalog.findIndex((item) => item.id === active.id);
      const newIndex = catalog.findIndex((item) => item.id === over.id);
      
      const newCatalog = arrayMove(catalog, oldIndex, newIndex);
      setCatalog(newCatalog);
      
      for (let i = 0; i < newCatalog.length; i++) {
        await updateCatalogItem({ ...newCatalog[i], display_order: i });
      }
    }
  };

  const handleDragEndServices = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = services.findIndex((item) => item.id === active.id);
      const newIndex = services.findIndex((item) => item.id === over.id);
      
      const newServices = arrayMove(services, oldIndex, newIndex);
      setServices(newServices);
      
      for (let i = 0; i < newServices.length; i++) {
        await updateService({ ...newServices[i], display_order: i });
      }
    }
  };

  const handleDragEndPortfolio = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = portfolio.findIndex((item) => item.id === active.id);
      const newIndex = portfolio.findIndex((item) => item.id === over.id);
      
      const newPortfolio = arrayMove(portfolio, oldIndex, newIndex);
      setPortfolio(newPortfolio);
      
      for (let i = 0; i < newPortfolio.length; i++) {
        await updatePortfolioItem({ ...newPortfolio[i], display_order: i });
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      new: { variant: 'default', label: 'Новая' },
      in_progress: { variant: 'secondary', label: 'В работе' },
      completed: { variant: 'outline', label: 'Завершена' },
      cancelled: { variant: 'destructive', label: 'Отменена' }
    };
    
    const config = variants[status] || { variant: 'default', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Icon name="Home" className="text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <h1 className="text-2xl font-heading font-bold">Панель управления</h1>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <Icon name="LogOut" className="mr-2" size={18} />
              Выйти
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="requests">
              <Icon name="MessageSquare" className="mr-2" size={18} />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="catalog">
              <Icon name="Monitor" className="mr-2" size={18} />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="services">
              <Icon name="Wrench" className="mr-2" size={18} />
              Услуги
            </TabsTrigger>
            <TabsTrigger value="portfolio">
              <Icon name="Image" className="mr-2" size={18} />
              Портфолио
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Settings" className="mr-2" size={18} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center gap-4">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Все заявки" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все заявки</SelectItem>
                  <SelectItem value="new">Новые</SelectItem>
                  <SelectItem value="in_progress">В работе</SelectItem>
                  <SelectItem value="completed">Завершенные</SelectItem>
                  <SelectItem value="cancelled">Отмененные</SelectItem>
                </SelectContent>
              </Select>
              <div className="ml-auto">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Всего: {requests.length}
                </Badge>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
                <p className="text-muted-foreground">Загрузка заявок...</p>
              </div>
            ) : requests.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Inbox" className="mx-auto mb-4 text-muted-foreground" size={64} />
                <h3 className="text-xl font-heading font-bold mb-2">Заявок пока нет</h3>
                <p className="text-muted-foreground">Новые заявки появятся здесь</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {requests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-heading font-bold mb-1">{request.name}</h3>
                        <p className="text-sm text-muted-foreground">{formatDate(request.created_at)}</p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="grid gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Phone" size={16} className="text-muted-foreground" />
                        <span>{request.phone}</span>
                      </div>
                      {request.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Mail" size={16} className="text-muted-foreground" />
                          <span>{request.email}</span>
                        </div>
                      )}
                      {request.service_type && (
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Wrench" size={16} className="text-muted-foreground" />
                          <span>{request.service_type}</span>
                        </div>
                      )}
                      {request.message && (
                        <div className="mt-2 p-3 bg-muted rounded-md">
                          <p className="text-sm">{request.message}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {request.status !== 'in_progress' && (
                        <Button size="sm" onClick={() => updateStatus(request.id, 'in_progress')}>
                          В работу
                        </Button>
                      )}
                      {request.status !== 'completed' && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(request.id, 'completed')}>
                          Завершить
                        </Button>
                      )}
                      {request.status !== 'cancelled' && (
                        <Button size="sm" variant="destructive" onClick={() => updateStatus(request.id, 'cancelled')}>
                          Отменить
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="catalog" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-heading font-bold">Управление каталогом</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <Icon name="GripVertical" size={14} className="inline mr-1" />
                  Перетащите карточки для изменения порядка
                </p>
              </div>
              <Button onClick={createCatalogItem}>
                <Icon name="Plus" className="mr-2" size={18} />
                Добавить компьютер
              </Button>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndCatalog}
            >
              <SortableContext
                items={catalog.map(item => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid gap-6">
                  {catalog.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                      <Card className="p-6 pl-16">
                        <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Название</Label>
                        <Input 
                          value={item.title}
                          onChange={(e) => {
                            const updated = catalog.map(c => 
                              c.id === item.id ? { ...c, title: e.target.value } : c
                            );
                            setCatalog(updated);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Цена (₽)</Label>
                        <Input 
                          type="number"
                          value={item.price}
                          onChange={(e) => {
                            const updated = catalog.map(c => 
                              c.id === item.id ? { ...c, price: parseInt(e.target.value) } : c
                            );
                            setCatalog(updated);
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Разрешение</Label>
                        <Select 
                          value={item.resolution}
                          onValueChange={(value) => {
                            const updated = catalog.map(c => 
                              c.id === item.id ? { ...c, resolution: value } : c
                            );
                            setCatalog(updated);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FHD">FHD (1920x1080)</SelectItem>
                            <SelectItem value="QHD">QHD (2560x1440)</SelectItem>
                            <SelectItem value="UHD">UHD (3840x2160)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>URL изображения</Label>
                        <Input 
                          value={item.image_url || ''}
                          placeholder="https://..."
                          onChange={(e) => {
                            const updated = catalog.map(c => 
                              c.id === item.id ? { ...c, image_url: e.target.value } : c
                            );
                            setCatalog(updated);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Описание</Label>
                      <Textarea 
                        value={item.description}
                        onChange={(e) => {
                          const updated = catalog.map(c => 
                            c.id === item.id ? { ...c, description: e.target.value } : c
                          );
                          setCatalog(updated);
                        }}
                      />
                    </div>

                    <div>
                      <Label>Характеристики (JSON)</Label>
                      <Textarea 
                        value={JSON.stringify(item.specs, null, 2)}
                        onChange={(e) => {
                          try {
                            const specs = JSON.parse(e.target.value);
                            const updated = catalog.map(c => 
                              c.id === item.id ? { ...c, specs } : c
                            );
                            setCatalog(updated);
                          } catch (err) {
                            // Invalid JSON, ignore
                          }
                        }}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Пример: {`{"cpu": "Intel Core i5", "gpu": "RTX 3060"}`}
                      </p>
                    </div>

                          <div className="flex justify-between">
                            <Button variant="destructive" onClick={() => deleteCatalogItem(item.id)}>
                              <Icon name="Trash2" className="mr-2" size={18} />
                              Удалить
                            </Button>
                            <Button onClick={() => updateCatalogItem(item)}>
                              <Icon name="Save" className="mr-2" size={18} />
                              Сохранить изменения
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-heading font-bold">Управление услугами</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <Icon name="GripVertical" size={14} className="inline mr-1" />
                  Перетащите карточки для изменения порядка
                </p>
              </div>
              <Button onClick={createService}>
                <Icon name="Plus" className="mr-2" size={18} />
                Добавить услугу
              </Button>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndServices}
            >
              <SortableContext
                items={services.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid gap-6">
                  {services.map((service) => (
                    <SortableItem key={service.id} id={service.id}>
                      <Card className="p-6 pl-16">
                        <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Название услуги</Label>
                        <Input 
                          value={service.title}
                          onChange={(e) => {
                            const updated = services.map(s => 
                              s.id === service.id ? { ...s, title: e.target.value } : s
                            );
                            setServices(updated);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Цена</Label>
                        <Input 
                          value={service.price}
                          onChange={(e) => {
                            const updated = services.map(s => 
                              s.id === service.id ? { ...s, price: e.target.value } : s
                            );
                            setServices(updated);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Описание</Label>
                      <Textarea 
                        value={service.description}
                        onChange={(e) => {
                          const updated = services.map(s => 
                            s.id === service.id ? { ...s, description: e.target.value } : s
                          );
                          setServices(updated);
                        }}
                      />
                    </div>

                    <div>
                      <Label>Особенности (через запятую)</Label>
                      <Input 
                        value={service.features.join(', ')}
                        onChange={(e) => {
                          const updated = services.map(s => 
                            s.id === service.id ? { ...s, features: e.target.value.split(',').map(f => f.trim()) } : s
                          );
                          setServices(updated);
                        }}
                      />
                    </div>

                          <div className="flex justify-between">
                            <Button variant="destructive" onClick={() => deleteService(service.id)}>
                              <Icon name="Trash2" className="mr-2" size={18} />
                              Удалить
                            </Button>
                            <Button onClick={() => updateService(service)}>
                              <Icon name="Save" className="mr-2" size={18} />
                              Сохранить изменения
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-heading font-bold">Портфолио (Наши работы)</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <Icon name="GripVertical" size={14} className="inline mr-1" />
                  Перетащите карточки для изменения порядка
                </p>
              </div>
              <Button onClick={createPortfolioItem}>
                <Icon name="Plus" className="mr-2" size={18} />
                Добавить работу
              </Button>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndPortfolio}
            >
              <SortableContext
                items={portfolio.map(p => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid gap-6">
                  {portfolio.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                      <Card className="p-6 pl-16">
                        <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Название</Label>
                        <Input 
                          value={item.title}
                          onChange={(e) => {
                            const updated = portfolio.map(p => 
                              p.id === item.id ? { ...p, title: e.target.value } : p
                            );
                            setPortfolio(updated);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Описание</Label>
                        <Input 
                          value={item.description}
                          onChange={(e) => {
                            const updated = portfolio.map(p => 
                              p.id === item.id ? { ...p, description: e.target.value } : p
                            );
                            setPortfolio(updated);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>URL изображения</Label>
                      <Input 
                        value={item.image_url}
                        placeholder="https://..."
                        onChange={(e) => {
                          const updated = portfolio.map(p => 
                            p.id === item.id ? { ...p, image_url: e.target.value } : p
                          );
                          setPortfolio(updated);
                        }}
                      />
                      {item.image_url && (
                        <div className="mt-2">
                          <img 
                            src={item.image_url} 
                            alt={item.title}
                            className="w-full max-w-md h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <Button variant="destructive" onClick={() => deletePortfolioItem(item.id)}>
                        <Icon name="Trash2" className="mr-2" size={18} />
                        Удалить
                      </Button>
                      <Button onClick={() => updatePortfolioItem(item)}>
                        <Icon name="Save" className="mr-2" size={18} />
                        Сохранить изменения
                      </Button>
                    </div>
                  </div>
                </Card>
              </SortableItem>
            ))}
                </div>
              </SortableContext>
            </DndContext>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {settings && (
              <Card className="p-6">
                <h3 className="text-lg font-heading font-bold mb-6">Настройки сайта</h3>
                <div className="grid gap-4">
                  <div>
                    <Label>Название компании</Label>
                    <Input 
                      value={settings.company_name}
                      onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Телефон</Label>
                      <Input 
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input 
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Адрес</Label>
                    <Input 
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Часы работы</Label>
                    <Input 
                      value={settings.work_hours}
                      onChange={(e) => setSettings({ ...settings, work_hours: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>О компании</Label>
                    <Textarea 
                      value={settings.about_text}
                      onChange={(e) => setSettings({ ...settings, about_text: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={updateSettings}>
                      Сохранить настройки
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;