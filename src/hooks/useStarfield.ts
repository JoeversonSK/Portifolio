import { useState, useEffect } from 'react';
import { Star } from '../types';
import { STAR_CONFIG } from '../data/constants';

export const useStarfield = (): Star[] => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: STAR_CONFIG.count }, () => ({
      id: Math.random(),
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: STAR_CONFIG.minDuration + Math.random() * (STAR_CONFIG.maxDuration - STAR_CONFIG.minDuration),
    }));
    setStars(generatedStars);
  }, []);

  return stars;
};
