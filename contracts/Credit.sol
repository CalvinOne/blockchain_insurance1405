pragma solidity ^0.4.2;

contract Credit {

  event createRecord(address indexed _address, string identity, string name, string category, uint price);

  string a;
  string b;
  string c;
  uint256 d;
  uint public bn;
  bytes32 hs;

    function create(string identity, string name, string category, uint256 price) public
  {
      a = identity;
      b = name;
      c = category;
      d = price;
      emit createRecord(msg.sender, identity, name, category, price);
  }

    function all() constant public returns (string, string, string, uint){
      return(a, b, c, d);
  }
    function setCurrentBlockNum() payable public returns(uint256,bytes32) {
        bn = block.number;
        hs = blockhash(block.number-1);
        return (bn,hs);
    }

}
