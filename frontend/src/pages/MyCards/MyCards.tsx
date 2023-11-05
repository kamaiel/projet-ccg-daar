import React, { useContext, useEffect, useState } from "react";
import "./MyCards.css";
import { Cards } from "../../components/Cards/Cards";
import WalletContext from "@/WalletContext";

export const MyCards = () => {
    const { useWallet } = useContext(WalletContext);
    const wallet = useWallet();
    const [myCards, setMyCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    

    const fetchMyCards = async () => {
        setIsLoading(true); 
        if (wallet) {
            try {
                const collections = await wallet.contract.getAllCollectionsName();
                const promises = collections.map(async (collection : any) => {
                    const myNFT = await wallet.contract.getNFT(collection, wallet.details.account);
                    return (myNFT);
                });
                const responses = await Promise.all(promises);
                let responsesfilter = responses.filter(function(tableau) {
                    return tableau[0].length > 0 && tableau[1].length > 0;
                });

                const requestNFT = responsesfilter.map((tab) => {
                    return tab[0].join(",")
                });
                const requestToken = responsesfilter.map((tab) => {
                    return tab[1].join(",")
                });                

                const response = await fetch(`http://127.0.0.1:3000/id?myNFT=${requestNFT}&tokenIDs=${requestToken}&prices=none`).then((response) => {
                    return response.json();
                });
                setMyCards(response);
               

            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            } finally {
                setIsLoading(false); 
            }
        }
    };

    useEffect(() => {
        fetchMyCards();
    }, [wallet]);

    const organizedCards : any  = {};
    myCards.forEach((card) => {
        if (!organizedCards[card.collection]) {
            organizedCards[card.collection] = [];
        }
        organizedCards[card.collection].push(card);
    });


    return (
        <div>
            <h1> Mes cartes </h1>
            <div className="container">
                {isLoading && <p> Chargement en cours ... </p>}
                {!isLoading && Object.keys(organizedCards).length === 0 ? (
                    <p>Aucune carte possédée.</p>
                ) : (
                    Object.keys(organizedCards).map((collectionName) => (
                        <div key={collectionName}>
                            <h2>{collectionName}</h2>
                            <Cards cards={organizedCards[collectionName]} isPlayerCard={true} button={true} wallet={wallet}></Cards>
                        </div>
                    ))
                )}  
            </div>
        </div>
    );
};
