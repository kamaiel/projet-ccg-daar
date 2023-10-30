import {useEffect, useState} from "react"
import { Cards } from "@/components/Cards/Cards"


export const Achat = ({wallet}) => {

    const [boosteredCards, setBoosteredCards] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const encodeURICard = (cards : any)=>{
        var mintedCardURIs = [];
        for (const card of cards) {
          const cardURI = JSON.stringify(card.id)
          mintedCardURIs.push(cardURI);
        }
        return mintedCardURIs
      }

    const getRandomCard = async (collectionId:string) => {
        const response = await fetch(`http://127.0.0.1:3000/booster?id=${collectionId}`).then((response) => {
            return response.json()
        })
        setBoosteredCards(response)
        setIsOpen(true)
    }

    useEffect(()=>{
        if(isOpen && wallet){
            const c = encodeURICard(boosteredCards)
            wallet.contract.mintCards("xyp", wallet.details.account,c)
            .then((result: any) => {console.log(result)})
            .catch((error: any)=> {
                console.error("Erreur lors de l'appel à la fonction mintCards en ouvrant un booster :", error);
              });
        }
    }, [boosteredCards])
    
    return (
        <div>
            <h1>Achat</h1>
            <button onClick={()=>getRandomCard("xyp")}>Open Booster</button>
            {boosteredCards.length > 0 && <Cards cards={boosteredCards} isPlayerCard={true}></Cards>}
        </div>
    )
}
