// Cargar configuración guardada al abrir la página
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const savedSize = localStorage.getItem('fontSize');
    const savedFont = localStorage.getItem('fontType');

    if (savedTheme) setTheme(savedTheme);
    if (savedSize) {
        document.body.style.setProperty('--base-size', savedSize + 'px');
        document.getElementById('fontSizeRange').value = savedSize;
    }
    if (savedFont) setFont(savedFont);
});

/*// Cambiar Tamaño de Fuente
document.getElementById('fontSizeRange').addEventListener('input', (e) => {
    const size = e.target.value;
    document.body.style.setProperty('--base-size', size + 'px');
    localStorage.setItem('fontSize', size);
});

// Cambiar Tema
function setTheme(theme) {
    document.body.classList.remove('dark', 'cream');
    if (theme !== 'light') document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
}

// Cambiar Fuente
function setFont(font) {
    if (font === 'dyslexic') {
        document.body.classList.add('font-dyslexic');
    } else {
        document.body.classList.remove('font-dyslexic');
    }
    localStorage.setItem('fontType', font);
}*/
// ==========================================
// CONFIGURACIÓN GLOBAL (MODO OSCURO, FUENTE, TAMAÑO)
// ==========================================

const aplicarConfiguracionGlobal = () => {
    // 1. TEMA
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.remove('dark', 'cream');
        if (savedTheme !== 'light') document.body.classList.add(savedTheme);
    }

    // 2. FUENTE
    const savedFont = localStorage.getItem('fontType');
    if (savedFont === 'dyslexic') {
        document.body.classList.add('font-dyslexic');
    }

    // 3. TAMAÑO DE LETRA
    const savedSize = localStorage.getItem('fontSize');
    if (savedSize) {
        document.body.style.setProperty('--base-size', savedSize + 'px');
        const slider = document.getElementById('fontSizeRange');
        if (slider) slider.value = savedSize;
    }
};

// Funciones Globales para los botones
window.setTheme = function(theme) {
    document.body.classList.remove('dark', 'cream');
    if (theme !== 'light') document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
};

window.setFont = function(font) {
    if (font === 'dyslexic') {
        document.body.classList.add('font-dyslexic');
    } else {
        document.body.classList.remove('font-dyslexic');
    }
    localStorage.setItem('fontType', font);
};

// ==========================================
// INICIALIZACIÓN Y EVENTOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    aplicarConfiguracionGlobal();

    // Lógica del Menú (Solo si existen los elementos)
    const menuBTN = document.getElementById("menuBTN");
    const linksNav = document.getElementById("linksNav");
    if (menuBTN && linksNav) {
        menuBTN.addEventListener("click", () => {
            linksNav.classList.toggle("active");
            menuBTN.innerHTML = linksNav.classList.contains("active") ? "X" : "☰";
        });
    }

    // Lógica del Slider de Fuente (Solo en Ajustes.html)
    const fontSizeRange = document.getElementById('fontSizeRange');
    if (fontSizeRange) {
        fontSizeRange.addEventListener('input', (e) => {
            const size = e.target.value;
            document.body.style.setProperty('--base-size', size + 'px');
            localStorage.setItem('fontSize', size);
        });
    }

    // Lógica del Buscador
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            const texto = e.target.value.toLowerCase();
            const navLinks = document.querySelectorAll(".links-nav a");
            navLinks.forEach(link => {
                const contenido = link.textContent.toLowerCase();
                link.parentElement.style.display = contenido.includes(texto) ? "block" : "none";
            });
        });
    }
    
});