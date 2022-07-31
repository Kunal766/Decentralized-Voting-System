const fs = require('fs');
const Web3 =require('web3');
const path = require('path');
const envpath = path.resolve("../.env")

require("dotenv").config({path:envpath});
const binpath = path.resolve( '../contracts/voting_sol_voting.bin');
const buffer1 =fs.readFileSync(binpath);
const bytecode =buffer1.toString();
const abipath =path.resolve( '../contracts/voting_sol_voting.abi')
const buffer2 =fs.readFileSync(abipath);
const abi =JSON.parse(buffer2.toString());




const web3 = new Web3("https://ropsten.infura.io/v3/"+process.env.INFURA_APIKEY);
const account = process.env.ACCOUNT;
const privateKey = process.env.PRIVATE_KEY
console.log(account,privateKey);


const deploy = async() => {

    console.log('Attempting to deploy from account:', account);
    const incrementer = new web3.eth.Contract(abi);

    const incrementerTx = incrementer.deploy({
        data: bytecode
        // arguments: [],
    })
    const createTransaction = await web3.eth.accounts.signTransaction({
            from: account,
            data: incrementerTx.encodeABI(),
            gas: 3000000,
        },
        privateKey
    )
    const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction).then((res) => {
        console.log('Contract deployed at address', res.contractAddress);
        return res.contractAddress;
    });
    return createReceipt;
};

deploy();