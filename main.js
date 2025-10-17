// Mobile menu
const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('.nav-toggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav && nav.classList.remove('open');
      toggle && toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Contact form (demo only)
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    // Simulate sending
    statusEl.textContent = 'Sending…';
    setTimeout(() => {
      console.log('Form submission (demo):', data);
      statusEl.textContent = 'Thanks! This demo just shows a message. We can wire this to real email later.';
      form.reset();
    }, 600);
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
