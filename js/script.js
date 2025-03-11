let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');
let header = document.querySelector('header');
let scrollDown = document.querySelector('.scroll-down');

const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 200,
    reset: true
});

sr.reveal('.profile-text', { delay: 25, origin: 'top' });
sr.reveal('.profile-img', { delay: 25, origin: 'right' });
sr.reveal('.icons', { delay: 50, origin: 'left' });
sr.reveal('.scroll-down', { delay: 25, origin: 'right' });
sr.reveal('.skills-card', { delay: 25, origin: 'top' });
sr.reveal('.projects-card-title', { delay: 25, origin: 'top' });
sr.reveal('.projects-card', { delay: 25, origin: 'top' });

const translations = {
    "es": {
        "skills": "Habilidades",
        "projects": "Mi experiencia",
        "contact": "Contacto",
        "title": "Programador y Desarrollador Multiplataforma especializado en automatizaciones con IA",
        "description": "Soy un programador y desarrollador multiplataforma que trabaja en el desarrollo de software, automatizaciones e integraciones con IA",
        "download_cv": "Descargar CV",
        "leadership": "Liderazgo",
        "leadership_desc": "Guío equipos, fomentando la motivación, la toma de decisiones efectivas y el logro de objetivos.",
        "ambition": "Ambición",
        "ambition_desc": "Me impulsa el deseo constante de superación, estableciendo metas desafiantes y trabajando para alcanzarlas.",
        "creativity": "Creatividad",
        "creativity_desc": "Aplico un pensamiento innovador y original para generar ideas únicas y resolver desafíos de manera efectiva.",
        "learning": "Capacidad de aprendizaje",
        "learning_desc": "Aprendo con rapidez y curiosidad, adaptándome a nuevos conocimientos y tecnologías.",
        "adaptability": "Adaptabilidad",
        "adaptability_desc": "Me adapto con rapidez y flexibilidad a nuevos desafíos y entornos.",
        "problem_solving": "Resolución de problemas",
        "problem_solving_desc": "Analizo situaciones complejas y encuentro soluciones eficientes y efectivas.",
        "ai": "Inteligencia artificial",
        "ai_desc": "Desarrollo de sistemas, modelos y automatizaciones para gestionar procesos de manera más eficiente.",
        "automations": "Sistemas automatizados",
        "automations_desc": "Desarrollo de sistemas automatizados para gestionar procesos de negocios.",
        "coding": "Programas y soluciones con código",
        "coding_desc": "Desarrollo de programas y soluciones con código para gestionar procesos de negocios.",
        "multiplatform": "Desarrollo multiplataforma",
        "multiplatform_desc": "Desarrollo de aplicaciones multiplataforma de diversas empresas y proyectos.",
        "vr": "Entorno de AR/VR",
        "vr_desc": "Desarrollo de un entorno para visualizar y aplicar soluciones de realidad aumentada a negocios.",
        "contact_title": "Trabajemos juntos",
        "write-me-email": "O escríbeme un correo electrónico a jaumecortesmonzon@gmail.com",
        "send": "Enviar mensaje"
    },
    "en": {
        "skills": "Skills",
        "projects": "My experience",
        "contact": "Contact",
        "title": "Multiplatform Programmer and Developer specialized in AI-driven automations",
        "description": "I am a multiplatform programmer and developer working on software development, automations and AI integrations",
        "download_cv": "Download CV",
        "leadership": "Leadership",
        "leadership_desc": "I guide teams, fostering motivation, effective decision-making, and achieving goals.",
        "ambition": "Ambition",
        "ambition_desc": "I am driven by a constant desire for improvement, setting challenging goals and working to achieve them.",
        "creativity": "Creativity",
        "creativity_desc": "I apply innovative and original thinking to generate unique ideas and effectively solve challenges.",
        "learning": "Learning ability",
        "learning_desc": "I learn quickly and with curiosity, adapting to new knowledge and technologies.",
        "adaptability": "Adaptability",
        "adaptability_desc": "I quickly and flexibly adapt to new challenges and environments.",
        "problem_solving": "Problem-solving",
        "problem_solving_desc": "I analyze complex situations and find efficient and effective solutions.",
        "ai": "Artificial Intelligence",
        "ai_desc": "Development of systems, models, and automations to manage processes more efficiently.",
        "automations": "Automated Systems",
        "automations_desc": "Development of automated systems to manage business processes.",
        "coding": "Programming and coding solutions",
        "coding_desc": "Development of software and coded solutions to manage business processes.",
        "multiplatform": "Multiplatform Development",
        "multiplatform_desc": "Development of cross-platform applications for various businesses and projects.",
        "vr": "AR/VR Environment",
        "vr_desc": "Development of an environment to visualize and apply augmented reality solutions to businesses.",
        "contact_title": "Let's work together",
        "write-me-email": "Or write me an email at jaumecortesmonzon@gmail.com",
        "send": "Send message"
    }
};

function updateLanguage(lang) {
    document.querySelectorAll("[data-lang]").forEach(el => {
        const key = el.getAttribute("data-lang");
        if (translations[lang][key]) {
            if (el.tagName === "A" && el.querySelector("i")) {
                el.childNodes[0].textContent = translations[lang][key] + " ";
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    let projectsCardTitle = document.querySelector(".projects-card-title");
    if (projectsCardTitle) {
        projectsCardTitle.style.backgroundImage = lang === "en"
            ? "url('img/expertise/en.png')"
            : "url('img/expertise/es.png')";
    }
}

// Set default language
let currentLanguage = "en";
updateLanguage(currentLanguage);

let languageToggle = document.getElementById('language-toggle');
let isEnglish = true;

// Change language
languageToggle.onclick = () => {
    isEnglish = !isEnglish;
    languageToggle.style.backgroundImage = isEnglish ? "url('img/flags/en.png')" : "url('img/flags/es.png')";
    document.querySelector('.cv-link').href = isEnglish ? "cv/CV-EN.pdf" : "cv/CV-ES.pdf";
    document.querySelector('.projects-card-title').style.backgroundImage = isEnglish ? "url('img/expertise/en.png')" : "url('img/expertise/es.png')";
    currentLanguage = isEnglish ? "en" : "es";
    updateLanguage(currentLanguage);
};

// Open and close menu
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

// Close menu when clicking on a link
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navlist.classList.remove('open');
    });
});

// Hide header on scroll down
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('hidden');
        scrollDown.classList.add('visible');
    } else {
        header.classList.remove('hidden');
        scrollDown.classList.remove('visible');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth"
            });

            history.replaceState(null, null, ' ');
        }
    });
});
