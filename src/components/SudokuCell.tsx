import { type Cell } from "../types/sudoku";

interface SudokuCellProps {
  cell: Cell;
  row: number;
  col: number;
  selected: boolean;
  selectedCell: { row: number; col: number } | null;
  selectedValue: number | null;
  theme: "light" | "dark" | "cyberpunk";
  onClick: () => void;
}

export function SudokuCell({
  cell,
  row,
  col,
  selected,
  selectedCell,
  selectedValue,
  theme,
  onClick,
}: SudokuCellProps) {
  
  const thinColor = {
    light: "border-slate-200",
    dark: "border-zinc-800",
    cyberpunk: "border-yellow-500/20",
  }[theme];

  
  const borderR = col < 8 ? `border-r ${thinColor}` : "";
  const borderB = row < 8 ? `border-b ${thinColor}` : "";

  const sameRow = selectedCell?.row === row;
  const sameCol = selectedCell?.col === col;
  const sameBox =
    selectedCell &&
    Math.floor(selectedCell.row / 3) === Math.floor(row / 3) &&
    Math.floor(selectedCell.col / 3) === Math.floor(col / 3);

  const isHighlighted = sameRow || sameCol || sameBox;
  const isSameValue = selectedValue && cell.value === selectedValue;

  const themeStyles = {
    light: {
      base: "transition-all text-base sm:text-lg font-semibold",
      fixedText: "text-slate-900 font-bold",
      userText: "text-blue-600 font-medium",
      bg: cell.error
        ? "bg-red-200 text-red-900"
        : selected
          ? "bg-blue-300"
          : isSameValue
            ? "bg-amber-200 text-amber-900"
            : cell.fixed
              ? "bg-slate-100"
              : isHighlighted
                ? "bg-blue-50/80"
                : "bg-white hover:bg-slate-50",
    },
    dark: {
      base: "transition-all text-base sm:text-lg font-semibold",
      fixedText: "text-zinc-200 font-bold", // Чуть мягче белого для дефолтных цифр
      userText: "text-blue-400 font-medium", // Выделяем пользовательские цифры приятным голубым
      bg: cell.error
        ? "bg-red-950 text-red-400 font-bold"
        : selected
          ? "bg-indigo-600 text-white shadow-inner" // Яркий, не сливающийся фокус
          : isSameValue
            ? "bg-amber-500/20 text-amber-300 border-amber-500/30" // Подсветка одинаковых цифр
            : cell.fixed
              ? "bg-zinc-900/40"
              : isHighlighted
                ? "bg-slate-900/70" // Мягкий синеватый оверлей для подсвеченной строки/колонки
                : "bg-zinc-950 hover:bg-zinc-900/50", // Глубокий темный фон
    },
    cyberpunk: {
      base: "font-mono transition-all text-lg font-black uppercase",
      fixedText: "text-yellow-400",
      userText: "text-fuchsia-400",
      bg: cell.error
        ? "bg-red-500 text-black border-red-500"
        : selected
          ? "bg-yellow-400 !text-black" 
          : isSameValue
            ? "bg-fuchsia-950 text-fuchsia-300 border-fuchsia-500"
            : isHighlighted
              ? "bg-zinc-900/60 text-yellow-500/80"
              : "bg-zinc-950 text-yellow-500/60 hover:bg-zinc-900",
    },
  }[theme];

  return (
    <button
      className={`
        w-full h-full flex items-center justify-center select-none focus:outline-none
        ${themeStyles.base} 
        ${borderR} ${borderB}
        ${themeStyles.bg}
        ${cell.fixed ? themeStyles.fixedText : themeStyles.userText}
      `}
      onClick={onClick}
    >
      {cell.value ?? ""}
    </button>
  );
}
