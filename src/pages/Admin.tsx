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
import {
  initializeStorage,
  getServices,
  getPortfolio,
  getRequests,
  getSettings,
  addService,
  addPortfolioItem,
  updateService,
  updatePortfolioItem,
  updateRequest,
  deleteService,
  deletePortfolioItem,
  saveServices,
  savePortfolio,
} from '@/lib/localStorage';
import funcUrls from '../../backend/func2url.json';

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
    
    initializeStorage();
    loadRequests();
    loadServices();
    loadCatalog();
    loadPortfolio();
    loadSettings();
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token && activeTab === 'requests') {
      loadRequests();
    }
  }, [filterStatus]);

  const loadRequests = () => {
    setLoading(true);
    try {
      const allRequests = getRequests();
      const filteredRequests = filterStatus && filterStatus !== 'all'
        ? allRequests.filter((req: ServiceRequest) => req.status === filterStatus)
        : allRequests;
      
      setRequests(filteredRequests);
    } catch (error) {
      console.error('Load error:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить заявки',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadServices = () => {
    try {
      const data = getServices();
      setServices(data || []);
    } catch (error) {
      console.error('Load services error:', error);
    }
  };

  const loadCatalog = async () => {
    try {
      const response = await fetch(`${funcUrls.api}?type=catalog`);
      if (response.ok) {
        const data = await response.json();
        setCatalog(data || []);
      }
    } catch (error) {
      console.error('Load catalog error:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить каталог',
        variant: 'destructive'
      });
    }
  };

  const loadPortfolio = () => {
    try {
      const data = getPortfolio();
      setPortfolio(data || []);
    } catch (error) {
      console.error('Load portfolio error:', error);
    }
  };

  const loadSettings = () => {
    try {
      const data = getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Load settings error:', error);
    }
  };

  const updateStatus = (id: number, newStatus: string) => {
    try {
      updateRequest(id, { status: newStatus });
      toast({
        title: 'Успех',
        description: 'Статус заявки обновлен'
      });
      loadRequests();
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive'
      });
    }
  };

  const handleCreateService = () => {
    try {
      const newService = {
        title: 'Новая услуга',
        description: 'Описание услуги',
        price: 'от 5000 ₽',
        features: ['Консультация', 'Гарантия'],
        icon: 'Wrench',
        display_order: services.length,
        is_active: true,
      };
      
      addService(newService);
      toast({ title: 'Успех', description: 'Услуга добавлена' });
      loadServices();
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить услугу', variant: 'destructive' });
    }
  };

  const handleUpdateService = (service: Service) => {
    try {
      updateService(service.id, service);
      toast({ title: 'Успех', description: 'Услуга обновлена' });
      loadServices();
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить услугу', variant: 'destructive' });
    }
  };

  const handleDeleteService = (id: number) => {
    if (confirm('Удалить услугу?')) {
      try {
        deleteService(id);
        toast({ title: 'Успех', description: 'Услуга удалена' });
        loadServices();
      } catch (error) {
        toast({ title: 'Ошибка', description: 'Не удалось удалить услугу', variant: 'destructive' });
      }
    }
  };

  const handleCreateCatalogItem = async () => {
    try {
      const newItem = {
        title: 'Новый компьютер',
        description: 'Описание компьютера',
        price: 50000,
        resolution: 'Full HD',
        specs: {
          cpu: 'Intel Core i5',
          gpu: 'GTX 1660',
          ram: '16GB',
          storage: '512GB SSD'
        },
        display_order: catalog.length,
        is_active: true,
      };
      
      const response = await fetch(`${funcUrls.api}?type=catalog&action=create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      
      if (response.ok) {
        toast({ title: 'Успех', description: 'Компьютер добавлен' });
        loadCatalog();
      } else {
        throw new Error('Failed to create');
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить компьютер', variant: 'destructive' });
    }
  };

  const handleUpdateCatalogItem = async (item: CatalogItem) => {
    try {
      const response = await fetch(`${funcUrls.api}?type=catalog&action=update&id=${item.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      
      if (response.ok) {
        toast({ title: 'Успех', description: 'Компьютер обновлен' });
        loadCatalog();
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить компьютер', variant: 'destructive' });
    }
  };

  const handleDeleteCatalogItem = async (id: number) => {
    if (confirm('Удалить компьютер?')) {
      try {
        const response = await fetch(`${funcUrls.api}?type=catalog&action=delete&id=${id}`, {
          method: 'POST'
        });
        
        if (response.ok) {
          toast({ title: 'Успех', description: 'Компьютер удален' });
          loadCatalog();
        } else {
          throw new Error('Failed to delete');
        }
      } catch (error) {
        toast({ title: 'Ошибка', description: 'Не удалось удалить компьютер', variant: 'destructive' });
      }
    }
  };

  const handleCreatePortfolioItem = () => {
    try {
      const newItem = {
        title: 'Новая работа',
        description: 'Описание работы',
        image_url: 'https://cdn.poehali.dev/projects/324d8ab1-51e4-4903-8847-156dc2773d3d/files/e101c528-ba74-4da4-87b5-a003d4a18478.jpg',
        display_order: portfolio.length,
        is_active: true,
      };
      
      addPortfolioItem(newItem);
      toast({ title: 'Успех', description: 'Работа добавлена' });
      loadPortfolio();
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить работу', variant: 'destructive' });
    }
  };

  const handleUpdatePortfolioItem = (item: PortfolioItem) => {
    try {
      updatePortfolioItem(item.id, item);
      toast({ title: 'Успех', description: 'Работа обновлена' });
      loadPortfolio();
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить работу', variant: 'destructive' });
    }
  };

  const handleDeletePortfolioItem = (id: number) => {
    if (confirm('Удалить работу?')) {
      try {
        deletePortfolioItem(id);
        toast({ title: 'Успех', description: 'Работа удалена' });
        loadPortfolio();
      } catch (error) {
        toast({ title: 'Ошибка', description: 'Не удалось удалить работу', variant: 'destructive' });
      }
    }
  };

  const handleServiceDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = services.findIndex((s) => s.id === active.id);
      const newIndex = services.findIndex((s) => s.id === over.id);
      const newServices = arrayMove(services, oldIndex, newIndex);
      const updatedServices = newServices.map((s, idx) => ({ ...s, display_order: idx }));
      setServices(updatedServices);
      saveServices(updatedServices);
      toast({ title: 'Порядок обновлен' });
    }
  };

  const handleCatalogDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = catalog.findIndex((c) => c.id === active.id);
      const newIndex = catalog.findIndex((c) => c.id === over.id);
      const newCatalog = arrayMove(catalog, oldIndex, newIndex);
      const updatedCatalog = newCatalog.map((c, idx) => ({ ...c, display_order: idx }));
      setCatalog(updatedCatalog);
      
      try {
        await Promise.all(
          updatedCatalog.map(item =>
            fetch(funcUrls['admin-catalog'], {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item)
            })
          )
        );
        toast({ title: 'Порядок обновлен' });
      } catch (error) {
        toast({ title: 'Ошибка', description: 'Не удалось обновить порядок', variant: 'destructive' });
        loadCatalog();
      }
    }
  };

  const handlePortfolioDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = portfolio.findIndex((p) => p.id === active.id);
      const newIndex = portfolio.findIndex((p) => p.id === over.id);
      const newPortfolio = arrayMove(portfolio, oldIndex, newIndex);
      const updatedPortfolio = newPortfolio.map((p, idx) => ({ ...p, display_order: idx }));
      setPortfolio(updatedPortfolio);
      savePortfolio(updatedPortfolio);
      toast({ title: 'Порядок обновлен' });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      new: 'default',
      in_progress: 'secondary',
      completed: 'outline',
      cancelled: 'destructive'
    };
    const labels: Record<string, string> = {
      new: 'Новая',
      in_progress: 'В работе',
      completed: 'Завершена',
      cancelled: 'Отменена'
    };
    return <Badge variant={variants[status] || 'default'}>{labels[status] || status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/">
                <h1 className="text-2xl font-bold">Админ-панель</h1>
              </Link>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="requests">Заявки</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="catalog">Каталог</TabsTrigger>
            <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Заявки на услуги</h2>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Фильтр по статусу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="new">Новые</SelectItem>
                    <SelectItem value="in_progress">В работе</SelectItem>
                    <SelectItem value="completed">Завершенные</SelectItem>
                    <SelectItem value="cancelled">Отмененные</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <p>Загрузка...</p>
              ) : requests.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Заявок нет</p>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <Card key={request.id} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{request.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(request.created_at).toLocaleString('ru-RU')}
                          </p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm font-medium">Телефон:</p>
                          <p className="text-sm">{request.phone}</p>
                        </div>
                        {request.email && (
                          <div>
                            <p className="text-sm font-medium">Email:</p>
                            <p className="text-sm">{request.email}</p>
                          </div>
                        )}
                        {request.service_type && (
                          <div>
                            <p className="text-sm font-medium">Тип услуги:</p>
                            <p className="text-sm">{request.service_type}</p>
                          </div>
                        )}
                      </div>
                      
                      {request.message && (
                        <div className="mb-3">
                          <p className="text-sm font-medium">Сообщение:</p>
                          <p className="text-sm">{request.message}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Select
                          value={request.status}
                          onValueChange={(value) => updateStatus(request.id, value)}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Новая</SelectItem>
                            <SelectItem value="in_progress">В работе</SelectItem>
                            <SelectItem value="completed">Завершена</SelectItem>
                            <SelectItem value="cancelled">Отменена</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Управление услугами</h2>
                <Button onClick={handleCreateService}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить услугу
                </Button>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleServiceDragEnd}
              >
                <SortableContext
                  items={services.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {services.map((service) => (
                      <SortableItem key={service.id} id={service.id}>
                        <ServiceEditCard
                          service={service}
                          onUpdate={handleUpdateService}
                          onDelete={handleDeleteService}
                        />
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </Card>
          </TabsContent>

          <TabsContent value="catalog">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Каталог компьютеров</h2>
                <Button onClick={handleCreateCatalogItem}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить компьютер
                </Button>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleCatalogDragEnd}
              >
                <SortableContext
                  items={catalog.map((c) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {catalog.map((item) => (
                      <SortableItem key={item.id} id={item.id}>
                        <CatalogEditCard
                          item={item}
                          onUpdate={handleUpdateCatalogItem}
                          onDelete={handleDeleteCatalogItem}
                        />
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Портфолио работ</h2>
                <Button onClick={handleCreatePortfolioItem}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить работу
                </Button>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handlePortfolioDragEnd}
              >
                <SortableContext
                  items={portfolio.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {portfolio.map((item) => (
                      <SortableItem key={item.id} id={item.id}>
                        <PortfolioEditCard
                          item={item}
                          onUpdate={handleUpdatePortfolioItem}
                          onDelete={handleDeletePortfolioItem}
                        />
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Настройки сайта</h2>
              {settings && <SettingsForm settings={settings} onUpdate={loadSettings} />}
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

interface ServiceEditCardProps {
  service: Service;
  onUpdate: (service: Service) => void;
  onDelete: (id: number) => void;
}

const ServiceEditCard = ({ service, onUpdate, onDelete }: ServiceEditCardProps) => {
  const [editing, setEditing] = useState(false);
  const [editedService, setEditedService] = useState(service);

  const handleSave = () => {
    onUpdate(editedService);
    setEditing(false);
  };

  if (!editing) {
    return (
      <Card className="p-4 pl-16">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={service.icon as any} size={20} />
              <h3 className="font-semibold">{service.title}</h3>
              {!service.is_active && <Badge variant="outline">Неактивна</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
            <p className="font-semibold text-primary mb-2">{service.price}</p>
            <div className="flex flex-wrap gap-2">
              {service.features.map((feature, idx) => (
                <Badge key={idx} variant="secondary">{feature}</Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setEditing(true)} size="sm" variant="outline">
              <Icon name="Edit" size={16} />
            </Button>
            <Button onClick={() => onDelete(service.id)} size="sm" variant="destructive">
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 pl-16">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Название</Label>
            <Input
              value={editedService.title}
              onChange={(e) => setEditedService({ ...editedService, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Цена</Label>
            <Input
              value={editedService.price}
              onChange={(e) => setEditedService({ ...editedService, price: e.target.value })}
            />
          </div>
        </div>
        
        <div>
          <Label>Описание</Label>
          <Textarea
            value={editedService.description}
            onChange={(e) => setEditedService({ ...editedService, description: e.target.value })}
          />
        </div>

        <div>
          <Label>Иконка</Label>
          <Input
            value={editedService.icon}
            onChange={(e) => setEditedService({ ...editedService, icon: e.target.value })}
          />
        </div>

        <div>
          <Label>Характеристики (через запятую)</Label>
          <Input
            value={editedService.features.join(', ')}
            onChange={(e) => setEditedService({ ...editedService, features: e.target.value.split(',').map(f => f.trim()) })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={editedService.is_active}
            onChange={(e) => setEditedService({ ...editedService, is_active: e.target.checked })}
            id={`active-${service.id}`}
          />
          <Label htmlFor={`active-${service.id}`}>Активна</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave}>Сохранить</Button>
          <Button onClick={() => setEditing(false)} variant="outline">Отмена</Button>
        </div>
      </div>
    </Card>
  );
};

interface CatalogEditCardProps {
  item: CatalogItem;
  onUpdate: (item: CatalogItem) => void;
  onDelete: (id: number) => void;
}

const CatalogEditCard = ({ item, onUpdate, onDelete }: CatalogEditCardProps) => {
  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleSave = () => {
    onUpdate(editedItem);
    setEditing(false);
  };

  if (!editing) {
    return (
      <Card className="p-4 pl-16">
        <div className="flex gap-4">
          {item.image_url && (
            <img src={item.image_url} alt={item.title} className="w-32 h-32 object-cover rounded" />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{item.title}</h3>
              {!item.is_active && <Badge variant="outline">Неактивен</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
            <p className="font-semibold text-primary mb-2">{item.price} ₽</p>
            <p className="text-sm mb-1">Разрешение: {item.resolution}</p>
            {item.specs && (
              <div className="text-sm space-y-1">
                <p>CPU: {item.specs.cpu}</p>
                <p>GPU: {item.specs.gpu}</p>
                <p>RAM: {item.specs.ram}</p>
                <p>Storage: {item.specs.storage}</p>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setEditing(true)} size="sm" variant="outline">
              <Icon name="Edit" size={16} />
            </Button>
            <Button onClick={() => onDelete(item.id)} size="sm" variant="destructive">
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 pl-16">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Название</Label>
            <Input
              value={editedItem.title}
              onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Цена (₽)</Label>
            <Input
              type="number"
              value={editedItem.price}
              onChange={(e) => setEditedItem({ ...editedItem, price: Number(e.target.value) })}
            />
          </div>
        </div>
        
        <div>
          <Label>Описание</Label>
          <Textarea
            value={editedItem.description}
            onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
          />
        </div>

        <div>
          <Label>Разрешение</Label>
          <Input
            value={editedItem.resolution}
            onChange={(e) => setEditedItem({ ...editedItem, resolution: e.target.value })}
          />
        </div>

        <div>
          <Label>URL изображения</Label>
          <Input
            value={editedItem.image_url || ''}
            onChange={(e) => setEditedItem({ ...editedItem, image_url: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>CPU</Label>
            <Input
              value={editedItem.specs?.cpu || ''}
              onChange={(e) => setEditedItem({ ...editedItem, specs: { ...editedItem.specs, cpu: e.target.value } })}
            />
          </div>
          <div>
            <Label>GPU</Label>
            <Input
              value={editedItem.specs?.gpu || ''}
              onChange={(e) => setEditedItem({ ...editedItem, specs: { ...editedItem.specs, gpu: e.target.value } })}
            />
          </div>
          <div>
            <Label>RAM</Label>
            <Input
              value={editedItem.specs?.ram || ''}
              onChange={(e) => setEditedItem({ ...editedItem, specs: { ...editedItem.specs, ram: e.target.value } })}
            />
          </div>
          <div>
            <Label>Storage</Label>
            <Input
              value={editedItem.specs?.storage || ''}
              onChange={(e) => setEditedItem({ ...editedItem, specs: { ...editedItem.specs, storage: e.target.value } })}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={editedItem.is_active}
            onChange={(e) => setEditedItem({ ...editedItem, is_active: e.target.checked })}
            id={`catalog-active-${item.id}`}
          />
          <Label htmlFor={`catalog-active-${item.id}`}>Активен</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave}>Сохранить</Button>
          <Button onClick={() => setEditing(false)} variant="outline">Отмена</Button>
        </div>
      </div>
    </Card>
  );
};

interface PortfolioEditCardProps {
  item: PortfolioItem;
  onUpdate: (item: PortfolioItem) => void;
  onDelete: (id: number) => void;
}

const PortfolioEditCard = ({ item, onUpdate, onDelete }: PortfolioEditCardProps) => {
  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleSave = () => {
    onUpdate(editedItem);
    setEditing(false);
  };

  if (!editing) {
    return (
      <Card className="p-4 pl-16">
        <div className="flex gap-4">
          <img src={item.image_url} alt={item.title} className="w-32 h-32 object-cover rounded" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{item.title}</h3>
              {!item.is_active && <Badge variant="outline">Неактивна</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setEditing(true)} size="sm" variant="outline">
              <Icon name="Edit" size={16} />
            </Button>
            <Button onClick={() => onDelete(item.id)} size="sm" variant="destructive">
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 pl-16">
      <div className="space-y-4">
        <div>
          <Label>Название</Label>
          <Input
            value={editedItem.title}
            onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
          />
        </div>
        
        <div>
          <Label>Описание</Label>
          <Textarea
            value={editedItem.description}
            onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
          />
        </div>

        <div>
          <Label>URL изображения</Label>
          <Input
            value={editedItem.image_url}
            onChange={(e) => setEditedItem({ ...editedItem, image_url: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={editedItem.is_active}
            onChange={(e) => setEditedItem({ ...editedItem, is_active: e.target.checked })}
            id={`portfolio-active-${item.id}`}
          />
          <Label htmlFor={`portfolio-active-${item.id}`}>Активна</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave}>Сохранить</Button>
          <Button onClick={() => setEditing(false)} variant="outline">Отмена</Button>
        </div>
      </div>
    </Card>
  );
};

interface SettingsFormProps {
  settings: Settings;
  onUpdate: () => void;
}

const SettingsForm = ({ settings, onUpdate }: SettingsFormProps) => {
  const [editedSettings, setEditedSettings] = useState(settings);
  const { toast } = useToast();

  const handleSave = () => {
    try {
      const { saveSettings } = require('@/lib/localStorage');
      saveSettings(editedSettings);
      toast({ title: 'Успех', description: 'Настройки сохранены' });
      onUpdate();
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось сохранить настройки', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Название компании</Label>
        <Input
          value={editedSettings.company_name}
          onChange={(e) => setEditedSettings({ ...editedSettings, company_name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Телефон</Label>
          <Input
            value={editedSettings.phone}
            onChange={(e) => setEditedSettings({ ...editedSettings, phone: e.target.value })}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            value={editedSettings.email}
            onChange={(e) => setEditedSettings({ ...editedSettings, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label>Адрес</Label>
        <Input
          value={editedSettings.address}
          onChange={(e) => setEditedSettings({ ...editedSettings, address: e.target.value })}
        />
      </div>

      <div>
        <Label>Часы работы</Label>
        <Input
          value={editedSettings.work_hours}
          onChange={(e) => setEditedSettings({ ...editedSettings, work_hours: e.target.value })}
        />
      </div>

      <div>
        <Label>О компании</Label>
        <Textarea
          value={editedSettings.about_text}
          onChange={(e) => setEditedSettings({ ...editedSettings, about_text: e.target.value })}
        />
      </div>

      <Button onClick={handleSave}>Сохранить настройки</Button>
    </div>
  );
};

export default Admin;