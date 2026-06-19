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
      stack: 'Stack',
      experience: 'Experiencia',
      contact: 'Contacto',
    },
    hero: {
      viewProjects: 'Ver proyectos',
      downloadCv: 'Descargar CV',
      scroll: 'scroll',
    },
    aboutHeading: 'Sobre mí',
    projectsHeading: 'Trabajo seleccionado',
    stackHeading: 'Stack y herramientas',
    experienceHeading: 'Experiencia',
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
  tagline: 'Construyo automatización con IA, integraciones y software inmersivo para producción.',
  // First sentence of bio.p1, used as the hero subline.
  subline: 'Soy un desarrollador de Valencia, España.',
  availability: 'Abierto a nuevas oportunidades',
  bio: {
    p1: 'Soy un desarrollador de Valencia, España. Vengo del desarrollo de aplicaciones web y multiplataforma, y lo complementé con formación reglada, desde sistemas microinformáticos y redes hasta ingeniería informática en la Universidad Internacional de Valencia.',
    p2: 'Hoy mi foco es la IA y la automatización. En Dare Planet Shuttle diseño y despliego automatizaciones e integraciones con IA — conectando modelos a sistemas de negocio reales — junto con el software que las rodea. Profundicé en la parte de ML con formación dedicada en Machine Learning y Deep Learning.',
    p3: 'Me gustan los problemas que se sitúan entre disciplinas: IA, la web, el 3D y la tecnología inmersiva. Trabajo mejor en equipos pequeños donde puedo asumir un problema de principio a fin, desde el primer prototipo hasta algo funcionando en producción.',
  },

  // Stat labels, keyed by the English label.
  stats: {
    'Years building': 'Años programando',
    'Projects shipped': 'Proyectos entregados',
    'Technologies': 'Tecnologías',
  } as Record<string, string>,

  // Stack category names, keyed by the English category.
  stackCategories: {
    'AI / ML': 'IA / ML',
    'Languages': 'Lenguajes',
    'Frameworks': 'Frameworks',
    'Data & Infra': 'Datos e infra',
    'Tools & 3D': 'Herramientas y 3D',
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
    'Dare Planet Shuttle': {
      role: 'Desarrollador de Software — Automatizaciones e integraciones de IA',
      description:
        'Construyendo automatizaciones e integraciones con IA que conectan modelos a sistemas de negocio reales, además del software que se entrega a su alrededor.',
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
