'use strict';

/* =========================================================
   EDITABLE CONTENT
   ========================================================= */
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID'
};

const DOCUMENTS = [
  { title: 'Curriculum Vitae (CV)', icon: 'fa-file-lines', description: 'My résumé with my background, education, and skills.', file: 'assets/documents/renier-cv.pdf', viewable: true, downloadName: 'Renier-Paul-Toca-CV.pdf' },
  { title: 'CSS NC II Certificate', icon: 'fa-certificate', description: 'National Certificate II in CSS (Computer Systems Servicing).', file: 'assets/certificates/ncii.pdf', viewable: true, downloadName: 'CSS-NC-II-Certificate.pdf' },
  { title: 'freeCodeCamp Certificate', icon: 'fa-code', description: 'Certificate earned through freeCodeCamp web development lessons.', file: 'assets/certificates/freecodecampcert.pdf', viewable: true, downloadName: 'freeCodeCamp-Certificate.pdf' },
  { title: 'AI Workshop Certificate', icon: 'fa-robot', description: 'Certificate of participation in an AI workshop.', file: 'assets/certificates/aiworkshopcert.pdf', viewable: true, downloadName: 'AI-Workshop-Certificate.pdf' }
];

const PROJECTS = [
  {
    name: 'Asenso \u2013 Kapag Planado, Sigurado!',
    screenshots: [
      'assets/images/project-1a.jpg',
      'assets/images/project-1b.jpg',
      'assets/images/project-1c.jpg',
      'assets/images/project-1d.jpg'
    ],
    summary: 'A task management application that helps users organize daily tasks, set deadlines, and track completed activities.',
    about: 'Asenso is a task management web application designed to help users manage their daily responsibilities and stay organized. It provides a dashboard where users can create tasks, add descriptions, assign tasks to lists, set deadlines, and monitor completed activities. The system aims to solve the problem of disorganized schedules and forgotten tasks by providing a centralized and user-friendly platform for task management.',
    features: ['User Registration and Login', 'Task Creation and Management', 'Daily Task Dashboard', 'Custom Task Lists and Categories', 'Due Dates and Deadline Tracking', 'Completed Tasks Tracking'],
    technologies: ['JavaScript', 'CSS', 'PHP', 'MySQL', 'Bootstrap', 'XAMPP']
  },
  {
    name: 'Kinamia Steakhouse Web-Based Sales and Inventory Management System with QR-Based Ordering',
    screenshots: [
      'assets/images/project-2a1.png', 'assets/images/project-2a2.png', 'assets/images/project-2a3.png',
      'assets/images/project-2a4.png', 'assets/images/project-2a5.png', 'assets/images/project-2a6.png',
      'assets/images/project-2a7.png', 'assets/images/project-2b1.png', 'assets/images/project-2b2.png',
      'assets/images/project-2b3.png', 'assets/images/project-2b4.png', 'assets/images/project-2b5.png',
      'assets/images/project-2c1.png', 'assets/images/project-2c2.png', 'assets/images/project-2c3.png',
      'assets/images/project-2c4.png', 'assets/images/project-2c5.png', 'assets/images/project-2c6.png',
      'assets/images/project-2e1.png', 'assets/images/project-2e2.png', 'assets/images/project-2e3.png',
      'assets/images/project-2e4.png', 'assets/images/project-2e5.png', 'assets/images/project-2d1.png'
    ],
    summary: 'A web-based sales and inventory management system featuring QR-based ordering to streamline restaurant operations and improve customer ordering experience.',
    about: 'The Kinamia Steakhouse Web-Based Sales and Inventory Management System with QR-Based Ordering is a web application developed to improve the restaurant ordering, sales, and inventory management processes. The system allows customers to place orders through QR codes, reducing reliance on manual ordering and making the ordering process more convenient and efficient. It also helps the restaurant manage sales transactions and inventory more systematically, improving operational efficiency and minimizing errors associated with manual processes.',
    features: ['QR-Based Customer Ordering', 'Digital Menu', 'Sales Management', 'Inventory Management', 'Order Management', 'Streamlined Restaurant Ordering Process'],
    technologies: ['PostgreSQL', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'TypeScript', 'Refine']
  }
];

/* =========================================================
   HELPERS
   ========================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* =========================================================
   THEME
   ========================================================= */
const root = document.documentElement;
const themeIcon = $('#themeIcon');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  try { localStorage.setItem('theme', theme); } catch (e) {}
}
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
applyTheme(savedTheme);

$('#themeToggle').addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* =========================================================
   MOBILE MENU
   ========================================================= */
const navLinks = $('#navLinks');
const menuToggle = $('#menuToggle');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.innerHTML = `<i class="fa-solid ${open ? 'fa-xmark' : 'fa-bars'}"></i>`;
}
menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
$$('.nav-link').forEach(l => l.addEventListener('click', () => setMenu(false)));

/* =========================================================
   RENDER DOCUMENT CARDS
   ========================================================= */
$('#docGrid').innerHTML = DOCUMENTS.map((d, i) => `
  <article class="card doc-card reveal">
    <div class="doc-icon"><i class="fa-solid ${d.icon}"></i></div>
    <h4>${esc(d.title)}</h4>
    <p>${esc(d.description)}</p>
    <div class="doc-actions">
      ${d.viewable ? `<button class="btn btn-primary btn-sm" data-doc="${i}"><i class="fa-solid fa-eye"></i> View</button>` : ''}
      <a class="btn btn-outline btn-sm" href="${esc(d.file)}" download="${esc(d.downloadName)}"><i class="fa-solid fa-download"></i> Download</a>
    </div>
  </article>`).join('');

/* =========================================================
   RENDER PROJECT CARDS
   ========================================================= */
function buildProjectGrid() {
  const html = PROJECTS.map((p, i) => {
    const shots = p.screenshots || [];

    // Build slides — NO onerror inline, error handling added in JS after render
    const slidesHTML = shots.map((src, si) => [
      `<div class="carousel-slide${si === 0 ? ' active' : ''}" aria-hidden="${si !== 0}" data-si="${si}">`,
        `<div class="shot-placeholder">`,
          `<i class="fa-regular fa-image"></i>`,
          `<span>Image not found</span>`,
        `</div>`,
        `<img src="${esc(src)}" alt="Screenshot ${si + 1} of ${esc(p.name)}">`,
      `</div>`
    ].join('')).join('');

    const dotsHTML = shots.length > 1 ? shots.map((_, si) =>
      `<button class="carousel-dot${si === 0 ? ' active' : ''}" data-index="${si}" aria-label="Screenshot ${si + 1}"></button>`
    ).join('') : '';

    const navHTML = shots.length > 1 ? `
      <button class="carousel-btn carousel-prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
      <button class="carousel-btn carousel-next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
      <div class="carousel-dots">${dotsHTML}</div>
      <div class="carousel-counter"><span class="carousel-current">1</span> / ${shots.length}</div>` : '';

    const tagsHTML = p.technologies.map(t => `<span class="tag">${esc(t)}</span>`).join('');

    return `
    <article class="card project-card reveal">
      <div class="project-shot carousel" data-project-index="${i}">
        <div class="carousel-track">${slidesHTML}</div>
        ${navHTML}
      </div>
      <div class="project-body">
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="tags">${tagsHTML}</div>
        <button class="btn btn-outline btn-sm" data-project="${i}">
          <i class="fa-solid fa-circle-info"></i> View Project Details
        </button>
      </div>
    </article>`;
  }).join('');

  $('#projectGrid').innerHTML = html;

  // After HTML is in the DOM, attach error handlers to every slide image in JS
  $$('.carousel-slide').forEach(slide => {
    const img = slide.querySelector('img');
    const placeholder = slide.querySelector('.shot-placeholder');
    if (!img || !placeholder) return;

    // Hide placeholder initially; show image
    placeholder.style.display = 'none';
    img.style.display = 'block';

    img.addEventListener('error', () => {
      img.style.display = 'none';
      placeholder.style.display = 'flex';
    });
  });
}

buildProjectGrid();

/* =========================================================
   LOGO MISSING HANDLER
   ========================================================= */
const logoImg = $('#logoImg');
if (logoImg) {
  logoImg.addEventListener('error', () => {
    logoImg.style.display = 'none';
    const logo = $('.logo');
    if (logo) logo.classList.add('no-logo');
  });
}

/* =========================================================
   LIGHTBOX
   ========================================================= */
function openLightbox(carousel, startIndex) {
  const projectIndex = Number(carousel.dataset.projectIndex);
  const p = PROJECTS[projectIndex];
  if (!p || !p.screenshots || !p.screenshots.length) return;

  const shots = p.screenshots;
  const total = shots.length;
  let current = startIndex;

  function makeLightboxHTML(idx) {
    return `
      <div class="lightbox-wrap">
        <img class="lightbox-img" src="${esc(shots[idx])}" alt="Screenshot ${idx + 1} of ${esc(p.name)}">
        ${total > 1 ? `
        <div class="lightbox-nav">
          <button class="carousel-btn lightbox-prev" id="lbPrev"><i class="fa-solid fa-chevron-left"></i></button>
          <span class="lightbox-counter">${idx + 1} / ${total}</span>
          <button class="carousel-btn lightbox-next" id="lbNext"><i class="fa-solid fa-chevron-right"></i></button>
        </div>` : ''}
      </div>`;
  }

  openModal(p.name, makeLightboxHTML(current));

  function bindNav() {
    const prev = $('#lbPrev', modal);
    const next = $('#lbNext', modal);
    if (prev) prev.addEventListener('click', () => { current = (current - 1 + total) % total; modalBody.innerHTML = makeLightboxHTML(current); bindNav(); });
    if (next) next.addEventListener('click', () => { current = (current + 1) % total; modalBody.innerHTML = makeLightboxHTML(current); bindNav(); });
  }
  bindNav();

  function lbKey(e) {
    if (modal.hidden) { document.removeEventListener('keydown', lbKey); return; }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); current = (current - 1 + total) % total; modalBody.innerHTML = makeLightboxHTML(current); bindNav(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); current = (current + 1) % total; modalBody.innerHTML = makeLightboxHTML(current); bindNav(); }
  }
  document.addEventListener('keydown', lbKey);
}

/* =========================================================
   CAROUSEL INIT
   ========================================================= */
function initCarousels() {
  $$('.carousel').forEach(carousel => {
    const slides  = $$('.carousel-slide', carousel);
    const dots    = $$('.carousel-dot', carousel);
    const prevBtn = $('.carousel-prev', carousel);
    const nextBtn = $('.carousel-next', carousel);
    const counter = $('.carousel-current', carousel);
    const total   = slides.length;
    if (!total) return;

    let current = 0;

    function goTo(index) {
      current = (index + total) % total;
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === current);
        s.setAttribute('aria-hidden', String(i !== current));
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      if (counter) counter.textContent = current + 1;
    }

    if (prevBtn) prevBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current + 1); });
    dots.forEach(dot => dot.addEventListener('click', e => { e.stopPropagation(); goTo(Number(dot.dataset.index)); }));

    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    });

    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    slides.forEach((slide, si) => {
      slide.style.cursor = 'zoom-in';
      slide.addEventListener('click', e => {
        if (e.target.closest('.carousel-btn, .carousel-dots')) return;
        openLightbox(carousel, si);
      });
    });

    goTo(0);
  });
}

initCarousels();

/* =========================================================
   MODAL
   ========================================================= */
const modal      = $('#modal');
const modalTitle = $('#modalTitle');
const modalBody  = $('#modalBody');
let lastFocused  = null;

function openModal(title, html) {
  lastFocused = document.activeElement;
  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  const closeBtn = $('.modal-header .icon-btn', modal);
  if (closeBtn) closeBtn.focus();
}
function closeModal() {
  modal.hidden = true;
  modalBody.innerHTML = '';
  document.body.classList.remove('modal-open');
  if (lastFocused) lastFocused.focus();
}

modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
document.addEventListener('keydown', e => {
  if (modal.hidden) return;
  if (e.key === 'Escape') { closeModal(); return; }
  if (e.key === 'Tab') {
    const f = $$('button, a[href], iframe', modal);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

function certificateHTML(doc) {
  const isPdf = /\.pdf$/i.test(doc.file);
  const urlEsc = esc(doc.file);
  const buttons = `
    <div class="cert-actions">
      <a class="btn btn-primary btn-sm" href="${urlEsc}" target="_blank" rel="noopener"><i class="fa-solid fa-up-right-from-square"></i> Open in New Tab</a>
      <a class="btn btn-outline btn-sm" href="${urlEsc}" download="${esc(doc.downloadName)}"><i class="fa-solid fa-download"></i> Download</a>
    </div>`;
  if (isPdf) {
    return `<iframe class="cert-view" src="${urlEsc}" title="${esc(doc.title)}"></iframe>${buttons}`;
  }
  const fallback = `<div class="cert-missing"><i class="fa-solid fa-file-circle-exclamation"></i> File not found at <strong>${urlEsc}</strong>.</div>`;
  return `<img class="cert-img" src="${urlEsc}" alt="${esc(doc.title)}" onerror="this.outerHTML=this.dataset.fallback" data-fallback="${esc(fallback)}">${buttons}`;
}

function buildProjectDetailsHTML(p) {
  return `<div class="detail">
    <h4>About This Project</h4><p>${esc(p.about)}</p>
    <h4>Key Features</h4><ul>${p.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
    <h4>Technologies Used</h4><div class="tags">${p.technologies.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
  </div>`;
}

document.addEventListener('click', e => {
  const docBtn = e.target.closest('[data-doc]');
  if (docBtn) { const doc = DOCUMENTS[Number(docBtn.dataset.doc)]; openModal(doc.title, certificateHTML(doc)); return; }
  const projBtn = e.target.closest('[data-project]');
  if (projBtn) { const p = PROJECTS[Number(projBtn.dataset.project)]; openModal(p.name, buildProjectDetailsHTML(p)); }
});

/* =========================================================
   ACTIVE NAV + SCROLL
   ========================================================= */
const sections = $$('main section[id]');
const links    = $$('.nav-link');

function updateScrollState() {
  const y = window.scrollY + 120;
  let current = sections[0].id;
  sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1].id;
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  $('#toTop').classList.toggle('show', window.scrollY > 500);
}
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(() => { updateScrollState(); ticking = false; }); ticking = true; }
}, { passive: true });
updateScrollState();

$('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));
} else {
  $$('.reveal').forEach(el => el.classList.add('visible'));
}

$('#year').textContent = new Date().getFullYear();

/* =========================================================
   CONTACT FORM (EmailJS)
   ========================================================= */
const form     = $('#contactForm');
const sendBtn  = $('#sendBtn');
const statusEl = $('#formStatus');
let sending    = false;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(input) {
  const value = input.value.trim();
  let msg = '';
  if (!value) msg = 'This field is required.';
  else if (input.type === 'email' && !EMAIL_RE.test(value)) msg = 'Enter a valid email address.';
  const field = input.closest('.field');
  field.classList.toggle('invalid', !!msg);
  $('.error-msg', field).textContent = msg;
  input.setAttribute('aria-invalid', String(!!msg));
  return !msg;
}
$$('input, textarea', form).forEach(i => {
  i.addEventListener('blur', () => validateField(i));
  i.addEventListener('input', () => { if (i.closest('.field').classList.contains('invalid')) validateField(i); });
});

function showStatus(type, text) { statusEl.className = 'form-status ' + type; statusEl.textContent = text; }
form.addEventListener('submit', e => {
  e.preventDefault();

  // Validate all fields first
  const inputs = $$('input, textarea', form);
  const allValid = inputs.map(validateField).every(Boolean);
  if (!allValid) {
    inputs.find(i => i.closest('.field').classList.contains('invalid')).focus();
    return;
  }

  const name    = $('#name').value.trim();
  const email   = $('#email').value.trim();
  const subject = $('#subject').value.trim();
  const message = $('#message').value.trim();

  // Build the mailto body
  const body = [
    'Name: ' + name,
    'Email: ' + email,
    '',
    message
  ].join('\n');

  const mailto = 'mailto:renierpaultoca@gmail.com'
    + '?subject=' + encodeURIComponent(subject)
    + '&body='    + encodeURIComponent(body);

  // Open the visitor's default email app
  window.location.href = mailto;

  // Show confirmation and reset
  showStatus('success', 'Your email app is opening. Thank you for reaching out!');
  form.reset();
  $$('.field', form).forEach(f => f.classList.remove('invalid'));
});
