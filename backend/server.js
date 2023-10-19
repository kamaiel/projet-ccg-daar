const express = require('express')
const app = express()
const port = 3000 


const TestNFT = {
    NFT_card : "testNFT",
    img_link : ""
}

app.get('/nft', (req,res) => {
    res.json(TestNFT)
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})