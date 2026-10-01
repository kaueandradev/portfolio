// Todo o conteúdo do site mora aqui. Edite este arquivo para atualizar o portfólio.
// Fontes: GitHub (kaueandradev) e as competências da Comtele informadas por você.

export const profile = {
  name: "Kauê Andrade",
  handle: "kaueandradev",
  github: "https://github.com/kaueandradev",
  linkedin: "https://www.linkedin.com/in/kaue-andradev/",
  // E-mail exibido no rodapé com botão de copiar (vazio esconde).
  email: "kauex3956@gmail.com",
};

export const experience = [
  {
    id: "comtele",
    title: "Comtele",
    sub: "Analista DevOps",
    badge: "Atual",
    live: true,
    start: "2025-06-21",
    end: null,
    logo: "assets/comtele.png",
    logoScale: 1.6,
    desc:
      "Suporte aos clientes no uso das APIs da Comtele, com esclarecimento de dúvidas técnicas. " +
      "Configuração e manutenção das conexões SMPP com as operadoras e criação de conexões SMPP entre os clientes e a Comtele, " +
      "garantindo uma integração eficiente. Gestão da infraestrutura de TI para manter os sistemas estáveis e confiáveis.",
    skills: ["Servidores", "Linux", "Redes TCP/IP", "SMPP", "Azure", "Cloudflare", "SQL Server", "MongoDB", "C#", ".NET", "Docker", "Git", "Kanban"],
  },
  {
    id: "ads",
    title: "Análise e Desenvolvimento de Sistemas",
    sub: "Graduação na UNIP",
    org: "UNIP",
    badge: "Em andamento",
    start: "2026-01-01",
    end: "2027-12-31",
    logo: "assets/unip.png",
    logoScale: 1.05,
    desc: "Formação em lógica de programação, banco de dados e desenvolvimento de software.",
    skills: ["C", "Python", "JavaScript"],
  },
];

const svg = {
  server:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><rect x="7" y="7" width="34" height="14" rx="4"/><rect x="7" y="27" width="34" height="14" rx="4"/><path d="M14 14h.01M14 34h.01M22 14h12M22 34h12" stroke-width="3.6"/></svg>',
  network:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="10" r="5"/><circle cx="10" cy="38" r="5"/><circle cx="38" cy="38" r="5"/><path d="M21.5 14.5 12.5 33.5M26.5 14.5l9 19M15 38h18"/></svg>',
  smpp:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H20l-8 7v-7a4 4 0 0 1-4-4z"/><path d="M16 20h.01M24 20h.01M32 20h.01" stroke-width="4"/></svg>',
  kanban:
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><rect x="6" y="7" width="36" height="34" rx="5"/><path d="M18 7v34M30 7v34"/><path d="M10.5 14h3.5M10.5 20h3.5M22.5 14h3.5M34.5 14h3.5M34.5 20h3.5M34.5 26h3.5" stroke-width="3.6"/></svg>',
};

export const categories = [
  { id: "todas", label: "Todas" },
  { id: "infra", label: "Infra e redes" },
  { id: "cloud", label: "Cloud" },
  { id: "dados", label: "Dados" },
  { id: "codigo", label: "Código" },
  { id: "devops", label: "DevOps" },
];

// c: cor de destaque do cartão (brilho e ícones desenhados).
export const stack = [
  { name: "Linux", cat: "infra", icon: "assets/icons/linux-original.svg", c: "#f5c542" },
  { name: "Servidores", cat: "infra", svg: svg.server, c: "#9fe6ff" },
  { name: "Redes TCP/IP", cat: "infra", svg: svg.network, c: "#5eead4" },
  { name: "SMPP", cat: "infra", svg: svg.smpp, c: "#4be3a5" },
  { name: "Azure", cat: "cloud", icon: "assets/icons/azure-original.svg", c: "#3b9bff" },
  { name: "Cloudflare", cat: "cloud", icon: "assets/icons/cloudflare-original.svg", c: "#f6821f" },
  { name: "SQL Server", cat: "dados", icon: "assets/icons/microsoftsqlserver-original.svg", c: "#e2504a" },
  { name: "MongoDB", cat: "dados", icon: "assets/icons/mongodb-original.svg", c: "#47a248" },
  { name: "C#", cat: "codigo", icon: "assets/icons/csharp-original.svg", c: "#a76bd6" },
  { name: ".NET", cat: "codigo", icon: "assets/icons/dotnetcore-original.svg", c: "#7c5cff" },
  { name: "Python", cat: "codigo", icon: "assets/icons/python-original.svg", c: "#4b8bbe" },
  { name: "JavaScript", cat: "codigo", icon: "assets/icons/javascript-original.svg", c: "#f0db4f" },
  { name: "Docker", cat: "devops", icon: "assets/icons/docker-original.svg", c: "#2496ed" },
  { name: "Git", cat: "devops", icon: "assets/icons/git-original.svg", c: "#f05032" },
  { name: "GitHub", cat: "devops", icon: "assets/icons/github-original.svg", c: "#c9d1ff" },
  { name: "Kanban", cat: "devops", svg: svg.kanban, c: "#fbbf24" },
];

// Ícones de tecnologias que aparecem na experiência mas não na grade de Tecnologias.
export const extraIcons = {
  C: "assets/icons/c-original.svg",
};
