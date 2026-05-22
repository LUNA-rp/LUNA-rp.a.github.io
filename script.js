const menuBTN = document.getElementById("menuBTN");
const linksNav = document.getElementById("linksNav");
const navLinks = document.querySelectorAll(".links-nav a");
const searchInput = document.getElementById("searchInput");
const searchBTN = document.getElementById("searchBTN");


menuBTN.addEventListener("click", () => {
    linksNav.classList.toggle("active");
    if(linksNav.classList.contains("active")){
        menuBTN.innerHTML="X";
        menuBTN.setAttribute("aria-expanded", "true")
    } else{
        menuBTN.innerHTML = "☰";
        menuBTN.setAttribute("aria-expanded", "false")
    }
});
navLinks.forEach(link =>{
    link.addEventListener("click", () => {
        linksNav.classList.remove("active");
        menuBTN.innerHTML ="☰";
        menuBTN.setAttribute("aria-expanded", "false");

    });
});

// BUSCADOR FUNCIONAL

searchInput.addEventListener("keyup", (e) => {
    const texto = e.target.value.toLowerCase();
    navLinks.forEach(link => {
        const contenido = link.textContent.toLowerCase();
        if (contenido.includes(texto)) {
            link.parentElement.style.display = "block";
        } else {
            link.parentElement.style.display = "none";
        }
    });
});

//icono de busqueda
searchBTN.addEventListener("click", () => {
    if(window.innerWidth <= 768){
        searchInput.classList.toggle("active");
        if(searchInput.classList.contains("active")){
            searchInput.focus();
        }
    }
});
searchInput.addEventListener("keyup", (e) => {
    const texto = e.target.value.toLowerCase();
    navLinks.forEach(link => {
        const contenido = link.textContent.toLowerCase();
        if(contenido.includes(texto)){
            link.parentElement.style.display = "block";
        }else{
            link.parentElement.style.display = "none";
        }
    });
});


// =========================
// MENU DESPLEGABLE CURSOS
// =========================

// =========================
// DROPDOWN CURSOS
// =========================

const dropdownBTN =
document.getElementById("dropdownBTN");
const dropdown =
document.querySelector(".dropdown");
dropdownBTN.addEventListener("click", () => {
    dropdown.classList.toggle("active");
    const expanded =
    dropdownBTN.getAttribute("aria-expanded")
    === "true";
    dropdownBTN.setAttribute(
        "aria-expanded",
        !expanded
    );

});;

document.addEventListener('keydown', function(e) {
    // 1. Lista de teclas que queremos controlar
    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (!keys.includes(e.key)) return;

    // 2. Bloqueamos el scroll natural de las flechas para que no se mueva la página
    e.preventDefault();

    // 3. Obtenemos todos los elementos interactivos que ya definiste en tu CSS
    const selectors = [
        '.links-nav a', '.dropdown-btn', '.dropdown-menu a', 
        '#searchInput', '.search-btn', '.course-card', 
        '.tab-item', '.contenido', '.btn-back', '.audio-btn', 
        '.num-btn', '#submitBtn', '.item-img'
    ];

    const focusables = Array.from(document.querySelectorAll(selectors.join(',')))
                            .filter(el => el.offsetWidth > 0 && el.offsetHeight > 0);

    const current = document.activeElement;
    let index = focusables.indexOf(current);

    // Si nada tiene el foco, empezamos por el primero
    if (index === -1) {
        focusables[0].focus();
        return;
    }

    // 4. Lógica de navegación mejorada
    let nextIndex;
    switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
            // Avanzar al siguiente elemento (hacia adelante o hacia abajo)
            nextIndex = (index + 1) % focusables.length;
            break;
        case "ArrowLeft":
        case "ArrowUp":
            // Regresar al elemento anterior (hacia atrás o hacia arriba)
            nextIndex = (index - 1 + focusables.length) % focusables.length;
            break;
    }

    if (nextIndex !== undefined) {
        focusables[nextIndex].focus();
    }
});
//ASISTENTE VIRTUAL

// ==========================================================================
// 1. CONFIGURACIÓN VISUAL GLOBAL
// ==========================================================================
const aplicarConfiguracionGlobal = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.remove('dark', 'cream');
        if (savedTheme !== 'light') document.body.classList.add(savedTheme);
    }

    const savedFont = localStorage.getItem('fontType');
    if (savedFont === 'dyslexic') {
        document.body.classList.add('font-dyslexic');
    }

    const savedSize = localStorage.getItem('fontSize');
    if (savedSize) {
        document.body.style.setProperty('--base-size', savedSize + 'px');
        const slider = document.getElementById('fontSizeRange');
        if (slider) slider.value = savedSize;
    }
};

// Funciones globales para botones HTML (onclick)
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

// ==========================================================================
// 2. DISPARADOR AL CARGAR LA PÁGINA
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar Modo Oscuro / Tamaños guardados
    aplicarConfiguracionGlobal();

    // Menú Hamburguesa Móvil
    const menuBTN = document.getElementById("menuBTN");
    const linksNav = document.getElementById("linksNav");
    if (menuBTN && linksNav) {
        menuBTN.addEventListener("click", () => {
            linksNav.classList.toggle("active");
            menuBTN.innerHTML = linksNav.classList.contains("active") ? "X" : "☰";
        });
    }

    // Buscador de tarjetas
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            const texto = e.target.value.toLowerCase();
            const tarjetas = document.querySelectorAll(".course-card");
            tarjetas.forEach(card => {
                const titulo = card.querySelector("h2")?.textContent.toLowerCase() || "";
                card.style.display = titulo.includes(texto) ? "block" : "none";
            });
        });
    }

    // Slider de Ajustes
    const fontSizeRange = document.getElementById('fontSizeRange');
    if (fontSizeRange) {
        fontSizeRange.addEventListener('input', (e) => {
            const size = e.target.value;
            document.body.style.setProperty('--base-size', size + 'px');
            localStorage.setItem('fontSize', size);
        });
    }

    // Activar Chatbot de forma segura
    inicializarChatbot();
});

// ==========================================================================
// 3. BLOQUE DEL ASISTENTE VIRTUAL
// ==========================================================================
function inicializarChatbot() {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    // SI FALTA UN SOLO ELEMENTO EN LA PÁGINA ACTUAL, SALIMOS SIN DAR ERROR
    if (!chatToggle || !chatWindow || !closeChat || !chatBody || !chatInput || !sendChatBtn) {
        return; 
    }

    // Función abrir / cerrar
    chatToggle.addEventListener('click', () => {
        if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
            chatWindow.style.display = 'flex';
            chatWindow.setAttribute('aria-hidden', 'false');
            chatInput.focus();
        } else {
            chatWindow.style.display = 'none';
            chatWindow.setAttribute('aria-hidden', 'true');
        }
    });

    // Botón de cerrar (X)
    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
        chatWindow.setAttribute('aria-hidden', 'true');
    });

    // Añadir burbujas de mensaje
    function agregarMensaje(texto, remitente) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('message', `${remitente}-message`);
        mensajeDiv.innerHTML = `<p>${texto}</p>`;
        chatBody.appendChild(mensajeDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Diccionario de respuestas
    function obtenerRespuestaBot(mensajeUsuario) {
        const msg = mensajeUsuario.toLowerCase().trim();
        if (msg.includes('hola') || msg.includes('buenos dias')) {
            return '¡Hola! Qué gusto saludarte. 😊 ¿En qué curso o duda te puedo asistir hoy?';
        }
        if (msg.includes('matematica')) {
            return 'El curso de **Matemáticas** está disponible en la página principal. ¡Haz clic en su tarjeta para iniciar!';
        }
        if (msg.includes('ingles')) {
            return '¡Excellent! El curso de **Inglés** te enseñará las bases del idioma de forma muy accesible.';
        }
        if (msg.includes('oscuro') || msg.includes('ajustes') || msg.includes('letra')) {
            return 'Puedes activar el Modo Oscuro o agrandar la letra yendo a la sección de **Ajustes** en el menú superior.';
        }
        if (msg.includes('gracias') || msg.includes('adios')) {
            return '¡De nada! Te deseo mucho éxito en tus estudios. 🚀';
        }
        return 'Recuerda que puedes consultarme sobre tus asignaturas (Matemáticas, Inglés, Ciencias) o sobre cómo usar la sección de Ajustes.';
    }

    // Enviar mensaje
    function procesarEnvio() {
        const texto = chatInput.value.trim();
        if (texto === '') return;

        agregarMensaje(texto, 'user');
        chatInput.value = '';

        setTimeout(() => {
            const respuesta = obtenerRespuestaBot(texto);
            agregarMensaje(respuesta, 'bot');
        }, 600);
    }

    sendChatBtn.addEventListener('click', procesarEnvio);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') procesarEnvio();
    });
}

//inicio de seción
// Coloca esto en la primera línea de tu archivo `script.js`
(function comprobarSesion() {
    // Si la persona está en index.html o cualquier página de cursos y no ha iniciado sesión
    const paginaActual = window.location.pathname.split("/").pop();
    const sesion = localStorage.getItem('sesionActiva');

    // Protegemos el index.html y Ajustes.html, pero no bloqueamos el propio login.html
    if (!sesion && paginaActual !== 'login.html' && paginaActual !== '') {
        window.location.href = 'login.html';
    }
})();