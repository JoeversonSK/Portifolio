import { SiReact, SiDocker, SiJavascript, SiPython, SiTailwindcss, SiPostgresql, SiCplusplus, SiHtml5, SiPhp, SiTypescript, SiGit, SiFigma, SiLaravel, SiAngular } from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa';
import { Skill } from '../types';

export const skills: Skill[] = [
  { name: "React/Native", icon: SiReact, color: "#61DAFB" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "HTML5", icon: SiHtml5, color: "#E34C26" },
  { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
  { name: "Git", icon: SiGit, color: "#F1502F" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];
