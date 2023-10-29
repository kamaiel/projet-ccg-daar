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