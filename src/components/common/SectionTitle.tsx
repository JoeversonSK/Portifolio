import React from 'react';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <>
      <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up">{title}</h2>
      <div className="w-20 h-1 bg-gradient-to-r from-accent to-secondary rounded-full mb-12" />
    </>
  );
};
