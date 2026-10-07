import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SocialLink } from '../types';

export const EMAIL = "Joeversonsantana@gmail.com";

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    handle: EMAIL.toLowerCase(),
    icon: MdEmail,
    url: `mailto:${EMAIL}`,
  },
  {
    label: "GitHub",
    handle: "@JoeversonSK",
    icon: FaGithub,
    url: "https://github.com/JoeversonSK",
  },
  {
    label: "LinkedIn",
    handle: "in/joeverson-santana",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/joeverson-santana",
  },
];
