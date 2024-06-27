import { Player, createPlayer } from './reduxPlayer'

export interface Game {
    player1: Player
    player2: Player
    currentPlayer: number
    mode: string
}

export const createGame = (
    player1: Player,
    player2: Player,
    mode: string
): Game => ({
    player1,
    player2,
    currentPlayer: 1,
    mode,
})

export const switchPlayer = (game: Game): void => {
    game.currentPlayer = game.currentPlayer === 1 ? 2 : 1
}

export const checkForWinner = (game: Game) => {}
