import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import './Collection.css'

export const Collection = () => {
    const [cards, setCards] = useState([]);
    const {name, id, series} = useLocation().state

    const fetchCards = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:3000/collection?nom=${id}`);
            const data = await res.json()
            setCards(data)
        }catch(error){
            console.error('Erreur lors de la récupération des cartes de la collection',id)
        }
    }

    useEffect(() => {
       

        fetchCards();
    }, []
    )

    return (
        <div>
             <h1> {series} : {name} </h1>
             <div className="container">
             <ul className="cartes">
                {cards.map((card : any, index : any) => (
                    <img key={index} src={card.link} alt={'Carte'} />
                )

                )}
            </ul>
            </div>
        </div>
       


)}