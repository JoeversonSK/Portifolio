import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-accent/20 py-4 shadow-lg animate-slide-in-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="spaceship-container">
          <div className="moon" />
          <svg className="spaceship" viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="15" width="40" height="20" fill="#87CEEB" opacity="0.8" />
            <rect x="25" y="18" width="6" height="6" fill="#87CEEB" stroke="#7C3AED" strokeWidth="1" />
            <rect x="28" y="18" width="6" height="6" fill="#87CEEB" stroke="#7C3AED" strokeWidth="1" />
            <rect x="22" y="12" width="8" height="4" fill="#7C3AED" opacity="0.9" />
            <rect x="32" y="12" width="8" height="4" fill="#7C3AED" opacity="0.9" />
            <rect x="42" y="12" width="8" height="4" fill="#7C3AED" opacity="0.9" />
            <rect x="10" y="20" width="10" height="4" fill="#87CEEB" opacity="0.6" stroke="#7C3AED" strokeWidth="0.5" />
            <rect x="60" y="20" width="10" height="4" fill="#87CEEB" opacity="0.6" stroke="#7C3AED" strokeWidth="0.5" />
            <rect x="18" y="30" width="44" height="6" fill="#87CEEB" opacity="0.7" stroke="#7C3AED" strokeWidth="1" />
            <rect x="15" y="36" width="3" height="4" fill="#FF6B35" opacity="0.9" />
            <rect x="18" y="37" width="3" height="3" fill="#FFA500" opacity="0.8" />
            <rect x="21" y="36" width="3" height="4" fill="#FF6B35" opacity="0.9" />
            <rect x="56" y="36" width="3" height="4" fill="#FF6B35" opacity="0.9" />
            <rect x="59" y="37" width="3" height="3" fill="#FFA500" opacity="0.8" />
            <rect x="62" y="36" width="3" height="4" fill="#FF6B35" opacity="0.9" />
            <rect x="38" y="20" width="4" height="4" fill="#7C3AED" opacity="0.6" />
            <rect x="44" y="20" width="4" height="4" fill="#7C3AED" opacity="0.6" />
          </svg>
        </div>

        <div className="flex gap-6">
          <a href="#skills" className="text-gray-300 hover:text-accent transition hover:scale-110 transform duration-300">Habilidades</a>
          <a href="#projects" className="text-gray-300 hover:text-accent transition hover:scale-110 transform duration-300">Projetos</a>
          <a href="#contact" className="text-gray-300 hover:text-accent transition hover:scale-110 transform duration-300">Contato</a>
        </div>
      </div>
    </nav>
  );
};
