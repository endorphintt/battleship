export interface Position {
    x: number
    y: number
}

// Функція для створення позиції
export const createPosition = (x: number, y: number): Position => ({ x, y })

// Інші функції для роботи з позиціями (якщо потрібно)
export const movePosition = (
    position: Position,
    deltaX: number,
    deltaY: number
): Position => ({
    x: position.x + deltaX,
    y: position.y + deltaY,
})
