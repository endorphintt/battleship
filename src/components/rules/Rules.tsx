import React from 'react'
import c from './Rules.module.scss'
import Button from '../button/Button'

interface Props {
    display: boolean
    setDisplay: () => void
}

const Rules: React.FC<Props> = ({ display, setDisplay }) => {
    return (
        <div style={{ display: display ? 'block' : 'none' }} className={c.res}>
            <p>
                Zasady gry "Statki" z 4 pułapkami Ogólne zasady Liczba graczy:
                2. Wymiary pola gry: Każdy gracz ma swoje pole o wymiarach 10x10
                pól. Przygotowanie do gry Każdy gracz umieszcza na swoim polu: 1
                statek czteromasztowy (zajmuje 4 pola), 2 statki trójmasztowe
                (zajmują po 3 pola), 3 statki dwumasztowe (zajmują po 2 pola), 4
                statki jednomasztowe (zajmują po 1 polu). Statki mogą być
                umieszczane poziomo lub pionowo i nie mogą się stykać bokami ani
                rogami. Każdy gracz umieszcza na swoim polu 4 pułapki. Pułapki
                mogą być umieszczane w dowolnych miejscach, niezależnie od
                pozycji statków. Przebieg gry Gracze wykonują ruchy na zmianę. W
                trakcie swojego ruchu gracz wybiera jedno pole na planszy
                przeciwnika i "strzela". Możliwe są trzy wyniki strzału:
                Trafienie w statek: Gracz otrzymuje informację o trafieniu.
                Jeżeli trafienie spowoduje zatopienie statku, gracz otrzymuje
                informację o zatopieniu. Pudło: Strzał nie trafia w żaden statek
                ani pułapkę. Trafienie w pułapkę: Gracz otrzymuje informację o
                trafieniu w pułapkę. Strzelający gracz traci jeden z kolejnych
                ruchów. Zakończenie gry Gra kończy się, gdy jeden z graczy
                zatopi wszystkie statki przeciwnika. Zwycięzcą zostaje gracz,
                który jako pierwszy zatopi wszystkie statki przeciwnika.
                Dodatkowe zasady Jeżeli gracz trafi w pułapkę, traci jeden z
                kolejnych ruchów. Gracz, który strzelił, zostaje poinformowany o
                trafieniu w pułapkę, ale nie o dokładnej lokalizacji pułapki.
                Pułapki nie mogą być umieszczone na tych samych polach co
                statki. Po trafieniu w pułapkę, gracz, który umieścił pułapkę,
                może przesunąć jedną ze swoich pozostałych pułapek na inne wolne
                pole, informując przeciwnika tylko o przesunięciu, ale nie o
                nowej lokalizacji.
            </p>
            <Button title="close" nextStep={setDisplay} />
        </div>
    )
}

export default Rules
