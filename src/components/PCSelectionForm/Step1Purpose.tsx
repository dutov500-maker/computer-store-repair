import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Step1PurposeProps {
  purpose: string;
  onPurposeChange: (purpose: string) => void;
  onNext: () => void;
}

const purposes = [
  { id: 'gaming', label: 'Игры', icon: 'Gamepad2', description: 'Для современных игр' },
  { id: 'work', label: 'Работа', icon: 'Briefcase', description: 'Офис и программы' },
  { id: 'creative', label: 'Творчество', icon: 'Palette', description: '3D, видео, дизайн' },
  { id: 'universal', label: 'Универсальный', icon: 'Cpu', description: 'Для всех задач' }
];

export const Step1Purpose = ({ 
  purpose, 
  onPurposeChange, 
  onNext 
}: Step1PurposeProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-primary">
          Для каких задач нужен компьютер?
        </h3>
        <p className="text-muted-foreground">Выберите основное назначение</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {purposes.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
              purpose === item.id
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-muted hover:border-primary/50'
            }`}
            onClick={() => onPurposeChange(item.id)}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`p-3 rounded-full ${purpose === item.id ? 'bg-primary/20' : 'bg-secondary'}`}>
                <Icon name={item.icon} size={32} className={purpose === item.id ? 'text-primary' : 'text-muted-foreground'} />
              </div>
              <div>
                <h4 className="font-bold text-lg">{item.label}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={onNext} disabled={!purpose}>
          Далее
        </Button>
      </div>
    </div>
  );
};
