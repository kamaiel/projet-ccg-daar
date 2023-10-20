const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000 

const API_key = "43aadbec-ef33-49cb-abcc-1a3810dd598f"


const TestNFT = {
    NFT_card : "testNFT",
    img_link : ""
}

app.get('/nft', (req,res) => {
    res.json(TestNFT)
});

axios({
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
    cards.data.data.forEach((card) => {
        console.log(card)
    })
})




app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})