import c from './Button.module.scss'

interface Props {
    title: string
    nextStep: () => void
}

const Button: React.FC<Props> = ({ title, nextStep }) => {
    return (
        <button onClick={nextStep} className={c.button}>
            {title}
        </button>
    )
}

export default Button
