import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center gap-4 animate-slide-in-left">
          <div className="w-64 h-64 rounded-2xl overflow-hidden border-4 transform hover:scale-105 transition duration-500">
            <img src="/photo.jpg" alt="Foto de perfil" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="text-left space-y-6 animate-slide-in-right">
          <div className="space-y-4">
            <div className="space-name-container mb-6">
              <div className="planet planet1" />
              <div className="planet planet2" />
              <div className="planet planet3" />
              <h2 className="text-5xl font-bold text-white space-name">Joeverson</h2>
            </div>
            <p className="text-2xl text-secondary font-semibold animate-fade-in-up animation-delay-2">Full Stack Developer</p>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-secondary rounded-full animate-scale-in animation-delay-3" />
          </div>

          <p className="text-lg text-gray-200 leading-relaxed animate-fade-in-up animation-delay-4 hover:text-accent transition">
            Seja bem-vindo ao meu espaço digital: onde transformo lógica e código em soluçlões completas 
          </p>

          <div className="space-y-2 text-gray-300 animate-fade-in-up animation-delay-5">
            <p>Explorando novas tecnologias todo dia </p>
          </div>

          <div className="flex gap-4 animate-fade-in-up animation-delay-6">
            <a href="mailto:Joeversonsantana@gmail.com" className="px-6 py-3 bg-secondary hover:bg-accent text-white font-bold rounded-lg transition transform hover:scale-110 duration-300 glow-secondary">
              Enviar Email
            </a>
            <a href="https://github.com/JoeversonSK" target="_blank" rel="noreferrer" className="px-6 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-primary font-bold rounded-lg transition transform hover:scale-110 duration-300">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
