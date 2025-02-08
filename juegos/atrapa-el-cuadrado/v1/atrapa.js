let score = 0;
let timeLeft = 30;
let gameInterval;

// Elementos del DOM
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const gameArea = document.getElementById("game-area");

// Función para generar un cuadrado aleatorio
function generateSquare() {
    const square = document.createElement("div");
    square.classList.add("square");

    // Posicionarlo aleatoriamente dentro del área del juego
    const x = Math.random() * (gameArea.clientWidth - 50);
    const y = Math.random() * (gameArea.clientHeight - 50);

    square.style.left = `${x}px`;
    square.style.top = `${y}px`;

    // Agregar evento al cuadrado
    square.addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = score;
        square.remove(); // Elimina el cuadrado tras ser clicado
    });

    // Agregar el cuadrado al área de juego
    gameArea.appendChild(square);

    // Eliminar el cuadrado después de 1.5 segundos si no se clicó
    setTimeout(() => {
        square.remove();
    }, 1500);
}

// Función para iniciar el juego
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    // Generar cuadrados cada 700 ms
    gameInterval = setInterval(() => {
        if (timeLeft > 0) {
            generateSquare();
        }
    }, 700);

    // Actualizar el temporizador cada segundo
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}

// Función para finalizar el juego
function endGame() {
    alert(`¡Fin del juego! Tu puntuación final es: ${score}`);
}

// Iniciar el juego al cargar la página
startGame();
