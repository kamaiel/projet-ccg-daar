
const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const port = 3000 
const API_key = "43aadbec-ef33-49cb-abcc-1a3810dd598f"

/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */

const metaDataSet = require('../frontend/src/metaDataSet.json')

/* ---------------------------------------------------------------------- */

app.use(cors())

/* -----------------Appels Front to Back ---------------- */

app.get('/images', (req,res) => {
    console.log(req.query)
    const nomRecherche = req.query.nom
    const collection = metaDataSet.data.find(item => item.id === nomRecherche);
    if (!collection) {
        return res.status(404).send('Images non trouvée');
    }

    const images = {
        symbol: collection.images.symbol,
        logo: collection.images.logo,
        name : collection.name
      };
    
      res.json(images);
});


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
})

