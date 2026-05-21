import { useState, useEffect } from 'react';
import { ShootingStar } from '../types';
import { SHOOTING_STAR_CONFIG } from '../data/constants';

export const useShootingStars = (): ShootingStar[] => {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const createShootingStar = () => {
      const newStar: ShootingStar = {
        id: Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 50,
        delay: 0,
      };
      setShootingStars(prev => [...prev, newStar]);
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== newStar.id));
      }, SHOOTING_STAR_CONFIG.duration);
    };

    const interval = setInterval(createShootingStar, SHOOTING_STAR_CONFIG.interval);
    return () => clearInterval(interval);
  }, []);

  return shootingStars;
};
