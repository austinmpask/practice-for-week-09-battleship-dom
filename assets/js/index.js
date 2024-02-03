import Board from "./board.js";

let board = new Board(); // creates a new game board

console.log(board.grid);

function removeListeners() {
  document.querySelectorAll(".grid-square").forEach((gridItem) => {
    gridItem.removeEventListener("click", handleClick);
  });
}

function addListeners() {
  document.querySelectorAll(".grid-square").forEach((gridItem) => {
    gridItem.addEventListener("click", handleClick);
  });
}
function handleClick(event) {
  const gridItem = event.currentTarget;
  const data = gridItem.getAttribute("data-ship");
  const row = data[0];
  const col = data[2];
  const result = board.makeHit(row, col);

  console.log(result);
  if (result) {
    gridItem.style.backgroundColor = "green";
    gridItem.innerHTML = result;
  } else {
    gridItem.style.backgroundColor = "red";
  }

  if (board.isGameOver()) {
    removeListeners();
    alert("Game over or something");
  }
}

function initBoard() {
  const gridContainer = document.createElement("div");
  gridContainer.id = "gridContainer";
  gridContainer.classList.add("grid-container");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const gridSquare = document.createElement("div");
      gridSquare.setAttribute("data-ship", i + "," + j);

      gridSquare.classList.add("grid-square");
      gridContainer.appendChild(gridSquare);
    }
  }

  document.querySelector("body").appendChild(gridContainer);
}
document.addEventListener("DOMContentLoaded", (event) => {
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => {
    board = new Board();
    document.getElementById("gridContainer").remove();
    initBoard();
    addListeners();
  });

  initBoard();
  addListeners();
});
