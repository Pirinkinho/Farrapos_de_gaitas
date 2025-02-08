
// adivina-un-numero/v1/juega.js

console.log("El script juega.js se ha cargado correctamente.");


// Generar un número aleatorio entre 1 y 100
const targetNumber = Math.floor(Math.random() * 100) + 1;

// Función que se ejecuta cuando el jugador hace clic en el botón
function checkGuess() {
    const userGuess = parseInt(document.getElementById('guess').value);
    const messageElement = document.getElementById('message');

    // Verificar si el número ingresado es correcto
    if (userGuess === targetNumber) {
        messageElement.textContent = `¡Felicidades! Adivinaste el número correctamente. El nº es: ${targetNumber}.`;
        messageElement.style.color = 'green';
    } else if (userGuess < targetNumber) {
        messageElement.textContent = 'Demasiado bajo. Intenta con un número más grande.';
        messageElement.style.color = 'blue';
    } else if (userGuess > targetNumber) {
        messageElement.textContent = 'Demasiado alto. Intenta con un número más pequeño.';
        messageElement.style.color = 'red';
    } else {
        messageElement.textContent = 'Por favor, ingresa un número válido.';
        messageElement.style.color = 'orange';
    }

    // Limpiar el campo de entrada después de cada intento
    document.getElementById('guess').value = '';
}
