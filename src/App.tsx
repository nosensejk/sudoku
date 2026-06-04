import { SudokuBoard } from "./components/SudokuBoard";
import { generateBoard } from "./utils/generator";
import { useState, useEffect } from "react";
import { validateBoard } from "./utils/validation";
import { checkWin } from "./utils/checkWin";
import { generateSolvedBoard } from "./utils/solver";

function App() {
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [board, setBoard] = useState(() => generateBoard());

  console.table(generateSolvedBoard());
  

  const updateCell = (row: number, col: number, value: number | null) => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((currentRow, rowIndex) =>
        currentRow.map((cell, colIndex) => {
          if (rowIndex === row && colIndex === col && !cell.fixed) {
            return { ...cell, value };
          }
          return cell;
        }),
      );
      const validatedBoard = validateBoard(newBoard);
      if (checkWin(validatedBoard)) {
        alert("You won!");
      }
      return validatedBoard;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedCell({ row: Math.max(0, row - 1), col });
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedCell({ row: Math.min(8, row + 1), col });
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelectedCell({ row, col: Math.max(0, col - 1) });
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelectedCell({ row, col: Math.min(8, col + 1) });
        return;
      }

      if (/^[1-9]$/.test(e.key)) {
        updateCell(row, col, Number(e.key));
      }

      if (e.key === "Backspace" || e.key === "Delete") {
        updateCell(row, col, null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCell]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-slate-100">
    <button onClick={() => setBoard(generateBoard())} className="mb-4 rounded bg-blue-500 px-4 py-2 text-white">New Game</button>
      <SudokuBoard
        board={board}
        selectedCell={selectedCell}
        onSelectCell={setSelectedCell}
      />
    </main>
  );
}

export default App;
