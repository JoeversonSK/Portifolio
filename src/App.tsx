import React from 'react';
import { Navigation } from './components/common/Navigation';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { Starfield } from './components/backgrounds/Starfield';
import { ShootingStars } from './components/backgrounds/ShootingStars';
import { DecorativePlanets } from './components/backgrounds/DecorativePlanets';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-primary to-dark relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Starfield />
        <ShootingStars />
      </div>

      <DecorativePlanets />

      <div className="relative z-10">
        <Navigation />

        <Hero />

        <Skills />

        <Projects />

        <Contact />

        <Footer />
      </div>
    </div>
  );
}
