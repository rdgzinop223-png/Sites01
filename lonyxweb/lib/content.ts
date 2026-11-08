export const navigation = [
  ['inicio', 'Início'],
  ['servicos', 'Serviços'],
  ['projetos', 'Projetos'],
  ['planos', 'Planos'],
  ['sobre', 'Sobre'],
] as const;
export const services = [
  {
    title: 'Criação de Sites',
    description: 'Uma presença à altura da sua marca.',
    icon: 'monitor',
    items: [
      'Sites institucionais',
      'Landing pages',
      'Sites cinematográficos',
      'Portfólios profissionais',
      'Sites personalizados',
    ],
  },
  {
    title: 'Desenvolvimento de Aplicativos',
    description: 'Ideias complexas. Experiências intuitivas.',
    icon: 'phone',
    items: [
      'Aplicativos web',
      'Plataformas SaaS',
      'Dashboards',
      'Sistemas administrativos',
      'Soluções sob medida',
    ],
  },
  {
    title: 'Manutenção Digital',
    description: 'Seu projeto evolui com o seu negócio.',
    icon: 'wrench',
    items: ['Atualizações', 'Monitoramento', 'Correções', 'Otimizações', 'Suporte técnico'],
  },
];
export const plans: {
  name: string;
  description: string;
  price: string | null;
  featured?: boolean;
  features: string[];
  cta: string;
}[] = [
  {
    name: 'Iniciante',
    description: 'O essencial para manter tudo em movimento.',
    price: null,
    features: ['Suporte básico', 'Atualizações periódicas', 'Monitoramento', 'Correções simples'],
    cta: 'Escolher Iniciante',
  },
  {
    name: 'Avançado',
    description: 'Mais atenção à evolução do seu projeto.',
    price: null,
    featured: true,
    features: [
      'Todos os recursos do Iniciante',
      'Suporte prioritário',
      'Otimização de desempenho',
      'Relatórios de manutenção',
      'Acompanhamento técnico',
    ],
    cta: 'Escolher Avançado',
  },
  {
    name: 'Empresarial',
    description: 'Cuidado personalizado para operações complexas.',
    price: null,
    features: [
      'Todos os recursos do Avançado',
      'Atendimento especializado',
      'Melhorias contínuas conforme contrato',
      'Acompanhamento estratégico',
      'Soluções personalizadas',
    ],
    cta: 'Consultar Empresarial',
  },
];
export const projects = [
  {
    id: 'veloce',
    name: 'Veloce Motors',
    category: 'Websites',
    tag: 'Automotive experience',
    description:
      'Um estudo de presença digital para o universo automotivo, com narrativa visual e exploração de veículos.',
    image: '/images/project-veloce.svg',
    tech: ['Next.js', 'GSAP', 'TypeScript'],
  },
  {
    id: 'orbit',
    name: 'Orbit Workspace',
    category: 'Aplicativos',
    tag: 'Productivity, reimagined',
    description:
      'Conceito de aplicativo para organizar projetos, conectar tarefas e acompanhar o trabalho em uma interface clara.',
    image: '/images/project-orbit.svg',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'nexus',
    name: 'Nexus Analytics',
    category: 'Sistemas',
    tag: 'Clarity in every decision',
    description:
      'Estudo de dashboard administrativo com visualização de dados ilustrativos e navegação modular.',
    image: '/images/project-nexus.svg',
    tech: ['React', 'TypeScript', 'CSS'],
  },
];
export const steps = [
  [
    'Descoberta',
    'Antes de criar, entender.',
    'Conversamos sobre sua ideia, seu público e o que o projeto precisa resolver.',
  ],
  [
    'Planejamento',
    'Uma direção bem definida.',
    'Organizamos escopo, estrutura e prioridades para construir com clareza.',
  ],
  [
    'Design',
    'Forma encontra propósito.',
    'Transformamos a estratégia em uma experiência visual com identidade própria.',
  ],
  [
    'Desenvolvimento',
    'Cada detalhe ganha vida.',
    'Implementamos a interface, as funcionalidades e os testes do projeto.',
  ],
  [
    'Entrega',
    'O começo de uma nova fase.',
    'Preparamos a publicação e alinhamos o acompanhamento e os próximos passos.',
  ],
];
