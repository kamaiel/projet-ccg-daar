import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import './Collection.css'
import {Cards} from "../../components/Cards/Cards"

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
                <Cards cards={cards}></Cards>
            </div>
        </div>
       


)}