const words = ["computer", "javascript", "engineer", "coding", "hardware", "software", "scramble", "keyboard", "monitor", "network"];
let currentWord = "";
let scrambled = "";
let score = 0;

const scrambledWordEl = document.getElementById("scrambledWord");
const userInput = document.getElementById("userInput");
const feedbackEl = document.getElementById("feedback");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

function shuffle(word) {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

function loadNewWord() {
  userInput.value = "";
  feedbackEl.textContent = "";
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambled = shuffle(currentWord);
  while (scrambled === currentWord) {
    scrambled = shuffle(currentWord); // ensure it's actually scrambled
  }
  scrambledWordEl.textContent = scrambled;
}

checkBtn.addEventListener("click", () => {
  const guess = userInput.value.trim().toLowerCase();
  if (guess === currentWord) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "lime";
    score++;
    scoreEl.textContent = score;
  } else {
    feedbackEl.textContent = "❌ Incorrect!";
    feedbackEl.style.color = "red";
  }
});

nextBtn.addEventListener("click", loadNewWord);

window.onload = loadNewWord;
