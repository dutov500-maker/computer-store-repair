import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ConsultationFormProps {
  trigger?: React.ReactNode;
}

const ConsultationForm = ({ trigger }: ConsultationFormProps) => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/79950272707', '_blank');
  };

  return (
    <>
      {trigger ? (
        <div onClick={handleWhatsAppClick}>
          {trigger}
        </div>
      ) : (
        <Button 
          size="lg" 
          variant="secondary" 
          className="text-lg px-8"
          onClick={handleWhatsAppClick}
        >
          <Icon name="MessageCircle" size={20} />
          Получить консультацию
        </Button>
      )}
    </>

  );
};

export default ConsultationForm;