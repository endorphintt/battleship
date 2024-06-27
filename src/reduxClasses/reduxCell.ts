// types.ts
import { Position } from './reduxPosition'
import { createPosition } from './reduxPosition'

export interface Cell {
    position: Position
    hasShip: boolean
    isHit: boolean
    hasTrap: boolean
}

// Функція для створення клітини
export const createCell = (x: number, y: number): Cell => ({
    position: createPosition(x, y),
    hasShip: false,
    isHit: false,
    hasTrap: false,
})

// Функція для розміщення корабля в клітині
export const placeShip = (cell: Cell): Cell => ({
    ...cell,
    hasShip: true,
})

// Функція для розміщення пастки в клітині
export const placeTrap = (cell: Cell): Cell => ({
    ...cell,
    hasTrap: true,
})

// Функція для отримання пострілу в клітину
export const receiveShot = (cell: Cell): Cell => ({
    ...cell,
    isHit: true,
})

// Функція для скасування розміщених елементів в клітині
export const cancelElement = (cell: Cell): Cell => ({
    ...cell,
    hasShip: false,
    hasTrap: false,
})
