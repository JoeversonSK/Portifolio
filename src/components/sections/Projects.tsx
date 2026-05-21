import React from 'react';
import { projects } from '../../data/projects';
import { SectionTitle } from '../common/SectionTitle';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionTitle title="Projetos" />
      <div className="space-y-6">
        {projects.map((project, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-white/10 to-white/5 border border-secondary/30 rounded-xl p-8 hover:border-secondary/80 transition-all hover:shadow-lg hover:shadow-accent/20 transform hover:scale-105 duration-300 animate-fade-in-up group"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-accent transition">
                {project.title}
              </h3>
              <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold animate-bounce-gentle glow-secondary">
                {project.status}
              </span>
            </div>
            <p className="text-gray-200 mb-4 leading-relaxed group-hover:text-gray-100 transition">
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, j) => (
                <span
                  key={j}
                  className="px-3 py-1 bg-accent/20 border border-accent/40 text-accent rounded-lg text-sm font-medium hover:bg-accent/40 transition transform hover:scale-110 duration-300"
                  style={{ animationDelay: `${j * 0.1}s` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
