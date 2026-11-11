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
    chips: ['What is he working on now?', 'Which technologies does he use?', 'How can I contact him?'],
    photoAlt: 'Portrait of Jaume Cortés',
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
      name: 'Elecnor',
      period: '2026',
      description:
        'Global AI agent platform deployed in the United States and Spain to automate business workflows.',
      tags: ['AI agents', 'Google Cloud Vertex AI'],
    },
    {
      name: 'Vestor',
      period: '2025 – Present',
      description: 'Portfolio tracking and financial planning platform. API consumption and web scraping.',
      tags: ['APIs', 'Web scraping'],
    },
    {
      name: 'Scalextric',
      period: '2023',
      description:
        'Real-time object detection on a physical track, mirrored live by a 3D render in the browser.',
      tags: ['Object detection', '3D render'],
    },
  ],
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
    cv: 'Download CV (PDF, in Spanish)',
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
