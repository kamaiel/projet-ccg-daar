import React from "react"
import "./Header.css"

export const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src="../public/pokemon-logo.png" alt="logo pokemon" />
            </div>
            <div className="navigation">
                <div className="deck">
                    DECK
                </div>
                <div className="market">
                    MARKET
                </div>
                <div className="pack">
                    PACK 
                </div>
            </div>
            <div className="profile">
                PROFILE
            </div>
        </div>
    )
}