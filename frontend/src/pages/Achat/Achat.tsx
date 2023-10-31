import {useEffect, useState} from "react"
import { Cards } from "@/components/Cards/Cards"
import Select from "react-select"
import "./Achat.css"


export const Achat = ({wallet}) => {

    const [boosteredCards, setBoosteredCards] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isMinted, setIsMinted] = useState(false)

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    const options = [
        { value: 'chocolate', label: 'Chocolates' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    const encodeURICard = (cards : any) : string[]=>{
        var mintedCardURIs = [];
        for (const card of cards) {
          const cardURI : string = JSON.stringify(card.id)
          mintedCardURIs.push(cardURI);
        }
        return mintedCardURIs
      }

    const getRandomCard = async (collectionId:string) => {
        setIsMinted(false)
        const response = await fetch(`http://127.0.0.1:3000/booster?id=${collectionId}`).then((response) => {
            return response.json()
        })
        setBoosteredCards(response)
        setIsOpen(true)
    }

    useEffect(()=>{
        // if(isOpen){
        //     const c : string[] = encodeURICard(boosteredCards)
        //     wallet?.contract.mintCards("xyp", wallet?.details.account,c)
        //     .then(()=>setIsMinted(true))
        //     .catch((error: any)=> {
        //         console.error("Erreur lors de l'appel à la fonction mintCards en ouvrant un booster :", error);
        //       });
        // }
    }, [boosteredCards])
    
    return (
        <div className="selector-button">
            <button onClick={()=>getRandomCard("xyp")}>Open Booster</button>
            <Select
                className="selector"
                isDisabled={isDisabled}
                isClearable={isClearable}
                options={options}
            />

            {/* {isMinted && <Cards cards={boosteredCards} isPlayerCard={true}></Cards>} */}
        </div>
    )
}
