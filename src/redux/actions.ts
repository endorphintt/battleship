import { Game } from '../reduxClasses/reduxGame'
import { Player } from '../reduxClasses/reduxPlayer'

export type Action =
    | { type: 'START_GAME'; payload: Game }
    | { type: 'CREATE_RANDOM_BOARD' }
    | { type: 'CANCEL_GAME' }
    | { type: 'CREATE_BOARD'; payload: Player }
    | { type: 'IS_GAME_ENDED'; payload: Player }
    | { type: 'CHANGE_MODE' }
    | { type: 'ADD_ELEMENT'; payload: Player }
    | { type: 'HIT_ELEMENT'; payload: Player }
    | { type: 'HIT_ELEMENT_WITH_BOMB'; payload: Game }
    | { type: 'SWITCH_CURRENT' }
    | { type: 'CHANGE_NAME'; payload: string }
