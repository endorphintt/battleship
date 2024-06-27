import { Cell } from './Cell'

export class Ship {
    size: number
    cells: Cell[]

    constructor(size: number) {
        this.size = size
        this.cells = []
    }
}
