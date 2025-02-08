const words = ["javascript", "python", "programacion", "desarrollador", "computadora"];
let selectedWord;
let displayWord;
let attemptsLeft;
let usedLetters;

function startNewGame() {
    // Selecciona una palabra aleatoria
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord = Array(selectedWord.length).fill('_');
    attemptsLeft = 5;
    usedLetters = [];

    // Actualizar pantalla
    document.getElementById('word-display').textContent = displayWord.join(' ');
    document.getElementById('attempts-left').textContent = attemptsLeft;
    document.getElementById('used-letters').textContent = usedLetters.join(', ');

    document.getElementById('game-over').style.display = 'none';
    document.getElementById('letter').disabled = false;
}

function guessLetter() {
    const guessedLetter = document.getElementById('letter').value.toLowerCase();

    if (!guessedLetter || guessedLetter.length !== 1) {
        alert("Por favor, ingresa solo una letra.");
        return;
    }

    if (usedLetters.includes(guessedLetter)) {
        alert("Ya adivinaste esa letra.");
        return;
    }

    usedLetters.push(guessedLetter);
    document.getElementById('used-letters').textContent = usedLetters.join(', ');

    if (selectedWord.includes(guessedLetter)) {
        // Actualiza la palabra en la pantalla
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guessedLetter) {
                displayWord[i] = guessedLetter;
            }
        }
        document.getElementById('word-display').textContent = displayWord.join(' ');

        // Verifica si se adivinó toda la palabra
        if (!displayWord.includes('_')) {
            endGame(true);
        }
    } else {
        // Si no está en la palabra, reduce los intentos
        attemptsLeft--;
        document.getElementById('attempts-left').textContent = attemptsLeft;

        if (attemptsLeft <= 0) {
            endGame(false);
        }
    }

    // Borra el campo de entrada
    document.getElementById('letter').value = '';
}

function endGame(won) {
    document.getElementById('letter').disabled = true;
    document.getElementById('game-over').style.display = 'block';

    const message = won ? '¡Felicidades, adivinaste la palabra!' : `Perdiste, la palabra era "${selectedWord}".`;
    document.getElementById('game-message').textContent = message;
}

function restartGame() {
    startNewGame();
}

// Iniciar el juego cuando se carga la página
startNewGame();
