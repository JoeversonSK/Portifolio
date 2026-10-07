import React from 'react';
import { skills, skillCategories } from '../../data/skills';
import { SectionTitle } from '../common/SectionTitle';
import { GlowCard } from '../common/GlowCard';
import { Reveal } from '../common/Reveal';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 md:py-32 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          index="01"
          eyebrow="stack"
          title="Tecnologias & Ferramentas"
          description="O que eu uso para levar uma ideia do protótipo até produção."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => {
            const CategoryIcon = category.icon;
            const items = skills.filter(s => s.category === category.id);
            return (
              <Reveal key={category.id} delay={i * 0.1} className="h-full">
                <GlowCard className="h-full p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/30 to-accent/20 border border-white/10 text-accent">
                      <CategoryIcon size={20} />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-white">{category.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">{category.desc}</p>

                  <ul className="flex flex-wrap gap-2.5">
                    {items.map(skill => {
                      const Icon = skill.icon;
                      return (
                        <li
                          key={skill.name}
                          className="skill-chip"
                          style={{ '--skill': skill.color } as React.CSSProperties}
                        >
                          <Icon size={18} style={{ color: skill.color }} />
                          <span>{skill.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
