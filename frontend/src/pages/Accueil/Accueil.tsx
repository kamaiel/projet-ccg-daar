import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import "./Accueil.css"
import { Link } from 'react-router-dom';


export const Accueil = ({ wallet }) => {
    const [collections, setCollections] = useState([]);
    const [imgCollections, setImgCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async (collections: string | any[]) => {
        try {
            let data_tab = [];
            for (var i = 0; i < collections?.length; i++) {
                const response = await fetch(`http://127.0.0.1:3000/images?nom=${collections[i]}`);
                const data = await response.json();
                data_tab.push(data);
            }
            setImgCollections(data_tab);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des images de la collection :', error);
        }
    };

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await wallet?.contract.getAllCollectionsName();
                setCollections(res);
            } catch (error) {
                console.error('Erreur lors de la récupération des collections :', error);
            }
        };

        fetchCollections();
    }, [wallet]);

    useEffect(() => {
        if (collections?.length > 0) {
            fetchImages(collections);
        }
    }, [collections]);

    return (
        <div>
            <h1>Collections Existantes</h1>
            {loading && <p>Chargement en cours...</p>}
            {!loading && (
                <ul className="collections">
                    {imgCollections.map((item : any, index : any) => (
                        <div className = "collectionsLogo" key={index}>
                            <Link to={`/collection/${item.name}`}>
                            <img key={index} src={item.logo} alt={`Logo ${collections[index]}`} />
                            <div className="NomCollec">
                                {`Collection : ${item.name}`}
                            </div>
                            </Link>
                        </div>   
                    ))}
                </ul>
            )}
        </div>
    );
};
