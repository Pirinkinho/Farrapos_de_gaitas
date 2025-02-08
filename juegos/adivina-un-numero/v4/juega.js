// Generar un número aleatorio entre 1 y 100
let targetNumber;
let history = [];
let gameEnded = false;

// Iniciar un nuevo juego
function startNewGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    history = [];
    gameEnded = false;
    document.getElementById('message').textContent = '';
    document.getElementById('history').innerHTML = '';
    document.getElementById('end-game').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('guess').disabled = false;
}

// Función que se ejecuta cuando el jugador hace clic en el botón
function checkGuess() {
    if (gameEnded) return;

    const userGuess = parseInt(document.getElementById('guess').value);
    const messageElement = document.getElementById('message');
    const historyElement = document.getElementById('history');

    let attemptMessage = '';
    let color = '';

    // Verificar si el número ingresado es correcto
    if (userGuess === targetNumber) {
        messageElement.textContent = `¡Felicidades! Adivinaste el número correctamente. El nº era: ${targetNumber}.`;
        messageElement.style.color = 'green';
        endGame(true);
        return;}
    else if (userGuess <= 0 | userGuess >= 100) {
            messageElement.textContent = 'Por favor, ingresa un número válido.';
            messageElement.style.color = 'orange';
    } else if (userGuess < targetNumber) {
        attemptMessage = 'Demasiado bajo. Intenta con un número más grande.';
        color = 'blue';  // Color azul cuando es demasiado bajo
    } else  if (userGuess > targetNumber) {
        attemptMessage = 'Demasiado alto. Intenta con un número más pequeño.';
        color = 'red';   // Color rojo cuando es demasiado alto
    } 
    // Guardar el intento con el color
    history.push({ guess: userGuess, message: attemptMessage, color: color });

    // Mostrar el historial de intentos
    historyElement.innerHTML = '<strong>Historial de intentos:</strong><br>';
    history.forEach(entry => {
        historyElement.innerHTML += `<div class="guess" style="color:${entry.color}">Número: ${entry.guess} - ${entry.message}</div>`;
    });

    // Limpiar el campo de entrada después de cada intento
    document.getElementById('guess').value = '';
}

// Función que termina el juego y muestra el mensaje final
function endGame(success) {
    gameEnded = true;
    document.getElementById('game-container').style.display = 'none';
    const endMessage = success ? '¡Has ganado! Felicidades, adivinaste el número.' : 'Fin del juego. ¡Inténtalo de nuevo!';
    document.getElementById('end-message').textContent = endMessage;
    document.getElementById('end-game').style.display = 'block';
    document.getElementById('guess').disabled = true;
}

// Función que reinicia el juego
function restartGame() {
    startNewGame();
}

// Función que sale del juego
function exitGame() {
    window.close();
}

// Iniciar un nuevo juego cuando la página se carga
startNewGame();
