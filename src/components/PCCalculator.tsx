import { useState } from 'react';
import { Calculator, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ComponentPrice {
  name: string;
  price: number;
}

const PROCESSORS: ComponentPrice[] = [
  { name: 'Intel Core i3-12100F', price: 8000 },
  { name: 'Intel Core i5-12400F', price: 12000 },
  { name: 'AMD Ryzen 5 5600', price: 10000 },
  { name: 'Intel Core i7-12700F', price: 22000 },
  { name: 'AMD Ryzen 7 5700X', price: 18000 },
  { name: 'Intel Core i9-12900K', price: 35000 },
];

const GPU: ComponentPrice[] = [
  { name: 'Встроенная графика', price: 0 },
  { name: 'GTX 1650', price: 15000 },
  { name: 'RTX 3050', price: 25000 },
  { name: 'RTX 3060', price: 35000 },
  { name: 'RTX 4060', price: 40000 },
  { name: 'RTX 4070', price: 60000 },
];

const RAM: ComponentPrice[] = [
  { name: '8 ГБ DDR4', price: 2500 },
  { name: '16 ГБ DDR4', price: 4000 },
  { name: '32 ГБ DDR4', price: 7000 },
  { name: '16 ГБ DDR5', price: 6000 },
  { name: '32 ГБ DDR5', price: 11000 },
];

const STORAGE: ComponentPrice[] = [
  { name: '256 ГБ SSD', price: 2000 },
  { name: '512 ГБ SSD', price: 3500 },
  { name: '1 ТБ SSD', price: 5500 },
  { name: '2 ТБ SSD', price: 10000 },
];

const MOTHERBOARD_BASE = 8000;
const PSU_BASE = 4000;
const CASE_BASE = 3500;
const ASSEMBLY_FEE = 2000;

const PCCalculator = () => {
  const [open, setOpen] = useState(false);
  const [processor, setProcessor] = useState<string>('');
  const [gpu, setGpu] = useState<string>('');
  const [ram, setRam] = useState<string>('');
  const [storage, setStorage] = useState<string>('');

  const calculateTotal = (): number => {
    let total = MOTHERBOARD_BASE + PSU_BASE + CASE_BASE + ASSEMBLY_FEE;

    if (processor) {
      const proc = PROCESSORS.find(p => p.name === processor);
      if (proc) total += proc.price;
    }

    if (gpu) {
      const graphics = GPU.find(g => g.name === gpu);
      if (graphics) total += graphics.price;
    }

    if (ram) {
      const memory = RAM.find(r => r.name === ram);
      if (memory) total += memory.price;
    }

    if (storage) {
      const ssd = STORAGE.find(s => s.name === storage);
      if (ssd) total += ssd.price;
    }

    return total;
  };

  const isComplete = processor && gpu && ram && storage;
  const total = calculateTotal();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="fixed bottom-44 right-6 z-50 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 border-2 border-green-500 hover:bg-green-50 dark:hover:bg-green-950"
        >
          <Calculator size={20} className="mr-2 text-green-600" />
          <span className="hidden sm:inline text-green-600">Калькулятор</span>
          <span className="sm:hidden text-green-600">Цена</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading flex items-center gap-2">
            <Calculator className="text-green-600" />
            Калькулятор стоимости сборки ПК
          </DialogTitle>
          <DialogDescription>
            Выберите комплектующие и узнайте примерную стоимость сборки
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="processor">Процессор</Label>
            <Select value={processor} onValueChange={setProcessor}>
              <SelectTrigger id="processor">
                <SelectValue placeholder="Выберите процессор" />
              </SelectTrigger>
              <SelectContent>
                {PROCESSORS.map((proc) => (
                  <SelectItem key={proc.name} value={proc.name}>
                    {proc.name} — {proc.price.toLocaleString('ru-RU')} ₽
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gpu">Видеокарта</Label>
            <Select value={gpu} onValueChange={setGpu}>
              <SelectTrigger id="gpu">
                <SelectValue placeholder="Выберите видеокарту" />
              </SelectTrigger>
              <SelectContent>
                {GPU.map((graphics) => (
                  <SelectItem key={graphics.name} value={graphics.name}>
                    {graphics.name} — {graphics.price === 0 ? 'Бесплатно' : `${graphics.price.toLocaleString('ru-RU')} ₽`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ram">Оперативная память</Label>
            <Select value={ram} onValueChange={setRam}>
              <SelectTrigger id="ram">
                <SelectValue placeholder="Выберите объем RAM" />
              </SelectTrigger>
              <SelectContent>
                {RAM.map((memory) => (
                  <SelectItem key={memory.name} value={memory.name}>
                    {memory.name} — {memory.price.toLocaleString('ru-RU')} ₽
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storage">Накопитель</Label>
            <Select value={storage} onValueChange={setStorage}>
              <SelectTrigger id="storage">
                <SelectValue placeholder="Выберите SSD" />
              </SelectTrigger>
              <SelectContent>
                {STORAGE.map((ssd) => (
                  <SelectItem key={ssd.name} value={ssd.name}>
                    {ssd.name} — {ssd.price.toLocaleString('ru-RU')} ₽
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Материнская плата:</span>
                <span className="font-medium">{MOTHERBOARD_BASE.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Блок питания:</span>
                <span className="font-medium">{PSU_BASE.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Корпус:</span>
                <span className="font-medium">{CASE_BASE.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Сборка и настройка:</span>
                <span className="font-medium">{ASSEMBLY_FEE.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="border-t border-green-300 dark:border-green-700 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-700 dark:text-green-400">Итого:</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {isComplete ? `${total.toLocaleString('ru-RU')} ₽` : '—'}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {isComplete && (
            <div className="animate-fade-in">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-3">
                * Цены ориентировочные и могут меняться в зависимости от наличия комплектующих
              </p>
              <Button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => {
                    const callbackBtn = document.querySelector('[class*="fixed bottom-6 right-6"]') as HTMLElement;
                    callbackBtn?.click();
                  }, 300);
                }}
              >
                Заказать эту конфигурацию
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PCCalculator;
