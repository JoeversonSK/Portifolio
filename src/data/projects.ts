import { Project } from '../types';

export const projects: Project[] = [
  {
    title: "Cidade Online | Gestão Urbana Inteligente",
    desc: "O Cidade Online é uma plataforma que transforma a governança municipal através da tecnologia. O projeto elimina a burocracia e a desconexão entre o cidadão e a prefeitura, oferecendo uma solução completa para o registro de demandas urbanas, acompanhamento de obras públicas e participação democrática via votações oficiais.",
    tech: ["React/Native", "Node.js", "PostgreSQL","Expo", "Docker"],
    status: "In Development"
  },
  {
    title: "Atende",
    desc: "Central de atendimento multiusuário para WhatsApp, executada no seu próprio computador com Docker. A equipe acessa uma caixa de entrada compartilhada, identifica o atendente responsável e acompanha a fila e os atendimentos em tempo real.",
    tech: ["PostgreSQL", "Docker", "Node.js", "Typescript", "Javascript"],
    status: "In Development"
  }
];