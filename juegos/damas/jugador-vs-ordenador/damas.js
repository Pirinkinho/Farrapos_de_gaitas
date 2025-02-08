const board = document.getElementById("board");
const rows = 8;
const cols = 8;
let selectedPiece = null;
let currentPlayer = "player";

// Initialize the board
function createBoard() {
  for (let row = 0; row < rows; row++) {
    const boardRow = document.createElement("div");
    boardRow.classList.add("row");

    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Black cells where pieces can be placed
      if ((row + col) % 2 === 1) {
        cell.classList.add("black-cell");
        
        // Add pieces for the player and computer
        if (row < 3) {
          const piece = document.createElement("div");
          piece.classList.add("piece", "computer-piece");
          cell.appendChild(piece);
        } else if (row > 4) {
          const piece = document.createElement("div");
          piece.classList.add("piece", "player-piece");
          cell.appendChild(piece);
        }
      }

      cell.dataset.row = row;
      cell.dataset.col = col;
      boardRow.appendChild(cell);
    }

    board.appendChild(boardRow);
  }
}

function resetSelection() {
  document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("highlight"));
  selectedPiece = null;
}

function handlePlayerMove(e) {
  const cell = e.target;

  // If a piece is already selected
  if (selectedPiece) {
    const targetRow = parseInt(cell.dataset.row);
    const targetCol = parseInt(cell.dataset.col);
    const startRow = parseInt(selectedPiece.parentElement.dataset.row);
    const startCol = parseInt(selectedPiece.parentElement.dataset.col);

    // Validate move: diagonal, forward, one step
    if (
      Math.abs(targetCol - startCol) === 1 &&
      targetRow - startRow === -1 &&
      cell.classList.contains("black-cell") &&
      !cell.querySelector(".piece")
    ) {
      cell.appendChild(selectedPiece);
      resetSelection();
      currentPlayer = "computer";
      handleComputerMove();
    } else {
      alert("Movimiento no válido");
    }
  } else if (cell.querySelector(".player-piece")) {
    // Select a player's piece
    selectedPiece = cell.querySelector(".player-piece");
    cell.classList.add("highlight");
  }
}

function handleComputerMove() {
  const computerPieces = Array.from(document.querySelectorAll(".computer-piece"));
  const validMoves = [];

  computerPieces.forEach(piece => {
    const startRow = parseInt(piece.parentElement.dataset.row);
    const startCol = parseInt(piece.parentElement.dataset.col);

    // Check possible moves
    [[1, -1], [1, 1]].forEach(([rowOffset, colOffset]) => {
      const targetRow = startRow + rowOffset;
      const targetCol = startCol + colOffset;
      const targetCell = document.querySelector(
        `.cell[data-row='${targetRow}'][data-col='${targetCol}']`
      );

      if (
        targetCell &&
        targetCell.classList.contains("black-cell") &&
        !targetCell.querySelector(".piece")
      ) {
        validMoves.push({ piece, targetCell });
      }
    });
  });

  if (validMoves.length > 0) {
    const move = validMoves[Math.floor(Math.random() * validMoves.length)];
    move.targetCell.appendChild(move.piece);
    currentPlayer = "player";
  } else {
    alert("El ordenador no tiene movimientos disponibles");
  }
}

createBoard();

// Add event listeners for player's moves
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", handlePlayerMove);
});
