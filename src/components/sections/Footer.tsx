import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 backdrop-blur border-t border-accent/10 py-8 animate-fade-in-up">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <p>© 2026 Joeverson Santana. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
