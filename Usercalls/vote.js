require("dotenv").config({path:"../.env"})
const fs = require('fs');
const Web3 =require('web3');
const path = require('path');

const abipath =path.resolve( '../contracts/voting_sol_voting.abi')
const buffer2 =fs.readFileSync(abipath);
const abi =JSON.parse(buffer2.toString());




const web3 = new Web3("https://ropsten.infura.io/v3/"+process.env.INFURA_APIKEY);
const account = process.env.ACCOUNT;
const privateKey = process.env.PRIVATE_KEY
console.log(account,privateKey);

var contract = new web3.eth.Contract(abi,process.env.CONTRACT_ADDRESS);

const deploy = async() => {

    console.log('Attempting to deploy from account:', account);
    
    const createTransaction = await web3.eth.accounts.signTransaction({
            from: account,
            data: contract.methods.addCandidates("KUNAL NAYAK","ABC",0).encodeABI(),
            to:process.env.CONTRACT_ADDRESS,
            gas: 3000000,
        },
        privateKey
    )
    const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction).then((res) => {
        console.log('Contract deployed at address', res.transactionHash);
        return res.transactionHash;
    });
    return createReceipt;
};

deploy();