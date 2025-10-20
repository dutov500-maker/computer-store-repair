import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ServiceRequestFormProps {
  trigger?: React.ReactNode;
}

const ServiceRequestForm = ({ trigger }: ServiceRequestFormProps) => {
  const handlePhoneClick = () => {
    window.location.href = 'tel:+79950272707';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/79950272707', '_blank');
  };

  const handleTelegramClick = () => {
    window.open('https://t.me/+79950272707', '_blank');
  };

  if (trigger) {
    return (
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <h3 className="font-heading font-bold text-xl mb-4 text-center">
          Свяжитесь с нами удобным способом
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 w-full"
            onClick={handlePhoneClick}
          >
            <Icon name="Phone" size={20} />
            Позвонить
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
            onClick={handleWhatsAppClick}
          >
            <Icon name="MessageCircle" size={20} />
            WhatsApp
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="w-full border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc] hover:text-white"
            onClick={handleTelegramClick}
          >
            <Icon name="Send" size={20} />
            Telegram
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          <Icon name="Clock" size={14} className="inline mr-1" />
          Пн-Пт: 11:00-18:00, Сб: 11:00-16:00
        </p>
      </Card>
    );
  }

  return (
    <Button 
      size="lg" 
      className="bg-primary hover:bg-primary/90"
      onClick={handlePhoneClick}
    >
      <Icon name="Phone" size={20} />
      Позвонить
    </Button>
  );
};

export default ServiceRequestForm;
