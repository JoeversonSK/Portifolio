import React, { useEffect, useState } from 'react';

const LINKS = [
  { id: 'skills', label: 'Habilidades' },
  { id: 'projects', label: 'Projetos' },
  { id: 'contact', label: 'Contato' },
];

const BlackHoleLogo: React.FC = () => (
  <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
    <defs>
      <linearGradient id="nav-disk" x1="0" x2="1">
        <stop offset="0" stopColor="#ffb46b" />
        <stop offset="0.5" stopColor="#fff4e0" />
        <stop offset="1" stopColor="#ffb46b" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="15" fill="none" stroke="#ffd9a8" strokeWidth="2.5" opacity="0.9" />
    <ellipse cx="32" cy="34" rx="27" ry="4.5" fill="url(#nav-disk)" />
    <circle cx="32" cy="32" r="12" fill="#000" />
    <path d="M5 34 a27 4.5 0 0 0 54 0 h-14 a13 2.2 0 0 1 -26 0 z" fill="url(#nav-disk)" />
  </svg>
);

export const Navigation: React.FC = () => {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const line = window.innerHeight * 0.4;
      let current = '';
      LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 border-b ${
        scrolled ? 'bg-dark/70 backdrop-blur-xl border-white/10' : 'bg-gradient-to-b from-black/70 to-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <a href="#top" className="flex items-center gap-2.5 group" aria-label="Início">
          <span className="transition-transform duration-700 group-hover:rotate-180">
            <BlackHoleLogo />
          </span>
          <span className="hidden sm:inline font-display font-semibold text-white tracking-tight">Joeverson</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-300 ${
                active === id ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
