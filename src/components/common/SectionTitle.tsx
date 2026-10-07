import React from 'react';
import { Reveal } from './Reveal';

interface SectionTitleProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ index, eyebrow, title, description }) => {
  return (
    <Reveal className="mb-12 md:mb-16 max-w-2xl">
      <p className="font-mono text-sm text-accent/80 mb-3">
        <span className="text-secondary">{index}</span> / {eyebrow}
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h2>
      {description && <p className="mt-4 text-gray-400 text-lg leading-relaxed">{description}</p>}
    </Reveal>
  );
};
