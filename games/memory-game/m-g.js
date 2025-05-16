const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍉', '🍊'];
let cards = [...symbols, ...symbols]; // duplicate symbols
let flippedCards = [];
let matchedCards = 0;
let moves = 0;

const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restartBtn');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.textContent = '';
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

  this.textContent = this.dataset.symbol;
  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards += 2;
    if (matchedCards === cards.length) {
      setTimeout(() => alert(`You won in ${moves} moves!`), 300);
    }
  } else {
    setTimeout(() => {
      card1.textContent = '';
      card2.textContent = '';
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 800);
  }

  flippedCards = [];
}

function startGame() {
  gameBoard.innerHTML = '';
  moves = 0;
  matchedCards = 0;
  movesDisplay.textContent = '0';
  flippedCards = [];

  shuffle(cards);

  cards.forEach(symbol => {
    const card = createCard(symbol);
    gameBoard.appendChild(card);
  });
}

function goBackToHub() {
  if (window.top !== window.self) {
    window.top.postMessage("closeModal", "*");
  } else {
    window.location.href = "../../index.html";
  }
}

restartBtn.addEventListener('click', startGame);

startGame();
