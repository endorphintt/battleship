import React from 'react'
import c from './Result.module.scss'
import { useNavigate } from 'react-router-dom'
import { MENU_ROUTE } from '../appRouter/routes'
import { useDispatch } from 'react-redux'
import { CANCEL_GAME } from '../../redux/consts'

interface Props {
    player: string
}

const Result: React.FC<Props> = ({ player }) => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const toMainMenu = () => {
        dispatch({
            type: CANCEL_GAME,
        })
        nav('/' + MENU_ROUTE)
    }
    return (
        <div className={c.res}>
            <p>{player} won!</p>
            <button className={c.button} onClick={toMainMenu}>
                main menu
            </button>
        </div>
    )
}

export default Result
