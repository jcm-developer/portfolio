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

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navlist.classList.remove('open');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('hidden');
        scrollDown.classList.add('visible');
    } else {
        header.classList.remove('hidden');
        scrollDown.classList.remove('visible');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
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
