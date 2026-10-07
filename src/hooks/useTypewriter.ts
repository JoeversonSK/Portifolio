import { useState, useEffect } from 'react';

const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const HOLD_TIME = 1600;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useTypewriter = (words: string[]): string => {
  const [reduced] = useState(prefersReducedMotion);
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const word = words[index % words.length];

    if (!deleting && text === word) {
      const timeout = setTimeout(() => setDeleting(true), HOLD_TIME);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (deleting && text === '') {
        setDeleting(false);
        setIndex(i => i + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, deleting ? DELETE_SPEED : TYPE_SPEED);
    return () => clearTimeout(timeout);
  }, [reduced, text, deleting, index, words]);

  return reduced ? words.join(' · ') : text;
};
