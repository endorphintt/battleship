import { Position } from './Position'

export class Cell {
    position: Position
    hasShip: boolean
    isHit: boolean
    hasTrap: boolean

    constructor(x: number, y: number) {
        this.position = new Position(x, y)
        this.hasShip = false
        this.isHit = false
        this.hasTrap = false
    }

    placeShip() {
        this.hasShip = true
    }

    placeTrap() {
        this.hasTrap = true
    }

    receiveShot() {
        this.isHit = true
    }

    cancelElement() {
        this.hasShip = false
        this.hasTrap = false
    }
}
