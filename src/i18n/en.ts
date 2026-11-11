import type { Dictionary } from './index';

/** English copy. A translation of the Spanish CV; it also feeds the assistant's system prompt. */
export const en: Dictionary = {
  meta: {
    title: 'Jaume Cortés · AI Engineer',
    description:
      'AI Engineer based in Valencia. Conversational and task agents on Google Cloud Vertex AI, integrations between APIs and models, and the software around them.',
  },
  role: 'AI Engineer',
  location: 'Valencia, Spain',
  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    education: 'Education',
    contact: 'Contact',
    skipToContent: 'Skip to content',
    switchLanguage: 'Leer esta página en español',
    menu: 'Sections',
  },
  hero: {
    lead: 'I turn client needs into AI agents and the software around them, end to end.',
    askLabel: 'Ask my assistant',
    askPlaceholder: 'What is he working on right now?',
    askSubmit: 'Ask',
  },
  about: {
    body: 'I currently turn client needs into tailored technical solutions: conversational and task agents on Google Cloud Vertex AI, integrations between APIs and models, and the software around them end to end, from the architecture to the frontend in React, Vue.js, Node.js and other technologies.',
  },
  experience: [
    {
      role: 'AI Engineer',
      company: 'CodeGenia',
      period: '2023 – Present',
      bullets: [
        'AI agents for Elecnor on Google Cloud Vertex AI, working with their teams in the United States and Spain.',
        'Conversational agents that automate business workflows and extract information from internal data.',
        'Integrations that connect AI models to existing products, removing manual steps.',
      ],
    },
    {
      role: 'Software Developer',
      company: 'Dare Planet Technology',
      period: '2022',
      bullets: [
        "Mobile app for Bosch's technical service, with a unified service flow for field technicians.",
        'Full-stack features in web and cross-platform projects for clients.',
      ],
    },
    {
      role: 'Software Developer',
      company: 'ITACA-SABIEN',
      period: '2020',
      bullets: ['Corporate web application from start to finish: database, backend and interface.'],
    },
  ],
  projects: [
    {
      slug: 'elecnor',
      name: 'Elecnor · Global Platform',
      period: '2026',
      description:
        'A global enterprise platform for Elecnor powered by AI agents built on Google Cloud Vertex AI, built alongside their teams in the United States and Spain.',
      body: 'Elecnor is a leading multinational infrastructure and energy company with operations across the Americas and Europe. I contributed to the development of their global platform, focusing on the AI agents layer built on Google Cloud Vertex AI, and worked directly with their teams in the United States and Spain. The work involved designing and integrating conversational and task-based agents that automate business workflows, surface insights from internal data, and support decision-making at scale across both regions.',
      tags: ['Google Cloud', 'Vertex AI', 'AI Agents', 'Python'],
    },
    {
      slug: 'vestor',
      name: 'Vestor · Portfolio & Financial Planning',
      period: '2025 – Present',
      description:
        'Modern portfolio tracking and financial planning platform built for long-term investors.',
      body: 'Vestor is a personal project I built from scratch: a modern platform for tracking investment portfolios and planning long-term financial goals. It handles real portfolio data with a clean, focused interface designed for investors who think in years, not minutes. Built with React on the frontend and Convex for the real-time database and authentication layer.',
      tags: ['React', 'Convex', 'TypeScript'],
    },
    {
      slug: 'scalextric',
      name: 'Scalextric · AI Object Detection & 3D Web',
      period: '2023',
      description:
        'Real-time object detection on a Scalextric race track, paired with a 3D rendering of the cars and circuit running in the browser.',
      body: 'A project combining computer vision and the web: an AI model detects and tracks the cars on a physical Scalextric track in real time, while a 3D web rendering mirrors the action live in the browser. It brings together object detection, real-time data, and interactive 3D graphics in a single experience.',
      tags: ['Python', 'Object Detection', 'Machine Learning', 'Web 3D'],
    },
    {
      slug: 'automation',
      name: 'Automated Systems & AI Integrations',
      period: '2024 – Present',
      description:
        'An ongoing body of work automating business processes and wiring AI models into existing software and tooling.',
      body: 'My current focus at CodeGenia: building automated systems and processes, integrating AI models into existing products, and developing the software around them. The work spans connecting APIs, removing manual steps from day-to-day operations, and shipping integrations that hold up in production.',
      tags: ['Python', 'AI Automations', 'Integrations', 'APIs'],
    },
    {
      slug: 'yara',
      name: 'Grupo Yara · VR & AR Apartment Visualization',
      period: '2024',
      description:
        'Virtual and augmented reality tools that let buyers walk through apartments before they are built.',
      body: 'For Grupo Yara Construcciones I built virtual and augmented reality features for visualizing apartments. Prospective buyers can explore spaces immersively (touring layouts and finishes ahead of construction), turning architectural plans into something you can actually walk through.',
      tags: ['C#', 'VR', 'AR', 'Blender'],
    },
    {
      slug: 'bosch',
      name: 'Bosch · Technical Repair Service App',
      period: '2022',
      description:
        "A mobile application supporting the workflow of Bosch's technical repair service.",
      body: "A mobile application built to support Bosch's technical repair service. It streamlines the repair workflow for technicians, bringing the steps of a service job into a single, focused mobile experience.",
      tags: ['Kotlin', 'Mobile', 'REST APIs'],
    },
    {
      slug: 'itaca-sabien',
      name: 'ITACA-SABIEN · Health Tech Web App',
      period: '2020',
      description:
        'A company web application built within a research group working on health and well-being technologies.',
      body: 'Developed within the ITACA-SABIEN research group, which focuses on health and well-being technologies. The project was a company web application: my early hands-on work building real, full-stack software in a research-driven environment.',
      tags: ['JavaScript', 'Vue.js', 'Node.js', 'PostgreSQL'],
    },
  ],
  projectsUi: { more: 'More about this project', visit: 'Visit the project' },
  skills: [
    'Machine Learning & Deep Learning',
    'Process automation',
    'Google Cloud',
    'Git / GitHub / Docker',
    'Python',
    'React / Vue.js / Astro',
    'Node.js / Next.js / Nest',
    'PostgreSQL / MongoDB',
  ],
  education: {
    studies: [
      { title: 'BSc in Computer Engineering', school: 'Valencian International University (VIU)', year: '2026' },
      { title: 'Cross-platform application development', school: 'IES La Sènia', year: '2023' },
      { title: 'Web application development', school: 'Grupo Studio Formación', year: '2020' },
    ],
    languagesLabel: 'Languages',
    languages: ['Spanish and Catalan (native)', 'English (B2)'],
    certificationsLabel: 'Certifications',
    certificationsHint: 'Each one links to its credential.',
  },
  contact: {
    heading: 'Shall we talk?',
    lead: 'Email is the fastest way to reach me.',
    email: 'Email me',
    cv: 'Download CV (PDF)',
  },
  chat: {
    title: "Jaume's assistant",
    subtitle: 'Answers about his experience and projects',
    greeting:
      "Hi. Ask me about Jaume's experience, his projects or how to contact him, and I will take you to the part of the page that covers it.",
    placeholder: 'Type your question',
    send: 'Send',
    open: 'Open the assistant',
    close: 'Close the assistant',
    goingTo: 'Showing',
    wentThere: 'I took you to that section.',
    errorBusy: 'You sent several questions in a row. Wait a minute and try again.',
    errorOffline: 'No connection. Check your network and send the question again.',
    errorGeneric: 'The assistant is unavailable right now. Try again in a few minutes or email Jaume.',
    disclaimer: "AI-generated answers based on Jaume's CV.",
  },
  footer: { source: 'Source on GitHub' },
  notFound: {
    title: 'This page does not exist',
    body: 'The link is broken or the page has moved.',
    home: 'Go to the home page',
  },
};
