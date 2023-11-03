import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import "./Accueil.css"




export const Accueil = ({ wallet }) => {
    
    return (
        <><div>
            <h1> PokémonTCGGuru </h1>
        </div><div className="Fond">
                <img src="/800px-Carte_de_Hoenn_ROSA.png" alt="logo pokemon" />
            </div></>
    );
};
