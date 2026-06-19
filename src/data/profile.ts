// src/data/profile.ts
// SINGLE SOURCE OF TRUTH for all personal content.
// Every value here is extracted from the CV at src/assets/cv/cv_en.pdf.
// Never hardcode personal data anywhere else in the codebase — import from here.

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
  impact: string;
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
  linkedin: '', // TODO: not present in CV — add full LinkedIn URL if available
  github: '', // TODO: not present in CV — add full GitHub URL if available
  tagline: 'I build AI-powered automation, integrations, and immersive software for production.',
  bio: {
    p1: "I'm a developer from Valencia, Spain. I came up through web and cross-platform application development, and rounded it out with formal study from microcomputer systems and networks all the way to computer engineering at Valencian International University.",
    p2: 'Today my focus is AI and automation. At Dare Planet Shuttle I design and ship AI-powered automations and integrations — wiring models into real business systems — alongside the software that surrounds them. I deepened the ML side through dedicated Machine Learning and Deep Learning training.',
    p3: 'I like problems that sit between disciplines: AI, the web, 3D, and immersive tech. I work best in small teams where I can own a problem end to end, from the first prototype to something running in production.',
  },
  availability: 'Open to new opportunities',
  languages: ['Spanish — Native', 'Catalan — Native', 'English — B2'],
  stats: [
    { label: 'Years building', value: '5+' },
    { label: 'Projects shipped', value: '6+' },
    { label: 'Technologies', value: '20+' },
  ],
};

export const projects: Project[] = [
  {
    slug: 'scalextric-ai-detection',
    title: 'Scalextric — AI Object Detection & 3D Web',
    description:
      'Real-time object detection on a Scalextric race track, paired with a 3D rendering of the cars and circuit running in the browser.',
    body: 'A project combining computer vision and the web: an AI model detects and tracks the cars on a physical Scalextric track in real time, while a 3D web rendering mirrors the action live in the browser. It brings together object detection, real-time data, and interactive 3D graphics in a single experience.',
    stack: ['Python', 'Object Detection', 'Machine Learning', 'Web 3D'],
    featured: true,
    metrics: '', // not present in CV
    year: '2023',
    github: '',
    demo: '',
    image: '', // styled placeholder rendered when empty
    order: 1,
  },
  {
    slug: 'automated-systems',
    title: 'Automated Systems & AI Integrations',
    description:
      'An ongoing body of work automating business processes and wiring AI models into existing software and tooling.',
    body: 'My current focus at Dare Planet Shuttle: building automated systems and processes, integrating AI models into existing products, and developing the software around them. The work spans connecting APIs, removing manual steps from day-to-day operations, and shipping integrations that hold up in production.',
    stack: ['Python', 'AI Automations', 'Integrations', 'APIs'],
    featured: true,
    metrics: '',
    year: '2024 – Present',
    github: '',
    demo: '',
    image: '',
    order: 2,
  },
  {
    slug: 'yara-vr-ar',
    title: 'Grupo Yara — VR & AR Apartment Visualization',
    description:
      'Virtual and augmented reality tools that let buyers walk through apartments before they are built.',
    body: 'For Grupo Yara Construcciones I built virtual and augmented reality features for visualizing apartments. Prospective buyers can explore spaces immersively — touring layouts and finishes ahead of construction — turning architectural plans into something you can actually walk through.',
    stack: ['C#', 'VR', 'AR', 'Blender'],
    featured: false,
    metrics: '',
    year: '2024',
    github: '',
    demo: '',
    image: '',
    order: 3,
  },
  {
    slug: 'bosch-repair-app',
    title: 'Bosch — Technical Repair Service App',
    description:
      'A mobile application supporting the workflow of Bosch’s technical repair service.',
    body: 'A mobile application built to support Bosch’s technical repair service. It streamlines the repair workflow for technicians, bringing the steps of a service job into a single, focused mobile experience.',
    stack: ['Kotlin', 'Mobile', 'REST APIs'],
    featured: false,
    metrics: '',
    year: '2022',
    github: '',
    demo: '',
    image: '',
    order: 4,
  },
  {
    slug: 'itaca-sabien-web',
    title: 'ITACA-SABIEN — Health Tech Web App',
    description:
      'A company web application built within a research group working on health and well-being technologies.',
    body: 'Developed within the ITACA-SABIEN research group, which focuses on health and well-being technologies. The project was a company web application — my early hands-on work building real, full-stack software in a research-driven environment.',
    stack: ['JavaScript', 'Vue.js', 'Node.js', 'PostgreSQL'],
    featured: false,
    metrics: '',
    year: '2020',
    github: '',
    demo: '',
    image: '',
    order: 5,
  },
];

export const experience: Experience[] = [
  {
    company: 'Dare Planet Shuttle',
    role: 'Software Developer — AI Automations & Integrations',
    startDate: '2023',
    endDate: 'Present',
    current: true,
    description:
      'Building AI-powered automations and integrations that connect models to real business systems, plus the software that ships around them.',
    impact: '',
    stack: ['Python', 'AI Automations', 'Integrations', 'APIs'],
    order: 1,
  },
  {
    company: 'Dare Planet Technology',
    role: 'Software Developer',
    startDate: '2022',
    endDate: '2022',
    current: false,
    description: 'Full-stack software development across web and cross-platform projects.',
    impact: '',
    stack: ['JavaScript', 'Vue.js', 'Node.js'],
    order: 2,
  },
  {
    company: 'ITACA-SABIEN',
    role: 'Software Developer — Health & Well-being Technologies',
    startDate: '2020',
    endDate: '2020',
    current: false,
    description:
      'Built a company web application within a research group focused on health and well-being technologies.',
    impact: '',
    stack: ['JavaScript', 'PHP', 'PostgreSQL'],
    order: 3,
  },
];

export const education: Education[] = [
  { school: 'Valencian International University', field: 'Computer Engineering', year: '2025' },
  { school: 'Zero To Mastery Academy', field: 'Machine Learning & Deep Learning', year: '2025' },
  { school: 'IES La Sènia', field: 'Cross-Platform Application Development', year: '2023' },
  { school: 'Grupo Studio Formación', field: 'Web Application Development', year: '2020' },
  { school: 'Centro de FP SOLVAM', field: 'Microcomputer Systems and Networks', year: '2018' },
];

// Tech stack grouped by category. Only technologies present in the CV are listed.
export const stack: Record<string, string[]> = {
  'AI / ML': ['Machine Learning', 'Deep Learning', 'Object Detection', 'AI Automations'],
  'Languages': ['Python', 'JavaScript', 'C#', 'Kotlin', 'PHP'],
  'Frameworks': ['Vue.js', 'Node.js', 'React', 'Symfony', 'SASS'],
  'Data & Infra': ['Docker', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'PowerBI'],
  'Tools & 3D': ['Git', 'GitHub', 'Postman', 'Figma', 'Blender'],
};
