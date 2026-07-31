// src/i18n/es.ts
// Spanish translations, mirroring the English source of truth in src/data/profile.ts.
// The English content stays in profile.ts (and is what the chatbot context uses);
// this file holds the Spanish counterpart for every translatable string.
//
// How it's wired: components render the English text as the element's content and
// stamp the Spanish text into a `data-es` attribute. The client i18n script
// (src/scripts/i18n.ts) swaps textContent ⇄ data-es when the language toggle flips.
//
// Language-neutral data (name, email, phone, dates, tech names, slugs, school names)
// is intentionally NOT translated.

export const es = {
  ui: {
    nav: {
      about: 'Sobre mí',
      projects: 'Proyectos',
      experience: 'Experiencia',
      certifications: 'Certificaciones',
      education: 'Formación',
      contact: 'Contacto',
    },
    hero: {
      viewProjects: 'Ver proyectos',
      downloadCv: 'Descargar CV',
      scroll: 'scroll',
    },
    aboutHeading: 'Sobre mí',
    projectsHeading: 'Trabajo seleccionado',
    experienceHeading: 'Experiencia',
    certificationsLabel: 'Certificaciones',
    certificationsLead: 'Todas mis certificaciones y formaciones. Haz clic en cualquiera para ver la credencial.',
    certificationsBack: '← Volver',
    educationLabel: 'Formación y aprendizaje',
    contact: {
      heading: 'Construyamos algo',
      lead: 'Abierto a roles de IA/ML y software, proyectos freelance y colaboraciones. La forma más rápida de contactarme es por email.',
      sendEmail: 'Enviar un email',
      copyEmail: 'Copiar email',
      copied: '¡Copiado!',
    },
    footer: {
      builtWith: 'Hecho con',
      and: 'y Astro',
      backToTop: 'Volver arriba ↑',
    },
    card: {
      viewDetails: 'Ver detalles →',
    },
    detail: {
      back: '← Volver al trabajo',
      nextProjectLabel: 'Siguiente proyecto',
      viewOnGithub: 'Ver en GitHub',
      liveDemo: 'Demo en vivo',
    },
    chatbot: {
      assistant: 'Asistente',
      title: 'Pregúntame lo que quieras',
      about: 'sobre Jaume Cortés',
      greeting:
        '¡Hola! Soy el asistente de Jaume. Pregúntame sobre sus proyectos, experiencia o stack, o si está disponible para trabajar.',
      placeholder: 'Escribe una pregunta…',
      chipStack: 'Tech Stack',
      chipAvailable: 'Disponibilidad',
      chipProjects: 'Sus proyectos',
      chipContact: 'Contacto',
    },
    langToggleToEs: 'Cambiar a español',
    langToggleToEn: 'Switch to English',
    themeToggleToLight: 'Activar modo claro',
    themeToggleToDark: 'Activar modo oscuro',
    present: 'Actualidad',
  },

  // --- Profile content ---
  role: 'Ingeniero de IA',
  location: 'Valencia, España',
  tagline: 'Construyo agentes de IA y software de principio a fin, a medida de cada cliente.',
  // One-line hero subtitle (mirrors profile.subline).
  subline: 'Llevo la IA del prototipo a producción: agentes, automatizaciones y el software que los sostiene.',
  availability: 'Abierto a la oportunidad adecuada',
  bio: {
    p1: 'Ingeniero de IA especializado en diseñar y poner en producción agentes de IA y sistemas automatizados que resuelven problemas reales de negocio.',
    p2: 'Actualmente en CodeGenia traduzco necesidades de cliente en soluciones técnicas a medida: agentes conversacionales y de tarea sobre Google Cloud Vertex AI, integraciones entre APIs y modelos, y el software que los rodea de extremo a extremo, desde la arquitectura hasta el frontend en React, Vue.js y Node.js.',
    p3: 'He construido la capa de agentes de IA de la plataforma global de Elecnor, trabajando con sus equipos de Estados Unidos y España. Otros trabajos me han llevado de la detección con redes neuronales convolucionales (CNN) para Scalextric a la visualización en RA/RV para Grupo Yara Construcciones y al software móvil para Bosch.',
  },

  // Stat labels, keyed by the English label.
  stats: {
    'Years building': 'Años programando',
    'Projects shipped': 'Proyectos entregados',
    'Technologies': 'Tecnologías',
  } as Record<string, string>,

  // Projects, keyed by slug.
  projects: {
    'elecnor-intelligence-now-platform': {
      title: 'Elecnor · Plataforma global Intelligence Now',
      description:
        'Una plataforma corporativa global para Elecnor impulsada por agentes de IA sobre Google Cloud Vertex AI, construida junto a sus equipos de Estados Unidos y España.',
      body: 'Elecnor es una multinacional líder en infraestructuras y energía con operaciones en América y Europa. He contribuido al desarrollo de su plataforma global Intelligence Now, centrándome en la capa de agentes de IA construida sobre Google Cloud Vertex AI, y trabajando directamente con sus equipos de Estados Unidos y España. El trabajo incluyó diseñar e integrar agentes conversacionales y de tarea que automatizan flujos de negocio, extraen información de los datos internos y apoyan la toma de decisiones a escala en ambas regiones.',
    },
    'vestor': {
      title: 'Vestor · Gestión de carteras y planificación financiera',
      description:
        'Plataforma moderna de seguimiento de carteras y planificación financiera, pensada para inversores a largo plazo.',
      body: 'Vestor es un proyecto personal que construí desde cero: una plataforma moderna para seguir carteras de inversión y planificar objetivos financieros a largo plazo. Maneja datos reales de cartera con una interfaz limpia y enfocada, diseñada para inversores que piensan en años, no en minutos. Construida con React en el frontend y Convex como capa de base de datos en tiempo real y autenticación.',
    },
    'scalextric-ai-detection': {
      title: 'Scalextric · Detección de objetos con IA y web 3D',
      description:
        'Detección de objetos en tiempo real sobre un circuito de Scalextric, junto a una representación 3D de los coches y el circuito ejecutándose en el navegador.',
      body: 'Un proyecto que combina visión por computador y la web: un modelo de IA detecta y rastrea los coches en un circuito físico de Scalextric en tiempo real, mientras una representación 3D en la web refleja la acción en vivo en el navegador. Reúne detección de objetos, datos en tiempo real y gráficos 3D interactivos en una sola experiencia.',
    },
    'automated-systems': {
      title: 'Sistemas automatizados e integraciones de IA',
      description:
        'Un cuerpo de trabajo continuo automatizando procesos de negocio y conectando modelos de IA con software y herramientas existentes.',
      body: 'Mi foco actual en CodeGenia: construir sistemas y procesos automatizados, integrar modelos de IA en productos existentes y desarrollar el software a su alrededor. El trabajo abarca conectar APIs, eliminar pasos manuales de las operaciones del día a día y entregar integraciones que aguantan en producción.',
    },
    'yara-vr-ar': {
      title: 'Grupo Yara · Visualización de pisos en RV y RA',
      description:
        'Herramientas de realidad virtual y aumentada que permiten a los compradores recorrer pisos antes de que estén construidos.',
      body: 'Para Grupo Yara Construcciones desarrollé funcionalidades de realidad virtual y aumentada para visualizar pisos. Los posibles compradores pueden explorar los espacios de forma inmersiva (recorriendo distribuciones y acabados antes de la construcción), convirtiendo los planos arquitectónicos en algo por lo que puedes caminar de verdad.',
    },
    'bosch-repair-app': {
      title: 'Bosch · App del servicio técnico de reparaciones',
      description: 'Una aplicación móvil que da soporte al flujo de trabajo del servicio técnico de reparaciones de Bosch.',
      body: 'Una aplicación móvil creada para dar soporte al servicio técnico de reparaciones de Bosch. Agiliza el flujo de trabajo de reparación para los técnicos, reuniendo los pasos de un servicio en una experiencia móvil única y enfocada.',
    },
    'itaca-sabien-web': {
      title: 'ITACA-SABIEN · App web de tecnología sanitaria',
      description:
        'Una aplicación web corporativa desarrollada dentro de un grupo de investigación centrado en tecnologías para la salud y el bienestar.',
      body: 'Desarrollada dentro del grupo de investigación ITACA-SABIEN, centrado en tecnologías para la salud y el bienestar. El proyecto fue una aplicación web corporativa: mi primer trabajo práctico construyendo software real de pila completa en un entorno orientado a la investigación.',
    },
  } as Record<string, { title: string; description: string; body: string }>,

  // Experience entries, keyed by company.
  experience: {
    'CodeGenia': {
      role: 'Ingeniero de IA',
      description:
        'CodeGenia construye soluciones de IA y software a medida para sus clientes. Como Ingeniero de IA conecto las necesidades del cliente con la entrega técnica: diseño agentes de IA sobre Google Cloud Vertex AI, automatizo procesos de negocio y lidero el desarrollo de aplicaciones multiplataforma de principio a fin.',
      highlights: [
        'He construido la capa de agentes de IA de la plataforma global Intelligence Now de Elecnor sobre Google Cloud Vertex AI, trabajando directamente con sus equipos de Estados Unidos y España.',
        'He diseñado agentes conversacionales y de tarea que automatizan flujos de negocio y extraen información de los datos internos para apoyar la toma de decisiones a escala.',
        'He construido sistemas automatizados e integraciones que conectan modelos de IA y APIs con productos existentes, eliminando pasos manuales de las operaciones del día a día.',
        'He entrenado y desplegado un modelo de detección de objetos en tiempo real para Scalextric, reflejado en vivo por una representación 3D del circuito en el navegador.',
        'He desarrollado la visualización de pisos en RV y RA para Grupo Yara Construcciones, permitiendo a los compradores recorrer distribuciones y acabados antes de la construcción.',
      ],
    },
    'Dare Planet Technology': {
      role: 'Desarrollador de Software',
      description:
        'Dare Planet Technology es un estudio de software que entrega productos web y multiplataforma para empresas cliente. Trabajé en toda la pila, llevando funcionalidades desde el modelo de datos hasta la interfaz: UIs web, servicios en Node.js y pantallas móviles nativas para proyectos de cliente.',
      highlights: [
        'Desarrollé la aplicación móvil del servicio técnico de reparaciones de Bosch en Kotlin, reuniendo los pasos de un servicio en un flujo único y enfocado para los técnicos de campo.',
        'Construí y mantuve funcionalidades full-stack en proyectos web y multiplataforma, trabajando directamente contra los requisitos del cliente.',
      ],
    },
    'ITACA-SABIEN': {
      role: 'Desarrollador de Software (Tecnologías para la salud y el bienestar)',
      description:
        'ITACA-SABIEN es un grupo de investigación centrado en tecnologías para la salud y el bienestar. Desarrollé una aplicación web corporativa de principio a fin en un entorno orientado a la investigación: mi primera experiencia profesional entregando software real de pila completa, desde el modelo de datos hasta la interfaz.',
      highlights: [
        'Desarrollé una aplicación web corporativa cubriendo base de datos, backend e interfaz.',
        'Trabajé dentro de un equipo de investigación, traduciendo requisitos de un dominio no informático en un producto funcional.',
      ],
    },
  } as Record<string, { role: string; description: string; highlights: string[] }>,

  // Certifications, keyed by the English certificate name. Only entries whose
  // name actually differs in Spanish need translating; issuers are proper nouns
  // and missing keys fall back to the English source.
  certifications: {
    'Machine Learning & Deep Learning': {
      name: 'Machine Learning y Deep Learning',
      issuer: 'Zero To Mastery Academy',
    },
  } as Record<string, { name: string; issuer: string }>,

  // Education fields, keyed by school.
  education: {
    'Valencian International University': 'Ingeniería Informática',
    'Zero To Mastery Academy': 'Machine Learning y Deep Learning',
    'IES La Sènia': 'Desarrollo de Aplicaciones Multiplataforma',
    'Grupo Studio Formación': 'Desarrollo de Aplicaciones Web',
    'Centro de FP SOLVAM': 'Sistemas Microinformáticos y Redes',
  } as Record<string, string>,
};

// Translate any year/date string that contains the English "Present" marker.
export function esDate(value: string): string {
  return value.replace(/Present/g, es.ui.present);
}
