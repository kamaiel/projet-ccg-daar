import React from "react"
import "./Header.css"
import { Link, NavLink } from "react-router-dom"

export const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src="/rondoudou.png" alt="logo pokemon" />
            </div>
            <div className="name">
                <NavLink to="/">
                <button className="deck">
                    PokéTCGBis
                </button>
                </NavLink>
            </div>
            <div className="navigation">
                <Link to={"/collections"}>
                    <button className="deck">
                        Collections
                    </button>
                </Link>
                <Link to={"/mycards"}>
                    <button className="myCards">
                        Mes cartes
                    </button>   
                </Link>
                <Link to={"/achat"}>
                    <button className="pack">
                        Achat 
                    </button>
                </Link>
                <Link to={"/market"}>
                    <button className="market">
                        Marché 
                    </button>
                </Link>
            </div>
            <div className="profile">
                <button className="Account"> Profil </button>
            </div>
        </div>
    )
}