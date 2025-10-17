import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Order } from './types';

interface OrdersTabProps {
  orders: Order[];
  loading: boolean;
}

const OrdersTab = ({ orders, loading }: OrdersTabProps) => {
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
  );
};

export default OrdersTab;
