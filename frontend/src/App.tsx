import React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import "./App.css"

import { Collection } from './pages/Collection/Collection'
import {MyCards} from './pages/MyCards/MyCards'
import {Header} from './components/Header/Header'
import {Accueil} from './pages/Accueil/Accueil'
import {Achat} from './pages/Achat/Achat'
import {Collections} from './pages/Collections/Collections'
import {Market} from './pages/Market/Market'
import {WalletProvider} from './WalletProvider'


export const App = () => {
  return (
    <Router> 
      <WalletProvider>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Accueil/>}></Route>
        <Route path="/collection/:id" Component={Collection}/>
        <Route path="/mycards" element={<MyCards></MyCards>}/>
        <Route path="/achat" element={<Achat></Achat>}/>
        <Route path="/collections" element={<Collections></Collections>}/>
        <Route path="/market" element={<Market></Market>}/>
      </Routes>
      </WalletProvider>
    </Router>

    // <div>
    //   <Accueil wallet={wallet} />
    // </div>
    )
}
