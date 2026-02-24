'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './ParticleHero.module.css';

/* ═══════════════════════════════════════════════════
   STRANDS PARTICLE ENGINE — Globe → Logo Formation
   White/monochrome wireframe globe (Architects aesthetic)
   morphs to Strands logo with marquee-color resolve.
   ═══════════════════════════════════════════════════ */

// --- Marquee colors from tokens.css (the scrolling banner palette) ---
const MARQUEE_COLORS = [
  '#00C2FF', // cyan  (--c-accent)
  '#F000B8', // pink  (--c-pink)
  '#F9E100', // yellow (--c-yellow)
  '#8b5cf6', // purple (--c-purple)
  '#22c55e', // green  (--c-green)
];

// --- Strands logo as normalized coordinate points ---
// These trace out "STRANDS" in the angular Orbitron-style display font
// Each letter is a set of line segments normalized to [0,1] range
function generateStrandsLogoCoords(
  cx: number,
  cy: number,
  scale: number
): { x: number; y: number; color: string }[] {
  const coords: { x: number; y: number; color: string }[] = [];

  // Letter definitions as polyline segments [x, y] normalized 0-1
  // Total width ~7 units, height ~1 unit, centered
  const letters: number[][][] = [
    // S
    [
      [0.8, 0], [0.1, 0], [0, 0.1], [0, 0.4], [0.1, 0.5],
      [0.7, 0.5], [0.8, 0.6], [0.8, 0.9], [0.7, 1], [0, 1],
    ],
    // T
    [
      [0, 0], [0.8, 0], [0.4, 0], [0.4, 1],
    ],
    // R
    [
      [0, 1], [0, 0], [0.6, 0], [0.7, 0.1], [0.7, 0.4],
      [0.6, 0.5], [0, 0.5], [0.5, 0.5], [0.7, 1],
    ],
    // A
    [
      [0, 1], [0.35, 0], [0.45, 0], [0.8, 1],
      [0.15, 0.6], [0.65, 0.6],
    ],
    // N
    [
      [0, 1], [0, 0], [0.7, 1], [0.7, 0],
    ],
    // D
    [
      [0, 1], [0, 0], [0.5, 0], [0.7, 0.15], [0.7, 0.85],
      [0.5, 1], [0, 1],
    ],
    // S (duplicate)
    [
      [0.8, 0], [0.1, 0], [0, 0.1], [0, 0.4], [0.1, 0.5],
      [0.7, 0.5], [0.8, 0.6], [0.8, 0.9], [0.7, 1], [0, 1],
    ],
  ];

  const letterWidth = 0.85;
  const gap = 0.3;
  const totalWidth = letters.length * letterWidth + (letters.length - 1) * gap;
  const letterHeight = 1.0;

  letters.forEach((segments, li) => {
    const offsetX = li * (letterWidth + gap) - totalWidth / 2;
    const colorForLetter = MARQUEE_COLORS[li % MARQUEE_COLORS.length];

    // Interpolate points along each segment pair
    for (let si = 0; si < segments.length - 1; si++) {
      const [x1, y1] = segments[si];
      const [x2, y2] = segments[si + 1];
      const dist = Math.hypot(x2 - x1, y2 - y1);
      const steps = Math.max(3, Math.floor(dist * 12));

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const px = x1 + (x2 - x1) * t;
        const py = y1 + (y2 - y1) * t;

        coords.push({
          x: cx + (offsetX + px * letterWidth) * scale,
          y: cy + (py * letterHeight - 0.5) * scale,
          color: colorForLetter,
        });
      }
    }
  });

  return coords;
}

// --- Globe wireframe as lat/long grid points ---
function generateGlobeCoords(
  cx: number,
  cy: number,
  radius: number,
  rotation: number
): { x: number; y: number }[] {
  const coords: { x: number; y: number }[] = [];
  const latLines = 9;
  const lonLines = 12;
  const pointsPerLine = 24;

  // Latitude lines (horizontal rings)
  for (let lat = 1; lat < latLines; lat++) {
    const phi = (lat / latLines) * Math.PI;
    const ringRadius = Math.sin(phi) * radius;
    const ringY = cy + Math.cos(phi) * radius;

    for (let p = 0; p < pointsPerLine; p++) {
      const theta = (p / pointsPerLine) * Math.PI * 2 + rotation;
      const x = cx + Math.cos(theta) * ringRadius;
      // Only show front-facing points (z > 0)
      const z = Math.sin(theta) * ringRadius;
      if (z > -radius * 0.15) {
        coords.push({ x, y: ringY });
      }
    }
  }

  // Longitude lines (vertical arcs)
  for (let lon = 0; lon < lonLines; lon++) {
    const theta = (lon / lonLines) * Math.PI * 2 + rotation;

    for (let p = 0; p < pointsPerLine; p++) {
      const phi = (p / pointsPerLine) * Math.PI;
      const x3d = Math.sin(phi) * Math.cos(theta) * radius;
      const y3d = Math.cos(phi) * radius;
      const z3d = Math.sin(phi) * Math.sin(theta) * radius;

      if (z3d > -radius * 0.15) {
        coords.push({
          x: cx + x3d,
          y: cy + y3d,
        });
      }
    }
  }

  return coords;
}

// --- Particle class ---
interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  baseX: number;
  baseY: number;
  dx: number;
  dy: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;         // current render color
  targetColor: string;   // color to lerp toward
  phase: number;
  state: 'wandering' | 'forming' | 'holding' | 'dissolving';
}

function createParticle(cx: number, cy: number, index: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.random() * 200 + 50;
  const x = cx + Math.cos(angle) * r;
  const y = cy + Math.sin(angle) * r;

  return {
    x, y,
    targetX: x,
    targetY: y,
    baseX: x,
    baseY: y,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    size: 1.2 + Math.random() * 0.8,
    speed: 0.3 + Math.random() * 0.5,
    opacity: 0.2 + Math.random() * 0.3,
    color: '#888888',
    targetColor: '#888888',
    phase: Math.random() * 1000,
    state: 'wandering',
  };
}

// --- Color interpolation ---
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function lerpColor(from: string, to: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  return rgbToHex(
    r1 + (r2 - r1) * t,
    g1 + (g2 - g1) * t,
    b1 + (b2 - b1) * t,
  );
}

// ═══ MAIN COMPONENT ═══

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const startTimeRef = useRef(Date.now());

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const particles = particlesRef.current;
    const elapsed = Date.now() - startTimeRef.current;

    // --- Cycle timing ---
    // Total cycle: 34s
    // 0-8s:    wandering
    // 8-12s:   forming globe
    // 12-15s:  holding globe (slowly rotating)
    // 15-17s:  dissolving
    // 17-25s:  wandering
    // 25-29s:  forming logo
    // 29-32s:  holding logo (color resolve)
    // 32-34s:  dissolving
    const cycleTime = 34000;
    const t = (elapsed % cycleTime) / cycleTime;

    let phase: 'wander1' | 'formGlobe' | 'holdGlobe' | 'dissolve1' | 'wander2' | 'formLogo' | 'holdLogo' | 'dissolve2';
    let phaseProgress = 0; // 0-1 within current phase

    if (t < 0.235) {
      phase = 'wander1';
      phaseProgress = t / 0.235;
    } else if (t < 0.353) {
      phase = 'formGlobe';
      phaseProgress = (t - 0.235) / 0.118;
    } else if (t < 0.441) {
      phase = 'holdGlobe';
      phaseProgress = (t - 0.353) / 0.088;
    } else if (t < 0.5) {
      phase = 'dissolve1';
      phaseProgress = (t - 0.441) / 0.059;
    } else if (t < 0.735) {
      phase = 'wander2';
      phaseProgress = (t - 0.5) / 0.235;
    } else if (t < 0.853) {
      phase = 'formLogo';
      phaseProgress = (t - 0.735) / 0.118;
    } else if (t < 0.941) {
      phase = 'holdLogo';
      phaseProgress = (t - 0.853) / 0.088;
    } else {
      phase = 'dissolve2';
      phaseProgress = (t - 0.941) / 0.059;
    }

    // --- Globe rotation (slow continuous) ---
    const globeRotation = elapsed * 0.0003;
    const globeRadius = Math.min(w, h) * 0.32;
    const globeCoords = generateGlobeCoords(cx, cy, globeRadius, globeRotation);

    // --- Logo coords ---
    const logoScale = Math.min(w, h) * 0.28;
    const logoCoords = generateStrandsLogoCoords(cx, cy, logoScale);

    // --- Update particles ---
    const numParticles = particles.length;

    for (let i = 0; i < numParticles; i++) {
      const p = particles[i];

      switch (phase) {
        case 'wander1':
        case 'wander2': {
          p.state = 'wandering';
          // Brownian drift
          p.dx += (Math.random() - 0.5) * 0.04;
          p.dy += (Math.random() - 0.5) * 0.04;
          p.dx *= 0.97;
          p.dy *= 0.97;
          p.x += p.dx;
          p.y += p.dy;
          // Gentle pull back to center cloud
          p.x += (cx - p.x) * 0.001;
          p.y += (cy - p.y) * 0.001;
          // Reset colors to monochrome
          p.targetColor = '#888888';
          p.opacity += (0.3 - p.opacity) * 0.05;
          p.size += (1.5 - p.size) * 0.05;
          break;
        }

        case 'formGlobe': {
          p.state = 'forming';
          const gi = i % globeCoords.length;
          const target = globeCoords[gi];
          p.targetX = target.x;
          p.targetY = target.y;
          const ease = Math.min(1, phaseProgress * 1.5);
          p.x += (p.targetX - p.x) * 0.04 * p.speed * ease;
          p.y += (p.targetY - p.y) * 0.04 * p.speed * ease;
          p.targetColor = '#CCCCCC';
          p.opacity += (0.7 - p.opacity) * 0.05;
          p.size += (1.8 - p.size) * 0.05;
          break;
        }

        case 'holdGlobe': {
          p.state = 'holding';
          const gi2 = i % globeCoords.length;
          const target2 = globeCoords[gi2];
          // Keep tracking the rotating globe
          p.x += (target2.x - p.x) * 0.08;
          p.y += (target2.y - p.y) * 0.08;
          p.targetColor = '#FFFFFF';
          p.opacity += (0.85 - p.opacity) * 0.04;
          p.size += (2.0 - p.size) * 0.04;
          break;
        }

        case 'dissolve1':
        case 'dissolve2': {
          p.state = 'dissolving';
          p.dx += (Math.random() - 0.5) * 0.5;
          p.dy += (Math.random() - 0.5) * 0.5;
          p.dx *= 0.95;
          p.dy *= 0.95;
          p.x += p.dx;
          p.y += p.dy;
          p.targetColor = '#888888';
          p.opacity += (0.15 - p.opacity) * 0.08;
          p.size += (1.2 - p.size) * 0.06;
          break;
        }

        case 'formLogo': {
          p.state = 'forming';
          const li = i % logoCoords.length;
          const target3 = logoCoords[li];
          p.targetX = target3.x;
          p.targetY = target3.y;
          const ease2 = Math.min(1, phaseProgress * 1.5);
          p.x += (p.targetX - p.x) * 0.04 * p.speed * ease2;
          p.y += (p.targetY - p.y) * 0.04 * p.speed * ease2;
          // B&W during formation, colors haven't resolved yet
          p.targetColor = '#CCCCCC';
          p.opacity += (0.7 - p.opacity) * 0.05;
          p.size += (2.0 - p.size) * 0.05;
          break;
        }

        case 'holdLogo': {
          p.state = 'holding';
          const li2 = i % logoCoords.length;
          const target4 = logoCoords[li2];
          p.x += (target4.x - p.x) * 0.08;
          p.y += (target4.y - p.y) * 0.08;
          // COLOR RESOLVE: B&W → marquee colors over holdLogo phase
          const colorT = Math.min(1, phaseProgress * 1.2);
          p.targetColor = lerpColor('#FFFFFF', target4.color, colorT);
          p.opacity += (0.9 - p.opacity) * 0.04;
          p.size += (2.2 - p.size) * 0.04;
          break;
        }
      }

      // Smooth color interpolation
      p.color = lerpColor(p.color, p.targetColor, 0.08);

      // Mouse repulsion (subtle)
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mdist = Math.hypot(mx - p.x, my - p.y);
      if (mdist < 80) {
        const force = (80 - mdist) / 80 * 0.8;
        p.x -= (mx - p.x) / mdist * force;
        p.y -= (my - p.y) / mdist * force;
      }

      // Bounds
      if (p.x < -50) p.x = w + 50;
      if (p.x > w + 50) p.x = -50;
      if (p.y < -50) p.y = h + 50;
      if (p.y > h + 50) p.y = -50;
    }

    // --- RENDER ---
    ctx.clearRect(0, 0, w, h);

    // Connection lines (during globe and logo formation)
    if (
      phase === 'formGlobe' ||
      phase === 'holdGlobe' ||
      phase === 'formLogo' ||
      phase === 'holdLogo'
    ) {
      const connectionDist =
        phase === 'formGlobe' || phase === 'holdGlobe' ? 35 : 25;
      const lineOpacity =
        phase === 'holdGlobe' || phase === 'holdLogo' ? 0.12 : 0.06;

      ctx.strokeStyle =
        phase === 'holdLogo'
          ? `rgba(200, 200, 200, ${lineOpacity})`
          : `rgba(255, 255, 255, ${lineOpacity})`;
      ctx.lineWidth = 0.5;

      // Only check a subset for performance
      const step = numParticles > 400 ? 3 : 2;
      for (let i = 0; i < numParticles; i += step) {
        const a = particles[i];
        for (let j = i + step; j < numParticles; j += step) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    // Particles
    for (let i = 0; i < numParticles; i++) {
      const p = particles[i];
      if (p.opacity < 0.05) continue;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);

      // Re-init particles
      const count = window.innerWidth < 768 ? 250 : window.innerWidth < 1200 ? 400 : 600;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      particlesRef.current = Array.from({ length: count }, (_, i) =>
        createParticle(cx, cy, i)
      );
    };

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Show static state, no animation
      resize();
      return;
    }

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouse);
    startTimeRef.current = Date.now();
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
