const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const feedback = document.getElementById("feedback");
const attemptsEl = document.getElementById("attempts");
const playAgainBtn = document.getElementById("playAgainBtn");

let secretNumber;
let attempts;

function initializeGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  attemptsEl.textContent = attempts;
  feedback.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
  playAgainBtn.style.display = "none";
  guessInput.focus();
}

function checkGuess() {
  const guess = Number(guessInput.value);
  if (!guess || guess < 1 || guess > 100) {
    feedback.textContent = "Please enter a valid number between 1 and 100.";
    return;
  }

  attempts++;
  attemptsEl.textContent = attempts;

  if (guess === secretNumber) {
    feedback.textContent = `🎉 Congrats! You guessed the number ${secretNumber} in ${attempts} attempts!`;
    endGame();
  } else if (guess < secretNumber) {
    feedback.textContent = "Too low! Try a higher number.";
  } else {
    feedback.textContent = "Too high! Try a lower number.";
  }
  guessInput.value = "";
  guessInput.focus();
}

function endGame() {
  guessInput.disabled = true;
  guessBtn.disabled = true;
  playAgainBtn.style.display = "inline-block";
}

guessBtn.addEventListener("click", checkGuess);
guessInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") checkGuess();
});
playAgainBtn.addEventListener("click", initializeGame);

initializeGame();
