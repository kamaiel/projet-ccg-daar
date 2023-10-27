import { useEffect, useMemo, useRef, useState } from 'react'


export const Accueil = ({wallet}) => {
    const [collections,setCollections] = useState<[]>()

    useEffect(() => {
        wallet?.contract.getAllCollectionsName().then((result: any) => {
            setCollections(result);
        })
      }, []);
  
    return (
        <div>
            <h1>Collections Existantes</h1>
            <ul>
            {collections?.map((collection, index) => (
                <li key={index}>{collection}</li>
            ))}
        </ul>
        </div>
    )
}