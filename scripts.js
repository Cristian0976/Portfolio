const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Menú móvil */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');

function setMenu(open) {
    menuIcon.classList.toggle('bx-x', open);
    navbar.classList.toggle('active', open);
    menuIcon.setAttribute('aria-expanded', String(open));
    menuIcon.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

menuIcon.addEventListener('click', () => setMenu(!navbar.classList.contains('active')));
navbar.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* Link activo según la sección visible */
const navLinks = document.querySelectorAll('header nav a');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
    });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(sec => observer.observe(sec));

/* Header con borde al hacer scroll */
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 100);
}, { passive: true });

/* Animaciones de entrada (se omiten si el usuario pidió menos movimiento) */
if (!reduceMotion && window.ScrollReveal) {
    ScrollReveal({ distance: '80px', duration: 1200, delay: 100 });
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .technologies-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
}

/* Texto animado */
const typedTarget = document.querySelector('.multiple-text');
const roles = ['Frontend Developer', 'Analista GeneXus 16'];
if (!reduceMotion && window.Typed) {
    new Typed('.multiple-text', { strings: roles, typeSpeed: 80, backSpeed: 60, backDelay: 1500, loop: true });
} else {
    typedTarget.textContent = roles[0];
}
