import WalletContext from '@/WalletContext';
import { Cards } from '@/components/Cards/Cards';
import {useState, useEffect, useContext} from 'react';


export const Market = () => {
    const { useWallet } = useContext(WalletContext);
    const wallet = useWallet();
    const [CardsSell, setCardsSell] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchMyCards = async () => {
        setIsLoading(true); 

        if (wallet){
            try{
                const allCards = await wallet.contract.getAllNftInSales();
                const res = await Promise.all(allCards);
                const resURI = res[1].filter(function(tab : any) {
                    return tab.length > 0 ;
                })
                const resTokken = res[0].filter(function(tab : any) {
                    return tab.length > 0 ;
                });
                const resPrix = res[2].filter(function(tab : any) {
                    return tab.length > 0 ;
                })
                const requestURI= resURI.map((tab : any) => {
                    return tab.join(",")
                })
                const requestToken = resTokken.map((tab : any) => {
                    return tab.join(",")
                })
                const requestPrix = resPrix.map((tab : any) => {
                    return tab.join(",")
                })

                const response = await fetch(`http://127.0.0.1:3000/id?myNFT=${requestURI}&tokenIDs=${requestToken}&prices=${requestPrix}`).then((response) => {
                    return response.json();
                });
                setCardsSell(response);
    
            }catch(error){
                console.error('Erreur lors de la récupération des données:', error);
            }finally{
                setIsLoading(false); 
            }
        }
      
    }

    useEffect(() => {
        fetchMyCards();
        }, [wallet]);

    const organizedCards : any  = {};
        CardsSell.forEach((card) => {
            if (!organizedCards[card.collection]) {
                organizedCards[card.collection] = [];
            }
            organizedCards[card.collection].push(card);
    });
    
    return (
        <div>
            <h1>Market</h1>
            <div className="container">
                {isLoading && <p> Chargement en cours ... </p>}
                {!isLoading && Object.keys(organizedCards).length === 0 ? (
                    <p>Aucunne carte en ventes.</p>
                ) : (
                    Object.keys(organizedCards).map((collectionName) => (
                        <div key={collectionName}>
                            <h2>{collectionName}</h2>
                            <Cards cards={organizedCards[collectionName]} isPlayerCard={true} buttonAchat={true} wallet={wallet}></Cards>
                        </div>
                    ))
                )}  
            </div>
        </div>
    )
}