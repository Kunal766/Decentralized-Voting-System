const Web3 = require('web3')
require('dotenv').config()
const Tx = require('ethereumjs-tx').Transaction

const web3 =new Web3("https://ropsten.infura.io/v3/c310842fd9a843b3b03ba87116331805")
let address ="0xb3bf78c57d038df437cc30c3757385d9efab6f8a";
let abi=[
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_partyName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_noOfvotes",
                "type": "uint256"
            }
        ],
        "name": "addCandidates",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_avalidAdress",
                "type": "address"
            }
        ],
        "name": "addValidAdress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "partyName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "noOfvotes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "choice",
                "type": "uint256"
            }
        ],
        "name": "changeSession",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "indexOfcandidate",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];






























const contract = new web3.eth.Contract(abi ,address);
const account1 ="0x823E3a5Fc48C399Bd1EFF6C3460a7ec2E60A3c35";
const privateKey1 =Buffer.from(process.env.KEYPAIR_1,'hex');

// console.log(contract.methods.candidates("0").call((err,result)=>{console.log({err,result})}));

web3.eth.getTransactionCount(account1, (err, txCount) => {

    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(1800000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      to: address,
      data: contract.methods.addCandidates("kunal","BJP","0").encodeABI()
    }
  
    const tx = new Tx(txObject)
    tx.sign(privateKey1)
  
    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')
  
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log('err:', err, 'txHash:', txHash)
      // Use this txHash to find the contract on Etherscan!
    })
  })
