import type { Dictionary } from './index';

/** Spanish copy. The profile content follows the Spanish CV word for word where it can. */
export const es: Dictionary = {
  meta: {
    title: 'Jaume Cortés · Ingeniero de IA',
    description:
      'Ingeniero de IA en Valencia. Agentes conversacionales y de tarea sobre Google Cloud Vertex AI, integraciones entre APIs y modelos, y el software que los rodea.',
  },
  role: 'Ingeniero de IA',
  location: 'Valencia, España',
  nav: {
    about: 'Sobre mí',
    experience: 'Experiencia',
    projects: 'Proyectos',
    skills: 'Skills',
    education: 'Estudios',
    contact: 'Contacto',
    skipToContent: 'Saltar al contenido',
    switchLanguage: 'Read this page in English',
    menu: 'Secciones',
  },
  hero: {
    lead: 'Traduzco necesidades de cliente en agentes de IA y en el software que los rodea, de extremo a extremo.',
    askLabel: 'Pregunta a mi asistente',
    askPlaceholder: '¿En qué está trabajando ahora?',
    askSubmit: 'Preguntar',
    chips: ['¿En qué trabaja ahora?', '¿Qué tecnologías usa?', '¿Cómo puedo contactarle?'],
    photoAlt: 'Retrato de Jaume Cortés',
  },
  about: {
    body: 'Actualmente traduzco necesidades de cliente en soluciones técnicas a medida: agentes conversacionales y de tarea sobre Google Cloud Vertex AI, integraciones entre APIs y modelos, y el software que los rodea de extremo a extremo, desde la arquitectura hasta el frontend en React, Vue.js, Node.js y demás tecnologías.',
  },
  experience: [
    {
      role: 'Ingeniero de IA',
      company: 'CodeGenia',
      period: '2023 – Actualidad',
      bullets: [
        'Agentes de IA para Elecnor sobre Google Cloud Vertex AI, trabajando con sus equipos de Estados Unidos y España.',
        'Agentes conversacionales que automatizan flujos de negocio y extraen información de datos internos.',
        'Integraciones que conectan modelos de IA con productos existentes, eliminando pasos manuales.',
      ],
    },
    {
      role: 'Desarrollador de software',
      company: 'Dare Planet Technology',
      period: '2022',
      bullets: [
        'App móvil del servicio técnico de Bosch, con el flujo de servicio unificado para técnicos de campo.',
        'Funcionalidades full-stack en proyectos web y multiplataforma para clientes.',
      ],
    },
    {
      role: 'Desarrollador de software',
      company: 'ITACA-SABIEN',
      period: '2020',
      bullets: ['Aplicación web corporativa de principio a fin: base de datos, backend e interfaz.'],
    },
  ],
  projects: [
    {
      name: 'Elecnor',
      period: '2026',
      description:
        'Plataforma global de agentes de IA desplegada en Estados Unidos y España para automatizar flujos de negocio.',
      tags: ['Agentes de IA', 'Google Cloud Vertex AI'],
    },
    {
      name: 'Vestor',
      period: '2025 – Actualidad',
      description:
        'Plataforma de seguimiento de carteras y planificación financiera. Consumo de APIs y web scraping.',
      tags: ['APIs', 'Web scraping'],
    },
    {
      name: 'Scalextric',
      period: '2023',
      description:
        'Detección de objetos en tiempo real sobre un circuito físico, reflejada en vivo por un render 3D en el navegador.',
      tags: ['Detección de objetos', 'Render 3D'],
    },
  ],
  skills: [
    'Machine Learning & Deep Learning',
    'Automatización de procesos',
    'Google Cloud',
    'Git / GitHub / Docker',
    'Python',
    'React / Vue.js / Astro',
    'Node.js / Next.js / Nest',
    'PostgreSQL / MongoDB',
  ],
  education: {
    studies: [
      { title: 'Grado en Ingeniería Informática', school: 'Universidad Internacional de Valencia (VIU)', year: '2026' },
      { title: 'Desarrollo de aplicaciones multiplataforma', school: 'IES La Sènia', year: '2023' },
      { title: 'Desarrollo de aplicaciones web', school: 'Grupo Studio Formación', year: '2020' },
    ],
    languagesLabel: 'Idiomas',
    languages: ['Español y catalán (nativo)', 'Inglés (B2)'],
    certificationsLabel: 'Certificaciones',
    certificationsHint: 'Cada una enlaza a su credencial.',
  },
  contact: {
    heading: '¿Hablamos?',
    lead: 'La forma más rápida de llegar a mí es el correo.',
    email: 'Escríbeme',
    cv: 'Descargar CV (PDF)',
  },
  chat: {
    title: 'Asistente de Jaume',
    subtitle: 'Responde sobre su experiencia y proyectos',
    greeting:
      'Hola. Pregúntame por la experiencia de Jaume, sus proyectos o cómo contactarle, y te llevo a la parte de la página que lo cuenta.',
    placeholder: 'Escribe tu pregunta',
    send: 'Enviar',
    open: 'Abrir el asistente',
    close: 'Cerrar el asistente',
    goingTo: 'Mostrando',
    wentThere: 'Te he llevado a esa sección.',
    errorBusy: 'Has enviado muchas preguntas seguidas. Espera un minuto y vuelve a intentarlo.',
    errorOffline: 'No hay conexión. Comprueba tu red y vuelve a enviar la pregunta.',
    errorGeneric: 'El asistente no está disponible ahora mismo. Vuelve a intentarlo en unos minutos o escribe a Jaume por correo.',
    disclaimer: 'Respuestas generadas por IA a partir del CV de Jaume.',
  },
  footer: { source: 'Código en GitHub' },
  notFound: {
    title: 'Esta página no existe',
    body: 'El enlace está roto o la página se ha movido.',
    home: 'Ir al inicio',
  },
};
