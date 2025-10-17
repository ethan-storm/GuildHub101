// Mobile menu
const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('.nav-toggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Highlight current page in nav
(function highlightNav(){
  const links = document.querySelectorAll('.nav a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '' && href === 'index.html') || href === path) {
      a.classList.add('active');
    }
  });
})();

// Tabs on signin page
(function tabs(){
  const tabs = document.querySelectorAll('[data-tabs] .tab');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));
    const sel = t.getAttribute('data-tab-target');
    document.querySelector(sel)?.classList.add('active');
  }));
})();

// Demo forms (no backend yet)
document.querySelectorAll('form[data-demo-form]').forEach(form => {
  const statusEl = form.querySelector('.form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (statusEl) statusEl.textContent = 'Sending…';
    await new Promise(r => setTimeout(r, 600));
    if (statusEl) statusEl.textContent = 'Thanks! (Demo) We will wire this to a real backend soon.';
    form.reset();
  });
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
