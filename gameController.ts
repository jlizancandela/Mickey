import PromptSync from "prompt-sync";
import { board, gameState, initialBoard } from "./types";

const prompt = PromptSync();

const dificulty = 0.4;

// Function to generate a random board
export const generateBoard = (initialBoard: board) => {
  // Generate random coordinates for goal and mickey

  const goalX = Math.floor(Math.random() * 6);
  const goalY = Math.floor(Math.random() * 6);

  let mickeyX: number, mickeyY: number;
  do {
    mickeyX = Math.floor(Math.random() * 6);
    mickeyY = Math.floor(Math.random() * 6);
  } while (mickeyX === goalX && mickeyY === goalY);

  // Set the goal and mickey in the board and the obstacles in the remaining cells
  return initialBoard.map((row, i) =>
    row.map((cell, j) => {
      if (i === goalX && j === goalY) return "Goal";
      if (i === mickeyX && j === mickeyY) return "Mickey";
      return Math.random() < dificulty ? "Obstacle" : "";
    })
  );
};

// Class to control the game
export class Game {
  private board: board;
  private message: string;
  private gameState: gameState;

  constructor() {
    this.board = generateBoard(initialBoard);
    this.message = "";
    this.gameState = "playing";
  }

  move(x: number, y: number) {
    const mickeyX = this.board.findIndex((row) => row.includes("Mickey"));
    const mickeyY = this.board[mickeyX].indexOf("Mickey");

    const newX = mickeyX + x;
    const newY = mickeyY + y;

    if (newX < 0 || newX >= 6 || newY < 0 || newY >= 6) {
      this.message = "Movimiento fuera de los límites";
      return;
    }

    if (this.board[newX][newY] === "Obstacle") {
      this.message = "Has chocado con un obstáculo";
      return;
    }

    if (this.board[newX][newY] === "Goal") {
      this.message = "¡Has ganado!";
      this.gameState = "won";
      this.board[newX][newY] = "Mickey";
      this.board[mickeyX][mickeyY] = "";
      return;
    }

    this.board[mickeyX][mickeyY] = "";
    this.board[newX][newY] = "Mickey";
    this.message = "";
  }

  getBoard() {
    return this.board;
  }

  reset() {
    this.board = generateBoard(initialBoard);
  }

  getMessage() {
    return this.message;
  }

  getGameState() {
    return this.gameState;
  }

  setGameState(gameState: gameState) {
    this.gameState = gameState;
  }
  setMessage(message: string) {
    this.message = message;
  }
}

// Function to print the board
export const printBoard = (board: board) => {
  console.clear();
  console.log("");
  for (const row of board) {
    let rowString = "";
    for (const cell of row) {
      if (cell === "Mickey") {
        rowString += "🐭 ";
      } else if (cell === "Goal") {
        rowString += "🚪 ";
      } else if (cell === "Obstacle") {
        rowString += "🪨 ";
      } else {
        rowString += "🌱 "; // Empty cell
      }
    }
    console.log(rowString.trim()); // Print the row
  }
  console.log(""); // Add an empty line between board prints
  console.log(game.getMessage());
  console.log("");
};

const game = new Game();
printBoard(game.getBoard());

// Main game loop
while (game.getGameState() === "playing") {
  const movimiento = prompt(
    "¿Qué movimiento deseas realizar? (Arriba: 1, Abajo: 2, Izquierda: 3, Derecha: 4, Reiniciar: 5):"
  );

  switch (movimiento) {
    case "1":
      game.move(-1, 0);
      break;
    case "2":
      game.move(1, 0);
      break;
    case "3":
      game.move(0, -1);
      break;
    case "4":
      game.move(0, 1);
      break;
    case "5":
      game.reset();
      break;
    default:
      game.setMessage("Movimiento inválido");
      game.setGameState("lost");
      break;
  }

  printBoard(game.getBoard());
}
