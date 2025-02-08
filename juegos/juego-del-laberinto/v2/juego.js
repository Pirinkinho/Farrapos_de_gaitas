// juego.js

const filas = 10; // Número de filas del laberinto
const columnas = 10; // Número de columnas del laberinto

let laberinto = generarLaberinto(filas, columnas);

const juegoDiv = document.getElementById('juego');

// Dibuja el laberinto
function dibujarLaberinto() {
    juegoDiv.innerHTML = ''; // Limpiar el área del juego

    for (let i = 0; i < filas; i++) {
        const filaDiv = document.createElement('div');
        filaDiv.classList.add('fila');
        
        for (let j = 0; j < columnas; j++) {
            const celdaDiv = document.createElement('div');
            celdaDiv.classList.add('celda');
            
            if (laberinto[i][j] === 1) {
                celdaDiv.classList.add('pared');
            } else if (i === 1 && j === 0) {
                celdaDiv.classList.add('entrada'); // Entrada
            } else if (i === filas - 2 && j === columnas - 1) {
                celdaDiv.classList.add('salida'); // Salida
            } else {
                celdaDiv.classList.add('camino');
            }

            filaDiv.appendChild(celdaDiv);
        }

        juegoDiv.appendChild(filaDiv);
    }
}

// Generar el laberinto y dibujarlo cuando se reinicia el juego
function reiniciarJuego() {
    laberinto = generarLaberinto(filas, columnas);
    dibujarLaberinto();
}

// Llamar a la función de reiniciar juego cuando se carga la página
reiniciarJuego();
