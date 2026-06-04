import { type Board } from "../types/sudoku";

export function isValidMove(
  board: Board,
  row: number,
  col: number,
  value: number,
): boolean {
  for (let currentCol = 0; currentCol < 9; currentCol++) {
    if (currentCol !== col && board[row][currentCol].value === value) {
      return false;
    }
  }

  for (let currentRow = 0; currentRow < 9; currentRow++) {
    if (currentRow !== row && board[currentRow][col].value === value) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c].value === value) {
        return false;
      }
    }
  }

  return true;
}

export function validateBoard(board: Board): Board {
  return board.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (cell.value === null) {
        return { ...cell, error: false };
      }

      return {
        ...cell,
        error:
          !cell.fixed && !isValidMove(board, rowIndex, colIndex, cell.value),
      };
    }),
  );
}
