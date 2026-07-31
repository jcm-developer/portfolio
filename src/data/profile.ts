// src/data/profile.ts
// SINGLE SOURCE OF TRUTH for all personal content.
// Every value here is extracted from the CV at src/assets/cv/cv_en.pdf.
// Never hardcode personal data anywhere else in the codebase: import from here.

export interface Stat {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  tagline: string;
  subline: string; // one-line hero subtitle, shown under the tagline
  bio: {
    p1: string;
    p2: string;
    p3: string;
  };
  availability: string;
  languages: string[];
  stats: Stat[];
}

export interface Project {
  slug: string;
  title: string;
  type: 'company' | 'personal';
  description: string;
  body: string;
  stack: string[];
  featured: boolean;
  metrics: string;
  year: string;
  github: string;
  demo: string;
  image: string;
  order: number;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[]; // achievement bullets, rendered under the description
  impact: string;
  stack: string[];
  order: number;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl: string; // empty when there is no public credential link
  stack: string[];
  order: number;
}

export interface Education {
  school: string;
  field: string;
  year: string;
}

export const profile: Profile = {
  name: 'Jaume Cortés',
  role: 'AI Engineer',
  location: 'Valencia, Spain',
  email: 'jaumecortesmonzon@gmail.com',
  phone: '+34 615 163 612',
  linkedin: 'https://www.linkedin.com/in/jaume-cortes-monzon-developer/',
  github: 'https://github.com/jcm-developer',
  tagline: 'I build AI agents and end-to-end software, tailored to each client.',
  subline: 'I take AI from prototype to production: agents, automations, and the software that holds them together.',
  bio: {
    p1: 'AI Engineer specialized in designing and shipping AI agents and automated systems that solve real business problems.',
    p2: 'Currently at CodeGenia, I translate client needs into tailored technical solutions: conversational and task-based agents on Google Cloud Vertex AI, integrations between APIs and models, and the end-to-end software around them, from architecture to the frontend in React, Vue.js, and Node.js.',
    p3: 'I have built the AI agents layer of Elecnor’s global platform, working with their teams in the United States and Spain. Other work has taken me from convolutional neural network (CNN) detection for Scalextric to AR/VR visualization for Grupo Yara Construcciones and mobile software for Bosch.',
  },
  availability: 'Open to the right opportunity',
  languages: ['Spanish (Native)', 'Catalan (Native)', 'English (B2)'],
  stats: [
    { label: 'Years building', value: '3+' },
    { label: 'Projects shipped', value: '6+' },
    { label: 'Technologies', value: '20+' },
  ],
};

export const projects: Project[] = [
  {
    slug: "elecnor-intelligence-now-platform",
    title: "Elecnor · Intelligence Now Global Platform",
    type: "company",
    description:
      "A global enterprise platform for Elecnor powered by AI agents built on Google Cloud Vertex AI, built alongside their teams in the United States and Spain.",
    body: "Elecnor is a leading multinational infrastructure and energy company with operations across the Americas and Europe. I contributed to the development of their global Intelligence Now platform, focusing on the AI agents layer built on Google Cloud Vertex AI, and worked directly with their teams in the United States and Spain. The work involved designing and integrating conversational and task-based agents that automate business workflows, surface insights from internal data, and support decision-making at scale across both regions.",
    stack: ["Google Cloud", "Vertex AI", "AI Agents", "Python"],
    featured: true,
    metrics: "",
    year: "2026 – Present",
    github: "",
    demo: "",
    image: "/elecnor.png",
    order: 1,
  },
  {
    slug: "vestor",
    title: "Vestor · Portfolio & Financial Planning",
    type: "personal",
    description:
      "Modern portfolio tracking and financial planning platform built for long-term investors.",
    body: "Vestor is a personal project I built from scratch: a modern platform for tracking investment portfolios and planning long-term financial goals. It handles real portfolio data with a clean, focused interface designed for investors who think in years, not minutes. Built with React on the frontend and Convex for the real-time database and authentication layer.",
    stack: ["React", "Convex", "TypeScript"],
    featured: true,
    metrics: "",
    year: "2025",
    github: "https://github.com/jcm-developer/vestor-max",
    demo: "",
    image: "/vestor.png",
    order: 2,
  },
  {
    slug: "scalextric-ai-detection",
    title: "Scalextric · AI Object Detection & 3D Web",
    type: "company",
    description:
      "Real-time object detection on a Scalextric race track, paired with a 3D rendering of the cars and circuit running in the browser.",
    body: "A project combining computer vision and the web: an AI model detects and tracks the cars on a physical Scalextric track in real time, while a 3D web rendering mirrors the action live in the browser. It brings together object detection, real-time data, and interactive 3D graphics in a single experience.",
    stack: ["Python", "Object Detection", "Machine Learning", "Web 3D"],
    featured: true,
    metrics: "",
    year: "2023",
    github: "",
    demo: "",
    image: "/scalextric.png",
    order: 3,
  },
  {
    slug: "automated-systems",
    title: "Automated Systems & AI Integrations",
    type: "company",
    description:
      "An ongoing body of work automating business processes and wiring AI models into existing software and tooling.",
    body: "My current focus at CodeGenia: building automated systems and processes, integrating AI models into existing products, and developing the software around them. The work spans connecting APIs, removing manual steps from day-to-day operations, and shipping integrations that hold up in production.",
    stack: ["Python", "AI Automations", "Integrations", "APIs"],
    featured: true,
    metrics: "",
    year: "2024 – Present",
    github: "",
    demo: "",
    image: "/automation.png",
    order: 4,
  },
  {
    slug: "yara-vr-ar",
    title: "Grupo Yara · VR & AR Apartment Visualization",
    type: "company",
    description:
      "Virtual and augmented reality tools that let buyers walk through apartments before they are built.",
    body: "For Grupo Yara Construcciones I built virtual and augmented reality features for visualizing apartments. Prospective buyers can explore spaces immersively (touring layouts and finishes ahead of construction), turning architectural plans into something you can actually walk through.",
    stack: ["C#", "VR", "AR", "Blender"],
    featured: false,
    metrics: "",
    year: "2024",
    github: "",
    demo: "",
    image: "/yara.png",
    order: 5,
  },
  {
    slug: "bosch-repair-app",
    title: "Bosch · Technical Repair Service App",
    type: "company",
    description:
      "A mobile application supporting the workflow of Bosch’s technical repair service.",
    body: "A mobile application built to support Bosch’s technical repair service. It streamlines the repair workflow for technicians, bringing the steps of a service job into a single, focused mobile experience.",
    stack: ["Kotlin", "Mobile", "REST APIs"],
    featured: false,
    metrics: "",
    year: "2022",
    github: "",
    demo: "",
    image: "/bosch.png",
    order: 6,
  },
  {
    slug: "itaca-sabien-web",
    title: "ITACA-SABIEN · Health Tech Web App",
    type: "company",
    description:
      "A company web application built within a research group working on health and well-being technologies.",
    body: "Developed within the ITACA-SABIEN research group, which focuses on health and well-being technologies. The project was a company web application: my early hands-on work building real, full-stack software in a research-driven environment.",
    stack: ["JavaScript", "Vue.js", "Node.js", "PostgreSQL"],
    featured: false,
    metrics: "",
    year: "2020",
    github: "",
    demo: "",
    image: "/itaca-sabien.png",
    order: 7,
  },
];

export const experience: Experience[] = [
  {
    company: 'CodeGenia',
    role: 'AI Engineer',
    startDate: '2023',
    endDate: 'Present',
    current: true,
    description:
      'CodeGenia builds tailored AI and software solutions for its clients. As an AI Engineer I bridge client needs and technical delivery: designing AI agents on Google Cloud Vertex AI, automating business processes, and leading the end-to-end development of multiplatform applications.',
    highlights: [
      'Built the AI agents layer of Elecnor’s global Intelligence Now platform on Google Cloud Vertex AI, working directly with their teams in the United States and Spain.',
      'Designed conversational and task-based agents that automate business workflows and surface insights from internal data to support decision-making at scale.',
      'Built automated systems and integrations that wire AI models and APIs into existing products, removing manual steps from day-to-day operations.',
      'Trained and deployed a real-time object detection model for Scalextric, mirrored live by a 3D rendering of the track in the browser.',
      'Developed VR and AR apartment visualization for Grupo Yara Construcciones, letting buyers tour layouts and finishes before construction.',
    ],
    impact: '',
    stack: [
      'Python',
      'Google Cloud',
      'Vertex AI',
      'AI Agents',
      'Machine Learning',
      'Object Detection',
      'AI Automations',
      'APIs',
      'React',
      'Node.js',
      'C#',
    ],
    order: 1,
  },
  {
    company: 'Dare Planet Technology',
    role: 'Software Developer',
    startDate: '2022',
    endDate: '2022',
    current: false,
    description:
      'Dare Planet Technology is a software studio delivering web and cross-platform products for client companies. I worked across the full stack, taking features from the data model up to the interface: web UIs, services in Node.js, and native mobile screens for client projects.',
    highlights: [
      'Developed the technical repair service mobile app for Bosch in Kotlin, bringing the steps of a service job into a single focused workflow for field technicians.',
      'Built and maintained full-stack features across web and cross-platform projects, working directly against client requirements.',
    ],
    impact: '',
    stack: ['JavaScript', 'Vue.js', 'Node.js', 'Kotlin', 'REST APIs'],
    order: 2,
  },
  {
    company: 'ITACA-SABIEN',
    role: 'Software Developer',
    startDate: '2020',
    endDate: '2020',
    current: false,
    description:
      'ITACA-SABIEN is a research group working on health and well-being technologies. I built a company web application end to end in a research-driven environment: my first professional experience shipping real full-stack software, from the data model up to the interface.',
    highlights: [
      'Developed a company web application covering database, backend and interface.',
      'Worked inside a research team, turning requirements from a non-software domain into a working product.',
    ],
    impact: '',
    stack: ['JavaScript', 'PHP', 'PostgreSQL'],
    order: 3,
  },
];

export const certifications: Certification[] = [
  {
    name: 'Google AI',
    issuer: 'Google',
    year: '2026',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/9XS1I3K8D98L',
    stack: ['Generative AI', 'Machine Learning', 'Prompt Engineering'],
    order: 1,
  },
  {
    name: 'Claude 101',
    issuer: 'Anthropic',
    year: '2026',
    credentialUrl: 'https://verify.skilljar.com/c/oy3bq6i4riau',
    stack: ['Claude', 'LLMs', 'Prompt Engineering'],
    order: 2,
  },
  {
    name: 'Machine Learning & Deep Learning',
    issuer: 'Zero To Mastery Academy',
    year: '2025',
    credentialUrl: 'https://www.udemy.com/certificate/UC-a1a2a7e4-0149-474a-88db-f7ae7617f30a/',
    stack: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow'],
    order: 3,
  },
  {
    name: 'AI for Content Creation',
    issuer: 'Google',
    year: '2026',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/MUSRDYCVBI5V',
    stack: ['Generative AI', 'Content Creation', 'Prompt Engineering'],
    order: 4,
  },
  {
    name: 'AI for Data Analysis',
    issuer: 'Google',
    year: '2026',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/H1DUAVZ9I3ML',
    stack: ['Generative AI', 'Data Analysis', 'Prompt Engineering'],
    order: 5,
  },
  {
    name: 'AI for App Building',
    issuer: 'Google',
    year: '2026',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/6AYAHK62N507',
    stack: ['Generative AI', 'App Building', 'Prompt Engineering'],
    order: 6,
  },
  {
    name: 'AI for Writing and Communicating',
    issuer: 'Google',
    year: '2026',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/ZOAHOPT3GBZR',
    stack: ['Generative AI', 'Writing', 'Communication'],
    order: 7,
  },
  {
    name: 'AI for Research and Insights',
    issuer: 'Google',
    year: '2026',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/YXEPFNFO03A0',
    stack: ['Generative AI', 'Research', 'Prompt Engineering'],
    order: 8,
  },
  {
    name: 'AI for Brainstorming and Planning',
    issuer: 'Google',
    year: '2026',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/0ROW74MEWVJU',
    stack: ['Generative AI', 'Brainstorming', 'Planning'],
    order: 9,
  },
  {
    name: 'AI Fundamentals',
    issuer: 'Google',
    year: '2026',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/AVBND0P6UGWU',
    stack: ['Generative AI', 'AI Fundamentals', 'Prompt Engineering'],
    order: 10,
  },
  {
    name: 'Building with the Claude API',
    issuer: 'Anthropic',
    year: '2026',
    credentialUrl: 'https://verify.skilljar.com/c/z7tacg5vi9mh',
    stack: ['Claude API', 'LLMs', 'Python'],
    order: 11,
  },
  {
    name: 'Claude Code in Action',
    issuer: 'Anthropic',
    year: '2026',
    credentialUrl: 'https://verify.skilljar.com/c/qgj5eyfg83xo',
    stack: ['Claude Code', 'AI Agents', 'Developer Tools'],
    order: 12,
  },
  {
    name: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    year: '2026',
    credentialUrl: 'https://verify.skilljar.com/c/hd359tt7mt6y',
    stack: ['MCP', 'LLMs', 'Integrations'],
    order: 13,
  },
  {
    name: 'Model Context Protocol: Advanced Topics',
    issuer: 'Anthropic',
    year: '2026',
    credentialUrl: 'https://verify.skilljar.com/c/3i9ttdxjvbpe',
    stack: ['MCP', 'Tool Use', 'Integrations'],
    order: 14,
  },
];

export const education: Education[] = [
  { school: 'Valencian International University', field: 'Computer Engineering', year: '2025' },
  { school: 'Zero To Mastery Academy', field: 'Machine Learning & Deep Learning', year: '2025' },
  { school: 'IES La Sènia', field: 'Cross-Platform Application Development', year: '2023' },
  { school: 'Grupo Studio Formación', field: 'Web Application Development', year: '2020' },
  { school: 'Centro de FP SOLVAM', field: 'Microcomputer Systems and Networks', year: '2018' },
];

// Tech stack grouped by category. Every entry must be backed by a project,
// an experience entry, or a certification listed above — this list is what the
// chatbot answers "what does he work with?" from.
export const stack: Record<string, string[]> = {
  'AI / ML': [
    'AI Agents',
    'Machine Learning',
    'Deep Learning',
    'Object Detection',
    'AI Automations',
    'LLMs',
    'MCP',
  ],
  'Languages': ['Python', 'TypeScript', 'JavaScript', 'C#', 'Kotlin', 'PHP'],
  'Frameworks': ['React', 'Vue.js', 'Node.js', 'Convex', 'Symfony', 'SASS'],
  'Data & Infra': [
    'Google Cloud',
    'Vertex AI',
    'Docker',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Firebase',
    'PowerBI',
  ],
  'Tools & 3D': ['Git', 'GitHub', 'Postman', 'Figma', 'Blender'],
};
