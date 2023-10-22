import { useState } from "react"
import "./Deck.css"
import Card from "../../components/Card/Card"

import cards from "../../../public/pokemon-samples.json"

export const Deck = () => {

    let cardsSample = cards.data

    return (
        <div className="deckPage">
            {cardsSample.map((item, index) => (
                <Card cardLink={item.images.small} />
            ))}
        </div>
    )
}