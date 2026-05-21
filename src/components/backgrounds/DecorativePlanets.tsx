import React from 'react';

export const DecorativePlanets: React.FC = () => {
  return (
    <>
      <div className="fixed top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-accent to-transparent opacity-10 blur-3xl pointer-events-none animate-float-slow" />
      <div className="fixed bottom-40 left-10 w-48 h-48 rounded-full bg-gradient-to-br from-secondary to-transparent opacity-10 blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s' }} />
    </>
  );
};
