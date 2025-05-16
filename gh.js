const typewriterElement = document.getElementById("typewriter-text");

const messages = [
  "Welcome to Mr. Everything",
  "Game Hub for everyone!",
  "Created By: Michael Angelo Z. Diaz - 2nd Year BSCPE"
];

let msgIndex = 0;
let charIndex = 0;
let deleting = false;
const typingSpeed = 120;
const deletingSpeed = 80;
const pauseDelay = 1500;

function type() {
  const currentMessage = messages[msgIndex];

  if (!deleting) {
    typewriterElement.textContent = currentMessage.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentMessage.length) {
      setTimeout(() => {
        deleting = true;
        type();
      }, pauseDelay);
      return;
    }
  } else {
    typewriterElement.textContent = currentMessage.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
      setTimeout(type, typingSpeed);
      return;
    }
  }

  setTimeout(type, deleting ? deletingSpeed : typingSpeed);
}

window.onload = () => {
  type();
};

// Modal, genre filter, and other JS remain unchanged
const modal = document.getElementById("game-modal");
const iframe = document.getElementById("game-frame");

function openModal(gamePath) {
  iframe.src = gamePath;
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModal() {
  iframe.src = "";
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

const genreFilter = document.getElementById("genre-filter");
const genreButtons = genreFilter.querySelectorAll("li");
const gameGrid = document.getElementById("game-grid");
const gameCards = gameGrid.querySelectorAll(".game-card");

genreButtons.forEach(button => {
  button.addEventListener("click", () => {
    genreButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const genre = button.getAttribute("data-genre");

    gameCards.forEach(card => {
      if (genre === "all" || card.getAttribute("data-genre") === genre) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

window.addEventListener("message", function(event) {
  if (event.data === "closeModal") {
    closeModal();
  }
});
