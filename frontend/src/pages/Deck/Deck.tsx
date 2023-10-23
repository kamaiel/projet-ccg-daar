import { useState } from "react"
import "./Deck.css"
import Card from "../../components/Card/Card"

import cards from "../../pokemon-samples.json"
import { Header } from "@/components/Header/Header"

export const Deck = () => {

    let cardsSample = cards.data

    let firstCard = Math.floor(window.innerWidth / 382)-1

    return (
        <div>
            <Header></Header>
            <div className="deckPage">
                {cardsSample.map((item, index) => (
                    <Card cardLink={item.images.small} index={index} firstCard={firstCard}/> 
                ))}
            </div>
        </div>
    )
}