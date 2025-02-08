
let targetNumber;
let history = [];
let gameEnded = false;

// Iniciar un nuevo juego
function startNewGame() {
    // Generar un número aleatorio entre 1 y 100
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

    // Verificar si el número ingresado es correcto
    if (userGuess === targetNumber) {
        messageElement.textContent = '¡Felicidades! Adivinaste el número correctamente.';
        messageElement.style.color = 'green';
        endGame(true);
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

    // Guardar el intento y el mensaje
    history.push({ guess: userGuess, message: messageElement.textContent });

    // Mostrar el historial de intentos
    historyElement.innerHTML = '<strong>Historial de intentos:</strong><br>';
    history.forEach(entry => {
        historyElement.innerHTML += `<div class="guess">Número: ${entry.guess} - ${entry.message}</div>`;
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
