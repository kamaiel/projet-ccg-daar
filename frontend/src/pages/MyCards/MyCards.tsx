import { useEffect, useState } from "react"
import "./MyCards.css"
import Card from "../../components/Cards/Cards"

export const MyCards = ({wallet}) => {

    const [myCards, setMyCards] = useState([])

    const fetchMyCards = async () => {

        const myCard = await wallet?.contract.getNFT("base1", wallet?.details?.account)
        console.log(myCard)
    }


    useEffect(() => {
        fetchMyCards()
    })


    return (
        <div className="deckPage">
            {/* {cardsSample.map((item, index) => (
                <Card cardLink={item.images.small} index={index} firstCard={firstCard}/> 
            ))} */}
            MyCards
        </div>
    )
}