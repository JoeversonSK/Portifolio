import React from 'react';
import { HiArrowUp } from 'react-icons/hi2';
import { socialLinks } from '../../data/socialLinks';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/10 bg-dark/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display font-semibold text-white">Joeverson Santana</p>
          <p className="text-sm text-gray-500 mt-1">© {new Date().getFullYear()} · Feito com React e WebGL</p>
        </div>

        <div className="flex items-center gap-2">
          {socialLinks.map(link => {
            const Icon = link.icon;
            const external = !link.url.startsWith('mailto');
            return (
              <a
                key={link.label}
                href={link.url}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                aria-label={link.label}
                className="grid place-items-center w-10 h-10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
              >
                <Icon size={18} />
              </a>
            );
          })}
          <a
            href="#top"
            className="ml-2 inline-flex items-center gap-1.5 px-4 h-10 rounded-full border border-white/10 text-sm text-gray-300 hover:text-white hover:border-accent transition"
          >
            Topo <HiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
};
