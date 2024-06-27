import { Position } from './Position'

export class Trap {
    position: Position

    constructor(x: number, y: number) {
        this.position = new Position(x, y)
    }
}
