import {
    Player,
    createPlayer,
    createRandomShips,
} from '../reduxClasses/reduxPlayer'
import { Game, createGame } from '../reduxClasses/reduxGame'
import { Board } from '../reduxClasses/reduxBoard'
import { Action } from './actions'
import {
    START_GAME,
    CREATE_RANDOM_BOARD,
    CANCEL_GAME,
    CREATE_BOARD,
    IS_GAME_ENDED,
    CHANGE_MODE,
    ADD_ELEMENT,
    SWITCH_CURRENT,
    HIT_ELEMENT_WITH_BOMB,
} from './consts'

const Player1 = createPlayer('Name of first player')
const Player2 = createPlayer('Name of second player')

const initialState = {
    game: createGame(Player1, Player2, 'human'),
}

export const gameReducer = (
    state: { game: Game } = initialState,
    action: Action
): { game: Game } => {
    switch (action.type) {
        case 'CHANGE_NAME':
            if (state.game.currentPlayer == 1) {
                return {
                    game: {
                        ...state.game,
                        player1: {
                            ...state.game.player1,
                            name: action.payload,
                        },
                    },
                }
            } else {
                return {
                    ...state,
                    game: {
                        ...state.game,
                        player2: {
                            ...state.game.player2,
                            name: action.payload,
                        },
                    },
                }
            }
        case ADD_ELEMENT:
            if (state.game.currentPlayer == 1) {
                return {
                    ...state,
                    game: {
                        ...state.game,
                        player1: action.payload,
                    },
                }
            } else {
                return {
                    ...state,
                    game: {
                        ...state.game,
                        player2: action.payload,
                    },
                }
            }

        case 'HIT_ELEMENT':
            if (state.game.currentPlayer == 2) {
                return {
                    game: {
                        ...state.game,
                        player1: action.payload,
                        currentPlayer: 1,
                    },
                }
            } else {
                return {
                    ...state,
                    game: {
                        ...state.game,
                        player2: action.payload,
                        currentPlayer: 2,
                    },
                }
            }
        case HIT_ELEMENT_WITH_BOMB:
            return {
                ...state,
                game: { ...action.payload },
            }
        case SWITCH_CURRENT:
            return {
                game: {
                    ...state.game,
                    currentPlayer: state.game.currentPlayer == 1 ? 2 : 1,
                },
            }
        case CREATE_RANDOM_BOARD:
            const updatedCurrentPlayer = createRandomShips(
                state.game.currentPlayer == 1
                    ? state.game.player1
                    : state.game.player2
            )
            if (state.game.currentPlayer == 1) {
                return {
                    game: {
                        ...state.game,
                        player1: updatedCurrentPlayer,
                    },
                }
            } else {
                return {
                    game: {
                        ...state.game,
                        player2: updatedCurrentPlayer,
                    },
                }
            }
        case CANCEL_GAME:
            return { ...initialState }
        case CHANGE_MODE:
            return {
                game: {
                    ...state.game,
                    mode: 'computer',
                },
            }
        default:
            return state
    }
}
