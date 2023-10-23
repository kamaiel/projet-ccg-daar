import React from "react"
import "./Header.css"

export const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src="/pokemon-logo.png" alt="logo pokemon" />
            </div>
            <div className="navigation">
                <button className="deck">
                    DECK
                </button>
                <button className="market">
                    MARKET
                </button>
                <button className="pack">
                    PACK 
                </button>
            </div>
            <div className="profile">
                PROFILE
            </div>
        </div>
    )
}