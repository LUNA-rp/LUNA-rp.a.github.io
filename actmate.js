const totalItems = 9; // Cantidad de barcos
let selectedNumber = null;

// Crear los barcos al cargar
const container = document.getElementById('itemsContainer');
for (let i = 0; i < totalItems; i++) {
    const img = document.createElement('img');
    img.src = 'https://plus.unsplash.com/premium_vector-1727956883812-636c0759f601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fGJhcmNvfGVufDB8fDB8fHww'; // Icono de barco
    img.className = 'item-img';
    img.onclick = function() { this.classList.toggle('clicked'); };
    container.appendChild(img);
}

// Función de audio (Voz sintética)
function playAudio(elementId) {
    const text = document.getElementById(elementId).innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
}

// Selección de números
function selectNumber(button) {
    // Quitar selección previa
    document.querySelectorAll('.num-btn').forEach(btn => btn.classList.remove('selected'));
    
    // Seleccionar nuevo
    button.classList.add('selected');
    selectedNumber = parseInt(button.innerText);
    
    // Habilitar botón enviar
    document.getElementById('submitBtn').disabled = false;
}

// Validar respuesta
function checkAnswer() {
    if (selectedNumber === totalItems) {
        document.getElementById('audioCorrect').play();
        alert("¡Excelente! Has contado correctamente.");
        location.reload(); // Reiniciar para jugar de nuevo
    } else {
        document.getElementById('audioError').play();
        alert("Casi... intenta contar de nuevo.");
    }
}
