const tablero = document.getElementById('tablero');
let cartas = [];
let cartaSeleccionada = [];
let cartaSeleccionadaIndices = [];
let cartasEncontradas = 0;
let totalCartas = 8; // Número de parejas de cartas

// Inicializar las cartas del juego
function inicializarCartas() {
    let valores = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    valores = [...valores, ...valores]; // Duplicar los valores para crear parejas

    // Mezclar cartas
    cartas = valores.sort(() => Math.random() - 0.5); // Mezclar aleatoriamente
}

// Crear el tablero y las cartas
function crearTablero() {
    inicializarCartas();

    // Crear un div por cada carta
    for (let i = 0; i < cartas.length; i++) {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.index = i;
        carta.addEventListener('click', voltearCarta);
        carta.textContent = ''; // La carta comienza oculta
        tablero.appendChild(carta);
    }
}

// Voltear una carta
function voltearCarta(e) {
    const carta = e.target;
    const cartaIndex = carta.dataset.index;

    // Evitar seleccionar la misma carta dos veces o una carta ya encontrada
    if (cartaSeleccionada.length === 2 || cartaSeleccionadaIndices.includes(cartaIndex)) return;

    carta.textContent = cartas[cartaIndex]; // Mostrar el valor de la carta
    carta.classList.add('volteada'); // Agregar estilo de carta volteada

    // Agregar carta seleccionada
    cartaSeleccionada.push(cartas[cartaIndex]);
    cartaSeleccionadaIndices.push(cartaIndex);

    // Si se seleccionaron dos cartas, verificar si son iguales
    if (cartaSeleccionada.length === 2) {
        setTimeout(verificarPareja, 1000);
    }
}

// Verificar si las dos cartas seleccionadas son iguales
function verificarPareja() {
    const [carta1, carta2] = cartaSeleccionada;
    const [index1, index2] = cartaSeleccionadaIndices;

    if (carta1 === carta2) {
        // Si son iguales, las dejamos volteadas y contamos una pareja encontrada
        cartasEncontradas++;
        if (cartasEncontradas === totalCartas) {
            alert('¡Has ganado!');
        }
    } else {
        // Si no son iguales, volvemos a voltear las cartas
        const cartasVolteadas = document.querySelectorAll('.volteada');
        cartasVolteadas.forEach(carta => carta.textContent = '');
        cartasVolteadas.forEach(carta => carta.classList.remove('volteada'));
    }

    // Resetear las cartas seleccionadas
    cartaSeleccionada = [];
    cartaSeleccionadaIndices = [];
}

crearTablero();
