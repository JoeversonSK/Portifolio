import React from 'react';
import { useShootingStars } from '../../hooks/useShootingStars';

export const ShootingStars: React.FC = () => {
  const shootingStars = useShootingStars();

  return (
    <>
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
        />
      ))}
    </>
  );
};
