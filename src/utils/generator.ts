import { type Board } from "../types/sudoku";
import { generateSolvedBoard } from "./solver";
import { type Difficulty } from "../types/sudoku";

function createBoard(): Board {
  const solvedBoard = generateSolvedBoard();

  return solvedBoard.map((row) =>
    row.map((value) => ({ value, fixed: true, error: false })),
  );
}

function getEmptyCellsCount(difficulty: Difficulty): number {
  switch (difficulty) {
    case "easy":
      return 20;
    case "medium":
      return 40;
    case "hard":
      return 60;
    default:
      return 40;
  }
}

export function generateBoard(difficulty: Difficulty): Board {
  const emptyCells = getEmptyCellsCount(difficulty);

  const board = createBoard();

  let removed = 0;

  while (removed < emptyCells) {
    const row = Math.floor(Math.random() * 9);

    const col = Math.floor(Math.random() * 9);

    if (board[row][col].value !== null) {
      board[row][col] = {
        value: null,
        fixed: false,
        error: false,
      };

      removed++;
    }
  }
  return board;
}
