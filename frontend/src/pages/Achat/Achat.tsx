import {useContext, useEffect, useState} from "react"
import { Cards } from "@/components/Cards/Cards"
import Select from "react-select"
import "./Achat.css"
import * as crypto from "crypto-js";
import WalletContext from "@/WalletContext";
const encryptionKey = "fe97dc1396947d4ee2461e169d4a8b2d73f6aef1b15f5972099716ab5e01f73a";

export const Achat = () => {
    const { useWallet } = useContext(WalletContext);
    const wallet = useWallet();
    const [boosteredCards, setBoosteredCards] = useState([])
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [isMinted, setIsMinted] = useState(false)

    const [isClearable, setIsClearable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectValue, setSelectValue] = useState(null);
    const [options, setOptions] = useState([]);


    const encodeURICard = (cards : any) : string[]=>{
        var mintedCardURIs = [];
        for (const card of cards) {
          mintedCardURIs.push(card.id);
        }
        return mintedCardURIs
      }

    const getRandomCard = async (collectionId:string) => {
        setIsMinted(false)
        const response = await fetch(`http://127.0.0.1:3000/booster?id=${collectionId}`).then((response) => {
            return response.json()
        })
        
        //Decrypting the response
        //const bytes = crypto.AES.decrypt(response, encryptionKey);
        //const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

        setBoosteredCards(response)
        setIsOpen(true)
    }

    const fetchCollectionsData = async () => {
        const collections = await wallet?.contract.getAllCollectionsName().then((res:any) => {return res});
        if(collections!=undefined){
            const response = await fetch(`http://127.0.0.1:3000/collectionsData?collections=${collections}`).then((response) => {return response.json()});
            setCollections(response.sort((a,b) => a.name.localeCompare(b.name)));
            setLoading(true);
        }
    }


    useEffect(() => { 
        fetchCollectionsData();
        if(loading){
            let options = []
            for(const collection of collections){
                options.push({value: collection.id, label: collection.name})
            }
            setOptions(options.sort((a,b) => a.label.localeCompare(b.label)))
        }
    }, [wallet,loading])

    useEffect(()=>{
        if(isOpen && selectValue){
            const c : string[] = encodeURICard(boosteredCards)
            wallet?.contract.mintCards(selectValue.value, wallet?.details.account,c)
            .then(()=> setIsMinted(true))
            .catch((error: any)=> {
                setIsOpen(false)
                console.error("Erreur lors de l'appel à la fonction mintCards en ouvrant un booster :", error);
              });
        }
    }, [boosteredCards])
    
    return (
        <div>
            <div className="selector-button">
                <button onClick={() => getRandomCard(selectValue?.value)}>Ouvrir le booster</button>
                <Select
                    className="selector"
                    isDisabled={isDisabled}
                    isClearable={isClearable}
                    options={options}
                    onChange={(e: any) => {setSelectValue(e); setIsOpen(false)}}
                />
                
            </div>
            <div className="cards">
            {selectValue?
                (isOpen?
                    (isMinted?
                    <Cards cards={boosteredCards} isPlayerCard={true}></Cards> 
                    : <p>Veuillez accepter la transaction ...</p>)
                :<p>Ouvrez votre booster !</p>)
            :<p>Veuillez choisir une collection ...</p>}
            </div>
        </div>
    )
}
