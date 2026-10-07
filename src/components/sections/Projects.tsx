import React from 'react';
import { HiArrowUpRight, HiCheck } from 'react-icons/hi2';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../../data/projects';
import { SectionTitle } from '../common/SectionTitle';
import { GlowCard } from '../common/GlowCard';
import { Reveal } from '../common/Reveal';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 md:py-32 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          index="02"
          eyebrow="projetos"
          title="Projetos"
          description="Produtos completos, do banco de dados à interface."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <Reveal key={project.title} delay={i * 0.12} className="h-full">
                <GlowCard className="h-full flex flex-col p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <span className="project-icon">
                      <Icon size={26} />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
                      <span className="status-dot" />
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">{project.title}</h3>
                  <p className="font-mono text-sm text-accent/90 mt-1 mb-4">{project.subtitle}</p>
                  <p className="text-gray-300 leading-relaxed mb-6">{project.desc}</p>

                  <ul className="space-y-2 mb-8">
                    {project.highlights.map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <HiCheck className="text-secondary shrink-0" size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    {project.tech.map(tech => (
                      <span key={tech} className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                        {tech}
                      </span>
                    ))}

                    {(project.repo || project.demo) && (
                      <div className="ml-auto flex gap-3">
                        {project.repo && (
                          <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`Código de ${project.title}`} className="text-gray-400 hover:text-white">
                            <FaGithub size={20} />
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.title}`} className="text-gray-400 hover:text-white">
                            <HiArrowUpRight size={20} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
