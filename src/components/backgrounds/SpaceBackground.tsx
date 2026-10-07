import React, { useEffect, useRef } from 'react';
import { cursorState, waveAt } from '../../data/cursorState';

interface Star {
  x: number;
  y: number;
  radius: number;
  depth: number;
  phase: number;
  speed: number;
  hue: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
}

const STAR_HUES = ['255,255,255', '200,220,255', '255,236,214', '190,200,255'];
const STARS_PER_PIXEL = 1 / 4200;
const PARALLAX = 0.12;
const LENS_REACH = 7;
const MAX_STRETCH = 9;
const CORE_FRACTION = 0.3;

const drawStar = (
  ctx: CanvasRenderingContext2D,
  s: Star,
  x: number,
  y: number,
  radialScale: number,
  tangentialScale: number,
  angle: number,
  alpha: number,
) => {
  const radial = Math.max(s.radius * radialScale, 0.3);
  const tangential = s.radius * tangentialScale;
  ctx.beginPath();
  ctx.fillStyle = `rgba(${s.hue},${alpha})`;
  ctx.ellipse(x, y, radial, tangential, angle, 0, Math.PI * 2);
  ctx.fill();
  if (s.depth > 0.7) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${s.hue},${alpha * 0.12})`;
    ctx.ellipse(x, y, radial * 4, tangential * 4, angle, 0, Math.PI * 2);
    ctx.fill();
  }
};

export const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let nextMeteor = performance.now() + 2500;

    const resize = () => {
      if (window.innerWidth === width && Math.abs(window.innerHeight - height) < 150) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(width * height * STARS_PER_PIXEL * 1.6);
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() ** 2.2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.35 + depth * 1.15,
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.6,
          hue: STAR_HUES[Math.floor(Math.random() * STAR_HUES.length)],
        };
      });
    };

    const spawnMeteor = () => {
      const angle = (Math.PI / 180) * (25 + Math.random() * 20);
      const speed = 0.9 + Math.random() * 0.6;
      meteors.push({
        x: Math.random() * width * 0.9,
        y: Math.random() * height * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 700 + Math.random() * 500,
        length: 120 + Math.random() * 120,
      });
    };

    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const t = now / 1000;
      const scroll = window.scrollY;

      ctx.clearRect(0, 0, width, height);

      const lens = cursorState.einsteinRadius;
      const waves = cursorState.waves.map(w => ({ ...w, ...waveAt(w, now) }));

      for (const s of stars) {
        let x = s.x;
        let y = (((s.y - scroll * PARALLAX * s.depth) % height) + height) % height;
        const twinkle = reducedMotion ? 1 : 0.65 + 0.35 * Math.sin(t * s.speed + s.phase);
        const alpha = (0.25 + s.depth * 0.75) * twinkle;

        for (const w of waves) {
          const dx = x - w.x;
          const dy = y - w.y;
          const d = Math.hypot(dx, dy) || 1;
          const push = w.amplitude * Math.exp(-(((d - w.radius) / 28) ** 2));
          x += (dx / d) * push;
          y += (dy / d) * push;
        }

        const dx = x - cursorState.x;
        const dy = y - cursorState.y;
        const d = Math.max(Math.hypot(dx, dy), 0.01);

        if (lens < 0.5 || d > lens * LENS_REACH) {
          drawStar(ctx, s, x, y, 1, 1, 0, alpha);
          continue;
        }

        const root = Math.sqrt(d * d + 4 * lens * lens);
        const ux = dx / d;
        const uy = dy / d;
        const angle = Math.atan2(dy, dx);

        const primary = (d + root) / 2;
        drawStar(ctx, s, cursorState.x + ux * primary, cursorState.y + uy * primary,
          (1 + d / root) / 2, Math.min(primary / d, MAX_STRETCH), angle, alpha);

        const secondary = (d - root) / 2;
        if (-secondary > lens * CORE_FRACTION) {
          drawStar(ctx, s, cursorState.x + ux * secondary, cursorState.y + uy * secondary,
            (1 - d / root) / 2 + 0.15, Math.min(-secondary / d, MAX_STRETCH), angle, alpha);
        }
      }

      if (!reducedMotion) {
        if (now > nextMeteor) {
          spawnMeteor();
          nextMeteor = now + 3500 + Math.random() * 5000;
        }
        meteors = meteors.filter(m => m.life < m.maxLife);
        for (const m of meteors) {
          m.life += dt;
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          const progress = m.life / m.maxLife;
          const fade = Math.sin(progress * Math.PI);
          const norm = Math.hypot(m.vx, m.vy);
          const tailX = m.x - (m.vx / norm) * m.length;
          const tailY = m.y - (m.vy / norm) * m.length;
          const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          gradient.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
          gradient.addColorStop(0.3, `rgba(135,206,235,${0.4 * fade})`);
          gradient.addColorStop(1, 'rgba(124,58,237,0)');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 space-nebula" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
