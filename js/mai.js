document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('nav a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            body.classList.toggle('menu-open');
            menuToggle.classList.toggle('open');
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (body.classList.contains('menu-open')) {
                body.classList.remove('menu-open');
                if (menuToggle) {
                    menuToggle.classList.remove('open');
                }
            }
        });
    });

    const themeCheckbox = document.getElementById('theme-checkbox');
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            console.log('Theme toggle clicked.');
        });
    }
});