import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Collection } from './pages/Collection/Collection'
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import { Header } from './components/Header/Header'



const node = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(node)


root.render(
  <React.StrictMode>
    <Router> 
      <Header></Header>
      <Routes>
        <Route path="/" Component={App}/>
        <Route path="/collection/:id" Component={Collection}/>
      </Routes>
    </Router>
  </React.StrictMode>
)
function createBrowserRouter(arg0: never[]) {
  throw new Error('Function not implemented.')
}

