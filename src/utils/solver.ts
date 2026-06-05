export type NumberBoard = (number | null)[][];

export function isSafe(
  board: NumberBoard,
  row: number,
  col: number,
  value: number,
): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === value) {
      return false;
    }
    if (board[i][col] === value) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === value) {
        return false;
      }
    }
  }
  return true;
}

function findEmpty(board: NumberBoard): [number, number] | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        return [row, col];
      }
    }
  }
  return null;
}

function shuffle(numbers: number[]): number[] {
  return [...numbers].sort(() => Math.random() - 0.5);
}

export function solveBoard (board: NumberBoard): boolean {
   const empty = findEmpty(board);

   if(!empty) {
      return true;
   }

   const [row, col] = empty;

   const numbers = shuffle([1,2,3,4,5,6,7,8,9]);

   for( const number of numbers) {
      if (isSafe(board, row, col, number)) {
         board[row][col] = number;

         if(solveBoard(board)){
            return true;
         }
         board[row][col] = null;
      }
   }
   return false;
}

export function generateSolvedBoard(): number[][] {
   const board = Array.from(
      {length: 9},
      () => Array(9).fill(null),
   );

   solveBoard(board);
   return board as number[][];
}

