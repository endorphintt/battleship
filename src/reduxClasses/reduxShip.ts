// types.ts
import { Cell } from './reduxCell'

export interface Ship {
    size: number
    cells: Cell[]
}

// Функція для створення корабля
export const createShip = (size: number): Ship => ({
    size,
    cells: [],
})

// Функція для додавання клітини до корабля
export const addCellToShip = (ship: Ship, cell: Cell): Ship => ({
    ...ship,
    cells: [...ship.cells, cell],
})

// Функція для видалення клітини з корабля
export const removeCellFromShip = (ship: Ship, cell: Cell): Ship => ({
    ...ship,
    cells: ship.cells.filter((c) => c !== cell),
})
