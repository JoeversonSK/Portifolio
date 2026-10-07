export interface GravityWave {
  x: number;
  y: number;
  start: number;
}

export const WAVE_DURATION = 1100;
export const WAVE_SPEED = 0.345;

export const cursorState = {
  active: false,
  x: -1000,
  y: -1000,
  einsteinRadius: 0,
  waves: [] as GravityWave[],
};

export const waveAt = (wave: GravityWave, now: number) => {
  const age = now - wave.start;
  const progress = Math.min(age / WAVE_DURATION, 1);
  return {
    radius: age * WAVE_SPEED,
    amplitude: 9 * (1 - progress) ** 2,
    done: progress >= 1,
  };
};
