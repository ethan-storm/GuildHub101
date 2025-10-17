// Mobile menu
const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('.nav-toggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}
// highlight current page
(function highlightNav(){
  const links = document.querySelectorAll('.nav a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '' && href === 'index.html') || href === path) a.classList.add('active');
  });
})();
// tabs (signin)
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
// Envelope animation
function castEnvelopes(durationMs = 1100, count = 12) {
  const layer = document.getElementById('spellcast');
  if (!layer) return;
  layer.innerHTML = '';
  const w = window.innerWidth, h = window.innerHeight;
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'envelope';
    span.textContent = '✉️';
    const x = Math.random() * w * 0.8 + w * 0.1;
    const y = h * 0.66 + Math.random() * 80;
    const rot = (Math.random() * 30 - 15).toFixed(1) + 'deg';
    span.style.left = x + 'px';
    span.style.top = y + 'px';
    span.style.setProperty('--r', rot);
    span.style.animationDelay = (Math.random() * 0.35).toFixed(2) + 's';
    layer.appendChild(span);
  }
  setTimeout(() => { layer.innerHTML = ''; }, durationMs + 400);
}
// Demo forms
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
// Guild Register — submit to Apps Script (replace endpoint)
// put this near the top (right after your other helpers)
(function setFormStart(){
  const fs = document.getElementById('formStart');
  if (fs) fs.value = String(Date.now());
})();

// Guild Register — submit to Apps Script
const GUILD_ENDPOINT = "https://script.google.com/macros/s/AKfycbxPx5j53tlD96_qQKpqnjkp6nMafVunSKDZ6vlew90CIjHYG6YwWX5po8k_Xk9zKJ5p/exec";

(function wireGuildForm(){
  const form = document.getElementById('guild-register');
  if (!form) return;
  const statusEl = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn && (submitBtn.disabled = true);
    if (statusEl) statusEl.textContent = 'Sending your request…';

    // ✉️ animation
    castEnvelopes(1200, 16);

    // Build FormData
    const data = new FormData(form);
    data.append('ua', navigator.userAgent);
    data.append('page', location.href);
    data.append('ref', document.referrer || '');

    // Important: use no-cors so the browser doesn't block response (Apps Script limits CORS headers)
    try {
      await fetch(GUILD_ENDPOINT, { method: 'POST', body: data, mode: 'no-cors' });
    } catch (_) {
      // ignore; server still receives the request
    }

    // Let the animation breathe, then redirect to thank-you
    setTimeout(() => { window.location.href = 'thank-you.html'; }, 950);
  });
})();

// footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
