import { type Board } from "../types/sudoku";

export const mockBoard: Board = [
  [
    { value: 5, fixed: true, error: false },
    { value: 3, fixed: true, error: false },
    { value: null, fixed: false, error: false },
    { value: null, fixed: false, error: false },
    { value: 7, fixed: true, error: false },
    { value: null, fixed: false, error: false },
    { value: null, fixed: false, error: false },
    { value: null, fixed: false, error: false },
    { value: null, fixed: false, error: false },
  ],
  ...Array.from({ length: 8 }, () =>
    Array.from({ length: 9 }, () => ({
      value: null,
      fixed: false,
      error: false
    })),
  ),
];
