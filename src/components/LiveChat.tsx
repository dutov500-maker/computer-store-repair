import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const AUTO_REPLIES: Record<string, string> = {
  'привет': 'Здравствуйте! Чем могу помочь?',
  'здравствуйте': 'Добрый день! Слушаю вас.',
  'цена': 'Стоимость зависит от конфигурации. Игровые ПК от 50 000₽, офисные от 30 000₽. Хотите подробную консультацию?',
  'сборка': 'Мы собираем компьютеры под ключ за 1-3 дня. Какую конфигурацию вас интересует?',
  'гарантия': 'Предоставляем гарантию 12 месяцев на все работы и комплектующие.',
  'доставка': 'Бесплатная доставка по Волжскому при заказе от 50 000₽.',
  'ремонт': 'Выполняем ремонт любой сложности. Диагностика бесплатная. Принести компьютер можно в любое время Пн-Пт 9:00-18:00.',
  'спасибо': 'Всегда рада помочь! Обращайтесь!',
  'пока': 'До свидания! Будем рады видеть вас снова!'
};

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Я онлайн-консультант Компьютерной Лаборатории. Чем могу помочь?',
      sender: 'support',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAutoReply = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, reply] of Object.entries(AUTO_REPLIES)) {
      if (lowerMessage.includes(keyword)) {
        return reply;
      }
    }
    
    return 'Спасибо за сообщение! Наш специалист ответит вам в ближайшее время. Также можете позвонить нам: +7 (995) 027-27-07';
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = getAutoReply(inputText);
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-24 right-6 z-50 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
      >
        <MessageCircle size={20} className="mr-2" />
        <span className="hidden sm:inline">Онлайн-чат</span>
        <span className="sm:hidden">Чат</span>
      </Button>
    );
  }

  return (
    <Card className={`fixed ${isMinimized ? 'bottom-6' : 'bottom-6'} right-6 z-50 w-[380px] shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[500px]'} flex flex-col`}>
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarFallback className="bg-blue-400">КЛ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Компьютерная Лаборатория</h3>
            <p className="text-xs opacity-90">Обычно отвечает сразу</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-400"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Minimize2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-400"
            onClick={() => setIsOpen(false)}
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-zinc-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={message.sender === 'user' ? 'bg-orange-500' : 'bg-blue-500'}>
                      {message.sender === 'user' ? <User size={16} /> : 'КЛ'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-500">КЛ</AvatarFallback>
                  </Avatar>
                  <div className="bg-white dark:bg-zinc-800 rounded-2xl px-4 py-3 border border-gray-200 dark:border-zinc-700">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <div className="flex gap-2">
              <Input
                placeholder="Напишите сообщение..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default LiveChat;
