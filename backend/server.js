const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const port = 3000 
const cryptoJs = require('crypto-js');
require('dotenv').config();
const encryptionKey = process.env.ENCRYPTION_KEY;

/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */

const metaDataSet = require("../db/collections.json")

/* ---------------------------------------------------------------------- */

app.use(cors())

/* -----------------Appels Front to Back ---------------- */

app.get('/images', (req,res) => {
    const nomRecherche = req.query.nom
    const collection = metaDataSet.data.find(item => item.id === nomRecherche);
    if (!collection) {
        return res.status(404).send('Images non trouvée');
    }

    const images = {
        symbol: collection.images.symbol,
        logo: collection.images.logo,
        name : collection.name,
        id : collection.id,
        serie : collection.series
      };
    
      res.json(images);
});


app.get('/collection', (req,res) => {
    let cartes = []
    const id = req.query.nom
    const metadonne = require("../db/"+id+"-cards.json")
    for(var i = 0 ; i < metadonne.data.length ; i++){
        const carte = {
            link : metadonne.data[i].images.small,
            linkBig : metadonne.data[i].images.large,
            name : metadonne.data[i].name
        }
        cartes.push(carte)
    }
    res.json(cartes)
})

app.get("/collectionsData", (req,res) => {
    const collToReturn = req.query.collections.split(",")
    let collections = []
    for(var i = 0 ; i < metaDataSet.data.length ; i++){
        for(var j = 0 ; j < collToReturn.length ; j++){
            if(collToReturn[j] == metaDataSet.data[i].id){
                const collection = {
                    symbol: metaDataSet.data[i].images.symbol,
                    logo: metaDataSet.data[i].images.logo,
                    name : metaDataSet.data[i].name,
                    id : metaDataSet.data[i].id,
                    serie : metaDataSet.data[i].series
                }
                collections.push(collection)
            }
        }
    }
    res.json(collections)
})

app.get('/booster', (req,res)=>{

    const collectionId = req.query.id
    const collectionCards = require("../db/"+collectionId+"-cards.json")
    var cardsIndex = []
    while(cardsIndex.length < 5){
        var r = Math.floor(Math.random() * collectionCards.data.length);
        if(cardsIndex.indexOf(r) === -1) cardsIndex.push(r);
    }
    
    var cards = []
    for(var i = 0 ; i < cardsIndex.length ; i++){
        const carte = {
            link : collectionCards.data[cardsIndex[i]].images.small,
            linkBig : collectionCards.data[cardsIndex[i]].images.large,
            name : collectionCards.data[cardsIndex[i]].name,
            id : collectionCards.data[cardsIndex[i]].id
        }
        cards.push(carte)
    }

    let encryptedData = cryptoJs.AES.encrypt(JSON.stringify(cards), encryptionKey).toString();
    
    res.json(encryptedData);
    
})


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
    const myNFT = req.query.myNFT.split(",")
    var cards = []

    if (req.query.myNFT != "nothing"){
        const idCollec = myNFT[0].split("-")
        const collectionCards = require("../db/"+idCollec[0]+"-cards.json")  

        for(var i = 0 ; i < myNFT.length ; i++){
            const cardInfo= collectionCards.data.find(item => item.id === myNFT[i]);
            const card = {
                link : cardInfo.images.small,
                linkBig : cardInfo.images.large,
                name : cardInfo.name,
                id : cardInfo.id
            }
            cards.push(card)
        }
    }
    res.json(cards)
})


app.listen(port, async () => {
    console.log(`Server running on port ${port}`)
})

