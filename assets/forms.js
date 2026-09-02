/* TRI-TEC · Formularios por pasos, validación, carga de archivos y filtros.
   Demo sin backend: el envío simula la respuesta del servidor y genera folio. */

(function () {
  const MAX_MB = 20;
  const OK_EXT = ['pdf','doc','docx','xls','xlsx','dwg','jpg','jpeg','png','zip'];

  const T = {
    req:   { es: 'Este campo es obligatorio.', en: 'This field is required.' },
    email: { es: 'Escriba un correo válido, por ejemplo nombre@empresa.com', en: 'Enter a valid email, e.g. name@company.com' },
    tel:   { es: 'Escriba un teléfono de 10 dígitos.', en: 'Enter a 10-digit phone number.' },
    pick:  { es: 'Seleccione una opción.', en: 'Select an option.' },
    consent:{ es: 'Debe aceptar el aviso de privacidad para continuar.', en: 'You must accept the privacy notice to continue.' },
    big:   { es: 'excede el máximo de ' + MAX_MB + ' MB', en: 'exceeds the ' + MAX_MB + ' MB limit' },
    ext:   { es: 'tiene un formato no permitido', en: 'has an unsupported format' }
  };
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'es';
  const t = k => T[k][lang()];

  /* ---------- Carga de archivos ---------- */
  function initDrop(drop) {
    const input = drop.querySelector('input[type=file]');
    const list = document.querySelector('#' + drop.dataset.list);
    const store = [];

    const size = b => b < 1024*1024 ? Math.max(1, Math.round(b/1024)) + ' KB' : (b/1048576).toFixed(1) + ' MB';

    function render() {
      list.innerHTML = '';
      store.forEach((f, i) => {
        const li = document.createElement('li');
        const bad = f.__bad;
        li.innerHTML = '<span class="fn"></span><span class="fs"></span>' +
                       '<button type="button" aria-label="Quitar archivo">&times;</button>';
        li.querySelector('.fn').textContent = f.name + (bad ? ' — ' + bad : '');
        if (bad) li.querySelector('.fn').style.color = '#B3261E';
        li.querySelector('.fs').textContent = size(f.size);
        li.querySelector('button').addEventListener('click', () => { store.splice(i, 1); render(); });
        list.appendChild(li);
      });
      drop.closest('.field').dataset.count = store.filter(f => !f.__bad).length;
    }

    function add(files) {
      [...files].forEach(f => {
        const ext = (f.name.split('.').pop() || '').toLowerCase();
        if (f.size > MAX_MB * 1048576) f.__bad = t('big');
        else if (!OK_EXT.includes(ext)) f.__bad = t('ext');
        store.push(f);
      });
      render();
    }

    drop.addEventListener('click', () => input.click());
    drop.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
    input.addEventListener('change', () => add(input.files));
    ['dragenter','dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
    ['dragleave','drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
    drop.addEventListener('drop', e => add(e.dataTransfer.files));
  }
  document.querySelectorAll('.drop').forEach(initDrop);

  /* ---------- Validación ---------- */
  function showErr(field, msg) {
    const box = field.querySelector('.errmsg');
    const ctrl = field.querySelector('input,select,textarea');
    if (box) { box.textContent = msg; box.classList.add('on'); }
    if (ctrl) { ctrl.classList.add('err'); ctrl.setAttribute('aria-invalid', 'true'); }
  }
  function clearErr(field) {
    const box = field.querySelector('.errmsg');
    const ctrl = field.querySelector('input,select,textarea');
    if (box) box.classList.remove('on');
    if (ctrl) { ctrl.classList.remove('err'); ctrl.removeAttribute('aria-invalid'); }
  }

  function validate(scope) {
    let ok = true, first = null;
    scope.querySelectorAll('.field').forEach(field => {
      clearErr(field);
      const ctrl = field.querySelector('input,select,textarea');
      const group = field.querySelector('.opts');

      if (group && group.dataset.required !== undefined) {
        if (!group.querySelector('input:checked')) { showErr(field, t('pick')); ok = false; first = first || field; }
        return;
      }
      if (!ctrl || !ctrl.hasAttribute('data-required')) return;

      const v = (ctrl.value || '').trim();
      if (ctrl.type === 'checkbox') {
        if (!ctrl.checked) { showErr(field, t('consent')); ok = false; first = first || field; }
      } else if (!v) {
        showErr(field, t('req')); ok = false; first = first || field;
      } else if (ctrl.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        showErr(field, t('email')); ok = false; first = first || field;
      } else if (ctrl.type === 'tel' && v.replace(/\D/g, '').length < 10) {
        showErr(field, t('tel')); ok = false; first = first || field;
      }
    });
    if (first) {
      first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const c = first.querySelector('input,select,textarea');
      if (c) setTimeout(() => c.focus({ preventScroll: true }), 320);
    }
    return ok;
  }
  document.addEventListener('input', e => {
    const f = e.target.closest && e.target.closest('.field');
    if (f && e.target.classList.contains('err')) clearErr(f);
  });

  /* ---------- Pasos ---------- */
  const form = document.querySelector('form[data-steps]');
  if (form) {
    const steps = [...form.querySelectorAll('.fstep')];
    const marks = [...document.querySelectorAll('.stepper li')];
    const back = form.querySelector('[data-back]');
    const next = form.querySelector('[data-next]');
    const send = form.querySelector('[data-send]');
    let i = 0;
    const opened = Date.now();

    function paint() {
      steps.forEach((s, n) => s.classList.toggle('active', n === i));
      marks.forEach((m, n) => {
        m.classList.toggle('done', n < i);
        if (n === i) m.setAttribute('aria-current', 'step'); else m.removeAttribute('aria-current');
      });
      back.style.visibility = i === 0 ? 'hidden' : 'visible';
      next.style.display = i === steps.length - 1 ? 'none' : '';
      send.style.display = i === steps.length - 1 ? '' : 'none';
      if (i === steps.length - 1) summary();
      window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
    }

    function summary() {
      const box = form.querySelector('.review dl');
      if (!box) return;
      box.innerHTML = '';
      form.querySelectorAll('.fstep:not(:last-child) .field').forEach(field => {
        const lab = field.querySelector('label, .legend');
        if (!lab) return;
        const ctrl = field.querySelector('input,select,textarea');
        let val = '';
        const picked = field.querySelector('.opts input:checked');
        if (picked) val = picked.closest('.opt').textContent.trim();
        else if (field.dataset.count) val = field.dataset.count + (lang() === 'en' ? ' file(s)' : ' archivo(s)');
        else if (ctrl && ctrl.type !== 'checkbox' && ctrl.type !== 'file') val = (ctrl.value || '').trim();
        if (!val) return;
        const dt = document.createElement('dt'); dt.textContent = lab.textContent.replace('*', '').trim();
        const dd = document.createElement('dd'); dd.textContent = val.length > 90 ? val.slice(0, 90) + '…' : val;
        box.append(dt, dd);
      });
    }

    next.addEventListener('click', () => { if (validate(steps[i])) { i++; paint(); } });
    back.addEventListener('click', () => { i--; paint(); });

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate(steps[i])) return;
      // Protección contra envíos automatizados: trampa oculta + tiempo mínimo
      if (form.querySelector('[name=website]').value || Date.now() - opened < 2500) return;
      const kind = form.dataset.kind || 'RFQ';
      const folio = kind + '-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
      try { sessionStorage.setItem('tt-folio', folio); sessionStorage.setItem('tt-kind', kind); } catch (err) {}
      location.href = 'confirmacion.html';
    });

    paint();
  }

  /* ---------- Formulario de un solo paso ---------- */
  document.querySelectorAll('form[data-single]').forEach(f => {
    const opened = Date.now();
    f.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate(f)) return;
      if (f.querySelector('[name=website]').value || Date.now() - opened < 2500) return;
      const kind = f.dataset.kind || 'REG';
      const folio = kind + '-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
      try { sessionStorage.setItem('tt-folio', folio); sessionStorage.setItem('tt-kind', kind); } catch (err) {}
      location.href = 'confirmacion.html';
    });
  });

  /* ---------- Confirmación ---------- */
  const folioEl = document.querySelector('[data-folio]');
  if (folioEl) {
    let f = 'RFQ-2026-0000', k = 'RFQ';
    try { f = sessionStorage.getItem('tt-folio') || f; k = sessionStorage.getItem('tt-kind') || k; } catch (err) {}
    folioEl.textContent = f;
    const kEl = document.querySelector('[data-kindlabel]');
    if (kEl) {
      const names = { RFQ:{es:'solicitud comercial',en:'commercial request'}, CV:{es:'postulación',en:'application'}, PRV:{es:'registro de proveedor',en:'supplier registration'} };
      if (names[k]) kEl.textContent = names[k][lang()];
    }
  }

  /* ---------- Filtros de listado ---------- */
  const grid = document.querySelector('[data-filterable]');
  if (grid) {
    const selects = [...document.querySelectorAll('.filter select')];
    const items = [...grid.children];
    const count = document.querySelector('.fcount');
    const empty = document.querySelector('.empty');

    function apply() {
      let n = 0;
      items.forEach(el => {
        const show = selects.every(s => !s.value || (el.dataset[s.dataset.key] || '') === s.value);
        el.style.display = show ? '' : 'none';
        if (show) n++;
      });
      if (count) count.textContent = n + (lang() === 'en' ? (n === 1 ? ' project' : ' projects') : (n === 1 ? ' proyecto' : ' proyectos'));
      if (empty) empty.classList.toggle('on', n === 0);
    }
    selects.forEach(s => s.addEventListener('change', apply));
    apply();
    document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setTimeout(apply, 30)));
  }
})();
