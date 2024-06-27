import { Position } from './Position'

const BOARD_SIZE = 10

export function isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE
}

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max)
}

export function generateRandomPosition(): Position {
    return new Position(getRandomInt(BOARD_SIZE), getRandomInt(BOARD_SIZE))
}