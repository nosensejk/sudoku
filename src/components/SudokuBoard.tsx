import { type Board } from "../types/sudoku";
import { SudokuCell } from "./SudokuCell";

interface SudokuBoardProps {
  board: Board;
  selectedCell: {
    row: number;
    col: number;
  } | null;
  onSelectCell: (cell: { row: number; col: number }) => void;
}

export function SudokuBoard({ board, selectedCell, onSelectCell }: SudokuBoardProps) {
  
  return (
    <div className="overflow-hidden rounded-lg border-2 border-slate-800">
      {board.map((row, rowIndex) => (
         <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
               <SudokuCell 
                  key={`${rowIndex}-${colIndex}`} 
                  cell={cell} 
                  row={rowIndex} 
                  col={colIndex} 
                  selected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex} 
                  selectedCell={selectedCell}
                  onClick={() => onSelectCell({row: rowIndex, col: colIndex})}/>
            ))}
         </div>
      ))}
    </div>
  );
}
