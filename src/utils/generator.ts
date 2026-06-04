import { type Board } from "../types/sudoku";
import { generateSolvedBoard } from "./solver";


function createBoard(): Board {
   const solvedBoard = generateSolvedBoard();

  return solvedBoard.map((row) =>
    row.map((value) => ({ value, fixed: true, error: false })),
  );
}

export function generateBoard(
   emptyCells = 45,
) : Board {
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

