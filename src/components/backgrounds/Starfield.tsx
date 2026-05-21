import React from 'react';
import { useStarfield } from '../../hooks/useStarfield';

export const Starfield: React.FC = () => {
  const stars = useStarfield();

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animation: `twinkle ${star.duration}s infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </>
  );
};
