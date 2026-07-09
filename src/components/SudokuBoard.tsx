import { type Board } from "../types/sudoku";
import { SudokuCell } from "./SudokuCell";

interface SudokuBoardProps {
  board: Board;
  selectedCell: { row: number; col: number } | null;
  onSelectCell: (cell: { row: number; col: number }) => void;
  theme: "light" | "dark" | "cyberpunk";
}

export function SudokuBoard({
  board,
  selectedCell,
  onSelectCell,
  theme,
}: SudokuBoardProps) {
  const selectedValue = selectedCell
    ? board[selectedCell.row][selectedCell.col]?.value
    : null;

  
  const styles = {
    light: {
      
      border:
        "border-2 border-slate-800 ring-4 ring-slate-800/10 bg-white shadow-2xl",
      line: "bg-slate-800",
    },
    dark: {
      
      border:
        "border-2 border-zinc-800 ring-4 ring-zinc-800/50 bg-zinc-950 shadow-2xl shadow-indigo-500/5",
      line: "bg-zinc-800", 
    },
    cyberpunk: {
      border:
        "border-4 border-yellow-500 ring-4 ring-yellow-500/20 bg-zinc-950 shadow-2xl shadow-yellow-500/10",
      line: "bg-yellow-500",
    },
  }[theme];

  return (
   
    <div
      className={`relative overflow-hidden rounded-2xl p-[1px] w-full aspect-square ${styles.border}`}
    >
      
      <div className="grid grid-cols-9 grid-rows-9 h-full w-full">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              selected={
                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
              }
              selectedCell={selectedCell}
              selectedValue={selectedValue}
              theme={theme}
              onClick={() => onSelectCell({ row: rowIndex, col: colIndex })}
            />
          )),
        )}
      </div>

      
      <div
        className={`absolute top-0 bottom-0 left-[33.333%] w-[2px] -translate-x-1/2 ${styles.line}`}
      />
      <div
        className={`absolute top-0 bottom-0 left-[66.666%] w-[2px] -translate-x-1/2 ${styles.line}`}
      />
      <div
        className={`absolute left-0 right-0 top-[33.333%] h-[2px] -translate-y-1/2 ${styles.line}`}
      />
      <div
        className={`absolute left-0 right-0 top-[66.666%] h-[2px] -translate-y-1/2 ${styles.line}`}
      />
    </div>
  );
}
