import { type Board } from "../types/sudoku";

export function checkWin(board: Board): boolean {
  return board.every((row) =>
    row.every((cell) => cell.value !== null && !cell.error),
  );
}
