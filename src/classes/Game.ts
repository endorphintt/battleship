import { Player } from './Player'

export class Game {
    player1: Player
    player2: Player
    currentPlayer: Player
    mode: string

    constructor(player1: Player, player2: Player, mode: string) {
        this.player1 = player1
        this.player2 = player2
        this.currentPlayer = player1
        this.mode = mode
    }

    switchPlayer() {
        this.currentPlayer =
            this.currentPlayer === this.player1 ? this.player2 : this.player1
    }

    checkForWinner() {}
}
