import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'

import "./App.css"

import {Header} from './components/Header/Header'
import {Deck} from './pages/Deck/Deck'


type Canceler = () => void
const useAffect = (
  asyncEffect: () => Promise<Canceler | void>,
  dependencies: any[] = []
) => {
  const cancelerRef = useRef<Canceler | void>()
  useEffect(() => {
    asyncEffect()
      .then(canceler => (cancelerRef.current = canceler))
      .catch(error => console.warn('Uncatched error', error))
    return () => {
      if (cancelerRef.current) {
        cancelerRef.current()
        cancelerRef.current = undefined
      }
    }
  }, dependencies)
}

const useWallet = () => {
  const [details, setDetails] = useState<ethereum.Details>()
  const [contract, setContract] = useState<main.Main>()
  useAffect(async () => {
    const details_ = await ethereum.connect('metamask')
    if (!details_) return
    setDetails(details_)
    const contract_ = await main.init(details_)
    if (!contract_) return
    setContract(contract_)
  }, [])
  return useMemo(() => {
    if (!details || !contract) return
    return { details, contract }
  }, [details, contract])
}

const cards = [
  {
    id: 'sv3pt5-81',
    name: 'Magnemite',
    imageUrl: 'https://images.pokemontcg.io/sv3pt5/81.png'
  },
  {
    id: 'sv3pt5-82',
    name: 'Magneton',
    imageUrl: 'https://images.pokemontcg.io/sv3pt5/82.png'
  }
]

const mintedCardURIs : (string []) = [];

function encodeURICard (cards : any){
  for (const card of cards) {
    const cardURI = JSON.stringify(card.id)
    mintedCardURIs.push(cardURI);
  }
}

async function getNFTInfos (userAdress : any, contrat : any, numColl : number){
  try {
    const balance = await contrat.possessNFT(numColl,userAdress)
    console.log(balance);
    const tokenID = await contrat.getNFT(0,userAdress) 
    
    console.log(tokenID);
    return tokenID;
  }catch(error){
    console.error("Erreur lors de la récupération des NFT possédés", error);
    return [];
  }
}


 


export const App = () => {
  const wallet = useWallet()
  const createCollection = () => {
    if (wallet) {
      wallet.contract.createCollection("pokemon", 10)
        .then((createCollectionResponse: any) => {
          return createCollectionResponse.wait(); // Cela attend que la transaction soit confirmée
        })
        .then((collectionName: any) => {
          wallet.contract.getCollection(0)
          .then((resp: any) => {
            console.log("Nom de la collection :", resp);
          }).catch((error : any) => {
            console.error("Erreur ici pour test")
          });
        })
        .catch((error: any) => {
          console.error("Erreur lors de la création ou de l'obtention de la collection :", error);
        });
      }
  }

  const mintCards = () => {
    encodeURICard(cards)
    wallet?.contract.mintCards(0,wallet?.details.account,mintedCardURIs)
            .then((result: any) => {
              console.log(result);
            })
            .catch((error: any)=> {
              console.error("Erreur lors de l'appel à la fonction getCollection :", error);
            });
  }

  const getCards = async () => {
    const myCardsId = await getNFTInfos(wallet?.details.account, wallet?.contract, 0)
    const myCardsInfo = []
    for (const cardId of myCardsId) {
      const info = await fetch("http://localhost:3000/id",{
        method: "GET",
        query: JSON.stringify(cardId), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
      });

      myCardsId.push(info.json());
    }
  }
  return (

    <div>
      {/* <Header></Header> */}
      <button onClick={createCollection}>Create collection</button>
      <button onClick={mintCards}> Mint Card </button>
      <button onClick={getCards}> Mes cartes</button>
      <Deck></Deck>  
    </div>
    // <div className={styles.body}>
    //   <h1>Welcome to Pokémon TCG</h1>
    //   <button onClick={createCollection}>Create collection</button>
    // </div>
    )
}
