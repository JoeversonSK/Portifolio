import { IconType } from 'react-icons';

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

export interface Project {
  title: string;
  desc: string;
  tech: string[];
  status: string;
}

export interface SocialLink {
  label: string;
  icon: IconType;
  url: string;
  color: string;
}

export interface Star {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export interface ShootingStar {
  id: number;
  left: number;
  top: number;
  delay: number;
}
