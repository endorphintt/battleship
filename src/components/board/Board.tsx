import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Game } from '../../reduxClasses/reduxGame'
import { Player } from '../../reduxClasses/reduxPlayer'
import c from './Board.module.scss'
import Button from '../button/Button'
import {
    Cell,
    cancelElement,
    placeShip,
    placeTrap,
} from '../../reduxClasses/reduxCell'
import {
    ADD_ELEMENT,
    CHANGE_NAME,
    CREATE_RANDOM_BOARD,
    START_GAME,
    SWITCH_CURRENT,
} from '../../redux/consts'
import { useNavigate } from 'react-router-dom'
import { GAME_ROUTE } from '../appRouter/routes'

interface Props {}

const Board: React.FC<Props> = () => {
    const data = useSelector((state: { game: Game }) => state.game)
    const nav = useNavigate()
    const dispatch = useDispatch()
    const mode = data.mode
    const name = data.currentPlayer == 1 ? data.player1.name : data.player2.name
    const [addElement, setAddElement] = useState<string>('ship')

    const handleRandomShips = () => {
        dispatch({
            type: CREATE_RANDOM_BOARD,
        })
    }

    const addElementToBoard = (cell: Cell) => {
        let updatedPlayer = JSON.parse(
            JSON.stringify(
                data.currentPlayer == 1 ? data.player1 : data.player2
            )
        ) // Глибока копія поточного гравця

        let updatedCell =
            updatedPlayer.board.cells[cell.position.x][cell.position.y]

        if (updatedCell.hasShip || updatedCell.hasTrap) {
            updatedCell.hasShip = false
            updatedCell.hasTrap = false
        } else {
            // Оновлюємо клітинку на дошці гравця
            if (addElement === 'ship') {
                updatedCell.hasShip = true
            } else {
                updatedCell.hasTrap = true
            }
        }

        // Оновлюємо дошку у копії гравця
        updatedPlayer.board.cells[cell.position.x][cell.position.y] =
            updatedCell

        // Оновлюємо стан поточного гравця у стані
        dispatch({
            type: ADD_ELEMENT,
            payload: updatedPlayer,
        })
    }

    const moveToNextPlayer = () => {
        dispatch({
            type: SWITCH_CURRENT,
        })
    }

    const startGame = () => {
        if (data.currentPlayer == 1) {
            moveToNextPlayer()
            dispatch({
                type: CHANGE_NAME,
                payload: 'computer',
            })
            handleRandomShips()
        }
        nav('/' + GAME_ROUTE)
        dispatch({
            type: SWITCH_CURRENT,
        })
    }

    const setName = (e: string) => {
        dispatch({
            type: CHANGE_NAME,
            payload: e,
        })
    }

    return (
        <div className={c.board}>
            <div className={c.board__table}>
                {(data.currentPlayer == 1 ? data.player1 : data.player2).board
                    .cells &&
                    (data.currentPlayer == 1
                        ? data.player1
                        : data.player2
                    ).board.cells.map((row) => (
                        <div
                            key={`${row[0].position.x}${row[0].position.y}`}
                            className={c.board__row}
                        >
                            {row.map((cell) => (
                                <button
                                    key={`${cell.position.x}${cell.position.y}`}
                                    onClick={() => addElementToBoard(cell)}
                                    style={{
                                        backgroundColor: cell.hasShip
                                            ? 'blue'
                                            : cell.hasTrap
                                            ? 'red'
                                            : 'white',
                                    }}
                                    className={c.board__cell}
                                ></button>
                            ))}
                        </div>
                    ))}
            </div>
            <div className={c.board__info}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                />
                <Button title="random" nextStep={handleRandomShips} />
                {addElement == 'ship' ? (
                    <div style={{ opacity: 0.5 }}>
                        <Button
                            title="add ship"
                            nextStep={() => setAddElement('ship')}
                        />
                    </div>
                ) : (
                    <div style={{ opacity: 1 }}>
                        <Button
                            title="add ship"
                            nextStep={() => setAddElement('ship')}
                        />
                    </div>
                )}
                {addElement == 'trap' ? (
                    <div style={{ opacity: 0.5 }}>
                        <Button
                            title="add trap"
                            nextStep={() => setAddElement('trap')}
                        />
                    </div>
                ) : (
                    <div style={{ opacity: 1 }}>
                        <Button
                            title="add trap"
                            nextStep={() => setAddElement('trap')}
                        />
                    </div>
                )}
                {mode == 'human' ? (
                    <div>
                        {data.currentPlayer == 1 ? (
                            <Button
                                title="next player"
                                nextStep={moveToNextPlayer}
                            />
                        ) : (
                            <Button title="start" nextStep={startGame} />
                        )}
                    </div>
                ) : (
                    <Button title="start" nextStep={startGame} />
                )}
            </div>
        </div>
    )
}

export default Board
