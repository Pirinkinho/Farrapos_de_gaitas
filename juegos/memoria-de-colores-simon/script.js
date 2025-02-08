let colorSequence = [];
let playerSequence = [];
let colors = ["red", "blue", "green", "yellow"];
let level = 0;
let isPlayerTurn = false;

document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    colorSequence = [];
    playerSequence = [];
    level = 0;
    isPlayerTurn = false;
    document.getElementById("message").textContent = "¡Mira la secuencia!";
    nextLevel();
}

function nextLevel() {
    playerSequence = [];
    level++;
    document.getElementById("message").textContent = `Nivel ${level}`;
    isPlayerTurn = false;
    
    let newColor = colors[Math.floor(Math.random() * colors.length)];
    colorSequence.push(newColor);
    
    playSequence();
}

function playSequence() {
    let i = 0;
    let interval = setInterval(() => {
        highlightColor(colorSequence[i]);
        i++;
        if (i >= colorSequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                isPlayerTurn = true;
                document.getElementById("message").textContent = "Tu turno. Repite la secuencia.";
            }, 500);
        }
    }, 1000);
}

function highlightColor(color) {
    let btn = document.getElementById(color);
    btn.style.opacity = "0.5";
    setTimeout(() => btn.style.opacity = "1", 500);
}

function playerClick(color) {
    if (!isPlayerTurn) return;
    
    playerSequence.push(color);
    highlightColor(color);
    
    if (playerSequence[playerSequence.length - 1] !== colorSequence[playerSequence.length - 1]) {
        document.getElementById("message").textContent = "❌ Fallaste. Inténtalo de nuevo.";
        return;
    }
    
    if (playerSequence.length === colorSequence.length) {
        document.getElementById("message").textContent = "✅ ¡Bien hecho! Pasando al siguiente nivel...";
        isPlayerTurn = false;
        setTimeout(nextLevel, 1000);
    }
}
