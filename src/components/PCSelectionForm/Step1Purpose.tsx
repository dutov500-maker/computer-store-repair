import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface Purpose {
  id: string;
  label: string;
  category: string;
}

interface Step1PurposeProps {
  purposes: Purpose[];
  selectedPurposes: string[];
  onPurposeToggle: (purposeId: string) => void;
  onNext: () => void;
}

export const Step1Purpose = ({ 
  purposes, 
  selectedPurposes, 
  onPurposeToggle, 
  onNext 
}: Step1PurposeProps) => {
  const gamingPurposes = purposes.filter(p => p.category === 'gaming');
  const workPurposes = purposes.filter(p => p.category === 'work');
  const otherPurposes = purposes.filter(p => p.category === 'other');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">
          Для каких задач нужен компьютер?
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-3 text-primary">Для игр</h4>
          <div className="space-y-2">
            {gamingPurposes.map((purpose) => (
              <div
                key={purpose.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPurposes.includes(purpose.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
                onClick={() => onPurposeToggle(purpose.id)}
              >
                <Checkbox
                  checked={selectedPurposes.includes(purpose.id)}
                  onCheckedChange={() => onPurposeToggle(purpose.id)}
                />
                <label className="text-sm flex-1 cursor-pointer">
                  {purpose.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-primary">Для работы</h4>
          <div className="space-y-2">
            {workPurposes.map((purpose) => (
              <div
                key={purpose.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPurposes.includes(purpose.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
                onClick={() => onPurposeToggle(purpose.id)}
              >
                <Checkbox
                  checked={selectedPurposes.includes(purpose.id)}
                  onCheckedChange={() => onPurposeToggle(purpose.id)}
                />
                <label className="text-sm flex-1 cursor-pointer">
                  {purpose.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="space-y-2">
            {otherPurposes.map((purpose) => (
              <div
                key={purpose.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPurposes.includes(purpose.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
                onClick={() => onPurposeToggle(purpose.id)}
              >
                <Checkbox
                  checked={selectedPurposes.includes(purpose.id)}
                  onCheckedChange={() => onPurposeToggle(purpose.id)}
                />
                <label className="text-sm flex-1 cursor-pointer">
                  {purpose.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={onNext}>
          Далее
        </Button>
      </div>
    </div>
  );
};
