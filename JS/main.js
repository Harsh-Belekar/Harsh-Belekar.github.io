/* ============================= */
/* Display & Hide Sidebar        */
/* ============================= */

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle-btn");
    const sidebar = document.getElementById("sidebar");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });
    }
});


/* ============================= */
/* Switch between Pages          */
/* ============================= */

const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        const targetPage = this.textContent.trim().toLowerCase();

        navLinks.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        pages.forEach(page => {
            if (page.dataset.page === targetPage) {
                page.classList.add('active');
                if (window.innerWidth <= 768) {
                    const contentTop = document.querySelector('.main-content').offsetTop;
                    window.scrollTo({ top: contentTop - 20, behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else {
                page.classList.remove('active');
            }
        });
    });
});


/* ============================= */
/* Quote Rotation Animation      */
/* ============================= */

const quotes = document.querySelectorAll('.quote');

let currentQuote = 0;

function rotateQuotes() {

    quotes[currentQuote].classList.remove('active');

    currentQuote = (currentQuote + 1) % quotes.length;

    quotes[currentQuote].classList.add('active');
}

/* Change quote every 4 seconds */
setInterval(rotateQuotes, 4000);
