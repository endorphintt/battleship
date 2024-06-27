import { Cell } from './reduxCell'
import { createCell, receiveShot as receiveShotOnCell } from './reduxCell'

export interface Board {
    cells: Cell[][]
}

// Функція для створення дошки
export const createBoard = (): Board => {
    const cells: Cell[][] = []
    for (let i = 0; i < 10; i++) {
        const row: Cell[] = []
        for (let j = 0; j < 10; j++) {
            row.push(createCell(i, j))
        }
        cells.push(row)
    }
    return { cells }
}

// Функція для отримання пострілу по клітині на дошці
export const receiveShot = (board: Board, x: number, y: number): Board => {
    const updatedCells = board.cells.map((row, i) =>
        row.map((cell, j) =>
            i === x && j === y ? receiveShotOnCell(cell) : cell
        )
    )
    return { ...board, cells: updatedCells }
}
