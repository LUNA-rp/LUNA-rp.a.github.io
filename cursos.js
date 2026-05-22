const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetPanel = tab.getAttribute('aria-controls');
        
        // Desactivar todas las pestañas
        tabs.forEach(t => {
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });
        
        // Ocultar todos los paneles
        panels.forEach(p => p.hidden = true);
        
        // Activar la seleccionada
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        document.getElementById(targetPanel).hidden = false;
    });
});

/*const contentItems = document.querySelectorAll(".contenido");

contentItems.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});*/