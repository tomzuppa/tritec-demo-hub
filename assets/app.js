/* TRI-TEC demo · reveal on scroll, menú móvil, switch ES/EN */

// --- Reveal on scroll ---
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.rv').forEach((el) => io.observe(el));

// --- Menú móvil ---
const burger = document.querySelector('.burger');
const links = document.querySelector('.nav-links');
if (burger && links) {
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    })
  );
}

// --- Bilingüe: demuestra el tratamiento, no es el i18n de producción ---
function setLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-es]').forEach((el) => {
    const val = el.getAttribute('data-' + lang);
    if (val) el.textContent = val;
  });
  document.querySelectorAll('.lang button').forEach((b) =>
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang))
  );
  try { localStorage.setItem('tt-lang', lang); } catch (e) {}
}

document.querySelectorAll('.lang button').forEach((b) =>
  b.addEventListener('click', () => setLang(b.dataset.lang))
);

let saved = 'es';
try { saved = localStorage.getItem('tt-lang') || 'es'; } catch (e) {}
setLang(saved);
