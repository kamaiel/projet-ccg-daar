import { SetStateAction, useContext, useEffect, useMemo, useRef, useState } from 'react'
import "./Accueil.css"
import WalletContext from '@/WalletContext';




export const Accueil = () => {
    
    return (
        <><div>
            <h1> PokémonTCGGuru </h1>
        </div><div className="Fond">
                <img src="/800px-Carte_de_Hoenn_ROSA.png" alt="logo pokemon" />
            </div></>
    );
};
