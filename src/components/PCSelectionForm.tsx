import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PCSelectionForm = () => {
  const handlePhoneClick = () => {
    window.location.href = 'tel:+79950272707';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/79950272707?text=Здравствуйте!%20Хочу%20подобрать%20компьютер', '_blank');
  };

  const handleTelegramClick = () => {
    window.open('https://t.me/+79950272707', '_blank');
  };

  return (
    <Card className="p-8 md:p-12 max-w-4xl mx-auto text-center">
      <div className="mb-8">
        <div className="inline-flex p-4 bg-primary/10 rounded-full mb-6">
          <Icon name="Cpu" size={48} className="text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Поможем подобрать идеальный компьютер
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
          Позвоните или напишите нам — расскажем о лучших конфигурациях под ваш бюджет и задачи
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-lg h-14"
          onClick={handlePhoneClick}
        >
          <Icon name="Phone" size={24} />
          Позвонить
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-lg h-14"
          onClick={handleWhatsAppClick}
        >
          <Icon name="MessageCircle" size={24} />
          WhatsApp
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc] hover:text-white text-lg h-14"
          onClick={handleTelegramClick}
        >
          <Icon name="Send" size={24} />
          Telegram
        </Button>
      </div>

      <div className="bg-secondary/50 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4">Что мы обсудим:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
          <div className="flex items-start gap-2">
            <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
            <span>Ваш бюджет и задачи</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
            <span>Лучшие комплектующие</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
            <span>Игры и программы</span>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
            <span>Стоимость и сроки</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-6">
        <Icon name="Clock" size={16} className="inline mr-1" />
        Работаем: Пн-Пт 11:00-18:00, Сб 11:00-16:00
      </p>
    </Card>
  );
};

export default PCSelectionForm;
