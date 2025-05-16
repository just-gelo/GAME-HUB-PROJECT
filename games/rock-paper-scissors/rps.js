const choices = ["rock", "paper", "scissors"];
const playerChoiceEl = document.getElementById("playerChoice");
const computerChoiceEl = document.getElementById("computerChoice");
const outcomeEl = document.getElementById("outcome");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");

let playerScore = 0;
let computerScore = 0;

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.getAttribute("data-choice");
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    playerChoiceEl.textContent = playerChoice;
    computerChoiceEl.textContent = computerChoice;

    const result = determineWinner(playerChoice, computerChoice);
    outcomeEl.textContent = result;

    if (result === "You Win!") {
      playerScore++;
    } else if (result === "You Lose!") {
      computerScore++;
    }

    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
  });
});

function determineWinner(player, computer) {
  if (player === computer) return "It's a Draw!";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "You Win!";
  }
  return "You Lose!";
}
