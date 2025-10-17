import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Простая локальная проверка пароля
    const ADMIN_PASSWORD = 'admin123'; // Можно изменить на любой

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_token', 'local_admin_token');
      toast({
        title: 'Вход выполнен',
        description: 'Добро пожаловать в панель администратора',
      });
      navigate('/admin');
    } else {
      toast({
        title: 'Ошибка входа',
        description: 'Неверный пароль',
        variant: 'destructive'
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Lock" className="text-primary-foreground" size={32} />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-2">Вход в админ-панель</h1>
          <p className="text-muted-foreground">Введите пароль для доступа</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-lg"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-lg" 
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <>
                <Icon name="Loader2" className="animate-spin" size={20} />
                Вход...
              </>
            ) : (
              <>
                <Icon name="LogIn" size={20} />
                Войти
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a 
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Вернуться на главную
          </a>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;