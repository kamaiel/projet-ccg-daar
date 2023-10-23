import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import { contracts } from '@/contracts.json'
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


export const App = () => {
  const wallet = useWallet()
  const createCollection = () => {
    if (wallet) {
      wallet.contract.createCollection("pokemon", 10)
        .then((createCollectionResponse: any) => {
          return createCollectionResponse.wait(); // Cela attend que la transaction soit confirmée
        })
        .then(() => {
          // return wallet.contract.getNameCollection(0);
        })
        .then((collectionName: any) => {
          console.log("Nom de la collection :", collectionName);
        })
        .catch((error: any) => {
          console.error("Erreur lors de la création ou de l'obtention de la collection :", error);
        });
      }
  }
  return (
    <div>
      {/* <Header></Header> */}
      <Deck></Deck> 
    </div>
    // <div className={styles.body}>
    //   <h1>Welcome to Pokémon TCG</h1>
    //   <button onClick={createCollection}>Create collection</button>
    // </div>
    )
}
