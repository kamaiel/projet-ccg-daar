import { Key, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from 'react'
import "./Collections.css"
import { Link } from 'react-router-dom';
import {Collection} from '../Collection/Collection'
import WalletContext from '@/WalletContext';


export const Collections = () => {
    const { useWallet } = useContext(WalletContext);
    const wallet = useWallet();
    const [imgCollections, setImgCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCollectionsData = async () => {
        const collections = await wallet?.contract.getAllCollectionsName().then((res:any) => {return res});
        if(collections!=undefined){
            const response = await fetch(`http://127.0.0.1:3000/collectionsData?collections=${collections}`).then((response) => {return response.json()});
            setImgCollections(response.sort((a,b) => a.name.localeCompare(b.name)));
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCollectionsData();
    }, [wallet]);

    const organizedLogo : any  = {};
    imgCollections.forEach((logo) => {
        if (!organizedLogo[logo.serie]) {
            organizedLogo[logo.serie] = [];
        }
        organizedLogo[logo.serie].push(logo);
    });

    return (
        <div>
            <h1>Collections existantes dans la blockchain</h1>
            {!wallet && <p>Veuillez vous connecter à votre compte MetaMask...</p>}
            {loading && wallet && <p>Chargement en cours...</p>}
            {!loading && (
                <div className="collectionsContainer">
                    {Object.keys(organizedLogo).map((serie, index) => (
                        <div className="serieContainer" key={index}>
                            <h2>{`Série : ${serie}`}</h2>
                            <div className="logoContainer">
                                {organizedLogo[serie].map((logo: { logo: string | undefined; }, logoIndex: Key | null | undefined) => (
                                    <Link to={`/collection/${logo.id}`} state={{
                                        name : logo.name,
                                        id : logo.id,
                                        series : logo.serie}}>
                                    <div className="collectionsLogo" key={logoIndex}>
                                        <img src={logo.logo} alt={`Logo de la série ${serie}`} />
                                        <div className="NomCollec">
                                            {`Collection : ${logo.name}`}
                                         </div>
                                    </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
