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

const Admin = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [services, setServices] = useState<Service[]>([]);
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
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e?resource=services');
      const data = await response.json();
      if (response.ok) {
        setServices(data.services || []);
      }
    } catch (error) {
      console.error('Fetch services error:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e?resource=settings');
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

  const updateService = async (service: Service) => {
    try {
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e', {
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

  const updateSettings = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d482cb50-56d5-4575-ad25-e175833c831e', {
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">
              <Icon name="MessageSquare" className="mr-2" size={18} />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="services">
              <Icon name="Wrench" className="mr-2" size={18} />
              Услуги
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

          <TabsContent value="services" className="space-y-6">
            <div className="grid gap-6">
              {services.map((service) => (
                <Card key={service.id} className="p-6">
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

                    <div className="flex justify-end">
                      <Button onClick={() => updateService(service)}>
                        Сохранить изменения
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
