/* * -----------------------------------------------------------------------
 * ESTILOS CEAP - BOLETÍN DIGITAL
 * Limpio y optimizado para la transición de fade/slide.
 * -----------------------------------------------------------------------
 */

/* ---------- Reset y variables ---------- */
:root{
    --sidebar-width: 280px; 
    /* Color Secundario (Blanco - Tipografía principal) */
    --secondary-color: #ffffff; 
    /* Color de Acento (Gold/Oro Pálido - Botones, FAB, Links) */
    --accent: #C2A46C; 
    --player-height: 82px;

    --podcast-tab-height: 180px; 
    --podcast-tab-width: 30px; 
    --podcast-tab-width-hover: 120px; 
    
    --podcast-color: #004D40; /* Emerald Oscuro para elementos secundarios y pestaña */
}

*{box-sizing:border-box; margin:0; padding:0;}

html, body{
    height:100%;
    /* Tipografía: Roboto Serif para el cuerpo */
    font-family: "Roboto Serif", serif; 
    
    /* Imagen de fondo (Pearly White / 60%) */
    background-image: url("https://github.com/CEAPUrosario/boletin_ceap/blob/main/img/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(18).png?raw=true");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    /* Color del texto base (Blanco) */
    color: var(--secondary-color);
    /* Se mantiene hidden solo para asegurar que el scroll principal no exista */
    overflow-x: hidden; 
}

h2, h3 {
    /* FUENTE: PLAYFAIR DISPLAY para títulos elegantes */
    font-family: 'Playfair Display', serif; 
    color: var(--secondary-color);
}

h2 {
    font-size: 5rem; 
    font-weight: 500; 
    margin-bottom: 3rem; /* Reducido para mejor lectura */
}
/* Aseguramos que la lista de contacto del modal se vea bien */
.contact-list {
    list-style: none;
    padding-left: 0;
    margin-top: 1rem;
}
.contact-list li {
    margin-bottom: 0.5rem;
}

/* --- ESTILOS DE ARTÍCULO (NAVAPRESS STYLE) --- */

.article {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    /* Separador sutil color Emerald, casi transparente */
    border-bottom: 1px solid rgba(0, 77, 64, 0.15); 
}

.article-separator {
    border: none;
    border-top: 2px solid var(--accent); /* Color de Acento (Gold) */
    width: 100px; 
    margin: 1rem 0 3rem 0; 
}

.article-category {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em; 
    text-transform: uppercase;
    color: rgba(0, 77, 64, 0.6); /* Gris tenue con base Emerald */
    margin-bottom: 1.5rem; 
    display: block;
}

.article-body p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.article-body .read-more {
    display: inline-block;
    color: var(--accent); /* Color de Acento (Gold) */
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding-top: 0.5rem;
    transition: opacity 0.2s ease;
}

.article-body .read-more:hover {
    opacity: 0.8;
}

/* Ajuste para Títulos en Móvil (h2) */
@media (max-width: 768px) {
    h2 {
        font-size: 2.5rem; /* Ajuste para que se vea mejor en móvil */
        margin-bottom: 1.5rem;
    }
}

/* ---------- SIDEBAR IZQUIERDO ---------- */
.sidebar{
    position: fixed;
    top:0;
    left:0;
    width: var(--sidebar-width);
    height: calc(100vh - var(--player-height)); 
    background: none; 
    padding: 1.2rem .8rem;
    z-index:1200;
    display:flex;
    flex-direction:column;
}

.sidebar-logo {
    margin-bottom: 1rem;
    flex-shrink: 0; 
}

.sidebar .logo-img{
    width: 100%;
    display:block;
}

.sidebar .brand-text{
    font-size:.78rem;
    text-align:center;
    color: var(--secondary-color);
    display:block;
}

.sidebar-nav {
    flex-grow: 1; 
    display: flex;
    flex-direction: column;
    justify-content: space-evenly; 
    align-items: center;
}

.sidebar .nav-btn{
    width:90%; 
    background:transparent; 
    color: var(--secondary-color); 
    border: 2px solid var(--secondary-color); 
    padding:.7rem 1rem; 
    margin: .3rem 0; 
    text-align:center; 
    border-radius:8px;
    font-weight:600;
    cursor:pointer;
    transition: all .18s ease;
}

.sidebar .nav-btn:hover,
.sidebar .nav-btn:focus{
    background: var(--secondary-color);
    color: var(--podcast-color); /* Color Emerald para el texto al hacer hover */
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15); 
}

.sidebar .nav-btn.active{
    background: var(--secondary-color);
    color: var(--podcast-color);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

/* ---------- MAIN CONTENT Y TRANSICIONES SIMPLIFICADAS ---------- */
main{
    margin-left: var(--sidebar-width);
    height: 100vh; 
    width: calc(100% - var(--sidebar-width)); 
    /* Espacio para el footer */
    padding:2rem 2.2rem calc(var(--player-height) + 1rem) 2.2rem;
    position: relative; 
    overflow-x: hidden;
    overflow-y: auto; /* Scroll dentro del main */
}

.content-card{
    width: 100%;
    max-width: 800px; /* Ancho máximo para mejor lectura */
    margin:0 auto;
    padding:0; 
}

.sections-wrapper {
    position: relative;
    /* La altura se ajusta por GSAP en JS */
    transition: height 0.4s ease-out; 
}

/* Cada sección es absoluta para superposición y animación */
.section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* Visibilidad y Opacidad inicial manejada por GSAP en JS */
    visibility: hidden; 
    pointer-events: none;
}

.section.active {
    /* Clases iniciales que se ajustan con GSAP */
    visibility: visible;
    pointer-events: all;
}


/* ---------- REPRODUCTOR FIJO (BASE) ---------- */
.fixed-player{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    background:#000;
    z-index:1400;
}
.fixed-player iframe{
    width:100%;
    height: var(--player-height);
    border:none;
}

/* ---------- FAB BUTTON y MODAL ---------- */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); } 
    100% { transform: scale(1); }
}

.help-fab{
    position:fixed;
    bottom: calc(var(--player-height) + 20px);
    right:20px;
    width:56px;
    height:56px;
    border-radius:50%;
    background:var(--accent); 
    color:white;
    font-size:24px;
    cursor:pointer;
    box-shadow:0 8px 24px rgba(0,0,0,0.25);
    z-index:1500;
    transition: all 0.2s ease-out;
    display:flex;
    align-items:center;
    justify-content:center;
    border: none;
}

.help-fab:hover {
    transform: scale(1.05); 
    box-shadow: 0 10px 30px rgba(0,0,0,0.4); 
    animation: none; /* Quitamos la animación de pulso al hover si no se desea */
}

.modal-backdrop{
    position:fixed; inset:0;
    background: rgba(0,0,0,0.45);
    display:flex;
    align-items:center;
    justify-content:center;
    visibility:hidden;
    opacity:0;
    z-index:1600;
    transition:opacity .25s ease, visibility .25s ease;
}

.modal-backdrop.open{
    visibility:visible;
    opacity:1;
}

.modal{
    background:white;
    padding:2rem;
    width:min(550px, 94%);
    border-radius:14px;
    position:relative;
    color: #004D40; /* Texto en Emerald para contraste en fondo blanco */
    transform: translateY(20px);
    transition: transform 0.3s ease-out;
}

.modal-backdrop.open .modal {
    transform: translateY(0);
}

.modal .close-btn{
    position:absolute;
    top:12px;
    right:12px;
    font-size:20px;
    background:none;
    border:none;
    cursor:pointer;
    color: #004D40; 
}

/* ---------- PESTAÑA DERECHA (PODCAST) ---------- */
.podcast-tab{
    position:fixed;
    right:0;
    top:65%;
    transform:translateY(-50%);
    background:var(--podcast-color); 
    color:white; 
    padding:.6rem;
    width:var(--podcast-tab-width);
    height:var(--podcast-tab-height); 
    border-radius:8px 0 0 8px;
    display:flex;
    align-items:center;
    justify-content:center; 
    overflow:hidden;
    cursor:pointer;
    transition:width .25s ease;
    box-shadow: -4px 0 12px rgba(0,0,0,0.15);
    z-index:1300;
}

.podcast-rotated{
    transform: rotate(-90deg); 
    white-space:nowrap;
    font-size:.8rem;
    font-weight: bold; 
}

/* **AJUSTE CRUCIAL DE FLEXBOX AQUÍ** */
.podcast-icons{
    display:none;
    flex-direction:column;
    gap:10px;
    align-items:center;
    justify-content: space-evenly;
    width: 100%;
}

.podcast-tab:hover{
    width:var(--podcast-tab-width-hover); 
    /* Alinea el contenido internamente al hacer hover */
    justify-content: flex-start; 
}

.podcast-tab:hover .podcast-rotated{
    display:none;
}

.podcast-tab:hover .podcast-icons{
    display:flex; /* Mostrar los íconos apilados verticalmente */
}
