import Board from '../board/Board'
import Game from '../game/Game'
import Menu from '../menu/Menu'

export const BOARD_ROUTE = 'board'
export const GAME_ROUTE = 'game'
export const MENU_ROUTE = 'menu'

interface Routes {
    path: string
    Component: React.FunctionComponent<{}>
}

export const routes: Routes[] = [
    {
        path: BOARD_ROUTE,
        Component: Board,
    },
    {
        path: GAME_ROUTE,
        Component: Game,
    },
    {
        path: MENU_ROUTE,
        Component: Menu,
    },
]
