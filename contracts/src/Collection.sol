// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Collection is ERC721{
  string public collectionName;
  uint public cardCount;

  struct Card {
    uint cardId;
    string cardName;
  }

  Card[] cardList;

  constructor(string memory _collectionName, uint _cardCount) ERC721("Pokemon", "POK"){
    collectionName = _collectionName;
    cardCount = _cardCount;
  }

  function getName() external view returns (string memory) {
    return collectionName;
  } 
}
