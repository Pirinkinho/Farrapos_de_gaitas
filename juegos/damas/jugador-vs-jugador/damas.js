const tablero = document.getElementById("tablero");
const turnoDisplay = document.getElementById("turno");

let turno = "rojo"; // Alterna entre "rojo" y "negro"
let seleccionada = null; // Ficha seleccionada

// Crear el tablero
function crearTablero() {
    for (let fila = 0; fila < 8; fila++) {
        for (let col = 0; col < 8; col++) {
            const celda = document.createElement("div");
            celda.classList.add("celda");
            celda.classList.add((fila + col) % 2 === 0 ? "blanca" : "negra");
            celda.dataset.fila = fila;
            celda.dataset.col = col;

            // Agregar fichas en las tres primeras y últimas filas
            if (celda.classList.contains("negra")) {
                if (fila < 3) {
                    agregarFicha(celda, "negra");
                } else if (fila > 4) {
                    agregarFicha(celda, "roja");
                }
            }

            tablero.appendChild(celda);
        }
    }
}

// Agregar una ficha a una celda
function agregarFicha(celda, color) {
    const ficha = document.createElement("div");
    ficha.classList.add("ficha", color);
    ficha.dataset.color = color;
    celda.appendChild(ficha);
}

// Cambiar el turno
function cambiarTurno() {
    turno = turno === "rojo" ? "negro" : "rojo";
    turnoDisplay.textContent = `Jugador ${turno === "rojo" ? "1 (rojo)" : "2 (negro)"}`;
}

// Manejar clic en celdas
function manejarClick(e) {
    const celda = e.target.closest(".celda");

    if (!celda || !celda.classList.contains("negra")) return;

    const ficha = celda.querySelector(".ficha");

    if (seleccionada) {
        // Mover la ficha seleccionada
        moverFicha(celda);
    } else if (ficha && ficha.dataset.color === turno) {
        // Seleccionar una ficha
        seleccionarFicha(ficha);
    }
}

// Seleccionar una ficha
function seleccionarFicha(ficha) {
    deseleccionarFicha();
    seleccionada = ficha;
    ficha.classList.add("seleccionada");
}

// Deseleccionar la ficha actual
function deseleccionarFicha() {
    if (seleccionada) {
        seleccionada.classList.remove("seleccionada");
        seleccionada = null;
    }
}

// Mover la ficha seleccionada a una celda vacía
function moverFicha(celda) {
    if (!celda.querySelector(".ficha") && seleccionada) {
        const filaOrigen = parseInt(seleccionada.parentElement.dataset.fila);
        const colOrigen = parseInt(seleccionada.parentElement.dataset.col);
        const filaDestino = parseInt(celda.dataset.fila);
        const colDestino = parseInt(celda.dataset.col);

        // Verificar que el movimiento es válido
        const esMovimientoValido = Math.abs(filaDestino - filaOrigen) === 1 && Math.abs(colDestino - colOrigen) === 1;

        if (esMovimientoValido) {
            celda.appendChild(seleccionada);
            deseleccionarFicha();
            cambiarTurno();
        }
    }
}

// Inicializar el juego
crearTablero();
tablero.addEventListener("click", manejarClick);
