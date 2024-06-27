import React, { useState } from 'react'
import c from './Game.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Game as ClassGame } from '../../reduxClasses/reduxGame'
import { Cell, createCell } from '../../reduxClasses/reduxCell'
import { ADD_ELEMENT, CANCEL_GAME, SWITCH_CURRENT } from '../../redux/consts'
import Result from '../result/Result'
import Button from '../button/Button'
import { useNavigate } from 'react-router-dom'
import { MENU_ROUTE } from '../appRouter/routes'

const Game = () => {
    const data = useSelector((state: { game: ClassGame }) => state.game)
    const dispatch = useDispatch()
    const [isFinish, setIsFinish] = useState(false)
    const nav = useNavigate()

    function isGameOver(board: Cell[][]): boolean {
        for (let row of board) {
            for (let cell of row) {
                if (cell.hasShip && !cell.isHit) {
                    return false // Гра не закінчена, якщо є корабель, який не підбитий
                }
            }
        }
        dispatch({
            type: CANCEL_GAME,
        })
        return true // Всі кораблі підбиті, гра закінчена
    }

    const fire = (cell: Cell) => {
        if (!cell.isHit) {
            let updatedPlayer = JSON.parse(
                JSON.stringify(
                    data.currentPlayer == 1 ? data.player2 : data.player1
                )
            )

            let updatedCell =
                updatedPlayer.board.cells[cell.position.x][cell.position.y]

            if (updatedCell.isHit == false) {
                updatedCell.isHit = true
            }

            updatedPlayer.board.cells[cell.position.x][cell.position.y] =
                updatedCell

            if (isGameOver(updatedPlayer.board.cells)) {
                setIsFinish(true)
            }
            dispatch({
                type: 'HIT_ELEMENT',
                payload: updatedPlayer,
            })
        }
        if (data.mode == 'computer' && !cell.isHit) {
            fireByComputer()
        }
    }

    const fireByComputer = () => {
        const cell = createCell(
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10)
        )
        let updatedPlayer = JSON.parse(
            JSON.stringify(
                data.currentPlayer == 2 ? data.player2 : data.player1
            )
        )

        let updatedCell =
            updatedPlayer.board.cells[cell.position.x][cell.position.y]

        if (updatedCell.isHit == false) {
            updatedCell.isHit = true
        }

        updatedPlayer.board.cells[cell.position.x][cell.position.y] =
            updatedCell

        if (isGameOver(updatedPlayer.board.cells)) {
            setIsFinish(true)
        }
        dispatch({
            type: 'HIT_ELEMENT',
            payload: updatedPlayer,
        })
    }
    const cancelGame = () => {
        dispatch({
            type: CANCEL_GAME,
        })
        nav('/' + MENU_ROUTE)
    }
    return (
        <div className={c.game}>
            <div className={c.game__cancel}>
                <Button title="close the game" nextStep={cancelGame} />
            </div>
            {isFinish ? (
                <Result
                    player={
                        data.currentPlayer == 2
                            ? data.player2.name
                            : data.player1.name
                    }
                />
            ) : (
                <span></span>
            )}
            <div className={c.player}>
                <p className={c.name}>{data.player1.name}</p>
                <div
                    className={c.board__table}
                    style={{ opacity: data.currentPlayer == 1 ? '0.6' : '1' }}
                >
                    {data.player1.board.cells &&
                        data.player1.board.cells.map((row) => (
                            <div
                                key={`${row[0].position.x}${row[0].position.y}`}
                                className={c.board__row}
                            >
                                {row.map((cell) => (
                                    <button
                                        key={`${cell.position.x}${cell.position.y}`}
                                        onClick={() => fire(cell)}
                                        style={{
                                            backgroundColor: cell.isHit
                                                ? cell.hasShip
                                                    ? 'blue'
                                                    : cell.hasTrap
                                                    ? 'red'
                                                    : 'gray'
                                                : 'white',
                                            pointerEvents:
                                                data.currentPlayer == 1
                                                    ? 'none'
                                                    : 'auto',
                                        }}
                                        className={c.board__cell}
                                    ></button>
                                ))}
                            </div>
                        ))}
                </div>
            </div>
            <div className={c.player}>
                <p className={c.name}>
                    {data.player2.name ? data.player2.name : ''}
                </p>
                <div
                    className={c.board__table}
                    style={{ opacity: data.currentPlayer == 2 ? '0.6' : '1' }}
                >
                    {data.player2.board.cells &&
                        data.player2.board.cells.map((row) => (
                            <div
                                key={`${row[0].position.x}${row[0].position.y}`}
                                className={c.board__row}
                            >
                                {row.map((cell) => (
                                    <button
                                        key={`${cell.position.x}${cell.position.y}`}
                                        onClick={() => fire(cell)}
                                        style={{
                                            backgroundColor: cell.isHit
                                                ? cell.hasShip
                                                    ? 'blue'
                                                    : cell.hasTrap
                                                    ? 'red'
                                                    : 'gray'
                                                : 'white',
                                            pointerEvents:
                                                data.currentPlayer == 2
                                                    ? 'none'
                                                    : 'auto',
                                        }}
                                        className={c.board__cell}
                                    ></button>
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Game
