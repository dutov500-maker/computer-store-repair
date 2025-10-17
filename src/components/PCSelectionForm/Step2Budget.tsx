import { Button } from '@/components/ui/button';

interface BudgetRange {
  value: string;
  label: string;
  image: string;
  color: string;
}

interface Step2BudgetProps {
  budgetRanges: BudgetRange[];
  selectedBudget: string;
  onBudgetSelect: (budget: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Budget = ({ 
  budgetRanges, 
  selectedBudget, 
  onBudgetSelect, 
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {budgetRanges.map((range) => (
          <div
            key={range.value}
            className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all ${
              selectedBudget === range.value
                ? 'border-primary scale-105 shadow-xl'
                : 'border-transparent hover:border-primary/30 hover:scale-102'
            }`}
            onClick={() => onBudgetSelect(range.value)}
          >
            <div className="relative aspect-square">
              <img
                src={range.image}
                alt={range.label}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${range.color} opacity-60`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl text-center px-2 drop-shadow-lg">
                  {range.label}
                </span>
              </div>
            </div>
          </div>
        ))}
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
