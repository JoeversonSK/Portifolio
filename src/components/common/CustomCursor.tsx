import React, { useEffect, useRef } from 'react';
import { cursorState, WAVE_DURATION } from '../../data/cursorState';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';
const EINSTEIN_RADIUS = 24;
const EINSTEIN_RADIUS_HOVER = 40;
const MAX_WAVES = 4;

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const wavesLayer = wavesRef.current;
    if (!cursor || !wavesLayer) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let hovering = false;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      cursorState.x = e.clientX;
      cursorState.y = e.clientY;
      cursorState.active = true;
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      root.classList.add('cursor-visible');

      hovering = !!(e.target as Element | null)?.closest(INTERACTIVE);
      root.classList.toggle('cursor-hover', hovering);
    };

    const onDown = (e: MouseEvent) => {
      root.classList.add('cursor-down');
      if (reducedMotion) return;

      cursorState.waves.push({ x: e.clientX, y: e.clientY, start: performance.now() });
      if (cursorState.waves.length > MAX_WAVES) cursorState.waves.shift();

      const ring = document.createElement('span');
      ring.className = 'gravity-wave';
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      wavesLayer.appendChild(ring);
      setTimeout(() => ring.remove(), WAVE_DURATION);
    };

    const onUp = () => root.classList.remove('cursor-down');

    const onLeave = () => {
      cursorState.active = false;
      root.classList.remove('cursor-visible');
    };

    const animate = () => {
      const target = cursorState.active ? (hovering ? EINSTEIN_RADIUS_HOVER : EINSTEIN_RADIUS) : 0;
      cursorState.einsteinRadius += (target - cursorState.einsteinRadius) * 0.15;
      const now = performance.now();
      cursorState.waves = cursorState.waves.filter(w => now - w.start < WAVE_DURATION);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      root.classList.remove('has-custom-cursor', 'cursor-visible', 'cursor-hover', 'cursor-down');
      cursorState.active = false;
      cursorState.einsteinRadius = 0;
      cursorState.waves = [];
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div ref={wavesRef} className="gravity-waves" />
      <div ref={cursorRef} className="bh-cursor">
        <span className="bh-cursor__body">
          <span className="bh-cursor__disk bh-cursor__disk--back" />
          <span className="bh-cursor__arc" />
          <span className="bh-cursor__core" />
          <span className="bh-cursor__disk bh-cursor__disk--front" />
        </span>
      </div>
    </div>
  );
};
