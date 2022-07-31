require("dotenv").config()
const fs = require('fs');
const Web3 =require('web3');
const path = require('path');





async function send(web3, transaction) {
    while (true) {
        try {
            const options = {
                to: transaction._parent._address,
                data: transaction.encodeABI(),
                gas: 210000,
                gasPrice: 10000000000,
            };
            const a = await web3.eth.call(options)
            return a;
        }
        catch (error) {
            return error
        }
    }
}


const deploy = async(index,abi) => {
const web3 = new Web3("https://ropsten.infura.io/v3/"+process.env.INFURA_APIKEY);
var contract = new web3.eth.Contract(abi,process.env.CONTRACT_ADDRESS);


    const Tx =  contract.methods.getCandidatesVote(index);
    const a =await send(web3,Tx);
    console.log(web3.utils.toNumber(a));
    // console.log(b);
    // console.log(c);
};

module.exports=deploy();