export interface Cell {
   value: number | null;
   fixed: boolean;
   error: boolean;
}

export type Difficulty = | "easy" | "medium" | "hard";

export type Board = Cell[][]