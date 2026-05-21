import React from 'react';
import { skills } from '../../data/skills';
import { SectionTitle } from '../common/SectionTitle';
import { SkillCard } from '../common/SkillCard';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="bg-white/5 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Tecnologias & Ferramentas" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={i} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
