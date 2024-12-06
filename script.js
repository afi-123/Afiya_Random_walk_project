const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (board[cellIndex] !== "" || !gameActive) return;

  board[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  checkResult();
}

function checkResult() {
  let winner = null;

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      break;
    }
  }

  if (winner) {
    gameActive = false;
    statusText.textContent = `Player ${winner} wins!`;
    updateScore(winner);
    return;
  }

  if (!board.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function updateScore(winner) {
  if (winner === "X") {
    scoreX++;
    scoreXText.textContent = scoreX;
  } else {
    scoreO++;
    scoreOText.textContent = scoreO;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
function createConfetti() {
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
      document.body.appendChild(confetti);
  
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  }
  
  function checkResult() {
    let winner = null;
  
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
        break;
      }
    }
  
    if (winner) {
      gameActive = false;
      statusText.textContent = `Player ${winner} wins! 🎉`;
      updateScore(winner);
      createConfetti();
      return;
    }
  
    if (!board.includes("")) {
      gameActive = false;
      statusText.textContent = "It's a draw!";
      return;
    }
  
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
  