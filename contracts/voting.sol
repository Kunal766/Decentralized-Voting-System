// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract voting{
 address public admin;

 enum session {nominations, voting , result}
 session voteSession=session.nominations;


struct candidate
{
    string name;
    string partyName;
    uint256 noOfvotes;
}

candidate[] public candidates;
mapping(address=>bool) peopleWhoVoted;
address[] validVoterAddress=[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db];

 constructor ()
 {
admin =msg.sender;
for(uint i=0;i < validVoterAddress.length;i++)
{
    peopleWhoVoted[validVoterAddress[i]]=false;
}
 }
 
// operations done by Admin
function  addCandidates(string memory _name, string memory _partyName,uint256 _noOfvotes) public 
{
    require(msg.sender==admin);
    require(voteSession==session.nominations);
    candidates.push(candidate(_name,_partyName,_noOfvotes));
}

function changeSession(uint256  choice) public
{
    require(msg.sender==admin);
    if(choice==0)
    {
        voteSession =session.nominations;
    }
    if(choice==1)
    {
        voteSession =session.voting;
    }
    if(choice==2)
    {
        voteSession =session.result;
    }
}


function addValidAdress(address _avalidAdress) public 
{
    require(msg.sender==admin);
validVoterAddress.push(_avalidAdress);
peopleWhoVoted[_avalidAdress]=false;
}

//internal operations
function isValid(address voter) internal view returns (bool)
{
for(uint i=0;i<validVoterAddress.length;i++)
{
    if(voter==validVoterAddress[i])
    return true;
}

return false;
}

//peoples operatins

function  vote(uint indexOfcandidate) public
{
require(voteSession==session.voting);
require(!peopleWhoVoted[msg.sender]);
require(isValid(msg.sender));

candidates[indexOfcandidate].noOfvotes++;
peopleWhoVoted[msg.sender]=true;

}




}