
import React, {useEffect, useMemo, useRef, useState} from 'react';
import WalletContext from "./WalletContext";

import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'

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

export const WalletProvider = ({ children }) => {
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

    return (
      <WalletContext.Provider value={{useWallet}}>
        {children}
      </WalletContext.Provider>
    );
  };

export default WalletProvider;

