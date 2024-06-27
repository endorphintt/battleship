// types.ts
import { createPosition } from './reduxPosition'
import { Position } from './reduxPosition'

export interface Trap {
    position: Position
}

// Функція для створення пастки
export const createTrap = (x: number, y: number): Trap => ({
    position: createPosition(x, y),
})

// Інші функції для роботи з пастками (якщо потрібно)
// Наприклад, переміщення пастки
export const moveTrap = (trap: Trap, deltaX: number, deltaY: number): Trap => ({
    ...trap,
    position: {
        ...trap.position,
        x: trap.position.x + deltaX,
        y: trap.position.y + deltaY,
    },
})
