const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const port = 3000 
const API_key = "43aadbec-ef33-49cb-abcc-1a3810dd598f"

/* ---------------------------------------------------------------------- */

const { Web3 } = require('web3')
const provider = 'http://127.0.0.1:8545'
const web3 = new Web3(provider)
const ABI = require('../contracts/artifacts/src/Main.sol/Main.json')
const abi = ABI.abi

/* ---------------------------------------------------------------------- */

const metaDataSet = require('../frontend/src/metaDataSet.json')

/* ---------------------------------------------------------------------- */

app.use(cors())

const adress_collec1 = {}
/*const adress_collec2 = {}
const adress_collec3 = {}
const adress_collec4 = {}
const adress_collec1 = {}*/




/* -----------------Appels Exterieurs Pokemon TCG----------------- */

/* ---------------------------------------------------------------------- */

/*axios({
    method : 'get', 
    url : 'https://api.pokemontcg.io/v2/cards',
    Authorization : API_key, 
    params : {
        q: 'set.id:sv3pt5',
        page : 1,
        pageSize : 250,
        orderBy : 'number',
        select : 'id,name,images'
    }

}).then((cards) => {
    const collect1 = cards.data.data
})*/
/* ---------------------------------------------------------------------- */


/* -------------------- Appels Blockchain ----------------------- */

async function deployContract () {

    try {
        const accounts = await web3.eth.getAccounts();
        const super_admin = accounts[0];
        const MainContract = new web3.eth.Contract(abi,super_admin)

       for(var i = 0 ; i < 6 ; i ++){
        await MainContract.methods.createCollection(metaDataSet.data[i].name,metaDataSet.data[i].total)
       }
       const num = await MainContract.methods.getAllCollectionsName()
       console.log(num)

    }catch(error){
        console.log("Error when deploying contract Main with collection", error)
    }  
}

/* ---------------------------------------------------------------------- */


app.get('/id', (req,res) => {
    const id = req.query
    res.json(id)
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    deployContract()
})