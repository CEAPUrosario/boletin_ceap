// Elementos de la interfaz
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");
const helpFab = document.getElementById("helpFab");
const helpModal = document.getElementById("helpModal");
const closeModal = document.getElementById("closeModal");
const mainContent = document.getElementById("mainContent");
const sidebar = document.querySelector(".sidebar");

/**
 * Función para activar la sección de contenido y el botón de navegación correspondiente.
 * @param {string} sectionId - El ID de la sección a activar.
 */
function setActiveSection(sectionId) {
    // 1. Ocultar todas las secciones y desactivar todos los botones
    sections.forEach(s => s.classList.remove("active"));
    navButtons.forEach(btn => btn.classList.remove("active"));

    // 2. Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add("active");
    }

    // 3. Activar el botón de navegación
    const targetButton = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
    if (targetButton) {
        targetButton.classList.add("active");
        targetButton.setAttribute("aria-current", "page");
    }

    // 4. Mover el foco al inicio del contenido principal para mejorar la accesibilidad
    mainContent.focus();
}

/**
 * Función para abrir el modal de ayuda.
 */
function openHelpModal() {
    helpModal.classList.add("open");
    helpModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open"); // Para prevenir el scroll si es necesario

    // Enfocar el primer elemento interactivo dentro del modal
    const first = helpModal.querySelector("a, button");
    if (first) first.focus();
}

/**
 * Función para cerrar el modal de ayuda.
 */
function closeHelpModal() {
    helpModal.classList.remove("open");
    helpModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    helpFab.focus(); // Devolver el foco al botón FAB
}

/* -------- Inicialización y ajustes --------*/

// Asegurar que solo "inicio" esté visible al cargar
sections.forEach(s => s.classList.remove("active"));
document.getElementById("inicio").classList.add("active");

// Para asegurar que el mainContent es enfocable
mainContent.setAttribute("tabindex", "-1");

/* -------- Listeners de Eventos --------*/

// Listener para la navegación lateral
navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-section");
        setActiveSection(id);
    });
});

// Listeners para el Modal de Ayuda
helpFab.addEventListener("click", openHelpModal);
closeModal.addEventListener("click", closeHelpModal);

// Cerrar el modal al hacer click fuera de él
document.addEventListener("click", function (e) {
    if (e.target === helpModal) {
        closeHelpModal();
    }
});

// Cerrar el modal al presionar la tecla Escape
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && helpModal.classList.contains("open")) {
        closeHelpModal();
    }
});
