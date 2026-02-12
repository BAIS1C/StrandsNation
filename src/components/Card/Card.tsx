'use client';

import { useRef, useState, useCallback, type ReactNode } from 'react';
import type { ColorKey } from '@/types/design';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  variant?: ColorKey;
  className?: string;
  compact?: boolean;
}

const variantVars: Record<string, Record<string, string>> = {
  cyan:   { '--card-color': 'var(--c-accent)', '--card-hover-bg': 'var(--a-accent-hover)' },
  pink:   { '--card-color': 'var(--c-pink)',   '--card-hover-bg': 'var(--a-pink-hover)' },
  yellow: { '--card-color': 'var(--c-yellow)', '--card-hover-bg': 'rgba(249,225,0,0.06)' },
  purple: { '--card-color': 'var(--c-purple)', '--card-hover-bg': 'rgba(139,92,246,0.06)' },
  red:    { '--card-color': 'var(--c-red)',    '--card-hover-bg': 'rgba(255,68,68,0.06)' },
  green:  { '--card-color': 'var(--c-green)',  '--card-hover-bg': 'rgba(34,197,94,0.06)' },
  glass:  { '--card-color': 'var(--c-dim)',    '--card-hover-bg': 'rgba(255,255,255,0.04)' },
};

export default function Card({ children, variant = 'cyan', className = '', compact = false }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setTilt({
      rx: -((e.clientY - rect.top) / rect.height - 0.5) * 8,
      ry: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
    });
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const cssVars = variantVars[variant] || variantVars.cyan;

  return (
    <div
      ref={ref}
      className={`${styles.card} ${hovered ? styles.hovered : ''} ${compact ? styles.compact : ''} ${className}`}
      style={{
        ...cssVars,
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)${hovered ? ' translateY(-2px)' : ''}`,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      {/* Inner border trace */}
      <div className={styles.innerBorder} />
      {/* Corner accents */}
      <div className={styles.accentTop} />
      <div className={styles.accentBottom} />
      <div className={styles.cornerBR} />
      <div className={styles.cornerTL} />
      {/* Content */}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
