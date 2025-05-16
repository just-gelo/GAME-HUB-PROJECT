const sentenceDisplay = document.getElementById("sentence");
const inputArea = document.getElementById("inputArea");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast takes a lot of practice and precision.",
  "JavaScript powers many interactive web applications.",
  "A good developer writes clean and readable code.",
  "Stay curious, keep learning, and code with passion."
];

let timer;
let time = 0;
let started = false;
let currentSentence = "";

function startGame() {
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceDisplay.textContent = currentSentence;
  time = 0;
  timerEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "0";
  started = true;

  timer = setInterval(() => {
    time++;
    timerEl.textContent = time;
    calculateStats();
  }, 1000);
}

function calculateStats() {
  const input = inputArea.value;
  const wordsTyped = input.trim().split(/\s+/).length;
  const correctChars = input.split("").filter((char, i) => char === currentSentence[i]).length;
  const accuracy = ((correctChars / currentSentence.length) * 100).toFixed(0);
  const wpm = time > 0 ? Math.round((wordsTyped / time) * 60) : 0;

  accuracyEl.textContent = isNaN(accuracy) ? 0 : accuracy;
  wpmEl.textContent = isNaN(wpm) ? 0 : wpm;
}

function endGame() {
  clearInterval(timer);
  inputArea.disabled = true;
  started = false;
}

startBtn.addEventListener("click", () => {
  if (!started) {
    startGame();
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  inputArea.disabled = true;
  inputArea.value = "";
  timerEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "0";
  sentenceDisplay.textContent = "Click \"Start\" to begin!";
  started = false;
});
