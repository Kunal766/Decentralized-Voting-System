const fs = require('fs');

const data =fs.readFileSync('./contracts/voting_sol_voting.abi')
const contract = new web3.eth.Contract(abi, contractAddr);
const transaction = contract.methods.getBuyerInfo();

console.log(data.toString());