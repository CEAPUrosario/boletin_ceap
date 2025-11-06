// Controla el cambio de secciones
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Quitar clase "active" de todos los botones
            buttons.forEach(btn => btn.classList.remove("active"));
            // Activar botón actual
            button.classList.add("active");

            // Ocultar todas las secciones
            sections.forEach(section => section.classList.remove("active"));

            // Mostrar la sección seleccionada
            const sectionId = button.getAttribute("data-section");
            document.getElementById(sectionId).classList.add("active");

            // Desplazar hacia arriba al cambiar de sección
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
});
