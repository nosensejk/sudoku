import { SudokuBoard } from "./components/SudokuBoard";
import { generateBoard } from "./utils/generator";
import { useState, useEffect, useCallback } from "react";
import { validateBoard } from "./utils/validation";
import { checkWin } from "./utils/checkWin";

import { type Difficulty } from "./types/sudoku";


type Theme = "light" | "dark" | "cyberpunk";

function App() {
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [board, setBoard] = useState(() => generateBoard("medium"));
  const [isWon, setIsWon] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");


  const themeBg: Record<Theme, string> = {
    light: "bg-slate-50 text-slate-900 transition-colors duration-300",
    dark: "bg-slate-900 text-slate-100 transition-colors duration-300",
    cyberpunk:
      "bg-zinc-950 text-yellow-400 font-mono transition-colors duration-300",
  };

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
        setIsWon(true);
      }
      return validatedBoard;
    });
  };


  const handleInput = useCallback(
    (val: number | null) => {
      if (!selectedCell) return;
      updateCell(selectedCell.row, selectedCell.col, val);
    },
    [selectedCell],
  );

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

      if (/^[1-9]$/.test(e.key)) handleInput(Number(e.key));
      if (e.key === "Backspace" || e.key === "Delete") handleInput(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, handleInput]); // <-- Добавили handleInput сюда

  const handleNewGame = () => {
    setBoard(generateBoard(difficulty));
    setIsWon(false);
  };

  return (
    <main
      className={`flex flex-col min-h-screen items-center justify-center p-4 ${themeBg[theme]}`}
    >
      <div className="max-w-md w-full flex flex-col items-center gap-6">
     
        <header className="w-full flex justify-between items-center bg-white/5 dark:bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-slate-200/10 shadow-sm">
          <div className="flex gap-2">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="rounded-xl border border-slate-300 dark:border-zinc-700 bg-transparent px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="easy" className="text-black">
                Easy
              </option>
              <option value="medium" className="text-black">
                Medium
              </option>
              <option value="hard" className="text-black">
                Hard
              </option>
            </select>

            <button
              onClick={handleNewGame}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium px-4 py-1.5 text-sm shadow-md transition-all active:scale-95"
            >
              New Game
            </button>
          </div>

       
          <div className="flex gap-1 bg-slate-200/50 dark:bg-zinc-800 p-1 rounded-xl">
            {(["light", "dark", "cyberpunk"] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-2.5 py-1 text-xs font-semibold uppercase rounded-lg transition-all ${
                  theme === t
                    ? "bg-white dark:bg-zinc-600 shadow-sm text-blue-600 dark:text-amber-400"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {t[0]}
              </button>
            ))}
          </div>
        </header>

       
        <SudokuBoard
          board={board}
          selectedCell={selectedCell}
          onSelectCell={setSelectedCell}
          theme={theme}
        />

        <div className="w-full grid grid-cols-5 gap-2 mt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num)}
              className={`py-3 rounded-xl font-bold text-lg shadow-sm border transition-all active:scale-95 ${
                theme === "cyberpunk"
                  ? "bg-zinc-900 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                  : theme === "dark"
                    ? "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                    : "bg-white border-slate-200 text-slate-800 hover:bg-slate-100"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleInput(null)}
            className={`py-3 rounded-xl font-medium text-sm col-span-1 shadow-sm border transition-all active:scale-95 ${
              theme === "cyberpunk"
                ? "bg-zinc-900 border-red-500 text-red-400 hover:bg-red-500 hover:text-black"
                : "bg-red-500 text-white border-transparent hover:bg-red-600"
            }`}
          >
            ✕
          </button>
        </div>
      </div>

  
      {isWon && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 animate-fade-in">
          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-2xl border border-slate-200 dark:border-zinc-800 text-center max-w-sm mx-4 transform scale-100 transition-all">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="mb-2 text-2xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Congratulations!
            </h2>
            <p className="mb-6 text-slate-500 dark:text-zinc-400">
              You solved the puzzle flawlessly!
            </p>
            <button
              onClick={handleNewGame}
              className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
