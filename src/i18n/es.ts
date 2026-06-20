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
        '¡Hola! Soy el asistente de Jaume. Pregúntame sobre sus proyectos, experiencia o stack — o si está disponible para trabajar.',
      placeholder: 'Escribe una pregunta…',
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
  subline: 'Convierto modelos de Machine Learning en productos escalables y listos para producción que generan un impacto real en el usuario.',
  availability: 'Abierto a la oportunidad adecuada',
  bio: {
    p1: 'Ingeniero de IA enfocado en transformar modelos de Machine Learning en productos escalables y listos para producción que generan un impacto directo en el usuario.',
    p2: 'Mi experiencia abarca Machine Learning, Deep Learning, Visión por Computador y PLN (con certificación de Google AI y Anthropic). Gestiono todo el ciclo de vida del producto: desde el diseño y entrenamiento de modelos en Python y TensorFlow, hasta su integración fluida en el stack de desarrollo con React, Vue.js y Node.js.',
    p3: 'A lo largo de mi carrera, he liderado la integración de IA, automatización y entornos de RA/RV para empresas de primer nivel como Scalextric, Bosch y Grupo Yara Construcciones.',
  },

  // Stat labels, keyed by the English label.
  stats: {
    'Years building': 'Años programando',
    'Projects shipped': 'Proyectos entregados',
    'Technologies': 'Tecnologías',
  } as Record<string, string>,

  // Projects, keyed by slug.
  projects: {
    'scalextric-ai-detection': {
      title: 'Scalextric — Detección de objetos con IA y web 3D',
      description:
        'Detección de objetos en tiempo real sobre un circuito de Scalextric, junto a una representación 3D de los coches y el circuito ejecutándose en el navegador.',
      body: 'Un proyecto que combina visión por computador y la web: un modelo de IA detecta y rastrea los coches en un circuito físico de Scalextric en tiempo real, mientras una representación 3D en la web refleja la acción en vivo en el navegador. Reúne detección de objetos, datos en tiempo real y gráficos 3D interactivos en una sola experiencia.',
    },
    'automated-systems': {
      title: 'Sistemas automatizados e integraciones de IA',
      description:
        'Un cuerpo de trabajo continuo automatizando procesos de negocio y conectando modelos de IA con software y herramientas existentes.',
      body: 'Mi foco actual en Dare Planet Shuttle: construir sistemas y procesos automatizados, integrar modelos de IA en productos existentes y desarrollar el software a su alrededor. El trabajo abarca conectar APIs, eliminar pasos manuales de las operaciones del día a día y entregar integraciones que aguantan en producción.',
    },
    'yara-vr-ar': {
      title: 'Grupo Yara — Visualización de pisos en RV y RA',
      description:
        'Herramientas de realidad virtual y aumentada que permiten a los compradores recorrer pisos antes de que estén construidos.',
      body: 'Para Grupo Yara Construcciones desarrollé funcionalidades de realidad virtual y aumentada para visualizar pisos. Los posibles compradores pueden explorar los espacios de forma inmersiva — recorriendo distribuciones y acabados antes de la construcción — convirtiendo los planos arquitectónicos en algo por lo que puedes caminar de verdad.',
    },
    'bosch-repair-app': {
      title: 'Bosch — App del servicio técnico de reparaciones',
      description: 'Una aplicación móvil que da soporte al flujo de trabajo del servicio técnico de reparaciones de Bosch.',
      body: 'Una aplicación móvil creada para dar soporte al servicio técnico de reparaciones de Bosch. Agiliza el flujo de trabajo de reparación para los técnicos, reuniendo los pasos de un servicio en una experiencia móvil única y enfocada.',
    },
    'itaca-sabien-web': {
      title: 'ITACA-SABIEN — App web de tecnología sanitaria',
      description:
        'Una aplicación web corporativa desarrollada dentro de un grupo de investigación centrado en tecnologías para la salud y el bienestar.',
      body: 'Desarrollada dentro del grupo de investigación ITACA-SABIEN, centrado en tecnologías para la salud y el bienestar. El proyecto fue una aplicación web corporativa — mi primer trabajo práctico construyendo software real de pila completa en un entorno orientado a la investigación.',
    },
  } as Record<string, { title: string; description: string; body: string }>,

  // Experience entries, keyed by company.
  experience: {
    'Codegenia': {
      role: 'Ingeniero de IA',
      description:
        'Actualmente conecto las necesidades de los clientes con soluciones técnicas a medida. Especializado en Agentes de IA (Google Cloud) e implementación avanzada de modelos, sigo liderando el desarrollo de aplicaciones multiplataforma de principio a fin.',
    },
    'Dare Planet Technology': {
      role: 'Desarrollador de Software',
      description: 'Desarrollo de software full-stack en proyectos web y multiplataforma.',
    },
    'ITACA-SABIEN': {
      role: 'Desarrollador de Software — Tecnologías para la salud y el bienestar',
      description:
        'Desarrollé una aplicación web corporativa dentro de un grupo de investigación centrado en tecnologías para la salud y el bienestar.',
    },
  } as Record<string, { role: string; description: string }>,

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
