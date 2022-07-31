require('dotenv').config()
const express = require('express')
const fs = require('fs');
const path = require('path')
const Web3 = require('web3')
const app = express()
const bp = require('body-parser')
const getCandidatesVote = require('./getCandidatesVote')
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const web3 =new Web3("https://ropsten.infura.io/v3/"+process.env.INFURA_APIKEY);

app.post('/addcandidates', (req, res) => {
    console.log(req.body);
    const abipath =path.resolve(__dirname, 'contracts/voting_sol_voting.abi')
    const buffer2 =fs.readFileSync(abipath);
    const abi =JSON.parse(buffer2.toString());
    getCandidatesVote(0,abi,web3);
    
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})