import React, { useRef } from 'react';
import { BlackHole } from '../backgrounds/BlackHole';
import { useTypewriter } from '../../hooks/useTypewriter';

const ROLES = ['Front-end', 'Back-end', 'APIs'];

export const Hero: React.FC = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  const role = useTypewriter(ROLES);

  return (
    <section id="hero" className="relative overflow-hidden pt-16">
      <BlackHole anchorRef={photoRef} className="hero-black-hole absolute inset-0 w-full h-full" />
      <div className="hero-black-hole absolute inset-0 hidden md:block bg-gradient-to-r from-[#05050c]/95 via-[#05050c]/60 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-[calc(100svh-4rem)] grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-10 md:gap-6 items-center">
        <div className="text-left space-y-6 animate-slide-in-left">
          <div className="space-y-3">
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white space-name">Joeverson</h1>
            <p className="text-2xl text-accent font-semibold animate-fade-in-up animation-delay-2">Full Stack Developer</p>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-secondary rounded-full animate-scale-in animation-delay-3" />
          </div>

          <p className="text-lg text-gray-200 leading-relaxed max-w-xl animate-fade-in-up animation-delay-4">
            Transformo desafios de negócio em software robusto, escalável e bem construído, do planejamento à entrega.
          </p>

          <p className="font-mono text-accent/90 animate-fade-in-up animation-delay-5" aria-label={ROLES.join(' · ')}>
            <span aria-hidden="true">
              <span className="text-secondary">&gt;</span> {role}
              <span className="typing-cursor">|</span>
            </span>
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-6">
            <a href="mailto:Joeversonsantana@gmail.com" className="px-6 py-3 bg-secondary hover:bg-accent text-white hover:text-primary font-semibold rounded-lg transition transform hover:scale-105 duration-300">
              Enviar Email
            </a>
            <a href="https://github.com/JoeversonSK" target="_blank" rel="noreferrer" className="px-6 py-3 border border-white/20 bg-white/5 backdrop-blur text-white hover:border-accent hover:text-accent font-semibold rounded-lg transition transform hover:scale-105 duration-300">
              GitHub
            </a>
          </div>
        </div>

        <div className="flex justify-center order-first md:order-last animate-slide-in-right">
          <div ref={photoRef} className="w-56 h-56 md:w-72 md:h-72 rounded-full p-[3px] bg-gradient-to-br from-secondary to-accent">
            <img src="/avatar.jpg" alt="Foto de Joeverson" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
