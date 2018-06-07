pragma solidity ^0.4.2;

contract Credit {

  event createRecord(address indexed _address, string identity, string name, string category, uint price);
   enum PartyType  { Patient, Provider, Payor }

     struct Entity {
        address addr;
        PartyType partytype;
    }
     mapping (address => Entity) public Entities;

  string a;
  string b;
  string c;
  uint256 d;
  uint public bn;
  bytes32 hs;

  function registerParty(address _party, PartyType _type)
        public{
            Entities[_party] = Entity(_party,_type);
        }

      modifier onlyByPatient()
    {
        require(Entities[msg.sender].addr != address(0x0));
        require(Entities[msg.sender].partytype == PartyType.Patient);
        _;
    }
      modifier onlyByProvider()
    {
        require(Entities[msg.sender].addr != address(0x0));
        require(Entities[msg.sender].partytype == PartyType.Provider);
        _;
    }

    modifier onlyByInsuranceAgent()
    {
        require(Entities[msg.sender].addr != address(0x0));
        require(Entities[msg.sender].partytype == PartyType.Payor);
        _;
    }


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
        bn = block.number - 1;
        hs = blockhash(block.number-1);
        return (bn,hs);
    }

}
