import React from 'react';
import { socialLinks } from '../../data/socialLinks';
import { SectionTitle } from '../common/SectionTitle';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-white/5 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle title="Contatos" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {socialLinks.map((link, i) => {
            const IconComponent = link.icon;
            return (
              <a key={i} href={link.url} target={link.url.startsWith('mailto') ? undefined : "_blank"} rel={link.url.startsWith('mailto') ? undefined : "noreferrer"} className="group animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="bg-gradient-to-br from-accent to-secondary p-8 rounded-xl hover:shadow-lg hover:shadow-accent/40 transition transform hover:scale-110 hover:-translate-y-2 duration-300 glow-accent">
                  <IconComponent size={40} className="text-white mx-auto mb-4 group-hover:rotate-12 transition duration-300" />
                  <h3 className="text-lg font-bold text-white mb-2">{link.label}</h3>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
