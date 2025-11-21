import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Step3DetailsProps {
  details: string;
  onDetailsChange: (details: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Details = ({
  details,
  onDetailsChange,
  onNext,
  onBack
}: Step3DetailsProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">
          Расскажите подробнее
        </h3>
        <p className="text-muted-foreground">Любые пожелания и детали (опционально)</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Label htmlFor="details" className="text-base mb-3 block">
          Дополнительная информация
        </Label>
        <Textarea
          id="details"
          value={details}
          onChange={(e) => onDetailsChange(e.target.value)}
          placeholder="Например:&#10;• Нужен монитор&#10;• Планирую играть в ...&#10;• RGB подсветка&#10;• Тихая работа&#10;• Компактный корпус"
          className="min-h-[200px]"
        />
        
        <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Укажите игры, программы, требования к периферии или просто пропустите этот шаг
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          Назад
        </Button>
        <Button size="lg" onClick={onNext}>
          Далее
        </Button>
      </div>
    </div>
  );
};
