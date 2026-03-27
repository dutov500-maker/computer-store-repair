// Определяем группу FPS по цене товара
export type FpsGroup = 'eco' | 'mid' | 'ultra';

export function getFpsGroup(price: number): FpsGroup {
  if (price <= 85000) return 'eco';
  if (price <= 94999) return 'mid';
  return 'ultra';
}

const FPS_DATA = {
  eco: {
    label: 'Full HD 1080p',
    items: [
      { game: 'CS2 (Киберспорт)', fps: '250+ FPS' },
      { game: 'Dota 2 (Ультра)', fps: '180+ FPS' },
      { game: 'Rust (Средне-высокие)', fps: '80–100 FPS' },
      { game: 'Cyberpunk 2077 (Средние/DLSS)', fps: '60–70 FPS' },
    ],
  },
  mid: {
    label: 'Full HD 1080p',
    items: [
      { game: 'CS2 (Киберспорт)', fps: '400+ FPS' },
      { game: 'Dota 2 (Ультра)', fps: '240+ FPS' },
      { game: 'Rust (Высокие)', fps: '120+ FPS' },
      { game: 'Cyberpunk 2077 (Высокие/DLSS)', fps: '85+ FPS' },
    ],
  },
  ultra: {
    label: '2K 1440p',
    items: [
      { game: 'CS2', fps: '500+ FPS' },
      { game: 'Cyberpunk 2077 (Ultra + RT)', fps: '80+ FPS' },
      { game: 'Forza Horizon 5 (Экстрим)', fps: '120+ FPS' },
      { game: 'Starfield (Высокие)', fps: '70+ FPS' },
    ],
  },
};

interface FpsBlockProps {
  price: number;
  compact?: boolean;
}

export const FpsBlock = ({ price, compact = false }: FpsBlockProps) => {
  const group = getFpsGroup(price);
  const data = FPS_DATA[group];

  return (
    <div className={compact ? 'mb-3' : 'mb-5'}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
          Производительность в играх
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">
          {data.label}
        </span>
      </div>
      <div className={`grid ${compact ? 'grid-cols-1 gap-1' : 'grid-cols-2 gap-1.5'}`}>
        {data.items.map((item) => (
          <div key={item.game} className="flex items-center justify-between gap-2 py-1 border-b border-border/40 last:border-0">
            <span className={`text-muted-foreground ${compact ? 'text-[11px]' : 'text-xs'} leading-tight`}>
              {item.game}
            </span>
            <span className={`text-primary font-bold shrink-0 ${compact ? 'text-[11px]' : 'text-xs'}`}>
              {item.fps}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground/50 mt-1.5 leading-tight">
        *Показатели FPS усреднены. Реальный результат зависит от версии драйверов и игровых сценариев.
      </p>
    </div>
  );
};

interface DesignNoteProps {
  compact?: boolean;
}

export const DesignNote = ({ compact = false }: DesignNoteProps) => (
  <div
    className={`pl-3 border-l-2 border-primary ${compact ? 'mb-3' : 'mb-5'}`}
    style={{ borderLeftColor: 'hsl(var(--primary))' }}
  >
    <p className={`text-muted-foreground leading-relaxed ${compact ? 'text-[11px]' : 'text-xs'}`}>
      На фотографиях представлен один из вариантов исполнения. Каждая сборка K|LAB уникальна — мы вместе с вами выбираем дизайн, корпус и тип подсветки, чтобы компьютер идеально вписался в ваше пространство.
    </p>
  </div>
);
