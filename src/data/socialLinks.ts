import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SocialLink } from '../types';

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    icon: MdEmail,
    url: "mailto:Joeversonsantana@gmail.com",
    color: "#87CEEB"
  },
  {
    label: "GitHub",
    icon: FaGithub,
    url: "https://github.com/JoeversonSK",
    color: "#87CEEB"
  },
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/joeverson-santana",
    color: "#7C3AED"
  }
];
