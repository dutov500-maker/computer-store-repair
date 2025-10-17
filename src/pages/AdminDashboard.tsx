import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    newOrders: 0,
    completedOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    checkAuth();
    fetchOrders();
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

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <p className="text-sm text-muted-foreground">Управление</p>
                <p className="text-sm font-medium mt-2">Настройки</p>
              </div>
              <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Icon name="Settings" size={24} className="text-purple-500" />
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
            <TabsTrigger value="services">
              <Icon name="Wrench" size={16} className="mr-2" />
              Услуги и Ремонт
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
                            <h3 className="font-semibold text-lg mb-1">{order.customer_name}</h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p className="flex items-center gap-2">
                                <Icon name="Phone" size={14} />
                                {order.customer_phone}
                              </p>
                              {order.customer_email && (
                                <p className="flex items-center gap-2">
                                  <Icon name="Mail" size={14} />
                                  {order.customer_email}
                                </p>
                              )}
                              <p className="flex items-center gap-2">
                                {getOrderTypeLabel(order.order_type)}: <strong>{order.item_title}</strong>
                              </p>
                              {order.message && (
                                <p className="mt-2 p-2 bg-muted rounded text-sm">
                                  💬 {order.message}
                                </p>
                              )}
                            </div>
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
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Управление каталогом</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Добавляйте и редактируйте товары
                  </p>
                </div>
                <Button onClick={() => navigate('/admin')}>
                  <Icon name="Package" size={18} className="mr-2" />
                  Перейти к каталогу
                </Button>
              </div>
              <p className="text-muted-foreground">
                Используйте основную панель для управления товарами каталога
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Услуги и ремонт</h2>
              <p className="text-muted-foreground">
                Управление услугами и ремонтом в разработке
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Настройки Telegram</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">🤖 Telegram Bot Token</p>
                  <p className="text-sm text-muted-foreground">
                    Настройте в секретах проекта: TELEGRAM_BOT_TOKEN
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">💬 Chat ID</p>
                  <p className="text-sm text-muted-foreground">
                    Настройте в секретах проекта: TELEGRAM_CHAT_ID
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Все новые заказы автоматически отправляются в Telegram
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
