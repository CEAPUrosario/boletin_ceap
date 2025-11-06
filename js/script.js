document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Quita la clase activa de todos los botones y secciones
            buttons.forEach(b => b.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));

            // Activa el botón y la sección seleccionada
            btn.classList.add("active");
            const target = btn.dataset.section;
            document.getElementById(target).classList.add("active");
        });
    });
});
