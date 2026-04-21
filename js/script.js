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
   apr1: { nombre: "Diversidad sexual y de género en el aula", modalidad: "Acceso Remoto", fechas: "22 al 24 de abril", start: "20260422T110000", end: "20260424T130000", reseña: "La creciente visibilidad de disidencias sexo-genéricas y personas LGBTIQ+ en espacios educativos ha significado, con frecuencia, desafíos a la labor docente que demandan la adquisición de lenguajes y herramientas que permitan abordar prácticas discriminatorias en razón de la orientación sexual y la identidad de género. Por ello, este curso brinda elementos conceptuales y prácticos, orientados a la construcción de aulas más inclusivas y respetuosas de la diversidad sexual y de géneros." },
    apr2: { nombre: "Emociónate y comunica desde la inteligencia", modalidad: "Presencial", fechas: "23 de abril al 07 de mayo", start: "20260423T080000", end: "20260507T100000", reseña: "Favorecer en los docentes de educación superior la capacidad de una comunicación asertiva y manejo adecuado de las emociones con sus estudiantes dentro del aula de clase, por medio de su participación en un taller que pretende reconocer la importancia de estos dos factores y la aplicación de estrategias prácticas." },
    apr3: { nombre: "Creatividad y bienestar en el aula", modalidad: "Presencial", fechas: "23 de abril", start: "20260423T150000", end: "20260423T150000", reseña: "Este curso propone la creatividad como una vía para el bienestar en el aula. Parte de la idea de que enseñar y aprender son experiencias atravesadas por lo emocional, y que el aula puede convertirse en un espacio de cuidado, expresión y regulación cuando se habilitan lenguajes distintos como los artísticos. A través de experiencias creativas sencillas y transferibles, el taller invita a los docentes a explorar estrategias que favorecen la conexión consigo mismos y con sus estudiantes." },
    may1: { nombre: "Nooc: competencias para la gestión de herramientas en aulas virtuales", modalidad: "Virtual", fechas: "11 de mayo al 11 de junio", start: "20260511T150000", end: "20260611T170000", reseña: "Como parte del Modelo de Formación de Competencias Digitales para la Docencia, en este curso usted aprenderá a usar con enfoque pedagógico diversos servicios y herramientas de Moodle en nivel intermedio, para orientarlos hacia la creación de experiencias de aprendizaje significativas a través del aula virtual. La ruta de aprendizaje es de autoselección e incluye un acompañamiento tecnopedagógico como apoyo para potenciar los conocimientos de los participantes que gestionan entornos educativos." },
    may2: { nombre: " Enseñar con pasión = Aprender con motivación", modalidad: "Presencial", fechas: "21 de mayo", start: "20260521T150000", end: "20260521T150000", reseña: "En este curso el profesor podrá comprender los mecanismos a través de los cuales funciona la motivación y cómo puede utilizarlos para incentivarse a sí mismo y de esta manera promover un clima estimulante en el aula que favorezca un aprendizaje entusiasta." }
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
    if (titulo === 'Protección de Datos Personales') {
        openHelpModal(titulo, `<div class="video-wrapper"><iframe src="https://drive.google.com/file/d/1Xe4E6d1Hdy3bmVDknELfixs6f_Hj2bbW/preview?usp=sharing" width="100%" height="480" frameborder="0"></iframe></div>`);
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
        openHelpModal("Contáctenos", `
            <div style="text-align:center; padding:30px;">
                <div style="font-size: 4rem; margin-bottom: 20px; animation: calendarBounce 2s infinite ease-in-out;">📩</div>
                <p style="font-size: 1rem; color: #555; margin-bottom: 25px; line-height: 1.5;">En el CEAP valoramos cada mensaje de nuestros profesores. Comparta con nosotros sus dudas, sugerencias, quejas o felicitaciones a través del siguiente botón.</p>
<p style="font-size: 1rem; color: #555; margin-bottom: 25px; line-height: 1.5;"> Y si tiene un tema o reflexión pedagógica que quiera publicar en el boletín, ¡lo invitamos a escribirnos!</p>
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
    const idsSecciones = ['inicio', 'recursos', 'evaluacion', 'criterium'];
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
    setTimeout(() => {
        const activeBtn = document.querySelector('.nav-btn.active');
        if (activeBtn) moveIndicator(activeBtn);
    }, 50);
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
window.verDetalleLanzamiento = function() {
    const titulo = "Lanzamiento: Comunidades de Aprendizaje y Práctica";
    
const htmlContenido = `
    <div class="lanzamiento-container" style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 25px; align-items: start;">
        
        <div class="video-section">
            <div class="video-wrapper" style="border-radius: 15px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); background: #000;">
                <iframe src="https://www.youtube.com/embed/-uqy2QwTzR4" 
                        width="100%" height="450" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
            </div>
        </div>

        <div class="info-section" style="display: flex; flex-direction: column; gap: 15px;">
            <div style="background: #fdf2e9; padding: 10px 15px; border-radius: 10px; border-left: 4px solid #F2B872;">
                <span style="font-size: 0.85rem; font-weight: 700; color: #735D49;">📅 CITA EDITORIAL</span>
                <p style="margin: 5px 0 0; font-size: 1rem; font-weight: 700; color: var(--primary-color);">23 de abril | 2:30 PM</p>
            </div>

            <p style="line-height: 1.6; font-size: 1rem; color: #333; text-align: justify;">
                Lo invitamos al lanzamiento de la obra <strong>"Comunidades de aprendizaje y práctica"</strong>, un texto fundamental coordinado por Milena Alcocer y Clara García que explora los retos del desarrollo profesoral.
            </p>

            <p style="line-height: 1.6; font-size: 0.95rem; color: #555;">
                Descubra esta y otras novedades académicas explorando el catálogo de la 
                <a href="https://editorial.urosario.edu.co/" target="_blank" style="color: var(--primary-color); font-weight: 700; text-decoration: underline;">
                    Editorial de la Universidad del Rosario
                </a>.
            </p>

            <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 10px;">
                <a href="https://editorial.urosario.edu.co/" target="_blank" class="btn-boletin" style="background: var(--primary-color); width: 100% !important; justify-content: center;">
                    Explorar Catálogo Editorial 📚
                </a>
                
                <a href="https://www.google.com/maps/search/Corferias+-+Bogot%C3%A1,+Colombia/@4.6298912,-74.0901729,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="btn-boletin" style="background: #2e7d32; width: 100% !important; justify-content: center;">
                    📍 Cómo llegar a Corferias (FILBo)
                </a>
            </div>
        </div>
    </div>
`;
    
    openHelpModal(titulo, htmlContenido);
};
window.abrirPopUpActividad = function(titulo, descripcion, tipoMedia, urlMedia) {
    let contenidoHTML = `<p style="line-height:1.6; margin-bottom:15px;">${descripcion}</p>`;

    if (tipoMedia === 'video') {
        contenidoHTML += `
            <div class="video-wrapper">
                <iframe src="${urlMedia}" width="100%" height="350" frameborder="0" allow="autoplay"></iframe>
            </div>`;
    } else if (tipoMedia === 'imagen') {
        contenidoHTML += `<img src="${urlMedia}" style="width:100%; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">`;
    }

    openHelpModal(titulo, contenidoHTML);
};
// Función para el intercambio de fotos del Carrete
window.actualizarFotoHomenaje = function(el) {
    const main = document.getElementById('fotoGrandeHomenaje');
    const todasLasMinis = document.querySelectorAll('.mini-h');

    if (!main) return;

    // Efecto de parpadeo suave al cambiar
    main.style.opacity = '0.4';

    setTimeout(() => {
        main.src = el.src;
        main.style.opacity = '1';

        // Resetear todas las miniaturas
        todasLasMinis.forEach(m => {
            m.style.border = '2px solid transparent';
            m.style.opacity = '0.6';
            m.style.transform = 'scale(1)';
        });

        // Resaltar la seleccionada
        el.style.border = '2px solid #fecb2f'; // Amarillo Rosario
        el.style.opacity = '1';
        el.style.transform = 'scale(1.05)';
    }, 200);
};
window.expandirFoto = function() {
    const fotoActual = document.getElementById('fotoGrandeHomenaje').src;
    const tituloActual = "Registro Fotográfico - Ceremonia al Legado";

    // Creamos el contenido del modal: la foto al 100% de la capacidad del modal
    const contenidoModal = `
        <div style="display: flex; justify-content: center; align-items: center; background: #000; border-radius: 15px; overflow: hidden; min-height: 300px;">
            <img src="${fotoActual}" style="max-width: 100%; max-height: 80vh; object-fit: contain;">
        </div>
        <p style="margin-top: 15px; text-align: center; color: #666; font-size: 0.9rem;">
            Use la 'X' superior para regresar al boletín
        </p>
    `;

    // Reutilizamos tu función existente para abrir modales
    if (typeof openHelpModal === "function") {
        openHelpModal(tituloActual, contenidoModal);
    }
};
