const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;

// Icons for the memory game
const icons = [
  "🍎", "🍎",
  "🍌", "🍌",
  "🍇", "🍇",
  "🍉", "🍉",
  "🍓", "🍓",
  "🍍", "🍍",
  "🥝", "🥝",
  "🍒", "🍒",
];

// Shuffle the icons array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create cards dynamically
function createCards() {
  const shuffledIcons = shuffle(icons);

  shuffledIcons.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;

    const img = document.createElement("span");
    img.textContent = icon;

    card.appendChild(img);
    gameContainer.appendChild(card);

    card.addEventListener("click", flipCard);
  });
}

// Flip the card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

// Check if the two flipped cards match
function checkMatch() {
  lockBoard = true;
  attempts++;
  scoreElement.textContent = `Intentos: ${attempts}`;

  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    disableCards();
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

// Reset board state
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];

  // Check if all cards are matched
  if (document.querySelectorAll(".card:not(.matched)").length === 0) {
    setTimeout(() => alert(`¡Has ganado en ${attempts} intentos!`), 500);
  }
}

// Initialize the game
createCards();
