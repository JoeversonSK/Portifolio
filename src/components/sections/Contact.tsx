import React, { useState } from 'react';
import { HiArrowUpRight, HiCheck, HiOutlineClipboardDocument } from 'react-icons/hi2';
import { socialLinks, EMAIL } from '../../data/socialLinks';
import { SectionTitle } from '../common/SectionTitle';
import { GlowCard } from '../common/GlowCard';
import { Reveal } from '../common/Reveal';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle index="03" eyebrow="contato" title="Vamos conversar?" />

        <Reveal>
          <GlowCard className="contact-panel p-8 md:p-12">
            <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
              <div>
                <p className="font-display text-2xl md:text-3xl font-semibold text-white leading-snug">
                  Tem um projeto, uma vaga ou uma ideia?
                  <span className="block text-gray-400">Me manda uma mensagem.</span>
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-accent text-white hover:text-primary font-semibold rounded-lg transition"
                  >
                    Enviar email <HiArrowUpRight />
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 hover:border-accent text-gray-200 hover:text-accent rounded-lg transition"
                  >
                    {copied ? <HiCheck /> : <HiOutlineClipboardDocument />}
                    <span aria-live="polite">{copied ? 'Copiado!' : 'Copiar email'}</span>
                  </button>
                </div>
              </div>

              <ul className="space-y-3">
                {socialLinks.map(link => {
                  const Icon = link.icon;
                  const external = !link.url.startsWith('mailto');
                  return (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                        className="contact-link group"
                      >
                        <span className="grid place-items-center w-11 h-11 rounded-lg bg-white/5 border border-white/10 text-white group-hover:text-accent transition">
                          <Icon size={20} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-white font-medium">{link.label}</span>
                          <span className="block font-mono text-xs text-gray-400 truncate">{link.handle}</span>
                        </span>
                        <HiArrowUpRight className="text-gray-500 transition group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
};
