import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Step2BudgetProps {
  budget: string;
  onBudgetChange: (budget: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const budgetRanges = [
  { id: '50-70k', label: '50-70 тыс. ₽', icon: 'DollarSign', description: 'Базовый уровень' },
  { id: '70-100k', label: '70-100 тыс. ₽', icon: 'DollarSign', description: 'Средний уровень' },
  { id: '100-150k', label: '100-150 тыс. ₽', icon: 'DollarSign', description: 'Высокий уровень' },
  { id: '150k+', label: 'От 150 тыс. ₽', icon: 'Crown', description: 'Премиум сегмент' }
];

export const Step2Budget = ({ 
  budget, 
  onBudgetChange, 
  onNext, 
  onBack 
}: Step2BudgetProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">
          Какой у вас бюджет?
        </h3>
        <p className="text-muted-foreground">Выберите подходящий диапазон</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgetRanges.map((range) => (
          <div
            key={range.id}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
              budget === range.id
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-muted hover:border-primary/50'
            }`}
            onClick={() => onBudgetChange(range.id)}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`p-3 rounded-full ${budget === range.id ? 'bg-primary/20' : 'bg-secondary'}`}>
                <Icon name={range.icon} size={32} className={budget === range.id ? 'text-primary' : 'text-muted-foreground'} />
              </div>
              <div>
                <h4 className="font-bold text-lg">{range.label}</h4>
                <p className="text-sm text-muted-foreground">{range.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          Назад
        </Button>
        <Button size="lg" onClick={onNext} disabled={!budget}>
          Далее
        </Button>
      </div>
    </div>
  );
};
