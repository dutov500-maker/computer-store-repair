import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, X, Clock } from 'lucide-react';

interface ViewedItem {
  id: string;
  title: string;
  price: number;
  image?: string;
  category: string;
  url: string;
  viewedAt: number;
}

const STORAGE_KEY = 'recently_viewed_items';
const MAX_ITEMS = 6;

export const addToRecentlyViewed = (item: Omit<ViewedItem, 'viewedAt'>) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const items: ViewedItem[] = stored ? JSON.parse(stored) : [];
  
  const filtered = items.filter(i => i.id !== item.id);
  
  const newItem: ViewedItem = {
    ...item,
    viewedAt: Date.now()
  };
  
  const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
  window.dispatchEvent(new Event('recently-viewed-updated'));
};

export const clearRecentlyViewed = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('recently-viewed-updated'));
};

const RecentlyViewed = () => {
  const [items, setItems] = useState<ViewedItem[]>([]);

  const loadItems = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: ViewedItem[] = JSON.parse(stored);
      setItems(parsed.slice(0, MAX_ITEMS));
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    loadItems();
    
    window.addEventListener('recently-viewed-updated', loadItems);
    return () => window.removeEventListener('recently-viewed-updated', loadItems);
  }, []);

  const removeItem = (id: string) => {
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    setItems(filtered);
  };

  const getTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'только что';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин назад`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч назад`;
    return `${Math.floor(seconds / 86400)} дн назад`;
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="w-full animate-fade-in">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Eye className="text-blue-600 dark:text-blue-400" size={20} />
            <h3 className="text-lg font-heading font-bold text-blue-900 dark:text-blue-100">
              Вы недавно смотрели
            </h3>
            <Badge variant="secondary" className="bg-blue-600 text-white">
              {items.length}
            </Badge>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearRecentlyViewed}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Очистить всё
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Card 
              key={item.id} 
              className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-zinc-900"
            >
              <Link to={item.url} className="block">
                <div className="relative">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                      <Eye size={40} className="text-gray-400" />
                    </div>
                  )}
                  
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-blue-600 text-white text-xs">
                      {item.category}
                    </Badge>
                  </div>

                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    <Clock size={12} />
                    {getTimeAgo(item.viewedAt)}
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      {item.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/90 hover:bg-red-50 dark:hover:bg-red-950 z-10"
                onClick={(e) => {
                  e.preventDefault();
                  removeItem(item.id);
                }}
              >
                <X size={14} className="text-red-500" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-blue-600 dark:text-blue-400">
            💡 Мы сохраняем последние {MAX_ITEMS} просмотренных товаров для вашего удобства
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RecentlyViewed;
