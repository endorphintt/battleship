import { useState } from 'react'
import c from './Menu.module.scss'
import Rules from '../rules/Rules'
import { useNavigate } from 'react-router-dom'
import Button from '../button/Button'
import { BOARD_ROUTE } from '../appRouter/routes'
import { useDispatch, useSelector } from 'react-redux'
import { Game } from '../../classes/Game'
import { CHANGE_MODE } from '../../redux/consts'

const Menu = () => {
    const data = useSelector((state: { game: Game }) => state.game)
    const dispatch = useDispatch()
    const [rules, setRules] = useState(false)
    const nav = useNavigate()

    const playWithComputer = () => {
        dispatch({
            type: CHANGE_MODE,
        })
        nav('/' + BOARD_ROUTE)
    }

    const playWithHuman = () => {
        nav('/' + BOARD_ROUTE)
    }

    return (
        <div className={c.menu}>
            <div className={c.menu__body}>
                <img className={c.menu__ship} src="ship.png" alt="ship.png" />
                <div className={c.menu__info}>
                    <h1 className={c.menu__title}>BATTLESHIP</h1>
                    <div className={c.menu__buttons}>
                        <Button
                            title="play with computer"
                            nextStep={playWithComputer}
                        />
                        <Button
                            title="play with friend"
                            nextStep={playWithHuman}
                        />
                        <Button title="rules" nextStep={() => setRules(true)} />
                    </div>
                </div>
            </div>
            {rules ? (
                <Rules setDisplay={() => setRules(false)} display={rules} />
            ) : (
                <span></span>
            )}
        </div>
    )
}

export default Menu
