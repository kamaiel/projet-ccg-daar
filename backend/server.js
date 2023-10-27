
const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const port = 3000 
const API_key = "43aadbec-ef33-49cb-abcc-1a3810dd598f"

/* ---------------------------------------------------------------------- */

const {ethers}= require('ethers')
/*const { Web3 } = require('web3')
const provider = 'http://127.0.0.1:8545'
const web3 = new Web3(provider)*/
const ABI = require('../contracts/artifacts/src/Main.sol/Main.json')
const abi = ABI.abi

const contracts = require('../frontend/src/contracts.json')

const bytecodeabi = ABI.bytecode

var super_admin = null
var MainContract = null

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


/* ---------------------------------------------------------------------- */


app.get('/id', (req,res) => {
    const id = req.query
    res.json(id)
})


app.listen(port, async () => {
    console.log(`Server running on port ${port}`)
    await deployContract()
    creationCollection()
})

