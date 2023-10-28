import React from "react"
import "./Header.css"

export const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src="/rondoudou.png" alt="logo pokemon" />
            </div>
            <div className="name">
                <button className="deck">
                    PokéTCGBis
                </button>
            </div>
            <div className="navigation">
                <button className="deck">
                    Collections
                </button>
                <button className="market">
                    Mes cartes
                </button>
                <button className="pack">
                    Achat 
                </button>
            </div>
            <div className="profile">
                <button className="Account"> Profil </button>
            </div>
        </div>
    )
}