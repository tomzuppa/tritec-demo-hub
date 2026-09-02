/* TRI-TEC HUB · Asistente de la demo.
   Responde por coincidencia sobre el catálogo real de TRI-TEC. En producción va con modelo
   y recuperación sobre el catálogo cargado en el CMS. Nunca afirma capacidad: la plantea
   en condicional y deriva a evaluación. */

(function () {
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'es';

  // ---- Base de conocimiento derivada del catálogo y materiales de TRI-TEC ----
  const KB = [
    {
      k: ['robot','cobot','automatiz','celda','plc','hmi','visión','vision','tooling','fixture','herramental','fastening','torque','atlas copco','fanuc','abb','kuka','servo','prensa','transportador','ensamble automat','machine tending','error proof','poka'],
      es: {
        t: 'Tooling, automatización e integración',
        b: 'Es una de las líneas donde TRI-TEC tiene mayor profundidad. Ha ejecutado proyectos de este tipo para operaciones automotrices de primer nivel, integrando bajo una sola gerencia:',
        li: ['Fixtures de ensamble, sistemas de sujeción y tooling flexible para variantes o nuevos programas',
             'Robots y cobots, PLC, HMI, programación y sistemas de visión',
             'Torque y fastening con integración Atlas Copco, servo prensas y transportadores',
             'Error-proofing, inspección por visión, metrología y trazabilidad'],
        n: 'El planteamiento de TRI-TEC es que el riesgo no está en cada componente sino en las interfaces entre disciplinas, por eso asume el alcance completo del concepto a producción.'
      },
      en: {
        t: 'Tooling, automation and integration',
        b: 'This is one of TRI-TEC’s deepest capabilities. It has delivered projects of this type for top-tier automotive operations, integrating under a single management:',
        li: ['Assembly fixtures, clamping systems and flexible tooling for variants or new programs',
             'Robots and cobots, PLC, HMI, programming and vision systems',
             'Torque and fastening with Atlas Copco integration, servo presses and conveyors',
             'Error-proofing, vision inspection, metrology and traceability'],
        n: 'TRI-TEC’s premise is that risk sits in the interfaces between disciplines, not in each component — hence it owns the full scope from concept to production.'
      }
    },
    {
      k: ['mantenimiento','preventivo','correctivo','predictivo','paro','falla','avería','averia','vibración','vibracion','termograf','lubricac','equipo crítico','equipo critico','confiabilidad','disponibilidad','qtb','laminación','laminacion'],
      es: {
        t: 'Mantenimiento industrial',
        b: 'TRI-TEC atiende mantenimiento preventivo, correctivo y predictivo sobre equipos críticos, además de mantenimiento predial e infraestructura. Su alcance típico incluye:',
        li: ['Programa anual con rutinas por equipo crítico y bitácora de intervenciones',
             'Análisis predictivo: vibración, termografía y análisis de aceite',
             'Diagnóstico de causa raíz con informe y plan de acción',
             'Mantenimiento preventivo QTB para mecanismos de tren de laminación'],
        n: 'El personal para trabajos de alto riesgo está respaldado con DC3, equipo de protección y material propio.'
      },
      en: {
        t: 'Industrial maintenance',
        b: 'TRI-TEC covers preventive, corrective and predictive maintenance on critical assets, plus facility maintenance and infrastructure. Typical scope includes:',
        li: ['Annual program with per-asset routines and intervention log',
             'Predictive analysis: vibration, thermography and oil analysis',
             'Root-cause diagnosis with report and action plan',
             'QTB preventive maintenance for rolling mill mechanisms'],
        n: 'Personnel for high-risk work is backed by DC3 certification, protective equipment and its own materials.'
      }
    },
    {
      k: ['personal','staffing','contratar','contratación','contratacion','gente','soldador','técnico','tecnico','operador','ingeniero','plantilla','repse','outsourcing','especializad','reclut','vacante','perfil'],
      es: {
        t: 'Servicios especializados de personal',
        b: 'TRI-TEC provee personal técnico especializado bajo registro REPSE vigente, con el alcance autorizado verificable. Cubre perfiles como:',
        li: ['Mantenimiento mecánico, eléctrico e instrumentación',
             'Gestión y supervisión de proyectos',
             'Ingeniería civil, de pintura y de proyectos',
             'Seguridad, EHS y entrenamiento'],
        n: 'Para dimensionar la solicitud hace falta saber el perfil, la cantidad, la ubicación de la planta y la fecha de arranque.'
      },
      en: {
        t: 'Specialized personnel services',
        b: 'TRI-TEC provides specialized technical personnel under current REPSE registration, with a verifiable authorized scope. Profiles include:',
        li: ['Mechanical, electrical and instrumentation maintenance',
             'Project management and supervision',
             'Civil, paint and project engineering',
             'Safety, EHS and training'],
        n: 'To size the request we need the profile, headcount, plant location and start date.'
      }
    },
    {
      k: ['seguridad','ehs','brigad','incendio','nfpa','espacios confinados','rescate','riesgo','osha','stps','altura','emergencia','primeros auxilios','capacitación','capacitacion','entrenamiento'],
      es: {
        t: 'Seguridad, EHS y entrenamiento',
        b: 'TRI-TEC gestiona seguridad en proyectos de construcción e instalación bajo NOM, OSHA, STPS, NFPA y ANSI. Incluye:',
        li: ['Planificación, supervisión, auditoría y análisis de riesgos',
             'Respuesta a emergencias, rescate en espacios confinados y formación de brigadistas',
             'Mantenimiento de red contra incendios y evaluación NFPA 101',
             'Entrenamiento en alturas, espacios confinados, corte y soldadura, y primeros auxilios'],
        n: 'La operación conjunta México–Estados Unidos acumula 13 años sin accidentes graves ni fatalidades reportadas.'
      },
      en: {
        t: 'Safety, EHS and training',
        b: 'TRI-TEC manages safety on construction and installation projects under NOM, OSHA, STPS, NFPA and ANSI. It covers:',
        li: ['Planning, supervision, auditing and risk analysis',
             'Emergency response, confined-space rescue and brigade training',
             'Fire network maintenance and NFPA 101 assessment',
             'Training in work at height, confined spaces, cutting and welding, and first aid'],
        n: 'The joint Mexico–US operation reports 13 years with no serious accidents or fatalities.'
      }
    },
    {
      k: ['obra','civil','construc','cimentac','estructura','adecuac','desmantel','instalación','instalacion','eléctric','electric','hidrosanitar','impermeabiliz','recubrimiento','epóxic','epoxic','piso','nave','edificio','remodelac'],
      es: {
        t: 'Proyectos de ingeniería y obra civil',
        b: 'TRI-TEC ejecuta intervenciones en planta con alcance definido y control de cambios:',
        li: ['Adecuaciones e implementación en sitio',
             'Mantenimiento mayor e infraestructura industrial',
             'Instalaciones eléctricas, hidráulicas y pluviales según alcance',
             'Desmantelamientos y liberación de áreas',
             'Recubrimientos epóxicos, poliuretano y concreto pulido'],
        n: 'Cada proyecto cierra con avance por hitos, evidencia de ejecución, control de cambios autorizados y área liberada contra criterios de aceptación.'
      },
      en: {
        t: 'Engineering projects and civil works',
        b: 'TRI-TEC executes in-plant interventions with defined scope and change control:',
        li: ['On-site adaptations and implementation',
             'Major maintenance and industrial infrastructure',
             'Electrical, hydraulic and stormwater installations per scope',
             'Dismantling and area release',
             'Epoxy, polyurethane and polished concrete coatings'],
        n: 'Every project closes with milestone progress, execution evidence, authorized change control and released area against acceptance criteria.'
      }
    },
    {
      k: ['limpieza','residuo','peligroso','poda','área verde','area verde','plaga','jardin','predial','comedor','sanitario'],
      es: {
        t: 'Servicios de mantenimiento predial',
        b: 'Dentro de su oferta de servicios especializados, TRI-TEC atiende:',
        li: ['Mantenimiento predial preventivo y correctivo en comedores, sanitarios, cuartos eléctricos, talleres, almacenes y patios',
             'Gestión y manejo de residuos peligrosos, con separación adecuada',
             'Limpieza general de instalaciones, poda y estética de áreas verdes',
             'Control de plagas'],
        n: 'Suele contratarse junto con mantenimiento industrial dentro de un mismo alcance.'
      },
      en: {
        t: 'Facility maintenance services',
        b: 'Within its specialized services offering, TRI-TEC covers:',
        li: ['Preventive and corrective facility maintenance in canteens, restrooms, electrical rooms, workshops, warehouses and yards',
             'Hazardous waste management with proper segregation',
             'General cleaning, pruning and green-area upkeep',
             'Pest control'],
        n: 'It is usually contracted together with industrial maintenance under a single scope.'
      }
    },
    {
      k: ['certificac','iso','repse vigente','avetta','necsus','duns','d-u-n-s','esr','cumplimiento','alta de proveedor','documento','constancia','vigencia'],
      es: {
        t: 'Registros y cumplimiento',
        b: 'Para el alta como proveedor, TRI-TEC mantiene:',
        li: ['Registro REPSE ante la STPS con alcance autorizado',
             'ISO 9001 y certificaciones técnicas del personal',
             'Registro en plataformas de proveedores: AVETTA y NECSUS',
             'Número D-U-N-S y distintivo ESR',
             'Cumplimiento STPS, OSHA y NFPA'],
        n: 'Respaldo financiero de USD 30 millones y pólizas de responsabilidad civil y profesional por USD 1 millón cada una.'
      },
      en: {
        t: 'Registrations and compliance',
        b: 'For supplier onboarding, TRI-TEC maintains:',
        li: ['REPSE registration with the STPS and authorized scope',
             'ISO 9001 and technical personnel certifications',
             'Registration on supplier platforms: AVETTA and NECSUS',
             'D-U-N-S number and ESR distinction',
             'STPS, OSHA and NFPA compliance'],
        n: 'USD 30 million in financial backing plus general and professional liability policies of USD 1 million each.'
      }
    },
    {
      k: ['ofrecer','proveedor','vender','somos','mi empresa ofrece','quiero trabajar','registrarme','darme de alta','subcontrat'],
      es: {
        t: 'Registro de proveedores',
        b: 'Si su empresa quiere ofrecer servicios o materiales a TRI-TEC, el registro es el canal correcto. Se solicita:',
        li: ['Categoría de proveeduría y descripción de lo que ofrece',
             'Datos fiscales y de contacto',
             'Documentación: constancia de situación fiscal, opinión de cumplimiento y certificaciones',
             'Registro REPSE si presta servicios especializados de personal'],
        n: 'Una vez registrado, su perfil queda disponible para cruzarse con las solicitudes que TRI-TEC recibe.'
      },
      en: {
        t: 'Supplier registration',
        b: 'If your company wants to offer services or materials to TRI-TEC, registration is the right channel. Required:',
        li: ['Supply category and description of your offering',
             'Tax and contact details',
             'Documentation: tax status certificate, compliance opinion and certifications',
             'REPSE registration if you provide specialized personnel services'],
        n: 'Once registered, your profile becomes available to be matched against the requests TRI-TEC receives.'
      }
    }
  ];

  const T = {
    intro: {
      es: '<p>Hola. Soy el asistente de TRI-TEC. Puedo decirle si lo que necesita entra en lo que TRI-TEC ejecuta, y conectarlo con el área correcta.</p><p>Descríbame su necesidad en sus palabras — no hace falta que sepa cómo se llama el servicio.</p>',
      en: '<p>Hello. I am the TRI-TEC assistant. I can tell you whether what you need falls within what TRI-TEC delivers, and connect you with the right area.</p><p>Describe your need in your own words — you do not need to know the name of the service.</p>'
    },
    none: {
      es: '<p>No encuentro esa necesidad dentro de lo que TRI-TEC tiene documentado, y prefiero no afirmar una capacidad que no puedo confirmar.</p><p>Aun así, su oferta es amplia y este asistente solo consulta el catálogo publicado. Lo mejor es plantearlo directamente: si entra en su alcance, se lo confirman en la primera respuesta.</p>',
      en: '<p>I cannot find that need within what TRI-TEC has documented, and I would rather not claim a capability I cannot confirm.</p><p>That said, their offering is broad and this assistant only consults the published catalogue. Best to raise it directly: if it is within scope, they confirm in their first reply.</p>'
    },
    cta: { es: 'Plantear el requerimiento', en: 'Submit the requirement' },
    cta2: { es: 'Registrarme como proveedor', en: 'Register as a supplier' },
    hedge: {
      es: 'Esto se basa en el catálogo publicado de TRI-TEC. El alcance definitivo se confirma en una evaluación.',
      en: 'This is based on TRI-TEC’s published catalogue. Final scope is confirmed during an evaluation.'
    }
  };

  function el(html) { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; }

  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function match(q) {
    const n = norm(q);
    let best = null, score = 0;
    KB.forEach(entry => {
      let s = 0;
      entry.k.forEach(k => { if (n.includes(norm(k))) s += k.length; });
      if (s > score) { score = s; best = entry; }
    });
    return score > 0 ? best : null;
  }

  /* Inicializa una instancia de chat sobre un contenedor .chat */
  function init(root) {
    const log = root.querySelector('.chat-log');
    const form = root.querySelector('.chat-form');
    const input = form && form.querySelector('input');
    const chips = root.querySelector('.chips');
    if (!log || !form) return;

    const scroll = () => { log.scrollTop = log.scrollHeight; };

    function bot(html) {
      log.appendChild(el('<div class="msg bot"><div class="av">TT</div><div class="bubble">' + html + '</div></div>'));
      scroll();
    }
    function me(text) {
      const d = el('<div class="msg me"><div class="av">TÚ</div><div class="bubble"></div></div>');
      d.querySelector('.bubble').textContent = text;
      log.appendChild(d); scroll();
    }
    /* Estados de proceso: se ve lo que el asistente está haciendo */
    function thinking() {
      const L = lang();
      const steps = L === 'en'
        ? ['Reading the request', 'Searching TRI-TEC’s catalogue', 'Preparing the answer']
        : ['Analizando la solicitud', 'Consultando el catálogo de TRI-TEC', 'Preparando la respuesta'];
      const t = el('<div class="msg bot"><div class="av">TT</div><div class="bubble thinking"><span class="scan" aria-hidden="true"></span><span class="st"></span></div></div>');
      const st = t.querySelector('.st');
      let i = 0;
      st.textContent = steps[0];
      const timer = setInterval(() => {
        i++;
        if (i >= steps.length) return;
        st.style.opacity = 0;
        setTimeout(() => { st.textContent = steps[i]; st.style.opacity = 1; }, 180);
      }, 620);
      log.appendChild(t); scroll();
      return { node: t, stop: () => clearInterval(timer) };
    }

    /* Cursor al final mientras termina de aparecer la respuesta */
    function caret(node) {
      const last = node.querySelector('.bubble').lastElementChild;
      if (!last) return;
      last.classList.add('caret');
      setTimeout(() => last.classList.remove('caret'), 900);
    }

    function answer(q) {
      const t = thinking();
      setTimeout(() => {
        t.stop(); t.node.remove();
        const L = lang();
        const hit = match(q);
        if (!hit) {
          bot(T.none[L] + '<div class="acts"><a href="rfq.html">' + T.cta[L] + '</a></div>');
          caret(log.lastElementChild);
          return;
        }
        const d = hit[L];
        const isSupplier = hit.k.indexOf('proveedor') !== -1;
        let html = '<p><strong>' + d.t + '</strong></p><p>' + d.b + '</p><ul>' +
                   d.li.map(x => '<li>' + x + '</li>').join('') + '</ul>' +
                   '<p style="margin-top:10px">' + d.n + '</p>' +
                   '<p style="margin-top:10px;font-size:.75rem;color:var(--ink-3)">' + T.hedge[L] + '</p>';
        html += '<div class="acts">' +
                (isSupplier
                  ? '<a href="acceso.html?rol=proveedor">' + T.cta2[L] + '</a><a class="sec" href="proveedores.html">' + (L === 'en' ? 'Supplier registration' : 'Registro de proveedores') + '</a>'
                  : '<a href="rfq.html">' + T.cta[L] + '</a><a class="sec" href="acceso.html?rol=cliente">' + (L === 'en' ? 'Access my account' : 'Entrar a mi cuenta') + '</a>') +
                '</div>';
        bot(html);
        caret(log.lastElementChild);
      }, 1750);
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      me(q); input.value = ''; answer(q);
      if (chips) chips.style.display = 'none';
    });

    if (chips) {
      chips.addEventListener('click', e => {
        const b = e.target.closest('.chip-q');
        if (!b) return;
        me(b.textContent.trim()); answer(b.textContent.trim()); chips.style.display = 'none';
      });
    }

    bot(T.intro[lang()]);
  }

  document.querySelectorAll('.chat').forEach(init);

  /* Lanzador flotante */
  const fab = document.querySelector('.fab');
  const panel = document.querySelector('.fab-panel');
  if (fab && panel) {
    const close = panel.querySelector('.fab-close');
    const open = () => {
      panel.classList.add('open'); fab.style.display = 'none';
      const i = panel.querySelector('.chat-form input');
      if (i) setTimeout(() => i.focus(), 260);
    };
    const hide = () => { panel.classList.remove('open'); fab.style.display = ''; };
    fab.addEventListener('click', open);
    if (close) close.addEventListener('click', hide);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && panel.classList.contains('open')) hide(); });
  }
})();
