// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract Token {
  // Token Amount to check current balnce in contract
  uint256 tokenAmount;
  uint256 public ieteesTshirts; // State of iet-tshirts
  uint256 public costPerTshirt; // cost per tshirt required 
  mapping(address => uint256) public tshirt; // mapping tshirt to  address

  // event to be emmited after every succesfull Tshirt mint
  event Transfer(address _to, uint256 _value);

  // Contructor is called with parameters of numbers of thsirst in stock and cost per tshirt
  constructor(uint256 numberOfTshirts, uint256 _costPerTshirt) {
    ieteesTshirts = numberOfTshirts;
    costPerTshirt = _costPerTshirt;
    tshirt[address(this)] = numberOfTshirts;
  }

  // method to check numbers of tshirst left in stock
  function getTshirts() public view returns (uint256) {
    return ieteesTshirts;
  }

  // functions to remove tokens based on tshirts
  function sellTshirt(uint256 q) public payable {
    require(
      msg.value > costPerTshirt * q,
      'Not enough funds for one Tshirt'
    );
    ieteesTshirts -= q;
    tshirt[msg.sender] += q;
    tokenAmount += msg.value;
    emit Transfer(msg.sender, q);
  }
}
