import { SiReact, SiDocker, SiJavascript, SiPython, SiTailwindcss, SiPostgresql, SiCplusplus, SiHtml5, SiPhp, SiTypescript, SiGit, SiFigma, SiLaravel, SiAngular, SiNodedotjs } from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { HiOutlineCodeBracket, HiOutlineCircleStack, HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import { Skill, SkillCategory } from '../types';

export const skills: Skill[] = [
  { name: "React/Native", icon: SiReact, color: "#61DAFB", category: 'frontend' },
  { name: "Angular", icon: SiAngular, color: "#DD0031", category: 'frontend' },
  { name: "TypeScript", icon: SiTypescript, color: "#4A90E2", category: 'frontend' },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: 'frontend' },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", category: 'frontend' },
  { name: "HTML5", icon: SiHtml5, color: "#E34C26", category: 'frontend' },
  { name: "CSS", icon: FaCss3Alt, color: "#3C9CD7", category: 'frontend' },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", category: 'backend' },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", category: 'backend' },
  { name: "PHP", icon: SiPhp, color: "#777BB4", category: 'backend' },
  { name: "Python", icon: SiPython, color: "#4B8BBE", category: 'backend' },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#6CA0DC", category: 'backend' },
  { name: "C++", icon: SiCplusplus, color: "#659AD2", category: 'backend' },
  { name: "Docker", icon: SiDocker, color: "#2496ED", category: 'tools' },
  { name: "Git", icon: SiGit, color: "#F1502F", category: 'tools' },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", category: 'tools' },
];

export const skillCategories: { id: SkillCategory; title: string; desc: string; icon: IconType }[] = [
  { id: 'frontend', title: 'Front-end', desc: 'Interfaces web e mobile responsivas e acessíveis.', icon: HiOutlineCodeBracket },
  { id: 'backend', title: 'Back-end & Dados', desc: 'APIs, regras de negócio e bancos de dados.', icon: HiOutlineCircleStack },
  { id: 'tools', title: 'DevOps & Ferramentas', desc: 'Ambientes, versionamento e design.', icon: HiOutlineWrenchScrewdriver },
];
