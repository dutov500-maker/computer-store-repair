import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface Component3D {
  id: string;
  name: string;
  type: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
  price?: number;
}

interface PC3DViewerProps {
  components?: Component3D[];
  showPrices?: boolean;
}

const DEFAULT_COMPONENTS: Component3D[] = [
  { id: 'case', name: 'Корпус', type: 'Корпус ATX', position: { x: 50, y: 50 }, size: { width: 200, height: 400 }, color: '#1f2937', price: 3500 },
  { id: 'motherboard', name: 'Материнская плата', type: 'MSI B550', position: { x: 80, y: 100 }, size: { width: 140, height: 140 }, color: '#059669', price: 8000 },
  { id: 'cpu', name: 'Процессор', type: 'AMD Ryzen 5 5600', position: { x: 130, y: 140 }, size: { width: 40, height: 40 }, color: '#f59e0b', price: 10000 },
  { id: 'gpu', name: 'Видеокарта', type: 'RTX 4060', position: { x: 90, y: 260 }, size: { width: 120, height: 60 }, color: '#8b5cf6', price: 40000 },
  { id: 'ram', name: 'Оперативная память', type: '16 GB DDR4', position: { x: 180, y: 120 }, size: { width: 30, height: 80 }, color: '#3b82f6', price: 4000 },
  { id: 'psu', name: 'Блок питания', type: '650W', position: { x: 80, y: 390 }, size: { width: 100, height: 50 }, color: '#6b7280', price: 4000 },
  { id: 'ssd', name: 'SSD накопитель', type: '1TB NVMe', position: { x: 120, y: 350 }, size: { width: 60, height: 30 }, color: '#ef4444', price: 5500 },
];

const PC3DViewer = ({ components = DEFAULT_COMPONENTS, showPrices = true }: PC3DViewerProps) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleRotate = () => {
    setAutoRotate(false);
    setRotation(prev => (prev + 15) % 360);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleReset = () => {
    setRotation(0);
    setZoom(1);
    setAutoRotate(true);
  };

  const totalPrice = components.reduce((sum, comp) => sum + (comp.price || 0), 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-heading font-bold">3D визуализация сборки</h3>
          <p className="text-sm text-muted-foreground">Интерактивная модель компьютера</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRotate} title="Повернуть">
            <RotateCw size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomIn} title="Приблизить">
            <ZoomIn size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut} title="Отдалить">
            <ZoomOut size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} title="Сбросить">
            <Maximize2 size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div 
            ref={canvasRef}
            className="relative w-full h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg overflow-hidden border-2 border-gray-700"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #1f2937 0%, #111827 100%)'
            }}
          >
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
              style={{
                transform: `scale(${zoom}) perspective(1000px) rotateY(${rotation}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {components.map((component) => {
                const isSelected = selectedComponent === component.id;
                const isHovered = hoveredComponent === component.id;
                const scale = isSelected ? 1.1 : isHovered ? 1.05 : 1;

                return (
                  <div
                    key={component.id}
                    className="absolute cursor-pointer transition-all duration-300"
                    style={{
                      left: `${component.position.x}px`,
                      top: `${component.position.y}px`,
                      width: `${component.size.width}px`,
                      height: `${component.size.height}px`,
                      transform: `scale(${scale})`,
                      transformStyle: 'preserve-3d'
                    }}
                    onClick={() => setSelectedComponent(component.id === selectedComponent ? null : component.id)}
                    onMouseEnter={() => setHoveredComponent(component.id)}
                    onMouseLeave={() => setHoveredComponent(null)}
                  >
                    <div
                      className="w-full h-full rounded-lg shadow-2xl border-2 transition-all duration-300"
                      style={{
                        backgroundColor: component.color,
                        borderColor: isSelected || isHovered ? '#f97316' : 'rgba(255,255,255,0.2)',
                        boxShadow: isSelected || isHovered 
                          ? '0 0 30px rgba(249, 115, 22, 0.6)' 
                          : '0 10px 40px rgba(0,0,0,0.5)',
                      }}
                    >
                      {(isHovered || isSelected) && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap z-10 animate-fade-in">
                          <div className="font-bold">{component.name}</div>
                          <div className="text-gray-300">{component.type}</div>
                          {showPrices && component.price && (
                            <div className="text-orange-400 font-semibold">{component.price.toLocaleString('ru-RU')} ₽</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${autoRotate ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                <span>{autoRotate ? 'Автоповорот включен' : 'Кликните для вращения'}</span>
              </div>
            </div>

            {showPrices && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg shadow-lg">
                <div className="text-xs opacity-90">Общая стоимость</div>
                <div className="text-2xl font-bold">{totalPrice.toLocaleString('ru-RU')} ₽</div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Комплектующие:</h4>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {components.map((component) => (
              <Card
                key={component.id}
                className={`p-3 cursor-pointer transition-all duration-300 hover:border-orange-500 ${
                  selectedComponent === component.id ? 'border-orange-500 bg-orange-50 dark:bg-orange-950' : ''
                }`}
                onClick={() => setSelectedComponent(component.id === selectedComponent ? null : component.id)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded flex-shrink-0"
                    style={{ backgroundColor: component.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{component.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{component.type}</div>
                      </div>
                      {showPrices && component.price && (
                        <Badge variant="secondary" className="text-xs">
                          {component.price.toLocaleString('ru-RU')} ₽
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        💡 Наведите на компонент для подробной информации. Кликните для выделения.
      </div>
    </Card>
  );
};

export default PC3DViewer;
