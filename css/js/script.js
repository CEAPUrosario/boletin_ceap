// --- Control de navegación entre secciones ---
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Desactivar todos los botones
    navButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Mostrar la sección correspondiente
    const target = button.getAttribute('data-section');
    sections.forEach(section => {
      if (section.id === target) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  });
});
