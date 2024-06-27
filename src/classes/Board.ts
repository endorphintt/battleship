import { Cell } from './Cell'

export class Board {
    cells: Cell[][]

    constructor() {
        this.cells = this.createBoard()
    }

    createBoard(): Cell[][] {
        let board: Cell[][] = []
        for (let i = 0; i < 10; i++) {
            let row: Cell[] = []
            for (let j = 0; j < 10; j++) {
                row.push(new Cell(i, j))
            }
            board.push(row)
        }
        return board
    }

    receiveShot(x: number, y: number) {
        const cell = this.cells[x][y]
        return cell.receiveShot()
    }
}
