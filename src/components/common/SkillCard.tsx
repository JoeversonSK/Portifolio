import React from 'react';
import { Skill } from '../../types';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const IconComponent = skill.icon;

  return (
    <div
      className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-accent/20 hover:border-secondary/80 hover:from-white/20 hover:to-white/10 transition-all hover:shadow-lg transform hover:scale-110 hover:-translate-y-2 duration-300 animate-fade-in-up glow-accent"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="transform hover:rotate-12 transition duration-300">
        <IconComponent size={40} style={{ color: skill.color }} />
      </div>
      <span className="text-sm font-semibold text-white text-center hover:text-accent transition">
        {skill.name}
      </span>
    </div>
  );
};
