type box = "Mickey" | "Obstacle" | "Goal" | "";
export type board = box[][];

export const initialBoard: board = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];

export type gameState = "playing" | "won" | "lost";
