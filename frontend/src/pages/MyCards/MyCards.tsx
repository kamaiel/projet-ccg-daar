import React, { useEffect, useState } from "react";
import "./MyCards.css";
import { Cards } from "../../components/Cards/Cards";

export const MyCards = ({ wallet }) => {
    const [myCards, setMyCards] = useState([]);

    const fetchMyCards = async () => {
        if (wallet) {
            try {
                const collections = await wallet.contract.getAllCollectionsName();
                const promises = collections.map(async (collection : any) => {
                    const myNFT = await wallet.contract.getNFT(collection, wallet.details.account);
                    return myNFT.join(",");
                });
                const responses = await Promise.all(promises);

                const requestNFT = responses.join(",");
                const response = await fetch(`http://127.0.0.1:3000/id?myNFT=${requestNFT}`).then((response) => {
                    return response.json();
                });
                setMyCards(response);
                
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
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
                {Object.keys(organizedCards).map((collectionName) => (
                    <div key={collectionName}>
                        <h2>{collectionName}</h2>
                        <Cards cards={organizedCards[collectionName]} isPlayerCard={true}></Cards>
                    </div>
                ))}
            </div>
        </div>
    );
};
