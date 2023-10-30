import "./Cards.css"
import {useEffect, useState} from "react"

export const Cards = (props:any) => {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(props.cards)
    })

    return(
        <ul className="cartes">
                {cards.map((card : any, index : any) => (
                    <img key={index} src={card.link} alt={'Carte'} style={{filter:props.isPlayerCard&&"brightness(1)"}} />
                )
                )}
        </ul>
    )
}
