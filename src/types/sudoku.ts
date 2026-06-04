export interface Cell {
   value: number | null;
   fixed: boolean;
   error: boolean;
}

export type Board = Cell[][]