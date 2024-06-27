// playerFunctions.ts
import {
    createBoard,
    receiveShot as receiveShotOnBoard,
    Board,
} from './reduxBoard'
import { Ship, createShip, addCellToShip } from './reduxShip'
import { Trap, createTrap } from './reduxTrap'
import {
    Cell,
    createCell,
    placeShip as placeShipOnCell,
    placeTrap as placeTrapOnCell,
} from './reduxCell'
import { Position, createPosition } from './reduxPosition'
import {
    generateRandomPosition,
    getRandomInt,
    isValidPosition,
} from '../classes/functions'
import { getRandomBoard } from './randomBoards'

export interface Player {
    name: string
    board: Board
    ships: Ship[]
    traps: Trap[]
}

// Функція для створення гравця
export const createPlayer = (name: string): Player => ({
    name,
    board: createBoard(),
    ships: [],
    traps: [],
})

export const createRandomShips = (player: Player): Player => {
    const updatedPlayer = JSON.parse(JSON.stringify(player))
    updatedPlayer.board.cells = getRandomBoard()
    return updatedPlayer
}

// Функція для перевірки чи позиція поруч з іншими кораблями чи пастками
export const isAdjacentToOthers = (
    player: Player,
    position: Position
): boolean => {
    for (
        let i = Math.max(0, position.x - 1);
        i <= Math.min(9, position.x + 1);
        i++
    ) {
        for (
            let j = Math.max(0, position.y - 1);
            j <= Math.min(9, position.y + 1);
            j++
        ) {
            if (
                player.board.cells[i][j].hasShip ||
                player.board.cells[i][j].hasTrap
            ) {
                return true
            }
        }
    }
    return false
}

// Функція для обробки пострілу
export const getMove = (
    player: Player,
    x: number,
    y: number
): { player: Player; result: string } => {
    const updatedBoard = receiveShotOnBoard(player.board, x, y)
    const cell = updatedBoard.cells[x][y]
    let result = 'miss'

    if (cell.hasTrap) {
        result = 'hit trap'
    } else if (cell.hasShip) {
        result = 'hit ship'
    }

    return { player: { ...player, board: updatedBoard }, result }
}

// Функція для перевірки чи всі кораблі затоплені
export const checkAllShipsSunk = (player: Player): boolean => {
    return player.ships.every((ship) => ship.cells.every((cell) => cell.isHit))
}
