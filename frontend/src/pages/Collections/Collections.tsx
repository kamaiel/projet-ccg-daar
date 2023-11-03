import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import "./Collections.css"
import { Link } from 'react-router-dom';
import {Collection} from '../Collection/Collection'


export const Collections = ({ wallet }) => {
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

    return (
        <div>
            <h1>Collections existantes dans la blockchain</h1>
            {!wallet && <p>Veuillez vous connecter à votre compte metamask...</p>}
            {loading && wallet && <p>Chargement en cours...</p>}
            {!loading && (
                <ul className="collections">
                    {imgCollections.map((item : any, index : any) => (
                        <Link to={`/collection/${item.id}`} state={{
                            name : item.name,
                            id : item.id,
                            series : item.serie}}>
                                <div className = "collectionsLogo" key={index}>
                                    
                                    <img key={index} src={item.logo} />
                                    <div className="NomCollec">
                                        {`Collection : ${item.name}`}
                                    </div>
                                </div>   
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};
