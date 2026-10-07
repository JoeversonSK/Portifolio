import { HiOutlineBuildingOffice2, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { Project } from '../types';

export const projects: Project[] = [
  {
    title: "Cidade Online",
    subtitle: "Gestão urbana inteligente",
    desc: "Plataforma que aproxima o cidadão da prefeitura e elimina a burocracia: um só lugar para registrar demandas urbanas, acompanhar obras públicas e participar de votações oficiais.",
    highlights: ["Registro de demandas urbanas", "Acompanhamento de obras públicas", "Votações oficiais"],
    tech: ["React Native", "Expo", "Node.js", "PostgreSQL", "Docker"],
    status: "Em desenvolvimento",
    icon: HiOutlineBuildingOffice2,
  },
  {
    title: "Atende",
    subtitle: "Central de atendimento para WhatsApp",
    desc: "Central de atendimento multiusuário para WhatsApp, executada no seu próprio computador com Docker. A equipe acessa uma caixa de entrada compartilhada, identifica o atendente responsável e acompanha a fila em tempo real.",
    highlights: ["Caixa de entrada compartilhada", "Fila e atendimentos em tempo real", "Roda localmente com Docker"],
    tech: ["Node.js", "TypeScript", "JavaScript", "PostgreSQL", "Docker"],
    status: "Em desenvolvimento",
    icon: HiOutlineChatBubbleLeftRight,
  },
];
