import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: 'rect' | 'circle' | 'star';
  vx: number;
  vy: number;
}

const COLORS = ['#10B981', '#059669', '#F59E0B', '#D97706', '#6366F1', '#EC4899', '#38BDF8'];

export function triggerConfetti() {
  window.dispatchEvent(new CustomEvent('app:confetti'));
}

export default function ConfettiCelebration() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleTrigger = () => {
      const count = 45;
      const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 160,
        y: window.innerHeight * 0.4 + (Math.random() - 0.5) * 60,
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: ['rect', 'circle', 'star'][Math.floor(Math.random() * 3)] as 'rect' | 'circle' | 'star',
        vx: (Math.random() - 0.5) * 600,
        vy: -300 - Math.random() * 350,
      }));

      setParticles(newParticles);
      setIsActive(true);

      const timer = setTimeout(() => {
        setIsActive(false);
        setParticles([]);
      }, 2500);

      return () => clearTimeout(timer);
    };

    window.addEventListener('app:confetti', handleTrigger);
    return () => window.removeEventListener('app:confetti', handleTrigger);
  }, []);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: p.x,
              y: p.y,
              scale: p.scale,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              x: p.x + p.vx,
              y: p.y + p.vy + 700,
              rotate: p.rotation + 720,
              opacity: 0,
            }}
            transition={{
              duration: 2 + Math.random() * 0.5,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{
              position: 'absolute',
              width: p.shape === 'circle' ? '12px' : '10px',
              height: p.shape === 'rect' ? '16px' : '12px',
              borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'star' ? '2px' : '3px',
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}80`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
