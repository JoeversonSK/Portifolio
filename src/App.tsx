import React from 'react';
import { Navigation } from './components/common/Navigation';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { SpaceBackground } from './components/backgrounds/SpaceBackground';
import { CustomCursor } from './components/common/CustomCursor';

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-[#05050c] relative">
      <SpaceBackground />
      <CustomCursor />

      <div className="relative z-10">
        <Navigation />

        <main>
          <Hero />

          <Skills />

          <Projects />

          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
