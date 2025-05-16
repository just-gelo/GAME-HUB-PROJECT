const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3")
];
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

// Symbols to display on reels
const symbols = ["🍒", "🍋", "🍊", "🍉", "⭐", "7️⃣"];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Spin animation and logic
function spin() {
  spinBtn.disabled = true;
  result.textContent = "";
  
  // Number of times to change symbols before final stop
  const spinsCount = 20;
  let count = 0;

  const interval = setInterval(() => {
    reels.forEach(reel => {
      reel.textContent = getRandomSymbol();
      reel.style.transform = `rotate(${Math.random() * 360}deg)`;
    });
    count++;
    if (count >= spinsCount) {
      clearInterval(interval);
      finalizeSpin();
    }
  }, 100);
}

function finalizeSpin() {
  // Pick final symbols
  const finalSymbols = reels.map(() => getRandomSymbol());
  reels.forEach((reel, i) => {
    reel.textContent = finalSymbols[i];
    reel.style.transform = "rotate(0deg)";
  });

  // Check if all symbols match for a win
  if (finalSymbols[0] === finalSymbols[1] && finalSymbols[1] === finalSymbols[2]) {
    result.textContent = "🎉 Jackpot! You win!";
  } else if (finalSymbols[0] === finalSymbols[1] || finalSymbols[1] === finalSymbols[2] || finalSymbols[0] === finalSymbols[2]) {
    result.textContent = "Nice! Two matching symbols.";
  } else {
    result.textContent = "Try again!";
  }
  
  spinBtn.disabled = false;
}

spinBtn.addEventListener("click", spin);
