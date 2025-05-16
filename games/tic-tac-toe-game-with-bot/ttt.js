const board = document.getElementById("board");
const cells = Array.from(document.querySelectorAll(".cell"));
const status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let boardState; // array of 9 elements: 'X', 'O', or null
let isPlayerTurn;
let gameOver;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
];

// Initialize game
function init() {
  boardState = Array(9).fill(null);
  isPlayerTurn = true; // Player starts (X)
  gameOver = false;
  status.textContent = "Your turn (X)";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.addEventListener("click", handlePlayerMove);
  });
}

function handlePlayerMove(e) {
  const index = e.target.dataset.index;
  if (gameOver || boardState[index] !== null || !isPlayerTurn) return;

  makeMove(index, "X");
  if (checkWin("X")) {
    endGame("You win! 🎉");
    return;
  }
  if (isBoardFull()) {
    endGame("It's a draw!");
    return;
  }

  isPlayerTurn = false;
  status.textContent = "Bot's turn (O)";

  setTimeout(botMove, 500); // slight delay for bot move
}

function botMove() {
  if (gameOver) return;

  // Simple AI: choose a random available cell
  const availableIndices = boardState
    .map((val, idx) => val === null ? idx : null)
    .filter(i => i !== null);

  // Bot move
  if (availableIndices.length === 0) return;

  // Optional: smarter moves can be implemented here, but for now random
  const moveIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  makeMove(moveIndex, "O");

  if (checkWin("O")) {
    endGame("Bot wins! 😞");
    return;
  }
  if (isBoardFull()) {
    endGame("It's a draw!");
    return;
  }

  isPlayerTurn = true;
  status.textContent = "Your turn (X)";
}

function makeMove(index, player) {
  boardState[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add("taken");
  cells[index].removeEventListener("click", handlePlayerMove);
}

function checkWin(player) {
  return winningCombinations.some(comb => 
    comb.every(i => boardState[i] === player)
  );
}

function isBoardFull() {
  return boardState.every(cell => cell !== null);
}

function endGame(message) {
  gameOver = true;
  status.textContent = message;
  // Disable all remaining cells
  cells.forEach(cell => cell.removeEventListener("click", handlePlayerMove));
}

restartBtn.addEventListener("click", init);
init();
