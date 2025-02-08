const player = document.createElement('div');
player.id = 'player';
const goal = document.createElement('div');
goal.id = 'goal';
const maze = document.getElementById('maze');

// Laberinto (1 = pared, 0 = camino libre)
const mazeLayout = [
    [0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0]
];

// Crear el laberinto visualmente
function generateMaze() {
    maze.innerHTML = '';  // Limpiar el laberinto anterior

    for (let row = 0; row < mazeLayout.length; row++) {
        for (let col = 0; col < mazeLayout[row].length; col++) {
            const cell = document.createElement('div');
            if (mazeLayout[row][col] === 1) {
                cell.classList.add('wall');
            }
            maze.appendChild(cell);
        }
    }

    maze.appendChild(player);
    maze.appendChild(goal);
}

// Función para verificar si el jugador ha llegado a la meta
function checkWin() {
    const playerRect = player.getBoundingClientRect();
    const goalRect = goal.getBoundingClientRect();

    // Comprobar si las posiciones del jugador y la meta se cruzan
    if (playerRect.top < goalRect.bottom &&
        playerRect.bottom > goalRect.top &&
        playerRect.left < goalRect.right &&
        playerRect.right > goalRect.left) {
        alert('¡Felicidades! Llegaste a la meta 🏆');
        resetGame();
    }
}

// Mover al jugador según las teclas de dirección
document.addEventListener('keydown', (event) => {
    let playerTop = parseInt(window.getComputedStyle(player).top);
    let playerLeft = parseInt(window.getComputedStyle(player).left);

    switch (event.key) {
        case 'ArrowUp':
            if (playerTop > 0 && !isWall(playerTop - 40, playerLeft)) {
                player.style.top = playerTop - 40 + 'px';
            }
            break;
        case 'ArrowDown':
            if (playerTop < 280 && !isWall(playerTop + 40, playerLeft)) {
                player.style.top = playerTop + 40 + 'px';
            }
            break;
        case 'ArrowLeft':
            if (playerLeft > 0 && !isWall(playerTop, playerLeft - 40)) {
                player.style.left = playerLeft - 40 + 'px';
            }
            break;
        case 'ArrowRight':
            if (playerLeft < 280 && !isWall(playerTop, playerLeft + 40)) {
                player.style.left = playerLeft + 40 + 'px';
            }
            break;
    }

    checkWin();
});

// Función para verificar si hay pared en la nueva posición
function isWall(top, left) {
    const row = Math.floor(top / 40);
    const col = Math.floor(left / 40);
    return mazeLayout[row] && mazeLayout[row][col] === 1;
}

// Reiniciar el juego
function resetGame() {
    player.style.top = '0px';
    player.style.left = '0px';
}

// Inicializar el laberinto
generateMaze();
