import { useEffect, useRef } from 'react';

interface Confetti {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  speedY: number;
  speedX: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'star';
}

const ConfettiEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces: Confetti[] = [];
    const confettiCount = 50;
    const colors = ['#FFD700', '#FDB931', '#FBBF24', '#F59E0B', '#EF4444', '#DC2626'];

    for (let i = 0; i < confettiCount; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2,
        speedY: Math.random() * 2 + 1,
        speedX: Math.random() * 2 - 1,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: ['circle', 'square', 'star'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'star'
      });
    }

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, rotation: number) => {
      let rot = (Math.PI / 2) * 3 + (rotation * Math.PI / 180);
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);

      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }

      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiPieces.forEach((piece) => {
        piece.y += piece.speedY;
        piece.x += piece.speedX;
        piece.rotation += piece.rotationSpeed;

        if (piece.y > canvas.height) {
          piece.y = -20;
          piece.x = Math.random() * canvas.width;
        }
        if (piece.x > canvas.width) {
          piece.x = 0;
        } else if (piece.x < 0) {
          piece.x = canvas.width;
        }

        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);

        ctx.fillStyle = piece.color;

        if (piece.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (piece.shape === 'square') {
          ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        } else if (piece.shape === 'star') {
          drawStar(0, 0, 5, piece.size / 2, piece.size / 4, 0);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99]"
    />
  );
};

export default ConfettiEffect;
