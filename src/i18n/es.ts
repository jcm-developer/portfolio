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
    cv: 'Descargar CV (PDF)',
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
      slug: 'elecnor',
      name: 'Elecnor · Plataforma global',
      period: '2026',
      description:
        'Una plataforma corporativa global para Elecnor impulsada por agentes de IA sobre Google Cloud Vertex AI, construida junto a sus equipos de Estados Unidos y España.',
      body: 'Elecnor es una multinacional líder en infraestructuras y energía con operaciones en América y Europa. He contribuido al desarrollo de su plataforma global, centrándome en la capa de agentes de IA construida sobre Google Cloud Vertex AI, y trabajando directamente con sus equipos de Estados Unidos y España. El trabajo incluyó diseñar e integrar agentes conversacionales y de tarea que automatizan flujos de negocio, extraen información de los datos internos y apoyan la toma de decisiones a escala en ambas regiones.',
      tags: ['Google Cloud', 'Vertex AI', 'AI Agents', 'Python'],
    },
    {
      slug: 'vestor',
      name: 'Vestor · Gestión de carteras y planificación financiera',
      period: '2025 – Actualidad',
      description:
        'Plataforma moderna de seguimiento de carteras y planificación financiera, pensada para inversores a largo plazo.',
      body: 'Vestor es un proyecto personal que construí desde cero: una plataforma moderna para seguir carteras de inversión y planificar objetivos financieros a largo plazo. Maneja datos reales de cartera con una interfaz limpia y enfocada, diseñada para inversores que piensan en años, no en minutos. Construida con React en el frontend y Convex como capa de base de datos en tiempo real y autenticación.',
      tags: ['React', 'Convex', 'TypeScript'],
    },
    {
      slug: 'scalextric',
      name: 'Scalextric · Detección de objetos con IA y web 3D',
      period: '2023',
      description:
        'Detección de objetos en tiempo real sobre un circuito de Scalextric, junto a una representación 3D de los coches y el circuito ejecutándose en el navegador.',
      body: 'Un proyecto que combina visión por computador y la web: un modelo de IA detecta y rastrea los coches en un circuito físico de Scalextric en tiempo real, mientras una representación 3D en la web refleja la acción en vivo en el navegador. Reúne detección de objetos, datos en tiempo real y gráficos 3D interactivos en una sola experiencia.',
      tags: ['Python', 'Object Detection', 'Machine Learning', 'Web 3D'],
    },
    {
      slug: 'automation',
      name: 'Sistemas automatizados e integraciones de IA',
      period: '2024 – Actualidad',
      description:
        'Un cuerpo de trabajo continuo automatizando procesos de negocio y conectando modelos de IA con software y herramientas existentes.',
      body: 'Mi foco actual en CodeGenia: construir sistemas y procesos automatizados, integrar modelos de IA en productos existentes y desarrollar el software a su alrededor. El trabajo abarca conectar APIs, eliminar pasos manuales de las operaciones del día a día y entregar integraciones que aguantan en producción.',
      tags: ['Python', 'AI Automations', 'Integrations', 'APIs'],
    },
    {
      slug: 'yara',
      name: 'Grupo Yara · Visualización de pisos en RV y RA',
      period: '2024',
      description:
        'Herramientas de realidad virtual y aumentada que permiten a los compradores recorrer pisos antes de que estén construidos.',
      body: 'Para Grupo Yara Construcciones desarrollé funcionalidades de realidad virtual y aumentada para visualizar pisos. Los posibles compradores pueden explorar los espacios de forma inmersiva (recorriendo distribuciones y acabados antes de la construcción), convirtiendo los planos arquitectónicos en algo por lo que puedes caminar de verdad.',
      tags: ['C#', 'VR', 'AR', 'Blender'],
    },
    {
      slug: 'bosch',
      name: 'Bosch · App del servicio técnico de reparaciones',
      period: '2022',
      description:
        'Una aplicación móvil que da soporte al flujo de trabajo del servicio técnico de reparaciones de Bosch.',
      body: 'Una aplicación móvil creada para dar soporte al servicio técnico de reparaciones de Bosch. Agiliza el flujo de trabajo de reparación para los técnicos, reuniendo los pasos de un servicio en una experiencia móvil única y enfocada.',
      tags: ['Kotlin', 'Mobile', 'REST APIs'],
    },
    {
      slug: 'itaca-sabien',
      name: 'ITACA-SABIEN · App web de tecnología sanitaria',
      period: '2020',
      description:
        'Una aplicación web corporativa desarrollada dentro de un grupo de investigación centrado en tecnologías para la salud y el bienestar.',
      body: 'Desarrollada dentro del grupo de investigación ITACA-SABIEN, centrado en tecnologías para la salud y el bienestar. El proyecto fue una aplicación web corporativa: mi primer trabajo práctico construyendo software real de pila completa en un entorno orientado a la investigación.',
      tags: ['JavaScript', 'Vue.js', 'Node.js', 'PostgreSQL'],
    },
  ],
  projectsUi: { more: 'Más sobre este proyecto', visit: 'Ver el proyecto' },
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
