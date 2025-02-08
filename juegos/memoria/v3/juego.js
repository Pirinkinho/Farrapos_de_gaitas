const tablero = document.getElementById('tablero');
let cartas = [];
let flippedIndices = [];  // Índices de cartas actualmente volteadas (pendientes de comparar)
let matchedIndices = [];  // Índices de cartas que ya se han emparejado

// Función para inicializar y mezclar las cartas
function inicializarCartas() {
  let valores = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  valores = [...valores, ...valores]; // Duplicar para tener 8 pares (16 cartas)
  // Mezclar aleatoriamente
  cartas = valores.sort(() => Math.random() - 0.5);
}

// Crear el tablero de juego
function crearTablero() {
  inicializarCartas();
  tablero.innerHTML = ''; // Limpiar tablero

  for (let i = 0; i < cartas.length; i++) {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.index = i;
    carta.addEventListener('click', voltearCarta);
    tablero.appendChild(carta);
  }
}

// Función para voltear una carta al hacer clic
function voltearCarta(e) {
  const cartaElement = e.target;
  const index = parseInt(cartaElement.dataset.index);
  
  // Si la carta ya está emparejada o ya volteada en esta ronda, no hacer nada
  if (matchedIndices.includes(index) || flippedIndices.includes(index)) return;

  // Mostrar el valor y marcar como volteada
  cartaElement.textContent = cartas[index];
  cartaElement.classList.add('flipped');
  flippedIndices.push(index);

  // Si se han volteado dos cartas, comprobar la pareja
  if (flippedIndices.length === 2) {
    setTimeout(checkPair, 1000);
  }
}

// Función para comprobar si dos cartas volteadas son pareja
function checkPair() {
  const [index1, index2] = flippedIndices;
  const carta1 = cartas[index1];
  const carta2 = cartas[index2];
  
  const cartaElem1 = document.querySelector(`.carta[data-index='${index1}']`);
  const cartaElem2 = document.querySelector(`.carta[data-index='${index2}']`);

  if (carta1 === carta2) {
    // Si coinciden, marcar ambas como emparejadas y dejarlas visibles en rojo
    matchedIndices.push(index1, index2);
    cartaElem1.classList.remove('flipped');
    cartaElem2.classList.remove('flipped');
    cartaElem1.classList.add('matched');
    cartaElem2.classList.add('matched');
    
    // Comprobar si se han encontrado todas las parejas
    if (matchedIndices.length === cartas.length) {
      setTimeout(() => alert('¡Has ganado!'), 500);
    }
  } else {
    // Si no coinciden, voltearlas de nuevo (ocultar su valor)
    cartaElem1.textContent = '';
    cartaElem2.textContent = '';
    cartaElem1.classList.remove('flipped');
    cartaElem2.classList.remove('flipped');
  }

  // Reiniciar la selección
  flippedIndices = [];
}

crearTablero();
