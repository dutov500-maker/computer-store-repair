import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Resolution {
  value: string;
  label: string;
}

interface Step3DetailsProps {
  resolutions: Resolution[];
  selectedResolution: string;
  hasMonitor: string;
  timing: string;
  additionalInfo: string;
  onResolutionSelect: (resolution: string) => void;
  onMonitorSelect: (hasMonitor: string) => void;
  onTimingChange: (timing: string) => void;
  onAdditionalInfoChange: (info: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Details = ({
  resolutions,
  selectedResolution,
  hasMonitor,
  timing,
  additionalInfo,
  onResolutionSelect,
  onMonitorSelect,
  onTimingChange,
  onAdditionalInfoChange,
  onNext,
  onBack
}: Step3DetailsProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">
          Дополнительная информация
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-base mb-3 block">В каком разрешении планируете играть?</Label>
          <div className="grid grid-cols-3 gap-3">
            {resolutions.map((res) => (
              <Button
                key={res.value}
                variant={selectedResolution === res.value ? 'default' : 'outline'}
                className="h-auto py-4"
                onClick={() => onResolutionSelect(res.value)}
              >
                <div className="text-center">
                  <div className="font-bold text-lg">{res.value}</div>
                  <div className="text-xs opacity-80">{res.label !== res.value ? res.label : ''}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base mb-3 block">Есть монитор?</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={hasMonitor === 'yes' ? 'default' : 'outline'}
              className="h-auto py-4"
              onClick={() => onMonitorSelect('yes')}
            >
              Да, есть
            </Button>
            <Button
              variant={hasMonitor === 'no' ? 'default' : 'outline'}
              className="h-auto py-4"
              onClick={() => onMonitorSelect('no')}
            >
              Нет, нужен
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-base mb-3 block">Когда планируете покупку?</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={timing === 'urgent' ? 'default' : 'outline'}
              className="h-auto py-4"
              onClick={() => onTimingChange('urgent')}
            >
              Срочно (1-3 дня)
            </Button>
            <Button
              variant={timing === 'week' ? 'default' : 'outline'}
              className="h-auto py-4"
              onClick={() => onTimingChange('week')}
            >
              В течение недели
            </Button>
            <Button
              variant={timing === 'month' ? 'default' : 'outline'}
              className="h-auto py-4"
              onClick={() => onTimingChange('month')}
            >
              В течение месяца
            </Button>
            <Button
              variant={timing === 'later' ? 'default' : 'outline'}
              className="h-auto py-4"
              onClick={() => onTimingChange('later')}
            >
              Пока изучаю
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="additionalInfo" className="text-base mb-3 block">
            Дополнительные пожелания (опционально)
          </Label>
          <Textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(e) => onAdditionalInfoChange(e.target.value)}
            placeholder="Например: нужна RGB подсветка, тихая работа, компактный корпус..."
            className="min-h-[100px]"
          />
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
