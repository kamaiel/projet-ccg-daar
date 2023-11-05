import "./Cards.css";
import { useEffect, useState } from "react";

export const Cards = (props: any) => {
    const [cards, setCards] = useState([]);
    const [sellingStatus, setSellingStatus] = useState({});

    useEffect(() => {
        setCards(props.cards);
   
        const storedSellingStatus = localStorage.getItem("sellingStatus");
        if (storedSellingStatus) {
            setSellingStatus(JSON.parse(storedSellingStatus));
        }
    }, [props.cards]);

    const mettreEnVente = async (collectionName: any, tokenId: any, index: any) => {
        console.log(collectionName);
        console.log(tokenId);
        try {
            await props.wallet.contract.sellNFT(collectionName, props.wallet.details.account, tokenId, 50);
            setSellingStatus((prevStatus) => ({ ...prevStatus, [index]: true }));
            localStorage.setItem("sellingStatus", JSON.stringify({ ...sellingStatus, [index]: true }));

        } catch (error) {
            console.error("Erreur lors de la mise en vente de la carte :", error);
        }
    };

    const acheterCarte = async (collectionName: any, tokenId:any, index: any) => {
        try {
            await props.wallet.contract.buyNFT(props.wallet.details.account, collectionName, Number(tokenId));
            setSellingStatus(prevStatus => {
                const updatedStatus = { ...prevStatus, [index]: false };
                localStorage.setItem("sellingStatus", JSON.stringify(updatedStatus));
                return updatedStatus;
            });
    
            setCards(prevCards => {
                const updatedCards = prevCards.filter((card: any) => card.id + card.tokenId !== index);
                return updatedCards;
            });
        } catch (error) {
            console.error("Erreur lors de l'achat de la carte :", error);
        }
    };
    

    return (
        <ul className="cartes">
            {cards.map((card: any) => (
                <div className="carte" key={card.id+card.tokenId}>
                    <img src={card.link} alt={"Carte"} style={{ filter: props.isPlayerCard && "brightness(1)" }} />
                    {props.button && props.wallet && (
                        <button disabled={sellingStatus[card.id+card.tokenId]} onClick={() => mettreEnVente(card.collectionId, card.tokenId, card.id+card.tokenId)}>
                            {sellingStatus[card.id+card.tokenId] ? "Vente en cours ..." : "Mettre en vente"}
                        </button>
                    )}
                    {props.buttonAchat && props.wallet && (
                        <div>
                            <p>Prix : {card.prix} ETH</p>
                            <button onClick={() => acheterCarte(card.collectionId, card.tokenId,card.id+card.tokenId)}>
                                Acheter
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </ul>
    );
    
};
