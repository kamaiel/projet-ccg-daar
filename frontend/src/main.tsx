import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Accueil } from './pages/Accueil/Accueil'

const node = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(node)


root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  
)
function createBrowserRouter(arg0: never[]) {
  throw new Error('Function not implemented.')
}

