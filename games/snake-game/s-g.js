const boardSize = 20;
const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let cells = [];
let snake = [210, 209]; // Starting snake position
let direction = 1; // moving right
let foodIndex = 0;
let interval = null;
let score = 0;
let speed = 150;

function createBoard() {
  gameBoard.innerHTML = "";
  cells = [];
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
    cells.push(cell);
  }
}

function drawSnake() {
  cells.forEach(cell => cell.classList.remove("snake"));
  snake.forEach(index => cells[index]?.classList.add("snake"));
}

function moveSnake() {
  const head = snake[0];
  const newHead = head + direction;

  // Collision with wall
  const hitLeft = head % boardSize === 0 && direction === -1;
  const hitRight = head % boardSize === boardSize - 1 && direction === 1;
  const hitTop = head < boardSize && direction === -boardSize;
  const hitBottom = head >= boardSize * (boardSize - 1) && direction === boardSize;
  const selfHit = snake.includes(newHead);

  if (hitLeft || hitRight || hitTop || hitBottom || selfHit) {
    clearInterval(interval);
    alert("Game Over! Final Score: " + score);
    return;
  }

  snake.unshift(newHead);

  if (newHead === foodIndex) {
    score++;
    scoreDisplay.textContent = score;
    generateFood();
  } else {
    snake.pop();
  }

  drawSnake();
}

function generateFood() {
  do {
    foodIndex = Math.floor(Math.random() * cells.length);
  } while (snake.includes(foodIndex));

  cells.forEach(cell => cell.classList.remove("food"));
  cells[foodIndex].classList.add("food");
}

function changeDirection(e) {
  const key = e.key;

  if (key === "ArrowUp" && direction !== boardSize) {
    direction = -boardSize;
  } else if (key === "ArrowDown" && direction !== -boardSize) {
    direction = boardSize;
  } else if (key === "ArrowLeft" && direction !== 1) {
    direction = -1;
  } else if (key === "ArrowRight" && direction !== -1) {
    direction = 1;
  }
}

function startGame() {
  clearInterval(interval);
  snake = [210, 209];
  direction = 1;
  score = 0;
  scoreDisplay.textContent = score;
  createBoard();
  drawSnake();
  generateFood();
  interval = setInterval(moveSnake, speed);
}

document.addEventListener("keydown", changeDirection);
startBtn.addEventListener("click", startGame);
