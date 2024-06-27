import { Board } from './Board'
import { Ship } from './Ship'
import { Position } from './Position'
import { Trap } from './Trap'
import {
    generateRandomPosition,
    getRandomInt,
    isValidPosition,
} from './functions'
import { Cell } from './Cell'

export class Player {
    name: string
    board: Board
    ships: Ship[]
    traps: Trap[]

    constructor(name: string) {
        this.name = name
        this.board = new Board()
        this.ships = []
        this.traps = []
    }

    createRandomShips() {
        const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
        for (const size of shipSizes) {
            this.placeRandomShip(size)
        }

        this.createRandomTraps(4) // Створюємо 4 пастки
    }

    placeRandomShip(size: number) {
        let placed = false

        while (!placed) {
            const position = generateRandomPosition()
            const direction = getRandomInt(2) // 0 for horizontal, 1 for vertical
            const shipPositions: Position[] = []

            for (let i = 0; i < size; i++) {
                const x = direction === 0 ? position.x + i : position.x
                const y = direction === 0 ? position.y : position.y + i

                if (
                    !isValidPosition(x, y) ||
                    this.isAdjacentToOthers(new Position(x, y))
                ) {
                    break
                }
                shipPositions.push(new Position(x, y))
            }

            if (shipPositions.length === size) {
                const ship = new Ship(size)
                shipPositions.forEach((pos) => {
                    this.board.cells[pos.x][pos.y].placeShip()
                    ship.cells.push(this.board.cells[pos.x][pos.y])
                })
                this.ships.push(ship)
                placed = true
            }
        }
    }

    createRandomTraps(numberOfTraps: number) {
        for (let i = 0; i < numberOfTraps; i++) {
            this.placeRandomTrap()
        }
    }

    placeRandomTrap() {
        let placed = false

        while (!placed) {
            const position = generateRandomPosition()
            if (
                !this.board.cells[position.x][position.y].hasShip &&
                !this.board.cells[position.x][position.y].hasTrap &&
                !this.isAdjacentToOthers(position)
            ) {
                this.board.cells[position.x][position.y].placeTrap()
                this.traps.push(new Trap(position.x, position.y))
                placed = true
            }
        }
    }

    isAdjacentToOthers(position: Position): boolean {
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
                    this.board.cells[i][j].hasShip ||
                    this.board.cells[i][j].hasTrap
                ) {
                    return true
                }
            }
        }
        return false
    }

    createShips(board: Cell[][]): string {
        const expectedShipCounts: { [key: string]: number } = {
            '4': 1,
            '3': 2,
            '2': 3,
            '1': 4,
        }
        let actualShipCounts: { [key: string]: number } = {
            '4': 0,
            '3': 0,
            '2': 0,
            '1': 0,
        }
        const visited: boolean[][] = Array.from({ length: 10 }, () =>
            Array(10).fill(false)
        )
        const ships: Ship[] = []

        // Traverse the board and find ships
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (board[i][j].hasShip && !visited[i][j]) {
                    const shipPositions: Position[] = []
                    if (!this.dfs(board, i, j, visited, shipPositions)) {
                        return 'try again'
                    }

                    const size = shipPositions.length
                    if (!(size.toString() in expectedShipCounts)) {
                        return 'try again'
                    }

                    actualShipCounts[size.toString()]++
                    const ship = new Ship(size)
                    for (const pos of shipPositions) {
                        ship.cells.push(board[pos.x][pos.y])
                    }
                    ships.push(ship)
                }
            }
        }

        // Check if ship counts are correct
        for (const size in expectedShipCounts) {
            if (actualShipCounts[size] !== expectedShipCounts[size]) {
                return 'try again'
            }
        }

        // Update player's ships
        this.ships = ships

        return 'success'
    }

    // Depth-First Search to traverse ship parts
    dfs(
        board: Cell[][],
        x: number,
        y: number,
        visited: boolean[][],
        positions: Position[]
    ): boolean {
        if (!isValidPosition(x, y) || visited[x][y] || !board[x][y].hasShip) {
            return true
        }

        visited[x][y] = true
        positions.push(new Position(x, y))

        const directions = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
        ]

        for (const { dx, dy } of directions) {
            if (!this.dfs(board, x + dx, y + dy, visited, positions)) {
                return false
            }
        }

        return true
    }

    getMove(x: number, y: number) {
        const cell = this.board.cells[x][y]
        cell.receiveShot()

        if (cell.hasTrap) {
            return 'hit trap' // треба написати щось для пастки
        }
    }

    checkAllShipsSunk(): boolean {
        return this.ships.every((ship) =>
            ship.cells.every((cell) => cell.isHit)
        )
    }
}
