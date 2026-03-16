// ============================================================
// 1. CONFIGURACIÓN Y BASE DE DATOS
// ============================================================
const INSCRIPCION_LINK = "https://appsweb01.urosario.edu.co/cursos_profesorales/";

const nombreMeses = {
    jan: "Enero", feb: "Febrero", mar: "Marzo", apr: "Abril", 
    may: "Mayo", jun: "Junio", jul: "Julio", aug: "Agosto", 
    sep: "Septiembre", oct: "Octubre", nov: "Noviembre", dec: "Diciembre"
};

const cursosDb = {
    mar1: { nombre: "Didáctica y Nuevas Tecnologías", modalidad: "Virtual", fechas: "01 al 15 de marzo", start: "20260301T090000", end: "20260301T110000", reseña: "Integración de herramientas digitales para dinamizar el aula..." },
    mar2: { nombre: "Evaluación por Competencias", modalidad: "Presencial", fechas: "05 al 10 de marzo", start: "20260305T140000", end: "20260305T160000", reseña: "Diseño de instrumentos de evaluación de alta calidad..." },
    mar3: { nombre: "Escritura Académica", modalidad: "Híbrida", fechas: "12 al 20 de marzo", start: "20260312T090000", end: "20260312T110000", reseña: "Estrategias de redacción y publicación en revistas indexadas..." },
    mar4: { nombre: "Liderazgo Educativo", modalidad: "Virtual", fechas: "18 al 25 de marzo", start: "20260318T150000", end: "20260318T170000", reseña: "Gestión de grupos y resolución de conflictos en el aula..." },
    mar5: { nombre: "Gamificación", modalidad: "Virtual", fechas: "25 al 30 de marzo", start: "20260325T080000", end: "20260325T100000", reseña: "Mecánicas de juego aplicadas al aprendizaje universitario..." },
    apr1: { nombre: "IA Generativa en el Aula", modalidad: "Presencial", fechas: "02 al 08 de abril", start: "20260402T100000", end: "20260402T120000", reseña: "Uso práctico de modelos de lenguaje en la labor docente..." },
    apr2: { nombre: "Diseño Instruccional", modalidad: "Virtual", fechas: "10 al 18 de abril", start: "20260410T140000", end: "20260410T160000", reseña: "Modelos para estructurar sílabos efectivos y modernos..." },
    apr3: { nombre: "Debates en Clase", modalidad: "Presencial", fechas: "15 al 22 de abril", start: "20260415T110000", end: "20260415T130000", reseña: "Técnicas de moderación y argumentación para estudiantes..." },
    apr4: { nombre: "Inclusión DUA", modalidad: "Virtual", fechas: "22 al 28 de abril", start: "20260422T080000", end: "20260422T100000", reseña: "Diseño Universal para el Aprendizaje y diversidad..." },
    apr5: { nombre: "Grupos Grandes", modalidad: "Híbrida", fechas: "25 al 30 de abril", start: "20260425T150000", end: "20260425T170000", reseña: "Estrategias pedagógicas para clases masivas..." }
};

const edicionesDb = {
    "2024": [
        { num: 1, mes: "Mayo", url: "https://view.genially.com/65d609fc02fc23001485c6d3" },
        { num: 2, mes: "Julio", url: "https://view.genially.com/66576e1b83017e001439b92a/guide-boletin-ceap-2" },
        { num: 3, mes: "Septiembre", url: "https://view.genially.com/66576e24e13ee80015910065" },
        { num: 4, mes: "Noviembre", url: "https://view.genially.com/66ec71c33a7e60b9c0f1dc85" }
    ],
    "2025": [
        { num: 5, mes: "Marzo", url: "https://view.genially.com/66ec71ba3b8ea7c3778e3ba1/guide-boletin-ceap-5" },
        { num: 7, mes: "Julio", url: "https://view.genially.com/687a7017a53aa8a1fa884de2/interactive-content-boletin-ceap-7" },
        { num: 8, mes: "Septiembre", url: "https://view.genially.com/687a7628a53aa8a1fa8c605f/interactive-content-boletin-ceap-8" },
        { num: 9, mes: "Diciembre", url: "https://view.genially.com/687a7639e1934311030cd849/interactive-content-boletin-ceap-9" }
    ]
};

// ============================================================
// 2. ELEMENTOS DEL DOM
// ============================================================
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const featureCards = document.querySelectorAll('.feature-card');
const helpModal = document.getElementById('helpModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBodyText');
const navIndicator = document.querySelector('.nav-indicator');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navContainer = document.querySelector('.nav-container');

const darkModeToggle = document.getElementById('darkModeToggle');
const searchToggle = document.getElementById('searchToggle');
const searchBarContainer = document.getElementById('searchBarContainer');
const searchInput = document.getElementById('searchInput');
const closeSearch = document.getElementById('closeSearch');

// ============================================================
// 3. FUNCIONES DE CALENDARIO Y UI
// ============================================================
function getGoogleLink(c) {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("UR: " + c.nombre)}&dates=${c.start}/${c.end}&details=${encodeURIComponent(c.reseña + "\n\nInscripciones: " + INSCRIPCION_LINK)}&location=${encodeURIComponent(c.modalidad)}`;
}

function getOutlookLink(c) {
    return `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent("UR: " + c.nombre)}&startdt=${c.start}&enddt=${c.end}&body=${encodeURIComponent(c.reseña + "\n\nInscripciones: " + INSCRIPCION_LINK)}&location=${encodeURIComponent(c.modalidad)}`;
}

function getICalLink(c) {
    const iCalContent = [
        "BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT",
        `DTSTART:${c.start}`, `DTEND:${c.end}`,
        `SUMMARY:UR: ${c.nombre}`,
        `DESCRIPTION:${c.reseña}\\n\\nInscripciones: ${INSCRIPCION_LINK}`,
        `LOCATION:${c.modalidad}`, "END:VEVENT", "END:VCALENDAR"
    ].join("\n");
    const blob = new Blob([iCalContent], { type: 'text/calendar;charset=utf-8' });
    return URL.createObjectURL(blob);
}

const revealElements = () => {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
};

function updateProgressBar() {
    const scrollProgress = document.getElementById('scrollProgress');
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = progress + "%";
}

function moveIndicator(btn) {
    if(!navIndicator) return;
    const rect = btn.getBoundingClientRect();
    const navRect = btn.parentElement.getBoundingClientRect();
    navIndicator.style.width = `${rect.width}px`;
    navIndicator.style.left = `${rect.left - navRect.left}px`;
}

// ============================================================
// 4. LÓGICA DE NAVEGACIÓN Y ZETA
// ============================================================
function setActiveSection(id) {
    const targetSection = document.getElementById(id);
    if (!targetSection) return;
    sections.forEach(s => s.classList.remove('active', 'fade-in-up'));
    targetSection.classList.add('active', 'fade-in-up');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === id) {
            btn.classList.add('active');
            moveIndicator(btn);
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(revealElements, 100);
}

function filtrarContenido(termino) {
    featureCards.forEach(card => {
        const texto = card.innerText.toLowerCase();
        card.style.display = texto.includes(termino) ? '' : 'none';
    });
    const cursosFilas = document.querySelectorAll('.course-row-sidebar');
    cursosFilas.forEach(fila => {
        const texto = fila.innerText.toLowerCase();
        fila.style.display = texto.includes(termino) ? '' : 'none';
    });
}

if(searchToggle) {
    searchToggle.addEventListener('click', () => {
        searchBarContainer.classList.toggle('search-bar-hidden');
        if (!searchBarContainer.classList.contains('search-bar-hidden')) searchInput.focus();
    });
}
if(closeSearch) {
    closeSearch.addEventListener('click', () => {
        searchBarContainer.classList.add('search-bar-hidden');
        searchInput.value = '';
        filtrarContenido('');
        searchToggle.focus(); 
    });
}

if(searchInput) {
    searchInput.addEventListener('input', (e) => filtrarContenido(e.target.value.toLowerCase()));
}

const body = document.body;
if(darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const inner = card.querySelector('.card-inner-content');
        const rect = inner.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        inner.style.transform = `rotateX(${y * -15}deg) rotateY(${x * 15}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
        card.querySelector('.card-inner-content').style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
    card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-section');
        if (id) { e.preventDefault(); setActiveSection(id); }
    });
});

navButtons.forEach(btn => btn.addEventListener('click', () => setActiveSection(btn.getAttribute('data-section'))));

// ============================================================
// 5. MODALES Y ACORDEONES
// ============================================================

window.abrirDetalleLateral = function(idCurso) {
    const data = cursosDb[idCurso];
    if (!data) return;
    const content = document.getElementById('sidePanelContent');
    const sidePanel = document.getElementById('sideDetailPanel');
    if (!content || !sidePanel) return;

    content.innerHTML = `
        <h4 style="color:var(--primary-color); margin-bottom:15px; font-size:1.4rem;">${data.nombre}</h4>
        <p><strong>📍 Modalidad:</strong> ${data.modalidad || 'No especificada'}</p>
        <p><strong>📅 Fechas:</strong> ${data.fechas}</p>
        <hr style="margin:20px 0; border:0; border-top:1px solid #eee;">
        <p style="font-size:0.95rem; line-height:1.6;">${data.reseña}</p>
        <button class="btn-enroll" onclick="window.open('${INSCRIPCION_LINK}', '_blank')" style="margin-top:20px; width:100%;">Inscribirse ahora</button>
        <div style="display:flex; gap:15px; justify-content:center; align-items:center; margin-top:20px;">
            <a href="${getGoogleLink(data)}" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" style="width:30px;"></a>
            <a href="${getOutlookLink(data)}" target="_blank"><img src="https://res.cdn.office.net/assets/mail/pwa/v1/pngs/apple-touch-icon.png" style="width:30px;"></a>
            <a href="${getICalLink(data)}" download="${data.nombre}.ics"><img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Apple_Calendar_icon.svg" style="width:30px;"></a>
        </div>
    `;
    sidePanel.classList.add('active');
    document.body.style.overflow = 'hidden'; 
};

window.toggleSidePanel = function(show) {
    const sidePanel = document.getElementById('sideDetailPanel');
    if (sidePanel) {
        if (!show) {
            sidePanel.classList.remove('active');
            document.body.style.overflow = ''; 
        }
    }
};

window.toggleAcordeon = function(btn, event) {
    if (event) event.stopPropagation();
    const content = btn.nextElementSibling;
    btn.classList.toggle('active');
    content.classList.toggle('open');
};

function llenarAcordeonSidebar() {
    const contenedor = document.getElementById('listaCursosAcordeon');
    if (!contenedor) return;
    let html = '';
    const grupos = {};
    Object.keys(cursosDb).forEach(id => {
        const prefijo = id.substring(0, 3).toLowerCase();
        const nombreRealMes = nombreMeses[prefijo] || "Otros";
        if (!grupos[nombreRealMes]) grupos[nombreRealMes] = [];
        grupos[nombreRealMes].push({id, ...cursosDb[id]});
    });
    for (const mes in grupos) {
        html += `<div style="margin: 15px 10px;"><div style="background: var(--primary-color); color: white; padding: 8px; border-radius: 8px; font-size: 0.75rem; font-weight: 900; text-align: center; margin-bottom: 10px;">${mes.toUpperCase()}</div><div style="border-left: 2px solid #eee; padding-left: 15px;">`;
        grupos[mes].forEach(curso => {
            html += `<div class="course-row-sidebar" style="margin-bottom:12px;"><p style="font-size:0.85rem; font-weight:700; color: var(--primary-color); margin:0;">${curso.nombre}</p><div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;"><span style="font-size:0.75rem; color:#666;">📅 ${curso.fechas}</span><button class="btn-detail" onclick="abrirDetalleLateral('${curso.id}')">Info ℹ️</button></div></div>`;
        });
        html += `</div></div>`;
    }
    contenedor.innerHTML = html;
}

function openHelpModal(titulo, html) {
    modalTitle.innerText = titulo;
    modalBody.innerHTML = html;
    helpModal.classList.add("open");
}

window.openEventPopup = function(titulo, reseña) {
    if (titulo === 'Infografía: 10 Preguntas Clave') {
        openHelpModal(titulo, `<div class="video-wrapper"><iframe src="https://drive.google.com/file/d/1b4GXIea1rUBkJNFfAV62Y96nkX_4mTT4/preview" width="100%" height="480" frameborder="0"></iframe></div>`);
    } else if (titulo === 'Documento: Evaluación Integral') {
        openHelpModal(titulo, `<div class="video-wrapper"><iframe src="https://drive.google.com/file/d/1oamJgZksvJf44ERvDHUtKtsiMbq71DVX/preview" width="100%" height="480" frameborder="0"></iframe></div>`);
    } else if (titulo === 'Ediciones Anteriores') {
        // DISEÑO MAESTRO: BIBLIOTECA DE EDICIONES
        let html = '<div class="archive-master-container" style="padding: 10px;">';
        for (const ano in edicionesDb) {
            html += `
                <div class="archive-year-section" style="margin-bottom: 40px;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <span style="font-size: 1.8rem; font-weight: 900; color: var(--primary-color); opacity: 0.3;">${ano}</span>
                        <div style="flex: 1; height: 2px; background: linear-gradient(to right, #eee, transparent);"></div>
                    </div>
                    <div class="archive-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;">` +
                edicionesDb[ano].map(ed => `
                    <a href="${ed.url}" target="_blank" style="text-decoration: none; group;">
                        <div class="archive-item-card" style="background: #ffffff; border-radius: 20px; padding: 25px; border: 1px solid #f0f0f0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 4px 15px rgba(0,0,0,0.03); display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--vibrant-accent);"></div>
                            <div style="width: 60px; height: 60px; background: rgba(4, 57, 89, 0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                                <span style="font-size: 1.5rem;">📄</span>
                            </div>
                            <span style="color: var(--primary-color); font-weight: 800; font-size: 1.1rem; margin-bottom: 5px;">Edición #${ed.num}</span>
                            <span style="color: #888; font-size: 0.85rem; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">${ed.mes}</span>
                            <div style="margin-top: 15px; padding: 6px 15px; background: #f8f9fa; border-radius: 10px; font-size: 0.75rem; font-weight: 700; color: var(--primary-color);">Ver Boletín</div>
                        </div>
                    </a>`).join('') +
                '</div></div>';
        }
        openHelpModal("Archivo Histórico", html + '</div>');
    } else if (titulo === 'Contáctenos') {
        openHelpModal("¿Cómo podemos ayudarte?", `
            <div style="text-align:center; padding:30px;">
                <div style="font-size: 4rem; margin-bottom: 20px; animation: calendarBounce 2s infinite ease-in-out;">📩</div>
                <h4 style="color: var(--primary-color); margin-bottom: 15px; font-size: 1.3rem;">¡Estamos para escucharte!</h4>
                <p style="font-size: 1rem; color: #555; margin-bottom: 25px; line-height: 1.5;">Si tienes dudas sobre evaluación, IA o quieres colaborar con el CEAP, escríbenos:</p>
                <a href="mailto:ensenanzayaprendizaje@urosario.edu.co" style="background: var(--primary-color); color: white; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 5px 15px rgba(4, 57, 89, 0.3); transition: 0.3s;">Enviar correo al CEAP</a>
                <p style="margin-top: 25px; font-size: 0.8rem; color: #999;">Horario de atención: Lunes a viernes de 7:00 a.m. a 4:00 p.m.</p>
            </div>
        `);
    } else {
        openHelpModal(titulo, `<p style="line-height:1.7;">${reseña}</p>`);
    }
};

// ============================================================
// 6. EVENTOS Y RESPONSIVE (VERSIÓN MAESTRA FINAL)
// ============================================================

// 6.1 FAB DE CONTACTO
document.getElementById('helpFab').addEventListener("click", () => openEventPopup("Contáctenos", ""));
if (closeModal) {
    closeModal.addEventListener("click", () => { helpModal.classList.remove("open"); });
}

// 6.2 MENÚ HAMBURGUESA
function toggleMenu() {
    hamburgerBtn.classList.toggle('open');
    navContainer.classList.toggle('open');
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMenu);
}

navButtons.forEach(btn => btn.addEventListener('click', () => { 
    if (navContainer.classList.contains('open')) toggleMenu(); 
}));

// 6.3 REUBICACIÓN DEL PODCAST (MÓVIL VS ESCRITORIO)
function reubicarElementosMovil() {
    const podcast = document.querySelector('.podcast-side-tab');
    const sidebar = document.querySelector('.events-sidebar-right');
    if (window.innerWidth <= 768) {
        if (podcast && sidebar) {
            sidebar.appendChild(podcast);
            podcast.style.display = "block";
            podcast.style.position = "relative";
            podcast.style.left = "0";
            podcast.style.top = "0";
            podcast.style.transform = "none";
            podcast.style.width = "100%";
            podcast.style.marginTop = "30px";
        }
    } else {
        if (podcast) {
            document.body.appendChild(podcast);
            podcast.style.display = "flex";
            podcast.style.flexDirection = "row";
            podcast.style.position = "fixed";
            podcast.style.left = ""; 
            podcast.style.top = "50%";
            podcast.style.transform = "translateY(-50%)";
            podcast.style.width = "530px";
            podcast.style.marginTop = "0";
        }
    }
}

// 6.4 FLECHAS DE NAVEGACIÓN INTELIGENTES
function inyectarFlechasNavegacion() {
    const idsSecciones = ['inicio', 'recursos', 'evaluacion', 'criterium', 'diseno'];
    idsSecciones.forEach((id, index) => {
        if (id === 'inicio') return;
        const section = document.getElementById(id);
        if (!section) return;

        const existing = section.querySelector('.nav-arrows-container');
        if (existing) existing.remove();

        const container = document.createElement('div');
        container.className = 'nav-arrows-container reveal';

        if (index > 0) {
            const prevId = idsSecciones[index - 1];
            const navBtnPrev = document.querySelector(`.nav-btn[data-section="${prevId}"]`);
            const textoPrev = navBtnPrev ? navBtnPrev.innerText : "Atrás";
            const btnPrev = document.createElement('button');
            btnPrev.className = 'arrow-btn prev';
            btnPrev.innerHTML = `← ${textoPrev}`;
            btnPrev.onclick = () => setActiveSection(prevId);
            container.appendChild(btnPrev);
        }

        if (index < idsSecciones.length - 1) {
            const nextId = idsSecciones[index + 1];
            const navBtnNext = document.querySelector(`.nav-btn[data-section="${nextId}"]`);
            const textoNext = navBtnNext ? navBtnNext.innerText : "Siguiente";
            const btnNext = document.createElement('button');
            btnNext.className = 'arrow-btn next';
            btnNext.innerHTML = `${textoNext} →`;
            btnNext.onclick = () => setActiveSection(nextId);
            container.appendChild(btnNext);
        }

        const layout = section.querySelector('.magazine-layout') || section;
        layout.appendChild(container);
    });
}

// 6.5 CONTROLES DE ACCESIBILIDAD
const htmlElement = document.documentElement;
const btnIncrease = document.getElementById('increaseText');
const btnDecrease = document.getElementById('decreaseText');
const btnContrast = document.getElementById('highContrastToggle');
let fontLevel = 1; 

function updateFontSize() {
    htmlElement.classList.remove('font-sm', 'font-md', 'font-lg', 'font-xl');
    const levels = ['font-sm', 'font-md', 'font-lg', 'font-xl'];
    htmlElement.classList.add(levels[fontLevel]);
}

if(btnIncrease) btnIncrease.addEventListener('click', () => { if (fontLevel < 3) { fontLevel++; updateFontSize(); } });
if(btnDecrease) btnDecrease.addEventListener('click', () => { if (fontLevel > 0) { fontLevel--; updateFontSize(); } });

if(btnContrast) {
    btnContrast.addEventListener('click', () => {
        body.classList.toggle('high-contrast');
        if (body.classList.contains('high-contrast')) body.classList.remove('dark-mode');
    });
}

// 6.6 ARRANQUE MAESTRO
document.addEventListener('DOMContentLoaded', () => {
    llenarAcordeonSidebar();
    const activeBtn = document.querySelector('.nav-btn.active');
    if (activeBtn) moveIndicator(activeBtn);
    inyectarFlechasNavegacion(); 
    revealElements();
    updateProgressBar();
    reubicarElementosMovil();
    setActiveSection('inicio');
});

window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.nav-btn.active');
    if(activeBtn) moveIndicator(activeBtn);
    reubicarElementosMovil();
});
