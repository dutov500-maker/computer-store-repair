import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

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

const Admin = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchRequests();
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      fetchRequests();
    }
  }, [filterStatus]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const url = filterStatus 
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

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/7e2e325a-8609-4daf-b054-a52bf0b1040c', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Статус обновлен',
          description: 'Статус заявки успешно изменен',
        });
        fetchRequests();
      } else {
        throw new Error('Update failed');
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
    toast({
      title: 'Выход выполнен',
      description: 'Вы вышли из панели администратора',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Icon name="ArrowLeft" size={18} />
                  На главную
                </Button>
              </Link>
              <h1 className="text-2xl font-heading font-bold">Панель администратора</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={fetchRequests} variant="outline" size="sm">
                <Icon name="RefreshCw" size={18} />
                Обновить
              </Button>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <Icon name="LogOut" size={18} />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Filter" size={20} />
            <span className="font-medium">Фильтр:</span>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Все заявки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Все заявки</SelectItem>
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
            <p className="text-muted-foreground">Новые заявки будут отображаться здесь</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg">{request.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(request.created_at)}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <a href={`tel:${request.phone}`} className="text-primary hover:underline">
                      {request.phone}
                    </a>
                  </div>
                  {request.email && (
                    <div className="flex items-center gap-2">
                      <Icon name="Mail" size={16} className="text-muted-foreground" />
                      <a href={`mailto:${request.email}`} className="text-primary hover:underline">
                        {request.email}
                      </a>
                    </div>
                  )}
                  {request.service_type && (
                    <div className="flex items-center gap-2">
                      <Icon name="Wrench" size={16} className="text-muted-foreground" />
                      <span>{request.service_type}</span>
                    </div>
                  )}
                </div>

                {request.message && (
                  <div className="bg-muted/30 p-4 rounded-lg mb-4">
                    <p className="text-sm whitespace-pre-wrap">{request.message}</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Изменить статус:</span>
                  <Select value={request.status} onValueChange={(value) => updateStatus(request.id, value)}>
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
      </div>
    </div>
  );
};

export default Admin;
