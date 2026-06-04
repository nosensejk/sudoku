import { type Cell } from "../types/sudoku";

interface SudokuCellProps {
  cell: Cell;
  row: number;
  col: number;
  selected: boolean;
  selectedCell: { row: number; col: number } | null;
  onClick: () => void;
}

export function SudokuCell({
  cell,
  row,
  col,
  selected,
  selectedCell,
  onClick,
}: SudokuCellProps) {
  const borderRight =
    col === 2 || col === 5 ? "border-r-2 border-r-slate-800" : "";

  const borderBottom =
    row === 2 || row === 5 ? "border-b-2 border-b-slate-800" : "";

  const sameRow = selectedCell?.row === row;
  const sameCol = selectedCell?.col === col;
  

  const sameBox =
    selectedCell &&
    Math.floor(selectedCell.row / 3) === Math.floor(row / 3) &&
    Math.floor(selectedCell.col / 3) === Math.floor(col / 3);

  const isHighlighted = sameRow || sameCol || sameBox;

  const backgroundClass = cell.error
  ? "bg-red-200"
  : selected
    ? "bg-blue-300"
    : cell.fixed
      ? "bg-slate-200"
      : isHighlighted
        ? "bg-blue-100"
        : "bg-white";
  const textClass = cell.fixed ? "text-slate-900" : "text-blue-700";

  return (
    <button
      className={`flex h-12 w-12 items-center justify-center border border-slate-300 text-lg font-semibold ${textClass} ${borderRight} ${borderBottom} ${backgroundClass} `}
      onClick={onClick}
    >
      {cell.value ?? ""}
    </button>
  );
}
