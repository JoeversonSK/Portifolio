import { IconType } from 'react-icons';

export type SkillCategory = 'frontend' | 'backend' | 'tools';

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
  category: SkillCategory;
}

export interface Project {
  title: string;
  subtitle: string;
  desc: string;
  highlights: string[];
  tech: string[];
  status: string;
  icon: IconType;
  repo?: string;
  demo?: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  icon: IconType;
  url: string;
}
