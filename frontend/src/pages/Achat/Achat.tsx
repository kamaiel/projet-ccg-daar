import {useEffect, useState} from "react"
import { Cards } from "@/components/Cards/Cards"


export const Achat = ({wallet}) => {

    const [boosteredCards, setBoosteredCards] = useState([])

    const getRandomCard = async (collectionId:string) => {
        const response = await fetch(`http://127.0.0.1:3000/booster?id=${collectionId}`).then((response) => {
            return response.json()
        })
        setBoosteredCards(response)
    }

    const mintCards = async (collectionId:string) => {
        getRandomCard(collectionId)
    }

    useEffect(()=>{

    })
    
    return (
        <div>
            <h1>Achat</h1>
            <button onClick={()=>mintCards("base1")}>Open Booster</button>
            {boosteredCards.length > 0 && <Cards cards={boosteredCards} isPlayerCard={true}></Cards>}
        </div>
    )
}
